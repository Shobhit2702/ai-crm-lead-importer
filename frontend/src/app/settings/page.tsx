'use client';

import React, { useState } from 'react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { KeyRound, ShieldCheck, Mail, BellRing, Save } from 'lucide-react';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  
  // Local state for workspace form
  const [workspaceName, setWorkspaceName] = useState('CRM Enterprise');
  const [domain, setDomain] = useState('enterprise.crmsuite.com');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
  };

  const handleRotateKey = () => {
    alert('API Key rotation triggered! A new secret key is generated.');
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Settings' },
  ];

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Page Header */}
      <SectionHeader
        title="Settings"
        description="Manage workspace preferences, configure integrations, and manage dark modes."
        breadcrumbs={breadcrumbs}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side: General Profile/Workspace settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Workspace Settings Card */}
          <Card className="border border-slate-100 dark:border-slate-800 bg-card overflow-hidden">
            <CardHeader>
              <CardTitle className="text-md font-bold">General Workspace Configuration</CardTitle>
              <CardDescription>Setup metadata and primary domain handles for this workspace account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Workspace Title</label>
                <Input
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="bg-slate-50/50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-primary focus-visible:bg-card transition-colors text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Organization Domain</label>
                <Input
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="bg-slate-50/50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-primary focus-visible:bg-card transition-colors text-sm"
                />
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-100 dark:border-slate-800/80 px-6 py-4 flex justify-end">
              <Button onClick={handleSaveSettings} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1.5 text-xs shadow-sm">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          {/* Theme and Preferences Switch Grid */}
          <Card className="border border-slate-100 dark:border-slate-800 bg-card overflow-hidden">
            <CardHeader>
              <CardTitle className="text-md font-bold">Theme & System Preferences</CardTitle>
              <CardDescription>Control UI themes and notification channels.</CardDescription>
            </CardHeader>
            <CardContent className="divide-y divide-slate-100 dark:divide-slate-800">
              {/* Theme Settings */}
              <div className="flex items-center justify-between py-4 first:pt-0">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-foreground">Dark Theme</span>
                  <span className="text-xs text-muted-foreground">Toggle application theme modes.</span>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                />
              </div>

              {/* Email Notifications */}
              <div className="flex items-center justify-between py-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Email Alerts
                  </span>
                  <span className="text-xs text-muted-foreground">Receive digest summaries of new imports.</span>
                </div>
                <Switch
                  checked={emailAlerts}
                  onCheckedChange={setEmailAlerts}
                />
              </div>

              {/* Push Notifications */}
              <div className="flex items-center justify-between py-4 last:pb-0">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                    <BellRing className="h-4 w-4 text-muted-foreground" />
                    Real-time Push Alerts
                  </span>
                  <span className="text-xs text-muted-foreground">Receive alerts on CSV parse errors instantly.</span>
                </div>
                <Switch
                  checked={pushAlerts}
                  onCheckedChange={setPushAlerts}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Integrations / API Security Panel */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border border-slate-100 dark:border-slate-800 bg-card overflow-hidden">
            <CardHeader>
              <CardTitle className="text-md font-bold flex items-center gap-1.5">
                <ShieldCheck className="h-5 w-5 text-indigo-500" />
                API & Security Keys
              </CardTitle>
              <CardDescription>Verify system connection keys to automate lead sync pipelines.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Workspace Public Token</label>
                <div className="font-mono text-xs p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-muted-foreground select-all truncate">
                  pk_live_crm_551aa788bf3a948e
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-100 dark:border-slate-800/80 px-6 py-4">
              <Button onClick={handleRotateKey} variant="outline" className="w-full border-slate-200 dark:border-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm">
                <KeyRound className="h-4 w-4" />
                Rotate Live Secret Key
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
