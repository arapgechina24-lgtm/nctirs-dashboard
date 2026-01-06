import { NextResponse } from 'next/server';
import { generateAutomatedResponses } from '@/lib/mockData';

export async function GET() {
  try {
    const responses = generateAutomatedResponses();
    return NextResponse.json(responses);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch automated responses' },
      { status: 500 }
    );
  }
}
