'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * HooksGameCard - React Hooks 드래그 앤 드롭 학습 게임
 * 
 * useState, useEffect 등 Hooks를 올바른 위치에 배치하는 게임
 * 드래그 앤 드롭 인터랙션으로 재미있게 학습
 */

export interface HookItem {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
}

export interface DropZone {
  id: string;
  label: string;
  acceptedHooks: string[]; // hook names
  filled?: HookItem;
}

export interface HooksGameCardProps {
  availableHooks: HookItem[];
  dropZones: DropZone[];
  onComplete: (score: number) => void;
  className?: string;
}

export default function HooksGameCard({
  availableHooks,
  dropZones,
  onComplete,
  className = '',
}: HooksGameCardProps) {
  const [zones, setZones] = useState<DropZone[]>(dropZones);
  const [remainingHooks, setRemainingHooks] = useState<HookItem[]>(availableHooks);
  const [draggedHook, setDraggedHook] = useState<HookItem | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);

  const handleDragStart = (hook: HookItem) => {
    setDraggedHook(hook);
  };

  const handleDragEnd = () => {
    setDraggedHook(null);
  };

  const handleDrop = (zoneId: string) => {
    if (!draggedHook) return;

    const zone = zones.find(z => z.id === zoneId);
    if (!zone) return;

    // 이미 채워진 경우 무시
    if (zone.filled) return;

    // 올바른 Hook인지 확인
    const isCorrect = zone.acceptedHooks.includes(draggedHook.name);

    // Zone 업데이트
    const newZones = zones.map(z =>
      z.id === zoneId ? { ...z, filled: draggedHook } : z
    );
    setZones(newZones);

    // 남은 Hooks 업데이트
    setRemainingHooks(prev => prev.filter(h => h.id !== draggedHook.id));

    // 점수 계산
    if (isCorrect) {
      setScore(prev => prev + 10);
    }

    // 완료 체크
    const allFilled = newZones.every(z => z.filled);
    if (allFilled) {
      const correctCount = newZones.filter(z => 
        z.acceptedHooks.includes(z.filled!.name)
      ).length;
      const finalScore = Math.round((correctCount / newZones.length) * 100);
      setScore(finalScore);
      setIsComplete(true);
      setTimeout(() => onComplete(finalScore), 1000);
    }

    setDraggedHook(null);
  };

  const handleReset = () => {
    setZones(dropZones);
    setRemainingHooks(availableHooks);
    setDraggedHook(null);
    setIsComplete(false);
    setScore(0);
  };

  return (
    <div className={`bg-linear-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 shadow-xl border-2 border-indigo-200 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">
            ⚛️ React Hooks 배치 게임
          </h3>
          <p className="text-sm text-gray-600">
            올바른 위치에 Hook을 드래그하세요
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-indigo-600">{score}점</div>
          <div className="text-xs text-gray-500">현재 점수</div>
        </div>
      </div>

      {/* Game Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Available Hooks */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span>📦</span> 사용 가능한 Hooks
          </h4>
          <div className="space-y-2">
            <AnimatePresence>
              {remainingHooks.map((hook) => (
                <motion.div
                  key={hook.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, x: 100 }}
                  drag
                  dragSnapToOrigin
                  onDragStart={() => handleDragStart(hook)}
                  onDragEnd={handleDragEnd}
                  whileHover={{ scale: 1.05 }}
                  whileDrag={{ scale: 1.1, rotate: 5 }}
                  className={`${hook.color} rounded-xl p-4 cursor-grab active:cursor-grabbing shadow-md hover:shadow-lg transition-shadow`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{hook.emoji}</span>
                    <div className="flex-1">
                      <div className="font-bold text-gray-800">{hook.name}</div>
                      <div className="text-xs text-gray-600">{hook.description}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Drop Zones */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span>🎯</span> 드롭 영역
          </h4>
          <div className="space-y-3">
            {zones.map((zone) => {
              const isFilled = !!zone.filled;
              const isCorrect = isFilled && zone.acceptedHooks.includes(zone.filled!.name);

              return (
                <motion.div
                  key={zone.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(zone.id)}
                  className={`rounded-xl p-4 border-2 border-dashed transition-all min-h-20 ${
                    isFilled
                      ? isCorrect
                        ? 'border-green-400 bg-green-50'
                        : 'border-red-400 bg-red-50'
                      : 'border-gray-300 bg-white hover:border-indigo-400 hover:bg-indigo-50'
                  }`}
                >
                  <div className="text-xs font-semibold text-gray-600 mb-2">
                    {zone.label}
                  </div>
                  
                  {isFilled ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{zone.filled!.emoji}</span>
                        <span className="font-bold text-gray-800">{zone.filled!.name}</span>
                      </div>
                      {isCorrect ? (
                        <span className="text-green-600 text-xl">✓</span>
                      ) : (
                        <span className="text-red-600 text-xl">✗</span>
                      )}
                    </motion.div>
                  ) : (
                    <div className="text-gray-400 text-sm text-center py-2">
                      여기에 드롭하세요
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Complete Message */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`rounded-2xl p-6 mb-4 ${
              score >= 80
                ? 'bg-green-100 border-2 border-green-400'
                : score >= 60
                ? 'bg-yellow-100 border-2 border-yellow-400'
                : 'bg-red-100 border-2 border-red-400'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-5xl">
                {score >= 80 ? '🎉' : score >= 60 ? '👍' : '💪'}
              </span>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-800 mb-1">
                  {score >= 80 ? '완벽합니다!' : score >= 60 ? '잘했어요!' : '다시 도전해보세요!'}
                </h4>
                <p className="text-sm text-gray-700">
                  {score >= 80
                    ? 'React Hooks를 정확히 이해하고 있습니다!'
                    : score >= 60
                    ? '조금만 더 연습하면 완벽해질 거예요!'
                    : 'Hooks 개념을 다시 복습해보세요.'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleReset}
          className="flex-1 px-6 py-3 bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 transition-all"
        >
          🔄 다시 시작
        </button>
        {isComplete && (
          <button
            onClick={() => onComplete(score)}
            className="flex-1 px-6 py-3 bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl font-semibold transition-all shadow-lg"
          >
            다음 게임 →
          </button>
        )}
      </div>
    </div>
  );
}
