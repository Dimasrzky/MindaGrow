import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Define User interface for better type checking
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  lastLoginAt?: Date | string;
}

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper function to safely set user with type compatibility
  const safeSetUser = (userData: any) => {
    // Make sure lastLoginAt is properly handled regardless of format
    if (userData && userData.lastLoginAt && typeof userData.lastLoginAt === 'string') {
      userData.lastLoginAt = new Date(userData.lastLoginAt);
    }
    setUser(userData);
  };

  useEffect(() => {
    // Check token in localStorage during initialization
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        safeSetUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate login for development
      // In a real implementation, you would fetch from your API
      let userData: User;
      
      // Demo mode with predefined users
      if (email.includes('student')) {
        userData = {
          id: '1',
          name: 'Student',
          email,
          role: 'student',
          lastLoginAt: new Date()
        };
      } else if (email.includes('parent')) {
        userData = {
          id: '2',
          name: 'Parent',
          email,
          role: 'parent',
          lastLoginAt: new Date()
        };
      } else if (email.includes('teacher')) {
        userData = {
          id: '3',
          name: 'Teacher',
          email,
          role: 'teacher',
          lastLoginAt: new Date()
        };
      } else {
        // Default user for testing
        userData = {
          id: '1',
          name: 'User Test',
          email,
          role: 'student',
          lastLoginAt: new Date()
        };
      }
      
      // Store token and user data in localStorage
      // Convert Date to string for storage
      const userForStorage = {
        ...userData,
        lastLoginAt: userData.lastLoginAt instanceof Date 
          ? userData.lastLoginAt.toISOString() 
          : userData.lastLoginAt
      };
      
      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(userForStorage));
      
      // Set user state
      safeSetUser(userData);
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login gagal');
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, role: string) => {
    setLoading(true);
    try {
      // Simulate registration for development
      const userData = {
        id: '1',
        name,
        email,
        role,
        lastLoginAt: new Date()
      };
      
      // Convert Date to string for storage
      const userForStorage = {
        ...userData,
        lastLoginAt: userData.lastLoginAt instanceof Date 
          ? userData.lastLoginAt.toISOString() 
          : userData.lastLoginAt
      };
      
      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(userForStorage));
      
      // Set user state
      safeSetUser(userData);
      return userData;
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registrasi gagal');
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Reset state
    setUser(null);
    
    // Redirect to login page
    router.push('/auth/login');
  }, [router]);

  // Check if user is authenticated
  const isAuthenticated = !!user;

  return {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout
  };
}