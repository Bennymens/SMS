'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import {
  GraduationCap,
  BookOpen,
  Award,
  Clock,
  Calendar as CalendarIcon,
  Sparkles,
  Users,
  CheckCircle2,
  AlertCircle,
  FileText,
  Trophy,
  ArrowRight,
  MapPin,
} from 'lucide-react';

export default function StudentPortalDashboard() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  const student = {
    name: 'Emily Watson',
    admissionNo: 'SCH-2025-00001',
    grade: 'Grade 10 • Section A',
    gpa: '3.88',
    attendance: '96.2%',
    completedCredits: '24 / 30',
  };

  const todayClasses = [
    { period: 'Period 1', time: '08:00 - 08:50', subject: 'English Language', room: 'Room 10', teacher: 'Mrs. Mensah', status: 'Completed' },
    { period: 'Period 2', time: '09:00 - 09:50', subject: 'Mathematics', room: 'Room 10', teacher: 'Mr. Osei', status: 'In Progress' },
    { period: 'Period 3', time: '10:05 - 10:55', subject: 'Integrated Science', room: 'Lab 1', teacher: 'Dr. Appiah', status: 'Upcoming' },
    { period: 'Period 4', time: '11:05 - 11:55', subject: 'Our World & Our People (OWOP)', room: 'Room 10', teacher: 'Madam Boateng', status: 'Upcoming' },
  ];

  const enrolledSubjects = [
    { name: 'English Language', code: 'ENG-GES', teacher: 'Mrs. Mensah', score: 94, grade: 'A', progress: 94 },
    { name: 'Mathematics', code: 'MTH-GES', teacher: 'Mr. Osei', score: 88, grade: 'B+', progress: 88 },
    { name: 'Integrated Science', code: 'SCI-GES', teacher: 'Dr. Appiah', score: 96, grade: 'A+', progress: 96 },
    { name: 'Social Studies', code: 'SOC-GES', teacher: 'Mr. Agyeman', score: 91, grade: 'A-', progress: 91 },
    { name: 'Our World & Our People (OWOP)', code: 'OWP-GES', teacher: 'Madam Boateng', score: 85, grade: 'B', progress: 85 },
    { name: 'Computing / ICT', code: 'ICT-GES', teacher: 'Mr. Boadu', score: 98, grade: 'A+', progress: 98 },
  ];

  const assignments = [
    { title: 'OWOP Project: Ghanaian Cultural Heritage & Festivals', subject: 'OWOP', due: 'Tomorrow, 11:59 PM', urgency: 'high' },
    { title: 'Integrated Science: Life Cycle of Flowering Plants', subject: 'Science', due: 'In 3 days', urgency: 'medium' },
    { title: 'Social Studies Essay: The 1992 Fourth Republic Constitution', subject: 'Social Studies', due: 'Oct 18, 2026', urgency: 'normal' },
  ];

  const extraCurriculars = [
    { name: 'Robotics & STEM Club', role: 'Team Lead (Software)', schedule: 'Tuesdays & Thursdays, 3:30 PM', advisor: 'Ms. Lovelace', members: 22 },
    { name: 'Model United Nations (MUN)', role: 'Delegate', schedule: 'Wednesdays, 4:00 PM', advisor: 'Mr. Brooks', members: 35 },
    { name: 'Varsity Badminton', role: 'Player', schedule: 'Mon & Fri, 3:30 PM', advisor: 'Coach Taylor', members: 16 },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* 1. STUDENT WELCOME BANNER */}
      <div className="rounded-xl border bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 ring-2 ring-primary/30">
              <AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
                EW
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Welcome back, {student.name}!
                </h1>
                <Badge variant="outline" className="bg-background text-xs font-semibold">
                  Student Portal
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">{student.grade}</strong> • Student ID:{' '}
                <span className="font-mono">{student.admissionNo}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2 text-xs">
              <Trophy className="h-3.5 w-3.5 text-amber-500" />
              View Report Card
            </Button>
            <Link href="/students/stud-1">
              <Button size="sm" className="gap-2 text-xs">
                Full Profile
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. QUICK STATS OVERVIEW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase">Cumulative GPA</p>
              <p className="text-2xl font-bold mt-1 text-foreground">{student.gpa}</p>
              <p className="text-[11px] text-muted-foreground font-semibold mt-0.5">Top 5% in Class</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <Award className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase">Attendance Rate</p>
              <p className="text-2xl font-bold mt-1 text-foreground">{student.attendance}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">88 Present / 3 Absent</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <Clock className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase">Enrolled Classes</p>
              <p className="text-2xl font-bold mt-1 text-foreground">6 Subjects</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">All requirements met</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <BookOpen className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase">Pending Homework</p>
              <p className="text-2xl font-bold mt-1 text-foreground">{assignments.length}</p>
              <p className="text-[11px] text-muted-foreground font-semibold mt-0.5">1 due tomorrow</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <FileText className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. TODAY'S TIMETABLE, CALENDAR & UPCOMING ASSIGNMENTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6 items-stretch">
        {/* Today's Schedule */}
        <Card className="md:col-span-2 xl:col-span-5 flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  Today&apos;s Class Schedule
                </CardTitle>
                <CardDescription>Follow your daily classroom periods and lab locations</CardDescription>
              </div>
              <Badge variant="outline" className="text-xs">
                {selectedDate
                  ? selectedDate.toLocaleDateString('en-US', { weekday: 'long' })
                  : 'Tuesday'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 flex-1">
            {todayClasses.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-3.5 rounded-lg border transition-all ${
                  item.status === 'In Progress'
                    ? 'border-primary/50 bg-primary/5 shadow-sm ring-1 ring-primary/20'
                    : 'bg-card hover:bg-muted/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[70px]">
                    <span className="text-xs font-bold text-foreground block">{item.period}</span>
                    <span className="text-[10px] text-muted-foreground">{item.time}</span>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">{item.subject}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.room}
                      </span>
                      <span>•</span>
                      <span>Teacher: {item.teacher}</span>
                    </p>
                  </div>
                </div>

                <Badge
                  variant={
                    item.status === 'Completed'
                      ? 'secondary'
                      : item.status === 'In Progress'
                      ? 'default'
                      : 'outline'
                  }
                  className="text-xs"
                >
                  {item.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Academic Calendar beside Schedule */}
        <Card className="md:col-span-1 xl:col-span-4 flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  Academic Calendar
                </CardTitle>
                <CardDescription>
                  {selectedDate
                    ? selectedDate.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : 'Select a date'}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-xs">
                Term 1
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 items-center justify-center p-3">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-lg border shadow-xs"
            />
          </CardContent>
        </Card>

        {/* Pending Assignments */}
        <Card className="md:col-span-1 xl:col-span-3 flex flex-col">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-amber-500" />
              Assignments & Tasks
            </CardTitle>
            <CardDescription>Upcoming submissions due</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 flex-1">
            {assignments.map((task, idx) => (
              <div key={idx} className="rounded-lg border p-3.5 space-y-2 bg-card">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-semibold leading-tight text-foreground">{task.title}</p>
                  <Badge variant={task.urgency === 'high' ? 'destructive' : 'secondary'} className="text-[10px]">
                    {task.subject}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t">
                  <span className="text-muted-foreground text-[11px] flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Due: {task.due}
                  </span>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-[11px] text-primary">
                    Submit
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 4. ENROLLED CLASSES & GRADES TABLE */}
      <Card id="classes">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                Current Enrolled Classes & Academic Standing
              </CardTitle>
              <CardDescription>Academic Year 2024/2025 • Mid-Term 1 Standing</CardDescription>
            </div>
            <Badge variant="outline" className="text-xs">
              6 Subjects Enrolled
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledSubjects.map((sub, i) => (
              <div key={i} className="rounded-xl border p-4 bg-card hover:border-primary/40 transition-all space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">{sub.name}</h3>
                    <p className="text-xs text-muted-foreground">{sub.code} • {sub.teacher}</p>
                  </div>
                  <Badge variant={sub.score >= 90 ? 'success' : 'secondary'} className="font-bold text-xs">
                    {sub.grade}
                  </Badge>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Current Average</span>
                    <span className="font-bold text-foreground">{sub.score}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      style={{ width: `${sub.progress}%` }}
                      className={`h-full ${sub.score >= 90 ? 'bg-primary' : 'bg-emerald-500'}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 5. EXTRA-CURRICULARS & CLUBS */}
      <Card id="clubs">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                Extra-Curricular Activities & Clubs
              </CardTitle>
              <CardDescription>Enrichment programs, team leadership, and sports participation</CardDescription>
            </div>
            <Button size="sm" variant="outline" className="text-xs gap-1">
              Explore Clubs
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {extraCurriculars.map((club, idx) => (
              <div key={idx} className="rounded-xl border p-4 bg-card space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-sm text-foreground">{club.name}</h4>
                  <Badge variant="outline" className="text-[10px] bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20">
                    {club.role}
                  </Badge>
                </div>

                <div className="space-y-1 text-xs text-muted-foreground">
                  <p className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {club.schedule}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    Faculty Advisor: <strong className="text-foreground">{club.advisor}</strong>
                  </p>
                </div>

                <div className="pt-2 border-t flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{club.members} active members</span>
                  <Badge variant="secondary" className="text-[10px]">
                    Member Active
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
