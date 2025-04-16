import { ProgressData } from '@/lib/types';

export const mockProgressData: ProgressData = {
  userId: '1',
  totalPoints: 1250,
  pointsChange: 150,
  completedActivities: 28,
  activitiesChange: 3,
  streakDays: 5,
  skills: [
    {
      name: 'problem-solving',
      value: 75,
      maxValue: 100
    },
    {
      name: 'cognitive',
      value: 82,
      maxValue: 100
    },
    {
      name: 'creative',
      value: 65,
      maxValue: 100
    },
    {
      name: 'communication',
      value: 60,
      maxValue: 100
    },
    {
      name: 'emotional',
      value: 70,
      maxValue: 100
    },
    {
      name: 'social',
      value: 68,
      maxValue: 100
    }
  ],
  weeklyProgress: [
    {
      day: 'Sen',
      score: 85,
      activities: 3
    },
    {
      day: 'Sel',
      score: 70,
      activities: 2
    },
    {
      day: 'Rab',
      score: 90,
      activities: 4
    },
    {
      day: 'Kam',
      score: 75,
      activities: 2
    },
    {
      day: 'Jum',
      score: 80,
      activities: 3
    },
    {
      day: 'Sab',
      score: 65,
      activities: 1
    },
    {
      day: 'Min',
      score: 0,
      activities: 0
    }
  ],
  subjectPerformance: [
    {
      subject: 'Matematika',
      score: 85,
      average: 75
    },
    {
      subject: 'Bahasa',
      score: 78,
      average: 72
    },
    {
      subject: 'Sains',
      score: 90,
      average: 78
    },
    {
      subject: 'Sosial',
      score: 70,
      average: 68
    },
    {
      subject: 'Seni',
      score: 65,
      average: 70
    },
    {
      subject: 'Pemrograman',
      score: 82,
      average: 65
    }
  ],
  recentActivities: [
    {
      id: 'act1',
      title: 'MathQuest Adventure',
      type: 'game',
      completedAt: '2023-05-15T14:30:00Z',
      score: 85,
      subject: 'Matematika'
    },
    {
      id: 'act2',
      title: 'Science Lab',
      type: 'game',
      completedAt: '2023-05-14T10:15:00Z',
      score: 92,
      subject: 'Sains'
    },
    {
      id: 'act3',
      title: 'Quiz Bahasa Indonesia',
      type: 'quiz',
      completedAt: '2023-05-13T16:45:00Z',
      score: 78,
      subject: 'Bahasa'
    },
    {
      id: 'act4',
      title: 'Code Blocks',
      type: 'game',
      completedAt: '2023-05-12T11:30:00Z',
      score: 80,
      subject: 'Pemrograman'
    },
    {
      id: 'act5',
      title: 'Latihan Perkalian',
      type: 'exercise',
      completedAt: '2023-05-11T09:00:00Z',
      score: 75,
      subject: 'Matematika'
    }
  ],
  achievements: [
    {
      id: 'ach1',
      title: 'Penjelajah Matematika',
      description: 'Selesaikan 10 aktivitas matematika',
      imageUrl: '/images/achievements/math-explorer.png',
      earnedAt: '2023-05-10T15:30:00Z',
      progress: 100,
      isLocked: false
    },
    {
      id: 'ach2',
      title: 'Pemecah Masalah',
      description: 'Raih skor 90+ dalam 5 permainan berbeda',
      imageUrl: '/images/achievements/problem-solver.png',
      earnedAt: '2023-05-08T12:45:00Z',
      progress: 100,
      isLocked: false
    },
    {
      id: 'ach3',
      title: 'Ilmuwan Muda',
      description: 'Selesaikan semua eksperimen di Science Lab',
      imageUrl: '/images/achievements/young-scientist.png',
      progress: 80,
      isLocked: false
    },
    {
      id: 'ach4',
      title: 'Programmer Andal',
      description: 'Selesaikan 15 tantangan pemrograman',
      imageUrl: '/images/achievements/coding-master.png',
      progress: 60,
      isLocked: false
    },
    {
      id: 'ach5',
      title: 'Guru Bahasa',
      description: 'Raih skor sempurna dalam 3 quiz bahasa berturut-turut',
      imageUrl: '/images/achievements/language-guru.png',
      progress: 33,
      isLocked: false
    },
    {
      id: 'ach6',
      title: 'Master Seni',
      description: 'Buat 10 karya seni digital',
      imageUrl: '/images/achievements/art-master.png',
      progress: 20,
      isLocked: false
    },
    {
      id: 'ach7',
      title: 'Konsistensi Luar Biasa',
      description: 'Masuk dan belajar selama 30 hari berturut-turut',
      imageUrl: '/images/achievements/streak-master.png',
      progress: 16,
      isLocked: false
    },
    {
      id: 'ach8',
      title: 'Pembelajar Sejati',
      description: 'Raih total 5000 poin',
      imageUrl: '/images/achievements/true-learner.png',
      progress: 25,
      isLocked: false
    }
  ]
};