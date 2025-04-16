"use client";

import React from 'react';
import Image from 'next/image';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  difficulty: 'easy' | 'medium' | 'hard';
  onClick?: () => void;
}

export const GameCard = ({ id, title, description, imageUrl, difficulty, onClick }: GameCardProps) => {
  // Get badge color based on difficulty
  const getBadgeColor = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'hard':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  // Get difficulty label
  const getDifficultyLabel = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy':
        return 'Mudah';
      case 'medium':
        return 'Sedang';
      case 'hard':
        return 'Sulit';
      default:
        return 'Tidak Diketahui';
    }
  };

  return (
    <Card 
      className="overflow-hidden transition-transform duration-300 hover:shadow-md hover:scale-[1.02] cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-36 w-full">
        {imageUrl ? (
          <Image 
            src={imageUrl || '/images/games/placeholder.png'} 
            alt={title} 
            fill 
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-slate-200 flex items-center justify-center">
            <span className="text-slate-500">No image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          <Badge 
            variant="outline" 
            className={`text-xs ${getBadgeColor(difficulty)}`}
          >
            {getDifficultyLabel(difficulty)}
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
      </div>
    </Card>
  );
};