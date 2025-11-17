'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User } from '@supabase/supabase-js';
import LearningCard, { MemorizeHighlight } from '@/components/LearningCard';
import HintPanel from '@/components/HintPanel';
import QuizPopup from '@/components/QuizPopup';
import HooksGameCard from '@/components/HooksGameCard';
import ProgressAnimation from '@/components/ProgressAnimation';
import AIAssistant from '@/components/AIAssistant';
import CommunityPost from '@/components/CommunityPost';
import { supabase } from '@/lib/supabase/client';

/**
 * 통합 학습 허브
 * 모든 학습 기능이 통합된 메인 페이지
 */

export default function LearningHubPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'community'>('learn');
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
      setLoading(false);

      // 3초 후 퀴즈 표시
      setTimeout(() => setShowQuiz(true), 3000);
    }
    loadUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  const sampleQuiz = {
    id: 'q1',
    question: 'React에서 useState Hook의 반환값은?',
    options: ['상태값만', '[상태값, 설정함수]', '객체', '함수만'],
    correctAnswer: 1,
    explanation: 'useState는 배열로 [상태값, 설정함수]를 반환합니다.',
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <nav className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">🎓 학습 허브</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button
              onClick={() => router.push('/dashboard')}
              className="text-blue-600 hover:text-blue-700"
            >
              대시보드
            </button>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 flex gap-8">
          {[
            { key: 'learn', label: '📚 학습' },
            { key: 'practice', label: '🎮 연습' },
            { key: 'community', label: '👥 커뮤니티' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-6 py-4 font-semibold border-b-4 transition ${
                activeTab === tab.key
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'learn' && (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold mb-4">오늘의 학습 진행도</h2>
              <ProgressAnimation
                type="level-up"
                value={350}
                maxValue={500}
                label="현재 레벨 XP"
                icon="⭐"
                color="purple"
              />
            </motion.div>

            <LearningCard
              id="1"
              title="useState Hook 기본"
              type="memorize"
              tags={['React', 'Hooks']}
              difficulty="medium"
              frontContent={
                <div>
                  <p className="mb-4">React 상태 관리의 기본 Hook은?</p>
                  <div className="bg-gray-800 text-white p-4 rounded font-mono text-sm">
                    const [state, setState] = <MemorizeHighlight>useState</MemorizeHighlight>(0);
                  </div>
                </div>
              }
              backContent={<p>useState는 함수형 컴포넌트에서 상태를 관리합니다.</p>}
            />

            <HintPanel
              hints={[
                { id: '1', level: 1, content: 'useState는 상태 관리 Hook입니다.' },
                { id: '2', level: 2, content: '배열 구조 분해를 사용합니다.' },
                { id: '3', level: 3, content: 'setState 호출 시 리렌더링됩니다.' },
              ]}
              autoShow
            />
          </div>
        )}

        {activeTab === 'practice' && (
          <HooksGameCard
            availableHooks={[
              { id: '1', name: 'useState', emoji: '📦', description: '상태 관리', color: 'bg-blue-100' },
              { id: '2', name: 'useEffect', emoji: '⚡', description: '부수 효과', color: 'bg-purple-100' },
              { id: '3', name: 'useContext', emoji: '🌐', description: '컨텍스트', color: 'bg-green-100' },
            ]}
            dropZones={[
              { id: 'z1', label: '컴포넌트 상태 관리', acceptedHooks: ['useState'] },
              { id: 'z2', label: '데이터 페칭, 구독', acceptedHooks: ['useEffect'] },
              { id: 'z3', label: '전역 상태 읽기', acceptedHooks: ['useContext'] },
            ]}
            onComplete={(score) => console.log('Score:', score)}
          />
        )}

        {activeTab === 'community' && (
          <CommunityPost
            post={{
              id: '1',
              author: { id: '1', nickname: '코딩마스터', level: 5 },
              title: 'React Hooks 완벽 정리',
              content: 'useState, useEffect 등 주요 Hooks를 정리했습니다...',
              category: 'note',
              tags: ['React', 'Hooks'],
              aiSummary: 'React Hooks 사용법을 정리한 학습 노트입니다.',
              likes: 42,
              comments: 8,
              createdAt: new Date(),
            }}
          />
        )}
      </div>

      {/* Quiz Popup */}
      {showQuiz && (
        <QuizPopup
          quiz={sampleQuiz}
          onAnswer={() => {}}
          onClose={() => setShowQuiz(false)}
        />
      )}

      {/* AI Assistant */}
      <AIAssistant onSendMessage={async (msg) => `AI: ${msg}에 대한 답변입니다.`} />
    </div>
  );
}
