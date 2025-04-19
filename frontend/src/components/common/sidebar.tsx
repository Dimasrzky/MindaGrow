"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useAuth } from './auth-provider';
import { buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Home, 
  User, 
  BookOpen, 
  BarChart2, 
  MessageCircle, 
  Settings, 
  Users, 
  Book, 
  Award,
  Star,
  Activity,
  Calendar,
  HelpCircle 
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { user } = useAuth();
  const pathname = usePathname();
  
  if (!user) {
    return null;
  }
  
  // Define navigation based on user role
  const navigationItems = () => {
    const commonItems = [
      { href: '/profile', label: 'Profile', icon: User },
      { href: '/settings', label: 'Settings', icon: Settings },
      { href: '/help', label: 'Help & Support', icon: HelpCircle },
    ];
    
    if (user.role === 'student') {
      return [
        { href: '/student', label: 'Dashboard', icon: Home },
        { href: '/learning/games', label: 'Games', icon: Star },
        { href: '/learning/activities', label: 'Activities', icon: Activity },
        { href: '/learning/quizzes', label: 'Quizzes', icon: BookOpen },
        { href: '/analytics/progress', label: 'My Progress', icon: BarChart2 },
        { href: '/chatbot', label: 'AI Tutor', icon: MessageCircle },
        ...commonItems
      ];
    }
    
    if (user.role === 'parent') {
      return [
        { href: '/parent', label: 'Dashboard', icon: Home },
        { href: '/parent/children', label: 'My Children', icon: Users },
        { href: '/parent/activities', label: 'Assigned Activities', icon: Calendar },
        { href: '/analytics/reports', label: 'Progress Reports', icon: BarChart2 },
        { href: '/analytics/insights', label: 'Insights', icon: Activity },
        ...commonItems
      ];
    }
    
    if (user.role === 'teacher') {
      return [
        { href: '/teacher', label: 'Dashboard', icon: Home },
        { href: '/teacher/students', label: 'Students', icon: Users },
        { href: '/teacher/activities', label: 'Activities', icon: Book },
        { href: '/teacher/assignments', label: 'Assignments', icon: Calendar },
        { href: '/analytics/reports', label: 'Reports', icon: BarChart2 },
        { href: '/analytics/insights', label: 'Insights', icon: Award },
        ...commonItems
      ];
    }
    
    return commonItems;
  };
  
  const items = navigationItems();

  return (
    <aside className={cn("pb-12 w-[240px] border-r", className)}>
      <div className="px-3 py-4 space-y-2">
        <div className="py-2">
          <h2 className="px-4 text-lg font-semibold tracking-tight">
            {user.role === 'student' ? 'My Learning' : user.role === 'parent' ? 'Parent Portal' : 'Teacher Portal'}
          </h2>
        </div>
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="space-y-1 px-1">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    pathname === item.href
                      ? "bg-muted hover:bg-muted"
                      : "hover:bg-transparent hover:underline",
                    "justify-start w-full"
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
};