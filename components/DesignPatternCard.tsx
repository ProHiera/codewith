'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * DesignPatternCard - 디자인 패턴 학습 카드
 * 
 * GOF 디자인 패턴, SOLID 원칙 등을 
 * 인터랙티브하게 학습
 */

export interface DesignPatternData {
  id: string;
  name: string;
  category: 'creational' | 'structural' | 'behavioral' | 'solid';
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
  description: string;
  problem: string; // 어떤 문제를 해결하나
  solution: string; // 어떻게 해결하나
  realWorldExample: string;
  codeExample: {
    before: string;
    after: string;
  };
  pros: string[];
  cons: string[];
  relatedPatterns: string[];
  useCases: string[];
}

export interface DesignPatternCardProps {
  pattern: DesignPatternData;
  onMastered?: () => void;
  className?: string;
}

export default function DesignPatternCard({
  pattern,
  onMastered,
  className = '',
}: DesignPatternCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCodeExample, setShowCodeExample] = useState(false);
  const [activeTab, setActiveTab] = useState<'problem' | 'solution' | 'example'>('problem');

  const categoryConfig = {
    creational: {
      label: '생성 패턴',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      emoji: '🏗️',
    },
    structural: {
      label: '구조 패턴',
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-300',
      emoji: '🏛️',
    },
    behavioral: {
      label: '행위 패턴',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-300',
      emoji: '🎭',
    },
    solid: {
      label: 'SOLID 원칙',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-300',
      emoji: '💎',
    },
  };

  const difficultyConfig = {
    easy: { label: '쉬움', color: 'text-green-600', emoji: '⭐' },
    medium: { label: '보통', color: 'text-yellow-600', emoji: '⭐⭐' },
    hard: { label: '어려움', color: 'text-red-600', emoji: '⭐⭐⭐' },
  };

  const config = categoryConfig[pattern.category];
  const difficulty = difficultyConfig[pattern.difficulty];

  return (
    <div className={`perspective-1000 ${className}`}>
      <motion.div
        className="relative w-full h-[600px]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <div
          className={`absolute inset-0 backface-hidden bg-white rounded-2xl shadow-xl border-4 ${config.border} overflow-hidden`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Header */}
          <div className={`${config.bg} px-6 py-4 border-b-4 ${config.border}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{pattern.icon}</span>
                <div>
                  <h3 className={`text-2xl font-bold ${config.color}`}>
                    {pattern.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {config.label}
                  </p>
                </div>
              </div>
              <div className={`text-right ${difficulty.color}`}>
                <div className="text-2xl mb-1">{difficulty.emoji}</div>
                <div className="text-xs font-semibold">{difficulty.label}</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b-2 border-gray-200 bg-gray-50">
            {[
              { id: 'problem', label: '문제', emoji: '❓' },
              { id: 'solution', label: '해결', emoji: '💡' },
              { id: 'example', label: '예시', emoji: '📝' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 py-3 font-semibold transition-all ${
                  activeTab === tab.id
                    ? `${config.color} border-b-4 ${config.border} bg-white`
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto h-[380px]">
            <AnimatePresence mode="wait">
              {activeTab === 'problem' && (
                <motion.div
                  key="problem"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <span>📋</span> 패턴 설명
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {pattern.description}
                    </p>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                    <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                      <span>⚠️</span> 해결하려는 문제
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {pattern.problem}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <span>🎯</span> 사용 사례
                    </h4>
                    <ul className="space-y-2">
                      {pattern.useCases.map((useCase, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className={config.color}>✓</span>
                          <span className="text-gray-700">{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === 'solution' && (
                <motion.div
                  key="solution"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
                    <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                      <span>💡</span> 해결 방법
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {pattern.solution}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
                      <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                        <span>👍</span> 장점
                      </h4>
                      <ul className="space-y-2">
                        {pattern.pros.map((pro, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">+</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-4">
                      <h4 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                        <span>👎</span> 단점
                      </h4>
                      <ul className="space-y-2">
                        {pattern.cons.map((con, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-orange-500 mt-0.5">-</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {pattern.relatedPatterns.length > 0 && (
                    <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-4">
                      <h4 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                        <span>🔗</span> 관련 패턴
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {pattern.relatedPatterns.map((related, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-semibold"
                          >
                            {related}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'example' && (
                <motion.div
                  key="example"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                    <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                      <span>🌍</span> 실제 사례
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {pattern.realWorldExample}
                    </p>
                  </div>

                  <button
                    onClick={() => setShowCodeExample(!showCodeExample)}
                    className={`w-full px-4 py-3 ${config.bg} ${config.border} border-2 rounded-xl font-semibold ${config.color} hover:shadow-lg transition-all`}
                  >
                    {showCodeExample ? '코드 예제 숨기기' : '코드 예제 보기'} 👨‍💻
                  </button>

                  <AnimatePresence>
                    {showCodeExample && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-3"
                      >
                        <div>
                          <h5 className="text-sm font-semibold text-gray-600 mb-2">
                            ❌ Before (문제가 있는 코드)
                          </h5>
                          <pre className="bg-red-900 text-red-100 p-3 rounded-lg text-xs overflow-x-auto">
                            <code>{pattern.codeExample.before}</code>
                          </pre>
                        </div>

                        <div>
                          <h5 className="text-sm font-semibold text-gray-600 mb-2">
                            ✅ After (패턴 적용 후)
                          </h5>
                          <pre className="bg-green-900 text-green-100 p-3 rounded-lg text-xs overflow-x-auto">
                            <code>{pattern.codeExample.after}</code>
                          </pre>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gray-50 border-t-2 border-gray-200 flex gap-3">
            <button
              onClick={() => setIsFlipped(true)}
              className={`flex-1 px-6 py-2 ${config.bg} ${config.border} border-2 ${config.color} rounded-lg font-semibold hover:shadow-lg transition-all`}
            >
              뒤집기 🔄
            </button>
            <button
              onClick={onMastered}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all"
            >
              마스터 ✅
            </button>
          </div>
        </div>

        {/* Back Side - Quick Reference */}
        <div
          className={`absolute inset-0 backface-hidden bg-linear-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl border-4 border-indigo-400 overflow-hidden`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="p-6 h-full flex flex-col text-white">
            <div className="text-center mb-6">
              <span className="text-6xl mb-3 block">{pattern.icon}</span>
              <h3 className="text-3xl font-bold mb-2">{pattern.name}</h3>
              <p className="text-indigo-200">{config.label}</p>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <h4 className="font-bold text-yellow-300 mb-2">⚡ 핵심 개념</h4>
                <p className="text-sm leading-relaxed">{pattern.description}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <h4 className="font-bold text-yellow-300 mb-2">🎯 언제 사용?</h4>
                <p className="text-sm leading-relaxed">{pattern.problem}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <h4 className="font-bold text-yellow-300 mb-2">💡 어떻게?</h4>
                <p className="text-sm leading-relaxed">{pattern.solution}</p>
              </div>

              {pattern.relatedPatterns.length > 0 && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <h4 className="font-bold text-yellow-300 mb-2">🔗 관련 패턴</h4>
                  <div className="flex flex-wrap gap-2">
                    {pattern.relatedPatterns.map((related, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/20 rounded-full text-xs"
                      >
                        {related}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsFlipped(false)}
              className="w-full mt-6 px-6 py-3 bg-white text-indigo-600 rounded-lg font-bold hover:bg-indigo-50 transition-all"
            >
              다시 뒤집기 🔄
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * PatternCatalog - 패턴 카탈로그 그리드
 */
export interface PatternCatalogProps {
  patterns: DesignPatternData[];
  onSelectPattern?: (pattern: DesignPatternData) => void;
  className?: string;
}

export function PatternCatalog({
  patterns,
  onSelectPattern,
  className = '',
}: PatternCatalogProps) {
  const [filter, setFilter] = useState<'all' | 'creational' | 'structural' | 'behavioral' | 'solid'>('all');

  const categoryConfig = {
    creational: { label: '생성 패턴', emoji: '🏗️', color: 'bg-blue-500' },
    structural: { label: '구조 패턴', emoji: '🏛️', color: 'bg-green-500' },
    behavioral: { label: '행위 패턴', emoji: '🎭', color: 'bg-purple-500' },
    solid: { label: 'SOLID 원칙', emoji: '💎', color: 'bg-yellow-500' },
  };

  const filteredPatterns = filter === 'all'
    ? patterns
    : patterns.filter(p => p.category === filter);

  return (
    <div className={className}>
      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
            filter === 'all'
              ? 'bg-gray-800 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          전체 ({patterns.length})
        </button>
        {Object.entries(categoryConfig).map(([key, config]) => {
          const count = patterns.filter(p => p.category === key).length;
          return (
            <button
              key={key}
              onClick={() => setFilter(key as typeof filter)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
                filter === key
                  ? `${config.color} text-white`
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {config.emoji} {config.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Pattern Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatterns.map((pattern) => {
          const config = categoryConfig[pattern.category];
          return (
            <motion.div
              key={pattern.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden cursor-pointer hover:shadow-xl hover:scale-105 transition-all"
              onClick={() => onSelectPattern?.(pattern)}
            >
              <div className={`${config.color} px-4 py-3 text-white`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{pattern.icon}</span>
                  <div>
                    <h4 className="font-bold">{pattern.name}</h4>
                    <p className="text-xs opacity-90">{config.label}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 line-clamp-3">
                  {pattern.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
