import { NextResponse } from 'next/server';
import { generateComplianceStatus } from '@/lib/mockData';

export async function GET() {
  try {
    const compliance = generateComplianceStatus();
    return NextResponse.json(compliance);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch compliance data' },
      { status: 500 }
    );
  }
}
