import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { AuditService } from '../audit-logs/audit.service';
import { StorageService } from '../../storage/storage.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto, UpdateStudentStatusDto } from './dto/update-student.dto';
import { QueryStudentDto } from './dto/query-student.dto';
import { Prisma, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { generateAdmissionNo } from '../../common/utils/generate-admission-no.util';

@Injectable()
export class StudentsService {
  private readonly logger = new Logger(StudentsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
    private readonly storageService: StorageService,
  ) {}

  // ─────────────────────────────────────────────────────────────────────────
  // LIST STUDENTS (with pagination + filters)
  // ─────────────────────────────────────────────────────────────────────────
  async findAll(schoolId: string, query: QueryStudentDto) {
    const {
      search,
      status,
      gender,
      classId,
      sectionId,
      academicYearId,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      pageSize = 20,
    } = query;

    const skip = (page - 1) * pageSize;

    // Build filters
    const where: Prisma.StudentWhereInput = {
      schoolId,
      ...(status && { status }),
      ...(gender && { gender }),
      ...(search && {
        OR: [
          { user: { firstName: { contains: search, mode: 'insensitive' } } },
          { user: { lastName: { contains: search, mode: 'insensitive' } } },
          { user: { email: { contains: search, mode: 'insensitive' } } },
          { admissionNo: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...((sectionId || classId || academicYearId) && {
        enrollments: {
          some: {
            ...(academicYearId && { academicYearId }),
            ...(sectionId && { sectionId }),
            ...(classId && { section: { classId } }),
          },
        },
      }),
    };

    // Build sort
    const orderBy = this.buildOrderBy(sortBy, sortOrder);

    const [students, total] = await Promise.all([
      this.prisma.student.findMany({
        where,
        skip,
        take: pageSize,
        orderBy,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              phone: true,
              avatar: true,
              isActive: true,
              lastLoginAt: true,
            },
          },
          enrollments: {
            where: academicYearId ? { academicYearId } : {},
            orderBy: { enrolledAt: 'desc' },
            take: 1,
            include: {
              section: {
                include: {
                  class: { select: { id: true, name: true, level: true } },
                },
              },
              academicYear: { select: { id: true, name: true } },
            },
          },
          parentLinks: {
            where: { isPrimary: true },
            include: {
              parent: {
                include: {
                  user: {
                    select: { firstName: true, lastName: true, phone: true, email: true },
                  },
                },
              },
            },
          },
          _count: {
            select: { attendances: true, grades: true, feeRecords: true },
          },
        },
      }),
      this.prisma.student.count({ where }),
    ]);

    return {
      data: students.map(this.formatStudent),
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
        hasNextPage: page < Math.ceil(total / pageSize),
        hasPrevPage: page > 1,
      },
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // GET SINGLE STUDENT (full profile)
  // ─────────────────────────────────────────────────────────────────────────
  async findOne(studentId: string, schoolId: string) {
    const student = await this.prisma.student.findFirst({
      where: { id: studentId, schoolId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            avatar: true,
            isActive: true,
            lastLoginAt: true,
            createdAt: true,
          },
        },
        enrollments: {
          orderBy: { enrolledAt: 'desc' },
          include: {
            section: {
              include: {
                class: true,
                classTeacher: {
                  include: {
                    user: { select: { firstName: true, lastName: true } },
                  },
                },
              },
            },
            academicYear: true,
          },
        },
        parentLinks: {
          include: {
            parent: {
              include: {
                user: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    phone: true,
                    email: true,
                    avatar: true,
                  },
                },
              },
            },
          },
        },
        documents: {
          orderBy: { uploadedAt: 'desc' },
        },
        feeRecords: {
          orderBy: { dueDate: 'desc' },
          take: 5,
          include: {
            feeStructure: { select: { name: true } },
            payments: { select: { amount: true, paidAt: true, status: true } },
          },
        },
        reportCards: {
          orderBy: { generatedAt: 'desc' },
          take: 5,
          include: { term: { select: { name: true } } },
        },
        _count: {
          select: {
            attendances: true,
            grades: true,
            feeRecords: true,
            submissions: true,
          },
        },
      },
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    return this.formatStudent(student);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // CREATE STUDENT (admission)
  // ─────────────────────────────────────────────────────────────────────────
  async create(schoolId: string, dto: CreateStudentDto, createdById: string) {
    // Validate school exists and is active
    const school = await this.prisma.school.findUnique({ where: { id: schoolId } });
    if (!school || !school.isActive) {
      throw new BadRequestException('School not found or inactive');
    }

    // Check email uniqueness
    const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existingUser) {
      throw new ConflictException('A user with this email already exists');
    }

    // Validate section exists
    const section = await this.prisma.section.findFirst({
      where: { id: dto.sectionId, schoolId },
      include: { enrollments: { where: { academicYearId: dto.academicYearId } } },
    });
    if (!section) {
      throw new NotFoundException('Section not found');
    }
    if (section.enrollments.length >= section.capacity) {
      throw new BadRequestException('Section is at full capacity');
    }

    // Validate academic year
    const academicYear = await this.prisma.academicYear.findFirst({
      where: { id: dto.academicYearId, schoolId },
    });
    if (!academicYear) {
      throw new NotFoundException('Academic year not found');
    }

    // Generate admission number
    const admissionNo = await generateAdmissionNo(this.prisma, schoolId);
    const passwordHash = await bcrypt.hash(dto.password, 12);

    // Create everything in a transaction
    const student = await this.prisma.$transaction(async (tx) => {
      // 1. Create user account
      const user = await tx.user.create({
        data: {
          schoolId,
          email: dto.email,
          passwordHash,
          firstName: dto.firstName,
          lastName: dto.lastName,
          phone: dto.phone,
          role: Role.STUDENT,
        },
      });

      // 2. Create student profile
      const newStudent = await tx.student.create({
        data: {
          userId: user.id,
          schoolId,
          admissionNo,
          admissionDate: new Date(dto.admissionDate),
          dateOfBirth: new Date(dto.dateOfBirth),
          gender: dto.gender,
          bloodGroup: dto.bloodGroup,
          religion: dto.religion,
          nationality: dto.nationality,
          address: dto.address as unknown as Prisma.InputJsonValue,
          medicalInfo: dto.medicalInfo as unknown as Prisma.InputJsonValue ?? {},
        },
      });

      // 3. Create enrollment
      await tx.studentEnrollment.create({
        data: {
          studentId: newStudent.id,
          sectionId: dto.sectionId,
          academicYearId: dto.academicYearId,
          rollNumber: dto.rollNumber,
        },
      });

      // 4. Handle guardian
      if (dto.guardianUserId) {
        // Link to existing parent
        const parent = await tx.parent.findFirst({
          where: { userId: dto.guardianUserId, schoolId },
        });
        if (!parent) throw new NotFoundException('Guardian not found');

        await tx.parentStudent.create({
          data: {
            parentId: parent.id,
            studentId: newStudent.id,
            relationship: 'Guardian',
            isPrimary: true,
            canPickup: true,
          },
        });
      } else if (dto.newGuardian) {
        // Create new parent account
        const guardianPasswordHash = await bcrypt.hash(
          `${dto.newGuardian.firstName}@${new Date().getFullYear()}`,
          12,
        );
        const guardianUser = await tx.user.create({
          data: {
            schoolId,
            email: dto.newGuardian.email,
            passwordHash: guardianPasswordHash,
            firstName: dto.newGuardian.firstName,
            lastName: dto.newGuardian.lastName,
            phone: dto.newGuardian.phone,
            role: Role.PARENT,
          },
        });

        const parent = await tx.parent.create({
          data: { userId: guardianUser.id, schoolId },
        });

        await tx.parentStudent.create({
          data: {
            parentId: parent.id,
            studentId: newStudent.id,
            relationship: dto.newGuardian.relationship,
            isPrimary: dto.newGuardian.isPrimary ?? true,
            canPickup: dto.newGuardian.canPickup ?? true,
          },
        });
      }

      return newStudent;
    });

    // Audit log
    await this.auditService.log({
      schoolId,
      userId: createdById,
      action: 'CREATE',
      resource: 'student',
      resourceId: student.id,
      newValues: { admissionNo, email: dto.email },
    });

    this.logger.log(`Student admitted: ${admissionNo} at school ${schoolId}`);

    return this.findOne(student.id, schoolId);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // UPDATE STUDENT
  // ─────────────────────────────────────────────────────────────────────────
  async update(studentId: string, schoolId: string, dto: UpdateStudentDto, updatedById: string) {
    const existing = await this.findOne(studentId, schoolId);

    const { firstName, lastName, phone, address, medicalInfo, dateOfBirth, ...studentFields } = dto;

    await this.prisma.$transaction(async (tx) => {
      // Update user if name/phone changed
      if (firstName || lastName || phone) {
        await tx.user.update({
          where: { id: existing.userId },
          data: { firstName, lastName, phone },
        });
      }

      // Update student profile
      await tx.student.update({
        where: { id: studentId },
        data: {
          ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) }),
          ...(address && { address: address as unknown as Prisma.InputJsonValue }),
          ...(medicalInfo && { medicalInfo: medicalInfo as unknown as Prisma.InputJsonValue }),
          ...studentFields,
        },
      });
    });

    await this.auditService.log({
      schoolId,
      userId: updatedById,
      action: 'UPDATE',
      resource: 'student',
      resourceId: studentId,
      oldValues: existing,
      newValues: dto,
    });

    return this.findOne(studentId, schoolId);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // UPDATE STATUS
  // ─────────────────────────────────────────────────────────────────────────
  async updateStatus(
    studentId: string,
    schoolId: string,
    dto: UpdateStudentStatusDto,
    updatedById: string,
  ) {
    const student = await this.prisma.student.findFirst({
      where: { id: studentId, schoolId },
    });
    if (!student) throw new NotFoundException('Student not found');

    const updated = await this.prisma.student.update({
      where: { id: studentId },
      data: { status: dto.status },
    });

    await this.auditService.log({
      schoolId,
      userId: updatedById,
      action: 'UPDATE_STATUS',
      resource: 'student',
      resourceId: studentId,
      oldValues: { status: student.status },
      newValues: { status: dto.status, reason: dto.reason },
    });

    return updated;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PROMOTE STUDENT to new section/year
  // ─────────────────────────────────────────────────────────────────────────
  async promote(
    studentId: string,
    schoolId: string,
    newSectionId: string,
    newAcademicYearId: string,
    promotedById: string,
  ) {
    const currentEnrollment = await this.prisma.studentEnrollment.findFirst({
      where: { studentId, academicYear: { isCurrent: true } },
    });

    const newEnrollment = await this.prisma.studentEnrollment.create({
      data: {
        studentId,
        sectionId: newSectionId,
        academicYearId: newAcademicYearId,
        promotedFrom: currentEnrollment?.sectionId,
      },
    });

    await this.auditService.log({
      schoolId,
      userId: promotedById,
      action: 'PROMOTE',
      resource: 'student',
      resourceId: studentId,
      newValues: { newSectionId, newAcademicYearId },
    });

    return newEnrollment;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // GET STUDENT ATTENDANCE SUMMARY
  // ─────────────────────────────────────────────────────────────────────────
  async getAttendanceSummary(studentId: string, schoolId: string, termId: string) {
    const student = await this.prisma.student.findFirst({
      where: { id: studentId, schoolId },
    });
    if (!student) throw new NotFoundException('Student not found');

    const records = await this.prisma.attendanceRecord.groupBy({
      by: ['status'],
      where: { studentId, termId },
      _count: { status: true },
    });

    const summary = {
      present: 0,
      absent: 0,
      late: 0,
      excused: 0,
      total: 0,
      percentage: 0,
    };

    records.forEach((r) => {
      const count = r._count.status;
      summary.total += count;
      switch (r.status) {
        case 'PRESENT': summary.present = count; break;
        case 'ABSENT':  summary.absent = count; break;
        case 'LATE':    summary.late = count; break;
        case 'EXCUSED': summary.excused = count; break;
      }
    });

    summary.percentage = summary.total > 0
      ? Math.round(((summary.present + summary.late) / summary.total) * 100)
      : 0;

    return summary;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // DELETE (soft delete via status)
  // ─────────────────────────────────────────────────────────────────────────
  async remove(studentId: string, schoolId: string, deletedById: string) {
    const student = await this.prisma.student.findFirst({
      where: { id: studentId, schoolId },
    });
    if (!student) throw new NotFoundException('Student not found');

    // Soft delete — deactivate user + mark student inactive
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: student.userId },
        data: { isActive: false },
      }),
      this.prisma.student.update({
        where: { id: studentId },
        data: { status: 'INACTIVE' },
      }),
    ]);

    await this.auditService.log({
      schoolId,
      userId: deletedById,
      action: 'DELETE',
      resource: 'student',
      resourceId: studentId,
      oldValues: { admissionNo: student.admissionNo },
    });

    return { message: 'Student deactivated successfully' };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // UPLOAD AVATAR
  // ─────────────────────────────────────────────────────────────────────────
  async uploadAvatar(studentId: string, schoolId: string, file: Express.Multer.File) {
    const student = await this.prisma.student.findFirst({
      where: { id: studentId, schoolId },
      include: { user: true },
    });
    if (!student) throw new NotFoundException('Student not found');

    const key = `schools/${schoolId}/students/${studentId}/avatar-${Date.now()}.${file.originalname.split('.').pop()}`;
    const url = await this.storageService.upload(key, file.buffer, file.mimetype);

    await this.prisma.user.update({
      where: { id: student.userId },
      data: { avatar: url },
    });

    return { avatarUrl: url };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // STATS (for dashboard)
  // ─────────────────────────────────────────────────────────────────────────
  async getStats(schoolId: string) {
    const [total, active, byGender, recentAdmissions] = await Promise.all([
      this.prisma.student.count({ where: { schoolId } }),
      this.prisma.student.count({ where: { schoolId, status: 'ACTIVE' } }),
      this.prisma.student.groupBy({
        by: ['gender'],
        where: { schoolId, status: 'ACTIVE' },
        _count: { gender: true },
      }),
      this.prisma.student.count({
        where: {
          schoolId,
          createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
      }),
    ]);

    return {
      total,
      active,
      inactive: total - active,
      byGender: byGender.reduce((acc, g) => ({ ...acc, [g.gender]: g._count.gender }), {}),
      recentAdmissions,
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PRIVATE HELPERS
  // ─────────────────────────────────────────────────────────────────────────
  private formatStudent(student: any) {
    const { user, enrollments, ...rest } = student;
    const currentEnrollment = enrollments?.[0] ?? null;

    return {
      ...rest,
      userId: user?.id,
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      fullName: user ? `${user.firstName} ${user.lastName}` : '',
      phone: user?.phone,
      avatar: user?.avatar,
      isActive: user?.isActive,
      lastLoginAt: user?.lastLoginAt,
      currentClass: currentEnrollment?.section?.class ?? null,
      currentSection: currentEnrollment?.section
        ? { id: currentEnrollment.section.id, name: currentEnrollment.section.name }
        : null,
      currentAcademicYear: currentEnrollment?.academicYear ?? null,
      enrollments,
    };
  }

  private buildOrderBy(sortBy: string, sortOrder: 'asc' | 'desc') {
    const order = sortOrder ?? 'desc';
    switch (sortBy) {
      case 'firstName':
        return { user: { firstName: order } };
      case 'admissionNo':
        return { admissionNo: order };
      case 'admissionDate':
        return { admissionDate: order };
      default:
        return { createdAt: order };
    }
  }
}
