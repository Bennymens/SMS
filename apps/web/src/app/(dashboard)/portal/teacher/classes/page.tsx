'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  School,
  Users,
  BookOpen,
  Clock,
  Search,
  Download,
  Mail,
  Phone,
  ArrowRight,
  ClipboardCheck,
} from 'lucide-react';
import { toast } from '@/components/ui/toast';

type StudentRosterMember = {
  id: string;
  name: string;
  gender: 'Female' | 'Male';
  attendanceRate: number;
  currentAverage: number;
  gradeLetter: string;
  guardianName: string;
  guardianPhone: string;
  status: 'Enrolled';
};

const classRosters: Record<
  string,
  {
    name: string;
    subject: string;
    room: string;
    schedule: string;
    students: StudentRosterMember[];
  }
> = {
  '10a': {
    name: 'Grade 10 - Section A (SHS 1 Science A)',
    subject: 'Core Mathematics',
    room: 'Block B, Room 10',
    schedule: 'Mon, Wed, Fri 08:00 AM',
    students: [
      {
        id: 'SCH-2025-001',
        name: 'Emily Watson',
        gender: 'Female',
        attendanceRate: 98.5,
        currentAverage: 94.0,
        gradeLetter: 'A1',
        guardianName: 'Dr. Arthur Watson',
        guardianPhone: '+233 24 455 1201',
        status: 'Enrolled',
      },
      {
        id: 'SCH-2025-002',
        name: 'Marcus Kwame Chen',
        gender: 'Male',
        attendanceRate: 95.6,
        currentAverage: 84.0,
        gradeLetter: 'A1',
        guardianName: 'Linda Chen',
        guardianPhone: '+233 20 891 4322',
        status: 'Enrolled',
      },
      {
        id: 'SCH-2025-003',
        name: 'Sophia Efua Al-Mansoor',
        gender: 'Female',
        attendanceRate: 97.1,
        currentAverage: 90.0,
        gradeLetter: 'A1',
        guardianName: 'Tariq Al-Mansoor',
        guardianPhone: '+233 55 312 8840',
        status: 'Enrolled',
      },
      {
        id: 'SCH-2025-004',
        name: 'Kofi Mensah Boateng',
        gender: 'Male',
        attendanceRate: 89.7,
        currentAverage: 75.0,
        gradeLetter: 'B2',
        guardianName: 'Samuel Boateng',
        guardianPhone: '+233 24 109 4321',
        status: 'Enrolled',
      },
      {
        id: 'SCH-2025-005',
        name: 'Abena Osei Poku',
        gender: 'Female',
        attendanceRate: 97.0,
        currentAverage: 88.0,
        gradeLetter: 'A1',
        guardianName: 'Grace Poku',
        guardianPhone: '+233 27 773 9901',
        status: 'Enrolled',
      },
      {
        id: 'SCH-2025-006',
        name: 'Lucas Dubois',
        gender: 'Male',
        attendanceRate: 86.7,
        currentAverage: 67.0,
        gradeLetter: 'B3',
        guardianName: 'Claire Dubois',
        guardianPhone: '+233 50 441 2309',
        status: 'Enrolled',
      },
    ],
  },
  '11b': {
    name: 'Grade 11 - Section B (SHS 2 Science A)',
    subject: 'Elective Mathematics',
    room: 'Science Lab 2',
    schedule: 'Tue, Thu 10:00 AM',
    students: [
      {
        id: 'SCH-2025-021',
        name: 'Selorm Doe',
        gender: 'Male',
        attendanceRate: 99.1,
        currentAverage: 97.0,
        gradeLetter: 'A1',
        guardianName: 'Kojo Doe',
        guardianPhone: '+233 24 881 2290',
        status: 'Enrolled',
      },
      {
        id: 'SCH-2025-022',
        name: 'Blessing Antwi',
        gender: 'Female',
        attendanceRate: 96.0,
        currentAverage: 88.0,
        gradeLetter: 'A1',
        guardianName: 'Beatrice Antwi',
        guardianPhone: '+233 20 551 0923',
        status: 'Enrolled',
      },
    ],
  },
  '9a': {
    name: 'Grade 9 - Section A (Basic 9 / JHS 3 Gold)',
    subject: 'Mathematics (BECE Prep)',
    room: 'Block A, Room 4',
    schedule: 'Mon, Wed 01:00 PM',
    students: [
      {
        id: 'SCH-2025-031',
        name: 'Ebenezer Quaye',
        gender: 'Male',
        attendanceRate: 94.3,
        currentAverage: 83.0,
        gradeLetter: 'A1',
        guardianName: 'Francis Quaye',
        guardianPhone: '+233 55 901 3241',
        status: 'Enrolled',
      },
      {
        id: 'SCH-2025-032',
        name: 'Gifty Owusu',
        gender: 'Female',
        attendanceRate: 98.0,
        currentAverage: 93.0,
        gradeLetter: 'A1',
        guardianName: 'Comfort Owusu',
        guardianPhone: '+233 24 112 5599',
        status: 'Enrolled',
      },
    ],
  },
};

