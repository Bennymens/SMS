'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ClipboardList, Plus, Calendar, CheckCircle2 } from 'lucide-react';

const exams = [
  { title: 'Term 1 Mid-Term Assessments', date: 'Oct 20 – Oct 28, 2026', status: 'Scheduled', grades: 'Grade 9 – 12', center: 'Main Examination Hall' },
  { title: 'AP Chemistry & Physics Mock Trials', date: 'Nov 12, 2026', status: 'Upcoming', grades: 'Grade 11 & 12', center: 'Science Wing Labs' },
  { title: 'Term 1 Final Comprehensive Exams', date: 'Dec 14 – Dec 22, 2026', status: 'Drafting', grades: 'All Cohorts', center: 'Campus-wide' },
];

export default function AdminExamsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-foreground" />
            Examination Management
          </h1>
          <p className="text-muted-foreground text-sm">
            Exam schedules, hall allocations, proctor assignments, and grading deadlines.
          </p>
        </div>
        <Button size="sm" className="gap-1.5 text-xs">
          <Plus className="h-3.5 w-3.5" />
          Schedule Examination
        </Button>
      </div>

      <div className="space-y-4">
        {exams.map((exam) => (
          <Card key={exam.title} className="hover:border-primary/40 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-base font-semibold">{exam.title}</CardTitle>
                  <CardDescription className="text-xs mt-0.5">{exam.grades} • {exam.center}</CardDescription>
                </div>
                <Badge variant={exam.status === 'Scheduled' ? 'default' : 'secondary'} className="text-xs">
                  {exam.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between text-xs pt-0">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {exam.date}
              </span>
              <Button variant="outline" size="sm" className="text-xs">
                Manage Hall Slips
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
