'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Bell, Plus, Pin, Calendar, Send, CheckCircle2 } from 'lucide-react';
import { toast } from '@/components/ui/toast';

interface Announcement {
  id: string;
  badge: string;
  title: string;
  description: string;
  content: string;
  date: string;
}

export default function TeacherAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 'anc-1',
      badge: 'Staff Circular',
      title: 'Department Head Meeting This Thursday',
      description: 'Conference Room B • 03:45 PM',
      content: 'Agenda includes finalization of Term 1 mid-term question papers and grading rubric standardization.',
      date: 'Oct 15, 2026',
    },
    {
      id: 'anc-2',
      badge: 'Class Notice',
      title: 'Mathematics Clinic & Revision Sessions',
      description: 'Science Block Lab 2 • 04:00 PM',
      content: 'Extra tutorials for students preparing for the upcoming BECE and WASSCE mock examinations.',
      date: 'Oct 12, 2026',
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [targetClass, setTargetClass] = useState('SHS 1 - Science A');
  const [content, setContent] = useState('');

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Incomplete form', { description: 'Please fill in both title and announcement message.' });
      return;
    }

    const newPost: Announcement = {
      id: `anc-${Date.now()}`,
      badge: targetClass,
      title,
      description: `Target: ${targetClass} • Posted by Dr. Thorne`,
      content,
      date: 'Just now',
    };

    setAnnouncements([newPost, ...announcements]);
    setOpenModal(false);
    setTitle('');
    setContent('');

    toast.success('Announcement broadcasted!', {
      description: `"${title}" has been published to student & guardian mobile feeds.`,
    });
  };

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
        <Button size="sm" onClick={() => setOpenModal(true)} className="gap-1.5 text-xs font-semibold">
          <Plus className="h-3.5 w-3.5" />
          Post Class Announcement
        </Button>
      </div>

      <div className="space-y-4">
        {announcements.map((anc) => (
          <Card key={anc.id} className="hover:border-primary/40 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Badge variant="default" className="text-[10px] mb-1">
                    {anc.badge}
                  </Badge>
                  <CardTitle className="text-base font-semibold">{anc.title}</CardTitle>
                </div>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {anc.date}
                </span>
              </div>
              <CardDescription className="text-xs">{anc.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground leading-relaxed pt-0">
              {anc.content}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Post Modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Publish Classroom Announcement
            </DialogTitle>
            <DialogDescription className="text-xs">
              Broadcast homework updates, syllabus changes, or reminders directly to class feeds.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePostAnnouncement} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Announcement Title</label>
              <Input
                placeholder="e.g. Bring compass and protractor on Friday"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xs"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Target Recipient Cohort</label>
              <select
                value={targetClass}
                onChange={(e) => setTargetClass(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="All Teaching Classes">All Teaching Classes (136 Students)</option>
                <option value="SHS 1 - Science A">SHS 1 - Science A</option>
                <option value="SHS 1 - General Arts">SHS 1 - General Arts</option>
                <option value="SHS 2 - Science A">SHS 2 - Science A</option>
                <option value="Basic 9 - Gold">Basic 9 - Gold</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Message Body</label>
              <textarea
                rows={3}
                placeholder="Write full announcement details here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full rounded-md border border-input bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                required
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" size="sm" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="gap-1.5 font-semibold">
                <Send className="h-3.5 w-3.5" />
                Broadcast Notice
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
