import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'student' | 'parent' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearUser: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user 
      }),
      
      setToken: (token) => set({ token }),
      
      setIsLoading: (isLoading) => set({ isLoading }),
      
      setError: (error) => set({ error }),
      
      clearUser: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false, 
        error: null 
      }),
      
      login: async (email, password) => {
        try {
          set({ isLoading: true, error: null });
          
          // Call API to login
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to login');
          }
          
          const data = await response.json();
          
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
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
      
      register: async (userData) => {
        try {
          set({ isLoading: true, error: null });
          
          // Call API to register
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to register');
          }
          
          const data = await response.json();
          
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
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
      
      logout: async () => {
        try {
          set({ isLoading: true });
          
          // Call API to logout (if needed)
          await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${get().token}`,
            },
          });
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
          });
        }
      },
    }),
    {
      name: 'mindagrow-auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);