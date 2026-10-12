'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, Download, CheckCircle2, Clock, DollarSign, FileText } from 'lucide-react';

const feeStatements = [
  { id: 'INV-2026-001', term: 'Term 1 Tuition & Core Academics', amount: '$3,200.00', dueDate: 'Sep 15, 2026', paidDate: 'Sep 10, 2026', status: 'PAID', method: 'Online Card (•••• 4242)' },
  { id: 'INV-2026-002', term: 'Science & Computer Lab Materials Fee', amount: '$350.00', dueDate: 'Sep 25, 2026', paidDate: 'Sep 22, 2026', status: 'PAID', method: 'Bank Transfer' },
  { id: 'INV-2026-003', term: 'Annual Athletics & Gymnasium Access', amount: '$200.00', dueDate: 'Oct 01, 2026', paidDate: 'Sep 28, 2026', status: 'PAID', method: 'Online Card (•••• 4242)' },
  { id: 'INV-2026-004', term: 'Term 2 Tuition & Facilities Advance', amount: '$3,200.00', dueDate: 'Jan 10, 2027', paidDate: '—', status: 'UPCOMING', method: 'Pending' },
];

export default function StudentFeesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-foreground" />
            Fee Statements & Billing
          </h1>
          <p className="text-muted-foreground text-sm">
            View term invoices, payment receipts, upcoming schedules, and account balance records.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" className="text-xs">
            Account In Good Standing
          </Badge>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Outstanding Balance</p>
              <p className="text-2xl font-bold mt-1 text-foreground">$0.00</p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">All current fees paid</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Total Paid YTD</p>
              <p className="text-2xl font-bold mt-1 text-foreground">$3,750.00</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Academic Year 2024/2025</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <DollarSign className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Next Due Date</p>
              <p className="text-2xl font-bold mt-1 text-foreground">Jan 10, 2027</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Term 2 Tuition: $3,200</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <Clock className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statement Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Payment History & Invoices</CardTitle>
              <CardDescription>Download tax statements and payment confirmation receipts</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Download className="h-3.5 w-3.5" />
              Statement PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="p-3 font-semibold text-foreground">Invoice No</th>
                <th className="p-3 font-semibold text-foreground">Description</th>
                <th className="p-3 font-semibold text-foreground">Amount</th>
                <th className="p-3 font-semibold text-foreground">Due Date</th>
                <th className="p-3 font-semibold text-foreground">Status</th>
                <th className="p-3 font-semibold text-foreground">Payment Method</th>
                <th className="p-3 font-semibold text-foreground text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {feeStatements.map((inv) => (
                <tr key={inv.id} className="hover:bg-muted/20">
                  <td className="p-3 font-mono text-muted-foreground">{inv.id}</td>
                  <td className="p-3 font-semibold text-foreground">{inv.term}</td>
                  <td className="p-3 font-bold text-foreground">{inv.amount}</td>
                  <td className="p-3 text-muted-foreground">{inv.dueDate}</td>
                  <td className="p-3">
                    <Badge variant={inv.status === 'PAID' ? 'success' : 'secondary'} className="text-[10px]">
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-muted-foreground">{inv.method}</td>
                  <td className="p-3 text-right">
                    {inv.status === 'PAID' ? (
                      <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                        <Download className="h-3 w-3" />
                        PDF
                      </Button>
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
