'use client';

import React, { useState } from 'react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { TableWrapper } from '@/components/common/TableWrapper';
import { Button } from '@/components/ui/button';
import { MOCK_IMPORTS } from '@/constants/mockData';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UploadCloud, FileText, CheckCircle2, FileSpreadsheet, PlayCircle } from 'lucide-react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function CSVImportPage() {
  const [importHistory, setImportHistory] = useState(MOCK_IMPORTS);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.csv')) {
        setSelectedFile(file);
        setUploadStatus('idle');
      } else {
        alert('Please drop a valid CSV file.');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.name.endsWith('.csv')) {
        setSelectedFile(file);
        setUploadStatus('idle');
      } else {
        alert('Please choose a valid CSV file.');
      }
    }
  };

  const handleUploadSubmit = () => {
    if (!selectedFile) return;

    setUploadStatus('uploading');
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('success');
          
          // Append new mock item to import history
          const newImport = {
            id: `imp_${Date.now()}`,
            filename: selectedFile.name,
            records: `${Math.floor(Math.random() * 800) + 100}`,
            timestamp: 'Just now',
            status: 'success' as const,
          };
          setImportHistory((prevHistory) => [newImport, ...prevHistory]);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setUploadStatus('idle');
    setProgress(0);
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'CSV Import' },
  ];

  return (
    <div className="space-y-8 pb-12 select-none">
      {/* Page Header */}
      <SectionHeader
        title="CSV Import Hub"
        description="Bootstrap your CRM with AI-powered CSV parser lead uploads."
        breadcrumbs={breadcrumbs}
      />

      {/* Grid: 1/3 Upload Area, 2/3 Import Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Inline File Drag & Drop Panel */}
        <div className="lg:col-span-1 bg-card p-6 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Upload Sheet</h3>
          
          {uploadStatus === 'idle' && (
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={cn(
                'w-full h-56 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer p-4 transition-all duration-200',
                dragActive
                  ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-900/50'
              )}
            >
              <input
                type="file"
                id="page-csv-file-input"
                className="hidden"
                accept=".csv"
                onChange={handleFileChange}
              />
              <label htmlFor="page-csv-file-input" className="flex flex-col items-center justify-center w-full h-full cursor-pointer text-center">
                <UploadCloud className="h-10 w-10 text-muted-foreground mb-3" />
                <span className="text-sm font-semibold text-foreground">
                  Drag & drop CSV file, or <span className="text-indigo-600 dark:text-indigo-400">browse</span>
                </span>
                <span className="text-[10px] text-muted-foreground mt-1">Accepts standard .csv spreadsheets</span>
              </label>
            </div>
          )}

          {selectedFile && uploadStatus !== 'uploading' && uploadStatus !== 'success' && (
            <div className="space-y-4">
              <div className="w-full flex items-center justify-between p-3.5 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/30">
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileText className="h-5 w-5 text-indigo-500 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-foreground truncate max-w-[150px]">
                      {selectedFile.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground mt-0.5">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleReset} className="h-8 text-xs text-destructive hover:bg-destructive/10">
                  Remove
                </Button>
              </div>

              <Button
                onClick={handleUploadSubmit}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <PlayCircle className="h-4.5 w-4.5" />
                Process Upload
              </Button>
            </div>
          )}

          {uploadStatus === 'uploading' && (
            <div className="w-full py-10 flex flex-col items-center justify-center space-y-4">
              <LoadingSpinner size="md" />
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-muted-foreground">
                Analyzing schema: {progress}%
              </span>
            </div>
          )}

          {uploadStatus === 'success' && (
            <div className="w-full py-6 flex flex-col items-center justify-center text-center space-y-3">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-full text-emerald-500">
                <CheckCircle2 className="h-9 w-9 stroke-[2.5]" />
              </div>
              <h4 className="text-sm font-bold text-foreground">Schema Mapped!</h4>
              <p className="text-xs text-muted-foreground">
                Leads successfully appended to history logs.
              </p>
              <Button variant="outline" size="sm" onClick={handleReset} className="w-full border-slate-200 dark:border-slate-800 text-xs font-semibold mt-2">
                Upload Another
              </Button>
            </div>
          )}
        </div>

        {/* Right Side: Historical Logs Table */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Import Historical Logs</h3>
          
          <TableWrapper isEmpty={importHistory.length === 0}>
            <TableHeader>
              <TableRow className="border-b border-slate-100 dark:border-slate-800 hover:bg-transparent">
                <TableHead className="font-bold text-foreground">File Metadata</TableHead>
                <TableHead className="font-bold text-foreground">Records Imported</TableHead>
                <TableHead className="font-bold text-foreground">Date Uploaded</TableHead>
                <TableHead className="font-bold text-foreground">Parsing Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {importHistory.map((log) => (
                <TableRow key={log.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                        <FileSpreadsheet className="h-4.5 w-4.5" />
                      </div>
                      <span className="font-bold text-foreground text-sm truncate max-w-[200px]">{log.filename}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-foreground/80 dark:text-foreground/90">{log.records}</TableCell>
                  <TableCell className="text-sm font-medium text-muted-foreground">{log.timestamp}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        'rounded-full px-2.5 py-0.5 text-[11px] font-semibold border-none tracking-wide shadow-none',
                        log.status === 'success'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                          : 'bg-destructive/10 dark:bg-destructive/20 text-destructive'
                      )}
                    >
                      {log.status === 'success' ? 'Successful' : 'Error'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableWrapper>
        </div>
      </div>
    </div>
  );
}
