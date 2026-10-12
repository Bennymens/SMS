'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Settings,
  School,
  GraduationCap,
  Shield,
  Database,
  Bell,
  Save,
  CheckCircle2,
  Lock,
  Download,
  RefreshCw,
  Sliders,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'institution' | 'academics' | 'security' | 'backup'>('institution');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [institutionData, setInstitutionData] = useState({
    schoolName: 'EduManage International Academy',
    schoolCode: 'SCH-OAK-2024',
    academicYear: '2024 / 2025',
    currentTerm: 'Term 1 (Fall Semester)',
    principalName: 'Dr. Arthur Thorne',
    contactEmail: 'admin@oakridge.edu',
    contactPhone: '+1 (555) 301-4400',
    address: '100 Academic Boulevard, Suite 400',
    currency: 'USD ($)',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Settings className="h-6 w-6 text-foreground" />
            Institution & System Settings
          </h1>
          <p className="text-muted-foreground text-sm">
            Configure school identity, academic calendars, grading scales, role permissions, and database snapshots.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" className="text-xs">
            System Operational • v2.4.0
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b pb-3 overflow-x-auto">
        <Button
          variant={activeTab === 'institution' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('institution')}
          className="text-xs gap-1.5"
        >
          <School className="h-3.5 w-3.5" />
          Institution Profile
        </Button>
        <Button
          variant={activeTab === 'academics' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('academics')}
          className="text-xs gap-1.5"
        >
          <GraduationCap className="h-3.5 w-3.5" />
          Academic & Grading
        </Button>
        <Button
          variant={activeTab === 'security' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('security')}
          className="text-xs gap-1.5"
        >
          <Shield className="h-3.5 w-3.5" />
          Access & Roles
        </Button>
        <Button
          variant={activeTab === 'backup' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('backup')}
          className="text-xs gap-1.5"
        >
          <Database className="h-3.5 w-3.5" />
          Backups & Maintenance
        </Button>
      </div>

      {savedSuccess && (
        <div className="flex items-center gap-2 p-3 text-xs rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>System configuration updated successfully.</span>
        </div>
      )}

      {/* TAB 1: INSTITUTION */}
      {activeTab === 'institution' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <School className="h-4 w-4 text-foreground" />
              School Details & Academic Cycle
            </CardTitle>
            <CardDescription>Primary institution metadata displayed on report cards and fee invoices.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Institution Legal Name</label>
                  <input
                    type="text"
                    value={institutionData.schoolName}
                    onChange={(e) => setInstitutionData({ ...institutionData, schoolName: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Institutional Code</label>
                  <input
                    type="text"
                    value={institutionData.schoolCode}
                    onChange={(e) => setInstitutionData({ ...institutionData, schoolCode: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Active Academic Year</label>
                  <input
                    type="text"
                    value={institutionData.academicYear}
                    onChange={(e) => setInstitutionData({ ...institutionData, academicYear: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Current Instructional Term</label>
                  <input
                    type="text"
                    value={institutionData.currentTerm}
                    onChange={(e) => setInstitutionData({ ...institutionData, currentTerm: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Head of School / Principal</label>
                  <input
                    type="text"
                    value={institutionData.principalName}
                    onChange={(e) => setInstitutionData({ ...institutionData, principalName: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Default Accounting Currency</label>
                  <select
                    value={institutionData.currency}
                    onChange={(e) => setInstitutionData({ ...institutionData, currency: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                  >
                    <option>USD ($)</option>
                    <option>GHS (GH₵)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Administrative Contact Email</label>
                  <input
                    type="email"
                    value={institutionData.contactEmail}
                    onChange={(e) => setInstitutionData({ ...institutionData, contactEmail: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Switchboard Phone</label>
                  <input
                    type="text"
                    value={institutionData.contactPhone}
                    onChange={(e) => setInstitutionData({ ...institutionData, contactPhone: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-semibold text-foreground">Campus Physical Address</label>
                  <input
                    type="text"
                    value={institutionData.address}
                    onChange={(e) => setInstitutionData({ ...institutionData, address: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button type="submit" size="sm" className="gap-1.5 text-xs">
                  <Save className="h-3.5 w-3.5" />
                  Save Institution Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* TAB 2: ACADEMIC & GRADING */}
      {activeTab === 'academics' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sliders className="h-4 w-4 text-foreground" />
                Standard Grading Scheme & Cutoffs
              </CardTitle>
              <CardDescription>System-wide grading thresholds applied when computing cumulative grade point averages (GPA).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                <div className="p-3 rounded-lg border bg-muted/30 text-center">
                  <p className="font-bold text-lg text-emerald-600">A+</p>
                  <p className="text-[11px] text-muted-foreground">90% - 100%</p>
                  <p className="text-[10px] font-semibold mt-1">4.0 GPA</p>
                </div>
                <div className="p-3 rounded-lg border bg-muted/30 text-center">
                  <p className="font-bold text-lg text-emerald-600">A</p>
                  <p className="text-[11px] text-muted-foreground">80% - 89%</p>
                  <p className="text-[10px] font-semibold mt-1">3.7 GPA</p>
                </div>
                <div className="p-3 rounded-lg border bg-muted/30 text-center">
                  <p className="font-bold text-lg text-blue-600">B</p>
                  <p className="text-[11px] text-muted-foreground">70% - 79%</p>
                  <p className="text-[10px] font-semibold mt-1">3.0 GPA</p>
                </div>
                <div className="p-3 rounded-lg border bg-muted/30 text-center">
                  <p className="font-bold text-lg text-amber-600">C</p>
                  <p className="text-[11px] text-muted-foreground">60% - 69%</p>
                  <p className="text-[10px] font-semibold mt-1">2.0 GPA</p>
                </div>
                <div className="p-3 rounded-lg border bg-muted/30 text-center">
                  <p className="font-bold text-lg text-orange-600">D</p>
                  <p className="text-[11px] text-muted-foreground">50% - 59%</p>
                  <p className="text-[10px] font-semibold mt-1">1.0 GPA</p>
                </div>
                <div className="p-3 rounded-lg border bg-muted/30 text-center">
                  <p className="font-bold text-lg text-destructive">F</p>
                  <p className="text-[11px] text-muted-foreground">&lt; 50%</p>
                  <p className="text-[10px] font-semibold mt-1">0.0 GPA</p>
                </div>
              </div>

              <div className="pt-3 border-t space-y-3">
                <div className="flex items-center justify-between py-1">
                  <div>
                    <p className="font-semibold text-foreground">Minimum Passing Threshold</p>
                    <p className="text-muted-foreground">Threshold required to earn academic credit for a course</p>
                  </div>
                  <Badge variant="outline">50% (Grade D)</Badge>
                </div>
                <div className="flex items-center justify-between py-1">
                  <div>
                    <p className="font-semibold text-foreground">Minimum Attendance for Exam Clearance</p>
                    <p className="text-muted-foreground">Attendance percentage required to sit final term examinations</p>
                  </div>
                  <Badge variant="outline">80% Attendance</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 3: ACCESS & ROLES */}
      {activeTab === 'security' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4 text-foreground" />
              Role Permissions & System Access
            </CardTitle>
            <CardDescription>Security policies governing student, teacher, and parent portal access.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-semibold text-foreground">Enforce 2FA on Faculty & Admin Accounts</p>
                <p className="text-muted-foreground">Require time-based one-time password on all staff logins</p>
              </div>
              <Badge variant="success">Enforced</Badge>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-semibold text-foreground">Student Portal Self-Service Password Reset</p>
                <p className="text-muted-foreground">Allow students to reset credentials via registered email</p>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-semibold text-foreground">Teacher Gradebook Modification Window</p>
                <p className="text-muted-foreground">Lock teacher grade edits 48 hours after exam board submission</p>
              </div>
              <Badge variant="secondary">Auto-Lock Enabled</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TAB 4: BACKUPS */}
      {activeTab === 'backup' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Database className="h-4 w-4 text-foreground" />
              Automated Snapshots & Database Maintenance
            </CardTitle>
            <CardDescription>PostgreSQL database snapshots, transaction journals, and audit exports.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="p-4 rounded-xl border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-foreground">Latest Automated Snapshot</p>
                <p className="text-muted-foreground">October 12, 2026 at 03:00 AM • Size: 42.8 MB • Status: Healthy</p>
              </div>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs w-fit">
                <Download className="h-3.5 w-3.5" />
                Download Dump
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button size="sm" className="gap-1.5 text-xs">
                <RefreshCw className="h-3.5 w-3.5" />
                Trigger Manual Snapshot Now
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                Export System Audit Logs (CSV)
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
