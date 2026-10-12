import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto, UpdateStudentStatusDto } from './dto/update-student.dto';
import { QueryStudentDto } from './dto/query-student.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { SchoolId } from '../../common/decorators/school-id.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role } from '@prisma/client';

@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.SCHOOL_ADMIN, Role.PRINCIPAL, Role.TEACHER, Role.ACCOUNTANT)
  async findAll(@SchoolId() schoolId: string, @Query() query: QueryStudentDto) {
    return this.studentsService.findAll(schoolId, query);
  }

  @Get('stats')
  @Roles(Role.SUPER_ADMIN, Role.SCHOOL_ADMIN, Role.PRINCIPAL)
  async getStats(@SchoolId() schoolId: string) {
    return this.studentsService.getStats(schoolId);
  }

  @Get(':id')
  @Roles(
    Role.SUPER_ADMIN,
    Role.SCHOOL_ADMIN,
    Role.PRINCIPAL,
    Role.TEACHER,
    Role.ACCOUNTANT,
    Role.PARENT,
    Role.STUDENT,
  )
  async findOne(@Param('id') id: string, @SchoolId() schoolId: string) {
    return this.studentsService.findOne(id, schoolId);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.SCHOOL_ADMIN, Role.PRINCIPAL)
  async create(
    @SchoolId() schoolId: string,
    @Body() createStudentDto: CreateStudentDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.studentsService.create(schoolId, createStudentDto, userId);
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN, Role.SCHOOL_ADMIN, Role.PRINCIPAL)
  async update(
    @Param('id') id: string,
    @SchoolId() schoolId: string,
    @Body() updateStudentDto: UpdateStudentDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.studentsService.update(id, schoolId, updateStudentDto, userId);
  }

  @Patch(':id/status')
  @Roles(Role.SUPER_ADMIN, Role.SCHOOL_ADMIN, Role.PRINCIPAL)
  async updateStatus(
    @Param('id') id: string,
    @SchoolId() schoolId: string,
    @Body() updateStatusDto: UpdateStudentStatusDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.studentsService.updateStatus(id, schoolId, updateStatusDto, userId);
  }

  @Post(':id/promote')
  @Roles(Role.SUPER_ADMIN, Role.SCHOOL_ADMIN, Role.PRINCIPAL)
  async promote(
    @Param('id') id: string,
    @SchoolId() schoolId: string,
    @Body('newSectionId') newSectionId: string,
    @Body('newAcademicYearId') newAcademicYearId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.studentsService.promote(id, schoolId, newSectionId, newAcademicYearId, userId);
  }

  @Get(':id/attendance-summary')
  @Roles(
    Role.SUPER_ADMIN,
    Role.SCHOOL_ADMIN,
    Role.PRINCIPAL,
    Role.TEACHER,
    Role.PARENT,
    Role.STUDENT,
  )
  async getAttendanceSummary(
    @Param('id') id: string,
    @SchoolId() schoolId: string,
    @Query('termId') termId: string,
  ) {
    return this.studentsService.getAttendanceSummary(id, schoolId, termId);
  }

  @Post(':id/avatar')
  @Roles(Role.SUPER_ADMIN, Role.SCHOOL_ADMIN, Role.PRINCIPAL)
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @Param('id') id: string,
    @SchoolId() schoolId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.studentsService.uploadAvatar(id, schoolId, file);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN, Role.SCHOOL_ADMIN)
  async remove(
    @Param('id') id: string,
    @SchoolId() schoolId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.studentsService.remove(id, schoolId, userId);
  }
}
