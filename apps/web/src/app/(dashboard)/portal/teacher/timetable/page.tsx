'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '@/components/ui/table';
import {
  Clock, Download, Calendar as CalendarIcon, CalendarDays, Sparkles, MapPin,
} from 'lucide-react';

// ── Shared school events (same as student timetable) ──────────────────────────
const schoolEvents = [
  { date: '2026-01-01', name: "New Year's Day (School Closed)", type: 'Holiday' },
  { date: '2026-01-07', name: 'Constitution Day (School Closed)', type: 'Holiday' },
  { date: '2026-01-13', name: 'Term 1 Resumption & General Assembly', type: 'School Activity' },
  { date: '2026-02-14', name: 'Inter-House Athletics & Sports Festival', type: 'School Activity' },
  { date: '2026-03-06', name: 'Independence Day Observance', type: 'Holiday' },
  { date: '2026-04-03', name: 'Good Friday (School Closed)', type: 'Holiday' },
  { date: '2026-04-06', name: 'Easter Monday (School Closed)', type: 'Holiday' },
  { date: '2026-05-01', name: 'May Day (Workers\u2019 Day)', type: 'Holiday' },
  { date: '2026-05-25', name: 'African Union (AU) Day', type: 'Holiday' },
  { date: '2026-07-01', name: 'Republic Day Observance', type: 'Holiday' },
  { date: '2026-08-04', name: 'Founders\u2019 Day (School Closed)', type: 'Holiday' },
  { date: '2026-09-15', name: 'Term 1 Academic Resumption', type: 'School Activity' },
  { date: '2026-09-21', name: 'Kwame Nkrumah Memorial Day', type: 'Holiday' },
  { date: '2026-10-14', name: 'Continuous Assessment Tests (CAT 1)', type: 'School Activity' },
  { date: '2026-10-22', name: 'Mid-Term 1 Examinations Begin', type: 'School Activity' },
  { date: '2026-10-30', name: 'Mid-Term 1 Assessment Closes', type: 'School Activity' },
  { date: '2026-11-15', name: 'Speech & Prize-Giving Day', type: 'School Activity' },
  { date: '2026-12-04', name: 'National Farmers\u2019 Day (School Closed)', type: 'Holiday' },
  { date: '2026-12-11', name: 'End-of-Term 1 Examinations', type: 'School Activity' },
  { date: '2026-12-18', name: 'Term 1 Vacation & Carols Service', type: 'School Activity' },
  { date: '2026-12-25', name: 'Christmas Day (School Closed)', type: 'Holiday' },
  { date: '2026-12-26', name: 'Boxing Day (School Closed)', type: 'Holiday' },
];

