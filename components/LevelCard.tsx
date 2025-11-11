'use client';

import { UserProfile } from '@/types/gamification';

interface Props {
  profile: UserProfile;
}

export default function LevelCard({ profile }: Props) {
  const expToNextLevel = (profile.level * 100);
  const currentLevelExp = profile.exp % 100;
  const progressPercent = (currentLevelExp / 100) * 100;

  const getLevelTitle = (level: number) => {
    if (level < 5) return '🌱 새싹 개발자';
    if (level < 10) return '👨‍💻 초보 개발자';
    if (level < 20) return '🚀 중급 개발자';
    if (level < 30) return '⭐ 고급 개발자';
    if (level < 50) return '💎 전문 개발자';
    return '👑 마스터 개발자';
  };

  return (
    <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-lg p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm opacity-90">레벨 {profile.level}</p>
          <h3 className="text-2xl font-bold">{getLevelTitle(profile.level)}</h3>
          <p className="text-sm opacity-75 mt-1">
            {profile.nickname || profile.email}
          </p>
        </div>
        <div className="text-6xl">
          {profile.level < 10 ? '🌱' : profile.level < 20 ? '🚀' : profile.level < 30 ? '⭐' : '💎'}
        </div>
      </div>

      {/* EXP Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span>경험치</span>
          <span>{currentLevelExp} / 100 EXP</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-yellow-300 to-yellow-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs opacity-75 mt-1 text-center">
          다음 레벨까지 {100 - currentLevelExp} EXP 남음!
        </p>
      </div>

      {/* Streak */}
      {profile.streak_days > 0 && (
        <div className="mt-4 bg-white/10 rounded-lg p-3 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="font-bold">{profile.streak_days}일 연속 출석!</p>
              <p className="text-xs opacity-75">대단해요! 계속 유지하세요!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
