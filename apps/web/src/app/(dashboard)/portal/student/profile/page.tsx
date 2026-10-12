'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Mail, Phone, MapPin, Calendar, ShieldCheck, Heart, GraduationCap, Edit } from 'lucide-react';

export default function StudentProfilePage() {
  const student = {
    name: 'Emily Watson',
    admissionNo: 'SCH-2025-00001',
    grade: 'Grade 10 • Section A',
    email: 'emily.watson@oakridge.edu',
    phone: '+1 (555) 234-8901',
    dob: 'May 14, 2010',
    bloodGroup: 'O+',
    address: '742 Evergreen Terrace, Springfield, OR 97477',
    guardian: 'Mrs. Margaret Watson',
    guardianRelation: 'Mother',
    guardianPhone: '+1 (555) 987-6543',
    guardianEmail: 'margaret.watson@gmail.com',
    emergencyContact: '+1 (555) 987-6544 (Dr. Robert Watson, Father)',
    enrollmentDate: 'September 01, 2021',
    status: 'Active',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Users className="h-6 w-6 text-foreground" />
            Student Profile
          </h1>
          <p className="text-muted-foreground text-sm">
            Personal records, family contacts, academic enrollment information, and medical overview.
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
          <Edit className="h-3.5 w-3.5" />
          Request Info Update
        </Button>
      </div>

      {/* Header Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <Avatar className="h-20 w-20 rounded-2xl border-2 border-border shadow-sm">
              <AvatarFallback className="rounded-2xl text-xl font-bold bg-muted text-foreground">
                EW
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h2 className="text-xl font-bold text-foreground">{student.name}</h2>
                <Badge variant="success" className="w-fit mx-auto sm:mx-0 text-xs">
                  {student.status}
                </Badge>
                <Badge variant="outline" className="w-fit mx-auto sm:mx-0 text-xs">
                  {student.grade}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground font-mono">Admission ID: {student.admissionNo}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 pt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  {student.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  {student.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  Springfield, OR
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Academic Enrollment Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-foreground" />
              Enrollment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Current Class:</span>
              <span className="font-semibold text-foreground">Grade 10, Section A</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Academic Year:</span>
              <span className="font-semibold text-foreground">2024 / 2025</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Date of Admission:</span>
              <span className="font-semibold text-foreground">{student.enrollmentDate}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Homeroom Advisor:</span>
              <span className="font-semibold text-foreground">Dr. Thorne (Room 204)</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-muted-foreground">Curriculum Track:</span>
              <span className="font-semibold text-foreground">Standard College Prep / STEM</span>
            </div>
          </CardContent>
        </Card>

        {/* Guardian & Emergency Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-foreground" />
              Parent & Guardian Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Primary Guardian:</span>
              <span className="font-semibold text-foreground">{student.guardian} ({student.guardianRelation})</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Guardian Phone:</span>
              <span className="font-semibold text-foreground">{student.guardianPhone}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Guardian Email:</span>
              <span className="font-semibold text-foreground">{student.guardianEmail}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Emergency Contact:</span>
              <span className="font-semibold text-foreground">{student.emergencyContact}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-muted-foreground">Home Address:</span>
              <span className="font-semibold text-foreground">{student.address}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
