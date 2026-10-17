'use client';

import React, { useState } from 'react';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Trophy, Search, Plus, Download, Award, Users, DollarSign,
  CheckCircle2, Clock, Filter, Sparkles, FileText,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toast';

interface Scholarship {
  id: string;
  studentName: string;
  studentId: string;
  grade: string;
  type: 'Merit-Based' | 'Need-Based' | 'Staff Dependent' | 'Sports Excellence';
  discountPct: string;
  amountWaived: string;
  approvedDate: string;
  status: 'ACTIVE' | 'PENDING' | 'EXPIRED';
  sponsor: string;
}

const scholarshipsData: Scholarship[] = [
  { id: 'SCH-01', studentName: 'Amina Bello', studentId: 'SCH-2025-00012', grade: 'Grade 11-A', type: 'Merit-Based', discountPct: '100%', amountWaived: '$1,200', approvedDate: 'Sep 01, 2026', status: 'ACTIVE', sponsor: 'Academic Excellence Fund' },
  { id: 'SCH-02', studentName: 'Daniel Kwesi', studentId: 'SCH-2025-00045', grade: 'Grade 10-B', type: 'Need-Based', discountPct: '75%', amountWaived: '$900', approvedDate: 'Sep 05, 2026', status: 'ACTIVE', sponsor: 'Community Support Grant' },
  { id: 'SCH-03', studentName: 'Fatima Zahra', studentId: 'SCH-2025-00078', grade: 'Grade 12-A', type: 'Merit-Based', discountPct: '100%', amountWaived: '$1,400', approvedDate: 'Aug 28, 2026', status: 'ACTIVE', sponsor: 'STEM Leaders Initiative' },
  { id: 'SCH-04', studentName: 'Emmanuel Mensah', studentId: 'SCH-2025-00103', grade: 'Grade 9-A', type: 'Sports Excellence', discountPct: '50%', amountWaived: '$600', approvedDate: 'Sep 10, 2026', status: 'ACTIVE', sponsor: 'Athletics Department' },
  { id: 'SCH-05', studentName: 'Grace Acheampong', studentId: 'SCH-2025-00134', grade: 'Grade 11-B', type: 'Staff Dependent', discountPct: '50%', amountWaived: '$600', approvedDate: 'Aug 20, 2026', status: 'ACTIVE', sponsor: 'Faculty Benefit Program' },
  { id: 'SCH-06', studentName: 'Tariq Al-Fassi', studentId: 'SCH-2025-00167', grade: 'Grade 10-A', type: 'Need-Based', discountPct: '50%', amountWaived: '$600', approvedDate: 'Sep 12, 2026', status: 'ACTIVE', sponsor: 'PTA Endowment' },
  { id: 'SCH-07', studentName: 'Yaa Asantewaa', studentId: 'SCH-2025-00192', grade: 'Grade 12-B', type: 'Merit-Based', discountPct: '100%', amountWaived: '$1,400', approvedDate: 'Sep 02, 2026', status: 'ACTIVE', sponsor: 'Academic Excellence Fund' },
  { id: 'SCH-08', studentName: 'Kofi Owusu', studentId: 'SCH-2025-00215', grade: 'Grade 9-B', type: 'Sports Excellence', discountPct: '25%', amountWaived: '$300', approvedDate: 'Sep 15, 2026', status: 'PENDING', sponsor: 'Athletics Department' },
  { id: 'SCH-09', studentName: 'Naomi Tetteh', studentId: 'SCH-2025-00238', grade: 'Grade 10-B', type: 'Need-Based', discountPct: '50%', amountWaived: '$600', approvedDate: 'Aug 15, 2026', status: 'ACTIVE', sponsor: 'Community Support Grant' },
  { id: 'SCH-10', studentName: 'David Annan', studentId: 'SCH-2025-00261', grade: 'Grade 11-A', type: 'Merit-Based', discountPct: '50%', amountWaived: '$600', approvedDate: 'Sep 08, 2026', status: 'ACTIVE', sponsor: 'Alumni Association' },
  { id: 'SCH-11', studentName: 'Zainab Ibrahim', studentId: 'SCH-2025-00289', grade: 'Grade 12-A', type: 'Staff Dependent', discountPct: '50%', amountWaived: '$700', approvedDate: 'Aug 25, 2026', status: 'ACTIVE', sponsor: 'Faculty Benefit Program' },
  { id: 'SCH-12', studentName: 'Joshua Osei', studentId: 'SCH-2025-00311', grade: 'Grade 9-A', type: 'Need-Based', discountPct: '100%', amountWaived: '$1,200', approvedDate: 'Jan 10, 2026', status: 'EXPIRED', sponsor: 'Emergency Aid' },
];

