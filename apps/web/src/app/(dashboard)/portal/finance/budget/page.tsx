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
  DollarSign, Download, Plus, Search, Building2, TrendingDown,
  PieChart, AlertTriangle, CheckCircle2, ChevronRight, FileSpreadsheet,
} from 'lucide-react';
import { toast } from '@/components/ui/toast';

interface BudgetItem {
  code: string;
  department: string;
  allocated: number;
  spent: number;
  committed: number;
  lead: string;
  status: 'ON_TRACK' | 'NEAR_LIMIT' | 'OVER_BUDGET';
}

const budgetItems: BudgetItem[] = [
  { code: 'BUD-ACAD-01', department: 'Academic & Curriculum', allocated: 420000, spent: 310500, committed: 18000, lead: 'Dr. Mensah', status: 'ON_TRACK' },
  { code: 'BUD-FAC-02',  department: 'Facilities & Maintenance', allocated: 280000, spent: 228000, committed: 34000, lead: 'Eng. Boateng', status: 'NEAR_LIMIT' },
  { code: 'BUD-HR-03',   department: 'Staff Development & Welfare', allocated: 150000, spent: 92400, committed: 8000, lead: 'Mrs. Sterling', status: 'ON_TRACK' },
  { code: 'BUD-IT-04',   department: 'Technology & EdTech Software', allocated: 95000, spent: 68200, committed: 12500, lead: 'Mr. Asante', status: 'ON_TRACK' },
  { code: 'BUD-SPT-05',  department: 'Athletics & Extracurricular', allocated: 65000, spent: 58900, committed: 4200, lead: 'Coach Adams', status: 'NEAR_LIMIT' },
  { code: 'BUD-ADM-06',  department: 'General Administration', allocated: 80000, spent: 44100, committed: 3500, lead: 'Admin Office', status: 'ON_TRACK' },
  { code: 'BUD-MED-07',  department: 'Health Clinic & First Aid', allocated: 35000, spent: 36800, committed: 1200, lead: 'Nurse Akua', status: 'OVER_BUDGET' },
  { code: 'BUD-SEC-08',  department: 'Campus Security & Safety', allocated: 75000, spent: 51200, committed: 2000, lead: 'Capt. Darko', status: 'ON_TRACK' },
];

const statusBadge: Record<string, 'default' | 'secondary' | 'destructive'> = {
  ON_TRACK: 'default',
  NEAR_LIMIT: 'secondary',
  OVER_BUDGET: 'destructive',
};

const statusLabel: Record<string, string> = {
  ON_TRACK: 'On Track',
  NEAR_LIMIT: 'Near Limit',
  OVER_BUDGET: 'Over Budget',
};

