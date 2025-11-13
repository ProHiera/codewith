'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';

type ConceptSnap = {
  id: string;
  title: string;
  category: 'expression' | 'statement' | 'this' | 'async' | 'closure' | 'prototype';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  cards: ConceptCard[];
};

type ConceptCard = {
  step: number;
  title: string;
  code: string;
  explanation: string;
  visual?: string;
};

const concepts: ConceptSnap[] = [
  {
    id: 'expression-vs-statement',
    title: '표현식 vs 문(Statement)',
    category: 'expression',
    difficulty: 'beginner',
    cards: [
      {
        step: 1,
        title: '표현식이란?',
        code: '3 + 4\n"hello"\ntrue\nuser.name\ngetValue()',
        explanation: '표현식은 값을 반환하는 코드 조각입니다. 변수에 할당하거나 함수 인자로 사용할 수 있어요.',
        visual: '📦 → 값'
      },
      {
        step: 2,
        title: '문(Statement)이란?',
        code: 'let x = 10;\nif (x > 5) { }\nfor (let i = 0; i < 10; i++) { }\nreturn x;',
        explanation: '문은 동작을 수행하지만 값을 반환하지 않습니다. 변수에 할당할 수 없어요.',
        visual: '⚙️ → 동작'
      },
      {
        step: 3,
        title: '헷갈리는 예제',
        code: '// 표현식:\nconst result = x > 5 ? "big" : "small"\n\n// 문:\nif (x > 5) {\n  result = "big"\n}',
        explanation: '삼항 연산자는 표현식이라 값을 반환하지만, if는 문이라 값을 반환하지 않아요.',
        visual: '🤔'
      }
    ]
  },
  {
    id: 'this-keyword',
    title: 'this 키워드 완전 정복',
    category: 'this',
    difficulty: 'intermediate',
    cards: [
      {
        step: 1,
        title: '기본 규칙',
        code: 'function hello() {\n  console.log(this) // window (strict mode에선 undefined)\n}',
        explanation: '일반 함수에서 this는 호출 방식에 따라 달라집니다.',
        visual: '🌐 전역 객체'
      },
      {
        step: 2,
        title: '메서드 호출',
        code: 'const user = {\n  name: "Kim",\n  greet() {\n    console.log(this.name) // "Kim"\n  }\n}\nuser.greet()',
        explanation: '객체의 메서드로 호출하면 this는 그 객체를 가리킵니다.',
        visual: '👤 user 객체'
      },
      {
        step: 3,
        title: '화살표 함수',
        code: 'const user = {\n  name: "Kim",\n  greet: () => {\n    console.log(this.name) // undefined\n  }\n}',
        explanation: '화살표 함수는 자신의 this를 갖지 않고 상위 스코프의 this를 사용합니다.',
        visual: '⬆️ 상위 스코프'
      },
      {
        step: 4,
        title: 'bind/call/apply',
        code: 'const greet = function() {\n  console.log(this.name)\n}\n\ngreet.call({ name: "Kim" }) // "Kim"\nconst boundGreet = greet.bind({ name: "Lee" })\nboundGreet() // "Lee"',
        explanation: 'bind, call, apply로 this를 명시적으로 지정할 수 있습니다.',
        visual: '🔗 강제 바인딩'
      }
    ]
  },
  {
    id: 'async-await-flow',
    title: 'async/await 실행 흐름',
    category: 'async',
    difficulty: 'intermediate',
    cards: [
      {
        step: 1,
        title: 'Promise 기본',
        code: 'const promise = new Promise((resolve, reject) => {\n  setTimeout(() => resolve("완료!"), 1000)\n})\n\npromise.then(result => console.log(result))',
        explanation: 'Promise는 비동기 작업의 완료 또는 실패를 나타내는 객체입니다.',
        visual: '⏳ → ✅'
      },
      {
        step: 2,
        title: 'async 함수',
        code: 'async function fetchData() {\n  return "데이터"\n}\n\n// 자동으로 Promise를 반환\nfetchData().then(data => console.log(data))',
        explanation: 'async 함수는 항상 Promise를 반환합니다. return 값이 자동으로 resolve됩니다.',
        visual: '🔄 자동 Promise 변환'
      },
      {
        step: 3,
        title: 'await 키워드',
        code: 'async function getData() {\n  console.log("1. 시작")\n  const result = await fetchData() // 여기서 대기\n  console.log("2. 결과:", result)\n  return result\n}',
        explanation: 'await는 Promise가 완료될 때까지 실행을 일시 중지합니다. 다음 줄은 완료 후 실행돼요.',
        visual: '⏸️ 대기 중...'
      },
      {
        step: 4,
        title: '에러 처리',
        code: 'async function getData() {\n  try {\n    const result = await fetchData()\n    return result\n  } catch (error) {\n    console.error("에러 발생:", error)\n  } finally {\n    console.log("항상 실행")\n  }\n}',
        explanation: 'try-catch로 await의 에러를 처리합니다. finally는 성공/실패 관계없이 실행됩니다.',
        visual: '🛡️ 에러 보호'
      }
    ]
  },
  {
    id: 'closure',
    title: '클로저(Closure) 이해하기',
    category: 'closure',
    difficulty: 'advanced',
    cards: [
      {
        step: 1,
        title: '클로저란?',
        code: 'function outer() {\n  const secret = "비밀"\n  \n  function inner() {\n    console.log(secret) // 접근 가능!\n  }\n  \n  return inner\n}',
        explanation: '함수가 자신이 선언된 환경(스코프)을 기억하는 것을 클로저라고 합니다.',
        visual: '🎁 환경을 담은 함수'
      },
      {
        step: 2,
        title: '실용적인 예제',
        code: 'function createCounter() {\n  let count = 0\n  \n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    getCount: () => count\n  }\n}\n\nconst counter = createCounter()\ncounter.increment() // 1',
        explanation: '클로저로 private 변수를 만들 수 있습니다. count는 외부에서 직접 접근 불가!',
        visual: '🔒 캡슐화'
      },
      {
        step: 3,
        title: '흔한 실수',
        code: 'for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1000)\n}\n// 출력: 3, 3, 3\n\nfor (let j = 0; j < 3; j++) {\n  setTimeout(() => console.log(j), 1000)\n}\n// 출력: 0, 1, 2',
        explanation: 'var는 함수 스코프라 모든 setTimeout이 같은 i를 참조합니다. let은 블록 스코프라 각각 다른 j를 가져요.',
        visual: '⚠️ var vs let'
      }
    ]
  }
];

