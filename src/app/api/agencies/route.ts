import { NextResponse } from 'next/server';
import { generateAgencyCollaboration } from '@/lib/mockData';

export async function GET() {
  try {
    const agencies = generateAgencyCollaboration();
    return NextResponse.json(agencies);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch agency data' },
      { status: 500 }
    );
  }
}
