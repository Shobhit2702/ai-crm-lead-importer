import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}) => {
  return (
    <div className={cn('flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8', className)}>
      <div className="space-y-2">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center space-x-1 text-xs font-medium text-muted-foreground mb-1">
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <React.Fragment key={index}>
                  {index > 0 && <ChevronRight className="h-3 w-3 mx-1 text-muted-foreground/60" />}
                  {item.href && !isLast ? (
                    <Link href={item.href} className="hover:text-primary transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className={cn(isLast && 'text-indigo-600 dark:text-indigo-400 font-semibold')}>{item.label}</span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        )}
        {/* Title & Subtitle */}
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      
      {/* Actions */}
      {actions && (
        <div className="flex items-center gap-3 self-start md:self-end">
          {actions}
        </div>
      )}
    </div>
  );
};
