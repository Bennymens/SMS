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
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs font-medium"
            onClick={() =>
              toast.success('Beneficiaries exported', {
                description: 'Full scholarship recipient roll and sponsorship ledger downloaded.',
              })
            }
          >
            <Download className="w-3.5 h-3.5" /> Export Beneficiaries
          </Button>
          <Button
            size="sm"
            className="gap-1.5 text-xs font-semibold"
            onClick={() =>
              toast.info('Award Scholarship', {
                description: 'Opening student financial aid and discount allocation form...',
              })
            }
          >
            <Plus className="w-3.5 h-3.5" /> Award Scholarship
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
    </div>
  );
}
