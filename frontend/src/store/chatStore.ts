import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAuthStore } from './authStore';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  userId: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatSuggestion {
  id: string;
  text: string;
}

interface ChatState {
  currentSession: ChatSession | null;
  sessions: ChatSession[];
  suggestions: ChatSuggestion[];
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
  
  // Actions
  createSession: () => Promise<string | null>;
  loadSession: (sessionId: string) => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  fetchSessions: () => Promise<void>;
  fetchSuggestions: () => Promise<void>;
  clearCurrentSession: () => void;
  deleteSession: (sessionId: string) => Promise<boolean>;
  updateSessionTitle: (sessionId: string, title: string) => Promise<boolean>;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      currentSession: null,
      sessions: [],
      suggestions: [],
      isLoading: false,
      isSending: false,
      error: null,
      
      createSession: async () => {
        try {
          set({ isLoading: true, error: null });
          
          const auth = useAuthStore.getState();
          
          if (!auth.isAuthenticated || !auth.user) {
            throw new Error('User must be authenticated to create a chat session');
          }
          
          const response = await fetch('/api/chatbot/sessions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({
              userId: auth.user.id,
            }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to create chat session');
          }
          
          const data = await response.json();
          
          const newSession: ChatSession = {
            id: data.id,
            userId: auth.user.id,
            title: data.title || 'New Conversation',
            messages: [],
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          };
          
          set({
            currentSession: newSession,
            sessions: [newSession, ...get().sessions],
            isLoading: false,
          });
          
          return data.id;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
          });
          return null;
        }
      },
      
      loadSession: async (sessionId) => {
        try {
          set({ isLoading: true, error: null });
          
          const auth = useAuthStore.getState();
          
          if (!auth.isAuthenticated) {
            throw new Error('User must be authenticated to load a chat session');
          }
          
          const response = await fetch(`/api/chatbot/sessions/${sessionId}`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          
          if (!response.ok) {
            throw new Error('Failed to load chat session');
          }
          
          const data = await response.json();
          
          set({
            currentSession: data,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
          });
        }
      },
      
      sendMessage: async (message) => {
        try {
          set({ isSending: true, error: null });
          
          const auth = useAuthStore.getState();
          const currentSession = get().currentSession;
          
          if (!auth.isAuthenticated) {
            throw new Error('User must be authenticated to send a message');
          }
          
          if (!currentSession) {
            throw new Error('No active chat session');
          }
          
          // Add user message to UI immediately
          const tempUserMessageId = `temp-${Date.now()}`;
          const userMessage: ChatMessage = {
            id: tempUserMessageId,
            role: 'user',
            content: message,
            timestamp: new Date().toISOString(),
          };
          
          const updatedMessages = [...currentSession.messages, userMessage];
          
          set({
            currentSession: {
              ...currentSession,
              messages: updatedMessages,
            },
          });
          
          // Send to API
          const response = await fetch(`/api/chatbot/sessions/${currentSession.id}/messages`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({
              content: message,
            }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to send message');
          }
          
          const data = await response.json();
          
          // Replace temp message with actual message and add assistant response
          const messagesWithoutTemp = currentSession.messages.filter(
            msg => msg.id !== tempUserMessageId
          );
          
          const updatedSession = {
            ...currentSession,
            messages: [
              ...messagesWithoutTemp,
              data.userMessage,
              data.assistantMessage,
            ],
            updatedAt: new Date().toISOString(),
          };
          
          // Update sessions list with latest title if it changed
          const updatedSessions = get().sessions.map(session => 
            session.id === currentSession.id 
              ? { ...session, title: data.sessionTitle || session.title, updatedAt: updatedSession.updatedAt }
              : session
          );
          
          set({
            currentSession: updatedSession,
            sessions: updatedSessions,
            isSending: false,
          });
        } catch (error) {
          set({
            isSending: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
          });
        }
      },
      
      fetchSessions: async () => {
        try {
          set({ isLoading: true, error: null });
          
          const auth = useAuthStore.getState();
          
          if (!auth.isAuthenticated || !auth.user) {
            throw new Error('User must be authenticated to fetch chat sessions');
          }
          
          const response = await fetch('/api/chatbot/sessions', {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch chat sessions');
          }
          
          const data = await response.json();
          
          set({
            sessions: data.sessions,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
          });
        }
      },
      
      fetchSuggestions: async () => {
        try {
          set({ isLoading: true, error: null });
          
          const auth = useAuthStore.getState();
          
          if (!auth.isAuthenticated) {
            throw new Error('User must be authenticated to fetch chat suggestions');
          }
          
          const response = await fetch('/api/chatbot/suggestions', {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch chat suggestions');
          }
          
          const data = await response.json();
          
          set({
            suggestions: data.suggestions,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
          });
        }
      },
      
      clearCurrentSession: () => {
        set({ currentSession: null });
      },
      
      deleteSession: async (sessionId) => {
        try {
          set({ isLoading: true, error: null });
          
          const auth = useAuthStore.getState();
          
          if (!auth.isAuthenticated) {
            throw new Error('User must be authenticated to delete a chat session');
          }
          
          const response = await fetch(`/api/chatbot/sessions/${sessionId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          
          if (!response.ok) {
            throw new Error('Failed to delete chat session');
          }
          
          // Update sessions list
          const updatedSessions = get().sessions.filter(session => session.id !== sessionId);
          
          // Clear current session if it was deleted
          const currentSession = get().currentSession;
          
          set({
            sessions: updatedSessions,
            currentSession: currentSession?.id === sessionId ? null : currentSession,
            isLoading: false,
          });
          
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
          });
          return false;
        }
      },
      
      updateSessionTitle: async (sessionId, title) => {
        try {
          set({ isLoading: true, error: null });
          
          const auth = useAuthStore.getState();
          
          if (!auth.isAuthenticated) {
            throw new Error('User must be authenticated to update session title');
          }
          
          const response = await fetch(`/api/chatbot/sessions/${sessionId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({ title }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to update session title');
          }
          
          // Update sessions list
          const updatedSessions = get().sessions.map(session => 
            session.id === sessionId ? { ...session, title } : session
          );
          
          // Update current session if it was the one updated
          const currentSession = get().currentSession;
          
          set({
            sessions: updatedSessions,
            currentSession: currentSession?.id === sessionId 
              ? { ...currentSession, title } 
              : currentSession,
            isLoading: false,
          });
          
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
          });
          return false;
        }
      },
    }),
    {
      name: 'mindagrow-chat-storage',
      partialize: (state) => ({ 
        sessions: state.sessions 
      }),
    }
  )
);