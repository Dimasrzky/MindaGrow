import { create } from 'zustand';
import { ProgressData, Skill } from '@/hooks/useProgress';

interface ProgressState {
  progress: ProgressData | null;
  setProgress: (data: ProgressData) => void;
  updateSkills: (skillsGained: Record<string, number>) => void;
  addPoints: (points: number) => void;
  resetProgress: () => void;
}

export const progressStore = create<ProgressState>((set) => ({
  progress: null,
  
  setProgress: (data) => set({ progress: data }),
  
  updateSkills: (skillsGained) => set((state) => {
    if (!state.progress) return state;
    
    // Create a copy of the current skills array
    const updatedSkills = [...state.progress.skills];
    
    // Update each skill with the gained values
    Object.entries(skillsGained).forEach(([skillName, gainedValue]) => {
      const skillIndex = updatedSkills.findIndex(skill => skill.name === skillName);
      
      if (skillIndex !== -1) {
        // Update existing skill
        updatedSkills[skillIndex] = {
          ...updatedSkills[skillIndex],
          value: Math.min(
            updatedSkills[skillIndex].value + gainedValue,
            updatedSkills[skillIndex].maxValue
          ),
        };
      } else {
        // Add new skill
        updatedSkills.push({
          name: skillName,
          value: gainedValue,
          maxValue: 100, // Default max value
        });
      }
    });
    
    return {
      progress: {
        ...state.progress,
        skills: updatedSkills,
      },
    };
  }),
  
  addPoints: (points) => set((state) => {
    if (!state.progress) return state;
    
    return {
      progress: {
        ...state.progress,
        totalPoints: state.progress.totalPoints + points,
        pointsChange: state.progress.pointsChange + points,
      },
    };
  }),
  
  resetProgress: () => set({ progress: null }),
}));