'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Plus, Calendar, Download } from 'lucide-react';

export default function AdminTimetablePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Clock className="h-6 w-6 text-foreground" />
            Master Timetable & Scheduling
          </h1>
          <p className="text-muted-foreground text-sm">
            Institutional bell schedules, room clashes, teacher assignments, and period configurations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Download className="h-3.5 w-3.5" />
            Export Schedule
          </Button>
          <Button size="sm" className="gap-1.5 text-xs">
            <Plus className="h-3.5 w-3.5" />
            Generate Timetable
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Active Bell Schedule (Regular Day)</CardTitle>
          <CardDescription>7 Daily academic instructional periods • 50 minutes each</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3.5 rounded-lg border flex items-center justify-between text-xs bg-card">
            <div>
              <p className="font-semibold text-foreground">Period 1 & Morning Assembly</p>
              <p className="text-muted-foreground">08:00 AM – 08:50 AM</p>
            </div>
            <Badge variant="secondary">All Grades</Badge>
          </div>
          <div className="p-3.5 rounded-lg border flex items-center justify-between text-xs bg-card">
            <div>
              <p className="font-semibold text-foreground">Period 2 (STEM Focus)</p>
              <p className="text-muted-foreground">09:00 AM – 09:50 AM</p>
            </div>
            <Badge variant="secondary">Labs & Classrooms</Badge>
          </div>
          <div className="p-3.5 rounded-lg border flex items-center justify-between text-xs bg-card">
            <div>
              <p className="font-semibold text-foreground">Period 3 (Language & Humanities)</p>
              <p className="text-muted-foreground">10:05 AM – 10:55 AM</p>
            </div>
            <Badge variant="secondary">Main Wing</Badge>
          </div>
          <div className="p-3.5 rounded-lg border flex items-center justify-between text-xs bg-card">
            <div>
              <p className="font-semibold text-foreground">Mid-Day Lunch & Campus Break</p>
              <p className="text-muted-foreground">11:55 AM – 12:55 PM</p>
            </div>
            <Badge variant="outline">Cafeteria & Grounds</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
