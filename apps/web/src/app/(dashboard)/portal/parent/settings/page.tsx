'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Settings,
  User,
  Users,
  Bell,
  Shield,
  Save,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  GraduationCap,
} from 'lucide-react';

export default function ParentSettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'students' | 'notifications' | 'security'>('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: 'Mrs. Margaret Smith',
    relationship: 'Mother & Primary Guardian',
    email: 'margaret.smith@example.com',
    phone: '+1 (555) 987-6543',
    emergencyPhone: '+1 (555) 987-6544',
    address: '742 Evergreen Terrace, Springfield, OR 97477',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Settings className="h-6 w-6 text-foreground" />
            Parent & Guardian Settings
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage guardian contact details, linked students, emergency numbers, and communication channels.
          </p>
        </div>
        <Badge variant="outline" className="text-xs border-amber-500/40 text-amber-600 bg-amber-500/10 w-fit">
          Guardian Account Verified
        </Badge>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <Avatar className="h-20 w-20 rounded-2xl border-2 border-border shadow-sm">
              <AvatarFallback className="rounded-2xl text-xl font-bold bg-amber-600 text-white">
                MS
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h2 className="text-xl font-bold text-foreground">{formData.fullName}</h2>
                <Badge variant="secondary" className="w-fit mx-auto sm:mx-0 text-xs">
                  {formData.relationship}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{formData.address}</p>
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
                  <GraduationCap className="h-3.5 w-3.5" />
                  Ward: Alex Smith (Grade 10-A)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2 border-b pb-3 overflow-x-auto">
        <Button
          variant={activeTab === 'profile' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('profile')}
          className="text-xs gap-1.5"
        >
          <User className="h-3.5 w-3.5" />
          Guardian Information
        </Button>
        <Button
          variant={activeTab === 'students' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('students')}
          className="text-xs gap-1.5"
        >
          <Users className="h-3.5 w-3.5" />
          Linked Students
        </Button>
        <Button
          variant={activeTab === 'notifications' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('notifications')}
          className="text-xs gap-1.5"
        >
          <Bell className="h-3.5 w-3.5" />
          Communication Preferences
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
          <span>Your guardian profile has been updated.</span>
        </div>
      )}

      {activeTab === 'profile' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4 text-foreground" />
              Contact & Residential Information
            </CardTitle>
            <CardDescription>Primary contacts used by the school for notifications, billing, and reports.</CardDescription>
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
                  <label className="font-semibold text-foreground">Relationship to Student</label>
                  <input
                    type="text"
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Primary Mobile Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Secondary / Emergency Phone</label>
                  <input
                    type="text"
                    value={formData.emergencyPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Residential Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring text-xs"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button type="submit" size="sm" className="gap-1.5 text-xs">
                  <Save className="h-3.5 w-3.5" />
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {activeTab === 'students' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4 text-foreground" />
              Connected Students Under Guardianship
            </CardTitle>
            <CardDescription>Academic and enrollment profiles connected to this parent portal account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 rounded-xl border border-border/70 bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 rounded-lg">
                  <AvatarFallback className="rounded-lg bg-emerald-600 text-white font-semibold text-xs">
                    AS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm text-foreground">Alex Smith</p>
                  <p className="text-xs text-muted-foreground">ID: SCH-2025-00001 • Grade 10 Section A</p>
                </div>
              </div>
              <Badge variant="success" className="text-xs w-fit">Active Enrollment</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'notifications' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4 text-foreground" />
              Alert Subscriptions
            </CardTitle>
            <CardDescription>Control alerts regarding attendance, test reports, and billing notices.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-semibold text-foreground">Daily Attendance Notifications</p>
                <p className="text-muted-foreground">SMS alert if your ward is marked absent or late</p>
              </div>
              <Badge variant="success">Active (SMS)</Badge>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-semibold text-foreground">Grade & Exam Report Releases</p>
                <p className="text-muted-foreground">Notification when term report cards are finalized</p>
              </div>
              <Badge variant="success">Active (Email & SMS)</Badge>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-semibold text-foreground">Fee Invoice Due Date Reminders</p>
                <p className="text-muted-foreground">Reminder sent 7 days before payment due date</p>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'security' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4 text-foreground" />
              Portal Security & Password
            </CardTitle>
            <CardDescription>Update your login credentials.</CardDescription>
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
              <div className="pt-2">
                <Button type="submit" size="sm" className="gap-1.5 text-xs">
                  <Save className="h-3.5 w-3.5" />
                  Save Password
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
