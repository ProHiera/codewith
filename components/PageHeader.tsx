'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { User } from '@supabase/supabase-js';

export default function PageHeader() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <Link 
          href="/" 
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-100 rounded-lg shadow-md transition-all group"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform">🏠</span>
          <span className="font-semibold text-gray-700">홈으로</span>
        </Link>
      </div>

      {user && (
        <Link 
          href="/dashboard"
          className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-blue-50 rounded-lg shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
            {user.email?.[0].toUpperCase() || '👤'}
          </div>
          <div className="text-left">
            <div className="text-xs text-gray-500">마이페이지</div>
            <div className="text-sm font-semibold text-gray-700 truncate max-w-[150px]">
              {user.email?.split('@')[0] || '사용자'}
            </div>
          </div>
        </Link>
      )}

      {!user && (
        <Link 
          href="/login"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all font-semibold"
        >
          로그인
        </Link>
      )}
    </div>
  );
}
