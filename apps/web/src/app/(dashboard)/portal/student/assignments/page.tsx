'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookMarked, Clock, CheckCircle2, FileText, Upload, AlertCircle } from 'lucide-react';

const assignmentsData = [
  {
    id: 1,
    title: 'Mechanics Lab Report: Projectile Motion',
    subject: 'Physics & Mechanics',
    teacher: 'Mrs. Elena Rostova',
    due: 'Tomorrow, 11:59 PM',
    status: 'Pending',
    urgency: 'high',
    maxScore: 50,
    instructions: 'Complete error analysis on pendulum trials 4 through 8 with standard deviation chart.',
  },
  {
    id: 2,
    title: 'Calculus Problem Set #4 (Integration by Parts)',
    subject: 'Advanced Mathematics',
    teacher: 'Dr. Thorne',
    due: 'In 3 days (Oct 15)',
    status: 'Pending',
    urgency: 'normal',
    maxScore: 100,
    instructions: 'Submit odd-numbered exercises from textbook Chapter 7.2, pages 310–314.',
  },
  {
    id: 3,
    title: 'Essay: Themes of Isolation in 1984',
    subject: 'World Literature',
    teacher: 'Mr. David Brooks',
    due: 'Oct 18, 2026',
    status: 'Pending',
    urgency: 'normal',
    maxScore: 100,
    instructions: '1,500 words MLA formatted essay referencing chapters 1–3 of Orwell’s text.',
  },
  {
    id: 4,
    title: 'Stoichiometry Lab Experiment Write-Up',
    subject: 'Chemistry',
    teacher: 'Dr. Sarah Connor',
    due: 'Submitted (Oct 09)',
    status: 'Graded',
    score: 95,
    maxScore: 100,
    feedback: 'Excellent breakdown of percentage yields and limiting reactants.',
  },
  {
    id: 5,
    title: 'Python Recursion and Binary Tree Search',
    subject: 'Computer Science',
    teacher: 'Ms. Ada Lovelace',
    due: 'Submitted (Oct 07)',
    status: 'Graded',
    score: 98,
    maxScore: 100,
    feedback: 'Clean code comments and optimal runtime complexity achieved.',
  },
];

export default function StudentAssignmentsPage() {
  const [filter, setFilter] = React.useState<'All' | 'Pending' | 'Graded'>('All');

  const filtered = assignmentsData.filter(
    (a) => filter === 'All' || a.status === filter
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BookMarked className="h-6 w-6 text-foreground" />
            Assignments & Coursework
          </h1>
          <p className="text-muted-foreground text-sm">
            Track active homework deadlines, submit project reports, and review teacher grading feedback.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {(['All', 'Pending', 'Graded'] as const).map((tab) => (
            <Button
              key={tab}
              variant={filter === tab ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(tab)}
              className="text-xs"
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((item) => (
          <Card key={item.id} className="bg-card hover:border-primary/40 transition-all">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px]">
                      {item.subject}
                    </Badge>
                    <Badge
                      variant={
                        item.status === 'Graded'
                          ? 'success'
                          : item.urgency === 'high'
                          ? 'destructive'
                          : 'secondary'
                      }
                      className="text-[10px]"
                    >
                      {item.status === 'Graded' ? `Graded: ${item.score}/${item.maxScore}` : item.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-semibold mt-1">{item.title}</CardTitle>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{item.due}</span>
                </div>
              </div>
              <CardDescription className="text-xs">Instructor: {item.teacher}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.instructions || item.feedback}
              </p>
              <div className="flex items-center justify-between pt-2 border-t text-xs">
                <span className="text-muted-foreground">Max Score: {item.maxScore} points</span>
                {item.status === 'Pending' ? (
                  <Button size="sm" className="h-7 text-xs gap-1.5">
                    <Upload className="h-3 w-3" />
                    Submit Assignment
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    View Submission
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
