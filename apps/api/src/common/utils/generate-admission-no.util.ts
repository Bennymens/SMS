import { PrismaService } from '../../database/prisma.service';

/**
 * Generates an admission number in the format: SCH-YYYY-XXXXX
 * Example: SCH-2025-00042
 */
export async function generateAdmissionNo(
  prisma: PrismaService,
  schoolId: string,
): Promise<string> {
  const currentYear = new Date().getFullYear();
  const prefix = `SCH-${currentYear}`;

  // Find the highest sequence number for this school and year
  const count = await prisma.student.count({
    where: {
      schoolId,
      admissionNo: {
        startsWith: prefix,
      },
    },
  });

  const nextSeq = (count + 1).toString().padStart(5, '0');
  return `${prefix}-${nextSeq}`;
}
