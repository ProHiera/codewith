'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * WeaknessAnalytics - AI 기반 약점 분석 대시보드
 * 
 * 학습 데이터를 AI로 분석하여:
 * - 자주 틀리는 개념 파악
 * - 복습이 필요한 카드 우선순위화
 * - 개인화된 학습 경로 추천
 * - 약점 극복 진척도 시각화
 */

export interface WeakConcept {
  id: string;
  title: string;
  category: string;
  failureRate: number; // 0-100
  lastAttempt: Date;
  recommendedCards: string[];
  aiInsight: string;
}

export interface WeaknessAnalyticsProps {
  userId: string;
  className?: string;
}

export default function WeaknessAnalytics({
  userId,
  className = '',
}: WeaknessAnalyticsProps) {
  const [weakConcepts, setWeakConcepts] = useState<WeakConcept[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConcept] = useState<WeakConcept | null>(
    null
  );

  useEffect(() => {
    const load = async () => {
      // Future enhancement: Replace sample data with API call
      // const response = await fetch(`/api/analytics/weaknesses?userId=${userId}`);

      // 샘플 데이터
      setWeakConcepts([
        {
          id: '1',
          title: 'useEffect 의존성 배열',
          category: 'React Hooks',
          failureRate: 75,
          lastAttempt: new Date(),
          recommendedCards: ['c1', 'c2', 'c3'],
          aiInsight:
            '의존성 배열의 개념은 이해하셨지만, 빈 배열과 의존성이 있는 경우의 차이를 헷갈려 하시네요. 실습 예제를 3개 더 풀어보시면 확실히 이해하실 거예요!',
        },
        {
          id: '2',
          title: 'JavaScript 클로저',
          category: 'JavaScript 기초',
          failureRate: 60,
          lastAttempt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          recommendedCards: ['c4', 'c5'],
          aiInsight:
            '클로저의 기본 개념은 잘 아시는 것 같아요. 하지만 실제 코드에서 활용하는 패턴이 아직 익숙하지 않으신 것 같습니다. 실전 예제를 통해 연습하시면 좋겠어요.',
        },
        {
          id: '3',
          title: 'Promise 체이닝',
          category: '비동기 프로그래밍',
          failureRate: 50,
          lastAttempt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          recommendedCards: ['c6', 'c7', 'c8'],
          aiInsight:
            'async/await는 잘 사용하시는데, Promise의 .then() 체이닝을 어려워하시네요. 사실 async/await를 알면 충분해요! 참고만 하시면 됩니다.',
        },
      ]);

      setLoading(false);
    };
    void load();
  }, []);

  const getFailureColor = (rate: number): string => {
    if (rate >= 70) return 'from-red-500 to-pink-500';
    if (rate >= 50) return 'from-orange-500 to-yellow-500';
    return 'from-green-500 to-emerald-500';
  };

  const getFailureBadgeColor = (rate: number): string => {
    if (rate >= 70) return 'bg-red-100 text-red-700';
    if (rate >= 50) return 'bg-orange-100 text-orange-700';
    return 'bg-green-100 text-green-700';
  };

  const getCategoryEmoji = (category: string): string => {
    if (category.includes('React')) return '⚛️';
    if (category.includes('JavaScript')) return '🟨';
    if (category.includes('비동기')) return '⏱️';
    return '📚';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">약점 분석 중...</div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 헤더 */}
      <div className="bg-linear-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">🎯 약점 분석</h3>
            <p className="text-purple-100 text-sm">
              AI가 분석한 당신의 학습 약점을 확인하세요
            </p>
          </div>
          <div className="text-5xl">🤖</div>
        </div>
      </div>

      {/* 개선 중인 약점이 없을 때 */}
      {weakConcepts.length === 0 && (
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
          <div className="text-6xl mb-3">🎉</div>
          <h4 className="text-lg font-bold text-green-800 mb-2">
            모든 개념을 완벽하게 이해하셨어요!
          </h4>
          <p className="text-sm text-green-600">
            새로운 내용을 학습하거나 고급 주제에 도전해보세요.
          </p>
        </div>
      )}

      {/* 약점 목록 */}
      <div className="space-y-4">
        {weakConcepts.map((concept, index) => (
          <motion.div
            key={concept.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border-2 border-gray-200 rounded-2xl p-5 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">
                    {getCategoryEmoji(concept.category)}
                  </span>
                  <h5 className="font-bold text-gray-800">{concept.title}</h5>
                </div>
                <div className="text-xs text-gray-500 mb-3">
                  {concept.category}
                </div>
              </div>
              <span
                className={`px-3 py-1 text-sm font-bold rounded-full ${getFailureBadgeColor(concept.failureRate)}`}
              >
                실패율 {concept.failureRate}%
              </span>
            </div>

            {/* 실패율 진행바 */}
            <div className="mb-3">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-linear-to-r ${getFailureColor(concept.failureRate)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${concept.failureRate}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              </div>
            </div>

            {/* AI 인사이트 */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <span className="text-lg">💡</span>
                <p className="text-sm text-purple-800 flex-1">
                  {concept.aiInsight}
                </p>
              </div>
            </div>

            {/* 추천 카드 */}
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
              <span>📝 추천 복습 카드:</span>
              <span className="font-semibold">
                {concept.recommendedCards.length}개
              </span>
              <button className="ml-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold text-sm transition-all">
                복습 시작
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 전체 통계 */}
      <div className="bg-linear-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6">
        <h4 className="font-bold text-gray-800 mb-4">📊 전체 통계</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-red-600">
              {weakConcepts.filter((c) => c.failureRate >= 70).length}
            </div>
            <div className="text-xs text-gray-600 mt-1">긴급 복습 필요</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-orange-600">
              {weakConcepts.filter((c) => c.failureRate >= 50 && c.failureRate < 70).length}
            </div>
            <div className="text-xs text-gray-600 mt-1">복습 권장</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-green-600">
              {weakConcepts.filter((c) => c.failureRate < 50).length}
            </div>
            <div className="text-xs text-gray-600 mt-1">개선 중</div>
          </div>
        </div>
      </div>

      {/* AI 추천 */}
      <div className="bg-linear-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <div className="text-3xl">🤖</div>
          <div className="flex-1">
            <h4 className="font-bold text-yellow-800 mb-2">
              AI 학습 코치의 조언
            </h4>
            <ul className="space-y-2 text-sm text-yellow-700">
              <li>
                • <strong>우선순위:</strong> &quot;useEffect 의존성 배열&quot;을 먼저
                마스터하세요
              </li>
              <li>
                • <strong>학습 전략:</strong> 이론보다 실습 위주로 연습하시면
                효과적입니다
              </li>
              <li>
                • <strong>예상 시간:</strong> 약 30분 투자하면 큰 진전을 보실
                거예요
              </li>
              <li>
                • <strong>격려:</strong> 약점이 있다는 건 성장할 기회가 있다는
                뜻이에요! 💪
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
