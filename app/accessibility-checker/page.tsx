'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';

type Issue = {
  id: string;
  severity: 'critical' | 'major' | 'minor';
  category: string;
  element: string;
  line: number;
  message: string;
  suggestion: string;
  code: {
    before: string;
    after: string;
  };
};

const MOCK_ISSUES: Issue[] = [
  {
    id: '1',
    severity: 'critical',
    category: 'Missing Alt',
    element: '<img>',
    line: 42,
    message: '이미지에 alt 속성이 없습니다',
    suggestion: 'alt 속성을 추가하여 스크린 리더 사용자가 이미지 내용을 알 수 있도록 하세요',
    code: {
      before: '<img src="/logo.png" />',
      after: '<img src="/logo.png" alt="회사 로고" />'
    }
  },
  {
    id: '2',
    severity: 'critical',
    category: 'ARIA',
    element: '<button>',
    line: 58,
    message: '아이콘 전용 버튼에 aria-label이 없습니다',
    suggestion: 'aria-label을 추가하여 버튼의 용도를 명확히 하세요',
    code: {
      before: '<button onClick={handleClose}>\n  <XIcon />\n</button>',
      after: '<button onClick={handleClose} aria-label="닫기">\n  <XIcon />\n</button>'
    }
  },
  {
    id: '3',
    severity: 'major',
    category: 'Contrast',
    element: '<p>',
    line: 103,
    message: '텍스트와 배경색 대비가 부족합니다 (2.8:1)',
    suggestion: 'WCAG AA 기준 4.5:1 이상으로 대비를 높이세요',
    code: {
      before: '<p className="text-gray-400 bg-gray-200">안내 텍스트</p>',
      after: '<p className="text-gray-700 bg-white">안내 텍스트</p>'
    }
  },
  {
    id: '4',
    severity: 'major',
    category: 'Heading Order',
    element: '<h4>',
    line: 76,
    message: 'h2 다음에 h4가 사용되었습니다',
    suggestion: '제목 레벨을 순차적으로 사용하세요 (h2 → h3 → h4)',
    code: {
      before: '<h2>섹션 제목</h2>\n...\n<h4>하위 제목</h4>',
      after: '<h2>섹션 제목</h2>\n...\n<h3>하위 제목</h3>'
    }
  },
  {
    id: '5',
    severity: 'minor',
    category: 'Focus Indicator',
    element: '<a>',
    line: 124,
    message: 'focus 시 시각적 표시가 없습니다',
    suggestion: 'focus:ring 또는 focus:outline을 추가하세요',
    code: {
      before: '<a href="/about" className="text-blue-600">소개</a>',
      after: '<a href="/about" className="text-blue-600 focus:ring-2 focus:ring-blue-500">소개</a>'
    }
  },
  {
    id: '6',
    severity: 'minor',
    category: 'Form Label',
    element: '<input>',
    line: 89,
    message: 'input에 연결된 label이 없습니다',
    suggestion: 'label과 input을 htmlFor와 id로 연결하세요',
    code: {
      before: '<input type="email" placeholder="이메일" />',
      after: '<label htmlFor="email">이메일</label>\n<input id="email" type="email" />'
    }
  }
];

