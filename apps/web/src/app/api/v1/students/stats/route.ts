import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    total: 840,
    active: 812,
    inactive: 28,
    byGender: { MALE: 430, FEMALE: 410 },
    recentAdmissions: 24,
  });
}
