import { PartialType, OmitType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { StudentStatus } from '@prisma/client';
import { CreateStudentDto } from './create-student.dto';

export class UpdateStudentDto extends PartialType(
  OmitType(CreateStudentDto, ['email', 'password', 'sectionId', 'academicYearId'] as const),
) {
  @IsEnum(StudentStatus)
  @IsOptional()
  status?: StudentStatus;
}

export class UpdateStudentStatusDto {
  @IsEnum(StudentStatus)
  status: StudentStatus;

  @IsString()
  @IsOptional()
  reason?: string;
}
