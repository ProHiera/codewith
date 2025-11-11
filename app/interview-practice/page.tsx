'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

type Question = {
  id: number;
  category: string;
  question: string;
  difficulty: 'easy' | 'medium' | 'hard';
  level: 'beginner' | 'intermediate' | 'advanced';
  answer: string;
  pitfalls: string[];
  practiceLink?: string;
  tags: string[];
};

const sampleQuestions: Question[] = [
  // 초급 - JavaScript 기초
  {
    id: 1,
    category: 'JavaScript 기초',
    question: 'var, let, const의 차이점을 설명해주세요.',
    difficulty: 'easy',
    level: 'beginner',
    answer: 'var는 함수 스코프를 가지며 재선언과 재할당이 가능합니다. let은 블록 스코프를 가지며 재할당은 가능하지만 재선언은 불가능합니다. const는 블록 스코프를 가지며 재선언과 재할당 모두 불가능합니다. 단, const로 선언한 객체나 배열의 내부 속성은 변경 가능합니다.',
    pitfalls: [
      '❌ "const는 변경할 수 없다" → 객체/배열의 속성은 변경 가능',
      '❌ "var는 절대 사용하면 안 된다" → 레거시 코드 이해 필요',
      '❌ "let/const는 호이스팅이 안 된다" → 호이스팅되지만 TDZ 존재'
    ],
    tags: ['변수', '스코프', '호이스팅'],
    practiceLink: '/concept-snaps'
  },
  {
    id: 2,
    category: 'JavaScript 기초',
    question: '==(동등)과 ===(일치) 연산자의 차이는?',
    difficulty: 'easy',
    level: 'beginner',
    answer: '==는 타입 변환 후 비교하고, ===는 타입까지 비교합니다. 예: 5 == "5"는 true, 5 === "5"는 false입니다. 실무에서는 예상치 못한 타입 변환을 방지하기 위해 === 사용을 권장합니다.',
    pitfalls: [
      '❌ "==가 더 유연해서 좋다" → 예상치 못한 버그 발생 가능',
      '❌ "null == undefined" → true이지만 === false',
      '❌ "0 == false" → true이지만 명시적 비교 권장'
    ],
    tags: ['연산자', '타입 변환', '비교'],
    practiceLink: '/concept-snaps'
  },
  {
    id: 3,
    category: 'JavaScript 기초',
    question: 'null과 undefined의 차이를 설명해주세요.',
    difficulty: 'easy',
    level: 'beginner',
    answer: 'undefined는 변수가 선언되었지만 값이 할당되지 않은 상태입니다. null은 개발자가 의도적으로 "값이 없음"을 할당한 것입니다. typeof null은 "object"(JavaScript 버그), typeof undefined는 "undefined"입니다.',
    pitfalls: [
      '❌ "null은 객체다" → typeof의 버그, 실제로는 primitive',
      '❌ "둘이 같다" → == 연산에선 같지만 === 연산에선 다름',
      '❌ "undefined를 직접 할당" → null 사용 권장'
    ],
    tags: ['타입', 'null', 'undefined'],
    practiceLink: '/concept-snaps'
  },
  {
    id: 4,
    category: 'JavaScript 기초',
    question: '배열 메서드 map, filter, reduce의 차이는?',
    difficulty: 'easy',
    level: 'beginner',
    answer: 'map은 각 요소를 변환하여 새 배열을 반환합니다. filter는 조건에 맞는 요소만 골라 새 배열을 반환합니다. reduce는 배열을 순회하며 하나의 값으로 축약합니다. 모두 원본 배열을 변경하지 않습니다.',
    pitfalls: [
      '❌ "map에서 아무것도 반환 안 해도 된다" → undefined 배열이 생김',
      '❌ "filter는 첫 번째만 찾는다" → 조건에 맞는 모든 요소 반환',
      '❌ "reduce는 숫자만 가능" → 객체, 배열 등 모든 타입 가능'
    ],
    tags: ['배열', '고차함수', '메서드'],
    practiceLink: '/concept-snaps'
  },

  // 초급 - HTML/CSS
  {
    id: 5,
    category: 'HTML/CSS',
    question: 'semantic HTML이 무엇이고 왜 중요한가요?',
    difficulty: 'easy',
    level: 'beginner',
    answer: 'semantic HTML은 의미있는 태그(header, nav, main, article, section 등)를 사용하는 것입니다. SEO 향상, 접근성 개선, 코드 가독성 증가의 이점이 있습니다. div 대신 적절한 semantic 태그를 사용하면 스크린 리더 사용자와 검색 엔진이 페이지 구조를 이해하기 쉽습니다.',
    pitfalls: [
      '❌ "div만 써도 된다" → SEO와 접근성에 불리',
      '❌ "semantic 태그는 스타일이 다르다" → CSS로 동일하게 스타일링 가능',
      '❌ "article과 section은 같다" → article은 독립적, section은 주제별 그룹'
    ],
    tags: ['HTML', 'semantic', '접근성'],
    practiceLink: '/learning-radar'
  },
  {
    id: 6,
    category: 'HTML/CSS',
    question: 'box-sizing: border-box의 역할은?',
    difficulty: 'easy',
    level: 'beginner',
    answer: 'border-box는 width/height에 padding과 border를 포함시킵니다. content-box(기본값)는 content 영역만 계산하므로 padding/border를 추가하면 전체 크기가 커집니다. border-box를 사용하면 레이아웃 계산이 직관적입니다.',
    pitfalls: [
      '❌ "기본값이다" → 기본값은 content-box',
      '❌ "margin도 포함한다" → margin은 포함 안 됨',
      '❌ "성능이 느리다" → 성능 차이 거의 없음'
    ],
    tags: ['CSS', 'box model', 'sizing'],
    practiceLink: '/learning-radar'
  },

  // 중급 - React
  {
    id: 7,
    category: 'React',
    question: 'useEffect의 의존성 배열이 비어있으면 어떻게 되나요?',
    difficulty: 'medium',
    level: 'intermediate',
    answer: '컴포넌트가 마운트될 때 한 번만 실행됩니다. cleanup 함수가 있다면 언마운트될 때 한 번만 실행됩니다. 빈 배열은 "이 effect는 어떤 값에도 의존하지 않는다"는 의미입니다. 외부 변수를 참조하면 stale closure 문제가 발생할 수 있습니다.',
    pitfalls: [
      '❌ "매번 실행된다" → 한 번만 실행됨',
      '❌ "의존성을 안 쓰는 게 좋다" → 외부 값 참조 시 오래된 값 사용',
      '❌ "배열 없이 쓰면 같다" → 의존성 배열 없으면 매 렌더마다 실행'
    ],
    tags: ['React', 'hooks', 'useEffect'],
    practiceLink: '/async-simulator'
  },
  {
    id: 8,
    category: 'React',
    question: 'React.memo, useMemo, useCallback의 차이는?',
    difficulty: 'hard',
    level: 'advanced',
    answer: 'React.memo는 컴포넌트 메모이제이션(props가 같으면 리렌더 스킵), useMemo는 값 메모이제이션(연산 결과 캐싱), useCallback은 함수 메모이제이션(함수 참조 유지)입니다. 모두 불필요한 연산/렌더링을 줄여 성능을 최적화합니다.',
    pitfalls: [
      '❌ "항상 사용해야 한다" → 과도한 최적화는 오히려 성능 저하',
      '❌ "useCallback 안 쓰면 매번 새 함수" → 그게 정상, 필요시에만 최적화',
      '❌ "useMemo로 모든 값 감싸기" → 메모리 사용 증가'
    ],
    tags: ['React', '최적화', 'memo'],
    practiceLink: '/learning-radar'
  },
  {
    id: 9,
    category: 'React',
    question: 'Virtual DOM이 무엇이고 왜 사용하나요?',
    difficulty: 'medium',
    level: 'intermediate',
    answer: 'Virtual DOM은 실제 DOM의 경량 복사본입니다. 상태 변경 시 Virtual DOM에서 먼저 변경사항을 계산(diffing)하고, 실제 DOM에는 필요한 부분만 업데이트(reconciliation)합니다. 이를 통해 DOM 조작 비용을 최소화합니다.',
    pitfalls: [
      '❌ "Virtual DOM이 항상 빠르다" → 간단한 업데이트는 직접 DOM이 더 빠를 수 있음',
      '❌ "실제 DOM을 안 쓴다" → 최종적으로는 실제 DOM 업데이트',
      '❌ "Virtual DOM = React" → Vue, Preact 등도 사용'
    ],
    tags: ['React', 'Virtual DOM', '렌더링'],
    practiceLink: '/concept-snaps'
  },

  // 중급 - async/await
  {
    id: 10,
    category: 'async/await',
    question: 'Promise.all과 Promise.race의 차이는?',
    difficulty: 'medium',
    level: 'intermediate',
    answer: 'Promise.all은 모든 Promise가 완료될 때까지 기다리고 배열로 결과를 반환합니다. 하나라도 실패하면 전체가 실패합니다. Promise.race는 가장 먼저 완료되는(성공/실패 상관없이) Promise의 결과를 반환합니다.',
    pitfalls: [
      '❌ "all은 순차 실행" → 병렬로 실행되지만 결과는 순서 보장',
      '❌ "race는 나머지를 취소" → 다른 Promise들도 계속 실행됨',
      '❌ "all에서 하나 실패해도 나머지 계속" → 하나라도 실패하면 즉시 reject'
    ],
    tags: ['Promise', 'async', '병렬처리'],
    practiceLink: '/async-simulator'
  },
  {
    id: 11,
    category: 'async/await',
    question: 'async/await와 Promise.then의 차이는?',
    difficulty: 'medium',
    level: 'intermediate',
    answer: 'async/await는 Promise를 동기 코드처럼 작성할 수 있게 해주는 문법 설탕입니다. then은 콜백 체이닝, await는 순차적 코드로 가독성이 좋습니다. 기능적으로는 동일하지만 에러 처리(try-catch vs .catch)와 조건문 사용이 다릅니다.',
    pitfalls: [
      '❌ "await가 더 빠르다" → 내부적으로는 동일',
      '❌ "then은 구식이다" → 병렬 처리 시 then이 더 간결할 수 있음',
      '❌ "async 함수는 무조건 await 필요" → Promise 반환도 가능'
    ],
    tags: ['async', 'await', 'Promise'],
    practiceLink: '/async-simulator'
  },

  // 중급 - TypeScript
  {
    id: 12,
    category: 'TypeScript',
    question: 'interface와 type의 차이는 무엇인가요?',
    difficulty: 'hard',
    level: 'advanced',
    answer: 'interface는 선언 병합이 가능하고 extends로 확장합니다. type은 유니온, 인터섹션, 튜플, mapped types 등 더 다양한 타입 정의가 가능합니다. interface는 주로 객체 구조 정의에, type은 유니온이나 복잡한 타입에 사용합니다.',
    pitfalls: [
      '❌ "type이 더 최신이라 좋다" → 각각 용도가 다름',
      '❌ "성능 차이가 있다" → 컴파일 후엔 동일',
      '❌ "하나만 일관되게 써야 한다" → 상황에 맞게 혼용 가능'
    ],
    tags: ['TypeScript', 'interface', 'type'],
    practiceLink: '/learning-radar'
  },
  {
    id: 13,
    category: 'TypeScript',
    question: 'any와 unknown의 차이점은?',
    difficulty: 'medium',
    level: 'intermediate',
    answer: 'any는 타입 체크를 완전히 비활성화합니다. unknown은 모든 타입을 받지만 사용 전 타입 체크가 필요합니다(타입 가드). unknown이 any보다 type-safe하며 권장됩니다.',
    pitfalls: [
      '❌ "unknown이 더 엄격한 any" → 완전히 다른 개념',
      '❌ "any를 절대 쓰면 안 된다" → 마이그레이션 시 임시로 사용 가능',
      '❌ "unknown은 null 체크만 하면 된다" → 타입 가드 필수'
    ],
    tags: ['TypeScript', 'any', 'unknown'],
    practiceLink: '/learning-radar'
  },

  // 고급 - 성능/보안
  {
    id: 14,
    category: '웹 성능',
    question: 'debounce와 throttle의 차이를 설명해주세요.',
    difficulty: 'hard',
    level: 'advanced',
    answer: 'debounce는 이벤트가 멈춘 후 일정 시간 뒤 한 번 실행됩니다(검색 자동완성). throttle은 일정 시간 간격으로 최대 한 번만 실행됩니다(스크롤 이벤트). debounce는 마지막 호출에만 반응, throttle은 주기적으로 반응합니다.',
    pitfalls: [
      '❌ "debounce가 항상 좋다" → 스크롤처럼 중간 과정도 필요한 경우 throttle',
      '❌ "lodash 없이 못 만든다" → setTimeout으로 직접 구현 가능',
      '❌ "1초 delay면 1초마다 실행" → 이벤트 발생 후 1초 대기'
    ],
    tags: ['성능', 'debounce', 'throttle'],
    practiceLink: '/learning-radar'
  },
  {
    id: 15,
    category: '웹 보안',
    question: 'XSS 공격이란 무엇이고 어떻게 방어하나요?',
    difficulty: 'hard',
    level: 'advanced',
    answer: 'XSS(Cross-Site Scripting)는 악의적인 스크립트를 웹 페이지에 주입하는 공격입니다. 방어: 1) 사용자 입력 sanitize(DOMPurify), 2) innerHTML 대신 textContent 사용, 3) CSP 헤더 설정, 4) httpOnly 쿠키로 토큰 저장.',
    pitfalls: [
      '❌ "서버만 검증하면 된다" → 클라이언트도 방어 필요',
      '❌ "인코딩만 하면 안전" → 문맥에 따라 다른 인코딩 필요',
      '❌ "React는 자동 방어" → dangerouslySetInnerHTML 주의'
    ],
    tags: ['보안', 'XSS', 'sanitization'],
    practiceLink: '/learning-radar'
  },

  // CSS
  {
    id: 16,
    category: 'CSS',
    question: 'Flexbox와 Grid의 차이점과 사용 시기는?',
    difficulty: 'easy',
    level: 'beginner',
    answer: 'Flexbox는 1차원 레이아웃(행 또는 열), Grid는 2차원 레이아웃(행과 열)에 적합합니다. Flexbox는 컨텐츠 크기에 따라 유연하게 배치되고, Grid는 명시적인 행/열 구조를 정의합니다. 내비게이션 바는 Flexbox, 페이지 레이아웃은 Grid가 적합합니다.',
    pitfalls: [
      '❌ "Grid가 항상 더 좋다" → 간단한 1차원은 Flexbox가 더 적합',
      '❌ "둘 중 하나만 써야 한다" → 함께 사용 가능 (Grid 내부에 Flexbox 등)',
      '❌ "IE에서 안 된다" → Flexbox는 IE10+, Grid는 IE11에서 부분 지원'
    ],
    tags: ['CSS', 'Flexbox', 'Grid'],
    practiceLink: '/learning-radar'
  },

  // 네트워크
  {
    id: 17,
    category: '네트워크',
    question: 'HTTP와 HTTPS의 차이점을 설명해주세요.',
    difficulty: 'easy',
    level: 'beginner',
    answer: 'HTTPS는 HTTP에 SSL/TLS 암호화를 추가한 것입니다. 데이터가 암호화되어 전송되므로 중간에서 데이터를 가로채도 내용을 알 수 없습니다. 인증서를 통해 서버의 신원도 확인하여 피싱을 방지합니다.',
    pitfalls: [
      '❌ "HTTPS는 무조건 안전" → 피싱 사이트도 HTTPS 사용 가능',
      '❌ "성능이 느리다" → 현대 하드웨어에선 차이 거의 없음',
      '❌ "비용이 많이 든다" → Let\'s Encrypt로 무료 인증서 발급 가능'
    ],
    tags: ['네트워크', 'HTTP', 'HTTPS'],
    practiceLink: '/concept-snaps'
  },
  {
    id: 18,
    category: '네트워크',
    question: 'CORS란 무엇이고 왜 발생하나요?',
    difficulty: 'medium',
    level: 'intermediate',
    answer: 'CORS(Cross-Origin Resource Sharing)는 다른 출처의 리소스 접근을 제어하는 보안 정책입니다. 브라우저가 보안을 위해 같은 출처의 리소스만 요청하도록 제한합니다. 서버에서 Access-Control-Allow-Origin 헤더로 허용할 출처를 명시해야 합니다.',
    pitfalls: [
      '❌ "서버 문제다" → 브라우저 보안 정책',
      '❌ "프록시로만 해결" → 서버에서 CORS 헤더 설정이 정석',
      '❌ "*로 모두 허용" → 보안상 위험, 특정 도메인만 허용 권장'
    ],
    tags: ['네트워크', 'CORS', '보안'],
    practiceLink: '/api-sandbox'
  }
];

