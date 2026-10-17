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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';

import {
  ClipboardList,
  Download,
  Save,
  Search,
  Check,
  Award,
  Filter,
  FileCheck,
  ChevronDown,
  Sparkles,
  Pencil,
} from 'lucide-react';
import { toast } from '@/components/ui/toast';

type StudentGrade = {
  id: string;
  name: string;
  classScore: number;     // /30
  midtermScore: number;   // /30
  finalExamScore: number; // /40
  remarks: string;
};

const initialClassGrades: Record<string, { className: string; subject: string; students: StudentGrade[] }> = {
  '10a': {
    className: 'Grade 10A (SHS 1 Science A)',
    subject: 'Core Mathematics',
    students: [
      { id: 'SCH-2025-001', name: 'Emily Watson', classScore: 28, midtermScore: 28, finalExamScore: 38, remarks: 'Superb grasp of calculus & algebraic geometry.' },
      { id: 'SCH-2025-002', name: 'Marcus Kwame Chen', classScore: 25, midtermScore: 24, finalExamScore: 35, remarks: 'Active contributor in group problem-solving.' },
      { id: 'SCH-2025-003', name: 'Sophia Efua Al-Mansoor', classScore: 27, midtermScore: 27, finalExamScore: 36, remarks: 'Extremely neat proofs and methodical working.' },
      { id: 'SCH-2025-004', name: 'Kofi Mensah Boateng', classScore: 22, midtermScore: 21, finalExamScore: 32, remarks: 'Steady progress; review trigonometric identities.' },
      { id: 'SCH-2025-005', name: 'Abena Osei Poku', classScore: 26, midtermScore: 26, finalExamScore: 36, remarks: 'Very consistent homework and lab submissions.' },
      { id: 'SCH-2025-006', name: 'Lucas Dubois', classScore: 19, midtermScore: 18, finalExamScore: 30, remarks: 'Needs additional practice on quadratic curves.' },
    ],
  },
  '11b': {
    className: 'Grade 11B (SHS 2 Science A)',
    subject: 'Elective Mathematics',
    students: [
      { id: 'SCH-2025-021', name: 'Selorm Doe', classScore: 29, midtermScore: 29, finalExamScore: 39, remarks: 'Outstanding analytical capability.' },
      { id: 'SCH-2025-022', name: 'Blessing Antwi', classScore: 26, midtermScore: 25, finalExamScore: 37, remarks: 'High accuracy in differentiation drills.' },
    ],
  },
  '9a': {
    className: 'Grade 9A (Basic 9 / JHS 3 Gold)',
    subject: 'Mathematics (BECE Prep)',
    students: [
      { id: 'SCH-2025-031', name: 'Ebenezer Quaye', classScore: 25, midtermScore: 24, finalExamScore: 32, remarks: 'Well prepared for upcoming mock exams.' },
      { id: 'SCH-2025-032', name: 'Gifty Owusu', classScore: 28, midtermScore: 27, finalExamScore: 38, remarks: 'Consistently tops weekly speed quizzes.' },
    ],
  },
};

function getGradeLetter(total: number) {
  if (total >= 90) return { letter: 'A1', label: 'Excellent', variant: 'default' as const };
  if (total >= 80) return { letter: 'B2', label: 'Very Good', variant: 'secondary' as const };
  if (total >= 70) return { letter: 'B3', label: 'Good', variant: 'secondary' as const };
  if (total >= 60) return { letter: 'C4', label: 'Credit', variant: 'outline' as const };
  if (total >= 50) return { letter: 'C6', label: 'Pass', variant: 'outline' as const };
  return { letter: 'D7', label: 'Needs Support', variant: 'destructive' as const };
}

