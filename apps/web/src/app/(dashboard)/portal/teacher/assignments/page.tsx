'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  BookMarked,
  Plus,
  Clock,
  FileCheck,
  Check,
  Search,
  Filter,
  ArrowLeft,
  Download,
  Send,
  Save,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { toast } from '@/components/ui/toast';

type Submission = {
  id: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  status: 'Needs Grading' | 'Graded' | 'Late';
  score: number | null;
  maxScore: number;
  attachment: string;
  feedback: string;
};

type Assignment = {
  id: string;
  title: string;
  classCohort: string;
  subject: string;
  dueDate: string;
  totalStudents: number;
  submittedCount: number;
  pendingReviewCount: number;
  maxScore: number;
  submissions: Submission[];
};

const initialAssignments: Assignment[] = [
  {
    id: 'asg-1',
    title: 'Calculus Problem Set #4: Limits & Continuity',
    classCohort: 'SHS 2 - Science A',
    subject: 'Elective Mathematics',
    dueDate: 'Oct 15, 2026 • 11:59 PM',
    totalStudents: 32,
    submittedCount: 28,
    pendingReviewCount: 6,
    maxScore: 20,
    submissions: [
      {
        id: 'sub-1',
        studentId: 'SCH-2025-021',
        studentName: 'Selorm Doe',
        submittedAt: 'Oct 13, 2026 • 04:30 PM',
        status: 'Needs Grading',
        score: null,
        maxScore: 20,
        attachment: 'selorm_limits_hw4.pdf',
        feedback: '',
      },
      {
        id: 'sub-2',
        studentId: 'SCH-2025-022',
        studentName: 'Blessing Antwi',
        submittedAt: 'Oct 13, 2026 • 06:15 PM',
        status: 'Needs Grading',
        score: null,
        maxScore: 20,
        attachment: 'blessing_calc_set4.pdf',
        feedback: '',
      },
      {
        id: 'sub-3',
        studentId: 'SCH-2025-001',
        studentName: 'Emily Watson',
        submittedAt: 'Oct 12, 2026 • 08:20 PM',
        status: 'Graded',
        score: 19,
        maxScore: 20,
        attachment: 'emily_continuity_hw.pdf',
        feedback: 'Flawless proof on piecewise limits; excellent notation.',
      },
      {
        id: 'sub-4',
        studentId: 'SCH-2025-002',
        studentName: 'Marcus Kwame Chen',
        submittedAt: 'Oct 12, 2026 • 09:10 PM',
        status: 'Graded',
        score: 17,
        maxScore: 20,
        attachment: 'marcus_chen_hw4.pdf',
        feedback: 'Good work; check question 3b algebraic simplification.',
      },
      {
        id: 'sub-5',
        studentId: 'SCH-2025-003',
        studentName: 'Sophia Efua Al-Mansoor',
        submittedAt: 'Oct 14, 2026 • 08:00 AM',
        status: 'Needs Grading',
        score: null,
        maxScore: 20,
        attachment: 'sophia_almansoor_pset4.pdf',
        feedback: '',
      },
      {
        id: 'sub-6',
        studentId: 'SCH-2025-004',
        studentName: 'Kofi Mensah Boateng',
        submittedAt: 'Oct 14, 2026 • 09:45 AM',
        status: 'Late',
        score: null,
        maxScore: 20,
        attachment: 'kofi_limits_scan.pdf',
        feedback: '',
      },
    ],
  },
  {
    id: 'asg-2',
    title: 'Algebraic Proofs & Quadratic Systems (Set B)',
    classCohort: 'SHS 1 - Science A',
    subject: 'Core Mathematics',
    dueDate: 'Oct 18, 2026 • 05:00 PM',
    totalStudents: 34,
    submittedCount: 22,
    pendingReviewCount: 8,
    maxScore: 25,
    submissions: [
      {
        id: 'sub-21',
        studentId: 'SCH-2025-005',
        studentName: 'Abena Osei Poku',
        submittedAt: 'Oct 14, 2026 • 02:10 PM',
        status: 'Needs Grading',
        score: null,
        maxScore: 25,
        attachment: 'abena_algebra_proofs.pdf',
        feedback: '',
      },
      {
        id: 'sub-22',
        studentId: 'SCH-2025-006',
        studentName: 'Lucas Dubois',
        submittedAt: 'Oct 14, 2026 • 03:00 PM',
        status: 'Needs Grading',
        score: null,
        maxScore: 25,
        attachment: 'lucas_quadratics.pdf',
        feedback: '',
      },
    ],
  },
  {
    id: 'asg-3',
    title: 'BECE Mathematics Mock Revision Practice 1',
    classCohort: 'Basic 9 / JHS 3 - Gold',
    subject: 'Mathematics (BECE Prep)',
    dueDate: 'Oct 20, 2026 • 11:59 PM',
    totalStudents: 34,
    submittedCount: 30,
    pendingReviewCount: 4,
    maxScore: 30,
    submissions: [],
  },
];

