'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Users, DollarSign, Download, Filter } from 'lucide-react';

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-foreground" />
            Institutional Analytics
          </h1>
          <p className="text-muted-foreground text-sm">
            Enrollment demographics, retention metrics, financial projections, and academic trends.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Download className="h-3.5 w-3.5" />
            Export Metrics
          </Button>
          <Badge variant="secondary" className="text-xs">
            2024–2025 Live
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Student Growth</p>
              <p className="text-2xl font-bold mt-1 text-foreground">+12.4%</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">840 Active students</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <TrendingUp className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Daily Attendance</p>
              <p className="text-2xl font-bold mt-1 text-foreground">95.8%</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Above target (94%)</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <Users className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Fee Collection Rate</p>
              <p className="text-2xl font-bold mt-1 text-foreground">89.4%</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">$1.42M collected</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <DollarSign className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Faculty Retention</p>
              <p className="text-2xl font-bold mt-1 text-foreground">97.8%</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">48 Full-time educators</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <Users className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
