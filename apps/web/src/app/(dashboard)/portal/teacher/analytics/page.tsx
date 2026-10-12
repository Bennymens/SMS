'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
} from 'recharts';
import { TrendingUp, Target, GraduationCap, Sparkles, BookOpen } from 'lucide-react';

const teachingClasses = [
  { id: 'cls-10a', name: 'SHS 1 - Science A',      subject: 'Core Mathematics'        },
  { id: 'cls-10b', name: 'SHS 1 - General Arts',   subject: 'Core Mathematics'        },
  { id: 'cls-11a', name: 'SHS 2 - Science A',      subject: 'Elective Mathematics'    },
  { id: 'cls-9a',  name: 'Basic 9 / JHS 3 - Gold', subject: 'Mathematics (BECE Prep)' },
];

type StudentRecord = { id: string; name: string; classScore: number; midtermScore: number; finalExamScore: number };

const studentsByClass: Record<string, StudentRecord[]> = {
  'cls-10a': [
    { id: 'SCH-2025-001', name: 'Emily Watson',            classScore: 28, midtermScore: 28, finalExamScore: 38 },
    { id: 'SCH-2025-002', name: 'Marcus Kwame Chen',       classScore: 25, midtermScore: 24, finalExamScore: 35 },
    { id: 'SCH-2025-003', name: 'Sophia Efua Al-Mansoor', classScore: 27, midtermScore: 27, finalExamScore: 36 },
    { id: 'SCH-2025-004', name: 'Kofi Mensah Boateng',    classScore: 22, midtermScore: 21, finalExamScore: 32 },
    { id: 'SCH-2025-005', name: 'Abena Osei Poku',        classScore: 26, midtermScore: 26, finalExamScore: 36 },
    { id: 'SCH-2025-006', name: 'Lucas Dubois',            classScore: 19, midtermScore: 18, finalExamScore: 30 },
  ],
  'cls-10b': [
    { id: 'SCH-2025-011', name: 'Kwesi Appiah',  classScore: 24, midtermScore: 23, finalExamScore: 33 },
    { id: 'SCH-2025-012', name: 'Akua Sarpong',  classScore: 27, midtermScore: 27, finalExamScore: 35 },
    { id: 'SCH-2025-013', name: 'David Agyeman', classScore: 21, midtermScore: 20, finalExamScore: 31 },
  ],
  'cls-11a': [
    { id: 'SCH-2025-021', name: 'Selorm Doe',    classScore: 29, midtermScore: 29, finalExamScore: 39 },
    { id: 'SCH-2025-022', name: 'Blessing Antwi', classScore: 26, midtermScore: 25, finalExamScore: 37 },
  ],
  'cls-9a': [
    { id: 'SCH-2025-031', name: 'Ebenezer Quaye', classScore: 25, midtermScore: 24, finalExamScore: 32 },
    { id: 'SCH-2025-032', name: 'Gifty Owusu',    classScore: 28, midtermScore: 27, finalExamScore: 38 },
  ],
};

type Analytics = {
  trend: Array<{ milestone: string; score: number; classAvg: number }>;
  competencies: Array<{ skill: string; score: number; target: number }>;
  termGpa: string; rank: string; attendanceRate: string;
  strengths: string; growthAreas: string; recommendation: string;
};

