import { useState, useCallback, useEffect } from 'react';
import { sendChatMessage, fetchChatHistory } from '@/lib/api/chatbot';
import { useAuth } from '@/hooks/useAuth';
import { chatStore } from '@/store/chatStore';
import { useProgress } from '@/hooks/useProgress';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Suggestion {
  id: string;
  text: string;
}

export const useChatbot = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { progress } = useProgress();
  
  // Use Zustand store for global chat state
  const { 
    messages, 
    setMessages,
    addMessage,
    suggestions,
    setSuggestions
  } = chatStore();

  // Load chat history when user is available
  useEffect(() => {
    if (user?.id) {
      loadChatHistory();
    }
  }, [user?.id]);

  // Generate suggestions based on user progress
  useEffect(() => {
    if (progress && messages.length > 0) {
      generateSuggestions();
    }
  }, [progress, messages.length]);

  // Fetch chat history
  const loadChatHistory = useCallback(async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const history = await fetchChatHistory(user.id);
      setMessages(history);
    } catch (err: any) {
      console.error('Error loading chat history:', err);
      setError('Failed to load chat history');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, setMessages]);

  // Send message to AI and get response
  const sendMessage = useCallback(async (content: string) => {
    if (!user?.id) {
      setError('User not authenticated');
      return null;
    }
    
    setIsLoading(true);
    setError(null);
    
    // Add user message to state immediately for better UX
    const userMessage: ChatMessage = {
      id: `temp-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };
    
    addMessage(userMessage);
    
    try {
      // Send to API and get AI response
      const response = await sendChatMessage(user.id, content, progress);
      
      // Add AI response to state
      const assistantMessage: ChatMessage = {
        id: response.id || `ai-${Date.now()}`,
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toISOString()
      };
      
      addMessage(assistantMessage);
      
      // After receiving a response, generate new suggestions
      generateSuggestions();
      
      return assistantMessage;
    } catch (err: any) {
      console.error('Error sending message:', err);
      setError(err.message || 'Failed to send message');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, progress, addMessage]);

  // Generate suggestions based on user profile and conversation context
  const generateSuggestions = useCallback(async () => {
    if (!user?.id || !progress) return;
    
    try {
      // Get the last few messages for context (simplified example)
      const recentMessages = messages.slice(-3);
      
      // In a real app, you would call the AI service for personalized suggestions
      // This is a simplified example with hardcoded suggestions
      const newSuggestions: Suggestion[] = [
        { id: '1', text: 'What skills should I improve?' },
        { id: '2', text: 'Recommend activities for me' },
        { id: '3', text: 'How can I earn more points?' }
      ];
      
      if (progress.skills.length > 0) {
        // Add a suggestion about their top skill
        const topSkill = [...progress.skills].sort((a, b) => b.value - a.value)[0];
        newSuggestions.push({ 
          id: '4', 
          text: `Tell me more about ${topSkill.name} skills` 
        });
      }
      
      if (progress.achievements.some(a => !a.isLocked)) {
        newSuggestions.push({ 
          id: '5', 
          text: 'What achievements can I unlock next?' 
        });
      }
      
      setSuggestions(newSuggestions);
    } catch (err) {
      console.error('Error generating suggestions:', err);
    }
  }, [user?.id, progress, messages, setSuggestions]);

  // Clear chat history (only UI state, not server-side)
  const clearChat = useCallback(() => {
    setMessages([]);
  }, [setMessages]);

  return {
    messages,
    suggestions,
    isLoading,
    error,
    sendMessage,
    clearChat,
    loadChatHistory
  };
};