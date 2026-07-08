'use client';

import React, { useState } from 'react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { TableWrapper } from '@/components/common/TableWrapper';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MOCK_CUSTOMERS } from '@/constants/mockData';
import { Plus, Search, MoreHorizontal } from 'lucide-react';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AddCustomerModal } from '@/features/dashboard/modals/AddCustomerModal';
import { cn } from '@/lib/utils';

export default function CustomersPage() {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [search, setSearch] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddSuccess = (newCustomer: { name: string; company: string; email: string; status: string }) => {
    const formatted = {
      id: `c_${Date.now()}`,
      name: newCustomer.name,
      company: newCustomer.company,
      email: newCustomer.email,
      status: newCustomer.status as 'Active' | 'Pending' | 'Inactive',
      createdAt: new Date().toISOString(),
    };
    setCustomers((prev) => [formatted, ...prev]);
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Customers' },
  ];

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Page Header */}
      <SectionHeader
        title="Customers Directory"
        description="View, search, and manage lead contact profiles."
        breadcrumbs={breadcrumbs}
        actions={
          <Button
            onClick={() => setIsAddOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-2 text-sm shadow-sm"
          >
            <Plus className="h-4.5 w-4.5" />
            Add Customer
          </Button>
        }
      />

      {/* Search Filter Controls */}
      <div className="flex items-center gap-3 w-full max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
          <Input
            placeholder="Search by name, company, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 bg-card border-slate-200 dark:border-slate-800"
          />
        </div>
      </div>

      {/* Customer Directory Table */}
      <TableWrapper
        isEmpty={filteredCustomers.length === 0}
        emptyTitle="No customers found"
        emptyDescription="We couldn't find any customers matching your search query. Try refining your keywords."
        emptyIcon="Users"
        emptyActionLabel="Clear Search"
        onEmptyAction={() => setSearch('')}
      >
        <TableHeader>
          <TableRow className="border-b border-slate-100 dark:border-slate-800 hover:bg-transparent">
            <TableHead className="font-bold text-foreground">Customer</TableHead>
            <TableHead className="font-bold text-foreground">Company</TableHead>
            <TableHead className="font-bold text-foreground">Email Address</TableHead>
            <TableHead className="font-bold text-foreground">Date Added</TableHead>
            <TableHead className="font-bold text-foreground">Status</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCustomers.map((customer) => (
            <TableRow key={customer.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
              <TableCell className="py-3.5">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border border-slate-100 dark:border-slate-800">
                    <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                    <AvatarFallback className="bg-indigo-50 text-indigo-700 font-bold text-xs dark:bg-indigo-950/40 dark:text-indigo-400">
                      {customer.name.split(' ').map((n) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-bold text-foreground text-sm">{customer.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm font-semibold text-foreground/80 dark:text-foreground/90">{customer.company}</TableCell>
              <TableCell className="text-sm font-medium text-muted-foreground">{customer.email}</TableCell>
              <TableCell className="text-sm font-medium text-muted-foreground">
                {new Date(customer.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    'rounded-full px-2.5 py-0.5 text-[11px] font-semibold border-none tracking-wide shadow-none',
                    customer.status === 'Active'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                      : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                  )}
                >
                  {customer.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableWrapper>

      {/* Manual Lead Entry Modal */}
      <AddCustomerModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={handleAddSuccess}
      />
    </div>
  );
}
