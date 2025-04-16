// API configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// App configuration
export const APP_NAME = 'MindaGrow';
export const APP_DESCRIPTION = 'Platform Pendidikan Anak Personalisasi';

// Navigation
export const NAVBAR_LINKS = [
  { label: 'Beranda', href: '/' },
  { label: 'Fitur', href: '/features' },
  { label: 'Harga', href: '/pricing' },
  { label: 'Tentang Kami', href: '/about' },
  { label: 'Kontak', href: '/contact' },
];

// Dashboard
export const DASHBOARD_SECTIONS = {
  student: [
    { label: 'Overview', href: '/dashboard/student' },
    { label: 'Game & Activities', href: '/learning/games' },
    { label: 'Progress', href: '/analytics/progress' },
    { label: 'Konsultasi AI', href: '/chatbot' },
  ],
  parent: [
    { label: 'Overview', href: '/dashboard/parent' },
    { label: 'Anak-anak', href: '/dashboard/parent/children' },
    { label: 'Laporan', href: '/analytics/reports' },
    { label: 'Pengaturan', href: '/dashboard/parent/settings' },
  ],
  teacher: [
    { label: 'Overview', href: '/dashboard/teacher' },
    { label: 'Siswa', href: '/dashboard/teacher/students' },
    { label: 'Materi', href: '/dashboard/teacher/materials' },
    { label: 'Pengaturan', href: '/dashboard/teacher/settings' },
  ],
};

// Subject categories
export const SUBJECT_CATEGORIES = [
  { id: 'math', name: 'Matematika' },
  { id: 'language', name: 'Bahasa' },
  { id: 'science', name: 'Sains' },
  { id: 'social', name: 'Sosial' },
  { id: 'arts', name: 'Seni' },
  { id: 'programming', name: 'Pemrograman' },
];

// Skill categories
export const SKILL_CATEGORIES = [
  { id: 'cognitive', name: 'Kognitif' },
  { id: 'problem-solving', name: 'Pemecahan Masalah' },
  { id: 'creative', name: 'Kreativitas' },
  { id: 'communication', name: 'Komunikasi' },
  { id: 'emotional', name: 'Emosional' },
  { id: 'social', name: 'Sosial' },
];

// Pagination
export const ITEMS_PER_PAGE = 10;

// Theme
export const DEFAULT_THEME = 'light';