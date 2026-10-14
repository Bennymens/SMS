'use client';

import React from 'react';
import Link from 'next/link';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  GraduationCap, Users, CreditCard, Clock, UserPlus, ArrowRight,
  TrendingUp, School, Award, Bell, BookOpen, ClipboardList,
  CheckCircle2, AlertTriangle, BarChart3, Settings, Calendar,
  FileText, Building2, Zap, Activity,
} from 'lucide-react';

// ── Static data ───────────────────────────────────────────────────────────────
const kpis = [
  {
    title: 'Total Enrollment',
    value: '840',
    sub: '+12 this term',
    trend: '+1.4%',
    up: true,
    icon: GraduationCap,
    color: 'text-foreground bg-muted',
    href: '/students',
  },
  {
    title: 'Faculty & Staff',
    value: '48',
    sub: '1 : 17.5 ratio',
    trend: 'Optimal',
    up: true,
    icon: Users,
    color: 'text-foreground bg-muted',
    href: '/admin/teachers',
  },
  {
    title: 'Fee Collection',
    value: '$1.42M',
    sub: '89.4% of target',
    trend: '+$48k this week',
    up: true,
    icon: CreditCard,
    color: 'text-foreground bg-muted',
    href: '/admin/fees',
  },
  {
    title: 'Attendance Today',
    value: '95.8%',
    sub: '805 present • 35 absent',
    trend: '-0.4% vs avg',
    up: false,
    icon: Clock,
    color: 'text-foreground bg-muted',
    href: '/admin/classes',
  },
];

const recentActivity = [
  { icon: UserPlus,    color: 'text-foreground bg-muted', title: 'New Admission', desc: 'Emily Watson enrolled in Grade 10-A', time: '2 min ago' },
  { icon: CreditCard,  color: 'text-foreground bg-muted', title: 'Fee Payment', desc: 'Marcus Chen — $1,200 received (Term 1)', time: '14 min ago' },
  { icon: AlertTriangle, color: 'text-foreground bg-muted', title: 'Low Attendance Alert', desc: 'Grade 9-B at 72% today — below threshold', time: '1h ago' },
  { icon: ClipboardList, color: 'text-foreground bg-muted', title: 'Exam Results Published', desc: 'Midterm scores uploaded by Mr. Johnson', time: '3h ago' },
  { icon: Bell,        color: 'text-foreground bg-muted', title: 'Announcement Sent', desc: 'Parents notified of upcoming Sports Day', time: '5h ago' },
];

const quickModules = [
  { label: 'Student Records', href: '/students',        icon: GraduationCap, count: '840', badge: 'Students' },
  { label: 'Teachers & Staff', href: '/admin/teachers',  icon: Users,         count: '48',  badge: 'Staff' },
  { label: 'Classes & Sections', href: '/admin/classes', icon: School,        count: '18',  badge: 'Sections' },
  { label: 'Examinations',     href: '/admin/exams',     icon: ClipboardList, count: 'Mid', badge: 'Term 1' },
  { label: 'Fee Accounting',   href: '/admin/fees',      icon: CreditCard,    count: '$168k', badge: 'Pending' },
  { label: 'Timetable',        href: '/admin/timetable', icon: Calendar,      count: 'Live', badge: 'Active' },
  { label: 'Reports',          href: '/admin/reports',   icon: FileText,      count: '12',  badge: 'Reports' },
  { label: 'Announcements',    href: '/admin/announcements', icon: Bell,      count: '3',   badge: 'New' },
];

const healthMetrics = [
  { label: 'Attendance Rate',    value: 95.8,  color: 'bg-foreground', status: 'Excellent' },
  { label: 'Fee Collection',     value: 89.4,  color: 'bg-foreground/80',    status: 'Good' },
  { label: 'Exam Pass Rate',     value: 78.2,  color: 'bg-foreground/60',  status: 'Good' },
  { label: 'Staff Utilization',  value: 92.0,  color: 'bg-foreground/70',   status: 'Excellent' },
];

