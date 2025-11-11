'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';

type SimulationStep = {
  id: number;
  code: string;
  description: string;
  state: 'pending' | 'running' | 'completed' | 'error';
  delay: number;
};

export default function AsyncSimulatorPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const steps: Step[] = [
    { id: 1, code: 'setLoading(true)', description: '로딩 상태 시작', state: 'pending', delay: 500 },
    { id: 2, code: 'await fetch(url)', description: 'API 요청 시작', state: 'pending', delay: 1500 },
    { id: 3, code: 'await response.json()', description: '응답 파싱', state: 'pending', delay: 800 },
    { id: 4, code: 'setData(result)', description: '데이터 저장', state: 'pending', delay: 500 },
    { id: 5, code: 'setLoading(false)', description: '로딩 완료', state: 'pending', delay: 300 },
  ];

  const [stepStates, setStepStates] = useState<Step[]>(steps);

  const runSimulation = async () => {
    setIsRunning(true);
    setCurrentStep(0);
    setLoading(false);
    setData(null);
    setError(null);
    setStepStates(steps.map(s => ({ ...s, state: 'pending' as const })));

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      setStepStates(prev => 
        prev.map((s, idx) => 
          idx === i ? { ...s, state: 'running' as const } : s
        )
      );

      // 실제 동작 시뮬레이션
      if (i === 0) setLoading(true);
      if (i === 3) setData('{ "message": "Success!", "items": [...] }');
      if (i === 4) setLoading(false);

      await new Promise(resolve => setTimeout(resolve, steps[i].delay));

      setStepStates(prev => 
        prev.map((s, idx) => 
          idx === i ? { ...s, state: 'completed' as const } : s
        )
      );
    }

    setIsRunning(false);
  };

  const runWithError = async () => {
    setIsRunning(true);
    setCurrentStep(0);
    setLoading(false);
    setData(null);
    setError(null);
    setStepStates(steps.map(s => ({ ...s, state: 'pending' as const })));

    for (let i = 0; i < 3; i++) {
      setCurrentStep(i);
      setStepStates(prev => 
        prev.map((s, idx) => 
          idx === i ? { ...s, state: 'running' as const } : s
        )
      );

      if (i === 0) setLoading(true);

      await new Promise(resolve => setTimeout(resolve, steps[i].delay));

      if (i === 2) {
        setStepStates(prev => 
          prev.map((s, idx) => 
            idx === i ? { ...s, state: 'error' as const } : s
          )
        );
        setError('Network Error: Failed to fetch');
        setLoading(false);
        setIsRunning(false);
        return;
      }

      setStepStates(prev => 
        prev.map((s, idx) => 
          idx === i ? { ...s, state: 'completed' as const } : s
        )
      );
    }
  };

  const reset = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setLoading(false);
    setData(null);
    setError(null);
    setStepStates(steps.map(s => ({ ...s, state: 'pending' as const })));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <PageHeader />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">🎬 비동기 흐름 리허설</h1>
          <p className="text-gray-600 text-lg">
            async/await의 실행 흐름을 단계별로 시각화하여 이해하세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 코드 영역 */}
          <div className="bg-gray-900 text-white rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-green-400">비동기 함수 코드</h2>
            <pre className="text-sm leading-relaxed">
              <code>{`async function fetchData() {
  try {
    setLoading(true);
    
    const response = await fetch(url);
    
    const result = await response.json();
    
    setData(result);
    
  } finally {
    setLoading(false);
  }
}`}</code>
            </pre>

            <div className="mt-6 space-y-3">
              <button
                onClick={runSimulation}
                disabled={isRunning}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {isRunning ? '실행 중...' : '▶ 정상 흐름 실행'}
              </button>
              <button
                onClick={runWithError}
                disabled={isRunning}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {isRunning ? '실행 중...' : '⚠️ 에러 발생 시뮬레이션'}
              </button>
              <button
                onClick={reset}
                disabled={isRunning}
                className="w-full bg-gray-700 hover:bg-gray-600 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                🔄 초기화
              </button>
            </div>
          </div>

          {/* 시뮬레이션 영역 */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">실행 흐름 시각화</h2>
              <div className="space-y-3">
                {stepStates.map((step, idx) => (
                  <div
                    key={step.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      step.state === 'running'
                        ? 'border-blue-500 bg-blue-50 scale-105'
                        : step.state === 'completed'
                        ? 'border-green-500 bg-green-50'
                        : step.state === 'error'
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          step.state === 'running'
                            ? 'bg-blue-500 text-white animate-pulse'
                            : step.state === 'completed'
                            ? 'bg-green-500 text-white'
                            : step.state === 'error'
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          {step.state === 'completed' ? '✓' : step.state === 'error' ? '✗' : idx + 1}
                        </div>
                        <div>
                          <code className="text-sm font-mono font-bold">{step.code}</code>
                          <p className="text-xs text-gray-600">{step.description}</p>
                        </div>
                      </div>
                      {step.state === 'running' && (
                        <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 상태 표시 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">현재 상태</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold">Loading:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    loading ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {loading ? 'true' : 'false'}
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold mb-2">Data:</div>
                  <pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
                    {data || 'null'}
                  </pre>
                </div>
                {error && (
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="font-semibold text-red-700 mb-2">Error:</div>
                    <pre className="text-xs text-red-600">{error}</pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 학습 포인트 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">💡 핵심 학습 포인트</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">1.</span>
              <span><strong>await는 Promise가 완료될 때까지 대기</strong>합니다. 다음 줄로 넘어가지 않아요.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">2.</span>
              <span><strong>try-catch로 에러 처리</strong>를 하지 않으면 앱이 멈출 수 있어요.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">3.</span>
              <span><strong>finally는 성공/실패 관계없이</strong> 항상 실행됩니다. 로딩 종료에 적합!</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">4.</span>
              <span><strong>setLoading은 즉시 실행</strong>되지만, 화면 업데이트는 비동기적으로 일어나요.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
