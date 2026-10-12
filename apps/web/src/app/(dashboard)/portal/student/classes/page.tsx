'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { School, BookOpen, Clock, MapPin, Users, FileText } from 'lucide-react';

const classes = [
  {
    id: 'ENG-GES',
    name: 'English Language',
    code: 'ENG-101',
    teacher: 'Mrs. Mensah',
    room: 'Room 10',
    schedule: 'Mon, Tue, Wed, Fri • 08:00 AM',
    studentsCount: 30,
    progress: 78,
    grade: 'A',
    score: 94,
    syllabus: 'Grammar, Essay Writing & Comprehension',
  },
  {
    id: 'MTH-GES',
    name: 'Mathematics',
    code: 'MTH-101',
    teacher: 'Mr. Osei',
    room: 'Room 10',
    schedule: 'Mon, Wed, Fri • 09:00 AM',
    studentsCount: 30,
    progress: 72,
    grade: 'B+',
    score: 88,
    syllabus: 'Algebra, Geometry & Statistics',
  },
  {
    id: 'SCI-GES',
    name: 'Integrated Science',
    code: 'SCI-101',
    teacher: 'Dr. Appiah',
    room: 'Science Lab 1',
    schedule: 'Mon, Tue, Thu • 10:05 AM',
    studentsCount: 30,
    progress: 85,
    grade: 'A+',
    score: 96,
    syllabus: 'Life Cycles, Matter & Energy Systems',
  },
  {
    id: 'SOC-GES',
    name: 'Social Studies',
    code: 'SOC-101',
    teacher: 'Mr. Agyeman',
    room: 'Room 10',
    schedule: 'Tue, Wed, Thu • 11:05 AM',
    studentsCount: 30,
    progress: 80,
    grade: 'A-',
    score: 91,
    syllabus: 'Our Environment, Governance & Nationhood',
  },
  {
    id: 'OWP-GES',
    name: 'Our World & Our People (OWOP)',
    code: 'OWP-101',
    teacher: 'Madam Boateng',
    room: 'Room 10',
    schedule: 'Mon, Wed, Thu • 11:05 AM',
    studentsCount: 30,
    progress: 82,
    grade: 'B',
    score: 85,
    syllabus: 'All About Us, My Country Ghana & Our Beliefs',
  },
  {
    id: 'ICT-GES',
    name: 'Computing / ICT',
    code: 'ICT-101',
    teacher: 'Mr. Boadu',
    room: 'ICT Lab 2',
    schedule: 'Tue, Fri • 01:00 PM',
    studentsCount: 30,
    progress: 90,
    grade: 'A+',
    score: 98,
    syllabus: 'Word Processing, Spreadsheets & Digital Literacy',
  },
  {
    id: 'RME-GES',
    name: 'Religious & Moral Education (RME)',
    code: 'RME-101',
    teacher: 'Rev. Addo',
    room: 'Room 10',
    schedule: 'Mon, Thu • 01:00 PM',
    studentsCount: 30,
    progress: 75,
    grade: 'A',
    score: 92,
    syllabus: 'God & Creation, Religious Practices & Moral Values',
  },
  {
    id: 'TWI-GES',
    name: 'Ghanaian Language (Asante Twi)',
    code: 'TWI-101',
    teacher: 'Nana Yaw',
    room: 'Room 10',
    schedule: 'Thu, Fri • 11:05 AM',
    studentsCount: 30,
    progress: 70,
    grade: 'B+',
    score: 87,
    syllabus: 'Kasasua (Grammar), Akenkan & Amammere (Culture)',
  },
];

export default function StudentClassesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <School className="h-6 w-6 text-foreground" />
            My Enrolled Classes
          </h1>
          <p className="text-muted-foreground text-sm">
            View course rosters, assigned faculty, room locations, and active curriculum progress.
          </p>
        </div>
        <Badge variant="secondary" className="text-xs">
          6 Active Courses
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {classes.map((cls) => (
          <Card key={cls.id} className="flex flex-col hover:border-primary/50 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">{cls.code}</span>
                  <CardTitle className="text-base font-semibold mt-0.5">{cls.name}</CardTitle>
                </div>
                <Badge variant={cls.score >= 90 ? 'success' : 'secondary'} className="font-bold text-xs">
                  {cls.grade} ({cls.score}%)
                </Badge>
              </div>
              <CardDescription className="text-xs mt-1">Instructor: {cls.teacher}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-1 flex flex-col justify-between pt-0">
              <div className="space-y-2 text-xs text-muted-foreground">
                <p className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span>{cls.room}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span>{cls.schedule}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 shrink-0" />
                  <span>{cls.studentsCount} classmates</span>
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Syllabus Covered</span>
                  <span className="font-semibold text-foreground">{cls.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${cls.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Syllabus
                </Button>
                <Button size="sm" className="w-full text-xs">
                  Classwork
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
