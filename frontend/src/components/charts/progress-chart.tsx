"use client";

import React from 'react';
import { WeeklyProgress } from '@/lib/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ProgressChartProps {
  data: WeeklyProgress[];
}

export const ProgressChart = ({ data }: ProgressChartProps) => {
  // If no data is provided, return placeholder
  if (!data || data.length === 0) {
    return (
      <div className="h-64 w-full flex items-center justify-center bg-gray-50 rounded-md">
        <p className="text-muted-foreground">Tidak ada data progres tersedia</p>
      </div>
    );
  }

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-md shadow-sm">
          <p className="font-medium text-sm">{label}</p>
          <p className="text-sm text-blue-600">
            Skor: {payload[0].value}
          </p>
          <p className="text-sm text-green-600">
            Aktivitas: {payload[1].value}
          </p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis yAxisId="left" orientation="left" stroke="#4f46e5" />
          <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            yAxisId="left" 
            dataKey="score" 
            name="Skor" 
            fill="#4f46e5"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            yAxisId="right" 
            dataKey="activities" 
            name="Aktivitas" 
            fill="#10b981" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};