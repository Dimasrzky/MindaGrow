import { useState, useCallback } from 'react';
import { 
  fetchAllGames, 
  fetchGameDetails, 
  fetchRecommendedGames,
  saveGameResults
} from '@/lib/api/games';
import { gameStore } from '@/store/gameStore';
import { useProgress } from '@/hooks/useProgress';

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

export const useGames = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { updateProgress } = useProgress();
  
  // Use Zustand store for games state
  const { 
    games, 
    setGames,
    currentGame,
    setCurrentGame,
    recommendedGames,
    setRecommendedGames
  } = gameStore();

  // Fetch all available games
  const fetchGames = useCallback(async (filters?: {
    difficulty?: 'easy' | 'medium' | 'hard';
    subject?: string;
    searchQuery?: string;
    skillsToImprove?: string[];
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAllGames(filters);
      setGames(data);
      return data;
    } catch (err: any) {
      console.error('Error fetching games:', err);
      setError(err.message || 'Failed to fetch games');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [setGames]);

  // Fetch personalized game recommendations for a user
  const fetchRecommendedGamesForUser = useCallback(async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchRecommendedGames(userId);
      setRecommendedGames(data);
      return data;
    } catch (err: any) {
      console.error('Error fetching recommended games:', err);
      setError(err.message || 'Failed to fetch recommended games');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [setRecommendedGames]);

  // Fetch details for a specific game
  const fetchGame = useCallback(async (gameId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchGameDetails(gameId);
      setCurrentGame(data);
      return data;
    } catch (err: any) {
      console.error('Error fetching game details:', err);
      setError(err.message || 'Failed to fetch game details');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [setCurrentGame]);

  // Submit game results and update user progress
  const submitGameResults = useCallback(async (
    userId: string, 
    gameId: string, 
    results: GameResult
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      // Save game results to the server
      const savedResults = await saveGameResults(userId, gameId, results);
      
      // Update user progress
      await updateProgress(userId, gameId, {
        score: results.score,
        skillsGained: results.skillsGained,
        pointsGained: results.pointsGained
      });
      
      return savedResults;
    } catch (err: any) {
      console.error('Error submitting game results:', err);
      setError(err.message || 'Failed to submit game results');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [updateProgress]);

  return {
    games,
    recommendedGames,
    currentGame,
    isLoading,
    error,
    fetchGames,
    fetchGame,
    fetchRecommendedGames: fetchRecommendedGamesForUser,
    submitGameResults
  };
};