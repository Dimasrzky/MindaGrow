"use client";

import React from 'react';
import { Skill } from '@/lib/types';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';

interface SkillsRadarProps {
  data: Skill[];
}

export const SkillsRadar = ({ data }: SkillsRadarProps) => {
  // If no data is provided, return placeholder
  if (!data || data.length === 0) {
    return (
      <div className="h-64 w-full flex items-center justify-center bg-gray-50 rounded-md">
        <p className="text-muted-foreground">Tidak ada data kemampuan tersedia</p>
      </div>
    );
  }

  // Format data for radar chart
  const formattedData = data.map(skill => ({
    subject: skill.name,
    value: (skill.value / skill.maxValue) * 100,
    fullMark: 100
  }));

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-md shadow-sm">
          <p className="font-medium text-sm">{payload[0].payload.subject}</p>
          <p className="text-sm">
            Nilai: <span className="text-primary">{Math.round(payload[0].value)}%</span>
          </p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formattedData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Nilai"
            dataKey="value"
            stroke="#4f46e5"
            fill="#4f46e5"
            fillOpacity={0.6}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};