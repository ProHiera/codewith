import Link from 'next/link';
import { CATALOG, DOMAINS, LANGS, type Domain } from '@/lib/catalog';

type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function CatalogPage({ searchParams }: Props) {
  const domain = (searchParams?.domain as Domain | undefined) || undefined;
  const lang = (searchParams?.lang as string | undefined) || undefined;

  const items = CATALOG.filter(item => {
    const okDomain = domain ? item.domain === domain : true;
    const okLang = lang ? item.langs.includes(lang) : true;
    return okDomain && okLang;
  });

  const domainLabel = domain ? DOMAINS.find(d => d.key === domain)?.label : undefined;
  const langLabel = lang ? LANGS.find(l => l.key === lang)?.label : undefined;

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">카탈로그</h1>
          <p className="text-gray-600">
            {domainLabel ? `${domainLabel}` : '전체'}
            {langLabel ? ` · ${langLabel}` : ''} 보기
          </p>
        </div>

        {/* 선택한 필터 요약 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {domain && (
            <Link href="/catalog" className="px-3 py-1 bg-gray-200 rounded-full text-sm">{domainLabel} ✕</Link>
          )}
          {lang && (
            <Link href={`/catalog${domain ? `?domain=${domain}` : ''}`} className="px-3 py-1 bg-gray-200 rounded-full text-sm">{langLabel} ✕</Link>
          )}
        </div>

        {/* 필터 바 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2 flex-wrap">
            {DOMAINS.map(d => (
              <Link
                key={d.key}
                href={`/catalog?domain=${d.key}${lang ? `&lang=${lang}` : ''}`}
                className={`px-3 py-1 rounded-full text-sm ${domain === d.key ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 hover:bg-gray-50'}`}
              >
                {d.label}
              </Link>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {LANGS.map(l => (
              <Link
                key={l.key}
                href={`/catalog?${domain ? `domain=${domain}&` : ''}lang=${l.key}`}
                className={`px-3 py-1 rounded-full text-sm ${lang === l.key ? 'bg-purple-600 text-white' : 'bg-white border border-gray-200 hover:bg-gray-50'}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* 결과 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => {
            const query = [domain ? `domain=${domain}` : '', lang ? `lang=${lang}` : ''].filter(Boolean).join('&');
            const href = item.id === 'missions' && query ? `${item.path}?${query}` : item.path;
            return (
            <Link key={item.id} href={href} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer">
              <div className="text-4xl mb-2">{item.icon}</div>
              <h3 className="text-lg font-bold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-100 rounded text-xs">{item.domain}</span>
                {item.langs.map(l => (
                  <span key={l} className="px-2 py-1 bg-gray-100 rounded text-xs">{l}</span>
                ))}
              </div>
            </Link>
          );})}
          {items.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-16">
              해당 필터에 해당하는 항목이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
