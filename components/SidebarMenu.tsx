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
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h2 className="text-lg font-bold mb-4 text-gray-900">탐색</h2>
      <details open className="mb-4">
        <summary className="cursor-pointer select-none font-semibold text-gray-900">분류 (Domain)</summary>
        <ul className="mt-2 text-sm text-gray-700 space-y-1">
          {DOMAINS.map(d => (
            <li key={d.key}>
              <Link href={`/catalog?domain=${d.key}`} className="hover:text-gray-900 transition-colors">
                {d.label}
              </Link>
            </li>
          ))}
        </ul>
      </details>

      <details className="mb-4" open>
        <summary className="cursor-pointer select-none font-semibold text-gray-900">언어/스택</summary>
        
        {/* 검색창 */}
        <div className="mt-2 mb-3">
          <input
            type="text"
            placeholder="🔍 언어 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
          />
        </div>

        {filteredLangs.length > 0 ? (
          <ul className="mt-2 text-sm text-gray-700 grid grid-cols-2 gap-y-1 gap-x-3">
            {filteredLangs.map(l => (
              <li key={l.key}>
                <Link href={`/catalog?lang=${l.key}`} className="hover:text-gray-900 transition-colors">
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
        <summary className="cursor-pointer select-none font-semibold text-gray-900">바로가기</summary>
        <ul className="mt-2 text-sm text-gray-700 space-y-1">
          <li><Link href="/missions" className="hover:text-gray-900 transition-colors">미션</Link></li>
          <li><Link href="/api-sandbox" className="hover:text-gray-900 transition-colors">API 샌드박스</Link></li>
          <li><Link href="/db-schema" className="hover:text-gray-900 transition-colors">DB 스키마</Link></li>
          <li><Link href="/js-cheats" className="hover:text-gray-900 transition-colors">JS 암기장</Link></li>
        </ul>
      </details>
    </div>
  );
}
