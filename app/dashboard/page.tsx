'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

interface Stats {
  totalSubmissions: number;
  completedMissions: number;
  averageScore: number;
  totalErrors: number;
  totalProjects: number;
  recentActivity: any[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    totalSubmissions: 0,
    completedMissions: 0,
    averageScore: 0,
    totalErrors: 0,
    totalProjects: 0,
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }
    setUser(user);
    fetchStats(user.id);
  };

  const fetchStats = async (userId: string) => {
    try {
      // Fetch submissions
      const { data: submissions } = await supabase
        .from('submissions')
        .select('*')
        .eq('user_id', userId);

      // Fetch errors
      const { data: errors } = await supabase
        .from('errors')
        .select('*')
        .eq('user_id', userId);

      // Fetch projects
      const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId);

      const totalSubmissions = submissions?.length || 0;
      const completedMissions = submissions?.filter((s: any) => s.score >= 80).length || 0;
      const averageScore = totalSubmissions > 0
        ? Math.round(submissions!.reduce((sum: number, s: any) => sum + s.score, 0) / totalSubmissions)
        : 0;

      // Recent activity (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentSubmissions = submissions?.filter(
        (s: any) => new Date(s.created_at) > sevenDaysAgo
      ) || [];

      setStats({
        totalSubmissions,
        completedMissions,
        averageScore,
        totalErrors: errors?.length || 0,
        totalProjects: projects?.length || 0,
        recentActivity: recentSubmissions,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
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
            <h1 className="text-2xl font-bold">대시보드</h1>
            <div className="space-x-4 flex items-center">
              <span className="text-gray-600">
                {user?.email}
              </span>
              <button
                onClick={() => router.push('/missions')}
                className="text-blue-600 hover:text-blue-500"
              >
                미션
              </button>
              <button
                onClick={() => router.push('/error-doctor')}
                className="text-blue-600 hover:text-blue-500"
              >
                에러 닥터
              </button>
              <button
                onClick={() => router.push('/portfolio')}
                className="text-blue-600 hover:text-blue-500"
              >
                포트폴리오
              </button>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-500"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 제출</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalSubmissions}</p>
              </div>
              <div className="text-4xl">📝</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">완료한 미션</p>
                <p className="text-3xl font-bold text-green-600">{stats.completedMissions}</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">평균 점수</p>
                <p className="text-3xl font-bold text-blue-600">{stats.averageScore}점</p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">해결한 에러</p>
                <p className="text-3xl font-bold text-purple-600">{stats.totalErrors}</p>
              </div>
              <div className="text-4xl">🩺</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">프로젝트</p>
                <p className="text-3xl font-bold text-orange-600">{stats.totalProjects}</p>
              </div>
              <div className="text-4xl">🚀</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">최근 7일 활동</h2>
          
          {stats.recentActivity.length > 0 ? (
            <div className="space-y-3">
              {stats.recentActivity.slice(0, 10).map((activity) => (
                <div key={activity.id} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">미션 제출</p>
                    <p className="text-sm text-gray-600">
                      {new Date(activity.created_at).toLocaleString('ko-KR')}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded text-sm font-semibold ${
                    activity.score >= 80 ? 'bg-green-100 text-green-800' :
                    activity.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {activity.score}점
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              최근 활동이 없습니다. 미션을 시작해보세요!
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => router.push('/missions')}
            className="bg-blue-600 text-white rounded-lg p-6 hover:bg-blue-700 transition-colors"
          >
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="text-lg font-semibold">오늘의 미션</h3>
            <p className="text-sm mt-1 opacity-90">새로운 미션 도전하기</p>
          </button>

          <button
            onClick={() => router.push('/error-doctor')}
            className="bg-purple-600 text-white rounded-lg p-6 hover:bg-purple-700 transition-colors"
          >
            <div className="text-4xl mb-2">🩺</div>
            <h3 className="text-lg font-semibold">에러 진단</h3>
            <p className="text-sm mt-1 opacity-90">에러 해결 도움받기</p>
          </button>

          <button
            onClick={() => router.push('/portfolio')}
            className="bg-orange-600 text-white rounded-lg p-6 hover:bg-orange-700 transition-colors"
          >
            <div className="text-4xl mb-2">📂</div>
            <h3 className="text-lg font-semibold">포트폴리오</h3>
            <p className="text-sm mt-1 opacity-90">프로젝트 관리하기</p>
          </button>
        </div>

        {/* Completion Rate */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">성취도</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">미션 완료율</span>
                <span className="text-sm font-semibold">
                  {stats.totalSubmissions > 0
                    ? Math.round((stats.completedMissions / stats.totalSubmissions) * 100)
                    : 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${stats.totalSubmissions > 0
                      ? (stats.completedMissions / stats.totalSubmissions) * 100
                      : 0}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
