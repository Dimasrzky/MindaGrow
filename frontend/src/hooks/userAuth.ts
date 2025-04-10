// src/hooks/useAuth.ts
import { useState, useCallback, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Periksa token di localStorage saat inisialisasi
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulasi login untuk development
      // Pada implementasi nyata, lakukan fetch ke API
      const userData = {
        id: '1',
        name: 'User Test',
        email,
        role: 'student'
      };
      
      // Simpan token dan data user di localStorage
      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      return userData;
    } catch (error) {
      throw new Error('Login gagal');
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, role: string) => {
    setLoading(true);
    try {
      // Simulasi registrasi untuk development
      const userData = {
        id: '1',
        name,
        email,
        role
      };
      
      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      return userData;
    } catch (error) {
      throw new Error('Registrasi gagal');
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  return {
    user,
    loading,
    login,
    register,
    logout
  };
}