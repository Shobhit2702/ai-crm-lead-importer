import { DashboardFeature } from '@/features/dashboard';

export default function DashboardPage() {
  return <DashboardFeature />;
}
// Force dynamic rendering to ensure hydration matches local storage theme selection
export const dynamic = 'force-dynamic';
