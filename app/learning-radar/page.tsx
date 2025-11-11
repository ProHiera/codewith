'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

type Level = 'beginner' | 'intermediate' | 'advanced';

type WeakConcept = {
  id: string;
  name: string;
  category: string;
  lastPracticed: string;
  successRate: number;
  recommendedTime: string;
  urgency: 'high' | 'medium' | 'low';
  level: Level;
  description: string;
};

type Mission = {
  id: string;
  title: string;
  concept: string;
  estimatedTime: string;
  priority: number;
  level: Level;
  steps: string[];
};

const ALL_CONCEPTS: WeakConcept[] = [
  // 초급
  {
    id: '1',
    name: 'HTML 시맨틱 태그',
    category: 'HTML',
    lastPracticed: '5일 전',
    successRate: 65,
    recommendedTime: '오늘',
    urgency: 'medium',
    level: 'beginner',
    description: 'header, nav, main, article, section, aside, footer 등의 의미있는 태그 사용'
  },
  {
    id: '2',
    name: 'CSS Box Model',
    category: 'CSS',
    lastPracticed: '3일 전',
    successRate: 70,
    recommendedTime: '2일 후',
    urgency: 'medium',
    level: 'beginner',
    description: 'margin, border, padding, content의 관계와 box-sizing 속성'
  },
  {
    id: '3',
    name: 'Flexbox 기초',
    category: 'CSS',
    lastPracticed: '7일 전',
    successRate: 45,
    recommendedTime: '오늘',
    urgency: 'high',
    level: 'beginner',
    description: 'justify-content, align-items, flex-direction으로 레이아웃 구성'
  },
  {
    id: '4',
    name: 'JavaScript 변수 선언',
    category: 'JavaScript',
    lastPracticed: '2일 전',
    successRate: 80,
    recommendedTime: '3일 후',
    urgency: 'low',
    level: 'beginner',
    description: 'var, let, const의 차이와 스코프, 호이스팅 이해'
  },
  {
    id: '5',
    name: '배열 메서드 기초',
    category: 'JavaScript',
    lastPracticed: '6일 전',
    successRate: 55,
    recommendedTime: '오늘',
    urgency: 'high',
    level: 'beginner',
    description: 'map, filter, find, forEach 등 배열 순회 및 변환 메서드'
  },
  {
    id: '6',
    name: 'DOM 조작',
    category: 'JavaScript',
    lastPracticed: '8일 전',
    successRate: 50,
    recommendedTime: '오늘',
    urgency: 'high',
    level: 'beginner',
    description: 'querySelector, addEventListener, classList 등으로 HTML 조작'
  },
  
  // 중급
  {
    id: '7',
    name: 'CSS Grid 레이아웃',
    category: 'CSS',
    lastPracticed: '3일 전',
    successRate: 60,
    recommendedTime: '1일 후',
    urgency: 'medium',
    level: 'intermediate',
    description: 'grid-template, gap, grid-area로 복잡한 2D 레이아웃 구성'
  },
  {
    id: '8',
    name: 'Promise와 async/await',
    category: 'JavaScript',
    lastPracticed: '14일 전',
    successRate: 40,
    recommendedTime: '오늘',
    urgency: 'high',
    level: 'intermediate',
    description: '비동기 처리, then/catch vs async/await, Promise.all/race'
  },
  {
    id: '9',
    name: 'React useState & useEffect',
    category: 'React',
    lastPracticed: '4일 전',
    successRate: 65,
    recommendedTime: '1일 후',
    urgency: 'medium',
    level: 'intermediate',
    description: '상태 관리와 사이드 이펙트, 의존성 배열 이해'
  },
  {
    id: '10',
    name: 'REST API 설계',
    category: 'Backend',
    lastPracticed: '10일 전',
    successRate: 50,
    recommendedTime: '오늘',
    urgency: 'high',
    level: 'intermediate',
    description: 'HTTP 메서드, 상태 코드, RESTful 원칙에 따른 엔드포인트 설계'
  },
  {
    id: '11',
    name: 'TypeScript 타입 시스템',
    category: 'TypeScript',
    lastPracticed: '9일 전',
    successRate: 55,
    recommendedTime: '오늘',
    urgency: 'high',
    level: 'intermediate',
    description: 'interface, type, Generic, Union/Intersection 타입'
  },
  {
    id: '12',
    name: 'Git 브랜치 전략',
    category: 'Git',
    lastPracticed: '5일 전',
    successRate: 70,
    recommendedTime: '2일 후',
    urgency: 'medium',
    level: 'intermediate',
    description: 'Git Flow, merge vs rebase, 충돌 해결'
  },

  // 고급
  {
    id: '13',
    name: 'React 성능 최적화',
    category: 'React',
    lastPracticed: '12일 전',
    successRate: 45,
    recommendedTime: '오늘',
    urgency: 'high',
    level: 'advanced',
    description: 'memo, useMemo, useCallback, 코드 스플리팅, 지연 로딩'
  },
  {
    id: '14',
    name: 'Node.js 스트림',
    category: 'Backend',
    lastPracticed: '15일 전',
    successRate: 35,
    recommendedTime: '오늘',
    urgency: 'high',
    level: 'advanced',
    description: 'Readable, Writable, Transform 스트림으로 대용량 데이터 처리'
  },
  {
    id: '15',
    name: '웹 보안 (XSS, CSRF)',
    category: 'Security',
    lastPracticed: '20일 전',
    successRate: 30,
    recommendedTime: '오늘',
    urgency: 'high',
    level: 'advanced',
    description: 'XSS, CSRF, SQL Injection 공격 원리와 방어 기법'
  },
  {
    id: '16',
    name: 'Docker & 컨테이너',
    category: 'DevOps',
    lastPracticed: '10일 전',
    successRate: 40,
    recommendedTime: '오늘',
    urgency: 'high',
    level: 'advanced',
    description: 'Dockerfile 작성, 이미지 빌드, 컨테이너 오케스트레이션'
  },
  {
    id: '17',
    name: 'DB 인덱싱 & 쿼리 최적화',
    category: 'Database',
    lastPracticed: '8일 전',
    successRate: 50,
    recommendedTime: '1일 후',
    urgency: 'medium',
    level: 'advanced',
    description: 'B-Tree 인덱스, 실행 계획, N+1 문제 해결'
  },
  {
    id: '18',
    name: 'MSA & 분산 시스템',
    category: 'Architecture',
    lastPracticed: '18일 전',
    successRate: 25,
    recommendedTime: '오늘',
    urgency: 'high',
    level: 'advanced',
    description: 'API Gateway, 서비스 메시, 이벤트 드리븐 아키텍처'
  }
];

