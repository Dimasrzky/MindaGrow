'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

// Components
import { RegisterForm } from '@/components/forms/register-form';
import { Card } from '@/components/ui/card';
import { PageTitle } from '@/components/common/page-title';
import { Logo } from '@/components/common/logo';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (formData: {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'parent' | 'teacher';
    confirmPassword: string;
    agreeToTerms: boolean;
  }) => {
    setError('');
    setIsLoading(true);

    // Validation checks
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      setIsLoading(false);
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      // Redirect based on user role
      const redirectMap = {
        student: '/student',
        parent: '/parent',
        teacher: '/teacher',
      };
      
      router.push(redirectMap[formData.role]);
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Logo />
          <PageTitle>Create a new account</PageTitle>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary hover:text-primary/80">
              Sign in
            </Link>
          </p>
        </div>

        <Card className="p-6 shadow-md">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded border border-red-200">
              {error}
            </div>
          )}

          <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
        </Card>
      </div>
    </div>
  );
}