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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toast';

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
  const [openPaymentSheet, setOpenPaymentSheet] = useState(false);
  const [openExportSheet, setOpenExportSheet] = useState(false);

  // Form states for payment
  const [payStudent, setPayStudent] = useState('');
  const [payAmount, setPayAmount] = useState('');
  const [payMethod, setPayMethod] = useState('Mobile Money');
  const [payFeeType, setPayFeeType] = useState('Tuition Fees');

  // Form states for export
  const [exportFormat, setExportFormat] = useState('CSV');
  const [exportTerm, setExportTerm] = useState('Term 1 (2024/2025)');

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payStudent || !payAmount) {
      toast.error('Missing details', { description: 'Please provide both student name and payment amount.' });
      return;
    }
    toast.success('Payment recorded successfully', {
      description: `$${payAmount} receipt confirmed for ${payStudent} via ${payMethod}.`,
    });
    setOpenPaymentSheet(false);
    setPayStudent('');
    setPayAmount('');
  };

  const handleExportStatement = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Ledger statement exported', {
      description: `Downloaded ${exportFormat} statement for ${exportTerm}.`,
    });
    setOpenExportSheet(false);
  };

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
        {/* Far-right vertically arranged pill buttons */}
        <div className="flex flex-col items-end gap-2.5 shrink-0 py-1">
          <Button
            className="rounded-full w-48 h-9 text-xs font-semibold gap-2 shadow-xs justify-center"
            onClick={() => setOpenPaymentSheet(true)}
          >
            <Plus className="h-4 w-4 shrink-0" />
            Record Payment
          </Button>
          <Button
            variant="outline"
            className="rounded-full w-48 h-9 text-xs font-medium gap-2 shadow-2xs justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50"
            onClick={() => setOpenExportSheet(true)}
          >
            <Download className="h-4 w-4 shrink-0" />
            Export Fee Ledger
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
          <Button variant="ghost" size="sm" className="text-xs gap-1" onClick={() => setOpenExportSheet(true)}>
            Export CSV <ArrowRight className="h-3 w-3" />
          </Button>
        </CardFooter>
      </Card>

      {/* Record Payment Sheet (Sliding from Right) */}
      <Sheet open={openPaymentSheet} onOpenChange={setOpenPaymentSheet}>
        <SheetContent side="right" className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Record Student Fee Payment
            </SheetTitle>
            <SheetDescription className="text-xs">
              Log instant receipts, MoMo transactions, bank slips, and tuition installments.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleRecordPayment} className="space-y-4 pt-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Student Name</label>
              <Input
                placeholder="e.g. Emily Watson"
                value={payStudent}
                onChange={(e) => setPayStudent(e.target.value)}
                className="text-xs"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Payment Amount ($)</label>
              <Input
                type="number"
                placeholder="e.g. 1200"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                className="text-xs"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Payment Channel</label>
                <select
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="Mobile Money">Mobile Money (MoMo)</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash at Bursary</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Card">Debit/Credit Card</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Fee Category</label>
                <select
                  value={payFeeType}
                  onChange={(e) => setPayFeeType(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="Tuition Fees">Tuition Fees</option>
                  <option value="Examination Levy">Examination Levy</option>
                  <option value="Library Fund">Library Fund</option>
                  <option value="PTA Dues">PTA Dues</option>
                  <option value="Boarding Fees">Boarding Fees</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Transaction / Receipt Reference</label>
              <Input
                placeholder="e.g. TXN-MOMO-8839210"
                className="text-xs"
              />
            </div>

            <SheetFooter className="pt-4">
              <Button type="button" variant="outline" size="sm" onClick={() => setOpenPaymentSheet(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="gap-1.5 font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                Confirm & Issue Receipt
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      {/* Export Ledger Sheet (Sliding from Right) */}
      <Sheet open={openExportSheet} onOpenChange={setOpenExportSheet}>
        <SheetContent side="right" className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              Export Fee Ledger & Statement
            </SheetTitle>
            <SheetDescription className="text-xs">
              Generate structured audit sheets, revenue logs, and student arrears summaries.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleExportStatement} className="space-y-4 pt-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">File Format</label>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="CSV">Comma Separated Values (.csv)</option>
                <option value="Excel">Microsoft Excel (.xlsx)</option>
                <option value="PDF">Audit PDF Statement (.pdf)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Academic Term</label>
              <select
                value={exportTerm}
                onChange={(e) => setExportTerm(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="Term 1 (2024/2025)">Term 1 (2024/2025 Academic Year)</option>
                <option value="Term 2 (2024/2025)">Term 2 (2024/2025 Academic Year)</option>
                <option value="Term 3 (2023/2024)">Term 3 (2023/2024 Academic Year)</option>
                <option value="Full Year Reconciliation">Full Year Consolidated Reconciliation</option>
              </select>
            </div>

            <div className="p-3 bg-muted/30 rounded-lg text-xs space-y-1.5 border">
              <p className="font-medium text-foreground">Included Data Fields:</p>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Student ID, Student Full Name, Grade Cohort, Billed Amount, Total Collected, Unpaid Balance, Receipt No, Payment Channel, and Verification Timestamp.
              </p>
            </div>

            <SheetFooter className="pt-4">
              <Button type="button" variant="outline" size="sm" onClick={() => setOpenExportSheet(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="gap-1.5 font-semibold">
                <Download className="h-4 w-4" />
                Download Statement
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
