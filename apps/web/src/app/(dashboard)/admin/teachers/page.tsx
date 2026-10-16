'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserCheck, Mail, Phone, BookOpen, Plus, Search } from 'lucide-react';
import { toast } from '@/components/ui/toast';

const staffList = [
  { name: 'Dr. Arthur Thorne', role: 'Head of Mathematics', email: 'a.thorne@oakridge.edu', phone: '+1 (555) 301-4412', subjects: 'Adv Math, Calculus', classes: 'Grade 10A, 11B', status: 'Active' },
  { name: 'Mrs. Elena Rostova', role: 'Physics Lead', email: 'e.rostova@oakridge.edu', phone: '+1 (555) 301-4413', subjects: 'Physics, Mechanics', classes: 'Grade 10A, 12A', status: 'Active' },
  { name: 'Mr. David Brooks', role: 'English Literature Teacher', email: 'd.brooks@oakridge.edu', phone: '+1 (555) 301-4414', subjects: 'World Lit, Rhetoric', classes: 'Grade 9B, 10A', status: 'Active' },
  { name: 'Dr. Sarah Connor', role: 'Chemistry Instructor', email: 's.connor@oakridge.edu', phone: '+1 (555) 301-4415', subjects: 'Chemistry, Biochem', classes: 'Grade 10A, 11A', status: 'Active' },
  { name: 'Ms. Ada Lovelace', role: 'CS & Robotics Coordinator', email: 'a.lovelace@oakridge.edu', phone: '+1 (555) 301-4416', subjects: 'Computer Science, AI', classes: 'Grade 10A, 12B', status: 'Active' },
  { name: 'Coach Taylor', role: 'Athletics & PE Director', email: 'c.taylor@oakridge.edu', phone: '+1 (555) 301-4417', subjects: 'Physical Education', classes: 'All Grades', status: 'Active' },
];

export default function AdminTeachersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <UserCheck className="h-6 w-6 text-foreground" />
            Teachers & Staff Directory
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage academic personnel, subject allocations, and departmental assignments.
          </p>
        </div>
        <Button
          size="sm"
          className="gap-1.5 text-xs"
          onClick={() => toast.info('Faculty enrollment form', { description: 'Opening staff registration modal...' })}
        >
          <Plus className="h-3.5 w-3.5" />
          Add Faculty Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staffList.map((st) => (
          <Card key={st.name} className="hover:border-primary/40 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-muted text-foreground font-semibold text-xs">
                      {st.name.split(' ').slice(1).map(n => n[0]).join('') || 'TC'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm font-semibold">{st.name}</CardTitle>
                    <CardDescription className="text-xs">{st.role}</CardDescription>
                  </div>
                </div>
                <Badge variant="success" className="text-[10px]">
                  {st.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground pt-0">
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" />
                <span>{st.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" />
                <span>{st.phone}</span>
              </p>
              <p className="flex items-center gap-2 pt-1 border-t text-foreground font-medium">
                <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{st.subjects} • {st.classes}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
