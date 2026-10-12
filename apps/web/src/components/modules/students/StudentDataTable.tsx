'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StudentStatusBadge } from './StudentStatusBadge';
import { StudentListItem, StudentStatus } from '@school-management/shared/types/student';
import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreVertical,
  Plus,
  GraduationCap,
} from 'lucide-react';

interface StudentDataTableProps {
  students: StudentListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  showAdmitButton?: boolean;
  onPageChange: (newPage: number) => void;
  onSearchChange: (search: string) => void;
  onStatusFilter: (status: StudentStatus | undefined) => void;
}

export const StudentDataTable: React.FC<StudentDataTableProps> = ({
  students,
  total,
  page,
  pageSize,
  totalPages,
  showAdmitButton = false,
  onPageChange,
  onSearchChange,
  onStatusFilter,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchInput);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    onStatusFilter(status === 'ALL' ? undefined : (status as StudentStatus));
  };

  return (
    <div className="space-y-4">
      {/* Controls: Search, Filters, Add student button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={handleSearch} className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, ID or email..."
            className="pl-9 bg-background"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>

        <div className="flex items-center gap-2">
          {/* Status filter buttons */}
          <div className="flex items-center rounded-lg border bg-muted/40 p-1 text-xs">
            {['ALL', 'ACTIVE', 'SUSPENDED', 'INACTIVE'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => handleStatusChange(st)}
                className={`rounded-md px-3 py-1 font-medium transition-colors ${
                  selectedStatus === st
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {st === 'ALL' ? 'All' : st.charAt(0) + st.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {showAdmitButton && (
            <Link href="/students/admit">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Admit Student
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Admission No</TableHead>
              <TableHead>Class & Section</TableHead>
              <TableHead>Primary Guardian</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-40 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <GraduationCap className="h-8 w-8 text-muted-foreground/50" />
                    <p className="text-sm font-medium">No students found</p>
                    <p className="text-xs text-muted-foreground">
                      Try adjusting your search criteria or admit a new student.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              students.map((student) => {
                const primaryGuardian = student.parentLinks?.[0]?.parent?.user;
                return (
                  <TableRow key={student.id} className="hover:bg-muted/40">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={student.avatar} alt={student.fullName} />
                          <AvatarFallback className="text-xs font-semibold">
                            {student.firstName[0]}
                            {student.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <Link
                            href={`/students/${student.id}`}
                            className="font-medium text-foreground hover:underline"
                          >
                            {student.fullName}
                          </Link>
                          <div className="text-xs text-muted-foreground">{student.email}</div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="font-mono text-xs font-semibold bg-muted/60 px-2 py-1 rounded">
                        {student.admissionNo}
                      </span>
                    </TableCell>

                    <TableCell>
                      {student.currentClass ? (
                        <div className="text-sm">
                          <span className="font-medium">{student.currentClass.name}</span>
                          {student.currentSection && (
                            <span className="text-muted-foreground ml-1">
                              • Sec {student.currentSection.name}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground italic">Not enrolled</span>
                      )}
                    </TableCell>

                    <TableCell>
                      {primaryGuardian ? (
                        <div className="text-sm">
                          <div>
                            {primaryGuardian.firstName} {primaryGuardian.lastName}
                          </div>
                          {primaryGuardian.phone && (
                            <div className="text-xs text-muted-foreground">
                              {primaryGuardian.phone}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground italic">No guardian</span>
                      )}
                    </TableCell>

                    <TableCell>
                      <StudentStatusBadge status={student.status} />
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/students/${student.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
                            <Eye className="h-3.5 w-3.5" />
                            Profile
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* Pagination bar */}
        <div className="flex items-center justify-between border-t px-4 py-3 text-sm text-muted-foreground">
          <div>
            Showing <span className="font-medium text-foreground">{students.length}</span> of{' '}
            <span className="font-medium text-foreground">{total}</span> students
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              className="h-8 gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="text-xs font-medium">
              Page {page} of {totalPages || 1}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              className="h-8 gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