export default function TeacherGradesPage() {
  const [selectedClass, setSelectedClass] = useState('10a');
  const [gradesData, setGradesData] = useState(initialClassGrades);
  const [searchQuery, setSearchQuery] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Modal State for Tapping Student Name
  const [editingStudent, setEditingStudent] = useState<StudentGrade | null>(null);
  const [modalClassScore, setModalClassScore] = useState<number>(0);
  const [modalMidtermScore, setModalMidtermScore] = useState<number>(0);
  const [modalFinalExamScore, setModalFinalExamScore] = useState<number>(0);
  const [modalRemarks, setModalRemarks] = useState<string>('');

  const activeCohort = gradesData[selectedClass];

  const openGradeModal = (student: StudentGrade) => {
    setEditingStudent(student);
    setModalClassScore(student.classScore);
    setModalMidtermScore(student.midtermScore);
    setModalFinalExamScore(student.finalExamScore);
    setModalRemarks(student.remarks);
  };

  const handleSaveModalGrade = () => {
    if (!editingStudent) return;
    setGradesData((prev) => {
      const updatedStudents = prev[selectedClass].students.map((s) => {
        if (s.id === editingStudent.id) {
          return {
            ...s,
            classScore: modalClassScore,
            midtermScore: modalMidtermScore,
            finalExamScore: modalFinalExamScore,
            remarks: modalRemarks,
          };
        }
        return s;
      });
      return {
        ...prev,
        [selectedClass]: {
          ...prev[selectedClass],
          students: updatedStudents,
        },
      };
    });
    setEditingStudent(null);
    setSaveSuccess(true);
    toast.success(`Grades updated for ${editingStudent.name}`, {
      description: `Total: ${modalTotal}% (${modalGrade.letter}) - ${modalGrade.label}`,
    });
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const filteredStudents = activeCohort.students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const modalTotal = Math.min(100, Math.max(0, modalClassScore + modalMidtermScore + modalFinalExamScore));
  const modalGrade = getGradeLetter(modalTotal);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-foreground" />
            Teacher Gradebook & Scores Entry
          </h1>
          <p className="text-muted-foreground text-sm">
            Tap on any student name to open the grade entry modal (Class Score, Midterm, Final Exam).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() => {
              const headers = ['Student ID', 'Student Name', 'Class Score (30)', 'Midterm Score (30)', 'Final Exam (40)', 'Total (%)', 'Grade', 'Remarks'];
              const rows = activeCohort.students.map((s) => {
                const total = s.classScore + s.midtermScore + s.finalExamScore;
                const g = getGradeLetter(total);
                return [s.id, s.name, s.classScore, s.midtermScore, s.finalExamScore, total, g.letter, `"${s.remarks}"`].join(',');
              });
              const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
              const link = document.createElement('a');
              link.href = encodeURI(csv);
              link.download = `${activeCohort.className}_Grades.csv`;
              link.click();
              toast.success('Grades exported', {
                description: `${activeCohort.className} CSV file downloaded.`,
              });
            }}
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Cohort Selector & Search Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-xl border bg-card/60">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-muted-foreground">Select Class:</span>
          {Object.entries(gradesData).map(([key, data]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedClass(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                selectedClass === key
                  ? 'bg-foreground text-background border-foreground font-semibold'
                  : 'bg-background hover:bg-muted text-muted-foreground hover:text-foreground border-border'
              }`}
            >
              {data.className}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search student by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-input bg-background pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 rounded-lg border bg-muted text-foreground text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 font-bold" />
            <span>
              All student assessment grades and remarks for <strong>{activeCohort.className}</strong> have been saved!
            </span>
          </div>
          <Badge variant="outline" className="text-[10px]">Saved</Badge>
        </div>
      )}

      {/* Grade Entry Table using Shadcn Table component */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">
                {activeCohort.className} • {activeCohort.subject} Grade Sheet
              </CardTitle>
              <CardDescription className="text-xs">
                Tap on any student name to open the grade entry modal
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-xs">
              {filteredStudents.length} Students
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table className="min-w-[850px]">
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-[200px] font-semibold text-foreground">Student Name (Tap to Edit)</TableHead>
                <TableHead className="w-[110px] font-semibold text-foreground text-center">Class Score (30)</TableHead>
                <TableHead className="w-[110px] font-semibold text-foreground text-center">Midterm (30)</TableHead>
                <TableHead className="w-[110px] font-semibold text-foreground text-center">Final Exam (40)</TableHead>
                <TableHead className="w-[90px] font-semibold text-foreground text-center">Total Score</TableHead>
                <TableHead className="w-[80px] font-semibold text-foreground text-center">Grade</TableHead>
                <TableHead className="font-semibold text-foreground">Teacher Remarks & Observations</TableHead>
                <TableHead className="w-[90px] font-semibold text-foreground text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((st) => {
                const total = Math.min(100, Math.max(0, st.classScore + st.midtermScore + st.finalExamScore));
                const gradeInfo = getGradeLetter(total);

                return (
                  <TableRow key={st.id} className="hover:bg-muted/20">
                    {/* Student Details - TAP ON NAME TO OPEN MODAL */}
                    <TableCell className="p-3">
                      <button
                        type="button"
                        onClick={() => openGradeModal(st)}
                        className="flex items-center gap-2.5 text-left group cursor-pointer"
                        title="Click to enter or edit grades"
                      >
                        <Avatar className="h-7 w-7 rounded-md">
                          <AvatarFallback className="rounded-md bg-muted text-[11px] font-semibold">
                            {st.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-foreground text-xs leading-tight group-hover:underline flex items-center gap-1">
                            {st.name}
                            <Pencil className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                          </p>
                          <p className="text-[10px] text-muted-foreground font-mono">{st.id}</p>
                        </div>
                      </button>
                    </TableCell>

                    {/* Class Score */}
                    <TableCell className="p-3 text-center text-xs font-semibold text-foreground">
                      {st.classScore} / 30
                    </TableCell>

                    {/* Midterm Score */}
                    <TableCell className="p-3 text-center text-xs font-semibold text-foreground">
                      {st.midtermScore} / 30
                    </TableCell>

                    {/* Final Exam Score */}
                    <TableCell className="p-3 text-center text-xs font-semibold text-foreground">
                      {st.finalExamScore} / 40
                    </TableCell>

                    {/* Total Score */}
                    <TableCell className="p-3 text-center font-bold text-foreground text-xs">
                      {total}%
                    </TableCell>

                    {/* Grade Badge */}
                    <TableCell className="p-3 text-center">
                      <Badge variant="outline" className="font-bold text-[11px] px-2">
                        {gradeInfo.letter}
                      </Badge>
                    </TableCell>

                    {/* Remarks */}
                    <TableCell className="p-3 text-xs text-muted-foreground">
                      <span className="line-clamp-1">{st.remarks || 'No remarks recorded'}</span>
                    </TableCell>

                    {/* Action */}
                    <TableCell className="p-3 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openGradeModal(st)}
                        className="h-7 px-2 text-xs gap-1"
                      >
                        <Pencil className="h-3 w-3" />
                        <span>Grades</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* SHEET DRAWER FOR ENTERING & EDITING STUDENT GRADES */}
      <Sheet open={!!editingStudent} onOpenChange={(open) => !open && setEditingStudent(null)}>
        {editingStudent && (
          <SheetContent side="right" className="sm:max-w-md w-full overflow-y-auto flex flex-col justify-between">
            <div>
              <SheetHeader className="pb-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 rounded-lg border border-border">
                    <AvatarFallback className="rounded-lg bg-muted text-foreground font-bold text-xs">
                      {editingStudent.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <SheetTitle className="text-base font-bold">{editingStudent.name}</SheetTitle>
                    <SheetDescription className="text-xs">
                      ID: <span className="font-mono text-foreground font-semibold">{editingStudent.id}</span> • {activeCohort.className}
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-4 py-4">
                {/* Score Inputs: Class Score, Midterm Test Score, Final Exam Score */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground block">
                      Class Score
                      <span className="text-[10px] text-muted-foreground block font-normal">(Max 30)</span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={30}
                      value={modalClassScore}
                      onChange={(e) => setModalClassScore(Number(e.target.value))}
                      className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-center text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground block">
                      Midterm Score
                      <span className="text-[10px] text-muted-foreground block font-normal">(Max 30)</span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={30}
                      value={modalMidtermScore}
                      onChange={(e) => setModalMidtermScore(Number(e.target.value))}
                      className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-center text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground block">
                      Final Exam
                      <span className="text-[10px] text-muted-foreground block font-normal">(Max 40)</span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={40}
                      value={modalFinalExamScore}
                      onChange={(e) => setModalFinalExamScore(Number(e.target.value))}
                      className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-center text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>
                </div>

                {/* Dynamic Calculation Summary */}
                <div className="p-3 rounded-lg border bg-muted/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block">Total Computed Score</span>
                    <span className="text-lg font-bold text-foreground">{modalTotal}%</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block">Final Rating</span>
                    <Badge variant="outline" className="font-bold text-xs mt-0.5">
                      {modalGrade.letter} • {modalGrade.label}
                    </Badge>
                  </div>
                </div>

                {/* Remarks */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground block">
                    Teacher Remarks & Feedback
                  </label>
                  <textarea
                    rows={3}
                    value={modalRemarks}
                    onChange={(e) => setModalRemarks(e.target.value)}
                    placeholder="Enter observation or feedback..."
                    className="w-full rounded-md border border-input bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
                  />
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground flex-wrap">
                    <span>Quick insert:</span>
                    <button
                      type="button"
                      onClick={() => setModalRemarks('Superb grasp of core syllabus topics.')}
                      className="hover:text-foreground underline cursor-pointer"
                    >
                      + Superb
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => setModalRemarks('Consistent effort throughout all continuous assessments.')}
                      className="hover:text-foreground underline cursor-pointer"
                    >
                      + Consistent
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => setModalRemarks('Encouraged to attend weekly peer tutorial clinics.')}
                      className="hover:text-foreground underline cursor-pointer"
                    >
                      + Tutorial Recommended
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <SheetFooter className="pt-4 border-t flex flex-row items-center justify-end gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setEditingStudent(null)}>
                Cancel
              </Button>
              <Button type="button" size="sm" onClick={handleSaveModalGrade} className="font-semibold gap-1.5">
                <Save className="h-3.5 w-3.5" />
                Save Grade
              </Button>
            </SheetFooter>
          </SheetContent>
        )}
      </Sheet>

    </div>
  );
}
