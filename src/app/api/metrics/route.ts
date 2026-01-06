import { NextResponse } from 'next/server';
import { generateSystemMetrics } from '@/lib/mockData';

export async function GET() {
  try {
    const metrics = generateSystemMetrics();
    return NextResponse.json(metrics);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    );
  }
}
