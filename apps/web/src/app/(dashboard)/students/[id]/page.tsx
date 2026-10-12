'use client';

import React, { useState, use } from 'react';
import { StudentProfileHeader } from '@/components/modules/students/StudentProfileHeader';
import { StudentAttendanceSummaryCard } from '@/components/modules/students/StudentAttendanceSummaryCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  User,
  Calendar,
  BookOpen,
  DollarSign,
  FileText,
  ShieldCheck,
  Download,
  AlertCircle,
  Clock,
  Heart,
} from 'lucide-react';

export default function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const studentId = resolvedParams.id;
  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'academics' | 'fees' | 'documents'>('overview');

  // Realistic sample profile data
  const student = {
    id: studentId,
    admissionNo: 'SCH-2025-00001',
    firstName: 'Emily',
    lastName: 'Watson',
    fullName: 'Emily Watson',
    email: 'emily.watson@student.school.edu',
    phone: '+1 (555) 019-2831',
    status: 'ACTIVE' as const,
    gender: 'FEMALE' as const,
    dateOfBirth: '2010-05-14',
    bloodGroup: 'O+',
    nationality: 'American',
    religion: 'Christian',
    admissionDate: '2025-09-01',
    currentClass: { name: 'Grade 10', level: 10 },
    currentSection: { name: 'A' },
    address: {
      street: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'Oregon',
      country: 'United States',
      zipCode: '97477',
    },
    medicalInfo: {
      allergies: ['Peanuts', 'Penicillin'],
      conditions: ['Mild Asthmatic'],
      doctorName: 'Dr. Julius Hibbert',
      doctorPhone: '+1 (555) 762-1100',
      notes: 'Carries emergency inhaler in backpack at all times.',
    },
    guardians: [
      {
        relationship: 'Mother',
        name: 'Sarah Watson',
        email: 'sarah.watson@example.com',
        phone: '+1 (555) 983-1122',
        isPrimary: true,
        canPickup: true,
      },
      {
        relationship: 'Father',
        name: 'Mark Watson',
        email: 'mark.watson@example.com',
        phone: '+1 (555) 983-1123',
        isPrimary: false,
        canPickup: true,
      },
    ],
    documents: [
      {
        id: 'doc-1',
        name: 'Official Birth Certificate.pdf',
        type: 'BIRTH_CERTIFICATE',
        size: '1.4 MB',
        uploadedAt: '2025-08-20',
        isVerified: true,
      },
      {
        id: 'doc-2',
        name: 'Immunization & Health Record.pdf',
        type: 'MEDICAL_RECORD',
        size: '850 KB',
        uploadedAt: '2025-08-22',
        isVerified: true,
      },
      {
        id: 'doc-3',
        name: 'Grade 9 Transfer Transcript.pdf',
        type: 'TRANSCRIPT',
        size: '2.1 MB',
        uploadedAt: '2025-08-25',
        isVerified: false,
      },
    ],
    feeRecords: [
      {
        id: 'fee-1',
        title: 'Term 1 Tuition & Lab Fee',
        amountDue: 2400,
        amountPaid: 2400,
        status: 'PAID',
        dueDate: '2025-09-15',
      },
      {
        id: 'fee-2',
        title: 'Term 2 Tuition Fee',
        amountDue: 2200,
        amountPaid: 1100,
        status: 'PARTIAL',
        dueDate: '2026-01-15',
      },
    ],
  };

  const attendanceSummary = {
    present: 88,
    absent: 3,
    late: 4,
    excused: 1,
    total: 96,
    percentage: 96,
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header card with student status and photo */}
      <StudentProfileHeader student={student} />

      {/* Navigation tabs */}
      <div className="flex border-b border-border space-x-2 overflow-x-auto text-sm">
        {[
          { key: 'overview', label: 'Overview & Profile', icon: User },
          { key: 'attendance', label: 'Attendance', icon: Clock },
          { key: 'academics', label: 'Academics & Grades', icon: BookOpen },
          { key: 'fees', label: 'Fee Records', icon: DollarSign },
          { key: 'documents', label: 'Documents & Files', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 border-b-2 py-3 px-4 font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'border-primary text-primary font-semibold'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT */}

      {/* 1. OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Personal & Demographic details */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Demographics & Student Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground uppercase font-semibold">Date of Birth</dt>
                  <dd className="mt-1 font-medium">{student.dateOfBirth} (Age 15)</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground uppercase font-semibold">Gender</dt>
                  <dd className="mt-1 font-medium">{student.gender}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground uppercase font-semibold">Blood Group</dt>
                  <dd className="mt-1 font-medium">{student.bloodGroup}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground uppercase font-semibold">Nationality</dt>
                  <dd className="mt-1 font-medium">{student.nationality}</dd>
                </div>
                <div className="sm:col-span-2 pt-2 border-t">
                  <dt className="text-xs text-muted-foreground uppercase font-semibold">Residential Address</dt>
                  <dd className="mt-1 font-medium">
                    {student.address.street}, {student.address.city}, {student.address.state} {student.address.zipCode}, {student.address.country}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Medical Alerts Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <Heart className="h-4 w-4" />
                Medical & Allergies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <span className="text-xs text-muted-foreground font-semibold">Known Allergies:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {student.medicalInfo.allergies.map((allergy) => (
                    <Badge key={allergy} variant="destructive">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-semibold">Conditions:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {student.medicalInfo.conditions.map((c) => (
                    <Badge key={c} variant="warning">
                      {c}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t">
                <span className="text-xs text-muted-foreground font-semibold">Doctor:</span>
                <p className="mt-0.5 font-medium">{student.medicalInfo.doctorName}</p>
                <p className="text-xs text-muted-foreground">{student.medicalInfo.doctorPhone}</p>
              </div>
              <p className="text-xs text-muted-foreground italic bg-muted/40 p-2 rounded">
                &ldquo;{student.medicalInfo.notes}&rdquo;
              </p>
            </CardContent>
          </Card>

          {/* Guardians / Parents */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="text-base">Authorized Parents & Guardians</CardTitle>
              <CardDescription>
                Emergency contact sequence and authorized campus pickup individuals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {student.guardians.map((g, idx) => (
                  <div key={idx} className="flex items-start justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{g.name}</span>
                        <Badge variant={g.isPrimary ? 'default' : 'secondary'}>
                          {g.relationship}
                        </Badge>
                        {g.isPrimary && <Badge variant="success">Primary</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">{g.email}</p>
                      <p className="text-xs text-muted-foreground">{g.phone}</p>
                    </div>
                    {g.canPickup && (
                      <Badge variant="outline" className="text-xs gap-1">
                        <ShieldCheck className="h-3 w-3 text-emerald-500" />
                        Pickup Auth
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 2. ATTENDANCE */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <StudentAttendanceSummaryCard summary={attendanceSummary} />
        </div>
      )}

      {/* 3. ACADEMICS */}
      {activeTab === 'academics' && (
        <Card>
          <CardHeader>
            <CardTitle>Enrolled Subjects & Current Performance</CardTitle>
            <CardDescription>2024/2025 Academic Year • Grade 10 Section A</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { subject: 'Advanced Mathematics', code: 'MTH-101', teacher: 'Dr. Aris Thorne', grade: '94%', letter: 'A' },
                { subject: 'Physics & Mechanics', code: 'PHY-102', teacher: 'Mrs. Elena Rostova', grade: '89%', letter: 'B+' },
                { subject: 'World Literature', code: 'ENG-101', teacher: 'Mr. David Brooks', grade: '96%', letter: 'A+' },
                { subject: 'Chemistry', code: 'CHM-101', teacher: 'Dr. Sarah Connor', grade: '91%', letter: 'A-' },
              ].map((sub, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-lg border bg-card hover:bg-muted/30">
                  <div>
                    <p className="font-semibold text-sm">{sub.subject}</p>
                    <p className="text-xs text-muted-foreground">{sub.code} • Teacher: {sub.teacher}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold">{sub.grade}</span>
                    <Badge variant="secondary" className="ml-2 font-bold">{sub.letter}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 4. FEES */}
      {activeTab === 'fees' && (
        <Card>
          <CardHeader>
            <CardTitle>Fee Ledgers & Invoices</CardTitle>
            <CardDescription>Track payments, balances, and generate transaction receipts.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {student.feeRecords.map((f) => (
                <div key={f.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-semibold text-sm">{f.title}</p>
                    <p className="text-xs text-muted-foreground">Due: {f.dueDate}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-bold">${f.amountPaid.toLocaleString()} / ${f.amountDue.toLocaleString()}</p>
                      <Badge variant={f.status === 'PAID' ? 'success' : 'warning'}>
                        {f.status}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
                      <Download className="h-3.5 w-3.5" />
                      Receipt
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 5. DOCUMENTS */}
      {activeTab === 'documents' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Student Document Repository</CardTitle>
                <CardDescription>Verified admission documents and health clearances.</CardDescription>
              </div>
              <Button size="sm" className="gap-2">
                Upload New Document
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {student.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3.5 rounded-lg border bg-card">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.size} • Uploaded {doc.uploadedAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={doc.isVerified ? 'success' : 'warning'}>
                      {doc.isVerified ? 'Verified' : 'Pending Verification'}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
