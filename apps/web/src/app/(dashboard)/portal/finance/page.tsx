'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
} from '@/components/ui/chart';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line,
} from 'recharts';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationPrevious, PaginationNext,
} from '@/components/ui/pagination';
import {
  CreditCard, TrendingUp, AlertCircle, CheckCircle2, Clock,
  ArrowRight, DollarSign, FileText, Download, ArrowUpRight,
  ArrowDownRight, Wallet, PieChart, BarChart3, Award, AlertTriangle,
  Send,
} from 'lucide-react';
import { toast } from '@/components/ui/toast';

// ── Data ──────────────────────────────────────────────────────────────────────
const kpis = [
  { title: 'Total Collected',    value: '$1.42M', sub: '89.4% of term target',    trend: '+$48k this week',    up: true,  icon: DollarSign },
  { title: 'Outstanding Fees',   value: '$168k',  sub: '94 students pending',      trend: '-$12k vs last week', up: true,  icon: AlertCircle },
  { title: 'Payments This Month',value: '213',    sub: 'Transactions processed',   trend: '+12% vs last month', up: true,  icon: TrendingUp  },
  { title: 'Overdue Accounts',   value: '31',     sub: 'Over 30 days past due',    trend: '+3 this week',       up: false, icon: Clock       },
];

const recentPayments = [
  { name: 'Emily Watson',       id: 'SCH-2025-00001', grade: 'Grade 10-A', amount: '$1,200', date: 'Oct 12, 2026', method: 'Mobile Money', status: 'PAID'    },
  { name: 'Marcus Kwame Chen',  id: 'SCH-2025-00002', grade: 'Grade 10-B', amount: '$950',   date: 'Oct 11, 2026', method: 'Bank Transfer', status: 'PAID'    },
  { name: 'Sophia Al-Mansoor',  id: 'SCH-2025-00003', grade: 'Grade 11-A', amount: '$600',   date: 'Oct 10, 2026', method: 'Cash',          status: 'PARTIAL' },
  { name: 'Kofi Boateng',       id: 'SCH-2025-00004', grade: 'Grade 10-A', amount: '$0',     date: '—',            method: '—',             status: 'OVERDUE' },
  { name: 'Abena Osei Poku',    id: 'SCH-2025-00005', grade: 'Grade 10-A', amount: '$1,200', date: 'Oct 08, 2026', method: 'Cheque',        status: 'PAID'    },
  { name: 'Selorm Doe',         id: 'SCH-2025-00006', grade: 'Grade 11-A', amount: '$750',   date: 'Oct 07, 2026', method: 'Mobile Money', status: 'PARTIAL' },
  { name: 'Blessing Antwi',     id: 'SCH-2025-00007', grade: 'Grade 11-A', amount: '$1,200', date: 'Oct 06, 2026', method: 'Card',          status: 'PAID'    },
];

const statusBadge: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  PAID:    { label: 'Paid',    variant: 'default'     },
  PARTIAL: { label: 'Partial', variant: 'secondary'   },
  OVERDUE: { label: 'Overdue', variant: 'destructive' },
};

const monthlyData = [
  { month: 'Jul', collected: 320, target: 400 },
  { month: 'Aug', collected: 380, target: 400 },
  { month: 'Sep', collected: 410, target: 400 },
  { month: 'Oct', collected: 310, target: 400 },
  { month: 'Nov', collected: 0,   target: 400 },
  { month: 'Dec', collected: 0,   target: 400 },
];

const weeklyTrend = [
  { week: 'Wk 1', payments: 48 },
  { week: 'Wk 2', payments: 62 },
  { week: 'Wk 3', payments: 55 },
  { week: 'Wk 4', payments: 71 },
  { week: 'Wk 5', payments: 37 },
];

