'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { School, Plus, Users, BookOpen } from 'lucide-react';

const classSections = [
  { grade: 'Grade 9', sections: [{ section: '9-A', room: 'Room 101', capacity: 30, enrolled: 28, advisor: 'Ms. Jenkins' }, { section: '9-B', room: 'Room 102', capacity: 30, enrolled: 29, advisor: 'Mr. Vance' }] },
  { grade: 'Grade 10', sections: [{ section: '10-A', room: 'Room 204', capacity: 32, enrolled: 30, advisor: 'Dr. Thorne' }, { section: '10-B', room: 'Room 205', capacity: 32, enrolled: 31, advisor: 'Mrs. Rostova' }] },
  { grade: 'Grade 11', sections: [{ section: '11-A', room: 'Room 301', capacity: 30, enrolled: 27, advisor: 'Dr. Connor' }, { section: '11-B', room: 'Room 302', capacity: 30, enrolled: 28, advisor: 'Mr. Brooks' }] },
  { grade: 'Grade 12', sections: [{ section: '12-A', room: 'Room 401', capacity: 28, enrolled: 26, advisor: 'Ms. Lovelace' }, { section: '12-B', room: 'Room 402', capacity: 28, enrolled: 25, advisor: 'Mr. Grant' }] },
];

export default function AdminClassesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <School className="h-6 w-6 text-foreground" />
            Classes & Sections Management
          </h1>
          <p className="text-muted-foreground text-sm">
            Configure year grades, division sections, room quotas, and assigned homeroom tutors.
          </p>
        </div>
        <Button size="sm" className="gap-1.5 text-xs">
          <Plus className="h-3.5 w-3.5" />
          Create New Section
        </Button>
      </div>

      <div className="space-y-6">
        {classSections.map((group) => (
          <div key={group.grade} className="space-y-3">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">{group.grade} Cohort</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.sections.map((sec) => (
                <Card key={sec.section} className="hover:border-primary/40 transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-bold">Section {sec.section}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {sec.enrolled} / {sec.capacity} Enrolled
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">Homeroom: {sec.advisor} • {sec.room}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(sec.enrolled / sec.capacity) * 100}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
