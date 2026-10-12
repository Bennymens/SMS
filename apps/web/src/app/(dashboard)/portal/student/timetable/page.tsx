'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  Calendar as CalendarIcon,
  Clock,
  Download,
  BookOpen,
  CalendarDays,
  Sparkles,
} from 'lucide-react';

// School calendar dates (school activities, examinations, and official holidays)
const schoolEvents = [
  { date: '2026-01-01', name: "New Year's Day (School Closed)", type: 'Holiday' },
  { date: '2026-01-07', name: 'Constitution Day (School Closed)', type: 'Holiday' },
  { date: '2026-01-13', name: 'Term 1 Resumption & General Assembly', type: 'School Activity' },
  { date: '2026-02-14', name: 'Inter-House Athletics & Sports Festival', type: 'School Activity' },
  { date: '2026-03-06', name: 'Independence Day Observance', type: 'Holiday' },
  { date: '2026-04-03', name: 'Good Friday (School Closed)', type: 'Holiday' },
  { date: '2026-04-06', name: 'Easter Monday (School Closed)', type: 'Holiday' },
  { date: '2026-05-01', name: 'May Day (Workers’ Day)', type: 'Holiday' },
  { date: '2026-05-25', name: 'African Union (AU) Day', type: 'Holiday' },
  { date: '2026-07-01', name: 'Republic Day Observance', type: 'Holiday' },
  { date: '2026-08-04', name: 'Founders’ Day (School Closed)', type: 'Holiday' },
  { date: '2026-09-15', name: 'Term 1 Academic Resumption', type: 'School Activity' },
  { date: '2026-09-21', name: 'Kwame Nkrumah Memorial Day', type: 'Holiday' },
  { date: '2026-10-14', name: 'Continuous Assessment Tests (CAT 1)', type: 'School Activity' },
  { date: '2026-10-22', name: 'Mid-Term 1 Examinations Begin', type: 'School Activity' },
  { date: '2026-10-30', name: 'Mid-Term 1 Assessment Closes', type: 'School Activity' },
  { date: '2026-11-15', name: 'Speech & Prize-Giving Day', type: 'School Activity' },
  { date: '2026-12-04', name: 'National Farmers’ Day (School Closed)', type: 'Holiday' },
  { date: '2026-12-11', name: 'End-of-Term 1 Examinations', type: 'School Activity' },
  { date: '2026-12-18', name: 'Term 1 Vacation & Carols Service', type: 'School Activity' },
  { date: '2026-12-25', name: 'Christmas Day (School Closed)', type: 'Holiday' },
  { date: '2026-12-26', name: 'Boxing Day (School Closed)', type: 'Holiday' },
];