const barConfig = {
  collected: { label: 'Collected ($k)', color: 'hsl(var(--primary))' },
  target:    { label: 'Target ($k)',    color: 'hsl(var(--muted-foreground))' },
};
const lineConfig = {
  payments: { label: 'Payments', color: 'hsl(var(--primary))' },
};

const feeCategories = [
  { label: 'Tuition Fees',      pct: 90.7, color: 'bg-primary' },
  { label: 'Examination Levy',  pct: 90.8, color: 'bg-blue-500' },
  { label: 'Sports & Activity', pct: 74.5, color: 'bg-amber-500' },
  { label: 'Library Fund',      pct: 76.0, color: 'bg-violet-500' },
  { label: 'PTA Dues',          pct: 73.3, color: 'bg-pink-500' },
];

const quickModules = [
  { label: 'Fee Collection', href: '/portal/finance/fees',         icon: CreditCard, count: '840 Students' },
  { label: 'Outstanding',    href: '/portal/finance/outstanding',  icon: AlertCircle, count: '94 Pending'  },
  { label: 'Scholarships',   href: '/portal/finance/scholarships', icon: Award,       count: '12 Active'   },
  { label: 'Reports',        href: '/portal/finance/reports',      icon: FileText,    count: 'Term 1'      },
  { label: 'Budget',         href: '/portal/finance/budget',       icon: DollarSign,  count: 'FY 2025'     },
];

// ── Component ──────────────────────────────────────────────────────────────────
const TXN_PER_PAGE = 4;

