// src/lib/types.ts
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'parent' | 'teacher' | 'admin';
    avatarUrl?: string;
    lastLoginAt?: Date;
  }