'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Mission } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MissionsPage() {
  const router = useRouter();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
    fetchMissions();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }
    setUser(user);
  };

  const fetchMissions = async () => {
    try {
      const { data, error } = await supabase
        .from('missions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMissions(data || []);
    } catch (error) {
      console.error('Failed to fetch missions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">오늘의 미션</h1>
            <div className="space-x-4">
              <Link href="/ai-coach" className="text-blue-600 hover:text-blue-500">
                🤖 AI 코치
              </Link>
              <Link href="/notes" className="text-blue-600 hover:text-blue-500">
                📝 메모
              </Link>
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-500">
                대시보드
              </Link>
              <Link href="/portfolio" className="text-blue-600 hover:text-blue-500">
                포트폴리오
              </Link>
              <Link href="/error-doctor" className="text-blue-600 hover:text-blue-500">
                에러 닥터
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((mission) => (
            <Link
              key={mission.id}
              href={`/missions/${mission.id}`}
              className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                    mission.type === 'css' ? 'bg-blue-100 text-blue-800' :
                    mission.type === 'javascript' ? 'bg-yellow-100 text-yellow-800' :
                    mission.type === 'react' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {mission.type.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {mission.title}
              </h3>
              
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                {mission.spec_json?.description || '미션을 완료하세요'}
              </p>
              
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                10-15분
              </div>
            </Link>
          ))}
        </div>

        {missions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">아직 미션이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