export default function TeacherClassesPage() {
  const [selectedClassId, setSelectedClassId] = useState('10a');
  const [searchQuery, setSearchQuery] = useState('');

  const activeCohort = classRosters[selectedClassId];
  const filteredStudents = activeCohort.students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <School className="h-6 w-6 text-foreground" />
            My Teaching Classes & Student Rosters
          </h1>
          <p className="text-muted-foreground text-sm">
            View allocated cohorts, tap on any class to view its student roster with the Shadcn Table.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild className="gap-1.5 text-xs">
            <Link href="/portal/teacher/grades">
              <ClipboardCheck className="h-3.5 w-3.5" />
              Open Gradebook
            </Link>
          </Button>
          <Badge variant="secondary" className="text-xs">
            3 Active Sections (83 Students)
          </Badge>
        </div>
      </div>

      {/* Class Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(classRosters).map(([id, cls]) => {
          const isSelected = id === selectedClassId;
          return (
            <Card
              key={id}
              onClick={() => setSelectedClassId(id)}
              className={`transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-foreground shadow-xs ring-1 ring-foreground/20'
                  : 'hover:border-foreground/40'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-base font-semibold">{cls.name}</CardTitle>
                    <CardDescription className="text-xs font-medium text-foreground mt-0.5">
                      {cls.subject}
                    </CardDescription>
                  </div>
                  {isSelected ? (
                    <Badge variant="default" className="text-[10px]">Active</Badge>
                  ) : (
                    <Badge variant="outline" className="text-[10px]">{cls.students.length} Students</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-0 text-xs text-muted-foreground">
                <div className="space-y-1">
                  <p className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{cls.schedule}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5" />
                    <span>{cls.room}</span>
                  </p>
                </div>
                <div className="pt-2 border-t">
                  <Button
                    size="sm"
                    variant={isSelected ? 'default' : 'outline'}
                    className="w-full text-xs font-semibold"
                  >
                    {isSelected ? 'Viewing Roster' : 'View Student List'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* STUDENTS LIST TABLE USING SHADCN TABLE COMPONENT */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <CardTitle className="text-base font-semibold">
                  {activeCohort.name} • Enrolled Students
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {filteredStudents.length} Students
                </Badge>
              </div>
              <CardDescription className="text-xs mt-0.5">
                Official class roster, attendance percentages, and guardian emergency contact details
              </CardDescription>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative w-full sm:w-56">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Filter by name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md border border-input bg-background pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs"
                onClick={() => {
                  const headers = ['Student ID', 'Full Name', 'Gender', 'Attendance Rate', 'Average (%)', 'Grade', 'Guardian', 'Guardian Phone'];
                  const rows = activeCohort.students.map((s) => [
                    s.id,
                    s.name,
                    s.gender,
                    `${s.attendanceRate}%`,
                    `${s.currentAverage}%`,
                    s.gradeLetter,
                    `"${s.guardianName}"`,
                    `"${s.guardianPhone}"`,
                  ]);
                  const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
                  const link = document.createElement('a');
                  link.href = encodeURI(csv);
                  link.download = `${activeCohort.name.slice(0, 15)}_Roster.csv`;
                  link.click();
                  toast.success('Roster exported', {
                    description: `${activeCohort.name} student list downloaded.`,
                  });
                }}
              >
                <Download className="h-3.5 w-3.5" />
                Export Roster
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table className="min-w-[850px]">
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-[200px] font-semibold text-foreground">Student Details</TableHead>
                <TableHead className="w-[90px] font-semibold text-foreground">Gender</TableHead>
                <TableHead className="w-[120px] font-semibold text-foreground">Attendance</TableHead>
                <TableHead className="w-[110px] font-semibold text-foreground">Current Avg</TableHead>
                <TableHead className="w-[90px] font-semibold text-foreground text-center">Grade</TableHead>
                <TableHead className="font-semibold text-foreground">Guardian & Contact</TableHead>
                <TableHead className="w-[120px] font-semibold text-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((st) => (
                <TableRow key={st.id} className="hover:bg-muted/20">
                  {/* Student Details */}
                  <TableCell className="p-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-8 w-8 rounded-md">
                        <AvatarFallback className="rounded-md bg-muted text-[11px] font-semibold">
                          {st.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground text-xs leading-tight">{st.name}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">{st.id}</p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Gender */}
                  <TableCell className="p-3 text-xs text-muted-foreground">
                    {st.gender}
                  </TableCell>

                  {/* Attendance */}
                  <TableCell className="p-3 text-xs">
                    <span className="font-semibold text-foreground">{st.attendanceRate}%</span>
                    <span className="block text-[10px] text-muted-foreground">Term 1 rate</span>
                  </TableCell>

                  {/* Current Avg */}
                  <TableCell className="p-3 text-xs">
                    <span className="font-bold text-foreground">{st.currentAverage}%</span>
                  </TableCell>

                  {/* Grade */}
                  <TableCell className="p-3 text-center">
                    <Badge variant="outline" className="font-bold text-[11px] px-2">
                      {st.gradeLetter}
                    </Badge>
                  </TableCell>

                  {/* Guardian Contact */}
                  <TableCell className="p-3">
                    <div>
                      <p className="text-xs font-semibold text-foreground">{st.guardianName}</p>
                      <p className="text-[11px] text-muted-foreground font-mono">{st.guardianPhone}</p>
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="p-3 text-right">
                    <Button variant="ghost" size="sm" asChild className="h-7 text-xs gap-1 font-medium">
                      <Link href="/portal/teacher/grades">
                        <span>Grades</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
