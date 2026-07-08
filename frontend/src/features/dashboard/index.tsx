'use client';

import React, { useState } from 'react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { StatCard } from '@/components/common/StatCard';
import { ChartContainer } from '@/components/common/ChartContainer';
import { CustomerGrowthChart } from '@/components/charts/CustomerGrowthChart';
import { CustomerStatusChart } from '@/components/charts/CustomerStatusChart';
import { RecentImports } from './RecentImports';
import { RecentCustomers } from './RecentCustomers';
import { ActivityTimeline } from './ActivityTimeline';
import { QuickActions } from './QuickActions';
import { MOCK_STATS } from '@/constants/mockData';
import { Button } from '@/components/ui/button';
import { FileUp, UserPlus, Calendar } from 'lucide-react';
import { ImportCSVModal } from './modals/ImportCSVModal';
import { AddCustomerModal } from './modals/AddCustomerModal';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

export const DashboardFeature: React.FC = () => {
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('Last 6 months');

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard' },
  ];

  // Actions for the page header (Import CSV, Add Customer)
  const headerActions = (
    <>
      <Button
        variant="outline"
        className="bg-card hover:bg-slate-100 border-slate-200 dark:border-slate-800 text-foreground font-semibold hover:scale-[1.01] transition-transform flex items-center gap-2 text-sm shadow-sm h-9.5 px-4"
        onClick={() => setIsImportOpen(true)}
      >
        <FileUp className="h-4.5 w-4.5 text-slate-500" />
        Import CSV
      </Button>
      <Button
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold hover:scale-[1.01] transition-transform flex items-center gap-2 text-sm shadow-sm h-9.5 px-4"
        onClick={() => setIsAddOpen(true)}
      >
        <UserPlus className="h-4.5 w-4.5 text-white" />
        Add Customer
      </Button>
    </>
  );

  return (
    <div className="space-y-8 select-none pb-12">
      {/* Header section with breadcrumbs and actions */}
      <SectionHeader
        title="Analytics Overview"
        description="Welcome back, Alex. Here's what's happening today."
        breadcrumbs={breadcrumbs}
        actions={headerActions}
      />

      {/* Row 1: Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_STATS.map((stat, index) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon as keyof typeof import('lucide-react')}
            type={stat.type}
            delay={index * 0.05}
          />
        ))}
      </div>

      {/* Row 2: Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Growth Chart (2/3 width on desktop) */}
        <ChartContainer
          title="Customer Growth"
          className="lg:col-span-2"
          delay={0.2}
          actions={
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" size="sm" className="h-8 border-slate-200 dark:border-slate-800 text-xs font-semibold flex items-center gap-1.5 px-3 rounded-lg shadow-sm">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    {timeRange}
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className="w-[140px]">
                <DropdownMenuItem onClick={() => setTimeRange('Last 30 days')} className="text-xs font-medium cursor-pointer">Last 30 days</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeRange('Last 6 months')} className="text-xs font-medium cursor-pointer">Last 6 months</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeRange('Last year')} className="text-xs font-medium cursor-pointer">Last year</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        >
          <CustomerGrowthChart />
        </ChartContainer>

        {/* Customer Status Donut Chart (1/3 width on desktop) */}
        <ChartContainer
          title="Customer Status"
          delay={0.25}
        >
          <CustomerStatusChart />
        </ChartContainer>
      </div>

      {/* Row 3: Lists Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Recent Imports list */}
        <div className="lg:col-span-1">
          <RecentImports />
        </div>

        {/* Recent Customers list */}
        <div className="lg:col-span-1">
          <RecentCustomers />
        </div>

        {/* Activity Timeline list */}
        <div className="md:col-span-2 lg:col-span-1">
          <ActivityTimeline />
        </div>
      </div>

      {/* Row 4: Quick Actions panel */}
      <div className="w-full">
        <QuickActions />
      </div>

      {/* Global Page Header Modals */}
      <ImportCSVModal isOpen={isImportOpen} onClose={() => setIsImportOpen(false)} />
      <AddCustomerModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </div>
  );
};
export default DashboardFeature;
