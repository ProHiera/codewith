'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * HintPanel - 반짝이는 AI 힌트 패널
 * 
 * 학습 중 막힐 때 나타나는 반짝이는 힌트 패널
 * 사용자가 클릭하면 AI가 생성한 힌트를 단계별로 제공
 */

export interface Hint {
  id: string;
  level: 1 | 2 | 3; // 1: 가벼운 힌트, 2: 중간 힌트, 3: 거의 정답
  content: string;
  revealed?: boolean;
}

export interface HintPanelProps {
  hints: Hint[];
  onHintReveal?: (hintId: string, level: number) => void;
  className?: string;
  autoShow?: boolean;
  showDelay?: number;
}

export default function HintPanel({
  hints,
  onHintReveal,
  className = '',
  autoShow = false,
  showDelay = 3000,
}: HintPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [revealedHints, setRevealedHints] = useState<Set<string>>(new Set());
  const [isGlowing, setIsGlowing] = useState(true);

  // 자동으로 힌트 버튼 표시
  useEffect(() => {
    if (autoShow) {
      const timer = setTimeout(() => {
        setIsGlowing(true);
      }, showDelay);
      return () => clearTimeout(timer);
    }
  }, [autoShow, showDelay]);

  // 반짝임 효과
  useEffect(() => {
    if (!isGlowing) return;
    
    const interval = setInterval(() => {
      setIsGlowing(prev => !prev);
    }, 1500);

    return () => clearInterval(interval);
  }, [isGlowing]);

  const handleRevealHint = (hint: Hint) => {
    setRevealedHints(prev => new Set([...prev, hint.id]));
    onHintReveal?.(hint.id, hint.level);
  };

  const hintLevelConfig = {
    1: {
      emoji: '💡',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-300',
      label: '가벼운 힌트',
    },
    2: {
      emoji: '🔍',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-300',
      label: '중간 힌트',
    },
    3: {
      emoji: '🎯',
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-300',
      label: '거의 정답',
    },
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: 1, 
              rotate: 0,
              boxShadow: isGlowing 
                ? '0 0 30px rgba(251, 191, 36, 0.8), 0 0 60px rgba(251, 191, 36, 0.4)'
                : '0 10px 25px rgba(0, 0, 0, 0.2)',
            }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="relative w-16 h-16 bg-linear-to-br from-yellow-400 to-amber-500 rounded-full shadow-2xl flex items-center justify-center text-3xl cursor-pointer hover:from-yellow-500 hover:to-amber-600 transition-all"
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
          >
            💡
            
            {/* 반짝이는 링 */}
            {isGlowing && (
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-yellow-300"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            )}

            {/* 뱃지 */}
            {hints.length > 0 && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                {hints.length}
              </div>
            )}
          </motion.button>
        )}

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl p-6 w-96 max-h-[600px] overflow-hidden flex flex-col border-2 border-yellow-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-gray-100">
              <div className="flex items-center gap-3">
                <div className="text-3xl">✨</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">힌트 도우미</h3>
                  <p className="text-sm text-gray-500">막힐 때 도움을 받아보세요</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ✕
              </button>
            </div>

            {/* Hints List */}
            <div className="flex-1 overflow-y-auto space-y-3">
              {hints.map((hint, index) => {
                const config = hintLevelConfig[hint.level];
                const isRevealed = revealedHints.has(hint.id);

                return (
                  <motion.div
                    key={hint.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`border-2 ${config.border} rounded-lg overflow-hidden`}
                  >
                    {/* Hint Header */}
                    <div className={`${config.bg} px-4 py-2 flex items-center justify-between`}>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{config.emoji}</span>
                        <span className={`text-sm font-semibold ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                      {!isRevealed && (
                        <button
                          onClick={() => handleRevealHint(hint)}
                          className={`px-3 py-1 ${config.color} bg-white rounded-lg text-xs font-semibold hover:shadow-md transition-all`}
                        >
                          보기
                        </button>
                      )}
                    </div>

                    {/* Hint Content */}
                    <AnimatePresence>
                      {isRevealed && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-4 py-3 bg-white text-gray-700 text-sm leading-relaxed"
                        >
                          {hint.content}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}

              {hints.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-5xl mb-3">🎉</div>
                  <p className="text-sm">현재 사용 가능한 힌트가 없습니다!</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t-2 border-gray-100 text-center">
              <p className="text-xs text-gray-500">
                💡 힌트는 학습 점수에 영향을 주지 않습니다
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * InlineHint - 인라인 힌트 컴포넌트 (텍스트 내 삽입용)
 */
export function InlineHint({ children }: { children: React.ReactNode }) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <span className="inline-block">
      {!isRevealed ? (
        <button
          onClick={() => setIsRevealed(true)}
          className="px-2 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded text-xs font-semibold border border-yellow-300 transition-all"
        >
          💡 힌트 보기
        </button>
      ) : (
        <span className="px-2 py-1 bg-yellow-50 text-yellow-800 rounded text-sm border-l-4 border-yellow-400">
          {children}
        </span>
      )}
    </span>
  );
}
