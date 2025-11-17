'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * FocusMode - ADHD 친화적 집중 학습 모드
 * 
 * 5-10분 마이크로 학습 세션:
 * - 짧은 시간 집중 (뽀모도로)
 * - 타이머 & 진행도 시각화
 * - 세션 종료 후 즉시 피드백
 * - 집중력 통계 추적
 */

export interface FocusModeProps {
  duration?: number; // 분 단위
  onComplete?: (stats: SessionStats) => void;
  className?: string;
}

export interface SessionStats {
  cardsReviewed: number;
  accuracy: number; // 0-100
  focusScore: number; // 0-100
  duration: number; // 초 단위
}

export default function FocusMode({
  duration = 15,
  onComplete,
  className = '',
}: FocusModeProps) {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration * 60); // 초 단위
  const [cardsReviewed, setCardsReviewed] = useState(0);

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    setTimeLeft(duration * 60);
    setCardsReviewed(0);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(duration * 60);
  };

  const handleComplete = useCallback(() => {
    setIsActive(false);
    const stats: SessionStats = {
      cardsReviewed,
      accuracy: 85, // TODO: 실제 정답률 계산
      focusScore: 92, // TODO: 집중도 점수 계산
      duration: duration * 60 - timeLeft,
    };
    onComplete?.(stats);
  }, [cardsReviewed, duration, timeLeft, onComplete]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, timeLeft, handleComplete]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressColor = (): string => {
    if (progress < 30) return 'from-green-500 to-green-400';
    if (progress < 70) return 'from-yellow-500 to-yellow-400';
    return 'from-red-500 to-red-400';
  };

  if (!isActive) {
    return (
      <div className={`${className}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-linear-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-3xl p-8 text-center shadow-xl"
        >
          <div className="text-7xl mb-4">🎯</div>
          <h3 className="text-3xl font-bold text-gray-800 mb-3">
            집중 학습 모드
          </h3>
          <p className="text-gray-600 mb-6">
            짧고 강렬하게! {duration}분 동안 집중해보세요.
          </p>

          {/* 시간 선택 버튼들 */}
          <div className="flex gap-3 justify-center mb-6">
            {[5, 10, 15, 25].map((mins) => (
              <button
                key={mins}
                onClick={() => {
                  /* TODO: duration 변경 */
                }}
                className={`px-5 py-3 rounded-xl font-semibold transition-all ${
                  duration === mins
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {mins}분
              </button>
            ))}
          </div>

          <button
            onClick={handleStart}
            className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold rounded-2xl shadow-xl transition-all transform hover:scale-105"
          >
            🚀 시작하기
          </button>

          {/* ADHD 친화적 팁 */}
          <div className="mt-6 bg-white rounded-2xl p-4">
            <h4 className="font-bold text-gray-800 mb-2">💡 집중 팁</h4>
            <ul className="text-sm text-gray-600 text-left space-y-1">
              <li>• 휴대폰은 멀리 두세요</li>
              <li>• 물 한 잔 준비하세요</li>
              <li>• 타이머가 울릴 때까지만 집중!</li>
              <li>• 완벽하지 않아도 괜찮아요</li>
            </ul>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-linear-to-br from-purple-500 to-pink-500 rounded-3xl p-8 text-white shadow-2xl"
      >
        {/* 타이머 */}
        <div className="text-center mb-6">
          <div className="text-8xl font-bold mb-2">{formatTime(timeLeft)}</div>
          <div className="text-purple-100">남은 시간</div>
        </div>

        {/* 진행도 바 */}
        <div className="mb-6">
          <div className="h-4 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-linear-to-r ${getProgressColor()}`}
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between text-sm text-purple-100 mt-2">
            <span>{Math.round(progress)}% 완료</span>
            <span>{cardsReviewed}개 복습함</span>
          </div>
        </div>

        {/* 컨트롤 버튼 */}
        <div className="flex gap-3 justify-center mb-6">
          <button
            onClick={handlePause}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl font-semibold transition-all"
          >
            {isPaused ? '▶️ 계속' : '⏸️ 일시정지'}
          </button>
          <button
            onClick={handleStop}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl font-semibold transition-all"
          >
            ⏹️ 중단
          </button>
        </div>

        {/* 격려 메시지 */}
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="text-center text-lg font-semibold"
        >
          {timeLeft > duration * 60 * 0.7
            ? '🔥 좋아요! 집중하고 있어요!'
            : timeLeft > duration * 60 * 0.3
              ? '✨ 잘하고 있어요! 조금만 더!'
              : '🎉 거의 다 왔어요! 파이팅!'}
        </motion.div>

        {/* 집중 유지 팁 */}
        {isPaused && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-white/10 rounded-xl p-3 text-center text-sm"
          >
            잠깐 쉬어도 괜찮아요. 준비되면 다시 시작하세요! 💪
          </motion.div>
        )}
      </motion.div>

      {/* 학습 카드 영역 (여기에 실제 복습 카드가 표시됨) */}
      <div className="mt-6 bg-white border-2 border-gray-200 rounded-2xl p-6">
        <div className="text-center text-gray-500">
          여기에 복습 카드가 표시됩니다
          <br />
          (LearningCard 컴포넌트 통합 필요)
        </div>
      </div>
    </div>
  );
}
