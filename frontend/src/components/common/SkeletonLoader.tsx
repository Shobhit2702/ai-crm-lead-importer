import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

interface SkeletonLoaderProps {
  type?: 'card' | 'table' | 'chart' | 'list';
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  type = 'card',
  count = 1,
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'table':
        return (
          <div className="w-full space-y-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-1/4" />
              <Skeleton className="h-10 w-1/4" />
              <Skeleton className="h-10 w-1/4" />
              <Skeleton className="h-10 w-1/4" />
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        );
      case 'chart':
        return (
          <Card className="w-full h-[350px] flex flex-col justify-between p-6">
            <div className="space-y-2">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <div className="flex items-end justify-between h-[200px] w-full pt-4">
              <Skeleton className="h-[40%] w-[12%]" />
              <Skeleton className="h-[60%] w-[12%]" />
              <Skeleton className="h-[50%] w-[12%]" />
              <Skeleton className="h-[85%] w-[12%]" />
              <Skeleton className="h-[70%] w-[12%]" />
              <Skeleton className="h-[95%] w-[12%]" />
            </div>
          </Card>
        );
      case 'list':
        return (
          <div className="space-y-4 w-full">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="flex items-center justify-between space-x-4 py-2 border-b last:border-b-0">
                <div className="flex items-center space-x-3 flex-1">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        );
      case 'card':
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {Array.from({ length: count }).map((_, i) => (
              <Card key={i} className="w-full">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <Skeleton className="h-5 w-12 rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-8 w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
    }
  };

  return <>{renderSkeleton()}</>;
};
