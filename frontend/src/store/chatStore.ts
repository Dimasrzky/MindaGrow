import { create } from 'zustand';
import { ChatMessage, Suggestion } from '@/hooks/useChatbot';

interface ChatState {
  messages: ChatMessage[];
  suggestions: Suggestion[];
  isTyping: boolean;
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  removeMessage: (messageId: string) => void;
  clearMessages: () => void;
  setSuggestions: (suggestions: Suggestion[]) => void;
  setIsTyping: (isTyping: boolean) => void;
}

export const chatStore = create<ChatState>((set) => ({
  messages: [],
  suggestions: [],
  isTyping: false,
  
  setMessages: (messages) => set({ messages }),
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message],
  })),
  
  removeMessage: (messageId) => set((state) => ({
    messages: state.messages.filter(msg => msg.id !== messageId),
  })),
  
  clearMessages: () => set({ messages: [] }),
  
  setSuggestions: (suggestions) => set({ suggestions }),
  
  setIsTyping: (isTyping) => set({ isTyping }),
}));