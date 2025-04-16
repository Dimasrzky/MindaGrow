// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'parent' | 'teacher' | 'admin';
  avatarUrl?: string;
  lastLoginAt?: Date;
}

// Progress related types
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

// Game related types
export interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subjects: string[];
  skills: string[];
  minAge: number;
  maxAge: number;
  estimatedTimeMinutes: number;
  pointsReward: number;
}

export interface GameResult {
  score: number;
  timeSpentSeconds: number;
  completedAt: string;
  skillsGained: Record<string, number>;
  pointsGained: number;
}

// Chatbot related types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Suggestion {
  id: string;
  text: string;
}