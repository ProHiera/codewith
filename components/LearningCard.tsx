'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LearningCard - 암기/참고 영역 색상 구분 학습 카드
 * 
 * 외워야 할 부분은 노란색/주황색 하이라이트
 * 참고용 정보는 회색/파란색 톤
 * 카드 뒤집기 애니메이션으로 "암기 확인" 지원
 */

export type LearningCardType = 'memorize' | 'reference' | 'practice';

export interface LearningCardProps {
  id: string;
  title: string;
  type: LearningCardType;
  frontContent: React.ReactNode;
  backContent?: React.ReactNode;
  tags?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  onFlip?: (flipped: boolean) => void;
  onMastered?: () => void;
  className?: string;
}

export default function LearningCard({
  id,
  title,
  type,
  frontContent,
  backContent,
  tags = [],
  difficulty = 'medium',
  onFlip,
  onMastered,
  className = '',
}: LearningCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMastered, setIsMastered] = useState(false);

  const handleFlip = () => {
    const newFlipped = !isFlipped;
    setIsFlipped(newFlipped);
    onFlip?.(newFlipped);
  };

  const handleMastered = () => {
    setIsMastered(true);
    onMastered?.();
  };

  // 타입별 스타일링
  const typeStyles = {
    memorize: {
      border: 'border-yellow-400',
      bg: 'bg-gradient-to-br from-yellow-50 to-orange-50',
      badge: 'bg-yellow-500 text-white',
      glow: 'shadow-yellow-200',
      icon: '🧠',
    },
    reference: {
      border: 'border-blue-300',
      bg: 'bg-gradient-to-br from-blue-50 to-slate-50',
      badge: 'bg-blue-500 text-white',
      glow: 'shadow-blue-200',
      icon: '📚',
    },
    practice: {
      border: 'border-purple-300',
      bg: 'bg-gradient-to-br from-purple-50 to-pink-50',
      badge: 'bg-purple-500 text-white',
      glow: 'shadow-purple-200',
      icon: '💪',
    },
  };

  const difficultyColors = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-amber-100 text-amber-700',
    hard: 'bg-red-100 text-red-700',
  };

  const style = typeStyles[type];

  return (
    <motion.div
      className={`relative perspective-1000 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="relative w-full h-full transition-transform duration-500 preserve-3d"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front Side */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-2xl border-2 ${style.border} ${style.bg} ${style.glow} shadow-xl p-6`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{style.icon}</span>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                <div className="flex gap-2 mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${style.badge} font-semibold`}>
                    {type === 'memorize' ? '암기' : type === 'reference' ? '참고' : '연습'}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[difficulty]} font-semibold`}>
                    {difficulty === 'easy' ? '쉬움' : difficulty === 'medium' ? '보통' : '어려움'}
                  </span>
                </div>
              </div>
            </div>

            {isMastered && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-3xl"
              >
                ✅
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="text-gray-700 leading-relaxed mb-6">
            {frontContent}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-white/80 text-gray-600 rounded-full border border-gray-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-auto">
            {backContent && (
              <button
                onClick={handleFlip}
                className="flex-1 px-4 py-2 bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 transition-all hover:shadow-md"
              >
                🔄 뒤집기
              </button>
            )}
            {type === 'memorize' && !isMastered && (
              <button
                onClick={handleMastered}
                className="px-4 py-2 bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-semibold transition-all hover:shadow-lg"
              >
                ✨ 외웠어요!
              </button>
            )}
          </div>
        </div>

        {/* Back Side */}
        {backContent && (
          <div
            className={`absolute w-full h-full backface-hidden rounded-2xl border-2 ${style.border} bg-white shadow-xl p-6 rotate-y-180`}
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">💡 정답 / 설명</h3>
              <button
                onClick={handleFlip}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Back Content */}
            <div className="text-gray-700 leading-relaxed">
              {backContent}
            </div>

            {/* Back Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleFlip}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-gray-700 transition-all"
              >
                ← 앞면으로
              </button>
              {type === 'memorize' && !isMastered && (
                <button
                  onClick={handleMastered}
                  className="px-4 py-2 bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-semibold transition-all hover:shadow-lg"
                >
                  ✨ 외웠어요!
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/**
 * MemorizeHighlight - 암기 영역 하이라이트 컴포넌트
 */
export function MemorizeHighlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-yellow-200 px-2 py-1 rounded font-semibold text-gray-900 border-b-2 border-yellow-500">
      {children}
    </span>
  );
}

/**
 * ReferenceNote - 참고용 노트 컴포넌트
 */
export function ReferenceNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r text-sm text-gray-700">
      <span className="text-blue-600 font-semibold mr-2">📝 참고:</span>
      {children}
    </div>
  );
}