// ── Teacher weekly schedule grid ──────────────────────────────────────────────
const teacherScheduleGrid = [
  {
    time: '08:00 - 08:50', period: 'Period 1',
    mon: { class: 'SHS 1 - Science A', subject: 'Core Mathematics', room: 'Block B, Rm 10' },
    tue: { class: 'Basic 9 / JHS 3', subject: 'Mathematics (BECE)', room: 'Block A, Rm 4' },
    wed: { class: 'SHS 1 - Science A', subject: 'Core Mathematics', room: 'Block B, Rm 10' },
    thu: { class: 'SHS 2 - Science A', subject: 'Elective Math', room: 'Science Lab 2' },
    fri: { class: 'SHS 1 - General Arts', subject: 'Core Mathematics', room: 'Block B, Rm 12' },
  },
  {
    time: '09:00 - 09:50', period: 'Period 2',
    mon: null,
    tue: { class: 'SHS 2 - Science A', subject: 'Elective Math', room: 'Science Lab 2' },
    wed: null,
    thu: null,
    fri: { class: 'SHS 2 - Science A', subject: 'Elective Math', room: 'Science Lab 2' },
  },
  {
    time: '10:05 - 10:55', period: 'Period 3',
    mon: { class: 'Faculty Office', subject: 'Dept. Consultation', room: 'Faculty Office 2' },
    tue: null,
    wed: { class: 'SHS 1 - General Arts', subject: 'Core Mathematics', room: 'Block B, Rm 12' },
    thu: null,
    fri: null,
  },
  {
    time: '11:05 - 11:55', period: 'Period 4',
    mon: null,
    tue: { class: 'Basic 9 / JHS 3', subject: 'Mathematics (BECE)', room: 'Block A, Rm 4' },
    wed: null,
    thu: { class: 'Basic 9 / JHS 3', subject: 'Mathematics (BECE)', room: 'Block A, Rm 4' },
    fri: null,
  },
  {
    time: '11:55 - 12:55', period: 'Lunch Break',
    mon: null, tue: null, wed: null, thu: null, fri: null,
    isBreak: true,
  },
  {
    time: '01:15 - 02:05', period: 'Period 5',
    mon: null,
    tue: null,
    wed: null,
    thu: { class: 'SHS 1 - General Arts', subject: 'Core Mathematics', room: 'Block B, Rm 12' },
    fri: null,
  },
  {
    time: '02:00 - 02:50', period: 'Period 6',
    mon: { class: 'SHS 1 - Science A', subject: 'Core Mathematics', room: 'Block B, Rm 10' },
    tue: null,
    wed: { class: 'SHS 2 - Science A', subject: 'Elective Math', room: 'Science Lab 2' },
    thu: null,
    fri: { class: 'Faculty Office', subject: 'Student Consultation', room: 'Faculty Office 2' },
  },
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;
const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri'] as const;

type PeriodCell = { class: string; subject: string; room: string } | null;

function formatDateKey(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

function CellContent({ cell }: { cell: PeriodCell }) {
  if (!cell) return <span className="text-muted-foreground/40 text-[11px]">—</span>;
  const isFree = cell.class === 'Faculty Office';
  return (
    <div className="space-y-0.5">
      <p className={`font-semibold text-[11px] leading-tight ${isFree ? 'text-muted-foreground' : 'text-foreground'}`}>
        {cell.class}
      </p>
      <p className="text-[10px] text-muted-foreground">{cell.subject}</p>
      <p className="text-[10px] text-muted-foreground flex items-center gap-0.5">
        <MapPin className="h-2.5 w-2.5 shrink-0" />{cell.room}
      </p>
    </div>
  );
}

export default function TeacherTimetablePage() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  const selectedKey = selectedDate ? formatDateKey(selectedDate) : '';
  const currentEvent = schoolEvents.find((e) => e.date === selectedKey);

  const markedDates = React.useMemo(
    () => schoolEvents.map((e) => new Date(`${e.date}T00:00:00`)),
    []
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Clock className="h-6 w-6" />
            Faculty Teaching Timetable & School Calendar
          </h1>
          <p className="text-muted-foreground text-sm">
            Weekly class schedule, consultation hours & official school activities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Download className="h-3.5 w-3.5" />
            Export Schedule
          </Button>
          <Badge variant="secondary" className="text-xs">Term 1 Active</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left: Selected date banner + teaching schedule table */}
        <div className="xl:col-span-8 space-y-6">

          {/* Selected Date Banner */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                    {selectedDate?.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </CardTitle>
                  <CardDescription>
                    {currentEvent ? (
                      <span className="font-semibold text-foreground flex items-center gap-1.5 mt-0.5">
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                        {currentEvent.name} — {currentEvent.type}
                      </span>
                    ) : (
                      'Normal teaching day — classes in session'
                    )}
                  </CardDescription>
                </div>
                {currentEvent ? (
                  <Badge variant={currentEvent.type === 'Holiday' ? 'destructive' : 'default'} className="text-xs">
                    {currentEvent.type}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">Teaching Day</Badge>
                )}
              </div>
            </CardHeader>
          </Card>

          {/* Weekly Teaching Schedule Table */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Weekly Teaching Schedule</CardTitle>
                  <CardDescription>Mr. Emmanuel Johnson • Dept. of Mathematics & Computing</CardDescription>
                </div>
                <Badge variant="outline" className="text-xs">50-Min Periods</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table className="min-w-[750px]">
                  <TableHeader>
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                      <TableHead className="w-[120px] font-semibold text-foreground">Period & Time</TableHead>
                      {days.map((d) => (
                        <TableHead key={d} className="font-semibold text-foreground">{d}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teacherScheduleGrid.map((row, idx) => (
                      <TableRow
                        key={idx}
                        className={row.isBreak ? 'bg-muted/30' : 'hover:bg-muted/20'}
                      >
                        <TableCell className="p-3 whitespace-nowrap align-top">
                          <span className="font-semibold block text-foreground text-xs">{row.period}</span>
                          <span className="text-[10px] text-muted-foreground">{row.time}</span>
                        </TableCell>
                        {dayKeys.map((key) => (
                          <TableCell key={key} className="p-3 align-top">
                            {row.isBreak
                              ? <span className="text-xs text-muted-foreground italic">Lunch / Break</span>
                              : <CellContent cell={(row[key] as PeriodCell) ?? null} />
                            }
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: School Calendar + Activities list */}
        <div className="xl:col-span-4 space-y-6">
          {/* Interactive School Calendar */}
          <Card className="flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                    School Calendar
                  </CardTitle>
                  <CardDescription>Circled in blue: school activities & holidays</CardDescription>
                </div>
                <Badge variant="secondary" className="text-xs">Term 1</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex justify-center p-3 pt-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={{ eventDate: markedDates }}
                modifiersClassNames={{
                  eventDate: 'rounded-full! border-2! border-blue-500! font-bold! text-blue-600! dark:text-blue-400! bg-blue-500/10!',
                }}
                className="rounded-lg border shadow-xs"
              />
            </CardContent>
          </Card>

          {/* School Activities & Term Dates */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-foreground" />
                  School Activities & Term Dates
                </CardTitle>
                <Badge variant="outline" className="text-[10px]">2026 Academic Year</Badge>
              </div>
              <CardDescription className="text-xs">
                Term schedule, exams, sports & public observances
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pt-0 text-xs max-h-[380px] overflow-y-auto">
              {schoolEvents.map((event) => (
                <div
                  key={`${event.date}-${event.name}`}
                  onClick={() => setSelectedDate(new Date(`${event.date}T00:00:00`))}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer border border-transparent hover:border-border transition-all"
                >
                  <div className="space-y-0.5">
                    <p className="font-semibold text-foreground">{event.name}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {new Date(`${event.date}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <Badge
                    variant={event.type === 'Holiday' ? 'outline' : 'secondary'}
                    className="text-[10px] shrink-0"
                  >
                    {event.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