const ALL_MISSIONS: Mission[] = [
  // 초급 미션
  {
    id: 'm1',
    title: 'HTML 시맨틱 태그로 블로그 레이아웃 만들기',
    concept: 'HTML 시맨틱 태그',
    estimatedTime: '20분',
    priority: 1,
    level: 'beginner',
    steps: [
      'header 태그로 사이트 제목과 네비게이션 작성',
      'main 태그 안에 article로 블로그 글 3개 작성',
      'aside 태그로 사이드바 (인기 글, 카테고리) 작성',
      'footer 태그로 저작권 정보 작성'
    ]
  },
  {
    id: 'm2',
    title: 'Flexbox로 반응형 카드 그리드 구현',
    concept: 'Flexbox 기초',
    estimatedTime: '25분',
    priority: 2,
    level: 'beginner',
    steps: [
      '카드 6개를 포함하는 컨테이너 생성',
      'display: flex, flex-wrap: wrap 설정',
      'justify-content: space-between으로 간격 조정',
      '카드 너비를 calc(33.33% - 20px)로 설정하여 3열 배치'
    ]
  },
  {
    id: 'm3',
    title: '배열 메서드로 사용자 목록 필터링',
    concept: '배열 메서드 기초',
    estimatedTime: '15분',
    priority: 3,
    level: 'beginner',
    steps: [
      '20명의 사용자 데이터 배열 생성 (이름, 나이, 직업)',
      'filter로 30세 이상 사용자만 추출',
      'map으로 이름만 추출하여 새 배열 생성',
      'find로 특정 직업을 가진 첫 번째 사용자 찾기'
    ]
  },
  {
    id: 'm4',
    title: 'DOM 조작으로 투두 리스트 만들기',
    concept: 'DOM 조작',
    estimatedTime: '30분',
    priority: 4,
    level: 'beginner',
    steps: [
      'input과 button으로 투두 추가 UI 만들기',
      'addEventListener로 버튼 클릭 이벤트 등록',
      'createElement로 새 li 요소 생성 후 ul에 추가',
      'classList.toggle로 완료 상태 토글 기능 구현'
    ]
  },

  // 중급 미션
  {
    id: 'm5',
    title: 'CSS Grid로 대시보드 레이아웃 구성',
    concept: 'CSS Grid 레이아웃',
    estimatedTime: '35분',
    priority: 1,
    level: 'intermediate',
    steps: [
      'grid-template-areas로 헤더/사이드바/메인/푸터 영역 정의',
      'grid-template-columns: 200px 1fr로 2열 구성',
      'grid-template-rows: auto 1fr auto로 3행 구성',
      '메인 영역을 다시 grid로 나눠 위젯 카드 배치'
    ]
  },
  {
    id: 'm6',
    title: 'Promise.all로 여러 API 동시 호출',
    concept: 'Promise와 async/await',
    estimatedTime: '30분',
    priority: 2,
    level: 'intermediate',
    steps: [
      '3개의 다른 API 엔드포인트 준비 (JSONPlaceholder 사용)',
      'async/await로 각 API 호출 함수 작성',
      'Promise.all로 3개 API를 병렬로 호출',
      'try-catch로 에러 처리 및 로딩 상태 관리'
    ]
  },
  {
    id: 'm7',
    title: 'useEffect로 실시간 검색 디바운싱',
    concept: 'React useState & useEffect',
    estimatedTime: '40분',
    priority: 3,
    level: 'intermediate',
    steps: [
      'input 컴포넌트에 onChange로 검색어 상태 관리',
      'useEffect로 검색어 변경 감지',
      'setTimeout으로 500ms 디바운싱 구현',
      'cleanup 함수로 이전 타이머 제거'
    ]
  },
  {
    id: 'm8',
    title: 'TypeScript로 제네릭 API 클라이언트 작성',
    concept: 'TypeScript 타입 시스템',
    estimatedTime: '45분',
    priority: 4,
    level: 'intermediate',
    steps: [
      'Generic 타입 <T>를 사용하는 fetch 래퍼 함수 작성',
      'interface로 API 응답 타입 정의',
      'Union 타입으로 HTTP 메서드 제한',
      '타입 가드로 런타임 타입 체크'
    ]
  },

  // 고급 미션
  {
    id: 'm9',
    title: 'React.memo와 useMemo로 대량 리스트 최적화',
    concept: 'React 성능 최적화',
    estimatedTime: '50분',
    priority: 1,
    level: 'advanced',
    steps: [
      '10,000개 항목 리스트 렌더링 (느린 상태 확인)',
      'React.memo로 리스트 아이템 컴포넌트 메모이제이션',
      'useMemo로 필터링/정렬 연산 캐싱',
      'useCallback으로 이벤트 핸들러 최적화',
      'React DevTools Profiler로 성능 비교'
    ]
  },
  {
    id: 'm10',
    title: 'Node.js 스트림으로 대용량 파일 처리',
    concept: 'Node.js 스트림',
    estimatedTime: '60분',
    priority: 2,
    level: 'advanced',
    steps: [
      '100MB CSV 파일 생성 (테스트 데이터)',
      'fs.createReadStream으로 파일 읽기',
      'Transform 스트림으로 각 줄 파싱 및 변환',
      'fs.createWriteStream으로 결과 저장',
      '메모리 사용량 모니터링 (Buffer vs Stream 비교)'
    ]
  },
  {
    id: 'm11',
    title: 'XSS 공격 시뮬레이션 및 방어',
    concept: '웹 보안 (XSS, CSRF)',
    estimatedTime: '55분',
    priority: 3,
    level: 'advanced',
    steps: [
      '댓글 입력 폼에 <script>alert("XSS")</script> 삽입',
      'innerHTML 사용 시 스크립트 실행 확인',
      'DOMPurify 라이브러리로 HTML sanitization',
      'CSP (Content Security Policy) 헤더 설정',
      'httpOnly 쿠키로 토큰 저장'
    ]
  },
  {
    id: 'm12',
    title: 'Docker로 Next.js 앱 컨테이너화',
    concept: 'Docker & 컨테이너',
    estimatedTime: '70분',
    priority: 4,
    level: 'advanced',
    steps: [
      'Multi-stage Dockerfile 작성 (build, production)',
      '.dockerignore로 불필요한 파일 제외',
      'docker build로 이미지 생성',
      'docker run으로 컨테이너 실행 및 포트 매핑',
      'docker-compose로 DB와 함께 오케스트레이션'
    ]
  }
];

