"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Trophy, CheckCircle, Flame, Zap } from "lucide-react";

type IconType = 'trophy' | 'check-circle' | 'flame' | 'zap';

interface StatsCardProps {
  title: string;
  value: number;
  change: number;
  icon: IconType;
  suffix?: string;
}

export const StatsCard = ({ title, value, change, icon, suffix = '' }: StatsCardProps) => {
  // Determine icon component based on icon prop
  const IconComponent = () => {
    switch (icon) {
      case 'trophy':
        return <Trophy className="h-8 w-8 text-yellow-500" />;
      case 'check-circle':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'flame':
        return <Flame className="h-8 w-8 text-orange-500" />;
      case 'zap':
        return <Zap className="h-8 w-8 text-blue-500" />;
      default:
        return <Trophy className="h-8 w-8 text-yellow-500" />;
    }
  };

  // Determine change indicator
  const ChangeIndicator = () => {
    if (change === 0) return null;
    
    if (change > 0) {
      return (
        <div className="flex items-center text-green-500 text-sm">
          <ArrowUp className="h-4 w-4 mr-1" />
          <span>+{change}{suffix}</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-red-500 text-sm">
          <ArrowDown className="h-4 w-4 mr-1" />
          <span>{change}{suffix}</span>
        </div>
      );
    }
  };

  return (
    <Card className="p-5 flex flex-col h-full">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold mr-2">{value}{suffix}</span>
            <ChangeIndicator />
          </div>
        </div>
        <div className="bg-primary-50 p-3 rounded-full bg-opacity-20">
          <IconComponent />
        </div>
      </div>
    </Card>
  );
};