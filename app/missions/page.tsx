'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Mission } from '@/types';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function MissionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      // auth check
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      // fetch missions
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
    void run();
  }, [router]);

  // deprecated individual fns replaced by single effect above

  // query filters: ?domain=frontend|backend|data|devops & ?lang=js|react|css|...
  const selectedDomain = (searchParams.get('domain') || '').toLowerCase();
  const selectedLang = (searchParams.get('lang') || '').toLowerCase();

  // map catalog langs to mission.type
  const langToMissionType: Record<string, Mission['type']> = {
    js: 'javascript',
    javascript: 'javascript',
    react: 'react',
    css: 'css',
  } as const;

  const domainToTypes: Record<string, Mission['type'][]> = {
    frontend: ['css', 'javascript', 'react'],
    devops: ['error'],
    backend: [],
    data: [],
  } as const;

  const filteredMissions = missions.filter((m) => {
    // filter by lang first if provided
    if (selectedLang) {
      const t = langToMissionType[selectedLang];
      if (t && m.type !== t) return false;
      // if unsupported lang provided, fall through (no filtering)
    }
    // filter by domain if provided
    if (selectedDomain) {
      const allowed = domainToTypes[selectedDomain];
      if (Array.isArray(allowed)) {
        if (allowed.length === 0) return false; // no missions mapped yet
        if (!allowed.includes(m.type)) return false;
      }
    }
    return true;
  });

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
        {(selectedDomain || selectedLang) && (
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-gray-500">필터:</span>
            {selectedDomain && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-gray-700">
                도메인: {selectedDomain}
                <Link
                  prefetch={false}
                  href={{ pathname: '/missions', query: selectedLang ? { lang: selectedLang } : {} }}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                  aria-label="도메인 필터 해제"
                >
                  ✕
                </Link>
              </span>
            )}
            {selectedLang && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-gray-700">
                언어: {selectedLang}
                <Link
                  prefetch={false}
                  href={{ pathname: '/missions', query: selectedDomain ? { domain: selectedDomain } : {} }}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                  aria-label="언어 필터 해제"
                >
                  ✕
                </Link>
              </span>
            )}
            <Link prefetch={false} href="/missions" className="text-blue-600 hover:text-blue-500">
              모두 보기
            </Link>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMissions.map((mission) => (
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

        {filteredMissions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">아직 미션이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
