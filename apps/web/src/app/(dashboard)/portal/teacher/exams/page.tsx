'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, Clock, Plus } from 'lucide-react';

export default function TeacherExamsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <FileText className="h-6 w-6 text-foreground" />
            Examinations & Proctoring
          </h1>
          <p className="text-muted-foreground text-sm">
            Supervision rosters, question paper submissions, and grading quotas.
          </p>
        </div>
        <Button size="sm" className="gap-1.5 text-xs">
          <Plus className="h-3.5 w-3.5" />
          Submit Question Paper
        </Button>
      </div>

      <div className="space-y-4">
        <Card className="hover:border-primary/40 transition-all">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <CardTitle className="text-base font-semibold">Mid-Term 1: Advanced Mathematics</CardTitle>
                <CardDescription className="text-xs">Main Exam Hall • Proctor: Dr. Thorne</CardDescription>
              </div>
              <Badge variant="default" className="text-xs">Scheduled</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex items-center justify-between text-xs pt-0">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Oct 22, 2026 • 08:30 AM – 10:30 AM
            </span>
            <Button variant="outline" size="sm" className="text-xs">
              View Seating Chart
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
