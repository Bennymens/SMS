'use client';

import React, { useState } from 'react';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  CreditCard, Download, Search, Plus, Filter, CheckCircle2,
  AlertCircle, Clock, ArrowRight,
} from 'lucide-react';

const payments = [
  { name: 'Emily Watson',       id: 'SCH-2025-00001', grade: 'Grade 10-A', term: 'Term 1', amount: '$1,200', balance: '$0',    date: 'Oct 12, 2026', method: 'Mobile Money', status: 'PAID'    },
  { name: 'Marcus Kwame Chen',  id: 'SCH-2025-00002', grade: 'Grade 10-B', term: 'Term 1', amount: '$950',   balance: '$250',  date: 'Oct 11, 2026', method: 'Bank Transfer', status: 'PARTIAL' },
  { name: 'Sophia Al-Mansoor',  id: 'SCH-2025-00003', grade: 'Grade 11-A', term: 'Term 1', amount: '$600',   balance: '$600',  date: 'Oct 10, 2026', method: 'Cash',          status: 'PARTIAL' },
  { name: 'Kofi Boateng',       id: 'SCH-2025-00004', grade: 'Grade 10-A', term: 'Term 1', amount: '$0',     balance: '$1,200',date: '—',            method: '—',             status: 'OVERDUE' },
  { name: 'Abena Osei Poku',    id: 'SCH-2025-00005', grade: 'Grade 10-A', term: 'Term 1', amount: '$1,200', balance: '$0',    date: 'Oct 08, 2026', method: 'Cheque',        status: 'PAID'    },
  { name: 'Selorm Doe',         id: 'SCH-2025-00006', grade: 'Grade 11-A', term: 'Term 1', amount: '$750',   balance: '$450',  date: 'Oct 07, 2026', method: 'Mobile Money', status: 'PARTIAL' },
  { name: 'Blessing Antwi',     id: 'SCH-2025-00007', grade: 'Grade 11-A', term: 'Term 1', amount: '$1,200', balance: '$0',    date: 'Oct 06, 2026', method: 'Card',          status: 'PAID'    },
  { name: 'James Okafor',       id: 'SCH-2025-00008', grade: 'Grade 9-A',  term: 'Term 1', amount: '$0',     balance: '$980',  date: '—',            method: '—',             status: 'OVERDUE' },
  { name: 'Kwesi Appiah',       id: 'SCH-2025-00009', grade: 'Grade 10-B', term: 'Term 1', amount: '$980',   balance: '$0',    date: 'Oct 04, 2026', method: 'Bank Transfer', status: 'PAID'    },
  { name: 'Akua Sarpong',       id: 'SCH-2025-00010', grade: 'Grade 10-B', term: 'Term 1', amount: '$1,200', balance: '$0',    date: 'Oct 02, 2026', method: 'Mobile Money', status: 'PAID'    },
];

const statusBadge: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  PAID: 'default', PARTIAL: 'secondary', OVERDUE: 'destructive',
};

export default function FeeCollectionPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'PAID' | 'PARTIAL' | 'OVERDUE'>('ALL');

  const shown = payments.filter((p) => {
    const matchFilter = filter === 'ALL' || p.status === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const stats = {
    total: payments.length,
    paid: payments.filter((p) => p.status === 'PAID').length,
    partial: payments.filter((p) => p.status === 'PARTIAL').length,
    overdue: payments.filter((p) => p.status === 'OVERDUE').length,
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fee Collection</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Term 1 · 2024/2025 Academic Year · Oakridge Academy</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="gap-2 text-xs">
            <Download className="h-3.5 w-3.5" />Export
          </Button>
          <Button size="sm" className="gap-2 text-xs">
            <Plus className="h-3.5 w-3.5" />Record Payment
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: stats.total, icon: CreditCard },
          { label: 'Fully Paid',     value: stats.paid,    icon: CheckCircle2 },
          { label: 'Partial',        value: stats.partial, icon: AlertCircle },
          { label: 'Overdue',        value: stats.overdue, icon: Clock },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="rounded-lg p-2 bg-muted">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Table card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base">Student Fee Ledger</CardTitle>
              <CardDescription>All fee records for the current term</CardDescription>
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search student..."
                  className="pl-8 pr-3 py-1.5 h-8 rounded-md border border-input bg-background text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring w-44"
                />
              </div>
              <div className="flex gap-1">
                {(['ALL', 'PAID', 'PARTIAL', 'OVERDUE'] as const).map((f) => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all ${filter === f ? 'bg-foreground text-background border-foreground' : 'text-muted-foreground border-border hover:text-foreground'}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="pl-4 font-semibold">Student</TableHead>
                <TableHead className="font-semibold">Grade</TableHead>
                <TableHead className="font-semibold text-right">Amount Paid</TableHead>
                <TableHead className="font-semibold text-right">Balance</TableHead>
                <TableHead className="font-semibold">Method</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold pr-4">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shown.map((p, i) => (
                <TableRow key={i} className="hover:bg-muted/20">
                  <TableCell className="pl-4">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-[11px] font-semibold bg-muted">
                          {p.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-semibold text-foreground">{p.name}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">{p.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{p.grade}</TableCell>
                  <TableCell className="text-xs font-semibold text-right">{p.amount}</TableCell>
                  <TableCell className="text-xs text-right text-muted-foreground">{p.balance}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{p.method}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{p.date}</TableCell>
                  <TableCell className="pr-4">
                    <Badge variant={statusBadge[p.status]} className="text-[10px]">{p.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
              {shown.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-xs text-muted-foreground">
                    No records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="justify-between">
          <p className="text-xs text-muted-foreground">{shown.length} of {payments.length} records</p>
          <Button variant="ghost" size="sm" className="text-xs gap-1">
            Export CSV <ArrowRight className="h-3 w-3" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
