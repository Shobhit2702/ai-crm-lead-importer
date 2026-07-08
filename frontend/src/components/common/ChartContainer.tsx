import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  actions,
  children,
  className,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn('w-full', className)}
    >
      <Card className="h-full border border-slate-100 dark:border-slate-800/40 bg-card overflow-hidden hover:shadow-sm transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold tracking-tight text-foreground">{title}</CardTitle>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex items-center">{actions}</div>}
        </CardHeader>
        <CardContent className="px-6 pb-6 pt-0">
          <div className="w-full h-full min-h-[300px]">
            {children}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
