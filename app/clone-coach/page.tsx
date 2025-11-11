'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';

type Section = {
  id: string;
  name: string;
  completed: boolean;
  tasks: string[];
};

export default function CloneCoachPage() {
  const [targetUrl, setTargetUrl] = useState('');
  const [projectStarted, setProjectStarted] = useState(false);
  const [sections, setSections] = useState<Section[]>([
    {
      id: 'header',
      name: '헤더 / 네비게이션',
      completed: false,
      tasks: [
        '로고 배치 및 스타일링',
        '네비게이션 메뉴 구조',
        '반응형 햄버거 메뉴',
        '스크롤 시 헤더 고정'
      ]
    },
    {
      id: 'hero',
      name: '히어로 섹션',
      completed: false,
      tasks: [
        '메인 타이틀 및 서브 타이틀',
        'CTA 버튼 스타일링',
        '배경 이미지/그라데이션',
        '애니메이션 효과'
      ]
    },
    {
      id: 'features',
      name: '기능/특징 섹션',
      completed: false,
      tasks: [
        '그리드 레이아웃 구성',
        '카드 컴포넌트 디자인',
        '아이콘 또는 이미지 배치',
        'hover 효과'
      ]
    },
    {
      id: 'footer',
      name: '푸터',
      completed: false,
      tasks: [
        '링크 그룹 배치',
        '소셜 미디어 아이콘',
        '저작권 정보',
        '반응형 레이아웃'
      ]
    }
  ]);

  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const startProject = () => {
    if (targetUrl.trim()) {
      setProjectStarted(true);
    }
  };

  const toggleTask = (sectionId: string, taskIndex: number) => {
    // 실제로는 체크박스로 개별 태스크 관리
  };

  const toggleSection = (sectionId: string) => {
    setSections(prev =>
      prev.map(s =>
        s.id === sectionId ? { ...s, completed: !s.completed } : s
      )
    );
  };

  const progress = sections.filter(s => s.completed).length / sections.length * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <PageHeader />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">🎨 클론 코딩 코치</h1>
          <p className="text-gray-600 text-lg">
            목표 웹사이트를 분석하고 단계별로 따라 만들어보세요
          </p>
        </div>

        {!projectStarted ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">클론할 웹사이트 URL 입력</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  목표 웹사이트 URL
                </label>
                <input
                  type="url"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">💡 추천 클론 대상</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <button
                    onClick={() => setTargetUrl('https://airbnb.com')}
                    className="text-left px-3 py-2 bg-white rounded hover:bg-blue-100"
                  >
                    • Airbnb - 카드 그리드 레이아웃
                  </button>
                  <button
                    onClick={() => setTargetUrl('https://stripe.com')}
                    className="text-left px-3 py-2 bg-white rounded hover:bg-blue-100"
                  >
                    • Stripe - 모던한 랜딩 페이지
                  </button>
                  <button
                    onClick={() => setTargetUrl('https://github.com')}
                    className="text-left px-3 py-2 bg-white rounded hover:bg-blue-100"
                  >
                    • GitHub - 프로필 페이지
                  </button>
                  <button
                    onClick={() => setTargetUrl('https://vercel.com')}
                    className="text-left px-3 py-2 bg-white rounded hover:bg-blue-100"
                  >
                    • Vercel - 그라데이션 디자인
                  </button>
                </div>
              </div>

              <button
                onClick={startProject}
                disabled={!targetUrl.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-4 rounded-lg font-semibold text-lg"
              >
                프로젝트 시작하기 →
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 진행률 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold">전체 진행률</h2>
                <span className="text-2xl font-bold text-blue-600">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                클론 대상: <a href={targetUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{targetUrl}</a>
              </p>
            </div>

            {/* 섹션별 체크리스트 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map(section => (
                <div
                  key={section.id}
                  className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all ${
                    section.completed ? 'border-green-500' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{section.name}</h3>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        section.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                    >
                      {section.completed && '✓'}
                    </button>
                  </div>

                  <ul className="space-y-2">
                    {section.tasks.map((task, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-gray-700">{task}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedSection(section.id)}
                    className="mt-4 w-full text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium"
                  >
                    스냅샷 비교하기 →
                  </button>
                </div>
              ))}
            </div>

            {/* 학습 팁 */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">🎯 클론 코딩 성공 팁</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                  <h4 className="font-semibold mb-2">1. 큰 그림부터</h4>
                  <p className="text-sm text-white/90">레이아웃 구조를 먼저 파악하고 섹션을 나눠보세요</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                  <h4 className="font-semibold mb-2">2. 개발자 도구 활용</h4>
                  <p className="text-sm text-white/90">F12로 원본 사이트의 CSS를 분석해보세요</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                  <h4 className="font-semibold mb-2">3. 완벽함보다 완성</h4>
                  <p className="text-sm text-white/90">80% 비슷하면 성공! 100% 똑같을 필요 없어요</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                  <h4 className="font-semibold mb-2">4. 반응형은 나중에</h4>
                  <p className="text-sm text-white/90">데스크톱 먼저 완성하고 모바일 대응하세요</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
