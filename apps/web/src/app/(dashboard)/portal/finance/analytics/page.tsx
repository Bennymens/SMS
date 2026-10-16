'use client';

import React, { useState } from 'react';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DollarSign, TrendingUp, Users, Calendar, Download, Filter,
  PieChart as PieChartIcon, Smartphone, CreditCard, Building2, CheckCircle2,
} from 'lucide-react';
import { toast } from '@/components/ui/toast';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const trendData = [
  { week: 'W1', collected: 180, target: 150 },
  { week: 'W2', collected: 290, target: 260 },
  { week: 'W3', collected: 420, target: 400 },
  { week: 'W4', collected: 680, target: 650 },
  { week: 'W5', collected: 890, target: 900 },
  { week: 'W6', collected: 1120, target: 1100 },
  { week: 'W7', collected: 1290, target: 1300 },
  { week: 'W8', collected: 1420, target: 1500 },
];

const gradeCollectionData = [
  { grade: 'G7', target: 240, collected: 228 },
  { grade: 'G8', target: 260, collected: 245 },
  { grade: 'G9', target: 280, collected: 252 },
  { grade: 'G10', target: 310, collected: 280 },
  { grade: 'G11', target: 290, collected: 261 },
  { grade: 'G12', target: 320, collected: 295 },
];

const trendConfig = {
  collected: {
    label: 'Collected ($k)',
    color: 'hsl(var(--primary))',
  },
  target: {
    label: 'Target ($k)',
    color: 'hsl(var(--muted-foreground))',
  },
} satisfies ChartConfig;

const gradeConfig = {
  collected: {
    label: 'Collected ($k)',
    color: 'hsl(var(--primary))',
  },
  target: {
    label: 'Target ($k)',
    color: 'hsl(var(--muted-foreground))',
  },
} satisfies ChartConfig;

const paymentMethods = [
  { method: 'Mobile Money (MTN / Telecel)', share: '54.2%', amount: '$770,000', txCount: '612 txns', icon: Smartphone },
  { method: 'Direct Bank Wire (ACH / Swift)', share: '28.1%', amount: '$399,000', txCount: '194 txns', icon: Building2 },
  { method: 'Debit & Credit Cards', share: '9.4%', amount: '$133,000', txCount: '118 txns', icon: CreditCard },
  { method: 'Cashier Over-the-counter', share: '8.3%', amount: '$118,000', txCount: '82 txns', icon: DollarSign },
];

export default function FinancialAnalyticsPage() {
  const [term, setTerm] = useState('Term 1');

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Financial Analytics</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Key collection performance indicators, channel metrics, and velocity indicators
          </p>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <div className="flex gap-1 border rounded-md p-1 bg-muted/40">
            {['Term 1', 'Term 2', 'Full Year'].map((t) => (
              <Button
                key={t}
                size="sm"
                variant={term === t ? 'default' : 'ghost'}
                className="h-7 text-xs px-2.5"
                onClick={() => {
                  setTerm(t);
                  toast.info('Term range updated', {
                    description: `Displaying collection metrics for ${t}.`,
                  });
                }}
              >
                {t}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs font-medium"
            onClick={() =>
              toast.success('Financial analytics exported', {
                description: 'Payment velocity and collection efficiency metrics downloaded.',
              })
            }
          >
            <Download className="w-3.5 h-3.5" /> Export Analytics
          </Button>
        </div>
      </div>

      {/* KPI Cards with neutral icon styling */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Average Rev. Per Student</p>
              <p className="text-2xl font-bold mt-1 text-foreground">$1,690</p>
              <p className="text-xs text-muted-foreground mt-0.5">+8.2% vs previous term</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <Users className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Collection Efficiency</p>
              <p className="text-2xl font-bold mt-1 text-foreground">89.4%</p>
              <p className="text-xs text-muted-foreground mt-0.5">Target: 95.0%</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <TrendingUp className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Days Sales Outst. (DSO)</p>
              <p className="text-2xl font-bold mt-1 text-foreground">24 Days</p>
              <p className="text-xs text-muted-foreground mt-0.5">Down 6 days vs Q2</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <Calendar className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Digital Inflow Share</p>
              <p className="text-2xl font-bold mt-1 text-foreground">91.7%</p>
              <p className="text-xs text-muted-foreground mt-0.5">Low cash handling risk</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <DollarSign className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Two Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Collection Pace vs Target */}
        <Card className="border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Cumulative Collection Velocity</CardTitle>
            <CardDescription className="text-xs">
              Weekly progress ($ in thousands) against term benchmark target
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer config={trendConfig} className="h-64 w-full">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="collected"
                  stroke="var(--color-collected)"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  name="Actual"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="var(--color-target)"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  dot={false}
                  name="Target"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Grade-level comparison */}
        <Card className="border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Grade-Level Target Realization</CardTitle>
            <CardDescription className="text-xs">
              Fee realization per cohort ($ in thousands)
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer config={gradeConfig} className="h-64 w-full">
              <BarChart data={gradeCollectionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                <XAxis dataKey="grade" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="collected" fill="var(--color-collected)" radius={[4, 4, 0, 0]} name="Collected" />
                <Bar dataKey="target" fill="var(--color-target)" radius={[4, 4, 0, 0]} name="Target" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Payment Channels Breakdown */}
      <Card className="border">
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-base font-semibold">Payment Channel Breakdown</CardTitle>
          <CardDescription className="text-xs">
            Volume and settlement distribution across payment gateways
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {paymentMethods.map((pm) => {
            const Icon = pm.icon;
            return (
              <div key={pm.method} className="p-4 rounded-lg border bg-card space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-muted-foreground">
                    <Icon className="w-4 h-4" />
                  </div>
                  <Badge variant="outline" className="text-xs font-semibold">
                    {pm.share}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground line-clamp-1">{pm.method}</p>
                  <p className="text-lg font-bold text-foreground mt-0.5">{pm.amount}</p>
                  <p className="text-[11px] text-muted-foreground">{pm.txCount}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
