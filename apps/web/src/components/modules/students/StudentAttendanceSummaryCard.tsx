import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { StudentAttendanceSummary } from '@school-management/shared/types/student';

interface StudentAttendanceSummaryCardProps {
  summary: StudentAttendanceSummary;
}

export const StudentAttendanceSummaryCard: React.FC<StudentAttendanceSummaryCardProps> = ({
  summary,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Attendance Record</CardTitle>
            <CardDescription>Term to date overview</CardDescription>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-foreground">{summary.percentage}%</span>
            <p className="text-xs text-muted-foreground">Present rate</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted flex">
          <div
            style={{ width: `${(summary.present / (summary.total || 1)) * 100}%` }}
            className="bg-emerald-500 h-full transition-all"
            title={`Present: ${summary.present}`}
          />
          <div
            style={{ width: `${(summary.late / (summary.total || 1)) * 100}%` }}
            className="bg-amber-500 h-full transition-all"
            title={`Late: ${summary.late}`}
          />
          <div
            style={{ width: `${(summary.absent / (summary.total || 1)) * 100}%` }}
            className="bg-rose-500 h-full transition-all"
            title={`Absent: ${summary.absent}`}
          />
        </div>

        {/* Breakdown Stats Grid */}
        <div className="grid grid-cols-4 gap-2 text-center pt-2">
          <div className="rounded-lg bg-emerald-500/10 p-2.5">
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Present</p>
            <p className="text-lg font-bold text-foreground mt-0.5">{summary.present}</p>
          </div>
          <div className="rounded-lg bg-amber-500/10 p-2.5">
            <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Late</p>
            <p className="text-lg font-bold text-foreground mt-0.5">{summary.late}</p>
          </div>
          <div className="rounded-lg bg-rose-500/10 p-2.5">
            <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold">Absent</p>
            <p className="text-lg font-bold text-foreground mt-0.5">{summary.absent}</p>
          </div>
          <div className="rounded-lg bg-blue-500/10 p-2.5">
            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">Excused</p>
            <p className="text-lg font-bold text-foreground mt-0.5">{summary.excused}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
