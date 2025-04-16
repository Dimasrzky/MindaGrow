import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { login as apiLogin, register as apiRegister, logout as apiLogout, refreshToken } from '@/lib/api/auth';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { authStore } from '@/store/authStore';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'parent' | 'teacher';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'parent' | 'teacher' | 'admin';
  avatarUrl?: string;
  lastLoginAt?: Date;
}

export const useAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setItem, removeItem, getItem } = useLocalStorage();
  
  // Use Zustand store for global auth state
  const { 
    user, 
    setUser, 
    isAuthenticated, 
    setIsAuthenticated,
    clearAuth
  } = authStore();

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const storedUser = getItem('user');
        const storedToken = getItem('token');

        if (storedToken && storedUser) {
          // Validate token by refreshing it
          const refreshResult = await refreshToken();
          if (refreshResult.success) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
            setItem('token', refreshResult.token);
          } else {
            // Token is invalid, clear auth state
            clearAuth();
            removeItem('user');
            removeItem('token');
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        clearAuth();
        removeItem('user');
        removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = useCallback(async (data: LoginData) => {
    setIsLoading(true);
    try {
      const response = await apiLogin(data);
      
      if (response.success) {
        const { user, token } = response;
        setUser(user);
        setIsAuthenticated(true);
        setItem('user', JSON.stringify(user));
        setItem('token', token);
        
        // Redirect based on user role
        router.push(`/${user.role}`);
        return { success: true };
      } else {
        return { success: false, error: response.error || 'Login failed' };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'An unexpected error occurred' };
    } finally {
      setIsLoading(false);
    }
  }, [router, setUser, setIsAuthenticated, setItem]);

  // Register function
  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await apiRegister(data);
      
      if (response.success) {
        const { user, token } = response;
        setUser(user);
        setIsAuthenticated(true);
        setItem('user', JSON.stringify(user));
        setItem('token', token);
        
        // Redirect to onboarding
        router.push('/onboarding');
        return { success: true };
      } else {
        return { success: false, error: response.error || 'Registration failed' };
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      return { success: false, error: error.message || 'An unexpected error occurred' };
    } finally {
      setIsLoading(false);
    }
  }, [router, setUser, setIsAuthenticated, setItem]);

  // Logout function
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await apiLogout();
      clearAuth();
      removeItem('user');
      removeItem('token');
      router.push('/login');
      return { success: true };
    } catch (error: any) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, [router, clearAuth, removeItem]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout
  };
};