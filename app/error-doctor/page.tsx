'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import PageHeader from '@/components/PageHeader';

interface DiagnosisResult {
  rootCause: string;
  fixPatch: string;
  severity?: string;
}

export default function ErrorDoctorPage() {
  const router = useRouter();
  const [logText, setLogText] = useState('');
  const [analysis, setAnalysis] = useState<DiagnosisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDiagnose = async () => {
    if (!logText.trim()) {
      alert('에러 로그를 입력해주세요');
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      // Call diagnosis API
      const response = await fetch('/api/error/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logText }),
      });

      const result = await response.json();

      // Save to database
      await supabase.from('errors').insert({
        user_id: user.id,
        log_text: logText,
        root_cause: result.rootCause,
        fix_patch: result.fixPatch,
      });

      setAnalysis(result);
    } catch {
      alert('진단에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <PageHeader />
          <div className="flex justify-between items-center mt-4">
            <h1 className="text-2xl font-bold">에러 닥터 🩺</h1>
            <button
              onClick={() => router.push('/missions')}
              className="text-blue-600 hover:text-blue-500"
            >
              미션으로 돌아가기
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">에러 로그 입력</h2>
          <p className="text-gray-600 mb-4">
            콘솔 에러나 빌드 로그를 붙여넣으면 원인을 분석하고 해결 방법을 제안합니다.
          </p>
          
          <textarea
            value={logText}
            onChange={(e) => setLogText(e.target.value)}
            placeholder="여기에 에러 로그를 붙여넣으세요...&#10;&#10;예시:&#10;TypeError: Cannot read property 'map' of undefined&#10;  at Component.render (App.js:42:15)"
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />

          <button
            onClick={handleDiagnose}
            disabled={loading || !logText.trim()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? '분석 중...' : '진단하기'}
          </button>
        </div>

        {analysis && (
          <div className="space-y-6">
            {/* Category Badge */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">진단 결과</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    analysis.severity === 'high' ? 'bg-red-100 text-red-800' :
                    analysis.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {analysis.category}
                  </span>
                </div>
                <div className={`text-3xl ${
                  analysis.severity === 'high' ? 'text-red-500' :
                  analysis.severity === 'medium' ? 'text-yellow-500' :
                  'text-green-500'
                }`}>
                  {analysis.severity === 'high' ? '🔴' :
                   analysis.severity === 'medium' ? '🟡' : '🟢'}
                </div>
              </div>
            </div>

            {/* Root Cause */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="text-2xl mr-2">🔍</span>
                원인
              </h3>
              <p className="text-gray-700 text-lg">{analysis.rootCause}</p>
            </div>

            {/* Solution Steps */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="text-2xl mr-2">🛠️</span>
                해결 단계
              </h3>
              <ol className="space-y-3">
                {analysis.steps.map((step: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold mr-3">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Fix Patch */}
            {analysis.fixPatch && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="text-2xl mr-2">💊</span>
                  수정 패치
                </h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{analysis.fixPatch}</code>
                </pre>
              </div>
            )}

            {/* Graph Visualization */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="text-2xl mr-2">📊</span>
                원인 그래프
              </h3>
              <pre className="bg-gray-50 p-4 rounded-lg text-sm whitespace-pre-wrap">
                {analysis.graph}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
