"use client";

import React from 'react';
import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { 
  Gamepad2, MessageCircle, User, Settings, 
  BookOpen, BarChart3, Trophy, GraduationCap 
} from 'lucide-react';

interface NavigationItem {
  label: string;
  href: string;
  icon: string;
}

interface NavigationMenuProps {
  items: NavigationItem[];
}

export const NavigationMenu = ({ items }: NavigationMenuProps) => {
  // Function to get the icon component based on icon name
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'gamepad':
        return <Gamepad2 className="h-5 w-5" />;
      case 'message-circle':
        return <MessageCircle className="h-5 w-5" />;
      case 'user':
        return <User className="h-5 w-5" />;
      case 'settings':
        return <Settings className="h-5 w-5" />;
      case 'book':
        return <BookOpen className="h-5 w-5" />;
      case 'chart':
        return <BarChart3 className="h-5 w-5" />;
      case 'trophy':
        return <Trophy className="h-5 w-5" />;
      case 'education':
        return <GraduationCap className="h-5 w-5" />;
      default:
        return <Gamepad2 className="h-5 w-5" />;
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4">Menu Cepat</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <Link 
            key={index} 
            href={item.href}
            className="flex flex-col items-center justify-center p-4 rounded-md hover:bg-gray-50 transition-colors text-center"
          >
            <div className="p-2 rounded-full bg-primary/10 text-primary mb-2">
              {getIcon(item.icon)}
            </div>
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </div>
    </Card>
  );
};