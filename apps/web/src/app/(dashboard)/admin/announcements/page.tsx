'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Plus, Pin, Calendar } from 'lucide-react';

const notices = [
  { id: 1, title: 'Term 1 Mid-Term Examination Schedule Released', target: 'All Students & Parents', date: 'Oct 14, 2026', pinned: true },
  { id: 2, title: 'Staff Professional Development Day (No Classes)', target: 'Faculty & Staff', date: 'Oct 11, 2026', pinned: true },
  { id: 3, title: 'Annual Campus Fire Drill & Evacuation Exercise', target: 'Campus Wide', date: 'Oct 05, 2026', pinned: false },
];

export default function AdminAnnouncementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Bell className="h-6 w-6 text-foreground" />
            Announcement Broadcaster
          </h1>
          <p className="text-muted-foreground text-sm">
            Publish school-wide bulletins, department notices, and emergency alerts.
          </p>
        </div>
        <Button size="sm" className="gap-1.5 text-xs">
          <Plus className="h-3.5 w-3.5" />
          Broadcast Notice
        </Button>
      </div>

      <div className="space-y-4">
        {notices.map((n) => (
          <Card key={n.id} className="hover:border-primary/40 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {n.pinned && (
                      <Badge variant="default" className="text-[10px] gap-1">
                        <Pin className="h-3 w-3" />
                        Pinned
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-[10px]">
                      {n.target}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-semibold mt-1">{n.title}</CardTitle>
                </div>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {n.date}
                </span>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
