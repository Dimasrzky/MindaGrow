import { useState, useCallback } from 'react';

export const useLocalStorage = () => {
  // Check if window is defined (for SSR/Next.js support)
  const isClient = typeof window !== 'undefined';

  // Get item from localStorage
  const getItem = useCallback((key: string): string | null => {
    if (!isClient) return null;
    
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage:`, error);
      return null;
    }
  }, [isClient]);

  // Set item in localStorage
  const setItem = useCallback((key: string, value: string): boolean => {
    if (!isClient) return false;
    
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage:`, error);
      return false;
    }
  }, [isClient]);

  // Remove item from localStorage
  const removeItem = useCallback((key: string): boolean => {
    if (!isClient) return false;
    
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage:`, error);
      return false;
    }
  }, [isClient]);

  // Check if localStorage has a key
  const hasItem = useCallback((key: string): boolean => {
    if (!isClient) return false;
    
    try {
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.error(`Error checking if localStorage has key ${key}:`, error);
      return false;
    }
  }, [isClient]);

  // Clear all localStorage items
  const clear = useCallback((): boolean => {
    if (!isClient) return false;
    
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }, [isClient]);

  return {
    getItem,
    setItem,
    removeItem,
    hasItem,
    clear
  };
};