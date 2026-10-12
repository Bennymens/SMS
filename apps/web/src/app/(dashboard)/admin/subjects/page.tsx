'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, FileText, CheckCircle2 } from 'lucide-react';

const subjects = [
  { code: 'MTH-201', name: 'Advanced Mathematics', department: 'Mathematics & Computing', credits: 4, lead: 'Dr. Thorne', status: 'Core' },
  { code: 'PHY-201', name: 'Physics & Mechanics', department: 'Natural Sciences', credits: 4, lead: 'Mrs. Rostova', status: 'Core' },
  { code: 'ENG-201', name: 'World Literature', department: 'Humanities & Languages', credits: 3, lead: 'Mr. Brooks', status: 'Core' },
  { code: 'CHM-201', name: 'Chemistry & Biochemistry', department: 'Natural Sciences', credits: 4, lead: 'Dr. Connor', status: 'Core' },
  { code: 'HIS-201', name: 'World History', department: 'Social Sciences', credits: 3, lead: 'Mr. Grant', status: 'Elective' },
  { code: 'CSC-201', name: 'Computer Science', department: 'Mathematics & Computing', credits: 4, lead: 'Ms. Lovelace', status: 'Elective' },
];

export default function AdminSubjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-foreground" />
            Curriculum & Subjects
          </h1>
          <p className="text-muted-foreground text-sm">
            Academic departments, course syllabi, credit allocations, and faculty leads.
          </p>
        </div>
        <Button size="sm" className="gap-1.5 text-xs">
          <Plus className="h-3.5 w-3.5" />
          Add Subject
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((sub) => (
          <Card key={sub.code} className="hover:border-primary/40 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-[10px] text-muted-foreground">{sub.code}</span>
                  <CardTitle className="text-base font-semibold mt-0.5">{sub.name}</CardTitle>
                </div>
                <Badge variant={sub.status === 'Core' ? 'default' : 'secondary'} className="text-[10px]">
                  {sub.status}
                </Badge>
              </div>
              <CardDescription className="text-xs">{sub.department}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground pt-0">
              <p>Lead Instructor: <strong className="text-foreground">{sub.lead}</strong></p>
              <p>Credit Units: <strong className="text-foreground">{sub.credits} Credits</strong></p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
