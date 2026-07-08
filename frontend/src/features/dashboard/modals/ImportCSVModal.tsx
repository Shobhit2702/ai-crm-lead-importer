'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
import { UploadCloud, FileText, CheckCircle2 } from 'lucide-react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

interface ImportCSVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportCSVModal: React.FC<ImportCSVModalProps> = ({ isOpen, onClose }) => {
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

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('success');
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        handleReset();
        onClose();
      }}
      title="Import CSV File"
      description="Upload customer leads via spreadsheet CSV. Ensure headers match Name, Company, Email, Status."
      size="md"
      primaryActionLabel={
        uploadStatus === 'idle' && selectedFile
          ? 'Upload File'
          : uploadStatus === 'success'
          ? 'Done'
          : undefined
      }
      onPrimaryAction={
        uploadStatus === 'success' ? () => { handleReset(); onClose(); } : handleUploadSubmit
      }
    >
      <div className="flex flex-col items-center justify-center w-full">
        {uploadStatus === 'idle' && (
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`w-full h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer p-4 transition-all duration-200 ${
              dragActive
                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20'
                : 'border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-900/50'
            }`}
          >
            <input
              type="file"
              id="csv-file-input"
              className="hidden"
              accept=".csv"
              onChange={handleFileChange}
            />
            <label htmlFor="csv-file-input" className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
              <UploadCloud className="h-10 w-10 text-muted-foreground mb-3" />
              <p className="text-sm font-semibold text-foreground text-center">
                Drag & drop your CSV file here, or <span className="text-indigo-600 dark:text-indigo-400">browse</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">Supports files up to 25MB</p>
            </label>
          </div>
        )}

        {selectedFile && uploadStatus !== 'uploading' && uploadStatus !== 'success' && (
          <div className="w-full flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 rounded-xl mt-4 bg-slate-50/50 dark:bg-slate-900/30">
            <div className="flex items-center gap-2.5 min-w-0">
              <FileText className="h-5 w-5 text-indigo-500 shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-foreground truncate max-w-[200px]">
                  {selectedFile.name}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </span>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs text-destructive hover:bg-destructive/10">
              Remove
            </Button>
          </div>
        )}

        {uploadStatus === 'uploading' && (
          <div className="w-full py-6 flex flex-col items-center justify-center space-y-4">
            <LoadingSpinner size="md" />
            <div className="w-full max-w-xs bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground font-semibold">
              Parsing CSV leads... {progress}%
            </span>
          </div>
        )}

        {uploadStatus === 'success' && (
          <div className="w-full py-6 flex flex-col items-center justify-center text-center space-y-3 select-none">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-full text-emerald-500">
              <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
            </div>
            <h4 className="text-sm font-bold text-foreground">Import Complete!</h4>
            <p className="text-xs text-muted-foreground max-w-xs">
              Successfully parsed and loaded <span className="font-semibold text-foreground">2,450 records</span>. Duplicate detection check has run successfully.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};
