'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PageHeader from '@/components/PageHeader';

type PathPreset = {
  id: string;
  title: string;
  icon: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  skills: string[];
  roadmap: RoadmapStep[];
};

type RoadmapStep = {
  week: number;
  title: string;
  topics: string[];
  goals: string[];
};

const PRESETS: PathPreset[] = [
  {
    id: 'frontend-basics',
    title: '프론트엔드 기초',
    icon: '🎨',
    description: 'HTML, CSS, JavaScript 기초부터 React까지',
    duration: '12주',
    difficulty: 'beginner',
    topics: ['HTML', 'CSS', 'JavaScript', 'React'],
    skills: ['웹 기본 구조', '반응형 디자인', 'DOM 조작', '컴포넌트'],
    roadmap: [
      {
        week: 1,
        title: 'HTML 기초',
        topics: ['시맨틱 태그', '폼과 입력', '접근성'],
        goals: ['간단한 프로필 페이지 만들기']
      },
      {
        week: 2,
        title: 'CSS 기초',
        topics: ['선택자', 'Box Model', 'Flexbox'],
        goals: ['카드 레이아웃 구현하기']
      },
      {
        week: 3,
        title: 'JavaScript 기초',
        topics: ['변수와 타입', '함수', '조건문과 반복'],
        goals: ['계산기 만들기']
      },
      {
        week: 4,
        title: 'DOM 조작',
        topics: ['이벤트', 'querySelector', 'classList'],
        goals: ['투두 리스트 만들기']
      }
    ]
  },
  {
    id: 'react-deep-dive',
    title: 'React 심화',
    icon: '⚛️',
    description: 'React Hooks부터 성능 최적화까지',
    duration: '8주',
    difficulty: 'intermediate',
    topics: ['Hooks', 'Context API', '최적화', 'Next.js'],
    skills: ['상태 관리', '성능 개선', 'SSR', 'API 연동'],
    roadmap: [
      {
        week: 1,
        title: 'useState & useEffect',
        topics: ['상태 관리 기초', '사이드 이펙트', '의존성 배열'],
        goals: ['날씨 앱 만들기']
      },
      {
        week: 2,
        title: 'Custom Hooks',
        topics: ['Hook 추출', '재사용성', '로직 분리'],
        goals: ['useFetch 훅 만들기']
      },
      {
        week: 3,
        title: 'Context API',
        topics: ['전역 상태', 'Provider', 'Consumer'],
        goals: ['테마 전환 기능 구현']
      },
      {
        week: 4,
        title: '성능 최적화',
        topics: ['memo', 'useMemo', 'useCallback'],
        goals: ['대량 데이터 렌더링 최적화']
      }
    ]
  },
  {
    id: 'backend-nodejs',
    title: 'Node.js 백엔드',
    icon: '🔧',
    description: 'Express부터 데이터베이스 연동까지',
    duration: '10주',
    difficulty: 'intermediate',
    topics: ['Express', 'REST API', 'Database', 'Authentication'],
    skills: ['API 설계', 'DB 모델링', '인증/인가', '배포'],
    roadmap: [
      {
        week: 1,
        title: 'Express 기초',
        topics: ['라우팅', '미들웨어', 'Request/Response'],
        goals: ['간단한 API 서버 만들기']
      },
      {
        week: 2,
        title: 'REST API 설계',
        topics: ['HTTP 메서드', '상태 코드', 'RESTful 원칙'],
        goals: ['게시판 CRUD API 구현']
      },
      {
        week: 3,
        title: 'Database 연동',
        topics: ['PostgreSQL', 'Prisma ORM', '관계 설정'],
        goals: ['사용자-게시물 모델 구현']
      },
      {
        week: 4,
        title: '인증 구현',
        topics: ['JWT', 'bcrypt', '미들웨어'],
        goals: ['로그인/회원가입 구현']
      }
    ]
  },
  {
    id: 'fullstack-swe',
    title: '풀스택 개발자',
    icon: '🚀',
    description: '프론트엔드부터 백엔드, 배포까지 전체 과정',
    duration: '16주',
    difficulty: 'advanced',
    topics: ['React', 'Node.js', 'Database', 'DevOps'],
    skills: ['풀스택 개발', 'CI/CD', '클라우드 배포', '성능 모니터링'],
    roadmap: [
      {
        week: 1,
        title: '프로젝트 기획',
        topics: ['요구사항 분석', 'DB 설계', 'API 명세'],
        goals: ['기술 스택 선정 및 설계']
      },
      {
        week: 2,
        title: '백엔드 구축',
        topics: ['Express + Prisma', 'REST API', 'Validation'],
        goals: ['API 서버 구현']
      },
      {
        week: 3,
        title: '프론트엔드 구축',
        topics: ['Next.js', 'TypeScript', 'TailwindCSS'],
        goals: ['UI 컴포넌트 구현']
      },
      {
        week: 4,
        title: '배포 및 운영',
        topics: ['Vercel', 'Supabase', 'GitHub Actions'],
        goals: ['프로덕션 배포']
      }
    ]
  }
];

