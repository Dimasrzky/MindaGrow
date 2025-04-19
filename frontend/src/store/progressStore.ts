import { create } from 'zustand';
import { useAuthStore } from './authStore';

export interface ProgressItem {
  id: string;
  userId: string;
  materialId: string;
  completionPercentage: number;
  score: number;
  timeSpent: number; // in seconds
  lastAccessedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface SkillProgress {
  skillId: string;
  skillName: string;
  level: number;
  progressPercentage: number;
}

export interface SubjectProgress {
  subjectId: string;
  subjectName: string;
  averageScore: number;
  completedActivities: number;
  totalActivities: number;
}

interface ProgressState {
  learningProgress: ProgressItem[];
  skills: SkillProgress[];
  subjects: SubjectProgress[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchUserProgress: (userId?: string) => Promise<void>;
  updateProgress: (progressData: Partial<ProgressItem>) => Promise<boolean>;
  fetchSkillProgress: (userId?: string) => Promise<void>;
  fetchSubjectProgress: (userId?: string) => Promise<void>;
}

export const useProgressStore = create<ProgressState>()((set, get) => ({
  learningProgress: [],
  skills: [],
  subjects: [],
  isLoading: false,
  error: null,
  
  fetchUserProgress: async (userId) => {
    try {
      set({ isLoading: true, error: null });
      
      const auth = useAuthStore.getState();
      const targetUserId = userId || auth.user?.id;
      
      if (!targetUserId) {
        throw new Error('User ID is required to fetch progress');
      }
      
      const response = await fetch(`/api/progress/user/${targetUserId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch progress data');
      }
      
      const data = await response.json();
      
      set({
        learningProgress: data.progress,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  },
  
  updateProgress: async (progressData) => {
    try {
      set({ isLoading: true, error: null });
      
      const auth = useAuthStore.getState();
      
      if (!auth.isAuthenticated) {
        throw new Error('User must be authenticated to update progress');
      }
      
      const response = await fetch('/api/progress/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(progressData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update progress');
      }
      
      // Refresh progress data
      await get().fetchUserProgress();
      
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
  
  fetchSkillProgress: async (userId) => {
    try {
      set({ isLoading: true, error: null });
      
      const auth = useAuthStore.getState();
      const targetUserId = userId || auth.user?.id;
      
      if (!targetUserId) {
        throw new Error('User ID is required to fetch skill progress');
      }
      
      const response = await fetch(`/api/progress/skills/${targetUserId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch skill progress data');
      }
      
      const data = await response.json();
      
      set({
        skills: data.skills,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  },
  
  fetchSubjectProgress: async (userId) => {
    try {
      set({ isLoading: true, error: null });
      
      const auth = useAuthStore.getState();
      const targetUserId = userId || auth.user?.id;
      
      if (!targetUserId) {
        throw new Error('User ID is required to fetch subject progress');
      }
      
      const response = await fetch(`/api/progress/subjects/${targetUserId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch subject progress data');
      }
      
      const data = await response.json();
      
      set({
        subjects: data.subjects,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  },
}));