export default function ConceptSnapsPage() {
  const [selectedConcept, setSelectedConcept] = useState<ConceptSnap | null>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredConcepts = selectedCategory === 'all' 
    ? concepts 
    : concepts.filter(c => c.category === selectedCategory);

  const nextCard = () => {
    if (selectedConcept && currentCard < selectedConcept.cards.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const selectConcept = (concept: ConceptSnap) => {
    setSelectedConcept(concept);
    setCurrentCard(0);
  };

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
      case 'beginner': return '입문';
      case 'intermediate': return '중급';
      case 'advanced': return '고급';
      default: return difficulty;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <PageHeader />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">📚 JS 개념 스냅샷</h1>
          <p className="text-gray-600 text-lg">
            어려운 JavaScript 개념을 카드 형식으로 쉽게 이해하세요
          </p>
        </div>

        {!selectedConcept ? (
          <>
            {/* 카테고리 필터 */}
            <div className="mb-8 flex gap-3 flex-wrap">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setSelectedCategory('expression')}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  selectedCategory === 'expression'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                표현식/문
              </button>
              <button
                onClick={() => setSelectedCategory('this')}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  selectedCategory === 'this'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                this
              </button>
              <button
                onClick={() => setSelectedCategory('async')}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  selectedCategory === 'async'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                비동기
              </button>
              <button
                onClick={() => setSelectedCategory('closure')}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  selectedCategory === 'closure'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                클로저
              </button>
            </div>

            {/* 개념 목록 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredConcepts.map(concept => (
                <button
                  key={concept.id}
                  onClick={() => selectConcept(concept)}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all text-left hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{concept.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getDifficultyColor(concept.difficulty)}`}>
                      {getDifficultyText(concept.difficulty)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {concept.cards.length}단계 카드로 배우기
                  </p>
                  <div className="text-blue-600 font-semibold">
                    시작하기 →
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-6">
            {/* 진행바 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold">{selectedConcept.title}</h2>
                <button
                  onClick={() => setSelectedConcept(null)}
                  className="text-gray-500 hover:text-gray-700 font-semibold"
                >
                  ✕ 닫기
                </button>
              </div>
              <div className="flex items-center gap-2">
                {selectedConcept.cards.map((_, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 h-2 rounded-full ${
                      idx <= currentCard ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  ></div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {currentCard + 1} / {selectedConcept.cards.length} 단계
              </p>
            </div>

            {/* 카드 */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
                <div className="text-sm font-semibold mb-2">
                  Step {selectedConcept.cards[currentCard].step}
                </div>
                <h3 className="text-2xl font-bold">
                  {selectedConcept.cards[currentCard].title}
                </h3>
                {selectedConcept.cards[currentCard].visual && (
                  <div className="text-4xl mt-3">
                    {selectedConcept.cards[currentCard].visual}
                  </div>
                )}
              </div>

              <div className="p-8 space-y-6">
                {/* 코드 */}
                <div className="bg-gray-900 text-white rounded-lg p-6">
                  <pre className="text-sm leading-relaxed overflow-x-auto">
                    <code>{selectedConcept.cards[currentCard].code}</code>
                  </pre>
                </div>

                {/* 설명 */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <p className="text-gray-800 leading-relaxed text-lg">
                    {selectedConcept.cards[currentCard].explanation}
                  </p>
                </div>

                {/* 네비게이션 */}
                <div className="flex justify-between items-center pt-4">
                  <button
                    onClick={prevCard}
                    disabled={currentCard === 0}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 rounded-lg font-semibold"
                  >
                    ← 이전
                  </button>
                  
                  {currentCard < selectedConcept.cards.length - 1 ? (
                    <button
                      onClick={nextCard}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                    >
                      다음 →
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedConcept(null)}
                      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
                    >
                      완료! ✓
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 학습 팁 */}
        {!selectedConcept && (
          <div className="mt-8 bg-purple-50 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">💡 효과적인 학습 방법</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">1.</span>
                <span>각 카드를 천천히 읽고 코드를 직접 실행해보세요</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">2.</span>
                <span>이해가 안 되면 이전 카드로 돌아가서 다시 보세요</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">3.</span>
                <span>배운 내용을 자신의 프로젝트에 바로 적용해보세요</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
