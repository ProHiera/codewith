'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function AICoachPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '안녕하세요! 저는 당신의 전용 개발 코치입니다. 🤖\n\n코딩 문제, 개념 이해, 커리어 고민 등 무엇이든 물어보세요!\n\n💡 팁: 구체적인 코드나 에러 메시지를 공유하면 더 정확한 도움을 드릴 수 있어요.',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const quickQuestions = [
    '🎯 CSS Flexbox를 쉽게 설명해주세요',
    '🔧 async/await와 Promise의 차이는?',
    '📚 React Hook 사용법 알려주세요',
    '💼 주니어 개발자 취업 팁',
    '🐛 디버깅 잘하는 방법',
  ];

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Call AI API
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();

      const aiMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Save conversation to database
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('ai_conversations').upsert({
          user_id: user.id,
          messages: [...messages, userMessage, aiMessage],
          context_type: 'general',
        });
      }
    } catch (error) {
      console.error('AI chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: '죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해주세요.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const saveAsNote = async (content: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const title = content.substring(0, 50) + (content.length > 50 ? '...' : '');
      
      await supabase.from('notes').insert({
        user_id: user.id,
        title,
        content,
        is_ai_generated: true,
        tags: ['ai-coach'],
      });

      alert('메모로 저장되었습니다!');
    } catch (error) {
      console.error('Save note error:', error);
      alert('저장에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">AI 개발 코치 🤖</h1>
            <div className="space-x-4">
              <button
                onClick={() => router.push('/missions')}
                className="text-blue-600 hover:text-blue-500"
              >
                미션
              </button>
              <button
                onClick={() => router.push('/notes')}
                className="text-blue-600 hover:text-blue-500"
              >
                내 메모
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="text-blue-600 hover:text-blue-500"
              >
                대시보드
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Questions */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">자주 묻는 질문</h3>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(question)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-sm transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="bg-white rounded-lg shadow mb-4">
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start gap-2 mb-1">
                    <span className="text-2xl">
                      {message.role === 'user' ? '👤' : '🤖'}
                    </span>
                    <div className="flex-1">
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      {message.role === 'assistant' && (
                        <button
                          onClick={() => saveAsNote(message.content)}
                          className="mt-2 text-xs underline opacity-70 hover:opacity-100"
                        >
                          📝 메모로 저장
                        </button>
                      )}
                    </div>
                  </div>
                  <p
                    className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-blue-200' : 'text-gray-500'
                    }`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString('ko-KR')}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🤖</span>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="무엇이든 물어보세요..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              전송
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 AI 응답은 참고용입니다. 중요한 결정은 공식 문서를 확인하세요.
          </p>
        </div>
      </div>
    </div>
  );
}
