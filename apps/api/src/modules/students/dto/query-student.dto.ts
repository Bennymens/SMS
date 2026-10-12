import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender, StudentStatus } from '@prisma/client';

export class QueryStudentDto {
  @IsString()
  @IsOptional()
  search?: string; // name, admission no, email

  @IsEnum(StudentStatus)
  @IsOptional()
  status?: StudentStatus;

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @IsString()
  @IsOptional()
  classId?: string;

  @IsString()
  @IsOptional()
  sectionId?: string;

  @IsString()
  @IsOptional()
  academicYearId?: string;

  @IsString()
  @IsOptional()
  sortBy?: string; // 'firstName' | 'admissionNo' | 'admissionDate' | 'createdAt'

  @IsString()
  @IsOptional()
  sortOrder?: 'asc' | 'desc';

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  pageSize?: number = 20;
}
