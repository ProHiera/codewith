import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface CategorizeRequest {
  content: string;
  subject?: string;
}

export interface CategorizeResponse {
  category: 'memorize' | 'reference' | 'practice';
  confidence: number; // 0-1
  reasoning: string;
  highlights: {
    text: string;
    type: 'memorize' | 'reference';
  }[];
  studyTips: string[];
}

/**
 * POST /api/ai/categorize
 * 
 * AI가 학습 내용을 분석하여 자동으로 분류
 * - memorize (노란색): 외워야 할 것 (공식, 문법, 정의, 키워드)
 * - reference (파란색): 이해만 하면 될 것 (개념, 예시, 배경 지식)
 * - practice (보라색): 실습이 필요한 것 (코드, 문제)
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CategorizeRequest;
    const { content, subject = 'general' } = body;

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `당신은 학습 내용 분석 전문가입니다. 주어진 텍스트를 분석하여:

1. 전체 카테고리 분류:
   - memorize: 정확히 외워야 하는 것 (공식, 문법 규칙, 정의, 특정 키워드, 암기 사항)
   - reference: 개념적으로 이해하면 되는 것 (원리, 예시, 배경 지식, 참고 사항)
   - practice: 직접 실습해야 하는 것 (코드 예제, 문제 풀이, 실습 과제)

2. 세부 하이라이트:
   - 텍스트 내에서 특별히 외워야 할 부분 (memorize)
   - 참고만 하면 되는 부분 (reference)

3. 학습 팁:
   - ADHD 친화적인 짧고 구체적인 학습 방법 제시
   - 5분 내에 실행 가능한 액션 아이템

응답은 반드시 다음 JSON 형식으로:
{
  "category": "memorize" | "reference" | "practice",
  "confidence": 0.0 ~ 1.0,
  "reasoning": "분류 이유 설명",
  "highlights": [
    { "text": "외워야 할 텍스트", "type": "memorize" },
    { "text": "참고할 텍스트", "type": "reference" }
  ],
  "studyTips": ["팁1", "팁2", "팁3"]
}`,
        },
        {
          role: 'user',
          content: `주제: ${subject}\n\n내용:\n${content}`,
        },
      ],
      temperature: 0.3, // 일관성을 위해 낮은 temperature
    });

    const aiResponse = completion.choices[0]?.message?.content;
    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    // JSON 파싱
    const result = JSON.parse(aiResponse) as CategorizeResponse;

    return NextResponse.json(result);
  } catch (error) {
    // Silent fail - return error response to client
    return NextResponse.json(
      { error: 'Failed to categorize content' },
      { status: 500 }
    );
  }
}
