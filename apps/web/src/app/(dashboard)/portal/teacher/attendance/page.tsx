'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserCheck, CheckCircle2, Clock, Calendar } from 'lucide-react';

export default function TeacherAttendancePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <UserCheck className="h-6 w-6 text-foreground" />
            Class Attendance Marking
          </h1>
          <p className="text-muted-foreground text-sm">
            Take roll-call, verify biometric logs, and mark excused medical leaves.
          </p>
        </div>
        <Button size="sm" className="gap-1.5 text-xs">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Mark Attendance Now
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Grade 10A • Advanced Math</CardTitle>
            <CardDescription className="text-xs">Period 1 (08:00 AM)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 pt-0 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Attendance Status:</span>
              <Badge variant="success">Completed</Badge>
            </div>
            <p className="text-muted-foreground">28 Present • 2 Absent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Grade 11B • AP Calculus</CardTitle>
            <CardDescription className="text-xs">Period 3 (10:00 AM)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 pt-0 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Attendance Status:</span>
              <Badge variant="warning">Pending</Badge>
            </div>
            <p className="text-muted-foreground">Starts in 45 mins</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
