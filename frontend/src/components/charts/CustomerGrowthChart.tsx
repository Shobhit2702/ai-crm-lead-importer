'use client';

import React from 'react';
import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { MOCK_GROWTH_DATA } from '@/constants/mockData';
import { useTheme } from 'next-themes';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number | string;
    payload: {
      month: string;
      active: number;
      newLeads: number;
    };
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 border border-border shadow-md rounded-xl p-3 text-xs select-none">
        <p className="font-bold text-foreground mb-1">{payload[0].payload.month}</p>
        <div className="space-y-1">
          <p className="text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            Active Customers: {payload[0].value.toLocaleString()}
          </p>
          <p className="text-emerald-500 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            New Leads: {payload[1].value.toLocaleString()}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const CustomerGrowthChart: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="w-full h-[320px] pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={MOCK_GROWTH_DATA}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          barSize={20}
        >
          <defs>
            <linearGradient id="growthArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={theme === 'dark' ? 0.15 : 0.08} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={({ x, y, payload }) => {
              const isHighlighted = payload.value === 'Apr';
              return (
                <text
                  x={x}
                  y={Number(y) + 16}
                  fill={isHighlighted ? 'var(--primary)' : 'oklch(0.55 0.01 240)'}
                  className={`text-xs font-semibold ${isHighlighted ? 'font-bold' : 'font-medium'}`}
                  textAnchor="middle"
                >
                  {payload.value}
                </text>
              );
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'oklch(0.55 0.01 240)', fontSize: 11 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.03)' }} />
          
          {/* Background area curve */}
          <Area
            type="monotone"
            dataKey="active"
            stroke="oklch(0.85 0.02 260 / 25%)"
            strokeWidth={1.5}
            fillOpacity={1}
            fill="url(#growthArea)"
          />
          
          {/* Front bars with April highlighted */}
          <Bar dataKey="active" radius={[6, 6, 0, 0]}>
            {MOCK_GROWTH_DATA.map((entry, index) => {
              const isHighlighted = entry.month === 'Apr';
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    isHighlighted
                      ? 'var(--primary)' // Solid indigo
                      : theme === 'dark'
                      ? 'oklch(0.25 0.01 240)' // Inactive dark gray
                      : 'oklch(0.91 0.015 250)' // Inactive light purple-gray
                  }
                  className="transition-colors duration-300"
                />
              );
            })}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
