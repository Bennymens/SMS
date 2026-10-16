'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, DollarSign, Download, Filter, CheckCircle2 } from 'lucide-react';
import { toast } from '@/components/ui/toast';

export default function AdminFeesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-foreground" />
            Fee Management & Billing
          </h1>
          <p className="text-muted-foreground text-sm">
            School fee structures, collections, delinquent accounts, and accounting ledgers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() =>
              toast.success('Financial audit exported', {
                description: 'Reconciled tuition and auxiliary accounts ledger downloaded.',
              })
            }
          >
            <Download className="h-3.5 w-3.5" />
            Financial Audit
          </Button>
          <Button
            size="sm"
            className="gap-1.5 text-xs font-semibold"
            onClick={() =>
              toast.success('Invoice batch generated', {
                description: 'Generated and queued 840 electronic tuition statements.',
              })
            }
          >
            <CreditCard className="h-3.5 w-3.5" />
            Create Invoice Batch
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Total Billed YTD</p>
              <p className="text-2xl font-bold mt-1 text-foreground">$1,588,000</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">840 Active students</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <DollarSign className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Collected</p>
              <p className="text-2xl font-bold mt-1 text-foreground">$1,420,000</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">89.4% collection rate</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Pending Dues</p>
              <p className="text-2xl font-bold mt-1 text-foreground">$168,000</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Across 42 families</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <CreditCard className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
