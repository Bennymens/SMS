'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { StudentStatusBadge } from './StudentStatusBadge';
import { StudentStatus } from '@school-management/shared/types/student';
import { Mail, Phone, Calendar, Edit3, Printer, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface StudentProfileHeaderProps {
  student: {
    id: string;
    admissionNo: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phone?: string;
    avatar?: string;
    status: StudentStatus;
    admissionDate: string;
    currentClass?: { name: string } | null;
    currentSection?: { name: string } | null;
  };
}

export const StudentProfileHeader: React.FC<StudentProfileHeaderProps> = ({ student }) => {
  return (
    <div className="space-y-4">
      <Link href="/students">
        <Button variant="ghost" size="sm" className="gap-2 text-xs mb-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Students List
        </Button>
      </Link>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Avatar className="h-20 w-20 ring-2 ring-primary/20">
              <AvatarImage src={student.avatar} alt={student.fullName} />
              <AvatarFallback className="text-xl font-bold bg-primary/10 text-primary">
                {student.firstName[0]}
                {student.lastName[0]}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  {student.fullName}
                </h1>
                <StudentStatusBadge status={student.status} />
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="font-mono bg-muted/60 px-2 py-0.5 rounded font-semibold text-foreground">
                  {student.admissionNo}
                </span>

                {student.currentClass && (
                  <span>
                    Class: <strong className="text-foreground">{student.currentClass.name}</strong>
                    {student.currentSection && ` • Section ${student.currentSection.name}`}
                  </span>
                )}

                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Admitted {new Date(student.admissionDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  {student.email}
                </span>
                {student.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    {student.phone}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 text-xs">
              <Printer className="h-3.5 w-3.5" />
              Print Record
            </Button>
            <Button size="sm" className="gap-2 text-xs">
              <Edit3 className="h-3.5 w-3.5" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
