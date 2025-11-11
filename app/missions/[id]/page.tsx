'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Mission } from '@/types';

export default function MissionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [mission, setMission] = useState<Mission | null>(null);
  const [code, setCode] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchMission();
  }, [params.id]);

  const fetchMission = async () => {
    try {
      const { data, error } = await supabase
        .from('missions')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) throw error;
      setMission(data);
      
      // Set initial code template
      if (data.spec_json?.template) {
        setCode(data.spec_json.template);
      }
    } catch (error) {
      console.error('Failed to fetch mission:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!mission) return;
    
    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      // Grade the submission (simplified for now)
      const gradeResult = await fetch('/api/missions/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          missionId: mission.id,
          code,
          type: mission.type,
          expected: mission.spec_json.expected,
        }),
      });

      const { score, feedback, diff } = await gradeResult.json();

      // Save submission
      const { error } = await supabase
        .from('submissions')
        .insert({
          user_id: user.id,
          mission_id: mission.id,
          code,
          result_json: { score, feedback, diff },
          score,
        });

      if (error) throw error;

      setResult({ score, feedback, diff });
    } catch (error) {
      console.error('Failed to submit:', error);
      alert('제출에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (!mission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">미션을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.push('/missions')}
            className="text-blue-600 hover:text-blue-500"
          >
            ← 미션 목록
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">{mission.title}</h1>
              <p className="mt-2 text-gray-600">
                {mission.spec_json?.description}
              </p>
            </div>
            <span className={`px-3 py-1 rounded text-sm font-semibold ${
              mission.type === 'css' ? 'bg-blue-100 text-blue-800' :
              mission.type === 'javascript' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {mission.type.toUpperCase()}
            </span>
          </div>

          {mission.spec_json?.requirements && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">요구사항:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {mission.spec_json.requirements.map((req: string, idx: number) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">코드 에디터</h2>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-96 p-4 font-mono text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="여기에 코드를 작성하세요..."
            />
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? '채점 중...' : '제출하기'}
            </button>
          </div>

          {/* Preview / Result */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              {result ? '결과' : '미리보기'}
            </h2>
            
            {result ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">
                    {result.score}점
                  </div>
                  <div className="mt-2 text-gray-600">
                    {result.score >= 80 ? '합격! 🎉' : '다시 도전해보세요!'}
                  </div>
                </div>

                {result.feedback && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">피드백:</h3>
                    <p className="text-sm text-gray-700">{result.feedback}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-gray-500 text-center py-8">
                코드를 제출하면 결과가 표시됩니다
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