const statusBadge: Record<string, 'default' | 'secondary' | 'destructive'> = {
  ACTIVE: 'default',
  PENDING: 'secondary',
  EXPIRED: 'destructive',
};

export default function ScholarshipsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  const [openAwardSheet, setOpenAwardSheet] = useState(false);
  const [openExportSheet, setOpenExportSheet] = useState(false);

  // Form states for award
  const [awardStudent, setAwardStudent] = useState('');
  const [awardGrade, setAwardGrade] = useState('Grade 10-A');
  const [awardType, setAwardType] = useState('Merit-Based');
  const [awardPct, setAwardPct] = useState('50%');
  const [awardSponsor, setAwardSponsor] = useState('Alumni Trust Fund');

  const handleAwardScholarship = (e: React.FormEvent) => {
    e.preventDefault();
    if (!awardStudent.trim()) {
      toast.error('Missing student name', { description: 'Please enter the beneficiary student name.' });
      return;
    }
    toast.success('Scholarship awarded successfully', {
      description: `${awardPct} ${awardType} tuition grant allocated to ${awardStudent}.`,
    });
    setOpenAwardSheet(false);
    setAwardStudent('');
  };

  const handleExportBeneficiaries = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Beneficiaries roll exported', {
      description: 'Full scholarship recipient roll and sponsorship ledger downloaded.',
    });
    setOpenExportSheet(false);
  };

  const filtered = scholarshipsData.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(search.toLowerCase()) ||
      item.studentId.toLowerCase().includes(search.toLowerCase()) ||
      item.sponsor.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'ALL' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const activeCount = scholarshipsData.filter((s) => s.status === 'ACTIVE').length;
  const totalWaivedNum = scholarshipsData
    .filter((s) => s.status === 'ACTIVE')
    .reduce((acc, curr) => acc + parseInt(curr.amountWaived.replace(/[^0-9]/g, ''), 10), 0);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Scholarships & Waivers</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Oakridge Academy · 2024/2025 Academic Year · Tuition Support Management
          </p>
        </div>
        {/* Far-right vertically arranged pill buttons */}
        <div className="flex flex-col items-end gap-2.5 shrink-0 py-1">
          <Button
            className="rounded-full w-48 h-9 text-xs font-semibold gap-2 shadow-xs justify-center"
            onClick={() => setOpenAwardSheet(true)}
          >
            <Plus className="w-4 h-4 shrink-0" />
            Award Scholarship
          </Button>
          <Button
            variant="outline"
            className="rounded-full w-48 h-9 text-xs font-medium gap-2 shadow-2xs justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50"
            onClick={() => setOpenExportSheet(true)}
          >
            <Download className="w-4 h-4 shrink-0" />
            Export Beneficiaries
          </Button>
        </div>
      </div>

      {/* KPI Cards with neutral icon styling */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Active Beneficiaries</p>
              <p className="text-2xl font-bold mt-1 text-foreground">{activeCount}</p>
              <p className="text-xs text-muted-foreground mt-0.5">12 total grants</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <Users className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Total Waived (Term)</p>
              <p className="text-2xl font-bold mt-1 text-foreground">${totalWaivedNum.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-0.5">1.7% of total billing</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <DollarSign className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Merit-Based Awards</p>
              <p className="text-2xl font-bold mt-1 text-foreground">
                {scholarshipsData.filter((s) => s.type === 'Merit-Based').length}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Academic excellence</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <Trophy className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Need & Sports Grants</p>
              <p className="text-2xl font-bold mt-1 text-foreground">
                {scholarshipsData.filter((s) => s.type === 'Need-Based' || s.type === 'Sports Excellence').length}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Equity & athletic funds</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <Award className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="border">
        <CardHeader className="pb-3 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base font-semibold">Scholarship Recipients</CardTitle>
              <CardDescription className="text-xs">
                Active tuition discounts, endowment allocations, and fee waivers
              </CardDescription>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-48 sm:w-60">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search student or sponsor..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-8 pl-8 pr-3 text-xs rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              <div className="flex gap-1">
                {(['ALL', 'Merit-Based', 'Need-Based', 'Staff Dependent', 'Sports Excellence'] as const).map((t) => (
                  <Button
                    key={t}
                    size="sm"
                    variant={typeFilter === t ? 'default' : 'outline'}
                    className="h-8 text-xs px-2.5"
                    onClick={() => setTypeFilter(t)}
                  >
                    {t === 'ALL' ? 'All Types' : t.replace(' Excellence', '')}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Student</TableHead>
                <TableHead className="text-xs">Grade</TableHead>
                <TableHead className="text-xs">Award Type</TableHead>
                <TableHead className="text-xs">Coverage</TableHead>
                <TableHead className="text-xs">Amount Waived</TableHead>
                <TableHead className="text-xs">Sponsoring Fund</TableHead>
                <TableHead className="text-xs">Granted Date</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => {
                const initials = item.studentName
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('');

                return (
                  <TableRow key={item.id} className="hover:bg-muted/40 transition-colors">
                    <TableCell className="py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8 text-xs bg-muted">
                          <AvatarFallback className="text-[11px] font-semibold text-muted-foreground">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs font-medium text-foreground">{item.studentName}</p>
                          <p className="text-[10px] text-muted-foreground font-mono">{item.studentId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{item.grade}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] font-normal">
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs font-semibold text-foreground">{item.discountPct}</TableCell>
                    <TableCell className="text-xs font-bold text-foreground">{item.amountWaived}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{item.sponsor}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{item.approvedDate}</TableCell>
                    <TableCell>
                      <Badge variant={statusBadge[item.status]} className="text-[10px]">
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-7 text-xs px-2 text-muted-foreground hover:text-foreground">
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-xs text-muted-foreground">
                    No scholarship recipients found matching criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Award Scholarship Sheet (Sliding from Right) */}
      <Sheet open={openAwardSheet} onOpenChange={setOpenAwardSheet}>
        <SheetContent side="right" className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Award Student Scholarship
            </SheetTitle>
            <SheetDescription className="text-xs">
              Grant tuition waivers, merit sponsorships, and financial assistance allocations.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleAwardScholarship} className="space-y-4 pt-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Beneficiary Student</label>
              <Input
                placeholder="e.g. Kwame Mensah"
                value={awardStudent}
                onChange={(e) => setAwardStudent(e.target.value)}
                className="text-xs"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Grade Level</label>
                <select
                  value={awardGrade}
                  onChange={(e) => setAwardGrade(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="Grade 9-A">Grade 9-A</option>
                  <option value="Grade 10-A">Grade 10-A</option>
                  <option value="Grade 10-B">Grade 10-B</option>
                  <option value="Grade 11-A">Grade 11-A</option>
                  <option value="Grade 12-A">Grade 12-A</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Waiver Percentage</label>
                <select
                  value={awardPct}
                  onChange={(e) => setAwardPct(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="100%">100% Full Waiver</option>
                  <option value="75%">75% Partial Grant</option>
                  <option value="50%">50% Half Tuition</option>
                  <option value="25%">25% Foundation Grant</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Scholarship Scheme</label>
              <select
                value={awardType}
                onChange={(e) => setAwardType(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="Merit-Based">Merit-Based Academic Grant</option>
                <option value="Need-Based">Need-Based Financial Aid</option>
                <option value="Sports Excellence">Sports & Athletics Grant</option>
                <option value="Staff Dependent">Staff Dependent Concession</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Endowment Sponsor / Organization</label>
              <Input
                placeholder="e.g. Oakridge Alumni Endowment Fund"
                value={awardSponsor}
                onChange={(e) => setAwardSponsor(e.target.value)}
                className="text-xs"
              />
            </div>

            <div className="p-3 bg-muted/30 rounded-lg text-xs space-y-1 border">
              <p className="font-medium text-foreground">Bursary Authorization Note:</p>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Applying this scholarship will automatically recalculate the student's term bill and adjust outstanding tuition ledgers across accounts.
              </p>
            </div>

            <SheetFooter className="pt-4">
              <Button type="button" variant="outline" size="sm" onClick={() => setOpenAwardSheet(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="gap-1.5 font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                Authorize & Award Grant
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      {/* Export Beneficiaries Sheet (Sliding from Right) */}
      <Sheet open={openExportSheet} onOpenChange={setOpenExportSheet}>
        <SheetContent side="right" className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              Export Beneficiaries Roll
            </SheetTitle>
            <SheetDescription className="text-xs">
              Download approved scholarship lists, sponsor reporting files, and endowment statements.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleExportBeneficiaries} className="space-y-4 pt-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Export File Format</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
                <option>CSV Spreadsheet (.csv)</option>
                <option>Microsoft Excel (.xlsx)</option>
                <option>Endowment Audit PDF (.pdf)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Grant Filter</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
                <option>All Active & Pending Beneficiaries</option>
                <option>Active Grants Only</option>
                <option>Pending Board Ratification</option>
              </select>
            </div>

            <div className="p-3 bg-muted/30 rounded-lg text-xs space-y-1.5 border">
              <p className="font-medium text-foreground">Summary Columns Included:</p>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Student ID, Full Name, Class, Scheme Category, Grant %, Annual Amount Waived, Sponsor Entity, and Board Approval Date.
              </p>
            </div>

            <SheetFooter className="pt-4">
              <Button type="button" variant="outline" size="sm" onClick={() => setOpenExportSheet(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="gap-1.5 font-semibold">
                <Download className="h-4 w-4" />
                Download Recipient Roll
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
