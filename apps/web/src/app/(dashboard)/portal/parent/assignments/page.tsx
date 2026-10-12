'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookMarked, Clock, CheckCircle2 } from 'lucide-react';

export default function ParentAssignmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BookMarked className="h-6 w-6 text-foreground" />
            Child Homework & Assignments
          </h1>
          <p className="text-muted-foreground text-sm">
            Review active tasks, submission timestamps, and teacher grading remarks.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Card className="hover:border-primary/40 transition-all">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <Badge variant="outline" className="text-[10px] mb-1">Physics & Mechanics</Badge>
                <CardTitle className="text-base font-semibold">Mechanics Lab Report: Projectile Motion</CardTitle>
                <CardDescription className="text-xs">Due: Tomorrow • 11:59 PM</CardDescription>
              </div>
              <Badge variant="destructive" className="text-xs">Due Soon</Badge>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground pt-0">
            Assigned by Mrs. Elena Rostova • In progress
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
