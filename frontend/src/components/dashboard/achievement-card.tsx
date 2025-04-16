"use client";

import React from 'react';
import Image from 'next/image';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatRelativeTime } from '@/lib/utils';
import { Lock } from 'lucide-react';

interface AchievementCardProps {
  title: string;
  description: string;
  imageUrl: string;
  earnedAt?: string;
  progress: number;
  isLocked: boolean;
}

export const AchievementCard = ({ 
  title, 
  description, 
  imageUrl, 
  earnedAt, 
  progress, 
  isLocked 
}: AchievementCardProps) => {
  return (
    <Card className={`overflow-hidden transition-all duration-300 ${isLocked ? 'opacity-70' : 'hover:shadow-md'}`}>
      <div className="relative h-32 w-full bg-gradient-to-r from-primary-100 to-primary-50 flex justify-center items-center">
        <div className="relative h-20 w-20">
          {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full z-10">
              <Lock className="h-8 w-8 text-white" />
            </div>
          )}
          {imageUrl ? (
            <Image 
              src={imageUrl} 
              alt={title} 
              fill 
              className="object-contain"
            />
          ) : (
            <div className="h-full w-full bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500 text-xs">No image</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-center mb-2">{title}</h3>
        <p className="text-xs text-muted-foreground text-center mb-3">{description}</p>
        
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1">
            <span>{progress}% selesai</span>
            {earnedAt && (
              <span className="text-green-600">
                Diperoleh {formatRelativeTime(new Date(earnedAt))}
              </span>
            )}
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>
    </Card>
  );
};