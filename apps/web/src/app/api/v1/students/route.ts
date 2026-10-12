import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase() || '';
  const status = searchParams.get('status');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '15', 10);

  const allStudents = [
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
      phone: '+1 555-0193',
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
    {
      id: 'stud-3',
      userId: 'u-3',
      admissionNo: 'SCH-2025-00003',
      admissionDate: '2025-09-02',
      dateOfBirth: '2009-11-05',
      gender: 'FEMALE',
      status: 'ACTIVE',
      firstName: 'Sophia',
      lastName: 'Al-Mansoor',
      fullName: 'Sophia Al-Mansoor',
      email: 'sophia.m@student.school.edu',
      phone: '+1 555-0194',
      isActive: true,
      currentClass: { id: 'c-11', name: 'Grade 11', level: 11 },
      currentSection: { id: 'sec-a', name: 'A' },
      currentAcademicYear: { id: 'ay-24', name: '2024/2025' },
      parentLinks: [
        {
          relationship: 'Mother',
          parent: {
            user: {
              firstName: 'Fatima',
              lastName: 'Al-Mansoor',
              phone: '+1 555-2311',
              email: 'fatima.m@example.com',
            },
          },
        },
      ],
    },
    {
      id: 'stud-4',
      userId: 'u-4',
      admissionNo: 'SCH-2025-00004',
      admissionDate: '2025-09-02',
      dateOfBirth: '2010-02-18',
      gender: 'MALE',
      status: 'SUSPENDED',
      firstName: 'Lucas',
      lastName: 'Dubois',
      fullName: 'Lucas Dubois',
      email: 'lucas.d@student.school.edu',
      phone: '+1 555-0195',
      isActive: false,
      currentClass: { id: 'c-10', name: 'Grade 10', level: 10 },
      currentSection: { id: 'sec-a', name: 'A' },
      currentAcademicYear: { id: 'ay-24', name: '2024/2025' },
      parentLinks: [],
    },
    {
      id: 'stud-5',
      userId: 'u-5',
      admissionNo: 'SCH-2025-00005',
      admissionDate: '2025-09-03',
      dateOfBirth: '2011-07-09',
      gender: 'FEMALE',
      status: 'INACTIVE',
      firstName: 'Chloe',
      lastName: 'Taylor',
      fullName: 'Chloe Taylor',
      email: 'chloe.t@student.school.edu',
      phone: '+1 555-0196',
      isActive: false,
      currentClass: { id: 'c-9', name: 'Grade 9', level: 9 },
      currentSection: { id: 'sec-c', name: 'C' },
      currentAcademicYear: { id: 'ay-24', name: '2024/2025' },
      parentLinks: [],
    },
  ];

  let filtered = allStudents;
  if (status) {
    filtered = filtered.filter((s) => s.status === status);
  }
  if (search) {
    filtered = filtered.filter(
      (s) =>
        s.fullName.toLowerCase().includes(search) ||
        s.email.toLowerCase().includes(search) ||
        s.admissionNo.toLowerCase().includes(search)
    );
  }

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  return NextResponse.json({
    data: paginated,
    meta: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize) || 1,
    },
  });
}
