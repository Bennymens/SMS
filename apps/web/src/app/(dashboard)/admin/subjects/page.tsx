'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { BookOpen, Plus, FileText, CheckCircle2, Download, Sliders } from 'lucide-react';
import { toast } from '@/components/ui/toast';

interface SubjectItem {
  code: string;
  name: string;
  department: string;
  credits: number;
  lead: string;
  status: 'Core' | 'Elective';
}

export default function AdminSubjectsPage() {
  const [subjects, setSubjects] = useState<SubjectItem[]>([
    { code: 'MTH-201', name: 'Advanced Mathematics', department: 'Mathematics & Computing', credits: 4, lead: 'Dr. Thorne', status: 'Core' },
    { code: 'PHY-201', name: 'Physics & Mechanics', department: 'Natural Sciences', credits: 4, lead: 'Mrs. Rostova', status: 'Core' },
    { code: 'ENG-201', name: 'World Literature', department: 'Humanities & Languages', credits: 3, lead: 'Mr. Brooks', status: 'Core' },
    { code: 'CHM-201', name: 'Chemistry & Biochemistry', department: 'Natural Sciences', credits: 4, lead: 'Dr. Connor', status: 'Core' },
    { code: 'HIS-201', name: 'World History', department: 'Social Sciences', credits: 3, lead: 'Mr. Grant', status: 'Elective' },
    { code: 'CSC-201', name: 'Computer Science', department: 'Mathematics & Computing', credits: 4, lead: 'Ms. Lovelace', status: 'Elective' },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('Mathematics & Computing');
  const [lead, setLead] = useState('');
  const [credits, setCredits] = useState('4');
  const [status, setStatus] = useState<'Core' | 'Elective'>('Core');

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !name.trim()) {
      toast.error('Missing required fields', { description: 'Please enter Subject Code and Title.' });
      return;
    }

    const newSub: SubjectItem = {
      code,
      name,
      department,
      credits: parseInt(credits) || 3,
      lead: lead || 'To be assigned',
      status,
    };

    setSubjects([newSub, ...subjects]);
    setOpenModal(false);
    setCode('');
    setName('');
    setLead('');

    toast.success('Subject registered into curriculum', {
      description: `"${name}" (${code}) added with ${credits} credits under ${department}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-foreground" />
            Curriculum & Subjects
          </h1>
          <p className="text-muted-foreground text-sm">
            Academic departments, course syllabi, credit allocations, and faculty leads.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() =>
              toast.success('Curriculum guide exported', {
                description: 'Full 2024/2025 academic syllabus and accreditation dossier downloaded.',
              })
            }
          >
            <Download className="h-3.5 w-3.5" />
            Export Curriculum
          </Button>
          <Button size="sm" onClick={() => setOpenModal(true)} className="gap-1.5 text-xs font-semibold">
            <Plus className="h-3.5 w-3.5" />
            Add Subject
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((sub) => (
          <Card key={sub.code} className="hover:border-primary/40 transition-all flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-[10px] text-muted-foreground">{sub.code}</span>
                  <CardTitle className="text-base font-semibold mt-0.5">{sub.name}</CardTitle>
                </div>
                <Badge variant={sub.status === 'Core' ? 'default' : 'secondary'} className="text-[10px]">
                  {sub.status}
                </Badge>
              </div>
              <CardDescription className="text-xs">{sub.department}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-muted-foreground pt-0">
              <div className="space-y-1">
                <p>Lead Instructor: <strong className="text-foreground">{sub.lead}</strong></p>
                <p>Credit Units: <strong className="text-foreground">{sub.credits} Credits</strong></p>
              </div>
              <div className="pt-2 border-t flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs gap-1"
                  onClick={() =>
                    toast.info(`Syllabus: ${sub.name}`, {
                      description: `Course outline and lesson milestones for ${sub.code} opened.`,
                    })
                  }
                >
                  <FileText className="h-3 w-3" />
                  View Syllabus
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Subject Sheet */}
      <Sheet open={openModal} onOpenChange={setOpenModal}>
        <SheetContent side="right" className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Add Course / Subject
            </SheetTitle>
            <SheetDescription className="text-xs">
              Introduce a new syllabus course code, assigned department, and credit weight.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleAddSubject} className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Course Code</label>
                <Input
                  placeholder="e.g. BIO-201"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="text-xs"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Type</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'Core' | 'Elective')}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="Core">Core Subject</option>
                  <option value="Elective">Elective Course</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Subject Title</label>
              <Input
                placeholder="e.g. General Biology & Genetics"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-xs"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="Natural Sciences">Natural Sciences</option>
                  <option value="Mathematics & Computing">Mathematics & Computing</option>
                  <option value="Humanities & Languages">Humanities & Languages</option>
                  <option value="Social Sciences">Social Sciences</option>
                  <option value="Business & Finance">Business & Finance</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Credits</label>
                <Input
                  type="number"
                  value={credits}
                  onChange={(e) => setCredits(e.target.value)}
                  className="text-xs"
                  min={1}
                  max={6}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Lead Teacher / Faculty</label>
              <Input
                placeholder="e.g. Dr. Sarah Connor"
                value={lead}
                onChange={(e) => setLead(e.target.value)}
                className="text-xs"
              />
            </div>

            <SheetFooter className="pt-4">
              <Button type="button" variant="outline" size="sm" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="gap-1.5 font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                Register Course
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
