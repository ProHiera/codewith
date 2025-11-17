'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ProgressAnimation - 학습 진행 애니메이션
 * 
 * 레벨업, 배지 획득, 연속 학습 등 다양한 진행 상황을 시각화
 */

export type ProgressType = 'level-up' | 'badge' | 'streak' | 'milestone';

export interface ProgressAnimationProps {
  type: ProgressType;
  value: number;
  maxValue: number;
  label: string;
  icon?: string;
  color?: string;
  showPercentage?: boolean;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ProgressAnimation({
  value,
  maxValue,
  label,
  icon,
  color = 'indigo',
  showPercentage = true,
  animated = true,
  size = 'md',
  className = '',
}: ProgressAnimationProps) {
  const [displayValue, setDisplayValue] = useState(animated ? 0 : value);
  const percentage = Math.min((value / maxValue) * 100, 100);

  useEffect(() => {
    if (!animated) {
      return;
    }

    const easeOutCubic = (x: number): number => {
      return 1 - Math.pow(1 - x, 3);
    };

    const start = 0;
    const duration = 1000;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const current = Math.floor(start + (value - start) * easeOutCubic(progress));
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, animated]);

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const colorClasses = {
    indigo: 'bg-indigo-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    pink: 'bg-pink-500',
    blue: 'bg-blue-500',
  };

  const glowColors = {
    indigo: 'shadow-indigo-300',
    green: 'shadow-green-300',
    purple: 'shadow-purple-300',
    orange: 'shadow-orange-300',
    pink: 'shadow-pink-300',
    blue: 'shadow-blue-300',
  };

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon && <span className="text-xl">{icon}</span>}
          <span className="text-sm font-semibold text-gray-700">{label}</span>
        </div>
        {showPercentage && (
          <span className="text-sm font-bold text-gray-600">
            {displayValue} / {maxValue}
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className={`relative w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          className={`${colorClasses[color as keyof typeof colorClasses]} h-full rounded-full ${glowColors[color as keyof typeof glowColors]} shadow-lg`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: animated ? 1 : 0, ease: 'easeOut' }}
        />

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-30"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      </div>

      {/* Percentage Text */}
      {showPercentage && (
        <div className="text-right mt-1">
          <span className="text-xs text-gray-500">{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  );
}

/**
 * LevelUpCard - 레벨업 축하 카드
 */
export interface LevelUpCardProps {
  level: number;
  onClose: () => void;
  rewards?: string[];
}

export function LevelUpCard({ level, onClose, rewards = [] }: LevelUpCardProps) {
  const [confettiPositions] = useState(() =>
    [...Array(20)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
  );

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 180 }}
      className="bg-white rounded-3xl shadow-2xl p-8 max-w-md border-4 border-yellow-400"
    >
      {/* Confetti effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confettiPositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            initial={{
              x: '50%',
              y: '50%',
              opacity: 1,
            }}
            animate={{
              x: `${pos.x}%`,
              y: `${pos.y}%`,
              opacity: 0,
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="text-8xl mb-4"
        >
          🎉
        </motion.div>

        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          레벨 업!
        </h2>
        
        <div className="text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-500 mb-4">
          Level {level}
        </div>

        <p className="text-gray-600 mb-6">
          축하합니다! 새로운 레벨에 도달했습니다
        </p>

        {/* Rewards */}
        {rewards.length > 0 && (
          <div className="bg-yellow-50 rounded-2xl p-4 mb-6 border-2 border-yellow-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">🎁 보상</h3>
            <div className="space-y-2">
              {rewards.map((reward, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-sm text-gray-700"
                >
                  ✨ {reward}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-linear-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg"
        >
          계속하기
        </button>
      </div>
    </motion.div>
  );
}

/**
 * BadgeUnlock - 배지 획득 애니메이션
 */
export interface BadgeUnlockProps {
  badge: {
    name: string;
    emoji: string;
    description: string;
  };
  onClose: () => void;
}

export function BadgeUnlock({ badge, onClose }: BadgeUnlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm border-2 border-purple-300"
    >
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="text-7xl mb-4"
        >
          {badge.emoji}
        </motion.div>

        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          배지 획득!
        </h3>

        <p className="text-lg font-semibold text-purple-600 mb-3">
          {badge.name}
        </p>

        <p className="text-sm text-gray-600 mb-6">
          {badge.description}
        </p>

        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold transition-all shadow-lg"
        >
          확인
        </button>
      </div>
    </motion.div>
  );
}
