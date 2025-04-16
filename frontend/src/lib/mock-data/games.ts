import { Game } from '@/lib/types';

export const mockGames: Game[] = [
  {
    id: 'game1',
    title: 'MathQuest Adventure',
    description: 'Petualangan matematika yang menyenangkan dengan berbagai tantangan penjumlahan, pengurangan, perkalian, dan pembagian',
    imageUrl: '/images/games/math-quest.png',
    difficulty: 'easy',
    subjects: ['math'],
    skills: ['problem-solving', 'cognitive'],
    minAge: 6,
    maxAge: 10,
    estimatedTimeMinutes: 15,
    pointsReward: 100
  },
  {
    id: 'game2',
    title: 'Word Explorer',
    description: 'Jelajahi dunia kata-kata dengan tantangan permainan kata yang mengasah kemampuan bahasa',
    imageUrl: '/images/games/word-explorer.png',
    difficulty: 'medium',
    subjects: ['language'],
    skills: ['communication', 'cognitive'],
    minAge: 7,
    maxAge: 12,
    estimatedTimeMinutes: 20,
    pointsReward: 150
  },
  {
    id: 'game3',
    title: 'Science Lab',
    description: 'Lakukan eksperimen sains virtual yang menyenangkan sambil belajar konsep-konsep sains dasar',
    imageUrl: '/images/games/science-lab.png',
    difficulty: 'medium',
    subjects: ['science'],
    skills: ['problem-solving', 'creative'],
    minAge: 8,
    maxAge: 12,
    estimatedTimeMinutes: 25,
    pointsReward: 180
  },
  {
    id: 'game4',
    title: 'Code Blocks',
    description: 'Belajar dasar-dasar pemrograman dengan menyusun blok kode untuk menyelesaikan tantangan',
    imageUrl: '/images/games/code-blocks.png',
    difficulty: 'hard',
    subjects: ['programming'],
    skills: ['problem-solving', 'cognitive', 'creative'],
    minAge: 9,
    maxAge: 12,
    estimatedTimeMinutes: 30,
    pointsReward: 200
  },
  {
    id: 'game5',
    title: 'Musical Journey',
    description: 'Eksplorasi dunia musik dengan permainan interaktif yang memperkenalkan not, ritme, dan melodi',
    imageUrl: '/images/games/musical-journey.png',
    difficulty: 'easy',
    subjects: ['arts'],
    skills: ['creative', 'emotional'],
    minAge: 5,
    maxAge: 10,
    estimatedTimeMinutes: 15,
    pointsReward: 100
  },
  {
    id: 'game6',
    title: 'World Cultures',
    description: 'Berkeliling dunia virtual untuk belajar tentang budaya dan tradisi dari berbagai negara',
    imageUrl: '/images/games/world-cultures.png',
    difficulty: 'medium',
    subjects: ['social'],
    skills: ['social', 'communication'],
    minAge: 7,
    maxAge: 12,
    estimatedTimeMinutes: 20,
    pointsReward: 150
  }
];

export const mockRecommendedGames: Game[] = [
  mockGames[0], // MathQuest Adventure
  mockGames[2], // Science Lab
  mockGames[3], // Code Blocks
  mockGames[5]  // World Cultures
];