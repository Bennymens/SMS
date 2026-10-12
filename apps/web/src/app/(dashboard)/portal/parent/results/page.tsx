'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Download, Award } from 'lucide-react';

export default function ParentResultsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Trophy className="h-6 w-6 text-foreground" />
            Report Cards & Term Results
          </h1>
          <p className="text-muted-foreground text-sm">
            Emily Watson (Grade 10A) • Official assessment transcripts and teacher comments.
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
          <Download className="h-3.5 w-3.5" />
          Download Report Card PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Term 1 Standing Summary</CardTitle>
            <CardDescription className="text-xs">Academic Year 2024 / 2025</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b">
              <span className="text-muted-foreground">Cumulative GPA:</span>
              <span className="font-bold text-foreground">3.88 / 4.00</span>
            </div>
            <div className="flex justify-between py-1 border-b">
              <span className="text-muted-foreground">Class Percentile:</span>
              <span className="font-semibold text-foreground">Top 5%</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Academic Status:</span>
              <Badge variant="success">Dean&apos;s Honor List</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
