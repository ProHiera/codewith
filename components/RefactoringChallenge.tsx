'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * RefactoringChallenge - 리팩토링 실습 챌린지
 * 
 * Bad Code를 Clean Code로 리팩토링하는 실습
 * 단계별 힌트 제공 및 정답 비교
 */

export interface RefactoringStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface RefactoringChallengeData {
  id: string;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: 'naming' | 'structure' | 'complexity' | 'solid' | 'patterns';
  timeLimit?: number; // seconds
  badCode: string;
  goodCode: string;
  explanation: string;
  steps: RefactoringStep[];
  hints: string[];
  principles: string[]; // Clean Code 원칙들
}

export interface RefactoringChallengeProps {
  challenge: RefactoringChallengeData;
  onComplete?: (timeTaken: number, hints: number) => void;
  onSkip?: () => void;
  className?: string;
}

export default function RefactoringChallenge({
  challenge,
  onComplete,
  onSkip,
  className = '',
}: RefactoringChallengeProps) {
  const [userCode, setUserCode] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const levelConfig = {
    beginner: { label: '초급', color: 'text-green-600', bg: 'bg-green-50', emoji: '🌱' },
    intermediate: { label: '중급', color: 'text-yellow-600', bg: 'bg-yellow-50', emoji: '🔥' },
    advanced: { label: '고급', color: 'text-red-600', bg: 'bg-red-50', emoji: '💎' },
  };

  const categoryLabels = {
    naming: '네이밍',
    structure: '구조 개선',
    complexity: '복잡도 감소',
    solid: 'SOLID 원칙',
    patterns: '디자인 패턴',
  };

  // Timer
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeElapsed(prev => {
        if (challenge.timeLimit && prev >= challenge.timeLimit) {
          setIsRunning(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, challenge.timeLimit]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRevealHint = () => {
    if (hintsRevealed < challenge.hints.length) {
      setHintsRevealed(prev => prev + 1);
    }
  };

  const handleComplete = () => {
    setIsRunning(false);
    setShowSolution(true);
    onComplete?.(timeElapsed, hintsRevealed);
  };

  const handleStepToggle = (stepId: string) => {
    setCompletedSteps(prev =>
      prev.includes(stepId)
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const progress = (completedSteps.length / challenge.steps.length) * 100;
  const config = levelConfig[challenge.level];

  return (
    <div className={`bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className={`${config.bg} px-6 py-4 border-b-2 border-gray-200`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{config.emoji}</span>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {challenge.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {categoryLabels[challenge.category]}
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-sm font-semibold ${config.color} mb-1`}>
              {config.label}
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {formatTime(timeElapsed)}
            </div>
            {challenge.timeLimit && (
              <div className="text-xs text-gray-500">
                / {formatTime(challenge.timeLimit)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="px-6 py-3 bg-gray-50 border-b-2 border-gray-200">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>진행도</span>
              <span>{completedSteps.length} / {challenge.steps.length} 단계</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-linear-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', stiffness: 100 }}
              />
            </div>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(progress)}%
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-2 gap-6">
        {/* Left: Bad Code & Steps */}
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span>❌</span> 개선이 필요한 코드
            </h4>
            <pre className="bg-red-50 border-2 border-red-300 text-red-900 p-4 rounded-xl text-sm overflow-x-auto max-h-64">
              <code>{challenge.badCode}</code>
            </pre>
          </div>

          {/* Refactoring Steps */}
          <div>
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>📋</span> 리팩토링 단계
            </h4>
            <div className="space-y-2">
              {challenge.steps.map((step, index) => {
                const isCompleted = completedSteps.includes(step.id);
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      isCompleted
                        ? 'bg-green-50 border-green-300'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleStepToggle(step.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                        isCompleted
                          ? 'bg-green-500 border-green-600 text-white'
                          : 'bg-white border-gray-300 text-gray-400'
                      }`}>
                        {isCompleted ? '✓' : index + 1}
                      </div>
                      <div className="flex-1">
                        <h5 className={`font-semibold text-sm ${
                          isCompleted ? 'text-green-700 line-through' : 'text-gray-800'
                        }`}>
                          {step.title}
                        </h5>
                        <p className="text-xs text-gray-600 mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: User Code & Hints */}
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span>✍️</span> 리팩토링된 코드 작성
            </h4>
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              placeholder="여기에 개선된 코드를 작성하세요..."
              className="w-full h-64 p-4 bg-blue-50 border-2 border-blue-300 rounded-xl text-sm font-mono resize-none focus:outline-none focus:border-blue-500"
              disabled={showSolution}
            />
          </div>

          {/* Hints */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-gray-800 flex items-center gap-2">
                <span>💡</span> 힌트
              </h4>
              <button
                onClick={handleRevealHint}
                disabled={hintsRevealed >= challenge.hints.length}
                className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white text-sm rounded-lg font-semibold transition-all"
              >
                힌트 보기 ({hintsRevealed}/{challenge.hints.length})
              </button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              <AnimatePresence>
                {challenge.hints.slice(0, hintsRevealed).map((hint, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-yellow-600 font-bold">#{index + 1}</span>
                      <p className="text-sm text-gray-700">{hint}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Principles */}
          <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-4">
            <h5 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
              <span>📖</span> 적용할 Clean Code 원칙
            </h5>
            <ul className="space-y-1">
              {challenge.principles.map((principle, index) => (
                <li key={index} className="text-sm text-purple-700 flex items-center gap-2">
                  <span className="text-purple-500">•</span>
                  {principle}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 bg-gray-50 border-t-2 border-gray-200 flex gap-3">
        <button
          onClick={onSkip}
          className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-semibold transition-all"
        >
          건너뛰기
        </button>
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all"
        >
          {showSolution ? '정답 숨기기' : '정답 보기'}
        </button>
        <button
          onClick={handleComplete}
          disabled={showSolution}
          className="flex-1 px-6 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-lg font-semibold transition-all"
        >
          ✅ 완료하기
        </button>
      </div>

      {/* Solution Panel */}
      <AnimatePresence>
        {showSolution && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t-2 border-gray-200 bg-green-50"
          >
            <div className="p-6">
              <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2 text-lg">
                <span>✅</span> 정답 코드
              </h4>
              <pre className="bg-green-900 text-green-100 p-4 rounded-xl text-sm overflow-x-auto mb-4">
                <code>{challenge.goodCode}</code>
              </pre>
              <div className="bg-white border-2 border-green-300 rounded-xl p-4">
                <h5 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <span>💬</span> 해설
                </h5>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {challenge.explanation}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
