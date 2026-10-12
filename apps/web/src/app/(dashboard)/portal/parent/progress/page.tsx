'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, Award, BookOpen, Clock, Trophy } from 'lucide-react';

export default function ParentProgressPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-foreground" />
            Child Academic Progress
          </h1>
          <p className="text-muted-foreground text-sm">
            Monitoring Emily Watson (Grade 10A) • Mid-Term 1 Standing
          </p>
        </div>
        <Badge variant="secondary" className="text-xs">
          Academic Honor Roll
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Cumulative GPA</p>
              <p className="text-2xl font-bold mt-1 text-foreground">3.88</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Rank #4 in Grade 10</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <Award className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Attendance Rate</p>
              <p className="text-2xl font-bold mt-1 text-foreground">96.2%</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">88 Present / 3 Absent</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <Clock className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">Subjects on Track</p>
              <p className="text-2xl font-bold mt-1 text-foreground">6 / 6</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">All courses above B</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-2.5 text-foreground border border-border/50">
              <BookOpen className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
