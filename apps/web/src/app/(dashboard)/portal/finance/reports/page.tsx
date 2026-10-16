'use client';

import React, { useState } from 'react';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  FileText, Download, Filter, Search, Plus, Calendar, DollarSign,
  TrendingUp, ArrowDownRight, ArrowUpRight, BarChart3, Printer,
} from 'lucide-react';
import { toast } from '@/components/ui/toast';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const monthlyComparisonData = [
  { month: 'May', revenue: 140, expense: 95 },
  { month: 'Jun', revenue: 175, expense: 110 },
  { month: 'Jul', revenue: 120, expense: 85 },
  { month: 'Aug', revenue: 260, expense: 130 },
  { month: 'Sep', revenue: 380, expense: 160 },
  { month: 'Oct', revenue: 345, expense: 145 },
];

const chartConfig = {
  revenue: {
    label: 'Revenue ($k)',
    color: 'hsl(var(--primary))',
  },
  expense: {
    label: 'Expenses ($k)',
    color: 'hsl(var(--muted-foreground))',
  },
} satisfies ChartConfig;

const reportDocuments = [
  { id: 'REP-2026-001', name: 'Term 1 Comprehensive Financial Statement', period: 'Sep – Dec 2026', type: 'Term Audit', date: 'Oct 12, 2026', generatedBy: 'Finance Dept', size: '2.4 MB' },
  { id: 'REP-2026-002', name: 'Monthly Cash Flow Statement – September', period: 'Sep 2026', type: 'Monthly', date: 'Oct 01, 2026', generatedBy: 'A. Sterling', size: '1.1 MB' },
  { id: 'REP-2026-003', name: 'Fee Collection & Arrears Aging Analysis', period: 'Term 1 2026/27', type: 'Arrears', date: 'Sep 28, 2026', generatedBy: 'System Auto', size: '890 KB' },
  { id: 'REP-2026-004', name: 'Staff Payroll & Withholding Tax Report', period: 'Sep 2026', type: 'Payroll', date: 'Sep 25, 2026', generatedBy: 'A. Sterling', size: '1.8 MB' },
  { id: 'REP-2026-005', name: 'Departmental Budget Utilization Q3', period: 'Q3 2026', type: 'Budget', date: 'Sep 20, 2026', generatedBy: 'Finance Dept', size: '3.2 MB' },
  { id: 'REP-2026-006', name: 'Scholarships & Tuition Waivers Summary', period: 'Academic 2026/27', type: 'Audit', date: 'Sep 15, 2026', generatedBy: 'Finance Dept', size: '740 KB' },
  { id: 'REP-2026-007', name: 'Capital Expenditure & Facility Upgrades', period: 'H1 2026', type: 'CapEx', date: 'Aug 30, 2026', generatedBy: 'Admin Office', size: '4.5 MB' },
];

export default function FinancialReportsPage() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');

  const filteredReports = reportDocuments.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === 'ALL' || r.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Financial Reports</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Audit logs, statutory returns, cash flow balances, and departmental statements
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs font-medium"
            onClick={() =>
              toast.info('Sending to printer', {
                description: 'Formatting executive financial overview for hardcopy printing.',
              })
            }
          >
            <Printer className="w-3.5 h-3.5" /> Print Overview
          </Button>
          <Button
            size="sm"
            className="gap-1.5 text-xs font-semibold"
            onClick={() =>
              toast.success('Report generation triggered', {
                description: 'Compiling real-time balance sheet, cash flows, and budget variance.',
              })
            }
          >
            <Plus className="w-3.5 h-3.5" /> Generate Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Total Revenue (YTD)</p>
              <p className="text-2xl font-bold mt-1 text-foreground">$1.42M</p>
              <p className="text-xs text-muted-foreground mt-0.5">+14% vs FY2025</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <DollarSign className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Operating Expenses</p>
              <p className="text-2xl font-bold mt-1 text-foreground">$890k</p>
              <p className="text-xs text-muted-foreground mt-0.5">62.6% of budget</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <ArrowDownRight className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Net Operating Margin</p>
              <p className="text-2xl font-bold mt-1 text-foreground">$530k</p>
              <p className="text-xs text-muted-foreground mt-0.5">37.3% margin</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Outstanding Arrears</p>
              <p className="text-2xl font-bold mt-1 text-foreground">$168k</p>
              <p className="text-xs text-muted-foreground mt-0.5">94 pending accounts</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <BarChart3 className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cash Flow Chart */}
      <Card className="border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Revenue vs Expense Comparison</CardTitle>
              <CardDescription className="text-xs">
                Monthly trajectory ($ in thousands) across last 6 months
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-xs">
              FY 2026/2027
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <BarChart data={monthlyComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} name="Revenue" />
              <Bar dataKey="expense" fill="var(--color-expense)" radius={[4, 4, 0, 0]} name="Expenses" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Reports Archive Table */}
      <Card className="border">
        <CardHeader className="pb-3 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base font-semibold">Available Reports Archive</CardTitle>
              <CardDescription className="text-xs">
                Downloadable audited statements and export files
              </CardDescription>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-48 sm:w-60">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search report name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-8 pl-8 pr-3 text-xs rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              <div className="flex gap-1">
                {(['ALL', 'Monthly', 'Term Audit', 'Payroll', 'Budget'] as const).map((t) => (
                  <Button
                    key={t}
                    size="sm"
                    variant={selectedType === t ? 'default' : 'outline'}
                    className="h-8 text-xs px-2.5"
                    onClick={() => setSelectedType(t)}
                  >
                    {t === 'ALL' ? 'All' : t}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Report Title</TableHead>
                <TableHead className="text-xs">Coverage Period</TableHead>
                <TableHead className="text-xs">Classification</TableHead>
                <TableHead className="text-xs">Date Generated</TableHead>
                <TableHead className="text-xs">Author</TableHead>
                <TableHead className="text-xs">Size</TableHead>
                <TableHead className="text-xs text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id} className="hover:bg-muted/40 transition-colors">
                  <TableCell className="py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0 text-muted-foreground">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground">{report.name}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">{report.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{report.period}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] font-normal">
                      {report.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{report.date}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{report.generatedBy}</TableCell>
                  <TableCell className="text-xs text-muted-foreground font-mono">{report.size}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs px-2.5 gap-1.5 text-muted-foreground hover:text-foreground font-medium"
                      onClick={() =>
                        toast.success(`Downloading ${report.name}`, {
                          description: `Format: PDF • Size: ${report.size}`,
                        })
                      }
                    >
                      <Download className="w-3.5 h-3.5" /> PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredReports.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-xs text-muted-foreground">
                    No financial reports matched your filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
