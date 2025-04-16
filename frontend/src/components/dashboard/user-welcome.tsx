"use client";

import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';

interface UserWelcomeProps {
  name: string;
  avatarUrl?: string;
  lastLoginTime?: Date;
}

export const UserWelcome = ({ name, avatarUrl, lastLoginTime }: UserWelcomeProps) => {
  // Determine greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 17) return 'Selamat Siang';
    return 'Selamat Malam';
  };

  // Format last login time if available
  const formattedLastLogin = lastLoginTime 
    ? `Terakhir masuk: ${format(new Date(lastLoginTime), 'dd MMM yyyy, HH:mm')}`
    : 'Selamat datang kembali!';

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary">
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
      <div>
        <h1 className="text-2xl font-bold">{getGreeting()}, {name}!</h1>
        <p className="text-muted-foreground text-sm">{formattedLastLogin}</p>
      </div>
    </div>
  );
};