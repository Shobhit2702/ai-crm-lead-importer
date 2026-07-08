'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MOCK_STATUS_DATA } from '@/constants/mockData';
import { useTheme } from 'next-themes';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      name: string;
      value: number;
      percentage: number;
      color: string;
    };
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card/95 border border-border shadow-md rounded-xl p-2.5 text-xs select-none">
        <p className="font-bold flex items-center gap-1.5" style={{ color: data.color }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: data.color }} />
          {data.name}
        </p>
        <p className="text-muted-foreground mt-0.5">
          {data.value.toLocaleString()} Customers ({data.percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

export const CustomerStatusChart: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-between w-full h-[320px] select-none">
      {/* Donut Chart Container */}
      <div className="relative w-full h-[210px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={MOCK_STATUS_DATA}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={85}
              paddingAngle={2}
              dataKey="value"
            >
              {MOCK_STATUS_DATA.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  stroke={theme === 'dark' ? 'var(--card)' : '#fff'}
                  strokeWidth={2}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Centered Overlay Text */}
        <div className="absolute top-[49%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-black tracking-tight text-foreground">1.8k</span>
          <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase mt-0.5">ACTIVE</span>
        </div>
      </div>

      {/* Legend list below */}
      <div className="w-full space-y-2.5 px-4 mb-2">
        {MOCK_STATUS_DATA.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span 
                className="w-2.5 h-2.5 rounded-full shrink-0" 
                style={{ backgroundColor: item.color }} 
              />
              <span className="font-medium text-foreground/80 dark:text-foreground/90">{item.name}</span>
            </div>
            <span className="text-foreground font-bold">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
