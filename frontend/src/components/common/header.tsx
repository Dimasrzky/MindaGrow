"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './logo';
import { UserAvatar } from './user-avatar';
import { useAuth } from './auth-provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Home, 
  BookOpen, 
  BarChart2, 
  MessageCircle, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Navigation links based on user role
  const getNavLinks = () => {
    if (!user) return [];
    
    const commonLinks = [
      { href: '/profile', label: 'Profile', icon: <Home size={18} /> },
      { href: '/settings', label: 'Settings', icon: <Settings size={18} /> }
    ];
    
    if (user.role === 'student') {
      return [
        { href: '/student', label: 'Dashboard', icon: <Home size={18} /> },
        { href: '/learning/games', label: 'Games', icon: <BookOpen size={18} /> },
        { href: '/analytics/progress', label: 'Progress', icon: <BarChart2 size={18} /> },
        { href: '/chatbot', label: 'AI Tutor', icon: <MessageCircle size={18} /> },
        ...commonLinks
      ];
    }
    
    if (user.role === 'parent') {
      return [
        { href: '/parent', label: 'Dashboard', icon: <Home size={18} /> },
        { href: '/parent/children', label: 'My Children', icon: <BookOpen size={18} /> },
        { href: '/analytics/reports', label: 'Reports', icon: <BarChart2 size={18} /> },
        ...commonLinks
      ];
    }
    
    if (user.role === 'teacher') {
      return [
        { href: '/teacher', label: 'Dashboard', icon: <Home size={18} /> },
        { href: '/teacher/students', label: 'Students', icon: <BookOpen size={18} /> },
        { href: '/analytics/reports', label: 'Reports', icon: <BarChart2 size={18} /> },
        ...commonLinks
      ];
    }
    
    return commonLinks;
  };
  
  const navLinks = getNavLinks();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          
          {/* Desktop Navigation */}
          {user && (
            <nav className="hidden md:flex ml-8 space-x-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                    pathname === link.href
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* User dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <UserAvatar 
                      user={user} 
                      className="h-10 w-10 bg-primary/10"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {navLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href} className="flex items-center cursor-pointer gap-2">
                        {link.icon}
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Mobile menu button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={toggleMenu}
              >
                {menuOpen ? <X /> : <Menu />}
              </Button>
            </>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {menuOpen && user && (
        <div className="md:hidden border-t p-4 bg-background">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                  pathname === link.href
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
                onClick={toggleMenu}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            <Button 
              variant="ghost" 
              className="justify-start text-destructive px-3 py-2 h-auto font-medium"
              onClick={() => {
                logout();
                toggleMenu();
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};