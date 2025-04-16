"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { RecentActivity } from '@/lib/types';
import { formatRelativeTime } from '@/lib/utils';
import { BookOpen, GamepadIcon, FileText } from 'lucide-react';

interface RecentActivitiesProps {
  activities: RecentActivity[];
  limit?: number;
}

export const RecentActivities = ({ activities, limit = 5 }: RecentActivitiesProps) => {
  const router = useRouter();
  const displayedActivities = activities.slice(0, limit);

  const getActivityIcon = (type: 'game' | 'quiz' | 'exercise') => {
    switch (type) {
      case 'game':
        return <GamepadIcon className="h-5 w-5 text-blue-500" />;
      case 'quiz':
        return <FileText className="h-5 w-5 text-purple-500" />;
      case 'exercise':
        return <BookOpen className="h-5 w-5 text-green-500" />;
      default:
        return <BookOpen className="h-5 w-5 text-gray-500" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <Card className="p-4 h-full">
      <h3 className="text-lg font-medium mb-4">Aktivitas Terbaru</h3>
      
      {displayedActivities.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">
          Belum ada aktivitas yang diselesaikan.
        </div>
      ) : (
        <div className="space-y-3">
          {displayedActivities.map((activity) => (
            <div 
              key={activity.id}
              className="flex items-start p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
              onClick={() => router.push(`/learning/${activity.type}s/${activity.id}`)}
            >
              <div className="p-2 rounded-full bg-gray-100 mr-3">
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm truncate">{activity.title}</h4>
                  <span className={`font-semibold text-sm ${getScoreColor(activity.score)}`}>
                    {activity.score}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-muted-foreground">{activity.subject}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatRelativeTime(new Date(activity.completedAt))}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {activities.length > limit && (
        <div className="mt-4 text-center">
          <button 
            className="text-primary text-sm hover:underline"
            onClick={() => router.push('/analytics/activities')}
          >
            Lihat semua aktivitas
          </button>
        </div>
      )}
    </Card>
  );
};