export default function LearningRadarPage() {
  const [selectedLevel, setSelectedLevel] = useState<Level | 'all'>('all');
  
  const weakConcepts = selectedLevel === 'all' 
    ? ALL_CONCEPTS 
    : ALL_CONCEPTS.filter(c => c.level === selectedLevel);
    
  const recommendedMissions = selectedLevel === 'all'
    ? ALL_MISSIONS
    : ALL_MISSIONS.filter(m => m.level === selectedLevel);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'high': return '긴급';
      case 'medium': return '보통';
      case 'low': return '여유';
      default: return urgency;
    }
  };

  const getLevelColor = (level: Level) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-blue-100 text-blue-700';
      case 'advanced': return 'bg-purple-100 text-purple-700';
    }
  };

  const getLevelText = (level: Level) => {
    switch (level) {
      case 'beginner': return '초급';
      case 'intermediate': return '중급';
      case 'advanced': return '고급';
    }
  };

  const issueStats = {
    total: weakConcepts.length,
    high: weakConcepts.filter(c => c.urgency === 'high').length,
    medium: weakConcepts.filter(c => c.urgency === 'medium').length,
    low: weakConcepts.filter(c => c.urgency === 'low').length,
    avgSuccess: Math.round(weakConcepts.reduce((sum, c) => sum + c.successRate, 0) / weakConcepts.length)
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">📡 학습 레이더</h1>
          <p className="text-gray-600 text-lg">
            취약한 개념을 분석하고 오늘 복습할 내용을 추천합니다
          </p>
        </div>

        {/* 수준 선택 */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <button
            onClick={() => setSelectedLevel('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedLevel === 'all'
                ? 'bg-gray-800 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            전체 보기
          </button>
          <button
            onClick={() => setSelectedLevel('beginner')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedLevel === 'beginner'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            🌱 초급
          </button>
          <button
            onClick={() => setSelectedLevel('intermediate')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedLevel === 'intermediate'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            🚀 중급
          </button>
          <button
            onClick={() => setSelectedLevel('advanced')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedLevel === 'advanced'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            ⚡ 고급
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 오늘의 학습 통계 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">📊 학습 통계</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">학습 중인 개념</div>
                    <div className="text-2xl font-bold text-blue-600">{issueStats.total}</div>
                  </div>
                  <div className="text-3xl">📚</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">긴급 복습</div>
                    <div className="text-2xl font-bold text-red-600">{issueStats.high}</div>
                  </div>
                  <div className="text-3xl">⚠️</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">평균 성공률</div>
                    <div className="text-2xl font-bold text-green-600">{issueStats.avgSuccess}%</div>
                  </div>
                  <div className="text-3xl">✅</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">🎯 오늘의 목표</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-2xl">1️⃣</span>
                  <span>취약 개념 3개 복습</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-2xl">2️⃣</span>
                  <span>추천 미션 2개 완료</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-2xl">3️⃣</span>
                  <span>30분 집중 학습</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="text-sm text-white/80">예상 소요 시간</div>
                <div className="text-2xl font-bold">45분</div>
              </div>
            </div>
          </div>

          {/* 취약 개념 & 추천 미션 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 취약 개념 목록 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">⚠️ 복습이 필요한 개념</h2>
              <div className="space-y-3">
                {weakConcepts.map(concept => (
                  <div
                    key={concept.id}
                    className={`border-2 rounded-lg p-4 ${getUrgencyColor(concept.urgency)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-bold">{concept.name}</h3>
                          <span className="text-xs px-2 py-1 bg-white/50 rounded">
                            {concept.category}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded font-semibold ${getLevelColor(concept.level)}`}>
                            {getLevelText(concept.level)}
                          </span>
                        </div>
                        <p className="text-xs mb-2 opacity-80">{concept.description}</p>
                        <div className="text-sm opacity-80">
                          마지막 연습: {concept.lastPracticed} • 성공률: {concept.successRate}%
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 bg-white rounded ml-2">
                        {getUrgencyText(concept.urgency)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex-1 bg-white/50 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-current"
                          style={{ width: `${concept.successRate}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-semibold whitespace-nowrap">
                        복습 추천: {concept.recommendedTime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 추천 미션 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">🎯 오늘의 추천 미션</h2>
              <p className="text-sm text-gray-600 mb-4">
                취약한 개념을 보강할 수 있는 미션을 우선순위대로 추천합니다
              </p>
              <div className="space-y-4">
                {recommendedMissions.slice(0, 5).map(mission => (
                  <div
                    key={mission.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                          {mission.priority}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-bold text-gray-900">{mission.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded font-semibold ${getLevelColor(mission.level)}`}>
                              {getLevelText(mission.level)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            연습 개념: {mission.concept}
                          </div>
                          <div className="text-xs text-gray-500 mb-3">
                            ⏱️ 예상 소요: {mission.estimatedTime}
                          </div>
                          
                          {/* 단계별 가이드 */}
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-xs font-semibold text-gray-700 mb-2">📝 실습 단계:</div>
                            <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
                              {mission.steps.map((step, idx) => (
                                <li key={idx}>{step}</li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/missions"
                      className="block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-colors"
                    >
                      시작하기 →
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* 학습 팁 */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">💡 효과적인 복습 방법</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold mb-2">🔄 간격 반복</h4>
                  <p className="text-sm text-gray-600">
                    1일 → 3일 → 7일 → 14일 간격으로 복습하면 장기 기억에 저장돼요
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold mb-2">🎯 약점 집중</h4>
                  <p className="text-sm text-gray-600">
                    성공률 70% 미만인 개념을 우선적으로 복습하세요
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold mb-2">⏰ 짧고 자주</h4>
                  <p className="text-sm text-gray-600">
                    2시간보다 30분씩 4번이 더 효과적입니다
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold mb-2">✍️ 직접 써보기</h4>
                  <p className="text-sm text-gray-600">
                    읽기만 하지 말고 코드를 직접 작성해보세요
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
