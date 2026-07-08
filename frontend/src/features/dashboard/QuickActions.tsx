'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileUp, UserPlus, FileSpreadsheet, KeyRound } from 'lucide-react';
import { ImportCSVModal } from './modals/ImportCSVModal';
import { AddCustomerModal } from './modals/AddCustomerModal';

export const QuickActions: React.FC = () => {
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleExport = () => {
    alert('Export CRM Records placeholder triggered!');
  };

  const handleAudit = () => {
    alert('Security Audit Logs placeholder triggered!');
  };

  return (
    <>
      <Card className="border border-slate-100 dark:border-slate-800/40 bg-card overflow-hidden hover:shadow-sm transition-shadow duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold tracking-tight text-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Action 1: Import CSV */}
            <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/10 flex flex-col justify-between h-[150px] hover:scale-[1.01] hover:shadow-sm transition-all duration-200">
              <div className="space-y-1">
                <div className="p-2 w-fit rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                  <FileUp className="h-5 w-5" />
                </div>
                <h4 className="text-xs font-bold text-foreground mt-2.5">Import CSV Spreadsheet</h4>
                <p className="text-[11px] text-muted-foreground">Upload multiple customer leads in bulk.</p>
              </div>
              <Button
                variant="link"
                className="p-0 h-auto text-indigo-600 dark:text-indigo-400 text-xs font-semibold justify-start mt-2 focus:ring-0"
                onClick={() => setIsImportOpen(true)}
              >
                Upload File →
              </Button>
            </div>

            {/* Action 2: Add Customer */}
            <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/10 flex flex-col justify-between h-[150px] hover:scale-[1.01] hover:shadow-sm transition-all duration-200">
              <div className="space-y-1">
                <div className="p-2 w-fit rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                  <UserPlus className="h-5 w-5" />
                </div>
                <h4 className="text-xs font-bold text-foreground mt-2.5">Add Customer Manually</h4>
                <p className="text-[11px] text-muted-foreground">Create a single lead profile profile.</p>
              </div>
              <Button
                variant="link"
                className="p-0 h-auto text-emerald-600 dark:text-emerald-400 text-xs font-semibold justify-start mt-2 focus:ring-0"
                onClick={() => setIsAddOpen(true)}
              >
                Add Lead →
              </Button>
            </div>

            {/* Action 3: Export Records */}
            <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/10 flex flex-col justify-between h-[150px] hover:scale-[1.01] hover:shadow-sm transition-all duration-200">
              <div className="space-y-1">
                <div className="p-2 w-fit rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-500 dark:text-amber-400">
                  <FileSpreadsheet className="h-5 w-5" />
                </div>
                <h4 className="text-xs font-bold text-foreground mt-2.5">Export CRM Backup</h4>
                <p className="text-[11px] text-muted-foreground">Download spreadsheet list of contacts.</p>
              </div>
              <Button
                variant="link"
                className="p-0 h-auto text-amber-600 dark:text-amber-400 text-xs font-semibold justify-start mt-2 focus:ring-0"
                onClick={handleExport}
              >
                Generate Backup →
              </Button>
            </div>

            {/* Action 4: Rotate API Key */}
            <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/10 flex flex-col justify-between h-[150px] hover:scale-[1.01] hover:shadow-sm transition-all duration-200">
              <div className="space-y-1">
                <div className="p-2 w-fit rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  <KeyRound className="h-5 w-5" />
                </div>
                <h4 className="text-xs font-bold text-foreground mt-2.5">Audit Security Logs</h4>
                <p className="text-[11px] text-muted-foreground">Verify access history and API statuses.</p>
              </div>
              <Button
                variant="link"
                className="p-0 h-auto text-slate-600 dark:text-slate-400 text-xs font-semibold justify-start mt-2 focus:ring-0"
                onClick={handleAudit}
              >
                View System Logs →
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Linked Modals */}
      <ImportCSVModal isOpen={isImportOpen} onClose={() => setIsImportOpen(false)} />
      <AddCustomerModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </>
  );
};