const analyticsMap: Record<string, Analytics> = {
  'SCH-2025-001': {
    trend: [
      { milestone: 'Quiz 1', score: 88, classAvg: 72 },
      { milestone: 'Mid-Term', score: 92, classAvg: 74 },
      { milestone: 'Project', score: 90, classAvg: 76 },
      { milestone: 'Mock 1', score: 95, classAvg: 77 },
      { milestone: 'Final Proj.', score: 94, classAvg: 78 },
    ],
    competencies: [
      { skill: 'Algebraic Proofs', score: 96, target: 75 },
      { skill: 'Geometry & Vectors', score: 92, target: 75 },
      { skill: 'Calculus Basics', score: 94, target: 75 },
      { skill: 'Statistics & Prob.', score: 88, target: 75 },
      { skill: 'Word Problems', score: 90, target: 75 },
    ],
    termGpa: '3.96 (A1 Distinction)', rank: '1st in Class (Top 3%)', attendanceRate: '98.5% (67/68 sessions)',
    strengths: 'Exceptional mathematical rigor, algebraic derivation, and peer mentoring.',
    growthAreas: '3D coordinate geometry visualization can be further refined.',
    recommendation: 'Nominated for National Science and Maths Quiz (NSMQ) training cohort.',
  },
  'SCH-2025-002': {
    trend: [
      { milestone: 'Quiz 1', score: 76, classAvg: 72 },
      { milestone: 'Mid-Term', score: 80, classAvg: 74 },
      { milestone: 'Project', score: 82, classAvg: 76 },
      { milestone: 'Mock 1', score: 85, classAvg: 77 },
      { milestone: 'Final Proj.', score: 84, classAvg: 78 },
    ],
    competencies: [
      { skill: 'Algebraic Proofs', score: 84, target: 75 },
      { skill: 'Geometry & Vectors', score: 80, target: 75 },
      { skill: 'Calculus Basics', score: 85, target: 75 },
      { skill: 'Statistics & Prob.', score: 88, target: 75 },
      { skill: 'Word Problems', score: 82, target: 75 },
    ],
    termGpa: '3.70 (A1)', rank: '4th in Class (Top 12%)', attendanceRate: '95.6% (65/68 sessions)',
    strengths: 'Active participation in group problem-solving; strong data analysis intuition.',
    growthAreas: 'Needs more step-by-step documentation in written proof steps.',
    recommendation: 'Eligible for accelerated elective mathematics modules next term.',
  },
  'SCH-2025-003': {
    trend: [
      { milestone: 'Quiz 1', score: 84, classAvg: 72 },
      { milestone: 'Mid-Term', score: 88, classAvg: 74 },
      { milestone: 'Project', score: 92, classAvg: 76 },
      { milestone: 'Mock 1', score: 91, classAvg: 77 },
      { milestone: 'Final Proj.', score: 90, classAvg: 78 },
    ],
    competencies: [
      { skill: 'Algebraic Proofs', score: 92, target: 75 },
      { skill: 'Geometry & Vectors', score: 94, target: 75 },
      { skill: 'Calculus Basics', score: 86, target: 75 },
      { skill: 'Statistics & Prob.', score: 90, target: 75 },
      { skill: 'Word Problems', score: 88, target: 75 },
    ],
    termGpa: '3.88 (A1)', rank: '2nd in Class (Top 6%)', attendanceRate: '97.1% (66/68 sessions)',
    strengths: 'Neatness in presentation, precision in geometric construction and logic.',
    growthAreas: 'Timed exam pacing under strict pressure.',
    recommendation: 'Maintain high standards; commended for academic diligence.',
  },
  'SCH-2025-004': {
    trend: [
      { milestone: 'Quiz 1', score: 62, classAvg: 72 },
      { milestone: 'Mid-Term', score: 68, classAvg: 74 },
      { milestone: 'Project', score: 72, classAvg: 76 },
      { milestone: 'Mock 1', score: 76, classAvg: 77 },
      { milestone: 'Final Proj.', score: 75, classAvg: 78 },
    ],
    competencies: [
      { skill: 'Algebraic Proofs', score: 72, target: 75 },
      { skill: 'Geometry & Vectors', score: 68, target: 75 },
      { skill: 'Calculus Basics', score: 74, target: 75 },
      { skill: 'Statistics & Prob.', score: 82, target: 75 },
      { skill: 'Word Problems', score: 78, target: 75 },
    ],
    termGpa: '3.30 (B2 Very Good)', rank: '14th in Class', attendanceRate: '89.7% (61/68 sessions)',
    strengths: 'Remarkable upward trajectory from beginning of term to mid-term.',
    growthAreas: 'Trigonometric identities and formula recall requires revision drills.',
    recommendation: 'Recommend attending bi-weekly math clinic consultation sessions.',
  },
  'SCH-2025-005': {
    trend: [
      { milestone: 'Quiz 1', score: 82, classAvg: 72 },
      { milestone: 'Mid-Term', score: 86, classAvg: 74 },
      { milestone: 'Project', score: 89, classAvg: 76 },
      { milestone: 'Mock 1', score: 87, classAvg: 77 },
      { milestone: 'Final Proj.', score: 88, classAvg: 78 },
    ],
    competencies: [
      { skill: 'Algebraic Proofs', score: 88, target: 75 },
      { skill: 'Geometry & Vectors', score: 86, target: 75 },
      { skill: 'Calculus Basics', score: 90, target: 75 },
      { skill: 'Statistics & Prob.', score: 85, target: 75 },
      { skill: 'Word Problems', score: 91, target: 75 },
    ],
    termGpa: '3.82 (A1)', rank: '3rd in Class (Top 9%)', attendanceRate: '97.0% (66/68 sessions)',
    strengths: 'Quick grasping of concepts, consistently assists peers during class tasks.',
    growthAreas: 'Checking solutions for arithmetic slips in multi-step equations.',
    recommendation: 'Appointed as student group study facilitator.',
  },
  'SCH-2025-006': {
    trend: [
      { milestone: 'Quiz 1', score: 55, classAvg: 72 },
      { milestone: 'Mid-Term', score: 60, classAvg: 74 },
      { milestone: 'Project', score: 65, classAvg: 76 },
      { milestone: 'Mock 1', score: 70, classAvg: 77 },
      { milestone: 'Final Proj.', score: 67, classAvg: 78 },
    ],
    competencies: [
      { skill: 'Algebraic Proofs', score: 64, target: 75 },
      { skill: 'Geometry & Vectors', score: 60, target: 75 },
      { skill: 'Calculus Basics', score: 68, target: 75 },
      { skill: 'Statistics & Prob.', score: 72, target: 75 },
      { skill: 'Word Problems', score: 70, target: 75 },
    ],
    termGpa: '2.80 (B3 Good)', rank: '21st in Class', attendanceRate: '86.7% (59/68 sessions)',
    strengths: 'Steady determination; active questioner in class tutorials.',
    growthAreas: 'Attendance consistency and homework turnaround punctuality.',
    recommendation: 'Targeted support in foundation concepts; parent update recommended.',
  },
};

