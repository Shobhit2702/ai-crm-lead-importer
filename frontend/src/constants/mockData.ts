import { Customer, ImportActivity, TimelineItem, StatItem, CustomerGrowthData, CustomerStatusData } from '../types';

export const MOCK_STATS: StatItem[] = [
  {
    id: '1',
    title: 'TOTAL CUSTOMERS',
    value: '2,450',
    change: '+5.4%',
    type: 'customers',
    icon: 'Users',
  },
  {
    id: '2',
    title: 'NEW CUSTOMERS',
    value: '294',
    change: '+12%',
    type: 'new-customers',
    icon: 'UserPlus',
  },
  {
    id: '3',
    title: 'ACTIVE CUSTOMERS',
    value: '1,840',
    type: 'active-customers',
    icon: 'Zap',
  },
  {
    id: '4',
    title: 'IMPORTED RECORDS',
    value: '15.2k',
    type: 'imported',
    icon: 'Database',
  },
];

export const MOCK_GROWTH_DATA: CustomerGrowthData[] = [
  { month: 'Jan', active: 1100, newLeads: 150 },
  { month: 'Feb', active: 1350, newLeads: 250 },
  { month: 'Mar', active: 1600, newLeads: 210 },
  { month: 'Apr', active: 2050, newLeads: 420 }, // Selected month in image
  { month: 'May', active: 1850, newLeads: 310 },
  { month: 'Jun', active: 2200, newLeads: 380 },
];

export const MOCK_STATUS_DATA: CustomerStatusData[] = [
  { name: 'Active', value: 1800, percentage: 75, color: '#10b981' }, // green-500
  { name: 'Pending', value: 360, percentage: 15, color: '#f59e0b' },  // amber-500
  { name: 'Inactive', value: 240, percentage: 10, color: '#ef4444' }, // red-500
];

export const MOCK_IMPORTS: ImportActivity[] = [
  {
    id: '1',
    filename: 'Q4_Customers_Final.csv',
    records: '2.4k',
    timestamp: '2 hours ago',
    status: 'success',
  },
  {
    id: '2',
    filename: 'Leads_Export_Oct2025.csv',
    records: '840',
    timestamp: '1 day ago',
    status: 'success',
  },
  {
    id: '3',
    filename: 'Legacy_System_Full_Backup.csv',
    records: '12k',
    timestamp: '3 days ago',
    status: 'failed',
  },
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    name: 'Sarah Jenkins',
    company: 'Global Tech Solutions',
    email: 'sarah.jenkins@globaltech.com',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    createdAt: '2026-07-08T23:30:00Z',
  },
  {
    id: 'c2',
    name: 'Michael Rivera',
    company: 'Rivera & Co.',
    email: 'mrivera@riveraco.com',
    status: 'Pending',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    createdAt: '2026-07-07T12:00:00Z',
  },
  {
    id: 'c3',
    name: 'Emily Thorne',
    company: 'Bloom Creative',
    email: 'emily@bloomcreative.co',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    createdAt: '2026-07-06T15:45:00Z',
  },
  {
    id: 'c4',
    name: 'Hiroshi Tanaka',
    company: 'Nexus Industries',
    email: 'h.tanaka@nexusind.jp',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    createdAt: '2026-07-05T09:15:00Z',
  },
];

export const MOCK_TIMELINE: TimelineItem[] = [
  {
    id: 't1',
    type: 'add',
    title: 'New Customer Added',
    description: 'Sarah Jenkins was added by Alex Chen',
    time: '12 minutes ago',
  },
  {
    id: 't2',
    type: 'import',
    title: 'Data Import Completed',
    description: '2,450 records processed successfully',
    time: '2 hours ago',
  },
  {
    id: 't3',
    type: 'security',
    title: 'API Key Rotated',
    description: 'System security update performed',
    time: 'Yesterday at 4:30 PM',
  },
];
