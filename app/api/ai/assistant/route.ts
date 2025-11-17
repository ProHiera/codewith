import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message, context_type, context_id } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // OpenAI API 호출
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `당신은 친절하고 전문적인 프로그래밍 학습 도우미입니다. 
학생들이 개념을 이해하고, 코드 작성을 돕고, 질문에 답변합니다.
답변은 명확하고 이해하기 쉬우며, 적절한 예시를 포함해야 합니다.
학생의 수준에 맞춰 설명하고, 격려하는 톤을 유지하세요.`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const aiMessage = completion.choices[0]?.message?.content || '응답을 생성할 수 없습니다.';

    // Supabase에 대화 기록 저장 (선택적)
    const authHeader = request.headers.get('authorization');
    if (authHeader && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
          global: {
            headers: {
              Authorization: authHeader,
            },
          },
        }
      );

      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // 사용자 메시지 저장
        await supabase.from('ai_chat_history').insert({
          user_id: user.id,
          role: 'user',
          content: message,
          context_type,
          context_id,
        });

        // AI 응답 저장
        await supabase.from('ai_chat_history').insert({
          user_id: user.id,
          role: 'assistant',
          content: aiMessage,
          context_type,
          context_id,
        });
      }
    }

    return NextResponse.json({
      message: aiMessage,
    });
  } catch {
    // Silent fail - return error response to client
    return NextResponse.json(
      { error: 'Failed to generate AI response' },
      { status: 500 }
    );
  }
}

// 대화 기록 조회
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: authHeader,
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 최근 대화 기록 조회
    const { data, error } = await supabase
      .from('ai_chat_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch {
    // Silent fail - return error response to client
    return NextResponse.json(
      { error: 'Failed to fetch chat history' },
      { status: 500 }
    );
  }
}
