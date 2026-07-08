'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { CheckCircle2 } from 'lucide-react';

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (customer: { name: string; company: string; email: string; status: string }) => void;
}

const customerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  company: z.string().min(1, { message: 'Company name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  status: z.enum(['Active', 'Pending', 'Inactive']),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

export const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      status: 'Active',
    },
  });

  const onSubmit = (data: CustomerFormValues) => {
    setIsSubmitting(true);
    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onSuccess) {
        onSuccess(data);
      }
    }, 1200);
  };

  const handleClose = () => {
    reset();
    setIsSuccess(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Customer"
      description="Create a new lead manually in the CRM database."
      size="md"
      primaryActionLabel={isSuccess ? 'Close' : undefined}
      onPrimaryAction={isSuccess ? handleClose : undefined}
    >
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center text-center py-6 space-y-3 select-none">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-full text-emerald-500">
            <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
          </div>
          <h4 className="text-sm font-bold text-foreground">Customer Added Successfully!</h4>
          <p className="text-xs text-muted-foreground">
            The customer file has been created and synced with the active list.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground uppercase tracking-wide">
              Full Name
            </label>
            <Input
              placeholder="e.g. John Doe"
              {...register('name')}
              className={errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}
            />
            {errors.name && (
              <p className="text-xs text-destructive font-medium">{errors.name.message}</p>
            )}
          </div>

          {/* Company Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground uppercase tracking-wide">
              Company Name
            </label>
            <Input
              placeholder="e.g. Acme Corporation"
              {...register('company')}
              className={errors.company ? 'border-destructive focus-visible:ring-destructive' : ''}
            />
            {errors.company && (
              <p className="text-xs text-destructive font-medium">{errors.company.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground uppercase tracking-wide">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="e.g. john@acme.com"
              {...register('email')}
              className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
            />
            {errors.email && (
              <p className="text-xs text-destructive font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Status Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground uppercase tracking-wide">
              Lead Status
            </label>
            <select
              {...register('status')}
              className="w-full flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
            {errors.status && (
              <p className="text-xs text-destructive font-medium">{errors.status.message}</p>
            )}
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-primary text-white hover:scale-[1.02] active:scale-95 transition-all font-semibold flex items-center justify-center gap-1.5"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" className="p-0 border-t-white" />
                  Saving Lead...
                </>
              ) : (
                'Save Customer'
              )}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
