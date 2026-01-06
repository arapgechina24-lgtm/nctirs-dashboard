import { NextResponse } from 'next/server';
import { generateThreatAlert } from '@/lib/mockData';

export async function GET() {
  try {
    // Generate 20 recent threat alerts
    const threats = Array.from({ length: 20 }, () => generateThreatAlert());

    // Sort by timestamp (most recent first)
    threats.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return NextResponse.json(threats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch threats' },
      { status: 500 }
    );
  }
}
