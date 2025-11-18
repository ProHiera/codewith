'use client';

import Link from 'next/link';
import { DOMAINS, LANGS } from '@/lib/catalog';
import { useState, useMemo } from 'react';

export default function SidebarMenu() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLangs = useMemo(() => {
    if (!searchTerm) return LANGS;
    return LANGS.filter(lang => 
      lang.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.key.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="card sticky top-20">
      <h2 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
        <span>🧭</span>
        <span>탐색</span>
      </h2>
      
      <details open className="mb-4">
        <summary className="cursor-pointer select-none font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
          분류 (Domain)
        </summary>
        <ul className="mt-2 text-sm text-gray-700 space-y-2">
          {DOMAINS.map(d => (
            <li key={d.key}>
              <Link 
                href={`/catalog?domain=${d.key}`} 
                className="block py-1 px-2 rounded hover:bg-indigo-50 hover:text-indigo-700 transition-all"
              >
                {d.label}
              </Link>
            </li>
          ))}
        </ul>
      </details>

      <details className="mb-4" open>
        <summary className="cursor-pointer select-none font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
          언어/스택
        </summary>
        
        <div className="mt-2 mb-3">
          <input
            type="text"
            placeholder="🔍 언어 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {filteredLangs.length > 0 ? (
          <ul className="mt-2 text-sm text-gray-700 grid grid-cols-2 gap-y-2 gap-x-3">
            {filteredLangs.map(l => (
              <li key={l.key}>
                <Link 
                  href={`/catalog?lang=${l.key}`} 
                  className="block py-1 px-2 rounded hover:bg-indigo-50 hover:text-indigo-700 transition-all"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-gray-500 italic">검색 결과가 없습니다.</p>
        )}
      </details>

      <details>
        <summary className="cursor-pointer select-none font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
          바로가기
        </summary>
        <ul className="mt-2 text-sm text-gray-700 space-y-2">
          <li>
            <Link href="/missions" className="block py-1 px-2 rounded hover:bg-indigo-50 hover:text-indigo-700 transition-all">
              ⚡ 미션
            </Link>
          </li>
          <li>
            <Link href="/api-sandbox" className="block py-1 px-2 rounded hover:bg-indigo-50 hover:text-indigo-700 transition-all">
              🔌 API 샌드박스
            </Link>
          </li>
          <li>
            <Link href="/db-schema" className="block py-1 px-2 rounded hover:bg-indigo-50 hover:text-indigo-700 transition-all">
              🗄️ DB 스키마
            </Link>
          </li>
          <li>
            <Link href="/js-cheats" className="block py-1 px-2 rounded hover:bg-indigo-50 hover:text-indigo-700 transition-all">
              📚 JS 암기장
            </Link>
          </li>
        </ul>
      </details>
    </div>
  );
}
