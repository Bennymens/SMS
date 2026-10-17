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

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';

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
  const [items, setItems] = useState<BudgetItem[]>(budgetItems);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('ALL');

  // Sheet states
  const [openAllocationSheet, setOpenAllocationSheet] = useState(false);
  const [openExportSheet, setOpenExportSheet] = useState(false);

  // Allocation form state
  const [newDept, setNewDept] = useState('Academic & Curriculum');
  const [newAmount, setNewAmount] = useState('');
  const [newLead, setNewLead] = useState('');
  const [newJustification, setNewJustification] = useState('');

  // Export form state
  const [exportScope, setExportScope] = useState('FY 2026/27 Full Audit');
  const [exportFormat, setExportFormat] = useState('Excel (.xlsx)');

  const totalAllocated = items.reduce((acc, curr) => acc + curr.allocated, 0);
  const totalSpent = items.reduce((acc, curr) => acc + curr.spent, 0);
  const totalCommitted = items.reduce((acc, curr) => acc + curr.committed, 0);
  const totalRemaining = totalAllocated - totalSpent - totalCommitted;
  const burnRate = ((totalSpent / totalAllocated) * 100).toFixed(1);

  const filtered = items.filter((item) => {
    const matchesSearch =
      item.department.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase()) ||
      item.lead.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'ALL' || item.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleCreateAllocation = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(newAmount);
    if (!parsedAmount || isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error('Invalid Amount', { description: 'Please enter a valid allocation figure.' });
      return;
    }

    const newItem: BudgetItem = {
      code: `BUD-GEN-0${items.length + 1}`,
      department: newDept,
      allocated: parsedAmount,
      spent: 0,
      committed: 0,
      lead: newLead.trim() || 'Budget Controller',
      status: 'ON_TRACK',
    };

    setItems([newItem, ...items]);
    setNewAmount('');
    setNewLead('');
    setNewJustification('');
    setOpenAllocationSheet(false);

    toast.success('Allocation Approved', {
      description: `$${parsedAmount.toLocaleString()} committed to ${newDept}.`,
    });
  };

  const handleExportLedger = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenExportSheet(false);
    toast.success('Budget Ledger Exported', {
      description: `Generated ${exportFormat} for ${exportScope}. Download starting now.`,
    });
  };

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
        {/* Far-right vertically arranged pill buttons */}
        <div className="flex flex-col items-end gap-2.5 shrink-0 py-1">
          <Button
            className="rounded-full w-48 h-9 text-xs font-semibold gap-2 shadow-xs justify-center"
            onClick={() => setOpenAllocationSheet(true)}
          >
            <Plus className="w-4 h-4" />
            New Allocation
          </Button>
          <Button
            variant="outline"
            className="rounded-full w-48 h-9 text-xs font-medium gap-2 shadow-2xs justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50"
            onClick={() => setOpenExportSheet(true)}
          >
            <FileSpreadsheet className="w-4 h-4" />
            Export Ledger
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

      {/* New Allocation Sheet (Sliding from Right) */}
      <Sheet open={openAllocationSheet} onOpenChange={setOpenAllocationSheet}>
        <SheetContent side="right" className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              New Budget Allocation
            </SheetTitle>
            <SheetDescription className="text-xs">
              Authorize and commit fiscal budget lines to academic or operational departments.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleCreateAllocation} className="space-y-4 pt-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Department / Cost Center</label>
              <select
                value={newDept}
                onChange={(e) => setNewDept(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="Academic & Curriculum">Academic & Curriculum</option>
                <option value="Facilities & Maintenance">Facilities & Maintenance</option>
                <option value="Staff Development & Welfare">Staff Development & Welfare</option>
                <option value="Technology & EdTech Software">Technology & EdTech Software</option>
                <option value="Athletics & Extracurricular">Athletics & Extracurricular</option>
                <option value="General Administration">General Administration</option>
                <option value="Health Clinic & First Aid">Health Clinic & First Aid</option>
                <option value="Campus Security & Safety">Campus Security & Safety</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Allocation Amount ($ USD)</label>
              <Input
                type="number"
                placeholder="e.g. 50000"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                className="text-xs"
                required
                min="100"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Department Head / Authorized Lead</label>
              <Input
                placeholder="e.g. Dr. K. Mensah"
                value={newLead}
                onChange={(e) => setNewLead(e.target.value)}
                className="text-xs"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Justification / Expenditure Scope</label>
              <Input
                placeholder="e.g. Procurement of lab equipment & textbooks"
                value={newJustification}
                onChange={(e) => setNewJustification(e.target.value)}
                className="text-xs"
              />
            </div>

            <div className="p-3 bg-muted/30 rounded-lg text-xs space-y-1 border">
              <p className="font-medium text-foreground">Encumbrance & Approval Notice:</p>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Allocated funds are recorded in the general ledger immediately upon confirmation and made accessible for purchase requisitions.
              </p>
            </div>

            <SheetFooter className="pt-4">
              <Button type="button" variant="outline" size="sm" onClick={() => setOpenAllocationSheet(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="gap-1.5 font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                Commit Allocation
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
              <FileSpreadsheet className="h-5 w-5 text-primary" />
              Export Expenditure Ledger
            </SheetTitle>
            <SheetDescription className="text-xs">
              Generate detailed accounting breakdown with departmental line items and PO audit trails.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleExportLedger} className="space-y-4 pt-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Fiscal Scope & Period</label>
              <select
                value={exportScope}
                onChange={(e) => setExportScope(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="FY 2026/27 Full Audit">FY 2026/27 Full Audit (Consolidated)</option>
                <option value="Q1 Operating Expenses">Q1 Operating Expenses</option>
                <option value="Q2 Operating Expenses">Q2 Operating Expenses</option>
                <option value="Capital Expenditures Only">Capital Expenditures Only</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Ledger Format</label>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="Excel (.xlsx)">Microsoft Excel Workbook (.xlsx)</option>
                <option value="CSV (.csv)">Raw Comma-Separated Values (.csv)</option>
                <option value="PDF (.pdf)">Printable Audited PDF (.pdf)</option>
              </select>
            </div>

            <div className="p-3 bg-muted/30 rounded-lg text-xs space-y-1 border">
              <p className="font-medium text-foreground">Included Audit Columns:</p>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Code, Department Name, Approved Allocation, Actual Disbursed, Committed POs, Unencumbered Variance, Approver Sign-off.
              </p>
            </div>

            <SheetFooter className="pt-4">
              <Button type="button" variant="outline" size="sm" onClick={() => setOpenExportSheet(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="gap-1.5 font-semibold">
                <Download className="h-4 w-4" />
                Export Ledger
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
