'use client';

import React, { useState } from 'react';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { AlertCircle, Send, Phone, Mail, Clock, Download } from 'lucide-react';
import { toast } from '@/components/ui/toast';

const outstanding = [
  { name: 'Kofi Boateng',       id: 'SCH-2025-00004', grade: 'Grade 10-A', balance: '$1,200', daysOverdue: 45, contact: '+233 24 111 2222', status: 'OVERDUE'   },
  { name: 'James Okafor',       id: 'SCH-2025-00008', grade: 'Grade 9-A',  balance: '$980',  daysOverdue: 38, contact: '+233 20 333 4444', status: 'OVERDUE'   },
  { name: 'Marcus Kwame Chen',  id: 'SCH-2025-00002', grade: 'Grade 10-B', balance: '$250',  daysOverdue: 18, contact: '+233 27 555 6666', status: 'PARTIAL'   },
  { name: 'Sophia Al-Mansoor',  id: 'SCH-2025-00003', grade: 'Grade 11-A', balance: '$600',  daysOverdue: 22, contact: '+233 54 777 8888', status: 'PARTIAL'   },
  { name: 'Selorm Doe',         id: 'SCH-2025-00006', grade: 'Grade 11-A', balance: '$450',  daysOverdue: 12, contact: '+233 26 999 0000', status: 'PARTIAL'   },
  { name: 'David Agyeman',      id: 'SCH-2025-00013', grade: 'Grade 10-B', balance: '$1,200',daysOverdue: 52, contact: '+233 23 112 3344', status: 'OVERDUE'   },
];

const statusBadge: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  PARTIAL: 'secondary', OVERDUE: 'destructive',
};

export default function OutstandingPage() {
  const totalOutstanding = outstanding.reduce((acc, s) => acc + parseFloat(s.balance.replace(/[$,]/g, '')), 0);

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Outstanding Payments</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Students with unpaid or partial fee balances — Term 1</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs font-medium"
            onClick={() =>
              toast.success('Overdue list exported', {
                description: 'Arrears register and guardian contact list downloaded.',
              })
            }
          >
            <Download className="h-3.5 w-3.5" />Export List
          </Button>
          <Button
            size="sm"
            className="gap-2 text-xs font-semibold"
            onClick={() =>
              toast.success('Batch reminders dispatched', {
                description: `Sent SMS & email debt collection notices to all ${outstanding.length} guardians.`,
              })
            }
          >
            <Send className="h-3.5 w-3.5" />Send Reminders
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Outstanding', value: `$${totalOutstanding.toLocaleString()}`, icon: AlertCircle },
          { label: 'Accounts Affected', value: outstanding.length,                       icon: Clock },
          { label: 'Overdue (>30 days)', value: outstanding.filter(s => s.daysOverdue > 30).length, icon: AlertCircle },
          { label: 'Partial Payments',   value: outstanding.filter(s => s.status === 'PARTIAL').length, icon: Clock },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="rounded-lg p-2 bg-muted">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            Outstanding Accounts
          </CardTitle>
          <CardDescription>Sorted by days overdue — contact parents to arrange payment</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="pl-4 font-semibold">Student</TableHead>
                <TableHead className="font-semibold">Grade</TableHead>
                <TableHead className="font-semibold text-right">Balance Due</TableHead>
                <TableHead className="font-semibold text-center">Days Overdue</TableHead>
                <TableHead className="font-semibold">Contact</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="pr-4 font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {outstanding.sort((a, b) => b.daysOverdue - a.daysOverdue).map((s, i) => (
                <TableRow key={i} className="hover:bg-muted/20">
                  <TableCell className="pl-4">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-[11px] font-semibold bg-muted">
                          {s.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-semibold text-foreground">{s.name}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">{s.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{s.grade}</TableCell>
                  <TableCell className="text-xs font-bold text-right text-foreground">{s.balance}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={s.daysOverdue > 30 ? 'destructive' : 'secondary'} className="text-[10px]">
                      {s.daysOverdue}d
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[11px] text-muted-foreground font-mono">{s.contact}</TableCell>
                  <TableCell>
                    <Badge variant={statusBadge[s.status]} className="text-[10px]">{s.status}</Badge>
                  </TableCell>
                  <TableCell className="pr-4 text-right">
                    <div className="flex gap-1 justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() =>
                          toast.info(`Calling guardian for ${s.name}`, {
                            description: `Dialing registered contact: ${s.contact}`,
                          })
                        }
                      >
                        <Phone className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() =>
                          toast.success(`Statement sent to ${s.name}`, {
                            description: `Overdue notice of ${s.balance} delivered via email and SMS.`,
                          })
                        }
                      >
                        <Mail className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">{outstanding.length} students with outstanding balances</p>
        </CardFooter>
      </Card>
    </div>
  );
}
