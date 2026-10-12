import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsDateString,
  IsPhoneNumber,
  IsObject,
  IsArray,
  MaxLength,
  MinLength,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender, StudentStatus } from '@prisma/client';

// ─────────────────────────────────────────────────────────────────────────────
// ADDRESS DTO (nested)
// ─────────────────────────────────────────────────────────────────────────────
export class AddressDto {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsString()
  @IsOptional()
  zipCode?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// MEDICAL INFO DTO (nested)
// ─────────────────────────────────────────────────────────────────────────────
export class MedicalInfoDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  allergies?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  conditions?: string[];

  @IsString()
  @IsOptional()
  doctorName?: string;

  @IsString()
  @IsOptional()
  doctorPhone?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// CREATE STUDENT DTO
// ─────────────────────────────────────────────────────────────────────────────
export class CreateStudentDto {
  // User account info
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MaxLength(100)
  firstName: string;

  @IsString()
  @MaxLength(100)
  lastName: string;

  @IsString()
  @IsOptional()
  phone?: string;

  // Student-specific info
  @IsDateString()
  admissionDate: string;

  @IsDateString()
  dateOfBirth: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  @IsOptional()
  bloodGroup?: string;

  @IsString()
  @IsOptional()
  religion?: string;

  @IsString()
  @IsOptional()
  nationality?: string;

  @IsObject()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsObject()
  @IsOptional()
  @Type(() => MedicalInfoDto)
  medicalInfo?: MedicalInfoDto;

  // Enrollment info
  @IsString()
  sectionId: string;

  @IsString()
  academicYearId: string;

  @IsString()
  @IsOptional()
  rollNumber?: string;

  // Parent/Guardian info
  @IsString()
  @IsOptional()
  guardianUserId?: string; // existing parent userId

  // If creating a new guardian simultaneously
  @IsObject()
  @IsOptional()
  newGuardian?: CreateGuardianInlineDto;
}

export class CreateGuardianInlineDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  relationship: string;

  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;

  @IsBoolean()
  @IsOptional()
  canPickup?: boolean;
}