export default function LearningPathsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const mode = searchParams?.get('mode'); // guided | free | null
  const recommended = searchParams?.get('recommended'); // '1' | 'true' | null
  const preselectId = searchParams?.get('select');
  const level = searchParams?.get('level') as 'beginner' | 'intermediate' | 'advanced' | null;

  // Pick first preset by level if we have no explicit select
  const levelDefault = useMemo(() => {
    if (!level) return null;
    return PRESETS.find(p => p.difficulty === level) || null;
  }, [level]);

  // Derive initial selection once from query string
  const initialSelected = useMemo<PathPreset | null>(() => {
    if (preselectId) {
      return PRESETS.find(p => p.id === preselectId) || null;
    }
    return levelDefault;
  }, [preselectId, levelDefault]);

  const [selectedPath, setSelectedPath] = useState<PathPreset | null>(initialSelected);

  const filteredPresets = PRESETS.filter(preset => 
    filter === 'all' || preset.difficulty === filter
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '초급';
      case 'intermediate': return '중급';
      case 'advanced': return '고급';
      default: return difficulty;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">🗺️ 러닝 경로 프리셋</h1>
          <p className="text-gray-600 text-lg">
            목표별 추천 학습 순서와 로드맵을 제공합니다
          </p>
        </div>

        {/* 추천 결과 CTA (평가 완료 진입 시 노출) */}
        {(recommended === '1' || recommended === 'true') && (
          <div className="mb-8 bg-white rounded-xl shadow-lg p-6 border border-blue-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="text-3xl">🎯</div>
                <div>
                  <div className="text-lg font-bold text-gray-900 mb-1">레벨 평가 결과에 맞춘 추천 경로</div>
                  <div className="text-sm text-gray-600">
                    {selectedPath
                      ? `${selectedPath.title} · 예상 ${selectedPath.duration} · 주제 ${selectedPath.topics.length}개`
                      : '왼쪽에서 추천 경로를 확인하거나 자유 학습을 선택하세요'}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const id = selectedPath?.id || levelDefault?.id || PRESETS[0].id;
                    router.push(`/learning-paths?mode=guided&select=${id}${level ? `&level=${level}` : ''}`);
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  이대로 진행할게요
                </button>
                <button
                  onClick={() => router.push('/learning-paths?mode=free')}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold"
                >
                  자유롭게 학습할래요!
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 필터 */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setFilter('beginner')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'beginner' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            초급
          </button>
          <button
            onClick={() => setFilter('intermediate')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'intermediate' 
                ? 'bg-yellow-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            중급
          </button>
          <button
            onClick={() => setFilter('advanced')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'advanced' 
                ? 'bg-red-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            고급
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 경로 프리셋 목록 */}
          <div className="lg:col-span-1 space-y-4">
            {filteredPresets.map(preset => (
              <div
                key={preset.id}
                onClick={() => setSelectedPath(preset)}
                className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all ${
                  selectedPath?.id === preset.id 
                    ? 'ring-2 ring-blue-500 shadow-xl' 
                    : 'hover:shadow-xl'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{preset.icon}</div>
                  <span className={`text-xs px-2 py-1 rounded font-semibold ${getDifficultyColor(preset.difficulty)}`}>
                    {getDifficultyText(preset.difficulty)}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{preset.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{preset.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>⏱️ {preset.duration}</span>
                  <span>•</span>
                  <span>📚 {preset.topics.length}개 주제</span>
                </div>
              </div>
            ))}
          </div>

          {/* 상세 로드맵 */}
          <div className="lg:col-span-2">
            {selectedPath ? (
              <div className="space-y-6">
                {/* 경로 정보 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-5xl">{selectedPath.icon}</span>
                      <div>
                        <h2 className="text-2xl font-bold">{selectedPath.title}</h2>
                        <p className="text-gray-600">{selectedPath.description}</p>
                      </div>
                    </div>
                    <span className={`text-sm px-3 py-1 rounded font-semibold ${getDifficultyColor(selectedPath.difficulty)}`}>
                      {getDifficultyText(selectedPath.difficulty)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-1">예상 기간</div>
                      <div className="text-xl font-bold text-blue-600">{selectedPath.duration}</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-1">주요 주제</div>
                      <div className="text-xl font-bold text-purple-600">{selectedPath.topics.length}개</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">🎯 학습 주제</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPath.topics.map((topic, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">💪 획득 스킬</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPath.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 주차별 로드맵 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4">📅 주차별 로드맵</h2>
                  <div className="space-y-4">
                    {selectedPath.roadmap.map((step, idx) => (
                      <div key={idx} className="border-l-4 border-blue-500 pl-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                            Week {step.week}
                          </span>
                          <h3 className="font-bold text-lg">{step.title}</h3>
                        </div>
                        
                        <div className="mb-2">
                          <div className="text-sm font-semibold text-gray-700 mb-1">📚 학습 내용</div>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {step.topics.map((topic, i) => (
                              <li key={i}>{topic}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="text-sm font-semibold text-gray-700 mb-1">🎯 목표</div>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {step.goals.map((goal, i) => (
                              <li key={i}>{goal}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      // Guided 모드일 때는 선택을 고정하고, 자유 모드면 일반 진입
                      const base = '/missions';
                      if (mode === 'guided') {
                        // 간단히 선택된 경로 id를 쿼리로 넘겨 관련 미션 필터링의 발판을 둔다
                        router.push(`${base}?path=${selectedPath.id}`);
                      } else {
                        router.push(base);
                      }
                    }}
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    이 경로로 시작하기 →
                  </button>
                </div>

                {/* 학습 팁 */}
                <div className="bg-linear-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">💡 학습 팁</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>매일 30분씩 꾸준히 학습하는 것이 몰아서 하는 것보다 효과적입니다</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>각 주차 목표를 직접 만들어보고 코드 리뷰를 받으세요</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>이해가 안 되는 부분은 건너뛰지 말고 충분히 연습하세요</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>학습 내용을 블로그나 노션에 정리하면 기억에 오래 남습니다</span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  학습 경로를 선택하세요
                </h3>
                <p className="text-gray-500">
                  왼쪽에서 원하는 학습 경로를 클릭하면 상세 로드맵을 확인할 수 있습니다
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
