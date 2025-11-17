'use client';

import { useState } from 'react';

export default function TestAIPage() {
  const [content, setContent] = useState(
    `useState는 React에서 상태를 관리하는 Hook입니다.

문법: const [state, setState] = useState(initialValue)

예제:
const [count, setCount] = useState(0);

주의사항:
- 반드시 컴포넌트 최상위에서만 호출해야 합니다
- 조건문이나 반복문 안에서 사용하면 안됩니다`
  );
  const [subject, setSubject] = useState('React Hooks');
  const [result, setResult] = useState<{
    category?: string;
    confidence?: number;
    reasoning?: string;
    highlights?: { text: string; type: string }[];
    studyTips?: string[];
    error?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai/categorize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          subject,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult({ error: String(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🤖 AI Categorize API 테스트</h1>

        {/* 입력 영역 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              주제
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
              placeholder="예: React Hooks"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              학습 내용
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none h-64 font-mono text-sm"
              placeholder="분석할 학습 내용을 입력하세요..."
            />
          </div>

          <button
            onClick={handleTest}
            disabled={loading}
            className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg transition-all disabled:bg-gray-400"
          >
            {loading ? '⏳ AI 분석 중...' : '🚀 AI 분석 시작'}
          </button>
        </div>

        {/* 결과 영역 */}
        {result && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">📊 분석 결과</h2>

            {result.error ? (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-700">
                <strong>에러:</strong> {result.error}
              </div>
            ) : (
              <div className="space-y-4">
                {/* 카테고리 */}
                <div>
                  <div className="text-sm font-semibold text-gray-600 mb-2">
                    분류 결과
                  </div>
                  <div
                    className={`inline-block px-4 py-2 rounded-xl font-bold text-lg ${
                      result.category === 'memorize'
                        ? 'bg-yellow-100 text-yellow-700'
                        : result.category === 'reference'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {result.category === 'memorize'
                      ? '📝 외워야 할 것'
                      : result.category === 'reference'
                        ? '📖 이해만 하면 될 것'
                        : '💻 실습이 필요한 것'}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    확신도: {Math.round((result.confidence || 0) * 100)}%
                  </div>
                </div>

                {/* 이유 */}
                <div>
                  <div className="text-sm font-semibold text-gray-600 mb-2">
                    분류 이유
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-gray-700">
                    {result.reasoning}
                  </div>
                </div>

                {/* 하이라이트 */}
                {result.highlights && result.highlights.length > 0 && (
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-2">
                      세부 하이라이트
                    </div>
                    <div className="space-y-2">
                      {result.highlights.map((h, i: number) => (
                        <div
                          key={i}
                          className={`p-3 rounded-xl ${
                            h.type === 'memorize'
                              ? 'bg-yellow-50 border border-yellow-200'
                              : 'bg-blue-50 border border-blue-200'
                          }`}
                        >
                          <span
                            className={`text-xs font-semibold ${
                              h.type === 'memorize'
                                ? 'text-yellow-700'
                                : 'text-blue-700'
                            }`}
                          >
                            {h.type === 'memorize' ? '📝 외우기' : '📖 참고'}
                          </span>
                          <div className="text-sm text-gray-700 mt-1">
                            {h.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 학습 팁 */}
                {result.studyTips && result.studyTips.length > 0 && (
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-2">
                      💡 ADHD 친화적 학습 팁
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                      <ul className="space-y-2 text-sm text-purple-700">
                        {result.studyTips.map((tip: string, i: number) => (
                          <li key={i}>• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Raw JSON */}
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-800">
                    🔍 전체 JSON 응답 보기
                  </summary>
                  <pre className="mt-2 bg-gray-900 text-green-400 rounded-xl p-4 text-xs overflow-auto">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </div>
        )}

        {/* API 정보 */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="font-bold text-blue-800 mb-2">📡 API 엔드포인트</h3>
          <code className="text-sm bg-white px-3 py-1 rounded-lg">
            POST /api/ai/categorize
          </code>

          <div className="mt-4 text-sm text-blue-700">
            <strong>Request Body:</strong>
            <pre className="bg-white rounded-lg p-3 mt-2 text-xs">
              {`{
  "content": "분석할 학습 내용",
  "subject": "주제 (선택사항)"
}`}
            </pre>
          </div>

          <div className="mt-4 text-sm text-blue-700">
            <strong>Response:</strong>
            <pre className="bg-white rounded-lg p-3 mt-2 text-xs">
              {`{
  "category": "memorize" | "reference" | "practice",
  "confidence": 0.0 ~ 1.0,
  "reasoning": "분류 이유",
  "highlights": [
    { "text": "하이라이트", "type": "memorize|reference" }
  ],
  "studyTips": ["팁1", "팁2", ...]
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
