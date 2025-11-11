'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';

type CommitType = 'feat' | 'fix' | 'refactor' | 'docs' | 'style' | 'test' | 'chore';

type FileChange = {
  path: string;
  status: 'added' | 'modified' | 'deleted';
  additions: number;
  deletions: number;
};

type CommitTemplate = {
  type: CommitType;
  icon: string;
  title: string;
  description: string;
  example: string;
};

const COMMIT_TEMPLATES: CommitTemplate[] = [
  {
    type: 'feat',
    icon: '✨',
    title: 'feat: 새로운 기능',
    description: '새로운 기능 추가',
    example: 'feat: 사용자 프로필 이미지 업로드 기능 추가'
  },
  {
    type: 'fix',
    icon: '🐛',
    title: 'fix: 버그 수정',
    description: '버그 및 오류 수정',
    example: 'fix: 로그인 시 토큰 만료 오류 수정'
  },
  {
    type: 'refactor',
    icon: '♻️',
    title: 'refactor: 리팩토링',
    description: '기능 변경 없이 코드 개선',
    example: 'refactor: 사용자 인증 로직을 hooks로 분리'
  },
  {
    type: 'docs',
    icon: '📝',
    title: 'docs: 문서',
    description: 'README, 주석 등 문서 수정',
    example: 'docs: API 사용 방법 README에 추가'
  },
  {
    type: 'style',
    icon: '💄',
    title: 'style: 스타일',
    description: 'UI/UX 개선, CSS 변경',
    example: 'style: 버튼 hover 효과 개선'
  },
  {
    type: 'test',
    icon: '✅',
    title: 'test: 테스트',
    description: '테스트 코드 추가/수정',
    example: 'test: 사용자 인증 API 유닛 테스트 추가'
  },
  {
    type: 'chore',
    icon: '🔧',
    title: 'chore: 기타',
    description: '빌드, 설정 파일 등',
    example: 'chore: ESLint 설정 업데이트'
  }
];

export default function CommitAssistantPage() {
  const [selectedType, setSelectedType] = useState<CommitType>('feat');
  const [commitMessage, setCommitMessage] = useState('');
  const [commitBody, setCommitBody] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');

  const [mockChanges] = useState<FileChange[]>([
    { path: 'app/login/page.tsx', status: 'modified', additions: 15, deletions: 8 },
    { path: 'app/api/auth/route.ts', status: 'added', additions: 45, deletions: 0 },
    { path: 'components/Header.tsx', status: 'modified', additions: 3, deletions: 2 },
    { path: 'utils/old-helper.ts', status: 'deleted', additions: 0, deletions: 120 }
  ]);

  const generateCommitMessage = () => {
    const template = COMMIT_TEMPLATES.find(t => t.type === selectedType);
    if (!commitMessage.trim()) {
      alert('커밋 메시지를 입력해주세요');
      return;
    }

    const icon = template?.icon || '';
    const type = selectedType;
    const subject = commitMessage.trim();
    const body = commitBody.trim();

    let message = `${icon} ${type}: ${subject}`;
    if (body) {
      message += `\n\n${body}`;
    }

    setGeneratedMessage(message);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'added': return '🆕';
      case 'modified': return '📝';
      case 'deleted': return '🗑️';
      default: return '📄';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'added': return 'text-green-600';
      case 'modified': return 'text-blue-600';
      case 'deleted': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">💬 커밋/PR 비서</h1>
          <p className="text-gray-600 text-lg">
            변경 사항을 분석해 Conventional Commits 형식의 메시지를 생성합니다
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 변경 파일 목록 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">📁 변경된 파일</h2>
              <div className="space-y-2">
                {mockChanges.map((change, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-xl">{getStatusIcon(change.status)}</span>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-semibold ${getStatusColor(change.status)}`}>
                          {change.status.toUpperCase()}
                        </div>
                        <div className="text-xs text-gray-600 truncate" title={change.path}>
                          {change.path}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      {change.additions > 0 && (
                        <span className="text-green-600">+{change.additions}</span>
                      )}
                      {change.deletions > 0 && (
                        <span className="text-red-600">-{change.deletions}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">총 변경</div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-green-600 font-semibold">
                    +{mockChanges.reduce((sum, c) => sum + c.additions, 0)}
                  </span>
                  <span className="text-red-600 font-semibold">
                    -{mockChanges.reduce((sum, c) => sum + c.deletions, 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* PR 템플릿 */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h2 className="text-xl font-bold mb-4">📋 PR 템플릿</h2>
              <div className="text-sm space-y-3">
                <div>
                  <div className="font-semibold text-gray-700">## 변경 사항</div>
                  <div className="text-gray-500">- 주요 변경 내용 설명</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-700">## 테스트</div>
                  <div className="text-gray-500">- [ ] 단위 테스트 통과</div>
                  <div className="text-gray-500">- [ ] 수동 테스트 완료</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-700">## 스크린샷</div>
                  <div className="text-gray-500">(UI 변경 시 첨부)</div>
                </div>
              </div>
            </div>
          </div>

          {/* 커밋 메시지 작성 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 커밋 타입 선택 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">🏷️ 커밋 타입 선택</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {COMMIT_TEMPLATES.map(template => (
                  <button
                    key={template.type}
                    onClick={() => setSelectedType(template.type)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedType === template.type
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{template.icon}</div>
                    <div className="font-semibold text-sm">{template.type}</div>
                  </button>
                ))}
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="font-semibold text-blue-900 mb-1">
                  {COMMIT_TEMPLATES.find(t => t.type === selectedType)?.title}
                </div>
                <div className="text-sm text-blue-700 mb-2">
                  {COMMIT_TEMPLATES.find(t => t.type === selectedType)?.description}
                </div>
                <div className="text-xs text-blue-600 font-mono bg-white p-2 rounded">
                  예시: {COMMIT_TEMPLATES.find(t => t.type === selectedType)?.example}
                </div>
              </div>
            </div>

            {/* 메시지 입력 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">✍️ 커밋 메시지 작성</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    제목 (필수) - 50자 이내
                  </label>
                  <input
                    type="text"
                    value={commitMessage}
                    onChange={(e) => setCommitMessage(e.target.value)}
                    placeholder="변경 사항을 간단히 요약하세요"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={50}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {commitMessage.length}/50
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    본문 (선택) - 상세 설명
                  </label>
                  <textarea
                    value={commitBody}
                    onChange={(e) => setCommitBody(e.target.value)}
                    placeholder="변경 이유, 영향 범위 등을 상세히 설명하세요"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  />
                </div>

                <button
                  onClick={generateCommitMessage}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  🚀 커밋 메시지 생성
                </button>
              </div>
            </div>

            {/* 생성된 메시지 */}
            {generatedMessage && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">✅ 생성된 커밋 메시지</h2>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
                  {generatedMessage}
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedMessage);
                      alert('클립보드에 복사되었습니다!');
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
                  >
                    📋 복사하기
                  </button>
                  <button
                    onClick={() => setGeneratedMessage('')}
                    className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold"
                  >
                    초기화
                  </button>
                </div>
              </div>
            )}

            {/* 가이드라인 */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">📌 좋은 커밋 메시지 작성 가이드</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>제목은 명령형으로 작성 (예: "추가했다" ❌ → "추가" ✅)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>제목과 본문 사이 빈 줄 추가</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>본문에는 "무엇을", "왜" 변경했는지 설명</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>하나의 커밋은 하나의 논리적 변경만 포함</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>제목 끝에 마침표(.) 사용하지 않기</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