function getAnalytics(s: StudentRecord): Analytics {
  if (analyticsMap[s.id]) return analyticsMap[s.id];
  const total = Math.min(100, s.classScore + s.midtermScore + s.finalExamScore);
  return {
    trend: [
      { milestone: 'Quiz 1', score: Math.max(45, total - 8), classAvg: 72 },
      { milestone: 'Mid-Term', score: Math.max(50, total - 4), classAvg: 74 },
      { milestone: 'Project', score: total, classAvg: 76 },
      { milestone: 'Mock 1', score: Math.min(98, total + 3), classAvg: 77 },
      { milestone: 'Final Proj.', score: total, classAvg: 78 },
    ],
    competencies: [
      { skill: 'Algebraic Proofs', score: total, target: 75 },
      { skill: 'Geometry & Vectors', score: Math.min(95, total - 2), target: 75 },
      { skill: 'Calculus Basics', score: Math.min(96, total + 2), target: 75 },
      { skill: 'Statistics & Prob.', score: Math.max(55, total - 5), target: 75 },
      { skill: 'Word Problems', score: total, target: 75 },
    ],
    termGpa: total >= 80 ? '3.80 (A1)' : total >= 70 ? '3.40 (B2)' : '3.00 (B3)',
    rank: 'Top 25% of Cohort',
    attendanceRate: '94.2% (64/68 sessions)',
    strengths: 'Good conceptual comprehension and steady execution.',
    growthAreas: 'Further speed drills during timed mid-term tests.',
    recommendation: 'Keep up consistent daily practice on class problem sheets.',
  };
}

const scoreTrendConfig: ChartConfig = {
  score:    { label: 'Student Score', color: 'var(--chart-1)' },
  classAvg: { label: 'Class Average', color: 'var(--chart-2)' },
};

const competencyConfig: ChartConfig = {
  score:  { label: 'Obtained Score (%)', color: 'var(--chart-1)' },
  target: { label: 'GES Target (75%)',   color: 'var(--chart-3)' },
};

