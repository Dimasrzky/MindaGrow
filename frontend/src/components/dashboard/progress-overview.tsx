"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProgressData } from '@/lib/types';

interface ProgressOverviewProps {
  progress: ProgressData | null;
}

export const ProgressOverview = ({ progress }: ProgressOverviewProps) => {
  if (!progress) {
    return (
      <Card className="p-4">
        <h3 className="text-lg font-medium mb-4">Ringkasan Kemajuan</h3>
        <div className="text-center py-4 text-muted-foreground">
          Data kemajuan tidak tersedia.
        </div>
      </Card>
    );
  }

  // Sort skills by value (descending) to display highest skills first
  const sortedSkills = [...progress.skills].sort((a, b) => b.value - a.value);

  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4">Ringkasan Kemajuan</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Stats */}
        <div>
          <h4 className="text-md font-medium mb-3">Statistik Keseluruhan</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Total Poin</span>
                <span className="font-medium">{progress.totalPoints}</span>
              </div>
              <Progress 
                value={(progress.totalPoints / 5000) * 100} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Target: 5,000 poin
              </p>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Aktivitas Selesai</span>
                <span className="font-medium">{progress.completedActivities}</span>
              </div>
              <Progress 
                value={(progress.completedActivities / 100) * 100} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Target: 100 aktivitas
              </p>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Hari Streak</span>
                <span className="font-medium">{progress.streakDays}</span>
              </div>
              <Progress 
                value={(progress.streakDays / 30) * 100} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Target: 30 hari berturut-turut
              </p>
            </div>
          </div>
        </div>
        
        {/* Skills */}
        <div>
          <h4 className="text-md font-medium mb-3">Kemampuan</h4>
          <div className="space-y-3">
            {sortedSkills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{skill.name}</span>
                  <span className="font-medium">{skill.value}/{skill.maxValue}</span>
                </div>
                <Progress 
                  value={(skill.value / skill.maxValue) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Subject Performance */}
      <div className="mt-6">
        <h4 className="text-md font-medium mb-3">Performa per Mata Pelajaran</h4>
        <div className="space-y-3">
          {progress.subjectPerformance.map((subject, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span>{subject.subject}</span>
                <span className="font-medium">{subject.score}%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${subject.score}%` }}
                />
                <div
                  className="h-full bg-gray-300 rounded-full relative -mt-2"
                  style={{ 
                    width: `${subject.average}%`,
                    opacity: 0.5
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Rata-rata kelas: {subject.average}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};