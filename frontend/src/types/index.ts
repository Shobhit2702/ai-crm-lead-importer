export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  status: 'Active' | 'Pending' | 'Inactive';
  avatarUrl?: string;
  createdAt: string;
}

export interface ImportActivity {
  id: string;
  filename: string;
  records: string;
  timestamp: string;
  status: 'success' | 'failed';
}

export interface TimelineItem {
  id: string;
  type: 'add' | 'import' | 'security';
  title: string;
  description: string;
  time: string;
}

export interface StatItem {
  id: string;
  title: string;
  value: string;
  change?: string;
  type: 'customers' | 'new-customers' | 'active-customers' | 'imported';
  icon: string;
}

export interface CustomerGrowthData {
  month: string;
  active: number;
  newLeads: number;
}

export interface CustomerStatusData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}
