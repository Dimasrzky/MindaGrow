"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function StudentDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [stats, setStats] = useState({
    totalPoints: 0,
    completedActivities: 0,
    streakDays: 0
  });
  
  // Check if user is authenticated and has the correct role
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/auth/login');
        return;
      }
      
      if (user?.role !== 'student') {
        // Redirect to appropriate dashboard based on role
        if (user?.role === 'parent') {
          router.push('/dashboard/parent');
        } else if (user?.role === 'teacher') {
          router.push('/dashboard/teacher');
        } else {
          router.push('/auth/login');
        }
        return;
      }
      
      // Load mock stats
      setStats({
        totalPoints: 250,
        completedActivities: 12,
        streakDays: 3
      });
    }
  }, [loading, isAuthenticated, user, router]);

  // Handle logout
  const handleLogout = () => {
    logout();
  };

  // If still loading, show a simple loading state
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">MindaGrow Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Hello, {user?.name || 'Student'}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Selamat Pagi, {user?.name || 'Student'}!</h2>
          <p className="text-gray-600">Selamat datang kembali!</p>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Total Points</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalPoints}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Completed Activities</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.completedActivities}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Streak Days</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.streakDays}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <a href="#" className="border-indigo-500 text-indigo-600 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm">
              Overview
            </a>
            <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm">
              My Progress
            </a>
            <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm">
              Activities
            </a>
            <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm">
              Achievements
            </a>
          </nav>
        </div>

        {/* Learning Progress */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Progress</h3>
          <div className="bg-white shadow rounded-lg p-6 flex items-center justify-center h-48">
            <p className="text-gray-500">Tidak ada data progres tersedia</p>
          </div>
          <div className="mt-4 flex justify-end">
            <Link 
              href="/analytics/progress"
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              View Detailed Progress
            </Link>
          </div>
        </div>

        {/* Skills Overview */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Skills Overview</h3>
          <div className="bg-white shadow rounded-lg p-6 flex items-center justify-center h-48">
            <p className="text-gray-500">Tidak ada data kemampuan tersedia</p>
          </div>
          <p className="mt-2 text-sm text-gray-500">Skills based on your recent activities.</p>
        </div>

        {/* Recent Activities */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Aktivitas Terbaru</h3>
          <div className="bg-white shadow rounded-lg p-6 flex items-center justify-center h-32">
            <p className="text-gray-500">Belum ada aktivitas yang diselesaikan.</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Menu Cepat</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/learning/games"
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
              <span className="text-sm">Learning Games</span>
            </Link>
            <Link
              href="/chatbot"
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="text-sm">Chat with Advisor</span>
            </Link>
            <Link
              href="/dashboard/student/profile"
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm">My Profile</span>
            </Link>
            <Link
              href="/dashboard/student/settings"
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">Settings</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}