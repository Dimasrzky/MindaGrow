"use client";

import React from 'react';
import { SubjectPerformance } from '@/lib/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';

interface SubjectBarChartProps {
  data: SubjectPerformance[];
}

export const SubjectBarChart = ({ data }: SubjectBarChartProps) => {
  // If no data is provided, return placeholder
  if (!data || data.length === 0) {
    return (
      <div className="h-64 w-full flex items-center justify-center bg-gray-50 rounded-md">
        <p className="text-muted-foreground">Tidak ada data performa mata pelajaran tersedia</p>
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
            Skor Anda: {payload[0].value}%
          </p>
          <p className="text-sm text-gray-600">
            Rata-rata Kelas: {payload[1].value}%
          </p>
          <p className="text-sm text-green-600">
            Selisih: {Math.round(payload[0].value - payload[1].value)}%
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
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="subject" />
          <YAxis domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine y={70} stroke="#ff4500" strokeDasharray="3 3" label={{ value: 'KKM (70%)', position: 'top', fill: '#ff4500' }} />
          <Bar dataKey="score" name="Skor Anda" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          <Bar dataKey="average" name="Rata-rata Kelas" fill="#9ca3af" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};