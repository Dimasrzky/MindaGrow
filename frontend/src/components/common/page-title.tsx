import React from 'react';
import { cn } from '@/lib/utils';

interface PageTitleProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  title,
  description,
  className,
  children,
}) => {
  return (
    <div className={cn("mb-6 space-y-2", className)}>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="text-muted-foreground text-sm md:text-base">{description}</p>
      )}
      {children}
    </div>
  );
};