'use client';

interface Badge {
  icon: string;
  name: string;
  unlocked: boolean;
}

interface Props {
  badges: Badge[];
}

export default function BadgeDisplay({ badges }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span>🏆</span>
        획득한 업적
      </h3>
      
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {badges.map((badge, idx) => (
          <div
            key={idx}
            className={`text-center transition-all ${
              badge.unlocked
                ? 'opacity-100 scale-100'
                : 'opacity-30 grayscale scale-95'
            }`}
            title={badge.name}
          >
            <div className="text-4xl mb-1">{badge.icon}</div>
            <p className="text-xs font-medium text-gray-700 truncate">
              {badge.name}
            </p>
          </div>
        ))}
      </div>

      {badges.filter(b => b.unlocked).length === 0 && (
        <p className="text-center text-gray-500 py-8">
          아직 획득한 업적이 없습니다.<br />
          미션을 완료하고 첫 업적을 달성해보세요!
        </p>
      )}
    </div>
  );
}
