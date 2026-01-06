import { NextResponse } from 'next/server';
import { generateThreatStatistics } from '@/lib/mockData';

export async function GET() {
  try {
    const statistics = generateThreatStatistics();
    return NextResponse.json(statistics);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
