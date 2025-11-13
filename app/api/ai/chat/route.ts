import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

export const runtime = 'nodejs';

type ChatMessage = {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
};

function buildKoreanSystemPrompt(): ChatMessage {
  return {
    role: 'system',
    content:
      '너는 한국어로만 답변하는 친절한 시니어 개발 멘토야. 설명은 간결하게, 예시는 실용적으로, 단계별로 알려줘. 필요한 경우 코드블록을 포함하고, 과장된 표현은 피하고 정확성을 우선해.',
  };
}

function simulateAnswer(messages: ChatMessage[]): string {
  const lastMessage = messages[messages.length - 1];
  const userQuestion = lastMessage?.content?.toLowerCase?.() || '';

  if (userQuestion.includes('flexbox') || userQuestion.includes('flex')) {
    return `# Flexbox 핵심 요약 📦\n\n- display: flex; 로 컨테이너 활성화\n- 주축 정렬: justify-content, 교차축 정렬: align-items\n- 방향: flex-direction(row/column), 줄바꿈: flex-wrap\n- 간격은 gap으로 관리\n\n빠른 중앙정렬 스니펫:\n\n\`\`\`css\n.container{display:flex;justify-content:center;align-items:center}\n\`\`\``;
  }
  if (userQuestion.includes('async') || userQuestion.includes('await') || userQuestion.includes('promise')) {
    return `# async/await 한눈에 보기\n\n- 본질은 Promise, 문법만 간결\n- try/catch로 에러 처리 간단\n- \`Promise.all\` 로 병렬화 가능`;
  }
  if (userQuestion.includes('hook') || userQuestion.includes('react')) {
    return `# React Hooks 체크리스트\n\n- 최상위에서만 호출, 조건문/반복문 금지\n- 의존성 배열 엄격 관리\n- 자주 쓰는 조합: useState + useEffect + useMemo/useCallback`;
  }
  if (userQuestion.includes('디버깅') || userQuestion.includes('버그') || userQuestion.includes('에러')) {
    return `# 디버깅 루틴\n\n1) 재현 조건 고정 → 2) 에러 메시지/스택 정독 → 3) 최소 재현 코드 → 4) 이분탐색 주석 → 5) 원인 격리`;
  }
  return `좋은 질문이에요. 구체적인 코드/에러 메시지를 함께 주시면 더 정확히 도와드릴게요.`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messagesInput = (body?.messages || []) as ChatMessage[];
    const model = (body?.model as string) || process.env.OPENAI_MODEL || 'gpt-4o-mini';
    const temperature = typeof body?.temperature === 'number' ? body.temperature : 0.3;
    const maxTokens = typeof body?.max_tokens === 'number' ? body.max_tokens : undefined;

    if (!Array.isArray(messagesInput) || messagesInput.length === 0) {
      return NextResponse.json({ error: 'messages 배열이 비어 있습니다.' }, { status: 400 });
    }

    const system = buildKoreanSystemPrompt();
    const userMessages = messagesInput.map((m) => ({ role: m.role, content: String(m.content) })) as ChatMessage[];
    const toOpenAI = (m: ChatMessage): ChatCompletionMessageParam => {
      const role: 'system' | 'user' | 'assistant' =
        m.role === 'assistant' || m.role === 'system' || m.role === 'user' ? m.role : 'user';
      return { role, content: m.content };
    };

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // 키가 없으면 한국어 폴백 응답
      const response = simulateAnswer(userMessages);
      return NextResponse.json({ response, provider: 'fallback', model: 'local-sim' });
    }

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model,
      messages: [toOpenAI(system), ...userMessages.map(toOpenAI)],
      temperature,
      max_tokens: maxTokens,
    });

    const content = completion.choices?.[0]?.message?.content?.trim() || simulateAnswer(userMessages);

    return NextResponse.json({
      response: content,
      provider: 'openai',
      model,
      usage: completion.usage,
    });
  } catch (error) {
    console.error('AI chat error:', error);
    return NextResponse.json({ error: '응답 생성에 실패했습니다.' }, { status: 500 });
  }
}
