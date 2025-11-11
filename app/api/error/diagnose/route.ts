import { NextRequest, NextResponse } from 'next/server';
import { ErrorDoctor } from '@/lib/error-doctor/analyzer';

export async function POST(request: NextRequest) {
  try {
    const { logText } = await request.json();

    if (!logText) {
      return NextResponse.json(
        { error: 'Log text is required' },
        { status: 400 }
      );
    }

    const analysis = ErrorDoctor.diagnose(logText);
    const graph = ErrorDoctor.generateFixGraph(analysis);

    return NextResponse.json({
      ...analysis,
      graph,
    });
  } catch (error) {
    console.error('Diagnosis error:', error);
    return NextResponse.json(
      { error: 'Failed to diagnose error' },
      { status: 500 }
    );
  }
}
