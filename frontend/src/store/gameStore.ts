import { create } from 'zustand';
import { Game } from '@/hooks/useGames';

interface GameState {
  games: Game[];
  recommendedGames: Game[];
  currentGame: Game | null;
  currentGameState: {
    isPlaying: boolean;
    level: number;
    score: number;
    startTime: number | null;
    timeElapsed: number;
  };
  setGames: (games: Game[]) => void;
  setRecommendedGames: (games: Game[]) => void;
  setCurrentGame: (game: Game | null) => void;
  startGame: () => void;
  endGame: () => void;
  setLevel: (level: number) => void;
  addScore: (points: number) => void;
  resetScore: () => void;
  updateTimeElapsed: (timeElapsed: number) => void;
  resetGameState: () => void;
}

// Default state for current game
const DEFAULT_GAME_STATE = {
  isPlaying: false,
  level: 1,
  score: 0,
  startTime: null,
  timeElapsed: 0,
};

export const gameStore = create<GameState>((set) => ({
  games: [],
  recommendedGames: [],
  currentGame: null,
  currentGameState: DEFAULT_GAME_STATE,
  
  setGames: (games) => set({ games }),
  
  setRecommendedGames: (games) => set({ recommendedGames: games }),
  
  setCurrentGame: (game) => set({ 
    currentGame: game,
    // Reset game state when changing games
    currentGameState: DEFAULT_GAME_STATE,
  }),
  
  startGame: () => set((state) => ({
    currentGameState: {
      ...state.currentGameState,
      isPlaying: true,
      startTime: Date.now(),
      timeElapsed: 0,
    }
  })),
  
  endGame: () => set((state) => ({
    currentGameState: {
      ...state.currentGameState,
      isPlaying: false,
    }
  })),
  
  setLevel: (level) => set((state) => ({
    currentGameState: {
      ...state.currentGameState,
      level,
    }
  })),
  
  addScore: (points) => set((state) => ({
    currentGameState: {
      ...state.currentGameState,
      score: state.currentGameState.score + points,
    }
  })),
  
  resetScore: () => set((state) => ({
    currentGameState: {
      ...state.currentGameState,
      score: 0,
    }
  })),
  
  updateTimeElapsed: (timeElapsed) => set((state) => ({
    currentGameState: {
      ...state.currentGameState,
      timeElapsed,
    }
  })),
  
  resetGameState: () => set({ 
    currentGameState: DEFAULT_GAME_STATE,
  }),
}));