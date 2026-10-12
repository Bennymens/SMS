'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserCheck, CheckCircle2, Clock, AlertTriangle, FileUp } from 'lucide-react';

export default function ParentAttendancePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <UserCheck className="h-6 w-6 text-foreground" />
            Child Attendance Tracker
          </h1>
          <p className="text-muted-foreground text-sm">
            Emily Watson (Grade 10A) • Roll-call logs and gate arrival times.
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
          <FileUp className="h-3.5 w-3.5" />
          Submit Absence Justification
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Attendance Rate</p>
              <p className="text-2xl font-bold mt-1 text-foreground">96.2%</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">88 of 91 days attended</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Tardy Days</p>
              <p className="text-2xl font-bold mt-1 text-foreground">2 Days</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Late arrival recorded</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <Clock className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Excused Leaves</p>
              <p className="text-2xl font-bold mt-1 text-foreground">1 Day</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Medical excuse verified</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
