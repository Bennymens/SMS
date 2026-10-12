'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Trophy, Award, BarChart3, Download, CheckCircle2 } from 'lucide-react';

const gradeResults = [
  { code: 'ENG-101', subject: 'English Language', credits: 4, coursework: 93, exam: 95, total: 94, grade: 'A', gpa: 4.0 },
  { code: 'MTH-101', subject: 'Mathematics', credits: 4, coursework: 86, exam: 90, total: 88, grade: 'B+', gpa: 3.5 },
  { code: 'SCI-101', subject: 'Integrated Science', credits: 4, coursework: 95, exam: 97, total: 96, grade: 'A+', gpa: 4.0 },
  { code: 'SOC-101', subject: 'Social Studies', credits: 3, coursework: 90, exam: 92, total: 91, grade: 'A-', gpa: 3.7 },
  { code: 'OWP-101', subject: 'Our World & Our People (OWOP)', credits: 3, coursework: 84, exam: 86, total: 85, grade: 'B', gpa: 3.0 },
  { code: 'ICT-101', subject: 'Computing / ICT', credits: 3, coursework: 98, exam: 98, total: 98, grade: 'A+', gpa: 4.0 },
  { code: 'RME-101', subject: 'Religious & Moral Education (RME)', credits: 3, coursework: 91, exam: 93, total: 92, grade: 'A', gpa: 4.0 },
  { code: 'TWI-101', subject: 'Ghanaian Language (Asante Twi)', credits: 3, coursework: 85, exam: 89, total: 87, grade: 'B+', gpa: 3.5 },
];

export default function StudentGradesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Trophy className="h-6 w-6 text-foreground" />
            Grades & Academic Standing
          </h1>
          <p className="text-muted-foreground text-sm">
            Cumulative GPA summary, term assessment records, and official transcript details.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Download className="h-3.5 w-3.5" />
            Download Transcript
          </Button>
          <Badge variant="secondary" className="text-xs">
            Term 1 Finalized
          </Badge>
        </div>
      </div>

      {/* GPA Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Cumulative GPA</p>
              <p className="text-3xl font-extrabold mt-1 text-foreground">3.88</p>
              <p className="text-xs text-muted-foreground font-semibold mt-0.5">Scale: 4.00</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <Award className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Total Credits Earned</p>
              <p className="text-3xl font-extrabold mt-1 text-foreground">22 / 22</p>
              <p className="text-xs text-muted-foreground mt-0.5">100% completion</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Class Rank</p>
              <p className="text-3xl font-extrabold mt-1 text-foreground">#4 / 85</p>
              <p className="text-xs text-muted-foreground mt-0.5">Top 5th percentile</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <BarChart3 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Grade Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Term Grade Sheet</CardTitle>
          <CardDescription>Academic Year 2024–2025 • Grade 10 Section A</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table className="min-w-[650px]">
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="font-semibold text-foreground">Course Code & Title</TableHead>
                <TableHead className="font-semibold text-foreground">Credits</TableHead>
                <TableHead className="font-semibold text-foreground">Coursework (40%)</TableHead>
                <TableHead className="font-semibold text-foreground">Final Exam (60%)</TableHead>
                <TableHead className="font-semibold text-foreground">Total Score</TableHead>
                <TableHead className="font-semibold text-foreground">Grade</TableHead>
                <TableHead className="font-semibold text-foreground">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gradeResults.map((item) => (
                <TableRow key={item.code} className="hover:bg-muted/20">
                  <TableCell className="p-3">
                    <span className="font-semibold block text-foreground">{item.subject}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">{item.code}</span>
                  </TableCell>
                  <TableCell className="p-3 text-muted-foreground">{item.credits}</TableCell>
                  <TableCell className="p-3 text-muted-foreground">{item.coursework}%</TableCell>
                  <TableCell className="p-3 text-muted-foreground">{item.exam}%</TableCell>
                  <TableCell className="p-3 font-bold text-foreground">{item.total}%</TableCell>
                  <TableCell className="p-3">
                    <Badge variant={item.total >= 90 ? 'success' : 'secondary'} className="font-bold">
                      {item.grade}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-3 font-semibold text-foreground">{item.gpa.toFixed(1)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
