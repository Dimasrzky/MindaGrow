import React from 'react';
import type { ReactNode } from 'react';
import { Logo } from '@/components/common/logo';
import { HeroAnimation } from '@/components/common/hero-animation';
import Link from 'next/link';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      {/* Left side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-8">
            <Link href="/" className="inline-block">
              <Logo />
            </Link>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome to MindaGrow</h2>
            <p className="mt-2 text-sm text-gray-600">
              Personalized education for your child's unique journey
            </p>
          </div>
          
          {/* Auth form will be rendered here */}
          <div className="bg-white p-8 shadow rounded-lg">
            {children}
          </div>
        </div>
      </div>
      
      {/* Right side - Illustration/Animation */}
      <div className="hidden lg:block relative flex-1 bg-indigo-100">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <HeroAnimation />
            <div className="mt-8 text-center">
              <h3 className="text-xl font-semibold text-indigo-900">Unlock your child's potential</h3>
              <p className="mt-2 text-indigo-700">
                Personalized learning experiences that adapt to your child's unique abilities
              </p>
              
              {/* Feature highlights */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-75 p-4 rounded-lg shadow-sm">
                  <div className="text-indigo-600 font-semibold">AI-Powered Learning</div>
                  <div className="text-sm text-gray-600">Content adapted to your child's needs</div>
                </div>
                <div className="bg-white bg-opacity-75 p-4 rounded-lg shadow-sm">
                  <div className="text-indigo-600 font-semibold">Gamified Experience</div>
                  <div className="text-sm text-gray-600">Making learning fun and engaging</div>
                </div>
                <div className="bg-white bg-opacity-75 p-4 rounded-lg shadow-sm">
                  <div className="text-indigo-600 font-semibold">Progress Tracking</div>
                  <div className="text-sm text-gray-600">Real-time insights on development</div>
                </div>
                <div className="bg-white bg-opacity-75 p-4 rounded-lg shadow-sm">
                  <div className="text-indigo-600 font-semibold">Expert Guidance</div>
                  <div className="text-sm text-gray-600">Educational support when needed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}