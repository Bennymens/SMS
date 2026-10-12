'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Calendar, Pin } from 'lucide-react';

export default function ParentAnnouncementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Bell className="h-6 w-6 text-foreground" />
            Parent Notices & Announcements
          </h1>
          <p className="text-muted-foreground text-sm">
            Official school news, parent-teacher association updates, and administrative bulletins.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Card className="hover:border-primary/40 transition-all">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <Badge variant="default" className="text-[10px] mb-1">PTA Notice</Badge>
                <CardTitle className="text-base font-semibold">Term 1 Parent-Teacher Conferences</CardTitle>
              </div>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Nov 05, 2026
              </span>
            </div>
            <CardDescription className="text-xs">Main Auditorium & Virtual Appointments</CardDescription>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground leading-relaxed pt-0">
            Booking slots for 1-on-1 progress meetings with homeroom teachers and subject advisors will open this Friday.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
