import { NextRequest, NextResponse } from 'next/server';
import { CSSGrader, CSSGradeResult } from '@/lib/graders/css-grader';

interface GradeResult {
  score: number;
  feedback: string;
  passed: boolean;
  diff?: unknown;
}

export async function POST(request: NextRequest) {
  try {
    const { code, type, expected } = await request.json();

    let result: GradeResult;

    switch (type) {
      case 'css':
        result = CSSGrader.grade(code, expected);
        break;
      
      case 'javascript':
        // JavaScript grader would go here
        result = {
          score: 0,
          feedback: 'JavaScript 채점은 아직 구현 중입니다.',
          passed: false,
        };
        break;
      
      default:
        return NextResponse.json(
          { error: 'Unsupported mission type' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      score: result.score,
      feedback: result.feedback,
      diff: result.diff || null,
      passed: result.passed,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to grade submission' },
      { status: 500 }
    );
  }
}
