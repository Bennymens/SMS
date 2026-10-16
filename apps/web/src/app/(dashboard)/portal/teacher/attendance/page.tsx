'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { UserCheck, CheckCircle2, Clock, Calendar, Download, Users, Check, X, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/toast';

interface ClassSession {
  id: string;
  name: string;
  period: string;
  time: string;
  room: string;
  presentCount: number;
  absentCount: number;
  status: 'Completed' | 'Pending';
}

export default function TeacherAttendancePage() {
  const [classes, setClasses] = useState<ClassSession[]>([
    {
      id: 'cls-1',
      name: 'Grade 10A • Advanced Math',
      period: 'Period 1',
      time: '08:00 AM – 09:00 AM',
      room: 'Room 204',
      presentCount: 28,
      absentCount: 2,
      status: 'Completed',
    },
    {
      id: 'cls-2',
      name: 'Grade 11B • AP Calculus',
      period: 'Period 3',
      time: '10:00 AM – 11:00 AM',
      room: 'Science Lab 2',
      presentCount: 0,
      absentCount: 0,
      status: 'Pending',
    },
    {
      id: 'cls-3',
      name: 'Basic 9 • Mathematics Prep',
      period: 'Period 5',
      time: '01:15 PM – 02:15 PM',
      room: 'Block A, Room 4',
      presentCount: 0,
      absentCount: 0,
      status: 'Pending',
    },
  ]);

  const [activeSession, setActiveSession] = useState<ClassSession | null>(null);

  const handleMarkClassAttendance = (cls: ClassSession) => {
    setClasses((prev) =>
      prev.map((c) =>
        c.id === cls.id
          ? { ...c, status: 'Completed', presentCount: 30, absentCount: 2 }
          : c
      )
    );
    setActiveSession(null);
    toast.success(`Attendance submitted: ${cls.name}`, {
      description: `30 students marked Present, 2 Absent. Synced to Admin attendance record.`,
    });
  };

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
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() =>
              toast.success('Attendance summary exported', {
                description: 'Today’s campus attendance CSV report generated and downloaded.',
              })
            }
          >
            <Download className="h-3.5 w-3.5" />
            Export Daily Register
          </Button>
          <Button
            size="sm"
            className="gap-1.5 text-xs font-semibold"
            onClick={() => {
              const pending = classes.find((c) => c.status === 'Pending') || classes[0];
              setActiveSession(pending);
            }}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Mark Attendance Now
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {classes.map((cls) => (
          <Card key={cls.id} className="hover:border-primary/40 transition-all flex flex-col justify-between">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-sm font-semibold">{cls.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {cls.period} ({cls.time}) • {cls.room}
                  </CardDescription>
                </div>
                <Badge variant={cls.status === 'Completed' ? 'default' : 'secondary'} className="text-[10px]">
                  {cls.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0 text-xs">
              <div className="flex justify-between items-center py-1 border-t border-border/40">
                <span className="text-muted-foreground">Roll-Call Record:</span>
                <span className="font-semibold text-foreground">
                  {cls.status === 'Completed' ? `${cls.presentCount} Present • ${cls.absentCount} Absent` : 'Not yet taken'}
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Button
                  size="sm"
                  variant={cls.status === 'Completed' ? 'outline' : 'default'}
                  className="w-full text-xs font-medium"
                  onClick={() => setActiveSession(cls)}
                >
                  {cls.status === 'Completed' ? 'Review & Edit Roll' : 'Launch Roll-Call'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Roll Call Modal */}
      {activeSession && (
        <Dialog open={!!activeSession} onOpenChange={(open) => !open && setActiveSession(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                Roll-Call: {activeSession.name}
              </DialogTitle>
              <DialogDescription className="text-xs">
                {activeSession.period} • {activeSession.time} • Room: {activeSession.room}
              </DialogDescription>
            </DialogHeader>

            <div className="p-4 rounded-xl border bg-muted/20 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Registered Students:</span>
                <span className="font-bold text-foreground">32 Enrolled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Biometric Clock-ins:</span>
                <span className="font-semibold text-foreground">28 Verified at Turnstile</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Excused Absences:</span>
                <span className="font-semibold text-foreground">1 Medical note registered</span>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" size="sm" onClick={() => setActiveSession(null)}>
                Cancel
              </Button>
              <Button size="sm" onClick={() => handleMarkClassAttendance(activeSession)} className="font-semibold gap-1.5">
                <Check className="h-4 w-4" />
                Submit Attendance Register
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
