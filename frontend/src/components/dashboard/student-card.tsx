"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart2, ArrowRight } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

interface StudentCardProps {
  id: string;
  name: string;
  avatarUrl?: string;
  grade: string;
  age: number;
  lastActivity?: string;
  points: number;
  progress: number;
  strengths: string[];
  areasToImprove: string[];
}

export const StudentCard = ({
  id,
  name,
  avatarUrl,
  grade,
  age,
  lastActivity,
  points,
  progress,
  strengths,
  areasToImprove
}: StudentCardProps) => {
  const router = useRouter();

  // Get the top strength and area to improve
  const topStrength = strengths[0] || 'Belum ada data';
  const topAreaToImprove = areasToImprove[0] || 'Belum ada data';

  // Handle click to view student details
  const handleViewDetails = () => {
    router.push(`/dashboard/teacher/students/${id}`);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
            {avatarUrl ? (
              <Image 
                src={avatarUrl} 
                alt={`Avatar untuk ${name}`} 
                fill 
                className="object-cover"
              />
            ) : (
              <div className="bg-primary h-full w-full flex items-center justify-center text-white text-2xl font-bold">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Student Info */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                    {grade}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{age} Tahun</span>
                </div>
              </div>
              <Badge 
                variant="outline" 
                className="bg-green-50 text-green-700 hover:bg-green-50 flex items-center gap-1"
              >
                <BarChart2 className="h-3 w-3" />
                {points} Poin
              </Badge>
            </div>

            {/* Last Activity */}
            {lastActivity && (
              <p className="text-xs text-muted-foreground mt-2">
                Aktivitas terakhir: {formatRelativeTime(new Date(lastActivity))}
              </p>
            )}

            {/* Progress */}
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Progres Keseluruhan</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>

        {/* Strengths and Areas to Improve */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Kelebihan Utama</p>
            <p className="text-sm font-medium">{topStrength}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Area Peningkatan</p>
            <p className="text-sm font-medium">{topAreaToImprove}</p>
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={handleViewDetails}
          className="w-full mt-4 py-2 flex items-center justify-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
        >
          Lihat Detail
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
};