export default function TeacherAssignmentsPage() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [activeInboxAssignmentId, setActiveInboxAssignmentId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Needs Grading' | 'Graded'>('All');
  const [gradeSuccessMessage, setGradeSuccessMessage] = useState(false);

  // New assignment form state
  const [newTitle, setNewTitle] = useState('');
  const [newClass, setNewClass] = useState('SHS 1 - Science A');
  const [newDueDate, setNewDueDate] = useState('');
  const [newMaxScore, setNewMaxScore] = useState(20);

  const activeAssignment = assignments.find((a) => a.id === activeInboxAssignmentId);

  const updateSubmissionScore = (submissionId: string, score: number) => {
    if (!activeInboxAssignmentId) return;
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id !== activeInboxAssignmentId) return a;
        const updatedSubs = a.submissions.map((s) => {
          if (s.id !== submissionId) return s;
          return {
            ...s,
            score: Math.min(s.maxScore, Math.max(0, score)),
            status: 'Graded' as const,
          };
        });
        const remainingPending = updatedSubs.filter((s) => s.status === 'Needs Grading' || s.status === 'Late').length;
        return {
          ...a,
          submissions: updatedSubs,
          pendingReviewCount: remainingPending,
        };
      })
    );
  };

  const updateSubmissionFeedback = (submissionId: string, feedback: string) => {
    if (!activeInboxAssignmentId) return;
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id !== activeInboxAssignmentId) return a;
        const updatedSubs = a.submissions.map((s) => {
          if (s.id !== submissionId) return s;
          return { ...s, feedback };
        });
        return { ...a, submissions: updatedSubs };
      })
    );
  };

  const handleSaveGrading = () => {
    setGradeSuccessMessage(true);
    toast.success('Assignment grades saved', {
      description: 'Scores and feedback successfully updated.',
    });
    setTimeout(() => setGradeSuccessMessage(false), 3500);
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: Assignment = {
      id: `asg-${Date.now()}`,
      title: newTitle,
      classCohort: newClass,
      subject: newClass.includes('Elective') ? 'Elective Mathematics' : 'Core Mathematics',
      dueDate: newDueDate || 'Due in 7 days',
      totalStudents: 34,
      submittedCount: 0,
      pendingReviewCount: 0,
      maxScore: newMaxScore,
      submissions: [],
    };

    setAssignments((prev) => [created, ...prev]);
    setShowCreateModal(false);
    setNewTitle('');
    toast.success(`Assignment published`, {
      description: `"${created.title}" assigned to ${created.classCohort}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BookMarked className="h-6 w-6 text-foreground" />
            Classroom Assignments & Grading
          </h1>
          <p className="text-muted-foreground text-sm">
            Create homework tasks, manage submission inboxes, and enter student scores.
          </p>
        </div>
        <Button size="sm" onClick={() => setShowCreateModal(true)} className="gap-1.5 text-xs font-semibold">
          <Plus className="h-3.5 w-3.5" />
          Create Assignment
        </Button>
      </div>

      {/* CREATE ASSIGNMENT MODAL / CARD */}
      {showCreateModal && (
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Create New Assignment</CardTitle>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
              >
                ✕ Cancel
              </button>
            </div>
            <CardDescription className="text-xs">
              Publish a new coursework task to student and parent dashboards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateAssignment} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-foreground block mb-1">Assignment Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Quadratic Equations & Graph Plotting Exercise #3"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">Target Class</label>
                  <select
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="SHS 1 - Science A">SHS 1 - Science A</option>
                    <option value="SHS 1 - General Arts">SHS 1 - General Arts</option>
                    <option value="SHS 2 - Science A">SHS 2 - Science A</option>
                    <option value="Basic 9 / JHS 3 - Gold">Basic 9 / JHS 3 - Gold</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">Due Date & Time</label>
                  <input
                    type="text"
                    placeholder="e.g. Oct 24, 2026 • 11:59 PM"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">Maximum Score</label>
                  <input
                    type="number"
                    min={5}
                    max={100}
                    value={newMaxScore}
                    onChange={(e) => setNewMaxScore(Number(e.target.value))}
                    className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowCreateModal(false)} className="text-xs">
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="text-xs font-semibold">
                  Publish to Students
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* ACTIVE GRADING INBOX VIEW */}
      {activeAssignment ? (
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <button
                  type="button"
                  onClick={() => setActiveInboxAssignmentId(null)}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-1.5 cursor-pointer font-medium"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to All Assignments
                </button>
                <div className="flex items-center gap-2 flex-wrap">
                  <CardTitle className="text-base font-semibold">{activeAssignment.title}</CardTitle>
                  <Badge variant="outline" className="text-xs">{activeAssignment.classCohort}</Badge>
                </div>
                <CardDescription className="text-xs mt-0.5">
                  Due: {activeAssignment.dueDate} • Maximum Mark: {activeAssignment.maxScore} pts
                </CardDescription>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs"
                  onClick={() => {
                    const headers = ['Student ID', 'Student Name', 'Submitted At', 'Status', 'Score', 'Max Score', 'Feedback'];
                    const rows = activeAssignment.submissions.map((s) => [
                      s.studentId,
                      s.studentName,
                      `"${s.submittedAt}"`,
                      s.status,
                      s.score ?? '',
                      s.maxScore,
                      `"${s.feedback}"`,
                    ]);
                    const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
                    const link = document.createElement('a');
                    link.href = encodeURI(csv);
                    link.download = `${activeAssignment.title.slice(0, 20)}_Grading.csv`;
                    link.click();
                  }}
                >
                  <Download className="h-3.5 w-3.5" />
                  Export Sheet
                </Button>
                <Button size="sm" onClick={handleSaveGrading} className="gap-1.5 text-xs font-semibold">
                  <Save className="h-3.5 w-3.5" />
                  Save All Marks
                </Button>
              </div>
            </div>

            {/* Filter Pill Badges */}
            <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t flex-wrap">
              <div className="flex items-center gap-1.5">
                {(['All', 'Needs Grading', 'Graded'] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFilterStatus(status)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer border ${
                      filterStatus === status
                        ? 'bg-foreground text-background border-foreground font-semibold'
                        : 'bg-background hover:bg-muted text-muted-foreground border-border'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <span className="text-xs text-muted-foreground">
                Pending Reviews: <strong className="text-foreground">{activeAssignment.pendingReviewCount}</strong>
              </span>
            </div>

            {gradeSuccessMessage && (
              <div className="mt-3 p-3 rounded-lg border bg-muted text-foreground text-xs flex items-center justify-between animate-in fade-in">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 font-bold" />
                  <span>Grading scores and feedback saved to student reports!</span>
                </div>
                <Badge variant="outline" className="text-[10px]">Saved</Badge>
              </div>
            )}
          </CardHeader>

          <CardContent className="p-0">
            <Table className="min-w-[850px]">
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="w-[190px] font-semibold text-foreground">Student Name</TableHead>
                  <TableHead className="w-[150px] font-semibold text-foreground">Turned In</TableHead>
                  <TableHead className="w-[110px] font-semibold text-foreground">Status</TableHead>
                  <TableHead className="w-[110px] font-semibold text-foreground text-center">Score ({activeAssignment.maxScore})</TableHead>
                  <TableHead className="w-[140px] font-semibold text-foreground">Submission File</TableHead>
                  <TableHead className="font-semibold text-foreground">Teacher Feedback</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeAssignment.submissions
                  .filter((s) => (filterStatus === 'All' ? true : s.status === filterStatus))
                  .map((sub) => (
                    <TableRow key={sub.id} className="hover:bg-muted/20">
                      {/* Student info */}
                      <TableCell className="p-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-7 w-7 rounded-md">
                            <AvatarFallback className="rounded-md bg-muted text-[11px] font-semibold">
                              {sub.studentName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground text-xs leading-tight">{sub.studentName}</p>
                            <p className="text-[10px] text-muted-foreground font-mono">{sub.studentId}</p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Submitted At */}
                      <TableCell className="p-3 text-xs text-muted-foreground whitespace-nowrap">
                        {sub.submittedAt}
                      </TableCell>

                      {/* Status */}
                      <TableCell className="p-3">
                        <Badge
                          variant={
                            sub.status === 'Graded'
                              ? 'default'
                              : sub.status === 'Needs Grading'
                              ? 'secondary'
                              : 'destructive'
                          }
                          className="text-[10px]"
                        >
                          {sub.status}
                        </Badge>
                      </TableCell>

                      {/* Score Input */}
                      <TableCell className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <input
                            type="number"
                            min={0}
                            max={sub.maxScore}
                            value={sub.score ?? ''}
                            placeholder="—"
                            onChange={(e) => updateSubmissionScore(sub.id, Number(e.target.value))}
                            className="w-12 rounded-md border border-input bg-background px-1.5 py-1 text-center font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                          />
                          <span className="text-[10px] text-muted-foreground">/{sub.maxScore}</span>
                        </div>
                      </TableCell>

                      {/* Attachment file */}
                      <TableCell className="p-3">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <FileText className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate max-w-[120px] font-mono text-[11px]">{sub.attachment}</span>
                        </div>
                      </TableCell>

                      {/* Feedback input */}
                      <TableCell className="p-3">
                        <input
                          type="text"
                          value={sub.feedback}
                          onChange={(e) => updateSubmissionFeedback(sub.id, e.target.value)}
                          placeholder="Write constructive comment..."
                          className="w-full rounded-md border border-input bg-background px-2.5 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        /* ASSIGNMENTS OVERVIEW LIST */
        <div className="space-y-4">
          {assignments.map((asg) => (
            <Card key={asg.id} className="hover:border-foreground/30 transition-all">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge variant="outline" className="text-[10px]">{asg.classCohort}</Badge>
                      <span className="text-xs text-muted-foreground">{asg.subject}</span>
                    </div>
                    <CardTitle className="text-base font-semibold">{asg.title}</CardTitle>
                    <CardDescription className="text-xs mt-0.5 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      Due: {asg.dueDate} • Max Score: {asg.maxScore} pts
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">
                    {asg.submittedCount} / {asg.totalStudents} Submitted
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pt-0 gap-3">
                <span className="text-muted-foreground">
                  {asg.pendingReviewCount > 0 ? (
                    <strong className="text-foreground">{asg.pendingReviewCount} submissions pending review</strong>
                  ) : (
                    <span>All submissions reviewed & graded</span>
                  )}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setActiveInboxAssignmentId(asg.id)}
                  className="text-xs font-semibold gap-1.5 w-fit"
                >
                  <FileCheck className="h-3.5 w-3.5" />
                  Open Grading Inbox ({asg.submittedCount})
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
