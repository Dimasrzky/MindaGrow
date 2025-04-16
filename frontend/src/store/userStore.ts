import { create } from 'zustand';
import { useAuth } from '@/hooks/useAuth';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'parent' | 'teacher' | 'admin';
  avatarUrl?: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    soundEffects: boolean;
    animationLevel: 'high' | 'medium' | 'low' | 'none';
  };
  personalInfo?: {
    age?: number;
    grade?: number;
    interests?: string[];
    favoriteSubjects?: string[];
    learningStyle?: string;
  };
}

interface ParentProfile extends UserProfile {
  role: 'parent';
  children: {
    id: string;
    name: string;
    avatarUrl?: string;
  }[];
}

interface TeacherProfile extends UserProfile {
  role: 'teacher';
  classes: {
    id: string;
    name: string;
    grade: number;
    studentsCount: number;
  }[];
}

type ExtendedUserProfile = UserProfile | ParentProfile | TeacherProfile;

interface UserState {
  profile: ExtendedUserProfile | null;
  isLoading: boolean;
  error: string | null;
  setProfile: (profile: ExtendedUserProfile) => void;
  updatePreferences: (preferences: Partial<UserProfile['preferences']>) => void;
  updatePersonalInfo: (info: Partial<UserProfile['personalInfo']>) => void;
  setAvatar: (avatarUrl: string) => void;
  clearProfile: () => void;
}

export const userStore = create<UserState>((set) => ({
  profile: null,
  isLoading: false,
  error: null,
  
  setProfile: (profile) => set({ profile }),
  
  updatePreferences: (preferences) => set((state) => {
    if (!state.profile) return state;
    
    return {
      profile: {
        ...state.profile,
        preferences: {
          ...state.profile.preferences,
          ...preferences,
        },
      },
    };
  }),
  
  updatePersonalInfo: (info) => set((state) => {
    if (!state.profile) return state;
    
    return {
      profile: {
        ...state.profile,
        personalInfo: {
          ...state.profile.personalInfo,
          ...info,
        },
      },
    };
  }),
  
  setAvatar: (avatarUrl) => set((state) => {
    if (!state.profile) return state;
    
    return {
      profile: {
        ...state.profile,
        avatarUrl,
      },
    };
  }),
  
  clearProfile: () => set({ profile: null }),
}));