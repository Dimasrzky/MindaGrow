'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

// Components
import { LoginForm } from '@/components/forms/login-form';
import { Card } from '@/components/ui/card';
import { PageTitle } from '@/components/common/page-title';
import { Logo } from '@/components/common/logo';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (email: string, password: string, remember: boolean) => {
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password, remember);
      router.push('/student'); // Redirect to appropriate dashboard based on user role
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Logo />
          <PageTitle>Sign in to your account</PageTitle>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/register" className="font-medium text-primary hover:text-primary/80">
              create a new account
            </Link>
          </p>
        </div>
        
        <Card className="p-6 shadow-md">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded border border-red-200">
              {error}
            </div>
          )}
          
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
          
          <div className="mt-6 flex items-center justify-center">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-primary hover:text-primary/80"
            >
              Forgot your password?
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}