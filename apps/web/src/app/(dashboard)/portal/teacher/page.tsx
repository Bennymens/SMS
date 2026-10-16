'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationPrevious, PaginationNext, PaginationEllipsis,
} from '@/components/ui/pagination';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';
import {
  Users, BookOpen, Calendar, Clock, FileCheck,
  Send, MapPin, UserCheck, Save, Download, Check, TrendingUp,
  ClipboardCheck, Pencil,
} from 'lucide-react';
import { toast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

// ── Data ──────────────────────────────────────────────────────────────────────
const teachingClasses = [
  { id: 'cls-10a', name: 'SHS 1 - Science A',      subject: 'Core Mathematics',        studentsCount: 34, room: 'Block B, Room 10',  nextClass: 'Today, 08:00 AM',   attendanceTaken: true,  classAverage: 82.4 },
  { id: 'cls-10b', name: 'SHS 1 - General Arts',   subject: 'Core Mathematics',        studentsCount: 36, room: 'Block B, Room 12',  nextClass: 'Today, 01:15 PM',   attendanceTaken: false, classAverage: 78.6 },
  { id: 'cls-11a', name: 'SHS 2 - Science A',      subject: 'Elective Mathematics',    studentsCount: 32, room: 'Science Lab 2',     nextClass: 'Tomorrow, 09:00 AM', attendanceTaken: true,  classAverage: 85.1 },
  { id: 'cls-9a',  name: 'Basic 9 / JHS 3 - Gold', subject: 'Mathematics (BECE Prep)', studentsCount: 34, room: 'Block A, Room 4',   nextClass: 'Tomorrow, 11:05 AM', attendanceTaken: true,  classAverage: 80.2 },
];

type StudentGradeRecord = {
  id: string; name: string;
  classScore: number; midtermScore: number; finalExamScore: number;
  comment: string; attendance: string;
};

const initialStudentsByClass: Record<string, StudentGradeRecord[]> = {
  'cls-10a': [
    { id: 'SCH-2025-001', name: 'Emily Watson',            classScore: 28, midtermScore: 28, finalExamScore: 38, comment: 'Demonstrates exceptional analytical rigor in algebraic proofs.', attendance: 'PRESENT' },
    { id: 'SCH-2025-002', name: 'Marcus Kwame Chen',       classScore: 25, midtermScore: 24, finalExamScore: 35, comment: 'Very consistent participation; active during group problem-solving.', attendance: 'PRESENT' },
    { id: 'SCH-2025-003', name: 'Sophia Efua Al-Mansoor', classScore: 27, midtermScore: 27, finalExamScore: 36, comment: 'Diligent worker with neat presentation and high precision.', attendance: 'PRESENT' },
    { id: 'SCH-2025-004', name: 'Kofi Mensah Boateng',    classScore: 22, midtermScore: 21, finalExamScore: 32, comment: 'Showing good effort; needs extra review on trigonometric graphs.', attendance: 'LATE' },
    { id: 'SCH-2025-005', name: 'Abena Osei Poku',        classScore: 26, midtermScore: 26, finalExamScore: 36, comment: 'Strong grasp of core concepts and assists peers during practicals.', attendance: 'PRESENT' },
    { id: 'SCH-2025-006', name: 'Lucas Dubois',            classScore: 19, midtermScore: 18, finalExamScore: 30, comment: 'Encouraged to attend after-school math clinic for statistics topics.', attendance: 'ABSENT' },
  ],
  'cls-10b': [
    { id: 'SCH-2025-011', name: 'Kwesi Appiah',  classScore: 24, midtermScore: 23, finalExamScore: 33, comment: 'Solid foundational understanding; enthusiastic in class.', attendance: 'PRESENT' },
    { id: 'SCH-2025-012', name: 'Akua Sarpong',  classScore: 27, midtermScore: 27, finalExamScore: 35, comment: 'Excellent homework quality; submits assignments well ahead of time.', attendance: 'PRESENT' },
    { id: 'SCH-2025-013', name: 'David Agyeman', classScore: 21, midtermScore: 20, finalExamScore: 31, comment: 'Good progress made this term; regular practice will yield higher marks.', attendance: 'PRESENT' },
  ],
  'cls-11a': [
    { id: 'SCH-2025-021', name: 'Selorm Doe',     classScore: 29, midtermScore: 29, finalExamScore: 39, comment: 'Outstanding mastery of differential calculus and vector analysis.', attendance: 'PRESENT' },
    { id: 'SCH-2025-022', name: 'Blessing Antwi', classScore: 26, midtermScore: 25, finalExamScore: 37, comment: 'Consistently scores among the top percentiles in class exercises.', attendance: 'PRESENT' },
  ],
  'cls-9a': [
    { id: 'SCH-2025-031', name: 'Ebenezer Quaye', classScore: 25, midtermScore: 24, finalExamScore: 32, comment: 'Well prepared for upcoming BECE mock assessments.', attendance: 'PRESENT' },
    { id: 'SCH-2025-032', name: 'Gifty Owusu',    classScore: 28, midtermScore: 27, finalExamScore: 38, comment: 'Top scorer in weekly mental math and problem-solving quizzes.', attendance: 'PRESENT' },
  ],
};

const todaySchedule = [
  { period: 'Period 1', time: '08:00 - 08:50', class: 'SHS 1 - Science A',   subject: 'Core Mathematics',        room: 'Block B, Rm 10',   status: 'Completed' },
  { period: 'Period 3', time: '10:05 - 10:55', class: 'Staff Common Room',    subject: 'Department Consultation', room: 'Faculty Office 2', status: 'Current'   },
  { period: 'Period 5', time: '01:15 - 02:05', class: 'SHS 1 - General Arts', subject: 'Core Mathematics',        room: 'Block B, Rm 12',   status: 'Next Up'   },
];

function calculateGrade(total: number) {
  if (total >= 80) return { grade: 'A1', label: 'Excellent',    variant: 'default'     as const };
  if (total >= 70) return { grade: 'B2', label: 'Very Good',   variant: 'secondary'   as const };
  if (total >= 65) return { grade: 'B3', label: 'Good',        variant: 'secondary'   as const };
  if (total >= 60) return { grade: 'C4', label: 'Credit',      variant: 'outline'     as const };
  if (total >= 50) return { grade: 'C6', label: 'Pass',        variant: 'outline'     as const };
  return           { grade: 'D7', label: 'Needs Support', variant: 'destructive' as const };
}

// ── Page ──────────────────────────────────────────────────────────────────────
const ROWS_PER_PAGE = 4;

export default function TeacherPortalDashboard() {
  const [selectedClassId, setSelectedClassId] = useState('cls-10a');
  const [studentsData, setStudentsData] = useState(initialStudentsByClass);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState(false);

  // Gradebook pagination
  const [gradebookPage, setGradebookPage] = useState(1);

  // Grade Entry Dialog (modal)
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentGradeRecord | null>(null);
  const [modalClassScore, setModalClassScore] = useState<number>(0);
  const [modalMidtermScore, setModalMidtermScore] = useState<number>(0);
  const [modalFinalExamScore, setModalFinalExamScore] = useState<number>(0);
  const [modalComment, setModalComment] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  // Roll-call spinner
  const [isConfirmingRollCall, setIsConfirmingRollCall] = useState(false);

  // Broadcast
  const [broadcastText, setBroadcastText] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const teacher = {
    name: 'Mr. Emmanuel Johnson',
    employeeId: 'GES-TCH-2021-042',
    department: 'Department of Mathematics & Computing',
  };

  const currentClass    = teachingClasses.find((c) => c.id === selectedClassId) || teachingClasses[0];
  const currentStudents = studentsData[selectedClassId] || [];

  // Gradebook pagination derived values (reset page when class changes)
  const totalGradebookPages = Math.max(1, Math.ceil(currentStudents.length / ROWS_PER_PAGE));
  const pagedStudents = currentStudents.slice(
    (gradebookPage - 1) * ROWS_PER_PAGE,
    gradebookPage * ROWS_PER_PAGE,
  );

  const openGradeDialog = (student: StudentGradeRecord) => {
    setEditingStudent(student);
    setModalClassScore(student.classScore);
    setModalMidtermScore(student.midtermScore);
    setModalFinalExamScore(student.finalExamScore);
    setModalComment(student.comment);
    setDialogOpen(true);
  };

  const handleSaveModalGrade = () => {
    if (!editingStudent) return;
    setIsSaving(true);
    setTimeout(() => {
      setStudentsData((prev) => {
        const updated = (prev[selectedClassId] || []).map((s) =>
          s.id === editingStudent.id
            ? { ...s, classScore: modalClassScore, midtermScore: modalMidtermScore, finalExamScore: modalFinalExamScore, comment: modalComment }
            : s
        );
        return { ...prev, [selectedClassId]: updated };
      });
      toast.success(`Grades updated for ${editingStudent.name}`, {
        description: `Total: ${modalTotal}% (${modalGrade.grade}) • Remarks recorded`,
      });
      setIsSaving(false);
      setDialogOpen(false);
      setEditingStudent(null);
      setSaveSuccessMessage(true);
      setTimeout(() => setSaveSuccessMessage(false), 3500);
    }, 900);
  };

  const toggleAttendance = (studentId: string) => {
    setStudentsData((prev) => {
      let updatedStatus = 'PRESENT';
      let studentName = '';
      const updated = (prev[selectedClassId] || []).map((s) => {
        if (s.id !== studentId) return s;
        studentName = s.name;
        const next = s.attendance === 'PRESENT' ? 'LATE' : s.attendance === 'LATE' ? 'ABSENT' : 'PRESENT';
        updatedStatus = next;
        return { ...s, attendance: next };
      });
      if (studentName) {
        toast.info(`Attendance updated: ${studentName}`, {
          description: `Status changed to ${updatedStatus}.`,
        });
      }
      return { ...prev, [selectedClassId]: updated };
    });
  };

  const markAllPresent = () => {
    setStudentsData((prev) => {
      const updated = (prev[selectedClassId] || []).map((s) => ({ ...s, attendance: 'PRESENT' }));
      return { ...prev, [selectedClassId]: updated };
    });
    toast.success('Attendance updated', {
      description: 'All students marked as Present for today.',
    });
  };

  const handleConfirmRollCall = () => {
    setIsConfirmingRollCall(true);
    setTimeout(() => {
      setIsConfirmingRollCall(false);
      toast.success('Roll-call confirmed', {
        description: `Attendance for ${currentClass.name} has been submitted to the register.`,
      });
    }, 1200);
  };

  const handleBroadcast = () => {
    if (!broadcastText.trim()) return;
    setIsBroadcasting(true);
    setTimeout(() => {
      setIsBroadcasting(false);
      toast.success('Broadcast notice sent', {
        description: 'Message published to class stream and mobile app.',
      });
      setBroadcastText('');
    }, 900);
  };

  const modalTotal = Math.min(100, Math.max(0, modalClassScore + modalMidtermScore + modalFinalExamScore));
  const modalGrade = calculateGrade(modalTotal);

  return (
    <div className="space-y-6">

      {/* 1. WELCOME BANNER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl border bg-card/60 backdrop-blur-xs">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 rounded-xl border border-border">
            <AvatarFallback className="rounded-xl bg-muted text-foreground font-bold text-sm">EJ</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold tracking-tight text-foreground">Welcome, {teacher.name}</h1>
              <Badge variant="secondary" className="text-xs">Ghana Education Service (GES) Faculty</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {teacher.department} • Staff ID: <span className="font-mono">{teacher.employeeId}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link href="/portal/teacher/classes" className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              Classes &amp; Students
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link href="/portal/teacher/assignments" className="flex items-center gap-1.5">
              <FileCheck className="h-3.5 w-3.5" />
              Grading Inbox
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link href="/portal/teacher/analytics" className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5" />
              Analytics
            </Link>
          </Button>
        </div>
      </div>

      {/* 2. KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase">Active Classes</p>
              <p className="text-2xl font-bold mt-1 text-foreground">4 Sections</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Assigned this semester</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <BookOpen className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase">Total Students</p>
              <p className="text-2xl font-bold mt-1 text-foreground">136</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Across all 4 grades</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <Users className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase">Today&apos;s Periods</p>
              <p className="text-2xl font-bold mt-1 text-foreground">3 Sessions</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">1 completed • 1 next</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <Clock className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase">Submissions to Grade</p>
              <p className="text-2xl font-bold mt-1 text-foreground">18</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Grade 10-B homework</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <FileCheck className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. CLASS SELECTOR */}
      <div
        className="p-3 rounded-xl border bg-card/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        onClick={() => setGradebookPage(1)}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-foreground" />
          <span className="text-xs font-semibold text-foreground">Active Teaching Class:</span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {teachingClasses.map((cls) => {
            const isSelected = cls.id === selectedClassId;
            return (
              <button
                key={cls.id}
                type="button"
                onClick={() => setSelectedClassId(cls.id)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border',
                  isSelected
                    ? 'bg-foreground text-background border-foreground font-semibold shadow-xs'
                    : 'bg-background hover:bg-muted text-muted-foreground hover:text-foreground border-border'
                )}
              >
                {cls.name} <span className="opacity-70 text-[10px]">({cls.subject})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. GRADEBOOK TABLE */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-base font-semibold">Continuous Assessment Gradebook</CardTitle>
                <Badge variant="secondary" className="text-xs">{currentClass.name}</Badge>
              </div>
              <CardDescription className="text-xs mt-0.5 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {currentClass.room} &bull; {currentClass.studentsCount} students &bull; Avg: {currentClass.classAverage}%
              </CardDescription>
              <p className="text-[11px] text-muted-foreground mt-1">
                <strong>Tip:</strong> Tap any student name to open the grade entry panel.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant="outline" size="sm" className="gap-1.5 text-xs"
                onClick={() => {
                  const headers = ['Student ID','Student Name','Class Score (30)','Midterm Score (30)','Final Exam (40)','Total (%)','Grade','Teacher Remarks'];
                  const rows = currentStudents.map((s) => {
                    const total = s.classScore + s.midtermScore + s.finalExamScore;
                    const g = calculateGrade(total);
                    return [s.id, s.name, s.classScore, s.midtermScore, s.finalExamScore, total, g.grade, `"${s.comment}"`].join(',');
                  });
                  const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
                  const a = document.createElement('a');
                  a.setAttribute('href', encodeURI(csv));
                  a.setAttribute('download', `${currentClass.subject.replace(/\s/g,'-')}_Gradebook.csv`);
                  document.body.appendChild(a); a.click(); document.body.removeChild(a);
                  toast.success('Gradebook exported', {
                    description: `${currentClass.name} gradebook CSV has been downloaded.`,
                  });
                }}
              >
                <Download className="h-3.5 w-3.5" />
                Export CSV
              </Button>
            </div>
          </div>

          {saveSuccessMessage && (
            <div className="mt-3 p-3 rounded-lg bg-muted border border-border text-foreground text-xs flex items-center gap-2 animate-in fade-in">
              <Check className="h-4 w-4" />
              Grades saved successfully!
            </div>
          )}
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[860px]">
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="w-[200px] font-semibold text-foreground">Student Name</TableHead>
                  <TableHead className="w-[110px] font-semibold text-foreground text-center">Class Score (30)</TableHead>
                  <TableHead className="w-[110px] font-semibold text-foreground text-center">Midterm (30)</TableHead>
                  <TableHead className="w-[110px] font-semibold text-foreground text-center">Final Exam (40)</TableHead>
                  <TableHead className="w-[90px] font-semibold text-foreground text-center">Total</TableHead>
                  <TableHead className="w-[80px] font-semibold text-foreground text-center">Grade</TableHead>
                  <TableHead className="font-semibold text-foreground">Teacher Remarks</TableHead>
                  <TableHead className="w-[90px] font-semibold text-foreground text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagedStudents.map((st) => {
                  const total = Math.min(100, Math.max(0, st.classScore + st.midtermScore + st.finalExamScore));
                  const gradeInfo = calculateGrade(total);
                  return (
                    <TableRow key={st.id} className="hover:bg-muted/20">
                      <TableCell className="p-3">
                        <button
                          type="button"
                          onClick={() => openGradeDialog(st)}
                          className="flex items-center gap-2.5 text-left group cursor-pointer"
                        >
                          <Avatar className="h-7 w-7 rounded-md">
                            <AvatarFallback className="rounded-md bg-muted text-[11px] font-semibold">
                              {st.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground text-xs leading-tight group-hover:underline flex items-center gap-1">
                              {st.name}
                              <Pencil className="h-2.5 w-2.5 opacity-0 group-hover:opacity-60 transition-opacity" />
                            </p>
                            <p className="text-[10px] text-muted-foreground font-mono">{st.id}</p>
                          </div>
                        </button>
                      </TableCell>
                      <TableCell className="p-3 text-center text-xs font-semibold">{st.classScore} / 30</TableCell>
                      <TableCell className="p-3 text-center text-xs font-semibold">{st.midtermScore} / 30</TableCell>
                      <TableCell className="p-3 text-center text-xs font-semibold">{st.finalExamScore} / 40</TableCell>
                      <TableCell className="p-3 text-center font-bold text-xs">{total}%</TableCell>
                      <TableCell className="p-3 text-center">
                        <Badge variant="outline" className="font-bold text-[11px] px-2">{gradeInfo.grade}</Badge>
                      </TableCell>
                      <TableCell className="p-3 text-xs text-muted-foreground">
                        <span className="line-clamp-1">{st.comment || 'No comment added'}</span>
                      </TableCell>
                      <TableCell className="p-3 text-right">
                        <Button size="sm" variant="outline" onClick={() => openGradeDialog(st)} className="h-7 px-2 text-xs gap-1">
                          <Pencil className="h-3 w-3" />
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>

        {/* Gradebook Pagination */}
        {totalGradebookPages > 1 && (
          <div className="px-4 pb-4 pt-2 border-t">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Page {gradebookPage} of {totalGradebookPages} &bull; {currentStudents.length} students
              </p>
              <Pagination className="justify-end w-auto mx-0">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => { e.preventDefault(); setGradebookPage((p) => Math.max(1, p - 1)); }}
                      className={cn(gradebookPage === 1 && 'pointer-events-none opacity-40')}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalGradebookPages }, (_, i) => i + 1).map((pg) => (
                    <PaginationItem key={pg}>
                      <PaginationLink
                        href="#"
                        isActive={pg === gradebookPage}
                        onClick={(e) => { e.preventDefault(); setGradebookPage(pg); }}
                        className="h-8 w-8 text-xs"
                      >
                        {pg}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => { e.preventDefault(); setGradebookPage((p) => Math.min(totalGradebookPages, p + 1)); }}
                      className={cn(gradebookPage === totalGradebookPages && 'pointer-events-none opacity-40')}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )}
      </Card>

      {/* 5. ATTENDANCE ROLL-CALL + TODAY'S SCHEDULE (side by side on large screens) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Attendance */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  Roll-Call Attendance
                </CardTitle>
                <CardDescription className="text-xs">
                  {currentClass.name} &bull; Tap badge to toggle: Present → Late → Absent
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={markAllPresent} className="text-xs h-7 shrink-0">
                <Check className="h-3 w-3 mr-1" />
                All Present
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-1 gap-2">
              {currentStudents.map((st) => (
                <div key={st.id} className="flex items-center justify-between p-2.5 rounded-lg border bg-card hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-7 w-7 rounded-md">
                      <AvatarFallback className="rounded-md bg-muted text-[10px] font-semibold">
                        {st.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-xs text-foreground">{st.name}</p>
                      <p className="text-[10px] text-muted-foreground font-mono">{st.id}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => toggleAttendance(st.id)} className="cursor-pointer" title="Click to toggle status">
                    <Badge
                      variant={st.attendance === 'PRESENT' ? 'default' : st.attendance === 'LATE' ? 'secondary' : 'destructive'}
                      className="text-[10px] font-semibold uppercase"
                    >
                      {st.attendance}
                    </Badge>
                  </button>
                </div>
              ))}
            </div>
            <div className="pt-2 flex justify-end border-t">
              <Button
                size="sm"
                className="h-7 text-xs font-semibold gap-1.5"
                onClick={handleConfirmRollCall}
                disabled={isConfirmingRollCall}
              >
                {isConfirmingRollCall
                  ? <Spinner className="h-3 w-3" />
                  : <ClipboardCheck className="h-3.5 w-3.5" />}
                {isConfirmingRollCall ? 'Submitting...' : 'Confirm Roll-Call'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Today&apos;s Teaching Schedule
            </CardTitle>
            <CardDescription className="text-xs">Daily periods &amp; staff consultation hours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {todaySchedule.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border transition-all ${
                  item.status === 'Current' ? 'border-border bg-muted/40 shadow-xs' : 'bg-card'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-foreground">{item.period}</span>
                  <Badge
                    variant={item.status === 'Completed' ? 'secondary' : item.status === 'Current' ? 'default' : 'outline'}
                    className="text-[10px]"
                  >
                    {item.status}
                  </Badge>
                </div>
                <h4 className="font-semibold text-sm text-foreground mt-1">{item.class}</h4>
                <p className="text-xs text-muted-foreground">{item.subject} &bull; {item.room}</p>
                <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {item.time}
                </p>
              </div>
            ))}

            {/* Broadcast notice — uses Textarea component */}
            <div className="pt-2 border-t space-y-2">
              <p className="text-[11px] font-semibold text-foreground flex items-center gap-1.5">
                <Send className="h-3 w-3" /> Quick Broadcast Notice
              </p>
              <Textarea
                value={broadcastText}
                onChange={(e) => setBroadcastText(e.target.value)}
                placeholder="e.g. Bring mathematical instruments tomorrow..."
                className="text-xs min-h-[60px]"
              />
              <div className="flex justify-end">
                <Button
                  size="sm"
                  className="gap-1.5 text-xs h-7 font-semibold"
                  onClick={handleBroadcast}
                  disabled={isBroadcasting || !broadcastText.trim()}
                >
                  {isBroadcasting ? <Spinner className="h-3 w-3" /> : <Send className="h-3 w-3" />}
                  {isBroadcasting ? 'Sending...' : 'Send to Class'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 6. GRADE ENTRY DIALOG (centered modal) */}
      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open && !isSaving) { setDialogOpen(false); setEditingStudent(null); } }}>
        <DialogContent className="sm:max-w-md">
          {editingStudent && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-1">
                  <Avatar className="h-10 w-10 rounded-lg border border-border">
                    <AvatarFallback className="rounded-lg bg-muted text-foreground font-bold text-xs">
                      {editingStudent.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle>{editingStudent.name}</DialogTitle>
                    <DialogDescription>
                      ID: <span className="font-mono">{editingStudent.id}</span> &bull; {currentClass.name}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4 py-2">
                {/* Score Inputs */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground block">
                      Class Score <span className="text-[10px] text-muted-foreground font-normal">(Max 30)</span>
                    </label>
                    <input type="number" min={0} max={30} value={modalClassScore}
                      onChange={(e) => setModalClassScore(Number(e.target.value))}
                      className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-center text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground block">
                      Midterm Score <span className="text-[10px] text-muted-foreground font-normal">(Max 30)</span>
                    </label>
                    <input type="number" min={0} max={30} value={modalMidtermScore}
                      onChange={(e) => setModalMidtermScore(Number(e.target.value))}
                      className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-center text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground block">
                      Final Exam <span className="text-[10px] text-muted-foreground font-normal">(Max 40)</span>
                    </label>
                    <input type="number" min={0} max={40} value={modalFinalExamScore}
                      onChange={(e) => setModalFinalExamScore(Number(e.target.value))}
                      className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-center text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>
                </div>

                {/* Grade Summary */}
                <div className="p-3 rounded-lg border bg-muted/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block">Calculated Total</span>
                    <span className="text-lg font-bold text-foreground">{modalTotal}%</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block">Projected WASSCE</span>
                    <Badge variant="outline" className="font-bold text-xs mt-0.5">
                      {modalGrade.grade} &bull; {modalGrade.label}
                    </Badge>
                  </div>
                </div>

                {/* Remarks — uses shadcn Textarea */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground block">Teacher Remarks &amp; Guidance</label>
                  <Textarea
                    rows={3}
                    value={modalComment}
                    onChange={(e) => setModalComment(e.target.value)}
                    placeholder="Enter commendation or learning improvement tips..."
                    className="text-xs"
                  />
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground flex-wrap">
                    <span>Quick insert:</span>
                    <button type="button" onClick={() => setModalComment('Demonstrates strong mathematical acumen and consistency.')} className="hover:text-foreground underline cursor-pointer">+ Excellent</button>
                    <span>&bull;</span>
                    <button type="button" onClick={() => setModalComment('Showing marked improvement; keep up homework practice.')} className="hover:text-foreground underline cursor-pointer">+ Improving</button>
                    <span>&bull;</span>
                    <button type="button" onClick={() => setModalComment('Needs extra revision on geometric proofs and formulas.')} className="hover:text-foreground underline cursor-pointer">+ Needs Review</button>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" size="sm" disabled={isSaving} onClick={() => { setDialogOpen(false); setEditingStudent(null); }}>Cancel</Button>
                <Button type="button" size="sm" onClick={handleSaveModalGrade} disabled={isSaving} className="font-semibold gap-1.5">
                  {isSaving ? <Spinner className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
                  {isSaving ? 'Saving...' : 'Save Grades'}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}