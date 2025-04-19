import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export default function LoginLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          {/* Logo skeleton */}
          <Skeleton className="h-12 w-12 rounded-full mb-4" />
          
          {/* Title skeleton */}
          <Skeleton className="h-8 w-64 mb-2" />
          
          {/* Subtitle skeleton */}
          <Skeleton className="h-4 w-48" />
        </div>
        
        <Card className="p-6 shadow-md">
          {/* Form skeleton */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            
            <div className="flex items-center">
              <Skeleton className="h-4 w-4 mr-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            
            <Skeleton className="h-10 w-full" />
          </div>
          
          <div className="mt-6 flex items-center justify-center">
            <Skeleton className="h-4 w-40" />
          </div>
        </Card>
      </div>
    </div>
  );
}