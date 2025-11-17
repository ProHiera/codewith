"use client";

import { useEffect, useRef, useState } from 'react';

type Msg = { role: 'user' | 'assistant'; content: string };

export default function AIChatPanel() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'assistant',
      content:
        '안녕하세요! 저는 한국어로 답변하는 개발 AI 코치예요. 무엇이든 편하게 물어보세요. (예: "useEffect 의존성 배열 설명해줘")',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    const next = [...messages, { role: 'user', content: text } as Msg];
    setMessages(next);

    try {
      setLoading(true);
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      const answer = (data?.response as string) || '응답 생성에 실패했어요.';
      setMessages((prev) => [...prev, { role: 'assistant', content: answer }]);
  } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '서버 오류가 발생했어요. 잠시 후 다시 시도해주세요.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  }

  return (
    <aside className="border border-gray-200 rounded-xl bg-white shadow-sm flex flex-col h-full">
      <div className="px-4 py-3 border-b flex items-center gap-2">
        <span className="text-2xl">🤖</span>
        <div>
          <div className="font-semibold">AI 개발 코치</div>
          <div className="text-xs text-gray-500">한국어 전용 · 즉답 코치</div>
        </div>
      </div>
      <div ref={listRef} className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === 'assistant'
                ? 'bg-purple-50 border border-purple-200 rounded-lg p-4 text-[15px] md:text-base leading-relaxed whitespace-pre-wrap wrap-break-word text-gray-900'
                : 'bg-blue-50 border border-blue-200 rounded-lg p-4 text-[15px] md:text-base leading-relaxed whitespace-pre-wrap wrap-break-word text-gray-800'
            }
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="text-xs text-gray-500">생각 중…</div>
        )}
      </div>
      <div className="p-3 border-t">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="질문을 입력하고 Enter로 전송 (Shift+Enter 줄바꿈)"
            className="flex-1 resize-none rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm disabled:opacity-50"
          >
            전송
          </button>
        </div>
      </div>
    </aside>
  );
}
