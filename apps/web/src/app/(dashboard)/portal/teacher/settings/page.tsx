'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Settings,
  User,
  BookOpen,
  Sliders,
  Bell,
  Shield,
  Save,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Calendar,
  Lock,
  Smartphone,
  School,
} from 'lucide-react';

export default function TeacherSettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'teaching' | 'preferences' | 'notifications' | 'security'>('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    fullName: 'Marcus Johnson',
    title: 'Senior Mathematics Instructor',
    email: 'm.johnson@oakridge.edu',
    phone: '+1 (555) 492-3810',
    officeLocation: 'Room 302, Science & Math Wing',
    department: 'Mathematics & Computing',
    qualification: 'M.Ed Curriculum & Instruction, B.Sc Mathematics',
    officeHours: 'Mon / Wed / Fri: 2:30 PM - 4:00 PM',
    bio: 'Dedicated educator specializing in pure mathematics, calculus, and mathematical modeling with 9+ years of secondary school experience.',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const teachingLoad = [
    {
      course: 'Advanced Mathematics (Grade 10-A)',
      room: 'Room 204',
      periodsPerWeek: '5 Periods',
      studentsCount: 32,
      syllabusProgress: 68,
      leadTime: 'Mon, Tue, Wed, Thu, Fri @ 08:30 AM',
    },
    {
      course: 'Differential Calculus (Grade 11-B)',
      room: 'Room 302',
      periodsPerWeek: '4 Periods',
      studentsCount: 28,
      syllabusProgress: 72,
      leadTime: 'Mon, Tue, Thu, Fri @ 10:15 AM',
    },
    {
      course: 'Applied Statistics & Probability (Grade 12-A)',
      room: 'Lab B-1',
      periodsPerWeek: '3 Periods',
      studentsCount: 24,
      syllabusProgress: 61,
      leadTime: 'Wed, Thu, Fri @ 01:15 PM',
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Settings className="h-6 w-6 text-foreground" />
            Teacher Profile & Settings
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage your faculty profile, classroom preferences, notification channels, and account security.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs border-blue-500/40 text-blue-600 bg-blue-500/10">
            Faculty ID: TEA-2024-0042
          </Badge>
          <Badge variant="success" className="text-xs">
            Active Staff
          </Badge>
        </div>
      </div>

      {/* Teacher Profile Summary Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <Avatar className="h-20 w-20 rounded-2xl border-2 border-border shadow-sm">
              <AvatarFallback className="rounded-2xl text-xl font-bold bg-blue-600 text-white">
                MJ
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h2 className="text-xl font-bold text-foreground">{formData.fullName}</h2>
                <Badge variant="secondary" className="w-fit mx-auto sm:mx-0 text-xs">
                  {formData.title}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{formData.department} • {formData.officeLocation}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 pt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  {formData.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  {formData.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  Office Hours: {formData.officeHours}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b pb-3 overflow-x-auto">
        <Button
          variant={activeTab === 'profile' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('profile')}
          className="text-xs gap-1.5"
        >
          <User className="h-3.5 w-3.5" />
          Personal & Academic Bio
        </Button>
        <Button
          variant={activeTab === 'teaching' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('teaching')}
          className="text-xs gap-1.5"
        >
          <BookOpen className="h-3.5 w-3.5" />
          Assigned Classes & Load
        </Button>
        <Button
          variant={activeTab === 'preferences' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('preferences')}
          className="text-xs gap-1.5"
        >
          <Sliders className="h-3.5 w-3.5" />
          Grading Preferences
        </Button>
        <Button
          variant={activeTab === 'notifications' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('notifications')}
          className="text-xs gap-1.5"
        >
          <Bell className="h-3.5 w-3.5" />
          Notifications
        </Button>
        <Button
          variant={activeTab === 'security' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('security')}
          className="text-xs gap-1.5"
        >
          <Shield className="h-3.5 w-3.5" />
          Security
        </Button>
      </div>

      {savedSuccess && (
        <div className="flex items-center gap-2 p-3 text-xs rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Your changes have been saved successfully.</span>
        </div>
      )}

      {/* TAB 1: PROFILE */}
      {activeTab === 'profile' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4 text-foreground" />
              Faculty Personal Information
            </CardTitle>
            <CardDescription>Update your contact details, academic qualifications, and office availability.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Professional Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Official School Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-muted-foreground text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    disabled
                    className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-muted-foreground text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Office Location</label>
                  <input
                    type="text"
                    value={formData.officeLocation}
                    onChange={(e) => setFormData({ ...formData, officeLocation: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-semibold text-foreground">Qualifications & Certifications</label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-semibold text-foreground">Office Hours Schedule</label>
                  <input
                    type="text"
                    value={formData.officeHours}
                    onChange={(e) => setFormData({ ...formData, officeHours: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-semibold text-foreground">Faculty Biography</label>
                  <textarea
                    rows={3}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button type="submit" size="sm" className="gap-1.5 text-xs">
                  <Save className="h-3.5 w-3.5" />
                  Save Profile Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* TAB 2: ASSIGNED CLASSES */}
      {activeTab === 'teaching' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase font-medium">Assigned Classes</p>
                <p className="text-2xl font-bold mt-1 text-foreground">3 Classes</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">84 Active Students Total</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase font-medium">Weekly Contact Hours</p>
                <p className="text-2xl font-bold mt-1 text-foreground">12 Periods</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Core Academic Curriculum</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase font-medium">Average Syllabus Progress</p>
                <p className="text-2xl font-bold mt-1 text-foreground">67%</p>
                <p className="text-[11px] text-emerald-600 font-medium mt-0.5">On Schedule for Term 1</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <School className="h-4 w-4 text-foreground" />
                Active Class & Subject Allocations
              </CardTitle>
              <CardDescription>Academic load for the 2024 / 2025 instructional term.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {teachingLoad.map((item) => (
                <div
                  key={item.course}
                  className="p-4 rounded-xl border border-border/70 hover:border-primary/40 transition-colors bg-card flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-foreground">{item.course}</span>
                      <Badge variant="secondary" className="text-[10px]">{item.room}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-3">
                      <span>{item.periodsPerWeek}</span>
                      <span>•</span>
                      <span>{item.studentsCount} Students Enrolled</span>
                      <span>•</span>
                      <span>{item.leadTime}</span>
                    </p>
                  </div>
                  <div className="w-full md:w-48 space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted-foreground">Syllabus Covered</span>
                      <span className="font-semibold text-foreground">{item.syllabusProgress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${item.syllabusProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 3: GRADING PREFERENCES */}
      {activeTab === 'preferences' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sliders className="h-4 w-4 text-foreground" />
              Classroom & Assessment Preferences
            </CardTitle>
            <CardDescription>Default policies applied across homework submissions, grading rubrics, and attendance tracking.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b">
              <div>
                <p className="font-semibold text-foreground">Grade Weighting Scheme</p>
                <p className="text-muted-foreground">Formula used for student final term scores.</p>
              </div>
              <select className="rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
                <option>Standard: HW 20%, Tests 30%, Midterm 20%, Exam 30%</option>
                <option>Continuous Assessment: 50% Projects / 50% Exams</option>
                <option>Equal Weighted Breakdown</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b">
              <div>
                <p className="font-semibold text-foreground">Late Assignment Penalty</p>
                <p className="text-muted-foreground">Automatic score reduction applied per day past submission deadline.</p>
              </div>
              <select className="rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
                <option>5% deduction per 24 hours (Max 3 days)</option>
                <option>10% deduction per day</option>
                <option>No late submissions accepted</option>
                <option>Instructor Discretion (No auto penalty)</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b">
              <div>
                <p className="font-semibold text-foreground">Attendance Window Lock</p>
                <p className="text-muted-foreground">Lock class register after session start time.</p>
              </div>
              <select className="rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
                <option>15 minutes after period start</option>
                <option>30 minutes after period start</option>
                <option>End of instructional day (05:00 PM)</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2">
              <div>
                <p className="font-semibold text-foreground">Auto-Publish Assessment Feedback</p>
                <p className="text-muted-foreground">Make teacher comments immediately visible to students upon rubric entry.</p>
              </div>
              <Badge variant="success">Enabled</Badge>
            </div>

            <div className="flex justify-end pt-2">
              <Button size="sm" onClick={handleSave} className="gap-1.5 text-xs">
                <Save className="h-3.5 w-3.5" />
                Update Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TAB 4: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4 text-foreground" />
              Alert & Dispatch Preferences
            </CardTitle>
            <CardDescription>Configure which events trigger instant SMS or email notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-semibold text-foreground">Student Assignment Submissions</p>
                <p className="text-muted-foreground">Receive daily digests when students submit coursework online</p>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-semibold text-foreground">Academic Department & Staff Notices</p>
                <p className="text-muted-foreground">Instant alerts for meeting schedules and curriculum bulletins</p>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-semibold text-foreground">Emergency School Broadcasts</p>
                <p className="text-muted-foreground">Priority SMS delivery for campus alerts</p>
              </div>
              <Badge variant="success">Priority SMS Active</Badge>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-semibold text-foreground">Parent Direct Inquiry Messages</p>
                <p className="text-muted-foreground">Immediate notification on guardian portal messages</p>
              </div>
              <Badge variant="secondary">Email Only</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TAB 5: SECURITY */}
      {activeTab === 'security' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Lock className="h-4 w-4 text-foreground" />
                Faculty Password & Authentication
              </CardTitle>
              <CardDescription>Ensure your staff account is protected with strong credentials.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-3 text-xs max-w-md">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">New Password</label>
                  <input
                    type="password"
                    placeholder="Minimum 8 characters"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Repeat new password"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                  />
                </div>
                <div className="pt-2">
                  <Button type="submit" size="sm" className="gap-1.5 text-xs">
                    <Save className="h-3.5 w-3.5" />
                    Update Password
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-foreground" />
                Two-Factor Authentication (2FA)
              </CardTitle>
              <CardDescription>Protect faculty gradebook access and exam authoring sessions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-semibold text-foreground">Authenticator App (TOTP)</p>
                  <p className="text-muted-foreground">Google Authenticator / Microsoft Authenticator enabled</p>
                </div>
                <Badge variant="success">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-semibold text-foreground">Active Session</p>
                  <p className="text-muted-foreground">Logged in via Windows Desktop (Oakridge Campus Network)</p>
                </div>
                <Badge variant="outline" className="text-[10px]">Current Device</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
