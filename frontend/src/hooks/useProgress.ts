import { useState, useCallback } from 'react';
import { fetchUserProgress, updateUserProgress } from '@/lib/api/progress';
import { progressStore } from '@/store/progressStore';

export interface ProgressData {
  userId: string;
  totalPoints: number;
  pointsChange: number;
  completedActivities: number;
  activitiesChange: number;
  streakDays: number;
  skills: Skill[];
  weeklyProgress: WeeklyProgress[];
  subjectPerformance: SubjectPerformance[];
  recentActivities: RecentActivity[];
  achievements: Achievement[];
}

export interface Skill {
  name: string;
  value: number;
  maxValue: number;
}

export interface WeeklyProgress {
  day: string;
  score: number;
  activities: number;
}

export interface SubjectPerformance {
  subject: string;
  score: number;
  average: number;
}

export interface RecentActivity {
  id: string;
  title: string;
  type: 'game' | 'quiz' | 'exercise';
  completedAt: string;
  score: number;
  subject: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  earnedAt?: string;
  progress: number;
  isLocked: boolean;
}

export const useProgress = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use Zustand store for global progress state
  const { 
    progress, 
    setProgress,
    updateSkills,
    addPoints
  } = progressStore();

  const fetchProgress = useCallback(async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchUserProgress(userId);
      setProgress(data);
      return data;
    } catch (err: any) {
      console.error('Error fetching progress:', err);
      setError(err.message || 'Failed to fetch progress data');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [setProgress]);

  const updateProgress = useCallback(async (userId: string, activityId: string, data: {
    score: number;
    skillsGained?: Record<string, number>;
    pointsGained?: number;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await updateUserProgress(userId, activityId, data);
      
      // Update local state
      if (data.skillsGained) {
        updateSkills(data.skillsGained);
      }
      
      if (data.pointsGained) {
        addPoints(data.pointsGained);
      }
      
      // Refresh progress after update
      await fetchProgress(userId);
      
      return result;
    } catch (err: any) {
      console.error('Error updating progress:', err);
      setError(err.message || 'Failed to update progress data');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [fetchProgress, updateSkills, addPoints]);

  return {
    progress,
    isLoading,
    error,
    fetchProgress,
    updateProgress
  };
};