import { NextResponse } from 'next/server';
import { generateGeographicThreats } from '@/lib/mockData';

export async function GET() {
  try {
    const geoThreats = generateGeographicThreats();
    return NextResponse.json(geoThreats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch geographic threats' },
      { status: 500 }
    );
  }
}
