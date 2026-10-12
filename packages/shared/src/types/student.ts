import { z } from 'zod';

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type StudentStatus =
  | 'ACTIVE'
  | 'GRADUATED'
  | 'TRANSFERRED'
  | 'SUSPENDED'
  | 'EXPELLED'
  | 'INACTIVE';

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode?: string;
}

export interface MedicalInfo {
  allergies?: string[];
  conditions?: string[];
  doctorName?: string;
  doctorPhone?: string;
  notes?: string;
}

export interface StudentListItem {
  id: string;
  userId: string;
  admissionNo: string;
  admissionDate: string;
  dateOfBirth: string;
  gender: Gender;
  status: StudentStatus;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  currentClass?: {
    id: string;
    name: string;
    level: number;
  } | null;
  currentSection?: {
    id: string;
    name: string;
  } | null;
  currentAcademicYear?: {
    id: string;
    name: string;
  } | null;
  parentLinks?: Array<{
    relationship: string;
    parent: {
      user: {
        firstName: string;
        lastName: string;
        phone?: string;
        email: string;
      };
    };
  }>;
  _count?: {
    attendances: number;
    grades: number;
    feeRecords: number;
  };
}

export interface StudentStats {
  total: number;
  active: number;
  inactive: number;
  byGender: Record<string, number>;
  recentAdmissions: number;
}

export interface StudentAttendanceSummary {
  present: number;
  absent: number;
  late: number;
  excused: number;
  total: number;
  percentage: number;
}

// ─────────────────────────────────────────────────────────────────────────
// ZOD SCHEMAS FOR FORMS
// ─────────────────────────────────────────────────────────────────────────

export const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State/Province is required'),
  country: z.string().min(1, 'Country is required'),
  zipCode: z.string().optional(),
});

export const medicalInfoSchema = z.object({
  allergies: z.array(z.string()).default([]),
  conditions: z.array(z.string()).default([]),
  doctorName: z.string().optional(),
  doctorPhone: z.string().optional(),
  notes: z.string().optional(),
});

export const guardianSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  phone: z.string().min(6, 'Valid phone number is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  isPrimary: z.boolean().default(true),
  canPickup: z.boolean().default(true),
});

export const studentAdmissionSchema = z.object({
  // Personal
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().optional(),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  bloodGroup: z.string().optional(),
  religion: z.string().optional(),
  nationality: z.string().optional(),
  address: addressSchema,
  medicalInfo: medicalInfoSchema.optional(),

  // Academic / Enrollment
  admissionDate: z.string().min(1, 'Admission date is required'),
  academicYearId: z.string().min(1, 'Please select an academic year'),
  classId: z.string().min(1, 'Please select a class'),
  sectionId: z.string().min(1, 'Please select a section'),
  rollNumber: z.string().optional(),

  // Guardian
  hasExistingGuardian: z.boolean().default(false),
  guardianUserId: z.string().optional(),
  newGuardian: guardianSchema.optional(),
});

export type StudentAdmissionFormValues = z.infer<typeof studentAdmissionSchema>;
