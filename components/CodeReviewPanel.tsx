'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CodeReviewPanel - 코드 리뷰 & 개선 제안
 * 
 * 사용자가 작성한 코드를 분석하고
 * Clean Code 원칙에 맞춰 개선 제안
 */

export interface CodeIssue {
  id: string;
  line: number;
  severity: 'error' | 'warning' | 'info' | 'suggestion';
  category: 'naming' | 'structure' | 'complexity' | 'duplication' | 'performance' | 'readability';
  title: string;
  description: string;
  currentCode: string;
  suggestedCode?: string;
  principle?: string; // Clean Code 원칙
  resources?: string[]; // 참고 자료
}

export interface CodeReviewPanelProps {
  code: string;
  language: 'javascript' | 'typescript' | 'python' | 'java';
  issues: CodeIssue[];
  onApplySuggestion?: (issueId: string) => void;
  onRequestReview?: () => void;
  className?: string;
}

export default function CodeReviewPanel({
  issues,
  onApplySuggestion,
  onRequestReview,
  className = '',
}: Omit<CodeReviewPanelProps, 'code' | 'language'>) {
  const [selectedIssue, setSelectedIssue] = useState<CodeIssue | null>(null);
  const [filter, setFilter] = useState<'all' | 'error' | 'warning' | 'info' | 'suggestion'>('all');

  const severityConfig = {
    error: {
      emoji: '🔴',
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-300',
      label: '오류',
    },
    warning: {
      emoji: '🟡',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-300',
      label: '경고',
    },
    info: {
      emoji: '🔵',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      label: '정보',
    },
    suggestion: {
      emoji: '💡',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-300',
      label: '제안',
    },
  };

  const categoryLabels = {
    naming: '네이밍',
    structure: '구조',
    complexity: '복잡도',
    duplication: '중복',
    performance: '성능',
    readability: '가독성',
  };

  const filteredIssues = filter === 'all' 
    ? issues 
    : issues.filter(issue => issue.severity === filter);

  const stats = {
    error: issues.filter(i => i.severity === 'error').length,
    warning: issues.filter(i => i.severity === 'warning').length,
    info: issues.filter(i => i.severity === 'info').length,
    suggestion: issues.filter(i => i.severity === 'suggestion').length,
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-linear-to-r from-indigo-500 to-purple-500 px-6 py-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span>🔍</span> 코드 리뷰
            </h3>
            <p className="text-sm opacity-90 mt-1">
              Clean Code 원칙 기반 자동 분석
            </p>
          </div>
          <button
            onClick={onRequestReview}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all"
          >
            🔄 재분석
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50 border-b-2 border-gray-200">
        {Object.entries(stats).map(([severity, count]) => {
          const config = severityConfig[severity as keyof typeof severityConfig];
          return (
            <button
              key={severity}
              onClick={() => setFilter(severity as 'all' | 'error' | 'warning' | 'info' | 'suggestion')}
              className={`p-4 rounded-xl border-2 transition-all ${
                filter === severity
                  ? `${config.bg} ${config.border} shadow-md`
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-3xl mb-1">{config.emoji}</div>
              <div className={`text-2xl font-bold ${config.color}`}>{count}</div>
              <div className="text-xs text-gray-600">{config.label}</div>
            </button>
          );
        })}
      </div>

      {/* Issues List */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-gray-800">
            발견된 이슈 ({filteredIssues.length})
          </h4>
          {filter !== 'all' && (
            <button
              onClick={() => setFilter('all')}
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
            >
              모두 보기
            </button>
          )}
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {filteredIssues.map((issue) => {
              const config = severityConfig[issue.severity];
              const isSelected = selectedIssue?.id === issue.id;

              return (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`border-2 rounded-xl overflow-hidden cursor-pointer transition-all ${
                    isSelected
                      ? `${config.border} ${config.bg}`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedIssue(isSelected ? null : issue)}
                >
                  {/* Issue Header */}
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{config.emoji}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-sm font-bold ${config.color}`}>
                            Line {issue.line}
                          </span>
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                            {categoryLabels[issue.category]}
                          </span>
                        </div>
                        <h5 className="font-semibold text-gray-800 mb-1">
                          {issue.title}
                        </h5>
                        <p className="text-sm text-gray-600">
                          {issue.description}
                        </p>
                      </div>
                      <span className="text-gray-400">
                        {isSelected ? '▼' : '▶'}
                      </span>
                    </div>
                  </div>

                  {/* Issue Details (Expanded) */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t-2 border-gray-200"
                      >
                        <div className="p-4 space-y-4">
                          {/* Current Code */}
                          <div>
                            <h6 className="text-xs font-semibold text-gray-600 mb-2">
                              ❌ 현재 코드
                            </h6>
                            <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto">
                              <code>{issue.currentCode}</code>
                            </pre>
                          </div>

                          {/* Suggested Code */}
                          {issue.suggestedCode && (
                            <div>
                              <h6 className="text-xs font-semibold text-green-600 mb-2">
                                ✅ 개선된 코드
                              </h6>
                              <pre className="bg-green-900 text-green-100 p-3 rounded-lg text-xs overflow-x-auto">
                                <code>{issue.suggestedCode}</code>
                              </pre>
                            </div>
                          )}

                          {/* Clean Code Principle */}
                          {issue.principle && (
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r">
                              <h6 className="text-xs font-semibold text-blue-800 mb-1">
                                📖 Clean Code 원칙
                              </h6>
                              <p className="text-sm text-blue-700">
                                {issue.principle}
                              </p>
                            </div>
                          )}

                          {/* Resources */}
                          {issue.resources && issue.resources.length > 0 && (
                            <div>
                              <h6 className="text-xs font-semibold text-gray-600 mb-2">
                                📚 참고 자료
                              </h6>
                              <ul className="space-y-1">
                                {issue.resources.map((resource, idx) => (
                                  <li key={idx} className="text-sm text-blue-600 hover:text-blue-700">
                                    <a href="#" className="flex items-center gap-2">
                                      <span>🔗</span>
                                      {resource}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Apply Button */}
                          {issue.suggestedCode && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onApplySuggestion?.(issue.id);
                              }}
                              className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all"
                            >
                              ✨ 개선 사항 적용
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredIssues.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-3">🎉</div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">
                완벽한 코드입니다!
              </h4>
              <p className="text-sm text-gray-500">
                {filter === 'all'
                  ? '발견된 이슈가 없습니다.'
                  : `${severityConfig[filter as keyof typeof severityConfig].label} 레벨의 이슈가 없습니다.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * CodeMetrics - 코드 품질 메트릭
 */
export interface CodeMetricsProps {
  metrics: {
    complexity: number; // 순환 복잡도
    maintainability: number; // 유지보수성 (0-100)
    testCoverage: number; // 테스트 커버리지 (0-100)
    duplication: number; // 중복 코드 비율 (0-100)
    linesOfCode: number;
    comments: number;
  };
  className?: string;
}

export function CodeMetrics({ metrics, className = '' }: CodeMetricsProps) {
  const getComplexityLevel = (complexity: number) => {
    if (complexity <= 10) return { label: '낮음', color: 'text-green-600', emoji: '😊' };
    if (complexity <= 20) return { label: '보통', color: 'text-yellow-600', emoji: '😐' };
    return { label: '높음', color: 'text-red-600', emoji: '😰' };
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const complexityLevel = getComplexityLevel(metrics.complexity);

  return (
    <div className={`bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6 ${className}`}>
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>📊</span> 코드 품질 메트릭
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Complexity */}
        <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
          <div className="text-sm text-gray-600 mb-1">순환 복잡도</div>
          <div className={`text-3xl font-bold ${complexityLevel.color} flex items-center gap-2`}>
            {metrics.complexity}
            <span className="text-2xl">{complexityLevel.emoji}</span>
          </div>
          <div className={`text-xs ${complexityLevel.color} font-semibold`}>
            {complexityLevel.label}
          </div>
        </div>

        {/* Maintainability */}
        <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
          <div className="text-sm text-gray-600 mb-1">유지보수성</div>
          <div className={`text-3xl font-bold ${getScoreColor(metrics.maintainability)}`}>
            {metrics.maintainability}
          </div>
          <div className="text-xs text-gray-500">/ 100</div>
        </div>

        {/* Test Coverage */}
        <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
          <div className="text-sm text-gray-600 mb-1">테스트 커버리지</div>
          <div className={`text-3xl font-bold ${getScoreColor(metrics.testCoverage)}`}>
            {metrics.testCoverage}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className={`h-2 rounded-full ${
                metrics.testCoverage >= 80 ? 'bg-green-500' :
                metrics.testCoverage >= 60 ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
              style={{ width: `${metrics.testCoverage}%` }}
            />
          </div>
        </div>

        {/* Duplication */}
        <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
          <div className="text-sm text-gray-600 mb-1">중복 코드</div>
          <div className={`text-3xl font-bold ${
            metrics.duplication <= 5 ? 'text-green-600' :
            metrics.duplication <= 10 ? 'text-yellow-600' :
            'text-red-600'
          }`}>
            {metrics.duplication}%
          </div>
          <div className="text-xs text-gray-500">낮을수록 좋음</div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="mt-4 pt-4 border-t-2 border-gray-200 flex justify-around text-center">
        <div>
          <div className="text-2xl font-bold text-gray-800">{metrics.linesOfCode}</div>
          <div className="text-xs text-gray-500">코드 라인</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-800">{metrics.comments}</div>
          <div className="text-xs text-gray-500">주석 라인</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-800">
            {Math.round((metrics.comments / metrics.linesOfCode) * 100)}%
          </div>
          <div className="text-xs text-gray-500">주석 비율</div>
        </div>
      </div>
    </div>
  );
}
