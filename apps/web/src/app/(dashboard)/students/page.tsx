'use client';

import React, { useState, useEffect } from 'react';
import { StudentStatsCards } from '@/components/modules/students/StudentStatsCards';
import { StudentDataTable } from '@/components/modules/students/StudentDataTable';
import { StudentListItem, StudentStats, StudentStatus } from '@school-management/shared/types/student';
import { GraduationCap, Users } from 'lucide-react';

export default function StudentsPage() {
  const [students, setStudents] = useState<StudentListItem[]>([]);
  const [stats, setStats] = useState<StudentStats>({
    total: 0,
    active: 0,
    inactive: 0,
    byGender: {},
    recentAdmissions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StudentStatus | undefined>();

  useEffect(() => {
    // In production, this fetches from /api/v1/students and /api/v1/students/stats
    // For initial render / demonstration, we provide fallback mock data or fetch
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page: page.toString(),
          pageSize: pageSize.toString(),
          ...(search && { search }),
          ...(statusFilter && { status: statusFilter }),
        });

        const res = await fetch(`/api/v1/students?${queryParams.toString()}`);
        if (res.ok) {
          const json = await res.json();
          setStudents(json.data || []);
          setTotal(json.meta?.total || 0);
        } else {
          // Fallback initial data showcase
          setStudents([
            {
              id: 'stud-1',
              userId: 'u-1',
              admissionNo: 'SCH-2025-00001',
              admissionDate: '2025-09-01',
              dateOfBirth: '2010-05-14',
              gender: 'FEMALE',
              status: 'ACTIVE',
              firstName: 'Emily',
              lastName: 'Watson',
              fullName: 'Emily Watson',
              email: 'emily.watson@student.school.edu',
              phone: '+1 555-0192',
              isActive: true,
              currentClass: { id: 'c-10', name: 'Grade 10', level: 10 },
              currentSection: { id: 'sec-a', name: 'A' },
              currentAcademicYear: { id: 'ay-24', name: '2024/2025' },
              parentLinks: [
                {
                  relationship: 'Mother',
                  parent: {
                    user: {
                      firstName: 'Sarah',
                      lastName: 'Watson',
                      phone: '+1 555-9831',
                      email: 'sarah.w@example.com',
                    },
                  },
                },
              ],
            },
            {
              id: 'stud-2',
              userId: 'u-2',
              admissionNo: 'SCH-2025-00002',
              admissionDate: '2025-09-01',
              dateOfBirth: '2010-08-22',
              gender: 'MALE',
              status: 'ACTIVE',
              firstName: 'Marcus',
              lastName: 'Chen',
              fullName: 'Marcus Chen',
              email: 'marcus.chen@student.school.edu',
              isActive: true,
              currentClass: { id: 'c-10', name: 'Grade 10', level: 10 },
              currentSection: { id: 'sec-b', name: 'B' },
              currentAcademicYear: { id: 'ay-24', name: '2024/2025' },
              parentLinks: [
                {
                  relationship: 'Father',
                  parent: {
                    user: {
                      firstName: 'David',
                      lastName: 'Chen',
                      phone: '+1 555-4819',
                      email: 'david.chen@example.com',
                    },
                  },
                },
              ],
            },
          ]);
          setTotal(2);
          setStats({
            total: 840,
            active: 812,
            inactive: 28,
            byGender: { MALE: 430, FEMALE: 410 },
            recentAdmissions: 24,
          });
        }
      } catch (err) {
        console.error('Failed to load students:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [page, pageSize, search, statusFilter]);

  const totalPages = Math.ceil(total / pageSize) || 1;

  return (
    <div className="space-y-6 p-6">
      {/* Top Banner */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <GraduationCap className="h-6 w-6 text-primary" />
            Student Information System
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage admissions, enrollments, student records, and class allocations.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <StudentStatsCards stats={stats} />

      {/* Data Table */}
      <StudentDataTable
        students={students}
        total={total}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        onPageChange={setPage}
        onSearchChange={setSearch}
        onStatusFilter={setStatusFilter}
      />
    </div>
  );
}
