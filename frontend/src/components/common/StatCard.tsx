import React from 'react';
import * as Icons from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: keyof typeof Icons;
  type: 'customers' | 'new-customers' | 'active-customers' | 'imported';
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  type,
  delay = 0,
}) => {
  const LucideIcon = (Icons[icon] as React.ComponentType<{ className?: string }>) || Icons.HelpCircle;

  // Design mapping matching UI image color themes
  const config = {
    customers: {
      iconBg: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400',
      pillBg: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400',
      showTrend: true,
    },
    'new-customers': {
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
      pillBg: 'bg-emerald-500 text-white dark:bg-emerald-500/20 dark:text-emerald-300', // solid badge in image
      showTrend: false,
    },
    'active-customers': {
      iconBg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-500 dark:text-amber-400',
      pillBg: '',
      showTrend: false,
    },
    imported: {
      iconBg: 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400',
      pillBg: '',
      showTrend: false,
    },
  };

  const activeConfig = config[type] || config.customers;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="w-full"
    >
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 border border-slate-100 dark:border-slate-800/40 bg-card">
        <CardContent className="p-6 flex flex-col justify-between h-[130px]">
          {/* Header row: Icon & Trend Pill */}
          <div className="flex items-center justify-between">
            <div className={cn('p-2.5 rounded-xl flex items-center justify-center', activeConfig.iconBg)}>
              <LucideIcon className="h-5 w-5" />
            </div>
            
            {change && (
              <span
                className={cn(
                  'text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-0.5 shadow-sm',
                  type === 'new-customers' 
                    ? 'bg-[#22c55e] text-white px-2.5 py-0.5 rounded-md text-[11px]' // match image
                    : activeConfig.pillBg
                )}
              >
                {activeConfig.showTrend && (
                  <Icons.TrendingUp className="h-3 w-3 stroke-[3px]" />
                )}
                {change}
              </span>
            )}
          </div>

          {/* Metric Name and Value */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
              {title}
            </span>
            <div className="text-3xl font-extrabold text-foreground tracking-tight">
              {value}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
