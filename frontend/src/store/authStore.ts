import { create } from 'zustand';
import { useAuth } from '@/hooks/useAuth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (value: boolean) => void;
  clearAuth: () => void;
}

export const authStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  setUser: (user) => set({ user }),
  
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  
  clearAuth: () => set({ user: null, isAuthenticated: false }),
}));