'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Plus, Pin, Calendar } from 'lucide-react';

export default function TeacherAnnouncementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Bell className="h-6 w-6 text-foreground" />
            Faculty Announcements & Bulletins
          </h1>
          <p className="text-muted-foreground text-sm">
            Administrative circulars, departmental meetings, and classroom announcements.
          </p>
        </div>
        <Button size="sm" className="gap-1.5 text-xs">
          <Plus className="h-3.5 w-3.5" />
          Post Class Announcement
        </Button>
      </div>

      <div className="space-y-4">
        <Card className="hover:border-primary/40 transition-all">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <Badge variant="default" className="text-[10px] mb-1">Staff Circular</Badge>
                <CardTitle className="text-base font-semibold">Department Head Meeting This Thursday</CardTitle>
              </div>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Oct 15, 2026
              </span>
            </div>
            <CardDescription className="text-xs">Conference Room B • 03:45 PM</CardDescription>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground leading-relaxed pt-0">
            Agenda includes finalization of Term 1 mid-term question papers and grading rubric standardization.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
