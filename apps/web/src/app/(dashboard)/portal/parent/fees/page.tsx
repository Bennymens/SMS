'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, Download, CheckCircle2 } from 'lucide-react';

export default function ParentFeesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-foreground" />
            Family Fee Statements & Payments
          </h1>
          <p className="text-muted-foreground text-sm">
            Review billing records, pay tuition balances online, and obtain tax receipts.
          </p>
        </div>
        <Button size="sm" className="gap-1.5 text-xs">
          <CreditCard className="h-3.5 w-3.5" />
          Make Online Payment
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Current Account Balance</CardTitle>
            <CardDescription className="text-xs">Student ID: SCH-2025-00001</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b">
              <span className="text-muted-foreground">Outstanding Amount:</span>
              <span className="font-bold text-foreground">$0.00</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Billing Status:</span>
              <Badge variant="success">Current & Fully Paid</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
