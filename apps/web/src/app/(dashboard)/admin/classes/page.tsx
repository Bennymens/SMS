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
import { School, Plus, Users, BookOpen, CheckCircle2, Sliders } from 'lucide-react';
import { toast } from '@/components/ui/toast';

interface Section {
  section: string;
  room: string;
  capacity: number;
  enrolled: number;
  advisor: string;
}

interface GradeGroup {
  grade: string;
  sections: Section[];
}

export default function AdminClassesPage() {
  const [groups, setGroups] = useState<GradeGroup[]>([
    {
      grade: 'Grade 9',
      sections: [
        { section: '9-A', room: 'Room 101', capacity: 30, enrolled: 28, advisor: 'Ms. Jenkins' },
        { section: '9-B', room: 'Room 102', capacity: 30, enrolled: 29, advisor: 'Mr. Vance' },
      ],
    },
    {
      grade: 'Grade 10',
      sections: [
        { section: '10-A', room: 'Room 204', capacity: 32, enrolled: 30, advisor: 'Dr. Thorne' },
        { section: '10-B', room: 'Room 205', capacity: 32, enrolled: 31, advisor: 'Mrs. Rostova' },
      ],
    },
    {
      grade: 'Grade 11',
      sections: [
        { section: '11-A', room: 'Room 301', capacity: 30, enrolled: 27, advisor: 'Dr. Connor' },
        { section: '11-B', room: 'Room 302', capacity: 30, enrolled: 28, advisor: 'Mr. Brooks' },
      ],
    },
    {
      grade: 'Grade 12',
      sections: [
        { section: '12-A', room: 'Room 401', capacity: 28, enrolled: 26, advisor: 'Ms. Lovelace' },
        { section: '12-B', room: 'Room 402', capacity: 28, enrolled: 25, advisor: 'Mr. Grant' },
      ],
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('Grade 10');
  const [sectionCode, setSectionCode] = useState('');
  const [room, setRoom] = useState('');
  const [advisor, setAdvisor] = useState('');
  const [capacity, setCapacity] = useState('32');

  const handleCreateSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sectionCode.trim() || !room.trim()) {
      toast.error('Missing details', { description: 'Please provide Section Code and Room.' });
      return;
    }

    const newSec: Section = {
      section: sectionCode,
      room,
      capacity: parseInt(capacity) || 30,
      enrolled: 0,
      advisor: advisor || 'Unassigned',
    };

    setGroups((prev) =>
      prev.map((g) => (g.grade === selectedGrade ? { ...g, sections: [...g.sections, newSec] } : g))
    );

    setOpenModal(false);
    setSectionCode('');
    setRoom('');
    setAdvisor('');

    toast.success('New section established', {
      description: `Section ${sectionCode} added under ${selectedGrade} (${room}).`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <School className="h-6 w-6 text-foreground" />
            Classes & Sections Management
          </h1>
          <p className="text-muted-foreground text-sm">
            Configure year grades, division sections, room quotas, and assigned homeroom tutors.
          </p>
        </div>
        <Button size="sm" onClick={() => setOpenModal(true)} className="gap-1.5 text-xs font-semibold">
          <Plus className="h-3.5 w-3.5" />
          Create New Section
        </Button>
      </div>

      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.grade} className="space-y-3">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">{group.grade} Cohort</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.sections.map((sec) => (
                <Card key={sec.section} className="hover:border-primary/40 transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-bold">Section {sec.section}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {sec.enrolled} / {sec.capacity} Enrolled
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">Homeroom: {sec.advisor} • {sec.room}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${Math.min(100, (sec.enrolled / sec.capacity) * 100)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-muted-foreground">
                        {sec.capacity - sec.enrolled} seats available
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs gap-1"
                        onClick={() =>
                          toast.info(`Managing Section ${sec.section}`, {
                            description: `Advisor: ${sec.advisor} • Capacity: ${sec.capacity} • Room: ${sec.room}`,
                          })
                        }
                      >
                        <Sliders className="h-3 w-3" />
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Create Section Sheet */}
      <Sheet open={openModal} onOpenChange={setOpenModal}>
        <SheetContent side="right" className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <School className="h-5 w-5 text-primary" />
              Create Class Section
            </SheetTitle>
            <SheetDescription className="text-xs">
              Assign a new section code, physical room location, and designated homeroom tutor.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleCreateSection} className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Grade Cohort</label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12">Grade 12</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Section Identifier</label>
                <Input
                  placeholder="e.g. 10-C"
                  value={sectionCode}
                  onChange={(e) => setSectionCode(e.target.value)}
                  className="text-xs"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Room Number / Block</label>
                <Input
                  placeholder="e.g. Block C, Room 104"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="text-xs"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Desk Capacity</label>
                <Input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="text-xs"
                  min={10}
                  max={60}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Assigned Homeroom Advisor</label>
              <Input
                placeholder="e.g. Dr. Arthur Thorne"
                value={advisor}
                onChange={(e) => setAdvisor(e.target.value)}
                className="text-xs"
              />
            </div>

            <SheetFooter className="pt-4">
              <Button type="button" variant="outline" size="sm" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="gap-1.5 font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                Register Section
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
