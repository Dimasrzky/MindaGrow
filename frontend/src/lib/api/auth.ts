import { API_BASE_URL } from '@/lib/constants';
import { User } from '@/lib/types';

interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

/**
 * Login user with email and password
 */
export const login = async (data: { email: string; password: string }): Promise<AuthResponse> => {
  try {
    // For development: simulate API call
    if (process.env.NODE_ENV === 'development') {
      console.log('Dev mode: Simulating login API call');
      
      // Simulate successful login
      await new Promise(resolve => setTimeout(resolve, 800)); // Add delay to simulate network
      
      const mockUser: User = {
        id: '1',
        name: 'Andi',
        email: data.email,
        role: 'student',
        avatarUrl: '/images/avatars/default.png',
        lastLoginAt: new Date()
      };
      
      return {
        success: true,
        user: mockUser,
        token: 'mock-jwt-token'
      };
    }
    
    // For production: actual API call
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Login failed');
    }
    
    return {
      success: true,
      user: result.user,
      token: result.token
    };
  } catch (error: any) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred during login'
    };
  }
};

/**
 * Register new user
 */
export const register = async (data: {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'parent' | 'teacher';
}): Promise<AuthResponse> => {
  try {
    // For development: simulate API call
    if (process.env.NODE_ENV === 'development') {
      console.log('Dev mode: Simulating register API call');
      
      // Simulate successful registration
      await new Promise(resolve => setTimeout(resolve, 1000)); // Add delay to simulate network
      
      const mockUser: User = {
        id: '1',
        name: data.name,
        email: data.email,
        role: data.role,
        avatarUrl: '/images/avatars/default.png',
        lastLoginAt: new Date()
      };
      
      return {
        success: true,
        user: mockUser,
        token: 'mock-jwt-token'
      };
    }
    
    // For production: actual API call
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Registration failed');
    }
    
    return {
      success: true,
      user: result.user,
      token: result.token
    };
  } catch (error: any) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred during registration'
    };
  }
};

/**
 * Logout user (invalidate token on server)
 */
export const logout = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    const token = localStorage.getItem('token');
    
    // For development: simulate API call
    if (process.env.NODE_ENV === 'development') {
      console.log('Dev mode: Simulating logout API call');
      
      // Simulate successful logout
      await new Promise(resolve => setTimeout(resolve, 500)); // Add delay to simulate network
      
      return { success: true };
    }
    
    // For production: actual API call
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || 'Logout failed');
    }
    
    return { success: true };
  } catch (error: any) {
    console.error('Logout error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred during logout'
    };
  }
};

/**
 * Refresh JWT token
 */
export const refreshToken = async (): Promise<{ success: boolean; token?: string; error?: string }> => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No refresh token available');
    }
    
    // For development: simulate API call
    if (process.env.NODE_ENV === 'development') {
      console.log('Dev mode: Simulating token refresh API call');
      
      // Simulate successful token refresh
      await new Promise(resolve => setTimeout(resolve, 500)); // Add delay to simulate network
      
      return {
        success: true,
        token: 'new-mock-jwt-token'
      };
    }
    
    // For production: actual API call
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Token refresh failed');
    }
    
    return {
      success: true,
      token: result.token
    };
  } catch (error: any) {
    console.error('Token refresh error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred during token refresh'
    };
  }
};