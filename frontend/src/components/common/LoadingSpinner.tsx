import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div
        className={cn(
          'animate-spin rounded-full border-t-primary border-r-transparent border-b-transparent border-l-transparent',
          sizeClasses[size],
          className
        )}
        style={{ borderColor: 'var(--primary) transparent transparent transparent', borderWidth: size === 'sm' ? '2px' : size === 'md' ? '3px' : '4px' }}
      />
    </div>
  );
};
