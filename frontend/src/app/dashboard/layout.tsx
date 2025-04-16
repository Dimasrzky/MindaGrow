"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { 
  LayoutDashboard, Users, BookOpen, BarChart2, 
  MessageCircle, Settings, LogOut, Menu, X
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [loading, user, router]);

  // Handle logout
  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  // Get sidebar links based on user role
  const getSidebarLinks = () => {
    switch (user?.role) {
      case 'student':
        return [
          { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/dashboard/student' },
          { icon: <BookOpen size={20} />, label: 'Pembelajaran', href: '/learning/games' },
          { icon: <BarChart2 size={20} />, label: 'Progres', href: '/analytics/progress' },
          { icon: <MessageCircle size={20} />, label: 'Konsultasi AI', href: '/chatbot' },
          { icon: <Settings size={20} />, label: 'Pengaturan', href: '/dashboard/student/settings' },
        ];
      case 'parent':
        return [
          { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/dashboard/parent' },
          { icon: <Users size={20} />, label: 'Anak-anak', href: '/dashboard/parent/children' },
          { icon: <BarChart2 size={20} />, label: 'Laporan', href: '/analytics/reports' },
          { icon: <Settings size={20} />, label: 'Pengaturan', href: '/dashboard/parent/settings' },
        ];
      case 'teacher':
        return [
          { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/dashboard/teacher' },
          { icon: <Users size={20} />, label: 'Siswa', href: '/dashboard/teacher/students' },
          { icon: <BookOpen size={20} />, label: 'Materi', href: '/dashboard/teacher/materials' },
          { icon: <BarChart2 size={20} />, label: 'Laporan', href: '/analytics/reports' },
          { icon: <Settings size={20} />, label: 'Pengaturan', href: '/dashboard/teacher/settings' },
        ];
      default:
        return [
          { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/dashboard/student' },
        ];
    }
  };

  // If still loading, show minimal layout
  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <div className="flex-grow p-6">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (Desktop) */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out bg-white border-r border-gray-200 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8">
              <Image 
                src="/logo.svg" 
                alt="MindaGrow Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <span className="text-lg font-bold">MindaGrow</span>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Sidebar Links */}
        <nav className="p-4 space-y-1">
          {getSidebarLinks().map((link, index) => (
            <Link 
              key={index} 
              href={link.href}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <span className="text-gray-500">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
        
        {/* Sidebar Footer */}
        <div className="absolute bottom-0 w-full p-4 border-t">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full p-2 rounded-md hover:bg-gray-100 transition-colors text-red-500"
          >
            <LogOut size={20} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <header className="bg-white border-b p-4 flex items-center justify-between">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              {user && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
      
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}