'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * RoutineManager - 학습 루틴 관리 & 알림 시스템
 * 
 * ADHD 친화적 학습 루틴 관리:
 * - 매일 알림으로 학습 습관 형성
 * - 연속 학습 일수 (Streak) 추적
 * - 짧고 부담 없는 목표 설정
 * - 놓쳤을 때 부담 없이 다시 시작
 */

export interface RoutineSettings {
  dailyGoal: number; // 하루 복습 목표 개수
  reminderTime: string; // HH:MM 형식
  enableNotifications: boolean;
  studyDuration: number; // 분 단위
}

export interface RoutineStats {
  currentStreak: number;
  longestStreak: number;
  totalStudyDays: number;
  lastStudyDate?: Date;
}

export interface RoutineManagerProps {
  userId: string;
  onSettingsChange?: (settings: RoutineSettings) => void;
  className?: string;
}

export default function RoutineManager({
  userId,
  onSettingsChange,
  className = '',
}: RoutineManagerProps) {
  const [settings, setSettings] = useState<RoutineSettings>({
    dailyGoal: 5,
    reminderTime: '20:00',
    enableNotifications: false,
    studyDuration: 15,
  });

  const [stats, setStats] = useState<RoutineStats>({
    currentStreak: 3,
    longestStreak: 7,
    totalStudyDays: 24,
    lastStudyDate: new Date(),
  });

  const [showNotificationPermission] =
    useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Future enhancement: Load routine data from API
  }, []);

  const handleEnableNotifications = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const newSettings = { ...settings, enableNotifications: true };
        setSettings(newSettings);
        onSettingsChange?.(newSettings);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      }
    } else {
      alert('이 브라우저는 알림을 지원하지 않습니다.');
    }
  };

  const handleSettingChange = (key: keyof RoutineSettings, value: unknown) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  const getStreakEmoji = (streak: number): string => {
    if (streak >= 30) return '🏆';
    if (streak >= 14) return '⭐';
    if (streak >= 7) return '🔥';
    if (streak >= 3) return '✨';
    return '🌱';
  };

  const scheduleNotification = useCallback(() => {
    if (!settings.enableNotifications || !('Notification' in window)) {
      return;
    }

    const now = new Date();
    const [hours, minutes] = settings.reminderTime.split(':').map(Number);
    const scheduledTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );

    if (scheduledTime < now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const timeUntilNotification = scheduledTime.getTime() - now.getTime();

    setTimeout(() => {
      new Notification('📚 학습 시간이에요!', {
        body: `오늘의 목표: ${settings.dailyGoal}개 복습하기. 5분만 투자해보세요! 🚀`,
        icon: '/icon-192.png',
      });
    }, timeUntilNotification);
  }, [settings]);

  useEffect(() => {
    if (settings.enableNotifications) {
      scheduleNotification();
    }
  }, [settings.enableNotifications, settings.reminderTime, scheduleNotification]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 성공 메시지 */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-500 text-white rounded-2xl p-4 text-center font-semibold shadow-xl"
          >
            ✅ 알림이 활성화되었습니다!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Streak 카드 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-linear-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-xl"
      >
        <div className="text-center">
          <div className="text-7xl mb-3">
            {getStreakEmoji(stats.currentStreak)}
          </div>
          <h3 className="text-4xl font-bold mb-2">{stats.currentStreak}일</h3>
          <p className="text-orange-100 mb-4">연속 학습 중!</p>

          <div className="flex gap-4 justify-center text-sm">
            <div className="bg-white/20 rounded-xl px-4 py-2">
              <div className="font-bold text-2xl">{stats.longestStreak}</div>
              <div className="text-orange-100">최장 기록</div>
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-2">
              <div className="font-bold text-2xl">{stats.totalStudyDays}</div>
              <div className="text-orange-100">총 학습일</div>
            </div>
          </div>
        </div>

        {/* 격려 메시지 */}
        <div className="mt-4 bg-white/10 rounded-xl p-3 text-center text-sm">
          {stats.currentStreak >= 7
            ? '🎉 일주일 연속! 정말 대단해요!'
            : stats.currentStreak >= 3
              ? '✨ 습관이 만들어지고 있어요!'
              : '🌱 좋은 시작이에요! 조금씩 쌓아가요.'}
        </div>
      </motion.div>

      {/* 루틴 설정 */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
        <h4 className="text-xl font-bold text-gray-800 mb-4">⚙️ 루틴 설정</h4>

        <div className="space-y-5">
          {/* 하루 목표 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📊 하루 목표 (복습 카드 개수)
            </label>
            <input
              type="number"
              min={1}
              max={50}
              value={settings.dailyGoal}
              onChange={(e) =>
                handleSettingChange('dailyGoal', parseInt(e.target.value))
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg font-semibold"
            />
            <p className="text-xs text-gray-500 mt-1">
              ADHD 친화적 팁: 5-10개가 적당해요!
            </p>
          </div>

          {/* 알림 시간 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ⏰ 알림 시간
            </label>
            <input
              type="time"
              value={settings.reminderTime}
              onChange={(e) =>
                handleSettingChange('reminderTime', e.target.value)
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg font-semibold"
            />
          </div>

          {/* 학습 시간 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ⏱️ 학습 시간 (분)
            </label>
            <select
              value={settings.studyDuration}
              onChange={(e) =>
                handleSettingChange('studyDuration', parseInt(e.target.value))
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg font-semibold"
            >
              <option value={5}>5분 (초집중)</option>
              <option value={10}>10분 (짧게)</option>
              <option value={15}>15분 (추천)</option>
              <option value={25}>25분 (뽀모도로)</option>
              <option value={30}>30분 (여유있게)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              짧은 시간 집중이 더 효과적이에요!
            </p>
          </div>

          {/* 알림 활성화 */}
          <div className="border-t-2 border-gray-100 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-700">🔔 알림 받기</div>
                <p className="text-xs text-gray-500">
                  매일 설정한 시간에 알림을 받아요
                </p>
              </div>
              {settings.enableNotifications ? (
                <div className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-semibold text-sm">
                  ✅ 활성화됨
                </div>
              ) : (
                <button
                  onClick={handleEnableNotifications}
                  className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold text-sm transition-all shadow-lg"
                >
                  활성화
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 동기 부여 섹션 */}
      <div className="bg-linear-to-r from-purple-100 to-pink-100 border-2 border-purple-200 rounded-2xl p-6">
        <h4 className="font-bold text-purple-800 mb-3">💪 작은 습관의 힘</h4>
        <ul className="space-y-2 text-sm text-purple-700">
          <li>• 하루 5분만 투자해도 한 달이면 150분 = 2.5시간!</li>
          <li>• 연속 3일만 해도 습관이 만들어지기 시작해요</li>
          <li>• 놓쳤다고 포기하지 마세요. 오늘부터 다시 시작하면 돼요!</li>
          <li>
            • 완벽하지 않아도 괜찮아요. 조금씩 꾸준히가 목표예요 ✨
          </li>
        </ul>
      </div>
    </div>
  );
}
