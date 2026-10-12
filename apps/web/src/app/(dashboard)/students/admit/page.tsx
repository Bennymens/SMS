import React from 'react';
import Link from 'next/link';
import { StudentAdmissionForm } from '@/components/modules/students/StudentAdmissionForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, UserPlus } from 'lucide-react';

export default function StudentAdmissionPage() {
  // In a full implementation, these are fetched server-side from your NestJS API / Prisma
  const academicYears = [
    { id: 'ay-24-25', name: '2024 / 2025 Academic Session' },
    { id: 'ay-25-26', name: '2025 / 2026 Academic Session' },
  ];

  const classes = [
    { id: 'c-9', name: 'Grade 9' },
    { id: 'c-10', name: 'Grade 10' },
    { id: 'c-11', name: 'Grade 11' },
    { id: 'c-12', name: 'Grade 12' },
  ];

  const sections = [
    { id: 'sec-9a', name: 'Section A (Oak)', classId: 'c-9' },
    { id: 'sec-9b', name: 'Section B (Pine)', classId: 'c-9' },
    { id: 'sec-10a', name: 'Section A (Diamond)', classId: 'c-10' },
    { id: 'sec-10b', name: 'Section B (Ruby)', classId: 'c-10' },
    { id: 'sec-11a', name: 'Section A (Science)', classId: 'c-11' },
    { id: 'sec-11b', name: 'Section B (Arts)', classId: 'c-11' },
    { id: 'sec-12a', name: 'Section A (Advanced)', classId: 'c-12' },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link href="/students">
            <Button variant="ghost" size="sm" className="gap-2 text-xs mb-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Students List
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <UserPlus className="h-6 w-6 text-primary" />
            Admit New Student
          </h1>
          <p className="text-sm text-muted-foreground">
            Complete the 4-step registration workflow to generate student credentials, class enrollment, and parent linking.
          </p>
        </div>
      </div>

      <StudentAdmissionForm
        academicYears={academicYears}
        classes={classes}
        sections={sections}
      />
    </div>
  );
}
