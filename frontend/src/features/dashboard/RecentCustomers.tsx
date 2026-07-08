'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MOCK_CUSTOMERS } from '@/constants/mockData';
import { cn } from '@/lib/utils';

export const RecentCustomers: React.FC = () => {
  return (
    <Card className="h-full border border-slate-100 dark:border-slate-800/40 bg-card overflow-hidden hover:shadow-sm transition-shadow duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold tracking-tight text-foreground">Recent Customers</CardTitle>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 pt-0 space-y-4">
        {MOCK_CUSTOMERS.map((customer) => (
          <div
            key={customer.id}
            className="flex items-center justify-between py-1 hover:translate-x-0.5 transition-transform duration-200 select-none"
          >
            {/* Left: Avatar, Name & Company */}
            <div className="flex items-center gap-3 min-w-0">
              <Avatar className="h-10 w-10 border border-slate-100 dark:border-slate-800 shrink-0">
                <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                <AvatarFallback className="bg-indigo-50 text-indigo-700 font-bold dark:bg-indigo-950/40 dark:text-indigo-400">
                  {customer.name.split(' ').map((n) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-foreground truncate">
                  {customer.name}
                </span>
                <span className="text-xs text-muted-foreground truncate mt-0.5">
                  {customer.company}
                </span>
              </div>
            </div>

            {/* Right: Status Pill */}
            <div className="shrink-0">
              <Badge
                className={cn(
                  'rounded-full px-2.5 py-0.5 text-[11px] font-semibold border-none select-none tracking-wide shadow-none',
                  customer.status === 'Active'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                    : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                )}
              >
                {customer.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
