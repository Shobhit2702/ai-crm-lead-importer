'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileSpreadsheet, CheckCircle2, AlertCircle, MoreVertical } from 'lucide-react';
import { MOCK_IMPORTS } from '@/constants/mockData';
import { Button } from '@/components/ui/button';

export const RecentImports: React.FC = () => {
  return (
    <Card className="h-full border border-slate-100 dark:border-slate-800/40 bg-card overflow-hidden hover:shadow-sm transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
        <CardTitle className="text-lg font-bold tracking-tight text-foreground">Recent Imports</CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground">
          <MoreVertical className="h-4.5 w-4.5" />
        </Button>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 pt-0 space-y-3.5">
        {MOCK_IMPORTS.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100/50 dark:border-slate-800/30 hover:scale-[1.01] transition-transform duration-200 select-none"
          >
            {/* Left: Icon and Details */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 shrink-0">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-foreground truncate max-w-[140px] md:max-w-[180px]">
                  {item.filename}
                </span>
                <span className="text-xs text-muted-foreground mt-0.5">
                  {item.records} records • {item.timestamp}
                </span>
              </div>
            </div>

            {/* Right: Status Icon */}
            <div className="shrink-0">
              {item.status === 'success' ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500 fill-emerald-50 dark:fill-transparent stroke-[2.5]" />
              ) : (
                <AlertCircle className="h-5 w-5 text-destructive fill-destructive/5 dark:fill-transparent stroke-[2.5]" />
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