export default function FinanceDashboardPage() {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'PAID' | 'PARTIAL' | 'OVERDUE'>('ALL');
  const [txnPage, setTxnPage] = useState(1);

  // Record Payment Sheet
  const [paymentSheetOpen, setPaymentSheetOpen] = useState(false);
  const [payStudentName, setPayStudentName] = useState('');
  const [payAmount, setPayAmount] = useState('');
  const [payMethod, setPayMethod] = useState('Mobile Money');
  const [payFeeType, setPayFeeType] = useState('Tuition Fees');
  const [payNotes, setPayNotes] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  // Export spinner
  const [isExporting, setIsExporting] = useState(false);

  const filtered = activeFilter === 'ALL'
    ? recentPayments
    : recentPayments.filter((p) => p.status === activeFilter);

  const totalTxnPages = Math.max(1, Math.ceil(filtered.length / TXN_PER_PAGE));
  const pagedTxns = filtered.slice((txnPage - 1) * TXN_PER_PAGE, txnPage * TXN_PER_PAGE);

  const handleRecordPayment = () => {
    if (!payStudentName.trim() || !payAmount.trim()) return;
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setPaymentSheetOpen(false);
      setPayStudentName('');
      setPayAmount('');
      setPayNotes('');
      toast.success('Payment recorded', {
        description: `$${payAmount} received from ${payStudentName} via ${payMethod} for ${payFeeType}.`,
      });
    }, 1100);
  };

  const handleExportReport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast.success('Finance summary exported', {
        description: 'Term 1 fee collections and treasury reconciliation report downloaded.',
      });
    }, 1000);
  };

  return (
    <div className="space-y-6 p-6">

      {/* ── HERO BANNER ─────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border bg-gradient-to-br from-primary/8 via-background to-muted/30 p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shrink-0">
              <Wallet className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Finance &amp; Revenue Centre
                </h1>
                <Badge variant="outline" className="font-semibold">Finance Officer</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Oakridge Academy &nbsp;•&nbsp; 2024/2025 Academic Year &nbsp;•&nbsp; Term 1
              </p>
              <div className="flex items-center gap-4 mt-2 flex-wrap">
                <div className="flex items-center gap-1.5 text-xs">
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-medium">$48k collected this week</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>31 accounts overdue</span>
                </div>
              </div>
            </div>
          </div>
          {/* Far-right vertically arranged pill buttons */}
          <div className="flex flex-col items-end gap-2.5 shrink-0 py-1">
            <Button
              className="rounded-full w-48 h-9 text-xs font-semibold gap-2 shadow-xs justify-center"
              onClick={() => setPaymentSheetOpen(true)}
            >
              <CreditCard className="w-4 h-4" />
              Record Payment
            </Button>
            <Button
              variant="outline"
              className="rounded-full w-48 h-9 text-xs font-medium gap-2 shadow-2xs justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50"
              onClick={handleExportReport}
              disabled={isExporting}
            >
              {isExporting ? <Spinner className="h-4 w-4" /> : <Download className="h-4 w-4" />}
              {isExporting ? 'Exporting...' : 'Export Report'}
            </Button>
          </div>
        </div>
      </div>

      {/* ── KPI CARDS ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title} className="hover:ring-2 hover:ring-primary/20 transition-all">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="rounded-lg p-2 bg-muted">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className={`flex items-center gap-0.5 text-[10px] font-semibold ${kpi.up ? 'text-emerald-600' : 'text-destructive'}`}>
                    {kpi.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {kpi.trend}
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5 uppercase tracking-wide">{kpi.title}</p>
                <p className="text-[11px] text-muted-foreground mt-1">{kpi.sub}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── CHARTS ROW ────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar chart — Monthly collections */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              Monthly Fee Collections vs Target ($k)
            </CardTitle>
            <CardDescription>2024/2025 Academic Year — Term 1</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={barConfig} className="h-[200px] w-full">
              <BarChart data={monthlyData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="target"    radius={[3, 3, 0, 0]} fill="hsl(var(--muted))" />
                <Bar dataKey="collected" radius={[3, 3, 0, 0]} fill="hsl(var(--primary))" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Line chart — Weekly payment trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              Weekly Payment Volume (Oct 2026)
            </CardTitle>
            <CardDescription>Number of individual transactions per week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={lineConfig} className="h-[200px] w-full">
              <LineChart data={weeklyTrend} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="payments"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* ── TABLE + SIDE PANEL ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Transactions table */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  Fee Transactions
                </CardTitle>
                <CardDescription>Term 1 payment activity — all students</CardDescription>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {(['ALL', 'PAID', 'PARTIAL', 'OVERDUE'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => { setActiveFilter(f); setTxnPage(1); }}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all border ${
                      activeFilter === f
                        ? 'bg-foreground text-background border-foreground'
                        : 'bg-background text-muted-foreground border-border hover:text-foreground'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="pl-4 font-semibold">Student</TableHead>
                  <TableHead className="font-semibold">Grade</TableHead>
                  <TableHead className="font-semibold text-right">Amount</TableHead>
                  <TableHead className="font-semibold">Method</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold pr-4">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagedTxns.map((p, i) => (
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
                    <TableCell className="text-xs text-muted-foreground">{p.method}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{p.date}</TableCell>
                    <TableCell className="pr-4">
                      <Badge variant={statusBadge[p.status].variant} className="text-[10px]">
                        {statusBadge[p.status].label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {pagedTxns.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-xs text-muted-foreground">
                      No transactions match this filter.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex-col items-start gap-3 pt-3">
            <div className="flex items-center justify-between w-full">
              <p className="text-xs text-muted-foreground">
                {filtered.length} record{filtered.length !== 1 ? 's' : ''} &bull; Page {txnPage} of {totalTxnPages}
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs gap-1"
                onClick={() => toast.success('Full ledger loaded', { description: 'Navigating to complete fee ledger.' })}
              >
                Full Ledger <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
            {totalTxnPages > 1 && (
              <Pagination className="justify-start mx-0">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => { e.preventDefault(); setTxnPage((p) => Math.max(1, p - 1)); }}
                      className={txnPage === 1 ? 'pointer-events-none opacity-40' : ''}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalTxnPages }, (_, i) => i + 1).map((pg) => (
                    <PaginationItem key={pg}>
                      <PaginationLink
                        href="#"
                        isActive={pg === txnPage}
                        onClick={(e) => { e.preventDefault(); setTxnPage(pg); }}
                        className="h-8 w-8 text-xs"
                      >
                        {pg}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => { e.preventDefault(); setTxnPage((p) => Math.min(totalTxnPages, p + 1)); }}
                      className={txnPage === totalTxnPages ? 'pointer-events-none opacity-40' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </CardFooter>
        </Card>

        {/* Fee category breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <PieChart className="h-4 w-4 text-muted-foreground" />
              Fee Category Breakdown
            </CardTitle>
            <CardDescription>Collection rate per fee type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {feeCategories.map((f) => (
              <div key={f.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground font-medium">{f.label}</span>
                  <Badge variant="outline" className="text-[10px] font-semibold">{f.pct}%</Badge>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${f.color}`} style={{ width: `${f.pct}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs gap-2"
              onClick={() => toast.success('Report generated', { description: 'Full financial report is ready to download.' })}
            >
              <FileText className="h-3.5 w-3.5" />
              Full Financial Report
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* ── QUICK MODULE CARDS ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {quickModules.map((m) => {
          const Icon = m.icon;
          return (
            <Link key={m.label} href={m.href}>
              <Card className="hover:ring-2 hover:ring-primary/20 transition-all cursor-pointer h-full">
                <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                  <div className="rounded-lg p-2.5 bg-muted">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-xs font-semibold text-foreground">{m.label}</p>
                  <Badge variant="secondary" className="text-[10px]">{m.count}</Badge>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* ── RECORD PAYMENT SHEET ──────────────────────────────────────────────── */}
      <Sheet open={paymentSheetOpen} onOpenChange={(open) => { if (!isRecording) setPaymentSheetOpen(open); }}>
        <SheetContent side="right" className="sm:max-w-md w-full overflow-y-auto">
          <SheetHeader className="mb-4">
            <SheetTitle className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> Record Fee Payment
            </SheetTitle>
            <SheetDescription>
              Enter payment details to update the student&apos;s fee balance and generate a receipt.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground block">Student Name / ID</label>
              <input
                type="text"
                value={payStudentName}
                onChange={(e) => setPayStudentName(e.target.value)}
                placeholder="e.g. Emily Watson or SCH-2025-00001"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">Amount ($)</label>
                <input
                  type="number"
                  min={0}
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  placeholder="e.g. 1200"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground block">Payment Method</label>
                <select
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option>Mobile Money</option>
                  <option>Bank Transfer</option>
                  <option>Cash</option>
                  <option>Cheque</option>
                  <option>Card</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground block">Fee Type</label>
              <select
                value={payFeeType}
                onChange={(e) => setPayFeeType(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option>Tuition Fees</option>
                <option>Examination Levy</option>
                <option>Sports &amp; Activity</option>
                <option>Library Fund</option>
                <option>PTA Dues</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground block">Receipt / Reference No.</label>
              <input
                type="text"
                placeholder="e.g. RCP-20261012-0042"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground block">Notes / Remarks</label>
              <Textarea
                rows={3}
                value={payNotes}
                onChange={(e) => setPayNotes(e.target.value)}
                placeholder="e.g. Partial payment — balance of $250 due by end of month..."
                className="text-sm"
              />
            </div>
          </div>

          <SheetFooter className="mt-6 flex gap-2">
            <SheetClose asChild>
              <Button variant="outline" size="sm" disabled={isRecording}>Cancel</Button>
            </SheetClose>
            <Button
              size="sm"
              className="flex-1 gap-1.5 font-semibold"
              onClick={handleRecordPayment}
              disabled={isRecording || !payStudentName.trim() || !payAmount.trim()}
            >
              {isRecording ? <Spinner className="h-3.5 w-3.5" /> : <Send className="h-3.5 w-3.5" />}
              {isRecording ? 'Recording...' : 'Record Payment'}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

    </div>
  );
}
