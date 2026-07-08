'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plus, Cloud, Settings } from 'lucide-react';
import { MOCK_TIMELINE } from '@/constants/mockData';
import { cn } from '@/lib/utils';

export const ActivityTimeline: React.FC = () => {
  // Config for timeline icons and colors to match UI
  const getTimelineConfig = (type: string) => {
    switch (type) {
      case 'add':
        return {
          icon: Plus,
          bg: 'bg-indigo-600 dark:bg-indigo-500 text-white dark:text-slate-900',
          iconStyle: 'stroke-[3.5px]',
        };
      case 'import':
        return {
          icon: Cloud,
          bg: 'bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-900',
          iconStyle: 'stroke-[2px]',
        };
      case 'security':
      default:
        return {
          icon: Settings,
          bg: 'bg-amber-600 dark:bg-amber-500 text-white dark:text-slate-900',
          iconStyle: 'stroke-[2px]',
        };
    }
  };

  return (
    <Card className="h-full border border-slate-100 dark:border-slate-800/40 bg-card overflow-hidden hover:shadow-sm transition-shadow duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold tracking-tight text-foreground">Activity Timeline</CardTitle>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 pt-2">
        <div className="relative pl-6 space-y-6 select-none">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[13px] top-2 bottom-6 w-[2px] bg-slate-100 dark:bg-slate-800" />

          {MOCK_TIMELINE.map((item) => {
            const config = getTimelineConfig(item.type);
            const IconComponent = config.icon;

            return (
              <div key={item.id} className="relative flex flex-col gap-1">
                {/* Timeline Icon Node */}
                <div
                  className={cn(
                    'absolute -left-[25px] top-0.5 w-[28px] h-[28px] rounded-full flex items-center justify-center border-4 border-card z-10 shadow-sm',
                    config.bg
                  )}
                >
                  <IconComponent className={cn('h-3.5 w-3.5', config.iconStyle)} />
                </div>

                {/* Timeline Details */}
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground leading-snug">
                    {item.title}
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {item.description}
                  </span>
                  <span className="text-[10px] font-medium text-indigo-500 dark:text-indigo-400 mt-1">
                    {item.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