// ── Component ──────────────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 p-6">

      {/* ── HERO BANNER ─────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-foreground shrink-0">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  School Operations Command Centre
                </h1>
                <Badge variant="secondary" className="text-xs font-semibold">Super Admin</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Oakridge Academy &nbsp;•&nbsp; 2024/2025 Academic Year &nbsp;•&nbsp; Term 1 &nbsp;•&nbsp;
                <span className="text-foreground font-medium">● System Operational</span>
              </p>
              <div className="flex items-center gap-3 mt-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Activity className="h-3.5 w-3.5" />
                  <span>Live Dashboard</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Zap className="h-3.5 w-3.5" />
                  <span>3 Alerts Pending</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Oct 14, 2026</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link href="/portal/teacher">
              <Button variant="outline" size="sm" className="gap-2 text-xs">
                <Users className="h-3.5 w-3.5" />
                Teacher Portal
              </Button>
            </Link>
            <Link href="/portal/finance">
              <Button variant="outline" size="sm" className="gap-2 text-xs">
                <CreditCard className="h-3.5 w-3.5" />
                Finance Portal
              </Button>
            </Link>
            <Link href="/students/admit">
              <Button size="sm" className="gap-2 text-xs bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:text-gray-900">
                <UserPlus className="h-3.5 w-3.5" />
                Admit Student
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── KPI CARDS ────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Link key={kpi.title} href={kpi.href}>
              <Card className="hover:ring-1 hover:ring-foreground/20 transition-all cursor-pointer group">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="rounded-xl p-2.5 bg-muted text-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-[10px] font-semibold text-muted-foreground"
                    >
                      {kpi.trend}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground font-medium mt-0.5 uppercase tracking-wide">{kpi.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">{kpi.sub}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* ── MAIN GRID ────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Quick Modules — 2 col span */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <School className="h-4 w-4 text-foreground" />
                  Administrative Modules
                </CardTitle>
                <CardDescription>Direct navigation to all system controls</CardDescription>
              </div>
              <Link href="/settings">
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                  <Settings className="h-3.5 w-3.5" />
                  Settings
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quickModules.map((m) => {
                const Icon = m.icon;
                return (
                  <Link key={m.label} href={m.href}>
                    <div className="group flex flex-col items-center gap-2 p-4 rounded-xl border bg-card hover:border-foreground/30 hover:bg-muted/40 transition-all text-center cursor-pointer">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted group-hover:bg-muted/80 transition-colors">
                        <Icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground leading-tight">{m.label}</p>
                        <Badge variant="secondary" className="text-[10px] mt-1">{m.count} {m.badge}</Badge>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="justify-between text-xs text-muted-foreground">
            <span>8 modules active</span>
            <Link href="/settings">
              <Button variant="ghost" size="sm" className="h-6 text-xs gap-1">
                Manage Access <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* School Health Score */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-foreground" />
              School Health Score
            </CardTitle>
            <CardDescription>Key performance indicators this term</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Overall score ring */}
            <div className="flex flex-col items-center py-4">
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-muted bg-muted/20">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">88</p>
                    <p className="text-[10px] text-muted-foreground font-medium">/100</p>
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="mt-3 text-xs">Excellent Standing</Badge>
            </div>
            <Separator />
            {healthMetrics.map((m) => (
              <div key={m.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium">{m.label}</span>
                  <span className="font-semibold text-foreground">{m.value}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-foreground transition-all"
                    style={{ width: `${m.value}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ── ACTIVITY + RECENT ADMISSIONS ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-foreground" />
                  Live Activity Feed
                </CardTitle>
                <CardDescription>Real-time system events across the school</CardDescription>
              </div>
              <Badge variant="secondary" className="text-[10px]">5 New</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            {recentActivity.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground">{item.title}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0">{item.time}</span>
                </div>
              );
            })}
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full text-xs gap-1">
              View Full Audit Log <ArrowRight className="h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>

        {/* Recent Admissions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-foreground" />
                  Recent Student Admissions
                </CardTitle>
                <CardDescription>Latest approved registrations this term</CardDescription>
              </div>
              <Link href="/students">
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                  View All <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: 'Emily Watson',         id: 'SCH-2025-00001', grade: 'Grade 10-A', date: 'Oct 08, 2026', initials: 'EW' },
              { name: 'Marcus Kwame Chen',    id: 'SCH-2025-00002', grade: 'Grade 10-B', date: 'Oct 09, 2026', initials: 'MC' },
              { name: 'Sophia Al-Mansoor',    id: 'SCH-2025-00003', grade: 'Grade 11-A', date: 'Oct 10, 2026', initials: 'SA' },
              { name: 'Ebenezer Quaye',       id: 'SCH-2025-00004', grade: 'JHS 3-Gold', date: 'Oct 12, 2026', initials: 'EQ' },
              { name: 'Gifty Owusu Asante',   id: 'SCH-2025-00005', grade: 'Grade 9-A',  date: 'Oct 13, 2026', initials: 'GO' },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-muted text-foreground font-bold text-xs">
                      {s.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{s.id} · {s.grade}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-[10px] font-semibold">
                    ACTIVE
                  </Badge>
                  <p className="text-[10px] text-muted-foreground mt-1">{s.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Link href="/students/admit" className="w-full">
              <Button size="sm" className="w-full gap-2 text-xs bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:text-gray-900">
                <UserPlus className="h-3.5 w-3.5" />
                Register New Student
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* ── BOTTOM BANNER — Subscription CTA ─────────────────────────────────── */}
      <div className="rounded-2xl border bg-card p-5 text-foreground">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-sm">You are on the Growth Plan</p>
              <p className="text-xs text-muted-foreground">Up to 1,500 students · 50 staff · Priority support</p>
            </div>
          </div>
          <Link href="/pricing">
            <Button size="sm" variant="outline" className="font-semibold gap-2 shrink-0">
              <TrendingUp className="h-3.5 w-3.5" />
              Upgrade Plan
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}
