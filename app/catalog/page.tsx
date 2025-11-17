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
        <div className="mb-6">
          {/* Domain 필터 */}
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">도메인</h2>
            <div className="flex gap-2 flex-wrap">
              <Link
                href="/catalog"
                className={`px-3 py-1 rounded-full text-sm ${!domain ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 hover:bg-gray-50'}`}
              >
                전체
              </Link>
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
          </div>

          {/* Language 필터 - 카테고리별로 그룹화 */}
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-2">기술 스택</h2>
            
            {/* 프론트엔드 */}
            <div className="mb-3">
              <h3 className="text-xs text-gray-500 mb-1">Frontend</h3>
              <div className="flex gap-2 flex-wrap">
                {LANGS.filter(l => l.category === 'frontend').map(l => (
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

            {/* 백엔드 */}
            <div className="mb-3">
              <h3 className="text-xs text-gray-500 mb-1">Backend</h3>
              <div className="flex gap-2 flex-wrap">
                {LANGS.filter(l => l.category === 'backend').map(l => (
                  <Link
                    key={l.key}
                    href={`/catalog?${domain ? `domain=${domain}&` : ''}lang=${l.key}`}
                    className={`px-3 py-1 rounded-full text-sm ${lang === l.key ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 hover:bg-gray-50'}`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* 데이터베이스 */}
            <div className="mb-3">
              <h3 className="text-xs text-gray-500 mb-1">Database</h3>
              <div className="flex gap-2 flex-wrap">
                {LANGS.filter(l => l.category === 'database').map(l => (
                  <Link
                    key={l.key}
                    href={`/catalog?${domain ? `domain=${domain}&` : ''}lang=${l.key}`}
                    className={`px-3 py-1 rounded-full text-sm ${lang === l.key ? 'bg-orange-600 text-white' : 'bg-white border border-gray-200 hover:bg-gray-50'}`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* 도구 */}
            <div className="mb-3">
              <h3 className="text-xs text-gray-500 mb-1">Tools</h3>
              <div className="flex gap-2 flex-wrap">
                {LANGS.filter(l => l.category === 'tool').map(l => (
                  <Link
                    key={l.key}
                    href={`/catalog?${domain ? `domain=${domain}&` : ''}lang=${l.key}`}
                    className={`px-3 py-1 rounded-full text-sm ${lang === l.key ? 'bg-gray-600 text-white' : 'bg-white border border-gray-200 hover:bg-gray-50'}`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
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