// Ghanaian GES / NaCCA curriculum timetable
const scheduleGrid = [
  {
    time: '08:00 - 08:50',
    period: 'Period 1',
    mon: 'English Language',
    tue: 'Mathematics',
    wed: 'Integrated Science',
    thu: 'Social Studies',
    fri: 'Mathematics',
  },
  {
    time: '09:00 - 09:50',
    period: 'Period 2',
    mon: 'Mathematics',
    tue: 'English Language',
    wed: 'Our World & Our People (OWOP)',
    thu: 'Integrated Science',
    fri: 'English Language',
  },
  {
    time: '10:05 - 10:55',
    period: 'Period 3',
    mon: 'Integrated Science',
    tue: 'Social Studies',
    wed: 'English Language',
    thu: 'Our World & Our People (OWOP)',
    fri: 'Computing / ICT',
  },
  {
    time: '11:05 - 11:55',
    period: 'Period 4',
    mon: 'Our World & Our People (OWOP)',
    tue: 'Integrated Science',
    wed: 'Mathematics',
    thu: 'Religious & Moral Ed (RME)',
    fri: 'Ghanaian Language (Twi)',
  },
  {
    time: '11:55 - 12:55',
    period: 'Lunch Break',
    mon: 'Dining Hall / Break',
    tue: 'Dining Hall / Break',
    wed: 'Dining Hall / Break',
    thu: 'Dining Hall / Break',
    fri: 'Dining Hall / Break',
    isBreak: true,
  },
  {
    time: '01:00 - 01:55',
    period: 'Period 5',
    mon: 'Religious & Moral Ed (RME)',
    tue: 'Computing / ICT',
    wed: 'Social Studies',
    thu: 'Ghanaian Language (Twi)',
    fri: 'Creative Arts & Design (CAD)',
  },
  {
    time: '02:00 - 02:50',
    period: 'Period 6',
    mon: 'Creative Arts & Design (CAD)',
    tue: 'Physical Education (PE)',
    wed: 'Clubs & Cadet Corps',
    thu: 'French Language',
    fri: 'Assembly & Closing',
  },
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

function formatDateKey(d: Date) {
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

export default function StudentTimetablePage() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  const selectedKey = selectedDate ? formatDateKey(selectedDate) : '';
  const currentEvent = schoolEvents.find((e) => e.date === selectedKey);

  // Marked dates for the calendar
  const markedDates = React.useMemo(() => {
    return schoolEvents.map((e) => new Date(`${e.date}T00:00:00`));
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Clock className="h-6 w-6 text-foreground" />
            Class Timetable & School Calendar
          </h1>
          <p className="text-muted-foreground text-sm">
            Ghana National Curriculum (GES/NaCCA) • Master Bell Schedule & School Activities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Download className="h-3.5 w-3.5" />
            Download Timetable PDF
          </Button>
          <Badge variant="secondary" className="text-xs">
            Term 1 Active
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column: Weekly Timetable + Selected Day Banner */}
        <div className="xl:col-span-8 space-y-6">
          {/* Selected Date Information Banner */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                    Selected Date: {selectedDate?.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </CardTitle>
                  <CardDescription>
                    {currentEvent ? (
                      <span className="font-semibold text-foreground flex items-center gap-1.5 mt-0.5">
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                        {currentEvent.name} — {currentEvent.type}
                      </span>
                    ) : (
                      'Normal instructional school hours'
                    )}
                  </CardDescription>
                </div>
                {currentEvent ? (
                  <Badge variant={currentEvent.type === 'Holiday' ? 'destructive' : 'default'} className="text-xs">
                    {currentEvent.name}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    Classes in Session
                  </Badge>
                )}
              </div>
            </CardHeader>
          </Card>

          {/* Master Weekly Timetable Table */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Weekly Bell Schedule</CardTitle>
                  <CardDescription>Official GES Curriculum Subjects & Period Allocations</CardDescription>
                </div>
                <Badge variant="outline" className="text-xs">
                  50-Min Periods
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table className="min-w-[700px]">
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="w-[125px] font-semibold text-foreground">Period & Time</TableHead>
                    {days.map((d) => (
                      <TableHead key={d} className="font-semibold text-foreground">
                        {d}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduleGrid.map((row, idx) => (
                    <TableRow
                      key={idx}
                      className={row.isBreak ? 'bg-muted/30 font-medium text-muted-foreground' : 'hover:bg-muted/20'}
                    >
                      <TableCell className="p-3 whitespace-nowrap">
                        <span className="font-semibold block text-foreground">{row.period}</span>
                        <span className="text-[10px] text-muted-foreground">{row.time}</span>
                      </TableCell>
                      <TableCell className="p-3 font-medium">
                        {row.isBreak ? <span className="italic">{row.mon}</span> : row.mon}
                      </TableCell>
                      <TableCell className="p-3 font-medium">
                        {row.isBreak ? <span className="italic">{row.tue}</span> : row.tue}
                      </TableCell>
                      <TableCell className="p-3 font-medium">
                        {row.isBreak ? <span className="italic">{row.wed}</span> : row.wed}
                      </TableCell>
                      <TableCell className="p-3 font-medium">
                        {row.isBreak ? <span className="italic">{row.thu}</span> : row.thu}
                      </TableCell>
                      <TableCell className="p-3 font-medium">
                        {row.isBreak ? <span className="italic">{row.fri}</span> : row.fri}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: School Calendar + School Activities & Term Dates */}
        <div className="xl:col-span-4 space-y-6">
          {/* Interactive School Calendar Card */}
          <Card className="flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                    School Calendar
                  </CardTitle>
                  <CardDescription>
                    Circled in blue: school activities & holidays
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Term 1
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex justify-center p-3 pt-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={{
                  eventDate: markedDates,
                }}
                modifiersClassNames={{
                  eventDate: 'rounded-full! border-2! border-blue-500! font-bold! text-blue-600! dark:text-blue-400! bg-blue-500/10!',
                }}
                className="rounded-lg border shadow-xs"
              />
            </CardContent>
          </Card>

          {/* School Activities & Term Dates Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-foreground" />
                  School Activities & Term Dates
                </CardTitle>
                <Badge variant="outline" className="text-[10px]">
                  2026 Academic Year
                </Badge>
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
