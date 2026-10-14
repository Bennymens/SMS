'use client';

import React, { useState } from 'react';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Settings, CreditCard, Bell, Shield, Sliders, CheckCircle2,
  Save, AlertCircle, RefreshCw, Key, Building2,
} from 'lucide-react';

export default function FinanceSettingsPage() {
  const [currency, setCurrency] = useState('USD ($)');
  const [dueGraceDays, setDueGraceDays] = useState('14');
  const [autoSmsEnabled, setAutoSmsEnabled] = useState(true);
  const [autoEmailReceipt, setAutoEmailReceipt] = useState(true);
  const [latePenaltyPct, setLatePenaltyPct] = useState('5');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 p-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Finance Settings</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure billing terms, payment gateway integrations, and automatic notification triggers
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleSave} className="gap-1.5 text-xs">
            {saved ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Save className="w-3.5 h-3.5" />}
            {saved ? 'Saved Successfully' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Fiscal & Currency Configuration */}
      <Card className="border">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-muted-foreground">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Fiscal Year & Currency</CardTitle>
              <CardDescription className="text-xs">
                Base ledger denominated currency and standard terms
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Base Ledger Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full h-9 px-3 text-xs rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option>USD ($) — United States Dollar</option>
              <option>GHS (GH₵) — Ghanaian Cedi</option>
              <option>NGN (₦) — Nigerian Naira</option>
              <option>GBP (£) — British Pound</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Active Academic Term</label>
            <input
              type="text"
              readOnly
              value="Term 1 (2024/2025)"
              className="w-full h-9 px-3 text-xs rounded-md border border-input bg-muted text-muted-foreground cursor-not-allowed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Payment Grace Period (Days)</label>
            <input
              type="number"
              value={dueGraceDays}
              onChange={(e) => setDueGraceDays(e.target.value)}
              className="w-full h-9 px-3 text-xs rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Late Fee Penalty (%)</label>
            <input
              type="number"
              value={latePenaltyPct}
              onChange={(e) => setLatePenaltyPct(e.target.value)}
              className="w-full h-9 px-3 text-xs rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Gateways */}
      <Card className="border">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-muted-foreground">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Payment Gateways & Integrations</CardTitle>
              <CardDescription className="text-xs">
                Active payment processors for collecting tuition and auxiliary fees
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-lg border bg-card">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-muted flex items-center justify-center text-muted-foreground font-bold text-xs">
                MOMO
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">MTN & Telecel Mobile Money</p>
                <p className="text-[11px] text-muted-foreground">Connected via Aggregator API · Settlement: T+0</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default" className="text-[10px]">Connected</Badge>
              <Button variant="ghost" size="sm" className="h-7 text-xs px-2">Config</Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-lg border bg-card">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-muted flex items-center justify-center text-muted-foreground font-bold text-xs">
                CARD
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">Stripe / Paystack Card Gateway</p>
                <p className="text-[11px] text-muted-foreground">Visa, MasterCard, Verve accepted · Settlement: T+1</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default" className="text-[10px]">Connected</Badge>
              <Button variant="ghost" size="sm" className="h-7 text-xs px-2">Config</Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-lg border bg-card">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-muted flex items-center justify-center text-muted-foreground font-bold text-xs">
                ACH
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">Direct Bank Wire / Virtual Accounts</p>
                <p className="text-[11px] text-muted-foreground">Stanbic & Ecobank Virtual Account numbers assigned per student</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default" className="text-[10px]">Connected</Badge>
              <Button variant="ghost" size="sm" className="h-7 text-xs px-2">Config</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reminder & Automated Notices */}
      <Card className="border">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-muted-foreground">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Automated Notifications & Receipts</CardTitle>
              <CardDescription className="text-xs">
                Dispatch triggers for payment receipts, reminder alerts, and statements
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5 space-y-3">
          <label className="flex items-center justify-between p-3 rounded-lg border bg-card cursor-pointer">
            <div>
              <p className="text-xs font-medium text-foreground">Instant SMS Payment Confirmation</p>
              <p className="text-[11px] text-muted-foreground">Send SMS immediately to registered guardian contact upon receipt</p>
            </div>
            <input
              type="checkbox"
              checked={autoSmsEnabled}
              onChange={(e) => setAutoSmsEnabled(e.target.checked)}
              className="h-4 w-4 rounded border-input"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg border bg-card cursor-pointer">
            <div>
              <p className="text-xs font-medium text-foreground">Auto-Email PDF Receipts</p>
              <p className="text-[11px] text-muted-foreground">Email official stamped receipt with QR code verification</p>
            </div>
            <input
              type="checkbox"
              checked={autoEmailReceipt}
              onChange={(e) => setAutoEmailReceipt(e.target.checked)}
              className="h-4 w-4 rounded border-input"
            />
          </label>
        </CardContent>
      </Card>
    </div>
  );
}
