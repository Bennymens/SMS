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
import { UserCheck, Calendar, Clock, CheckCircle2, XCircle, AlertTriangle, FileUp } from 'lucide-react';

const attendanceRecords = [
  { date: 'Oct 12, 2026', day: 'Monday', status: 'Present', checkIn: '07:55 AM', periods: '6 / 6 attended', remarks: 'On time' },
  { date: 'Oct 09, 2026', day: 'Friday', status: 'Present', checkIn: '07:58 AM', periods: '6 / 6 attended', remarks: 'On time' },
  { date: 'Oct 08, 2026', day: 'Thursday', status: 'Late', checkIn: '08:12 AM', periods: '5 / 6 attended', remarks: 'Bus traffic delay' },
  { date: 'Oct 07, 2026', day: 'Wednesday', status: 'Present', checkIn: '07:50 AM', periods: '6 / 6 attended', remarks: 'On time' },
  { date: 'Oct 06, 2026', day: 'Tuesday', status: 'Present', checkIn: '07:52 AM', periods: '6 / 6 attended', remarks: 'On time' },
  { date: 'Oct 05, 2026', day: 'Monday', status: 'Excused', checkIn: '—', periods: '0 / 6 attended', remarks: 'Medical appointment (Verified)' },
  { date: 'Oct 02, 2026', day: 'Friday', status: 'Present', checkIn: '07:56 AM', periods: '6 / 6 attended', remarks: 'On time' },
];

const subjectAttendance = [
  { subject: 'English Language', total: 32, attended: 31, rate: 96.8 },
  { subject: 'Mathematics', total: 32, attended: 31, rate: 96.8 },
  { subject: 'Integrated Science', total: 28, attended: 27, rate: 96.4 },
  { subject: 'Social Studies', total: 24, attended: 24, rate: 100.0 },
  { subject: 'Our World & Our People (OWOP)', total: 24, attended: 23, rate: 95.8 },
  { subject: 'Computing / ICT', total: 20, attended: 20, rate: 100.0 },
  { subject: 'Religious & Moral Education (RME)', total: 20, attended: 19, rate: 95.0 },
  { subject: 'Ghanaian Language (Asante Twi)', total: 20, attended: 20, rate: 100.0 },
];

export default function StudentAttendancePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <UserCheck className="h-6 w-6 text-foreground" />
            Attendance History & Records
          </h1>
          <p className="text-muted-foreground text-sm">
            Monitor daily roll-call logs, subject attendance thresholds, and submitted absence justifications.
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
          <FileUp className="h-3.5 w-3.5" />
          Submit Excuse Letter
        </Button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Overall Rate</p>
              <p className="text-2xl font-bold mt-1 text-foreground">96.2%</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Threshold: 85%</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Days Present</p>
              <p className="text-2xl font-bold mt-1 text-foreground">88</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Out of 91 days</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <UserCheck className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Tardy / Late</p>
              <p className="text-2xl font-bold mt-1 text-foreground">2</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Logged with excuse</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <Clock className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Absences</p>
              <p className="text-2xl font-bold mt-1 text-foreground">1</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Excused Medical</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Log */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Recent Daily Log</CardTitle>
            <CardDescription>Verified by homeroom teacher & gate scanner</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table className="min-w-[500px]">
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="font-semibold text-foreground">Date</TableHead>
                  <TableHead className="font-semibold text-foreground">Status</TableHead>
                  <TableHead className="font-semibold text-foreground">Check-In</TableHead>
                  <TableHead className="font-semibold text-foreground">Periods</TableHead>
                  <TableHead className="font-semibold text-foreground">Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceRecords.map((r, i) => (
                  <TableRow key={i} className="hover:bg-muted/20">
                    <TableCell className="p-3">
                      <span className="font-semibold block text-foreground">{r.date}</span>
                      <span className="text-[10px] text-muted-foreground">{r.day}</span>
                    </TableCell>
                    <TableCell className="p-3">
                      <Badge
                        variant={
                          r.status === 'Present'
                            ? 'success'
                            : r.status === 'Late'
                            ? 'warning'
                            : 'secondary'
                        }
                        className="text-[10px]"
                      >
                        {r.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="p-3 text-muted-foreground font-mono">{r.checkIn}</TableCell>
                    <TableCell className="p-3 text-muted-foreground">{r.periods}</TableCell>
                    <TableCell className="p-3 text-muted-foreground">{r.remarks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Subject Breakdown */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Subject Attendance</CardTitle>
            <CardDescription>Minimum 85% required for examination</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {subjectAttendance.map((item) => (
              <div key={item.subject} className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{item.subject}</span>
                  <span className="font-bold text-foreground">{item.rate.toFixed(1)}%</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${item.rate}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>{item.attended} / {item.total} sessions</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Eligible</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
