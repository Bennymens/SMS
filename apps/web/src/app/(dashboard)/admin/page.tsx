'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  GraduationCap,
  Users,
  CreditCard,
  Clock,
  UserPlus,
  ArrowRight,
  TrendingUp,
  School,
  Sparkles,
  Award,
  Bell,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const kpis = [
    { title: 'Total Student Enrollment', value: '840', sub: '96.6% active rate', icon: GraduationCap, color: 'text-blue-500 bg-blue-500/10' },
    { title: 'Faculty & Teachers', value: '48', sub: '1:17.5 teacher-to-student ratio', icon: Users, color: 'text-purple-500 bg-purple-500/10' },
    { title: 'Term Fee Collection', value: '$1.42M', sub: '89.4% collected • $168k pending', icon: CreditCard, color: 'text-emerald-500 bg-emerald-500/10' },
    { title: 'Daily Attendance Today', value: '95.8%', sub: '805 Present • 35 Absent', icon: Clock, color: 'text-amber-500 bg-amber-500/10' },
  ];

  const recentAdmissions = [
    { name: 'Emily Watson', id: 'SCH-2025-00001', grade: 'Grade 10-A', date: 'Oct 08, 2026', status: 'ACTIVE' },
    { name: 'Marcus Chen', id: 'SCH-2025-00002', grade: 'Grade 10-B', date: 'Oct 09, 2026', status: 'ACTIVE' },
    { name: 'Sophia Al-Mansoor', id: 'SCH-2025-00003', grade: 'Grade 11-A', date: 'Oct 10, 2026', status: 'ACTIVE' },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* 1. TOP HEADER BANNER */}
      <div className="rounded-xl border bg-gradient-to-r from-primary/10 via-background to-background p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                School Operations Command Center
              </h1>
              <Badge variant="outline" className="bg-background font-semibold">
                Super Admin
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Oakridge Academy • 2024/2025 Academic Year • Term 1 Operational Pulse
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href="/portal/teacher">
              <Button variant="outline" size="sm" className="gap-2 text-xs">
                <Users className="h-3.5 w-3.5" />
                Teacher View
              </Button>
            </Link>
            <Link href="/portal/student">
              <Button variant="outline" size="sm" className="gap-2 text-xs">
                <Sparkles className="h-3.5 w-3.5" />
                Student View
              </Button>
            </Link>
            <Link href="/students/admit">
              <Button size="sm" className="gap-2 text-xs">
                <UserPlus className="h-3.5 w-3.5" />
                Admit Student
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. CORE METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card key={idx}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{kpi.title}</p>
                  <p className="text-2xl font-bold mt-1 text-foreground">{kpi.value}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{kpi.sub}</p>
                </div>
                <div className={`rounded-xl p-3 ${kpi.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 3. RECENT ACTIVITY & PORTAL SHORTCUTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Admissions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  Recent Student Admissions
                </CardTitle>
                <CardDescription>Latest approved registrations for the term</CardDescription>
              </div>
              <Link href="/students">
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                  View All
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAdmissions.map((s, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="font-semibold text-xs">
                        {s.name.split(' ').map((n) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{s.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{s.id} • {s.grade}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <Badge variant="success" className="text-xs font-semibold">
                      {s.status}
                    </Badge>
                    <p className="text-[10px] text-muted-foreground mt-1">Admitted {s.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Module Navigation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <School className="h-4 w-4 text-primary" />
              Administrative Modules
            </CardTitle>
            <CardDescription>Direct navigation to system controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: 'Student Information System', href: '/students', count: '840 Students' },
              { label: 'Teacher Management & Rosters', href: '/teachers', count: '48 Staff' },
              { label: 'Class & Subject Allocation', href: '/classes', count: '18 Sections' },
              { label: 'Examination & Gradebook Center', href: '/exams', count: 'Term 1 Midterm' },
              { label: 'Finance & Tuition Accounting', href: '/fees', count: '$168k Pending' },
            ].map((m, idx) => (
              <Link key={idx} href={m.href}>
                <div className="flex items-center justify-between p-3 rounded-lg border bg-card hover:border-primary/50 transition-all text-xs">
                  <span className="font-medium text-foreground">{m.label}</span>
                  <Badge variant="secondary" className="text-[10px]">
                    {m.count}
                  </Badge>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