export default function TeacherAnalyticsPage() {
  const [selectedClassId, setSelectedClassId] = useState('cls-10a');
  const [selectedStudentId, setSelectedStudentId] = useState('SCH-2025-001');

  const currentClass = teachingClasses.find((c) => c.id === selectedClassId)!;
  const students = studentsByClass[selectedClassId] || [];
  const student = students.find((s) => s.id === selectedStudentId) || students[0];
  const analytics = student ? getAnalytics(student) : null;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Student Analytics
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Select a class and student to view term assessment trends and GES NaCCA competency data.
        </p>
      </div>

      {/* Selectors row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="p-3 rounded-xl border bg-card/60 flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
          <div className="flex items-center gap-2 shrink-0">
            <BookOpen className="h-4 w-4 text-foreground" />
            <span className="text-xs font-semibold text-foreground">Class:</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {teachingClasses.map((cls) => {
              const isSelected = cls.id === selectedClassId;
              return (
                <button
                  key={cls.id}
                  type="button"
                  onClick={() => {
                    setSelectedClassId(cls.id);
                    const first = studentsByClass[cls.id]?.[0];
                    if (first) setSelectedStudentId(first.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-foreground text-background border-foreground font-semibold shadow-xs'
                      : 'bg-background hover:bg-muted text-muted-foreground hover:text-foreground border-border'
                  }`}
                >
                  {cls.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-3 rounded-xl border bg-card/60 flex items-center gap-3 sm:w-72">
          <span className="text-xs font-semibold text-foreground shrink-0">Student:</span>
          <select
            value={student?.id ?? ''}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="flex-1 rounded-md border border-input bg-background px-2.5 py-1.5 text-xs text-foreground font-medium focus:outline-none focus:ring-1 focus:ring-ring"
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {student && analytics ? (
        <>
          {/* Student overview card */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 rounded-xl border border-border">
                    <AvatarFallback className="rounded-xl bg-muted text-foreground font-bold text-xs">
                      {student.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-foreground text-sm">{student.name}</strong>
                      <span className="text-muted-foreground text-xs font-mono">({student.id})</span>
                    </div>
                    <p className="text-muted-foreground text-[11px] mt-0.5">
                      {currentClass.name} &bull; {currentClass.subject}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 flex-wrap">
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-muted-foreground">Rank</span>
                    <strong className="text-foreground text-xs">{analytics.rank}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-muted-foreground">Projected GPA</span>
                    <strong className="text-foreground text-xs">{analytics.termGpa}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-muted-foreground">Attendance</span>
                    <strong className="text-foreground text-xs">{analytics.attendanceRate}</strong>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5" />
                      Term Assessment Trajectory
                    </CardTitle>
                    <CardDescription className="text-[11px]">
                      Student score vs cohort average across term milestones
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-[10px]">Term 1 (2024/2025)</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer config={scoreTrendConfig} className="h-[220px] w-full">
                  <AreaChart data={analytics.trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id={`grad-${student.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="var(--color-score)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--color-score)" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/50" />
                    <XAxis dataKey="milestone" tickLine={false} axisLine={false} tickMargin={8} className="text-[10px]" />
                    <YAxis domain={[40, 100]} tickLine={false} axisLine={false} tickMargin={8} className="text-[10px]" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="score" stroke="var(--color-score)" strokeWidth={2} fill={`url(#grad-${student.id})`} />
                    <Line type="monotone" dataKey="classAvg" stroke="var(--color-classAvg)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                    <ChartLegend content={<ChartLegendContent />} />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                      <Target className="h-3.5 w-3.5" />
                      Syllabus Topic Competency
                    </CardTitle>
                    <CardDescription className="text-[11px]">
                      Topic mastery vs GES benchmark target (75%)
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-[10px]">NaCCA Standard</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer config={competencyConfig} className="h-[220px] w-full">
                  <BarChart data={analytics.competencies} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/50" />
                    <XAxis dataKey="skill" tickLine={false} axisLine={false} tickMargin={8} className="text-[10px]" />
                    <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tickMargin={8} className="text-[10px]" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="score" fill="var(--color-score)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="target" fill="var(--color-target)" radius={[4, 4, 0, 0]} />
                    <ChartLegend content={<ChartLegendContent />} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Diagnostic observations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-xl border p-4 bg-card space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" />
                Key Academic Strengths
              </p>
              <p className="text-xs text-foreground">{analytics.strengths}</p>
            </div>
            <div className="rounded-xl border p-4 bg-card space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Target className="h-3 w-3" />
                Target Growth Areas
              </p>
              <p className="text-xs text-foreground">{analytics.growthAreas}</p>
            </div>
            <div className="rounded-xl border p-4 bg-card space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <GraduationCap className="h-3 w-3" />
                Teacher Recommendation
              </p>
              <p className="text-xs text-foreground">{analytics.recommendation}</p>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-16 text-muted-foreground text-sm">
          Select a class and student above to view analytics.
        </div>
      )}
    </div>
  );
}