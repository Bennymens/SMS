'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { ClipboardList, Plus, Calendar, CheckCircle2, Ticket, Download } from 'lucide-react';
import { toast } from '@/components/ui/toast';

interface ExamRecord {
  title: string;
  date: string;
  status: 'Scheduled' | 'Upcoming' | 'Drafting';
  grades: string;
  center: string;
}

export default function AdminExamsPage() {
  const [exams, setExams] = useState<ExamRecord[]>([
    { title: 'Term 1 Mid-Term Assessments', date: 'Oct 20 – Oct 28, 2026', status: 'Scheduled', grades: 'Grade 9 – 12', center: 'Main Examination Hall' },
    { title: 'AP Chemistry & Physics Mock Trials', date: 'Nov 12, 2026', status: 'Upcoming', grades: 'Grade 11 & 12', center: 'Science Wing Labs' },
    { title: 'Term 1 Final Comprehensive Exams', date: 'Dec 14 – Dec 22, 2026', status: 'Drafting', grades: 'All Cohorts', center: 'Campus-wide' },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [grades, setGrades] = useState('Grade 9 – 12');
  const [center, setCenter] = useState('Main Examination Hall');
  const [dates, setDates] = useState('Nov 15 – Nov 20, 2026');

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Title required', { description: 'Please name the examination cycle.' });
      return;
    }

    const created: ExamRecord = {
      title,
      date: dates,
      status: 'Scheduled',
      grades,
      center,
    };

    setExams([created, ...exams]);
    setOpenModal(false);
    setTitle('');

    toast.success('Examination cycle created', {
      description: `"${title}" has been registered into the academic master timetable.`,
    });
  };

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
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() =>
              toast.success('Timetable exported', {
                description: 'Full institutional examination schedule downloaded.',
              })
            }
          >
            <Download className="h-3.5 w-3.5" />
            Export Schedule
          </Button>
          <Button size="sm" onClick={() => setOpenModal(true)} className="gap-1.5 text-xs font-semibold">
            <Plus className="h-3.5 w-3.5" />
            Schedule Examination
          </Button>
        </div>
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
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs gap-1"
                  onClick={() =>
                    toast.info(`Managing Hall Slips: ${exam.title}`, {
                      description: 'Generating candidate photo verification slips & desk labels.',
                    })
                  }
                >
                  <Ticket className="h-3 w-3" />
                  Manage Hall Slips
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Schedule Exam Sheet */}
      <Sheet open={openModal} onOpenChange={setOpenModal}>
        <SheetContent side="right" className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              Schedule Institutional Examination
            </SheetTitle>
            <SheetDescription className="text-xs">
              Establish exam dates, venues, and student grade cohort eligibility.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleCreateExam} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Exam Cycle Title</label>
              <Input
                placeholder="e.g. End of Semester Final Examination"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xs"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Date Window</label>
              <Input
                placeholder="e.g. Nov 15 – Nov 25, 2026"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="text-xs"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Cohorts</label>
                <Input
                  value={grades}
                  onChange={(e) => setGrades(e.target.value)}
                  className="text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Examination Venue</label>
                <Input
                  value={center}
                  onChange={(e) => setCenter(e.target.value)}
                  className="text-xs"
                />
              </div>
            </div>

            <SheetFooter className="pt-4">
              <Button type="button" variant="outline" size="sm" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="gap-1.5 font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                Confirm & Publish
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
