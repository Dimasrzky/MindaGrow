"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "parent" | "teacher" | "admin";
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  // Use your Zustand auth store
  const { user, setUser, clearUser } = useAuthStore();

  useEffect(() => {
    // Check auth status when component mounts
    checkAuth().finally(() => {
      setIsLoading(false);
    });
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Call to your login API
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      
      // Set user in the store
      setUser(data.user);
      
      // Redirect based on user role
      if (data.user.role === "student") {
        router.push("/student");
      } else if (data.user.role === "parent") {
        router.push("/parent");
      } else if (data.user.role === "teacher") {
        router.push("/teacher");
      } else {
        router.push("/student"); // Default fallback
      }
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Call to your register API
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      
      // Set user in the store
      setUser(data.user);
      
      // Redirect to appropriate page
      router.push("/student");
      
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    
    // Call logout API to clear cookies
    fetch("/api/auth/logout", {
      method: "POST",
    })
      .then(() => {
        // Clear user from store
        clearUser();
        
        // Redirect to login page
        router.push("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const checkAuth = async (): Promise<boolean> => {
    try {
      // Call to check authentication status
      const response = await fetch("/api/auth/check");
      
      if (!response.ok) {
        clearUser();
        return false;
      }

      const data = await response.json();
      
      // Update user in store
      setUser(data.user);
      return true;
    } catch (error) {
      console.error("Auth check error:", error);
      clearUser();
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};