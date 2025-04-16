import { API_BASE_URL } from '@/lib/constants';
import { Game, GameResult } from '@/lib/types';
import { mockGames, mockRecommendedGames } from '@/lib/mock-data/games';

/**
 * Fetch all available games
 */
export const fetchAllGames = async (filters?: {
  difficulty?: 'easy' | 'medium' | 'hard';
  subject?: string;
  searchQuery?: string;
  skillsToImprove?: string[];
}): Promise<Game[]> => {
  try {
    const token = localStorage.getItem('token');
    
    // For development: return mock data
    if (process.env.NODE_ENV === 'development') {
      console.log('Dev mode: Returning mock games data');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Apply filters to mock data if provided
      let filteredGames = [...mockGames];
      
      if (filters) {
        if (filters.difficulty) {
          filteredGames = filteredGames.filter(game => game.difficulty === filters.difficulty);
        }
        
        if (filters.subject) {
          filteredGames = filteredGames.filter(game => game.subjects.includes(filters.subject));
        }
        
        if (filters.searchQuery) {
          const query = filters.searchQuery.toLowerCase();
          filteredGames = filteredGames.filter(game => 
            game.title.toLowerCase().includes(query) || 
            game.description.toLowerCase().includes(query)
          );
        }
        
        if (filters.skillsToImprove && filters.skillsToImprove.length > 0) {
          filteredGames = filteredGames.filter(game => 
            game.skills.some(skill => filters.skillsToImprove?.includes(skill))
          );
        }
      }
      
      return filteredGames;
    }
    
    // For production: actual API call
    let url = `${API_BASE_URL}/games`;
    
    // Add query parameters for filters
    if (filters) {
      const params = new URLSearchParams();
      
      if (filters.difficulty) {
        params.append('difficulty', filters.difficulty);
      }
      
      if (filters.subject) {
        params.append('subject', filters.subject);
      }
      
      if (filters.searchQuery) {
        params.append('search', filters.searchQuery);
      }
      
      if (filters.skillsToImprove && filters.skillsToImprove.length > 0) {
        filters.skillsToImprove.forEach(skill => {
          params.append('skills', skill);
        });
      }
      
      // Add parameters to URL if any exist
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
    }
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch games');
    }
    
    const data = await response.json();
    return data.games;
  } catch (error: any) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

/**
 * Fetch personalized game recommendations for a user
 */
export const fetchRecommendedGames = async (userId: string): Promise<Game[]> => {
  try {
    const token = localStorage.getItem('token');
    
    // For development: return mock data
    if (process.env.NODE_ENV === 'development') {
      console.log('Dev mode: Returning mock recommended games data');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      return mockRecommendedGames;
    }
    
    // For production: actual API call
    const response = await fetch(`${API_BASE_URL}/users/${userId}/recommendations/games`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch recommended games');
    }
    
    const data = await response.json();
    return data.games;
  } catch (error: any) {
    console.error('Error fetching recommended games:', error);
    throw error;
  }
};

/**
 * Fetch details for a specific game
 */
export const fetchGameDetails = async (gameId: string): Promise<Game> => {
  try {
    const token = localStorage.getItem('token');
    
    // For development: return mock data
    if (process.env.NODE_ENV === 'development') {
      console.log('Dev mode: Returning mock game details');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const game = mockGames.find(g => g.id === gameId);
      
      if (!game) {
        throw new Error('Game not found');
      }
      
      return game;
    }
    
    // For production: actual API call
    const response = await fetch(`${API_BASE_URL}/games/${gameId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch game details');
    }
    
    const data = await response.json();
    return data.game;
  } catch (error: any) {
    console.error('Error fetching game details:', error);
    throw error;
  }
};

/**
 * Save game results
 */
export const saveGameResults = async (
  userId: string,
  gameId: string,
  results: GameResult
): Promise<{
  success: boolean;
  gameStats?: {
    highScore: number;
    timesPlayed: number;
    averageScore: number;
  }
}> => {
  try {
    const token = localStorage.getItem('token');
    
    // For development: simulate saving
    if (process.env.NODE_ENV === 'development') {
      console.log('Dev mode: Simulating saving game results', {
        userId,
        gameId,
        results
      });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Return simulated success response
      return {
        success: true,
        gameStats: {
          highScore: Math.max(results.score, 85), // Simulate high score comparison
          timesPlayed: 3,
          averageScore: 76
        }
      };
    }
    
    // For production: actual API call
    const response = await fetch(`${API_BASE_URL}/games/${gameId}/results`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        ...results
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to save game results');
    }
    
    const data = await response.json();
    return {
      success: true,
      gameStats: data.gameStats
    };
  } catch (error: any) {
    console.error('Error saving game results:', error);
    throw error;
  }
};

/**
 * Fetch user's game history for a specific game
 */
export const fetchGameHistory = async (
  userId: string,
  gameId: string
): Promise<Array<{
  completedAt: string;
  score: number;
  timeSpentSeconds: number;
  skillsGained: Record<string, number>;
}>> => {
  try {
    const token = localStorage.getItem('token');
    
    // For development: return mock data
    if (process.env.NODE_ENV === 'development') {
      console.log('Dev mode: Returning mock game history');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Return mock game history data
      return [
        {
          completedAt: '2023-05-15T14:30:00Z',
          score: 85,
          timeSpentSeconds: 240,
          skillsGained: { 'problem-solving': 5, 'math-multiplication': 8 }
        },
        {
          completedAt: '2023-05-10T11:15:00Z',
          score: 72,
          timeSpentSeconds: 300,
          skillsGained: { 'problem-solving': 3, 'math-multiplication': 6 }
        },
        {
          completedAt: '2023-05-05T16:45:00Z',
          score: 68,
          timeSpentSeconds: 320,
          skillsGained: { 'problem-solving': 2, 'math-multiplication': 5 }
        }
      ];
    }
    
    // For production: actual API call
    const response = await fetch(`${API_BASE_URL}/users/${userId}/games/${gameId}/history`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch game history');
    }
    
    const data = await response.json();
    return data.history;
  } catch (error: any) {
    console.error('Error fetching game history:', error);
    throw error;
  }
};