'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  Settings,
  CreditCard,
  User,
  Bell,
  Shield,
  Download,
  CheckCircle2,
  Clock,
  Save,
  FileText,
  DollarSign,
  Receipt,
} from 'lucide-react';

const studentFeeLedger = [
  {
    id: 'INV-2026-001',
    description: 'Term 1 Tuition & Core Academics',
    amount: 'GH₵ 3,200.00',
    dueDate: 'Sep 15, 2026',
    paidDate: 'Sep 10, 2026',
    status: 'PAID',
    method: 'MTN Mobile Money (•••• 8901)',
  },
  {
    id: 'INV-2026-002',
    description: 'ICT Lab & Science Practical Levy',
    amount: 'GH₵ 650.00',
    dueDate: 'Sep 25, 2026',
    paidDate: 'Sep 20, 2026',
    status: 'PAID',
    method: 'Telecel Cash',
  },
  {
    id: 'INV-2026-003',
    description: 'PTA Dues & School Development Fund',
    amount: 'GH₵ 250.00',
    dueDate: 'Oct 01, 2026',
    paidDate: 'Sep 28, 2026',
    status: 'PAID',
    method: 'GCB Bank Transfer',
  },
  {
    id: 'INV-2026-004',
    description: 'Official GES Textbooks & Stationery Pack',
    amount: 'GH₵ 750.00',
    dueDate: 'Oct 05, 2026',
    paidDate: 'Oct 02, 2026',
    status: 'PAID',
    method: 'MTN Mobile Money (•••• 8901)',
  },
  {
    id: 'INV-2026-005',
    description: 'Term 2 Advance Tuition & Facility Access',
    amount: 'GH₵ 3,200.00',
    dueDate: 'Jan 12, 2027',
    paidDate: '—',
    status: 'UPCOMING',
    method: 'Pending',
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState<'fees' | 'profile' | 'notifications' | 'security'>('fees');

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Settings className="h-6 w-6 text-foreground" />
            Account Settings & Fee Statements
          </h1>
          <p className="text-muted-foreground text-sm">
            View term financial statements, official receipts, profile information, and account preferences.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" className="text-xs">
            Account In Good Standing
          </Badge>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b pb-3 overflow-x-auto">
        <Button
          variant={activeTab === 'fees' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('fees')}
          className="text-xs gap-1.5"
        >
          <CreditCard className="h-3.5 w-3.5" />
          Fee Statement & Billing
        </Button>
        <Button
          variant={activeTab === 'profile' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('profile')}
          className="text-xs gap-1.5"
        >
          <User className="h-3.5 w-3.5" />
          Profile Details
        </Button>
        <Button
          variant={activeTab === 'notifications' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('notifications')}
          className="text-xs gap-1.5"
        >
          <Bell className="h-3.5 w-3.5" />
          Notifications
        </Button>
        <Button
          variant={activeTab === 'security' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('security')}
          className="text-xs gap-1.5"
        >
          <Shield className="h-3.5 w-3.5" />
          Security
        </Button>
      </div>

      {/* TAB 1: FEE STATEMENT & BILLING */}
      {activeTab === 'fees' && (
        <div className="space-y-5">
          {/* Quick Balance Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-medium">Outstanding Balance</p>
                  <p className="text-2xl font-bold mt-1 text-foreground">GH₵ 0.00</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">All Term 1 bills settled</p>
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
                  <p className="text-2xl font-bold mt-1 text-foreground">GH₵ 4,850.00</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">2024 / 2025 Academic Year</p>
                </div>
                <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
                  <Receipt className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-medium">Next Billing Term</p>
                  <p className="text-2xl font-bold mt-1 text-foreground">Jan 12, 2027</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Term 2: GH₵ 3,200.00</p>
                </div>
                <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
                  <Clock className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fee Statement Table */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Official Fee Statement & Receipts
                  </CardTitle>
                  <CardDescription>
                    Student ID: SCH-2025-00001 • Grade 10 Section A (Alex Smith)
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs w-fit">
                  <Download className="h-3.5 w-3.5" />
                  Download Complete Statement (PDF)
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table className="min-w-[700px]">
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="font-semibold text-foreground">Invoice No</TableHead>
                    <TableHead className="font-semibold text-foreground">Item Description</TableHead>
                    <TableHead className="font-semibold text-foreground">Amount</TableHead>
                    <TableHead className="font-semibold text-foreground">Due Date</TableHead>
                    <TableHead className="font-semibold text-foreground">Status</TableHead>
                    <TableHead className="font-semibold text-foreground">Payment Channel</TableHead>
                    <TableHead className="font-semibold text-foreground text-right">Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentFeeLedger.map((inv) => (
                    <TableRow key={inv.id} className="hover:bg-muted/20">
                      <TableCell className="p-3 font-mono text-muted-foreground">{inv.id}</TableCell>
                      <TableCell className="p-3 font-semibold text-foreground">{inv.description}</TableCell>
                      <TableCell className="p-3 font-bold text-foreground">{inv.amount}</TableCell>
                      <TableCell className="p-3 text-muted-foreground">{inv.dueDate}</TableCell>
                      <TableCell className="p-3">
                        <Badge
                          variant={inv.status === 'PAID' ? 'success' : 'secondary'}
                          className="text-[10px]"
                        >
                          {inv.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="p-3 text-muted-foreground">{inv.method}</TableCell>
                      <TableCell className="p-3 text-right">
                        {inv.status === 'PAID' ? (
                          <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                            <Download className="h-3 w-3" />
                            PDF
                          </Button>
                        ) : (
                          <span className="text-muted-foreground text-xs">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 2: PROFILE DETAILS */}
      {activeTab === 'profile' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4 text-foreground" />
              Student Profile & User Account
            </CardTitle>
            <CardDescription>Personal details and student portal registration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Full Name</label>
                <input
                  type="text"
                  defaultValue="Alex Smith"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Student Email</label>
                <input
                  type="email"
                  defaultValue="alex.smith@oakridge.edu"
                  disabled
                  className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-muted-foreground text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Ghana Card / ID Number</label>
                <input
                  type="text"
                  defaultValue="GHA-789012345-6"
                  disabled
                  className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-muted-foreground text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Phone Number</label>
                <input
                  type="text"
                  defaultValue="+233 24 555 0192"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button size="sm" className="gap-1.5 text-xs">
                <Save className="h-3.5 w-3.5" />
                Save Profile Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TAB 3: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4 text-foreground" />
              SMS & Email Alerts
            </CardTitle>
            <CardDescription>Academic notices, fee payment receipts, and exam schedules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-semibold text-foreground">Fee Payment Confirmation Receipts</p>
                <p className="text-muted-foreground">Instant SMS and email alert upon mobile money payment</p>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-semibold text-foreground">Homework & Assignment Reminders</p>
                <p className="text-muted-foreground">Alert 24 hours prior to deadline</p>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-semibold text-foreground">Term Examination Timetable Notifications</p>
                <p className="text-muted-foreground">Schedule modifications and exam room updates</p>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TAB 4: SECURITY */}
      {activeTab === 'security' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4 text-foreground" />
              Security & Credentials
            </CardTitle>
            <CardDescription>Password updates and session security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-semibold text-foreground">Two-Factor Authentication (2FA)</p>
                <p className="text-muted-foreground">Require confirmation code on login</p>
              </div>
              <Button variant="outline" size="sm" className="text-xs">
                Configure 2FA
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
