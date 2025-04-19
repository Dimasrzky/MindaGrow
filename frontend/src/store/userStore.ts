import { create } from 'zustand';
import { useAuthStore } from './authStore';

export interface Child {
  id: string;
  name: string;
  age: number;
  grade: string;
  avatar?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  children?: Child[];
  school?: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    emailUpdates: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface StudentList {
  id: string;
  name: string;
  avatar?: string;
  grade?: string;
  recentActivity?: string;
  lastActive?: string;
}

interface UserState {
  profile: UserProfile | null;
  children: Child[];
  students: StudentList[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchUserProfile: () => Promise<void>;
  updateUserProfile: (profileData: Partial<UserProfile>) => Promise<boolean>;
  fetchChildren: () => Promise<void>;
  fetchStudents: () => Promise<void>;
  addChild: (childData: Omit<Child, 'id'>) => Promise<boolean>;
  removeChild: (childId: string) => Promise<boolean>;
}

export const useUserStore = create<UserState>()((set, get) => ({
  profile: null,
  children: [],
  students: [],
  isLoading: false,
  error: null,
  
  fetchUserProfile: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const auth = useAuthStore.getState();
      
      if (!auth.isAuthenticated || !auth.user) {
        throw new Error('User must be authenticated to fetch profile');
      }
      
      const response = await fetch(`/api/users/${auth.user.id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      
      const data = await response.json();
      
      set({
        profile: data,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  },
  
  updateUserProfile: async (profileData) => {
    try {
      set({ isLoading: true, error: null });
      
      const auth = useAuthStore.getState();
      
      if (!auth.isAuthenticated || !auth.user) {
        throw new Error('User must be authenticated to update profile');
      }
      
      const response = await fetch(`/api/users/${auth.user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(profileData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }
      
      // Update local state
      const updatedProfile = { ...get().profile, ...profileData };
      set({
        profile: updatedProfile as UserProfile,
        isLoading: false,
      });
      
      // Update auth store if name was changed
      if (profileData.name) {
        const user = auth.user;
        useAuthStore.setState({ 
          user: { ...user, name: profileData.name } 
        });
      }
      
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
      return false;
    }
  },
  
  fetchChildren: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const auth = useAuthStore.getState();
      
      if (!auth.isAuthenticated || !auth.user) {
        throw new Error('User must be authenticated to fetch children');
      }
      
      if (auth.user.role !== 'parent') {
        throw new Error('Only parents can access children data');
      }
      
      const response = await fetch('/api/users/children', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch children');
      }
      
      const data = await response.json();
      
      set({
        children: data.children,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  },
  
  fetchStudents: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const auth = useAuthStore.getState();
      
      if (!auth.isAuthenticated || !auth.user) {
        throw new Error('User must be authenticated to fetch students');
      }
      
      if (auth.user.role !== 'teacher') {
        throw new Error('Only teachers can access student data');
      }
      
      const response = await fetch('/api/users/students', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      
      const data = await response.json();
      
      set({
        students: data.students,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  },
  
  addChild: async (childData) => {
    try {
      set({ isLoading: true, error: null });
      
      const auth = useAuthStore.getState();
      
      if (!auth.isAuthenticated || !auth.user) {
        throw new Error('User must be authenticated to add a child');
      }
      
      if (auth.user.role !== 'parent') {
        throw new Error('Only parents can add children');
      }
      
      const response = await fetch('/api/users/children', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(childData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add child');
      }
      
      // Refresh children list
      await get().fetchChildren();
      
      set({ isLoading: false });
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
      return false;
    }
  },
  
  removeChild: async (childId) => {
    try {
      set({ isLoading: true, error: null });
      
      const auth = useAuthStore.getState();
      
      if (!auth.isAuthenticated || !auth.user) {
        throw new Error('User must be authenticated to remove a child');
      }
      
      if (auth.user.role !== 'parent') {
        throw new Error('Only parents can remove children');
      }
      
      const response = await fetch(`/api/users/children/${childId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove child');
      }
      
      // Update local state
      const updatedChildren = get().children.filter(child => child.id !== childId);
      set({
        children: updatedChildren,
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
}));