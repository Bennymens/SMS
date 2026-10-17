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
import { FileText, Calendar, Clock, Plus, Upload, CheckCircle2, ShieldCheck, Download } from 'lucide-react';
import { toast } from '@/components/ui/toast';

interface ExamItem {
  id: string;
  title: string;
  subject: string;
  cohort: string;
  venue: string;
  proctor: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Submitted' | 'Under Review' | 'Completed';
}

export default function TeacherExamsPage() {
  const [exams, setExams] = useState<ExamItem[]>([
    {
      id: 'ex-1',
      title: 'Mid-Term 1: Advanced Mathematics',
      subject: 'Core Mathematics',
      cohort: 'SHS 1 - Science A',
      venue: 'Main Exam Hall',
      proctor: 'Dr. Thorne',
      date: 'Oct 22, 2026',
      time: '08:30 AM – 10:30 AM',
      status: 'Scheduled',
    },
    {
      id: 'ex-2',
      title: 'Term 1 Mock: Elective Mathematics',
      subject: 'Elective Mathematics',
      cohort: 'SHS 2 - Science A',
      venue: 'Science Lab 2',
      proctor: 'Mrs. Elena Rostova',
      date: 'Oct 29, 2026',
      time: '11:00 AM – 01:30 PM',
      status: 'Under Review',
    },
  ]);

  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const [examTitle, setExamTitle] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Core Mathematics');
  const [selectedClass, setSelectedClass] = useState('SHS 1 - Science A');
  const [examDate, setExamDate] = useState('2026-11-04');
  const [fileName, setFileName] = useState('');

  const handleSubmitPaper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examTitle.trim()) {
      toast.error('Title is required', { description: 'Please provide a descriptive title for the question paper.' });
      return;
    }

    const newExam: ExamItem = {
      id: `ex-${Date.now()}`,
      title: examTitle,
      subject: selectedSubject,
      cohort: selectedClass,
      venue: 'Main Examination Hall',
      proctor: 'Assigned by Exam Board',
      date: examDate,
      time: '09:00 AM – 11:30 AM',
      status: 'Submitted',
    };

    setExams([newExam, ...exams]);
    setOpenSubmitModal(false);
    setExamTitle('');
    setFileName('');

    toast.success('Question paper submitted successfully!', {
      description: `"${examTitle}" has been queued for Academic Board vetting and secure printing.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <FileText className="h-6 w-6 text-foreground" />
            Examinations & Proctoring
          </h1>
          <p className="text-muted-foreground text-sm">
            Supervision rosters, question paper submissions, and grading quotas.
          </p>
        </div>
        <Button size="sm" onClick={() => setOpenSubmitModal(true)} className="gap-1.5 text-xs font-semibold">
          <Plus className="h-3.5 w-3.5" />
          Submit Question Paper
        </Button>
      </div>

      <div className="space-y-4">
        {exams.map((ex) => (
          <Card key={ex.id} className="hover:border-primary/40 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-base font-semibold">{ex.title}</CardTitle>
                  <CardDescription className="text-xs">
                    {ex.venue} • Proctor: {ex.proctor} • Cohort: {ex.cohort}
                  </CardDescription>
                </div>
                <Badge
                  variant={ex.status === 'Submitted' ? 'secondary' : ex.status === 'Scheduled' ? 'default' : 'outline'}
                  className="text-xs"
                >
                  {ex.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-0">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {ex.date} • {ex.time}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() =>
                    toast.info(`Seating chart: ${ex.cohort}`, {
                      description: `Displaying hall layout with 34 randomized seats in ${ex.venue}.`,
                    })
                  }
                >
                  View Seating Chart
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs gap-1"
                  onClick={() =>
                    toast.success('Exam rubric downloaded', {
                      description: `Marking scheme and specifications for ${ex.title} downloaded.`,
                    })
                  }
                >
                  <Download className="h-3 w-3" />
                  Rubric
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Submit Question Paper Sheet */}
      <Sheet open={openSubmitModal} onOpenChange={setOpenSubmitModal}>
        <SheetContent side="right" className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Submit Examination Question Paper
            </SheetTitle>
            <SheetDescription className="text-xs">
              Upload digitized question papers, answer keys, and marking guidelines for dean moderation.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmitPaper} className="space-y-4 pt-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Exam Paper Title</label>
              <Input
                placeholder="e.g. Term 1 Final Examination - Pure Math"
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                className="text-xs"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Subject</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="Core Mathematics">Core Mathematics</option>
                  <option value="Elective Mathematics">Elective Mathematics</option>
                  <option value="Integrated Science">Integrated Science</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Target Cohort</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="SHS 1 - Science A">SHS 1 - Science A</option>
                  <option value="SHS 1 - General Arts">SHS 1 - General Arts</option>
                  <option value="SHS 2 - Science A">SHS 2 - Science A</option>
                  <option value="Basic 9 - Gold">Basic 9 - Gold</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Scheduled Examination Date</label>
              <Input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Encrypted Document Upload (.pdf / .docx)</label>
              <div
                onClick={() => {
                  setFileName('Term1_Math_Exam_Paper_Final.pdf');
                  toast.info('File attached', { description: 'Term1_Math_Exam_Paper_Final.pdf (2.4 MB)' });
                }}
                className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/40 transition-colors"
              >
                <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                <p className="text-xs text-foreground font-medium">
                  {fileName ? fileName : 'Click to select or drop question paper document'}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Automated SHA-256 fingerprinting applied upon receipt
                </p>
              </div>
            </div>

            <SheetFooter className="pt-4">
              <Button type="button" variant="outline" size="sm" onClick={() => setOpenSubmitModal(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="gap-1.5 font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                Submit to Exam Board
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