export default function AccessibilityCheckerPage() {
  const [issues] = useState<Issue[]>(MOCK_ISSUES);
  const [filter, setFilter] = useState<'all' | 'critical' | 'major' | 'minor'>('all');
  const [showCode, setShowCode] = useState<Record<string, boolean>>({});

  const filteredIssues = filter === 'all' 
    ? issues 
    : issues.filter(issue => issue.severity === filter);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-300';
      case 'major': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'minor': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'critical': return '심각';
      case 'major': return '중요';
      case 'minor': return '경미';
      default: return severity;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return '🔴';
      case 'major': return '🟠';
      case 'minor': return '🟡';
      default: return '⚪';
    }
  };

  const toggleCode = (id: string) => {
    setShowCode(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const issueStats = {
    critical: issues.filter(i => i.severity === 'critical').length,
    major: issues.filter(i => i.severity === 'major').length,
    minor: issues.filter(i => i.severity === 'minor').length,
    total: issues.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 p-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">♿ 접근성 검사기</h1>
          <p className="text-gray-600 text-lg">
            웹 접근성 이슈를 자동으로 검사하고 수정 방법을 제안합니다
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 통계 & 필터 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 통계 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">📊 검사 결과</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">총 이슈</div>
                    <div className="text-2xl font-bold">{issueStats.total}</div>
                  </div>
                  <div className="text-3xl">🔍</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">심각</div>
                    <div className="text-2xl font-bold text-red-600">{issueStats.critical}</div>
                  </div>
                  <div className="text-3xl">🔴</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">중요</div>
                    <div className="text-2xl font-bold text-orange-600">{issueStats.major}</div>
                  </div>
                  <div className="text-3xl">🟠</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">경미</div>
                    <div className="text-2xl font-bold text-yellow-600">{issueStats.minor}</div>
                  </div>
                  <div className="text-3xl">🟡</div>
                </div>
              </div>
            </div>

            {/* 필터 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">🔍 필터</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`w-full px-4 py-2 rounded-lg font-semibold text-left transition-all ${
                    filter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  전체 ({issueStats.total})
                </button>
                <button
                  onClick={() => setFilter('critical')}
                  className={`w-full px-4 py-2 rounded-lg font-semibold text-left transition-all ${
                    filter === 'critical'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  심각 ({issueStats.critical})
                </button>
                <button
                  onClick={() => setFilter('major')}
                  className={`w-full px-4 py-2 rounded-lg font-semibold text-left transition-all ${
                    filter === 'major'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  중요 ({issueStats.major})
                </button>
                <button
                  onClick={() => setFilter('minor')}
                  className={`w-full px-4 py-2 rounded-lg font-semibold text-left transition-all ${
                    filter === 'minor'
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  경미 ({issueStats.minor})
                </button>
              </div>
            </div>

            {/* WCAG 가이드 */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-4">📖 WCAG 가이드라인</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-white/20 rounded p-2 backdrop-blur">
                  <div className="font-semibold">인식 가능</div>
                  <div className="text-xs text-white/80">모든 사용자가 콘텐츠를 인식할 수 있어야 함</div>
                </div>
                <div className="bg-white/20 rounded p-2 backdrop-blur">
                  <div className="font-semibold">운용 가능</div>
                  <div className="text-xs text-white/80">키보드만으로 모든 기능 사용 가능</div>
                </div>
                <div className="bg-white/20 rounded p-2 backdrop-blur">
                  <div className="font-semibold">이해 가능</div>
                  <div className="text-xs text-white/80">명확하고 일관성 있는 UI</div>
                </div>
                <div className="bg-white/20 rounded p-2 backdrop-blur">
                  <div className="font-semibold">견고함</div>
                  <div className="text-xs text-white/80">다양한 보조 기술과 호환</div>
                </div>
              </div>
            </div>
          </div>

          {/* 이슈 목록 */}
          <div className="lg:col-span-3 space-y-4">
            {filteredIssues.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  이 필터에 해당하는 이슈가 없습니다
                </h3>
                <p className="text-gray-500">
                  다른 필터를 선택하거나 전체 이슈를 확인하세요
                </p>
              </div>
            ) : (
              filteredIssues.map(issue => (
                <div key={issue.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="text-2xl">{getSeverityIcon(issue.severity)}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg">{issue.message}</h3>
                            <span className={`text-xs px-2 py-1 rounded font-semibold border ${getSeverityColor(issue.severity)}`}>
                              {getSeverityText(issue.severity)}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span>📁 {issue.category}</span>
                            <span>• {issue.element}</span>
                            <span>• Line {issue.line}</span>
                          </div>
                          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-3">
                            <div className="text-sm text-blue-900">
                              💡 <span className="font-semibold">수정 제안:</span> {issue.suggestion}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleCode(issue.id)}
                      className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-sm transition-colors"
                    >
                      {showCode[issue.id] ? '코드 숨기기 ▲' : '수정 코드 보기 ▼'}
                    </button>

                    {showCode[issue.id] && (
                      <div className="mt-4 space-y-3">
                        <div>
                          <div className="text-sm font-semibold text-gray-700 mb-2">❌ Before</div>
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                            <pre className="whitespace-pre-wrap">{issue.code.before}</pre>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-700 mb-2">✅ After</div>
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                            <pre className="whitespace-pre-wrap">{issue.code.after}</pre>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(issue.code.after);
                            alert('수정 코드가 클립보드에 복사되었습니다!');
                          }}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
                        >
                          📋 수정 코드 복사
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            {/* 학습 자료 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">📚 웹 접근성 학습 자료</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold mb-2">🌐 MDN Web Docs</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    ARIA 속성, 시맨틱 HTML, 키보드 네비게이션 가이드
                  </p>
                  <a
                    href="https://developer.mozilla.org/ko/docs/Web/Accessibility"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    문서 보기 →
                  </a>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold mb-2">✅ WCAG 체크리스트</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    웹 접근성 준수를 위한 단계별 체크리스트
                  </p>
                  <a
                    href="https://www.w3.org/WAI/WCAG21/quickref/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    체크리스트 보기 →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
