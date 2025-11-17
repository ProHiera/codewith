'use client';

import Link from 'next/link';
import { DOMAINS, LANGS } from '@/lib/catalog';

export default function SidebarMenu() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-bold mb-4">탐색</h2>
      <details open className="mb-4">
        <summary className="cursor-pointer select-none font-semibold">분류 (Domain)</summary>
        <ul className="mt-2 text-sm text-gray-700 space-y-1">
          {DOMAINS.map(d => (
            <li key={d.key}>
              <Link href={`/catalog?domain=${d.key}`} className="hover:text-gray-900">
                {d.label}
              </Link>
            </li>
          ))}
        </ul>
      </details>

      <details className="mb-4" open>
        <summary className="cursor-pointer select-none font-semibold">언어/스택</summary>
        <ul className="mt-2 text-sm text-gray-700 grid grid-cols-2 gap-y-1 gap-x-3">
          {LANGS.map(l => (
            <li key={l.key}>
              <Link href={`/catalog?lang=${l.key}`} className="hover:text-gray-900">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </details>

      <details>
        <summary className="cursor-pointer select-none font-semibold">바로가기</summary>
        <ul className="mt-2 text-sm text-gray-700 space-y-1">
          <li><Link href="/missions" className="hover:text-gray-900">미션</Link></li>
          <li><Link href="/api-sandbox" className="hover:text-gray-900">API 샌드박스</Link></li>
          <li><Link href="/db-schema" className="hover:text-gray-900">DB 스키마</Link></li>
          <li><Link href="/js-cheats" className="hover:text-gray-900">JS 암기장</Link></li>
        </ul>
      </details>
    </div>
  );
}
