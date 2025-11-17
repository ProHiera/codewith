'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import CodeReviewPanel, { CodeMetrics } from '@/components/CodeReviewPanel';
import RefactoringChallenge from '@/components/RefactoringChallenge';
import { PatternCatalog } from '@/components/DesignPatternCard';
import type { CodeIssue } from '@/components/CodeReviewPanel';
import type { RefactoringChallengeData } from '@/components/RefactoringChallenge';
import type { DesignPatternData } from '@/components/DesignPatternCard';

export default function CleanCodePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'review' | 'refactor' | 'patterns' | 'progress'>('review');
  const [loading, setLoading] = useState(true);

  // Sample data (실제로는 DB에서 가져옴)
  const sampleIssues: CodeIssue[] = [
    {
      id: '1',
      line: 15,
      severity: 'error',
      category: 'naming',
      title: '의미없는 변수명 사용',
      description: '변수 "data"는 너무 일반적입니다. 구체적인 이름을 사용하세요.',
      currentCode: 'const data = fetchUsers();',
      suggestedCode: 'const userList = fetchUsers();',
      principle: '의미있는 이름을 사용하라 - Clean Code의 가장 기본 원칙입니다.',
      resources: ['Clean Code by Robert Martin - Chapter 2'],
    },
    {
      id: '2',
      line: 42,
      severity: 'warning',
      category: 'complexity',
      title: '함수 복잡도가 높음',
      description: '순환 복잡도가 15를 초과합니다. 함수를 분리하세요.',
      currentCode: 'function processData(input) {\n  if (input.type === "A") {\n    // 50 lines...\n  } else if (input.type === "B") {\n    // 40 lines...\n  }\n}',
      suggestedCode: 'function processData(input) {\n  if (input.type === "A") return processTypeA(input);\n  if (input.type === "B") return processTypeB(input);\n}\n\nfunction processTypeA(input) { /* ... */ }\nfunction processTypeB(input) { /* ... */ }',
      principle: '함수는 한 가지 일만 해야 한다 - 단일 책임 원칙',
    },
    {
      id: '3',
      line: 87,
      severity: 'suggestion',
      category: 'readability',
      title: '매직 넘버 사용',
      description: '하드코딩된 숫자 대신 상수를 사용하세요.',
      currentCode: 'if (age > 18) { /* ... */ }',
      suggestedCode: 'const ADULT_AGE = 18;\nif (age > ADULT_AGE) { /* ... */ }',
      principle: '매직 넘버를 피하고 의미있는 상수를 사용하라',
    },
  ];

  const sampleMetrics = {
    complexity: 8,
    maintainability: 75,
    testCoverage: 65,
    duplication: 8,
    linesOfCode: 1250,
    comments: 180,
  };

  const sampleChallenge: RefactoringChallengeData = {
    id: 'challenge-1',
    title: '매직 넘버 제거하기',
    level: 'beginner',
    category: 'naming',
    timeLimit: 300,
    badCode: `function calculateDiscount(price) {
  if (price > 100) {
    return price * 0.9;
  }
  return price;
}`,
    goodCode: `const MINIMUM_PRICE_FOR_DISCOUNT = 100;
const DISCOUNT_RATE = 0.1;

function calculateDiscount(price) {
  if (price > MINIMUM_PRICE_FOR_DISCOUNT) {
    return price * (1 - DISCOUNT_RATE);
  }
  return price;
}`,
    explanation: '매직 넘버는 코드에서 의미를 알 수 없는 숫자 상수입니다. 100이 무엇을 의미하는지, 0.9가 무엇인지 명확하지 않습니다. 의미있는 상수명을 사용하면 코드의 가독성이 크게 향상되고 유지보수가 쉬워집니다.',
    steps: [
      { id: '1', title: '최소 금액 상수화', description: '100 → MINIMUM_PRICE_FOR_DISCOUNT', completed: false },
      { id: '2', title: '할인율 상수화', description: '0.9 → DISCOUNT_RATE = 0.1', completed: false },
      { id: '3', title: '계산식 명확화', description: 'price * 0.9 → price * (1 - DISCOUNT_RATE)', completed: false },
    ],
    hints: [
      '100과 0.9 같은 숫자가 무엇을 의미하는지 생각해보세요',
      '상수를 선언할 때는 대문자와 언더스코어를 사용하세요',
      '할인율은 0.1로 표현하고 계산식에서 (1 - DISCOUNT_RATE)를 사용하세요',
    ],
    principles: ['매직 넘버 제거', '의미있는 상수명 사용', '가독성 향상'],
  };

  const samplePatterns: DesignPatternData[] = [
    {
      id: 'singleton',
      name: 'Singleton Pattern',
      category: 'creational',
      difficulty: 'easy',
      icon: '🎯',
      description: '클래스의 인스턴스가 오직 하나만 생성되도록 보장하고, 전역적인 접근점을 제공하는 패턴입니다.',
      problem: '애플리케이션 전체에서 단 하나의 인스턴스만 필요한 경우, 매번 새로운 객체를 생성하면 메모리 낭비가 발생합니다.',
      solution: '클래스 내부에서 유일한 인스턴스를 생성하고, 생성자를 private으로 만들어 외부에서 직접 생성하지 못하게 합니다.',
      realWorldExample: '데이터베이스 연결 풀, 로깅 시스템, 캐시 관리자 등에서 사용됩니다.',
      codeExample: {
        before: 'class Database {\n  constructor() {\n    this.connection = this.connect();\n  }\n}\n\nconst db1 = new Database();\nconst db2 = new Database();\nconsole.log(db1 === db2); // false',
        after: 'class Database {\n  static instance = null;\n  \n  static getInstance() {\n    if (!Database.instance) {\n      Database.instance = new Database();\n    }\n    return Database.instance;\n  }\n}\n\nconst db1 = Database.getInstance();\nconst db2 = Database.getInstance();\nconsole.log(db1 === db2); // true',
      },
      pros: ['전역 상태 관리 용이', '메모리 절약', '리소스 공유'],
      cons: ['전역 상태로 인한 결합도 증가', '테스트 어려움'],
      relatedPatterns: ['Factory Pattern', 'Dependency Injection'],
      useCases: ['설정 관리자', '로깅 시스템', 'DB 연결 풀', '캐시 관리자'],
    },
    {
      id: 'factory',
      name: 'Factory Pattern',
      category: 'creational',
      difficulty: 'medium',
      icon: '🏭',
      description: '객체 생성 로직을 별도의 팩토리 클래스로 분리하는 패턴입니다.',
      problem: '객체 생성 로직이 복잡하거나 조건에 따라 다른 타입의 객체를 생성해야 할 때 결합도가 높아집니다.',
      solution: '객체 생성 책임을 별도의 팩토리 클래스나 메서드로 캡슐화합니다.',
      realWorldExample: '결제 시스템에서 신용카드, PayPal, 비트코인 등 다양한 결제 방법을 처리할 때 사용합니다.',
      codeExample: {
        before: 'if (type === "credit") {\n  return new CreditCard();\n} else if (type === "paypal") {\n  return new PayPal();\n}',
        after: 'class PaymentFactory {\n  static create(type) {\n    switch(type) {\n      case "credit": return new CreditCard();\n      case "paypal": return new PayPal();\n    }\n  }\n}',
      },
      pros: ['객체 생성 로직 캡슐화', '새로운 타입 추가 용이'],
      cons: ['클래스 수 증가', '코드 복잡도 증가'],
      relatedPatterns: ['Abstract Factory', 'Builder'],
      useCases: ['다양한 타입의 객체 생성', '조건부 객체 생성'],
    },
    {
      id: 'observer',
      name: 'Observer Pattern',
      category: 'behavioral',
      difficulty: 'medium',
      icon: '👀',
      description: '객체의 상태 변화를 관찰하는 관찰자들에게 자동으로 알림을 보내는 패턴입니다.',
      problem: '하나의 객체 상태가 변경될 때 다른 여러 객체들이 그 변경을 알아야 하는 경우 결합도가 높아집니다.',
      solution: 'Subject가 Observer 목록을 유지하고, 상태 변경시 모든 구독자에게 자동으로 알림을 보냅니다.',
      realWorldExample: 'YouTube 채널 구독, 이벤트 리스너, React의 상태 관리 등이 이 패턴을 사용합니다.',
      codeExample: {
        before: 'class NewsAgency {\n  setNews(news) {\n    this.channels.forEach(ch => ch.update(news));\n  }\n}',
        after: 'class Subject {\n  subscribe(observer) { this.observers.push(observer); }\n  notify(data) { this.observers.forEach(o => o.update(data)); }\n}',
      },
      pros: ['느슨한 결합', '동적 구독/해제', '이벤트 기반 프로그래밍'],
      cons: ['알림 순서 보장 안됨', '메모리 누수 가능성'],
      relatedPatterns: ['Mediator', 'Event Emitter'],
      useCases: ['이벤트 처리', '데이터 바인딩', '알림 시스템'],
    },
  ];

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
      setLoading(false);
    };

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Back Button */}
              <button
                onClick={() => router.back()}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                <span>←</span> 뒤로
              </button>
              {/* Home Button */}
              <Link
                href="/"
                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                <span>🏠</span> 홈
              </Link>
              <div>
                <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
                  <span>🧹</span> Clean Code 프로그래밍
                </h1>
                <p className="text-gray-600 mt-2">
                  중급자 이상을 위한 코드 품질 향상 시스템
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">현재 레벨</div>
              <div className="text-3xl font-bold text-blue-600">중급</div>
              <div className="text-xs text-gray-500 mt-1">1,250 XP</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b-2 border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {[
              { id: 'review', label: '코드 리뷰', emoji: '🔍', desc: '자동 분석 & 개선 제안' },
              { id: 'refactor', label: '리팩토링', emoji: '🛠️', desc: '실습 챌린지' },
              { id: 'patterns', label: '디자인 패턴', emoji: '🎨', desc: 'GOF & SOLID' },
              { id: 'progress', label: '학습 진도', emoji: '📊', desc: '성과 추적' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 py-4 px-6 font-semibold transition-all border-b-4 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600 bg-blue-50'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="text-2xl mb-1">{tab.emoji}</div>
                <div className="text-sm">{tab.label}</div>
                <div className="text-xs opacity-75">{tab.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'review' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CodeReviewPanel
                  issues={sampleIssues}
                  onApplySuggestion={(id) => console.log('Apply suggestion:', id)}
                  onRequestReview={() => console.log('Re-analyze')}
                />
              </div>
              <div>
                <CodeMetrics metrics={sampleMetrics} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'refactor' && (
          <div>
            <RefactoringChallenge
              challenge={sampleChallenge}
              onComplete={(time, hints) => console.log('Completed:', time, hints)}
              onSkip={() => console.log('Skipped')}
            />
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="space-y-6">
            <PatternCatalog
              patterns={samplePatterns}
              onSelectPattern={(pattern) => console.log('Selected:', pattern)}
            />
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            {/* Progress Dashboard */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span>📈</span> 학습 현황
              </h2>
              
              <div className="grid grid-cols-4 gap-6 mb-8">
                {[
                  { label: '코드 리뷰', value: 12, total: 50, emoji: '🔍', color: 'blue' },
                  { label: '챌린지 완료', value: 5, total: 20, emoji: '🛠️', color: 'green' },
                  { label: '패턴 마스터', value: 3, total: 23, emoji: '🎨', color: 'purple' },
                  { label: '획득 뱃지', value: 4, total: 15, emoji: '🏆', color: 'yellow' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-4xl mb-2">{stat.emoji}</div>
                    <div className={`text-3xl font-bold text-${stat.color}-600`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500">/ {stat.total}</div>
                    <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className={`bg-${stat.color}-500 h-2 rounded-full`}
                        style={{ width: `${(stat.value / stat.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Achievements */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">최근 획득 뱃지</h3>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { name: '코드 리뷰어', emoji: '🔍', date: '2일 전' },
                    { name: '리팩토링 초보', emoji: '🌱', date: '5일 전' },
                    { name: '패턴 학습자', emoji: '📚', date: '1주 전' },
                    { name: 'SOLID 입문', emoji: '🎯', date: '2주 전' },
                  ].map((badge) => (
                    <div
                      key={badge.name}
                      className="bg-linear-to-br from-yellow-100 to-yellow-200 rounded-xl p-4 text-center border-2 border-yellow-300"
                    >
                      <div className="text-4xl mb-2">{badge.emoji}</div>
                      <div className="font-semibold text-sm text-gray-800">{badge.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{badge.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
