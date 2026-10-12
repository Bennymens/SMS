'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Calendar, Pin, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

const announcements = [
  {
    id: 1,
    title: 'Mid-Term Examination Schedule Released',
    category: 'Academic',
    date: 'Oct 14, 2026',
    author: 'Principal Office',
    pinned: true,
    content: 'The official schedule for Mid-Term 1 examinations has been finalized. Morning sessions begin promptly at 08:30 AM. Students are required to report 15 minutes before exam commencement with student ID cards.',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Annual Science Fair & STEM Exhibition Registrations',
    category: 'Events',
    date: 'Oct 12, 2026',
    author: 'Science Department',
    pinned: true,
    content: 'Submissions are now open for project proposals for the Annual Science Fair. Teams of up to 3 students may register their prototypes with Mr. Thorne by Friday next week.',
    priority: 'normal',
  },
  {
    id: 3,
    title: 'Library Hours Extended for Examination Period',
    category: 'Facility',
    date: 'Oct 10, 2026',
    author: 'Library Administration',
    pinned: false,
    content: 'Starting next Monday, the main campus library and digital research commons will remain open until 07:00 PM on weekdays to support students preparing for upcoming assessments.',
    priority: 'normal',
  },
  {
    id: 4,
    title: 'Sports Day Rehearsal Schedule for High School',
    category: 'Athletics',
    date: 'Oct 08, 2026',
    author: 'Coach Taylor',
    pinned: false,
    content: 'Track and field participants in Grade 10 are expected on the eastern sports oval during period 5 for march-past formation practices.',
    priority: 'normal',
  },
];

export default function StudentAnnouncementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Bell className="h-6 w-6 text-foreground" />
            School Announcements
          </h1>
          <p className="text-muted-foreground text-sm">
            Stay informed with the latest official notices, academic updates, and campus events.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {announcements.length} Active Notices
          </Badge>
          <Button variant="outline" size="sm" className="text-xs">
            Mark All Read
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {announcements.map((item) => (
          <Card key={item.id} className={item.pinned ? 'border-primary/40 bg-card/80' : 'bg-card'}>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {item.pinned && (
                      <Badge variant="default" className="text-[10px] gap-1">
                        <Pin className="h-3 w-3" />
                        Pinned Notice
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-[10px]">
                      {item.category}
                    </Badge>
                    {item.priority === 'high' && (
                      <Badge variant="destructive" className="text-[10px]">
                        High Priority
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-base font-semibold mt-1">{item.title}</CardTitle>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{item.date}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <p className="text-sm text-muted-foreground leading-relaxed">{item.content}</p>
              <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                <span>Posted by: <strong className="text-foreground">{item.author}</strong></span>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