export default function BudgetExpenditurePage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('ALL');

  const totalAllocated = budgetItems.reduce((acc, curr) => acc + curr.allocated, 0);
  const totalSpent = budgetItems.reduce((acc, curr) => acc + curr.spent, 0);
  const totalCommitted = budgetItems.reduce((acc, curr) => acc + curr.committed, 0);
  const totalRemaining = totalAllocated - totalSpent - totalCommitted;
  const burnRate = ((totalSpent / totalAllocated) * 100).toFixed(1);

  const filtered = budgetItems.filter((item) => {
    const matchesSearch =
      item.department.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase()) ||
      item.lead.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'ALL' || item.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Budget & Expenditure</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            FY 2026/2027 · Annual Operating & Capital Allocation Oversight
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs font-medium"
            onClick={() =>
              toast.success('Budget ledger exported', {
                description: 'Departmental expenditure and PO commitments CSV downloaded.',
              })
            }
          >
            <FileSpreadsheet className="w-3.5 h-3.5" /> Export Ledger
          </Button>
          <Button
            size="sm"
            className="gap-1.5 text-xs font-semibold"
            onClick={() =>
              toast.info('New budget allocation', {
                description: 'Opening department cost center allocation form...',
              })
            }
          >
            <Plus className="w-3.5 h-3.5" /> New Allocation
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Approved Budget</p>
              <p className="text-2xl font-bold mt-1 text-foreground">${(totalAllocated / 1000).toFixed(0)}k</p>
              <p className="text-xs text-muted-foreground mt-0.5">8 cost centers</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <DollarSign className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Disbursed YTD</p>
              <p className="text-2xl font-bold mt-1 text-foreground">${(totalSpent / 1000).toFixed(0)}k</p>
              <p className="text-xs text-muted-foreground mt-0.5">{burnRate}% burn rate</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <TrendingDown className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Committed POs</p>
              <p className="text-2xl font-bold mt-1 text-foreground">${(totalCommitted / 1000).toFixed(0)}k</p>
              <p className="text-xs text-muted-foreground mt-0.5">Encumbered funds</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <Building2 className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Available Balance</p>
              <p className="text-2xl font-bold mt-1 text-foreground">${(totalRemaining / 1000).toFixed(0)}k</p>
              <p className="text-xs text-muted-foreground mt-0.5">{(100 - parseFloat(burnRate)).toFixed(1)}% remaining</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <PieChart className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Utilization Progress Cards */}
      <Card className="border">
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-base font-semibold">Departmental Burn Rates</CardTitle>
          <CardDescription className="text-xs">
            Real-time expenditure tracking against allocated thresholds
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {budgetItems.slice(0, 6).map((item) => {
            const pct = Math.min(100, Math.round((item.spent / item.allocated) * 100));
            return (
              <div key={item.code} className="space-y-1.5 p-3 rounded-lg border bg-card">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground">{item.department}</span>
                  <span className="text-muted-foreground font-mono">
                    ${(item.spent / 1000).toFixed(0)}k / ${(item.allocated / 1000).toFixed(0)}k ({pct}%)
                  </span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Lead: {item.lead}</span>
                  <span>Rem: ${((item.allocated - item.spent) / 1000).toFixed(0)}k</span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Main Budget Table */}
      <Card className="border">
        <CardHeader className="pb-3 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base font-semibold">Cost Center Ledgers</CardTitle>
              <CardDescription className="text-xs">
                Line-by-line departmental allocations, expenses, and current balances
              </CardDescription>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-48 sm:w-60">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search department or lead..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-8 pl-8 pr-3 text-xs rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              <div className="flex gap-1">
                {(['ALL', 'ON_TRACK', 'NEAR_LIMIT', 'OVER_BUDGET'] as const).map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant={filter === s ? 'default' : 'outline'}
                    className="h-8 text-xs px-2.5"
                    onClick={() => setFilter(s)}
                  >
                    {s === 'ALL' ? 'All' : statusLabel[s]}
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
                <TableHead className="text-xs">Cost Center</TableHead>
                <TableHead className="text-xs">Department</TableHead>
                <TableHead className="text-xs text-right">Budget Allocated</TableHead>
                <TableHead className="text-xs text-right">Disbursed (YTD)</TableHead>
                <TableHead className="text-xs text-right">Committed</TableHead>
                <TableHead className="text-xs text-right">Available</TableHead>
                <TableHead className="text-xs">Department Lead</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => {
                const available = item.allocated - item.spent - item.committed;
                return (
                  <TableRow key={item.code} className="hover:bg-muted/40 transition-colors">
                    <TableCell className="text-xs font-mono font-medium text-foreground py-3">
                      {item.code}
                    </TableCell>
                    <TableCell className="text-xs font-medium text-foreground">
                      {item.department}
                    </TableCell>
                    <TableCell className="text-xs text-right font-mono">
                      ${item.allocated.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-xs text-right font-mono text-foreground font-semibold">
                      ${item.spent.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-xs text-right font-mono text-muted-foreground">
                      ${item.committed.toLocaleString()}
                    </TableCell>
                    <TableCell className={`text-xs text-right font-mono font-bold ${available < 0 ? 'text-destructive' : 'text-foreground'}`}>
                      ${available.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{item.lead}</TableCell>
                    <TableCell>
                      <Badge variant={statusBadge[item.status]} className="text-[10px]">
                        {statusLabel[item.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-7 text-xs px-2 text-muted-foreground hover:text-foreground">
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-xs text-muted-foreground">
                    No cost centers found matching filter.
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
