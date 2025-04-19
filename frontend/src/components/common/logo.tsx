import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative w-10 h-10 mr-2">
        <Image 
          src="/logo.svg" 
          alt="MindaGrow Logo" 
          fill 
          className="object-contain" 
          priority
        />
      </div>
      <div className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
        MindaGrow
      </div>
    </div>
  );
};