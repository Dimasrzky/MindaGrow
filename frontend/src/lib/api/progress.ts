import { API_BASE_URL } from '@/lib/constants';
import { ProgressData } from '@/lib/types';
import { mockProgressData } from '@/lib/mock-data/progress';

/**
 * Fetch user progress data
 */
export const fetchUserProgress = async (userId: string): Promise<ProgressData> => {
  try {
    const token = localStorage.getItem('token');
    
    // For development: return mock data
    if (process.env.NODE_ENV === 'development') {
      console.log('Dev mode: Returning mock progress data');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Return mock data for the specific user
      return mockProgressData;
    }
    
    // For production: actual API call
    const response = await fetch(`${API_BASE_URL}/progress/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch progress data');
    }
    
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching user progress:', error);
    throw error;
  }
};

/**
 * Update user progress after completing an activity
 */
export const updateUserProgress = async (
  userId: string, 
  activityId: string,
  data: {
    score: number;
    skillsGained?: Record<string, number>;
    pointsGained?: number;
  }
): Promise<{ success: boolean; updatedProgress?: Partial<ProgressData> }> => {
  try {
    const token = localStorage.getItem('token');
    
    // For development: simulate update
    if (process.env.NODE_ENV === 'development') {
      console.log('Dev mode: Simulating progress update', {
        userId,
        activityId,
        data
      });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return simulated success response
      return {
        success: true,
        updatedProgress: {
          totalPoints: mockProgressData.totalPoints + (data.pointsGained || 0),
          pointsChange: (data.pointsGained || 0),
          // Simplified response for development
        }
      };
    }
    
    // For production: actual API call
    const response = await fetch(`${API_BASE_URL}/progress/${userId}/activities/${activityId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update progress');
    }
    
    const result = await response.json();
    return {
      success: true,
      updatedProgress: result.progress
    };
  } catch (error: any) {
    console.error('Error updating user progress:', error);
    throw error;
  }
};

/**
 * Fetch user's achievement progress
 */
export const fetchUserAchievements = async (userId: string): Promise<ProgressData['achievements']> => {
  try {
    const token = localStorage.getItem('token');
    
    // For development: return mock data
    if (process.env.NODE_ENV === 'development') {
      console.log('Dev mode: Returning mock achievements data');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Return mock achievements data
      return mockProgressData.achievements;
    }
    
    // For production: actual API call
    const response = await fetch(`${API_BASE_URL}/progress/${userId}/achievements`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch achievements');
    }
    
    const data = await response.json();
    return data.achievements;
  } catch (error: any) {
    console.error('Error fetching user achievements:', error);
    throw error;
  }
};

/**
 * Get detailed progress analysis for a specific subject
 */
export const getSubjectProgress = async (
  userId: string,
  subjectId: string
): Promise<{
  subject: string;
  overallScore: number;
  topicsProgress: Array<{
    topic: string;
    score: number;
    activities: number;
    lastActivity: string;
  }>;
  recentActivities: Array<{
    id: string;
    title: string;
    completedAt: string;
    score: number;
  }>;
  recommendations: Array<{
    id: string;
    title: string;
    type: 'game' | 'quiz' | 'exercise';
    difficulty: 'easy' | 'medium' | 'hard';
  }>;
}> => {
  try {
    const token = localStorage.getItem('token');
    
    // For development: return mock data
    if (process.env.NODE_ENV === 'development') {
      console.log('Dev mode: Returning mock subject progress data');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Return mock subject progress data
      return {
        subject: 'Mathematics',
        overallScore: 78,
        topicsProgress: [
          { topic: 'Addition and Subtraction', score: 92, activities: 12, lastActivity: '2023-05-10T14:30:00Z' },
          { topic: 'Multiplication', score: 85, activities: 8, lastActivity: '2023-05-12T10:15:00Z' },
          { topic: 'Division', score: 67, activities: 6, lastActivity: '2023-05-08T16:45:00Z' },
          { topic: 'Fractions', score: 70, activities: 5, lastActivity: '2023-05-05T11:20:00Z' },
        ],
        recentActivities: [
          { id: 'act1', title: 'Multiplication Challenge', completedAt: '2023-05-12T10:15:00Z', score: 85 },
          { id: 'act2', title: 'Division Basics', completedAt: '2023-05-08T16:45:00Z', score: 67 },
          { id: 'act3', title: 'Addition Speed Game', completedAt: '2023-05-10T14:30:00Z', score: 92 },
        ],
        recommendations: [
          { id: 'rec1', title: 'Division Master', type: 'game', difficulty: 'medium' },
          { id: 'rec2', title: 'Fractions Quiz', type: 'quiz', difficulty: 'medium' },
          { id: 'rec3', title: 'Decimal Basics', type: 'exercise', difficulty: 'easy' },
        ]
      };
    }
    
    // For production: actual API call
    const response = await fetch(`${API_BASE_URL}/progress/${userId}/subjects/${subjectId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch subject progress');
    }
    
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching subject progress:', error);
    throw error;
  }
};