import React from 'react';
import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: keyof typeof Icons;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'Inbox',
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  const LucideIcon = (Icons[icon] as React.ComponentType<{ className?: string }>) || Icons.Inbox;

  return (
    <Card className={cn('w-full border-dashed border-2 py-12 flex flex-col items-center justify-center text-center', className)}>
      <CardContent className="flex flex-col items-center max-w-md p-6">
        <div className="p-4 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-500 mb-4 animate-bounce-subtle">
          <LucideIcon className="h-10 w-10" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-2 mb-6">{description}</p>
        {actionLabel && onAction && (
          <Button onClick={onAction} className="shadow-sm hover:scale-[1.02] transition-transform duration-200">
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
