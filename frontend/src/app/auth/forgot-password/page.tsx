'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

// Components
import { ResetPasswordForm } from '@/components/forms/reset-password-form';
import { Card } from '@/components/ui/card';
import { PageTitle } from '@/components/common/page-title';
import { Logo } from '@/components/common/logo';
import { Button } from '@/components/ui/button';

export default function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleRequestReset = async (email: string) => {
    setError('');
    setIsLoading(true);
    setEmail(email);
    
    try {
      await requestPasswordReset(email);
      setSuccess(true);
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to send reset email. Please try again.');
      }
      console.error('Password reset request error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Logo />
          <PageTitle>Reset your password</PageTitle>
          <p className="mt-2 text-center text-sm text-gray-600">
            Remember your password?{' '}
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
          
          {success ? (
            <div className="space-y-6">
              <div className="p-4 bg-green-50 text-green-700 rounded border border-green-200">
                <h3 className="font-medium mb-2">Password Reset Email Sent</h3>
                <p className="text-sm">
                  We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions to reset your password.
                </p>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  If you don't see the email in your inbox, please check your spam folder.
                </p>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setSuccess(false)}
                >
                  Try again with a different email
                </Button>
                
                <div className="text-center">
                  <Link 
                    href="/login" 
                    className="text-sm font-medium text-primary hover:text-primary/80"
                  >
                    Return to sign in
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              <p className="mb-4 text-sm text-gray-600">
                Enter the email address associated with your account, and we'll send you a link to reset your password.
              </p>
              
              <ResetPasswordForm onSubmit={handleRequestReset} isLoading={isLoading} />
            </>
          )}
        </Card>
      </div>
    </div>
  );
}