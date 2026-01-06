import { NextResponse } from 'next/server';
import { generateMLModelMetrics } from '@/lib/mockData';

export async function GET() {
  try {
    const models = generateMLModelMetrics();
    return NextResponse.json(models);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch ML models' },
      { status: 500 }
    );
  }
}
