import React from 'react';
import { Table } from '@/components/ui/table';
import { LoadingSpinner } from './LoadingSpinner';
import { EmptyState } from './EmptyState';
import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';

interface TableWrapperProps {
  children: React.ReactNode;
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: keyof typeof Icons;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  className?: string;
}

export const TableWrapper: React.FC<TableWrapperProps> = ({
  children,
  isLoading = false,
  isEmpty = false,
  emptyTitle = 'No data available',
  emptyDescription = 'There is currently no information to display here.',
  emptyIcon = 'Inbox',
  emptyActionLabel,
  onEmptyAction,
  className,
}) => {
  return (
    <div className={cn('relative w-full rounded-xl border border-slate-100 dark:border-slate-800/40 bg-card overflow-hidden', className)}>
      <div className="w-full overflow-x-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <LoadingSpinner size="lg" />
            <span className="text-sm text-muted-foreground mt-4 animate-pulse">Loading data...</span>
          </div>
        ) : isEmpty ? (
          <div className="p-6">
            <EmptyState
              title={emptyTitle}
              description={emptyDescription}
              icon={emptyIcon}
              actionLabel={emptyActionLabel}
              onAction={onEmptyAction}
            />
          </div>
        ) : (
          <Table className="w-full min-w-[600px] table-auto">
            {children}
          </Table>
        )}
      </div>
    </div>
  );
};
