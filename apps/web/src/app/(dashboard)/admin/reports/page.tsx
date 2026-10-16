'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, Calendar, BarChart3 } from 'lucide-react';
import { toast } from '@/components/ui/toast';

const reports = [
  { name: 'Annual Academic Performance Audit', type: 'Academic', date: 'Oct 01, 2026', size: '4.2 MB' },
  { name: 'Institutional Attendance & Chronic Absenteeism', type: 'Attendance', date: 'Sep 30, 2026', size: '1.8 MB' },
  { name: 'Quarterly Revenue & Tuition Collection Report', type: 'Financial', date: 'Sep 15, 2026', size: '3.1 MB' },
  { name: 'Teacher-Student Ratio & Section Utilization', type: 'Operational', date: 'Sep 01, 2026', size: '890 KB' },
];

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <FileText className="h-6 w-6 text-foreground" />
            Institutional Reports & Analytics
          </h1>
          <p className="text-muted-foreground text-sm">
            Generate state compliance records, gradebook audits, and administrative summaries.
          </p>
        </div>
        <Button
          size="sm"
          className="gap-1.5 text-xs"
          onClick={() => toast.success('Report generation started', { description: 'Compiling latest metrics and data.' })}
        >
          <BarChart3 className="h-3.5 w-3.5" />
          Generate New Report
        </Button>
      </div>

      <div className="space-y-4">
        {reports.map((r) => (
          <Card key={r.name} className="hover:border-primary/40 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold">{r.name}</CardTitle>
                  <CardDescription className="text-xs mt-0.5">{r.type} Report • {r.date}</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 text-xs"
                  onClick={() => toast.info(`Downloading ${r.name}`, { description: `File size: ${r.size}` })}
                >
                  <Download className="h-3 w-3" />
                  PDF ({r.size})
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