export default function InterviewPracticePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [showAnswer, setShowAnswer] = useState<{ [key: number]: boolean }>({});
  const [userAnswer, setUserAnswer] = useState<{ [key: number]: string }>({});

  const categories = ['all', ...Array.from(new Set(sampleQuestions.map(q => q.category)))];

  const filteredQuestions = sampleQuestions.filter(q => {
    const matchCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    const matchLevel = selectedLevel === 'all' || q.level === selectedLevel;
    return matchCategory && matchDifficulty && matchLevel;
  });

  const toggleAnswer = (id: number) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '쉬움';
      case 'medium': return '보통';
      case 'hard': return '어려움';
      default: return difficulty;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-blue-100 text-blue-700';
      case 'intermediate': return 'bg-purple-100 text-purple-700';
      case 'advanced': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner': return '초급';
      case 'intermediate': return '중급';
      case 'advanced': return '고급';
      default: return level;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">🎤 면접 리허설</h1>
          <p className="text-gray-600 text-lg">
            실제 면접에서 자주 나오는 질문과 모범 답안을 연습하세요
          </p>
        </div>

        {/* 필터 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">카테고리</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? '전체' : cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">난이도</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">전체</option>
                <option value="easy">초급</option>
                <option value="medium">중급</option>
                <option value="hard">고급</option>
              </select>
            </div>
          </div>
        </div>

        {/* 질문 목록 */}
        <div className="space-y-6">
          {filteredQuestions.map(question => (
            <div key={question.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-blue-600">{question.category}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getDifficultyColor(question.difficulty)}`}>
                        {getDifficultyText(question.difficulty)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{question.question}</h3>
                  </div>
                </div>

                {/* 사용자 답변 입력 */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    내 답변 작성하기 (선택사항)
                  </label>
                  <textarea
                    value={userAnswer[question.id] || ''}
                    onChange={(e) => setUserAnswer(prev => ({ ...prev, [question.id]: e.target.value }))}
                    placeholder="답변을 작성하면 모범 답안과 비교할 수 있어요..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  />
                </div>

                <button
                  onClick={() => toggleAnswer(question.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold mb-4"
                >
                  {showAnswer[question.id] ? '답안 숨기기' : '모범 답안 보기'}
                </button>

                {showAnswer[question.id] && (
                  <div className="space-y-4 border-t pt-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-bold text-green-900 mb-2">✅ 모범 답안</h4>
                      <p className="text-gray-700 leading-relaxed">{question.answer}</p>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-bold text-red-900 mb-3">⚠️ 흔한 실수 & 함정</h4>
                      <ul className="space-y-2">
                        {question.pitfalls.map((pitfall, idx) => (
                          <li key={idx} className="text-sm text-gray-700">{pitfall}</li>
                        ))}
                      </ul>
                    </div>

                    {question.practiceLink && (
                      <Link
                        href={question.practiceLink}
                        className="block bg-purple-50 border border-purple-200 rounded-lg p-4 hover:bg-purple-100 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-purple-900 mb-1">🔗 실습 링크</h4>
                            <p className="text-sm text-purple-700">이 개념을 직접 연습해보세요</p>
                          </div>
                          <span className="text-purple-600 font-bold">→</span>
                        </div>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 학습 팁 */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4">💡 면접 답변 잘하는 법</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <h4 className="font-semibold mb-2">1. 핵심부터 말하기</h4>
              <p className="text-sm text-white/90">결론을 먼저 말하고 세부사항은 나중에</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <h4 className="font-semibold mb-2">2. 구체적 예시 들기</h4>
              <p className="text-sm text-white/90">"프로젝트에서 이렇게 써봤는데..."</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <h4 className="font-semibold mb-2">3. 모르면 솔직하게</h4>
              <p className="text-sm text-white/90">"잘 모르지만 이렇게 추측합니다..."</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <h4 className="font-semibold mb-2">4. 함정 질문 주의</h4>
              <p className="text-sm text-white/90">절대적인 답은 없어요. "경우에 따라..."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
