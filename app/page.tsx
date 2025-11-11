import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-4">
            <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              🤖 AI를 사용하더라도, 개발 지식이 있다면 더 좋아요!
            </p>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI 코치와 함께하는<br />스마트 개발 학습
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            전용 AI 코치, 게임처럼 재미있는 레벨 시스템,<br />
            CSS 스피드런부터 포트폴리오 빌더까지 한 번에!
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg"
            >
              무료로 시작하기
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 font-semibold text-lg"
            >
              로그인
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/level-assessment" className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105 text-white cursor-pointer">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-3">레벨 평가</h3>
            <p className="text-green-100 mb-4">
              나의 실력을 테스트하고 맞춤 학습 경로를 받으세요!
            </p>
            <ul className="text-sm text-green-100 space-y-2">
              <li>✓ 15분 실력 테스트</li>
              <li>✓ 5단계 레벨 시스템</li>
              <li>✓ 맞춤 커리큘럼</li>
            </ul>
          </Link>

          <Link href="/ai-coach" className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105 text-white cursor-pointer">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-2xl font-bold mb-3">AI 개발 코치</h3>
            <p className="text-purple-100 mb-4">
              24/7 전용 코치가 코딩 질문에 즉시 답변. 메모 기능으로 학습 내용 정리까지!
            </p>
            <ul className="text-sm text-purple-100 space-y-2">
              <li>✓ 실시간 질의응답</li>
              <li>✓ 코드 리뷰</li>
              <li>✓ 학습 메모 저장</li>
            </ul>
          </Link>

          <Link href="/dashboard" className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
            <div className="text-5xl mb-4">🎮</div>
            <h3 className="text-2xl font-bold mb-3">게임화 시스템</h3>
            <p className="text-gray-600 mb-4">
              레벨업, 뱃지, 연속 출석! 게임처럼 재미있게 학습하세요.
            </p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ 경험치 & 레벨 시스템</li>
              <li>✓ 업적 배지 수집</li>
              <li>✓ 연속 학습 스트릭</li>
            </ul>
          </Link>

          <Link href="/missions" className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold mb-3">CSS 스피드런</h3>
            <p className="text-gray-600 mb-4">
              하루 10~15분 과제로 CSS 마스터하기. 자동 채점과 리팩터 가이드 제공.
            </p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ 실시간 자동 채점</li>
              <li>✓ 단계별 피드백</li>
              <li>✓ 반응형 디자인</li>
            </ul>
          </Link>
        </div>

        {/* New Features Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">🚀 더 많은 학습 도구</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/clone-coach" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="text-xl font-bold mb-2">클론 코딩 코치</h3>
              <p className="text-sm text-gray-600">
                목표 사이트 선택 → 섹션별 체크리스트 → 차이점 비교 스냅샷
              </p>
            </Link>

            <Link href="/error-doctor" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer">
              <div className="text-4xl mb-3">🩺</div>
              <h3 className="text-xl font-bold mb-2">에러 닥터</h3>
              <p className="text-sm text-gray-600">
                콘솔 로그 붙여넣기 → 원인 그래프 → 복구 스크립트 자동 생성
              </p>
            </Link>

            <Link href="/concept-snaps" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-xl font-bold mb-2">JS 개념 스냅샷</h3>
              <p className="text-sm text-gray-600">
                표현식/문, this, async 흐름을 단계별 카드로 쉽게 설명
              </p>
            </Link>

            <Link href="/async-simulator" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer">
              <div className="text-4xl mb-3">🎬</div>
              <h3 className="text-xl font-bold mb-2">비동기 흐름 리허설</h3>
              <p className="text-sm text-gray-600">
                setLoading → await → 파싱 → finally를 애니메이션 시뮬레이션
              </p>
            </Link>

            <Link href="/api-sandbox" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer">
              <div className="text-4xl mb-3">🔌</div>
              <h3 className="text-xl font-bold mb-2">API 실습 샌드박스</h3>
              <p className="text-sm text-gray-600">
                axios/fetch 템플릿 생성. 토큰 주입. 가짜 서버 포함
              </p>
            </Link>

            <Link href="/db-schema" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer">
              <div className="text-4xl mb-3">🗄️</div>
              <h3 className="text-xl font-bold mb-2">DB 스키마 메이커</h3>
              <p className="text-sm text-gray-600">
                요구사항 → 3NF 테이블 제안 → DDL 생성 → 샘플 데이터 주입
              </p>
            </Link>

            <Link href="/portfolio" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer">
              <div className="text-4xl mb-3">💼</div>
              <h3 className="text-xl font-bold mb-2">포트폴리오 빌더</h3>
              <p className="text-sm text-gray-600">
                프로젝트 카드 생성. 코드·데모·리드미 자동 구성
              </p>
            </Link>

            <Link href="/commit-assistant" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer">
              <div className="text-4xl mb-3">�</div>
              <h3 className="text-xl font-bold mb-2">커밋/PR 비서</h3>
              <p className="text-sm text-gray-600">
                변경분 분석 → Conventional Commits 제안 → PR 템플릿
              </p>
            </Link>

                        <Link href="/learning-radar" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer">
              <div className="text-4xl mb-3">📡</div>
              <h3 className="text-xl font-bold mb-2">학습 레이더</h3>
              <p className="text-sm text-gray-600">
                취약한 개념 분석 → 오늘 복습할 것 → 우선순위 제안
              </p>
            </Link>

            <Link href="/interview-practice" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer">
              <div className="text-4xl mb-3">🎤</div>
              <h3 className="text-xl font-bold mb-2">면접 리허설</h3>
              <p className="text-sm text-gray-600">
                기술질문 생성 → 모범 답안 · 함정 · 실습 링크 연결
              </p>
            </Link>

            <Link href="/learning-paths" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer">
              <div className="text-4xl mb-3">🗺️</div>
              <h3 className="text-xl font-bold mb-2">러닝 경로 프리셋</h3>
              <p className="text-sm text-gray-600">
                목표별 추천 학습 순서 → N주 로드맵 → 체크리스트
              </p>
            </Link>

            <Link href="/pattern-scaffolder" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer">
              <div className="text-4xl mb-3">🏗️</div>
              <h3 className="text-xl font-bold mb-2">실무 패턴 주입기</h3>
              <p className="text-sm text-gray-600">
                Controller→Service→Repository 예제 스캐폴딩. 테스트 포함
              </p>
            </Link>

            <Link href="/accessibility-checker" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer">
              <div className="text-4xl mb-3">♿</div>
              <h3 className="text-xl font-bold mb-2">접근성 검사기</h3>
              <p className="text-sm text-gray-600">
                aria-label 누락 감지. 수정 PR 패치 제안
              </p>
            </Link>

            <Link href="/dashboard" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-xl font-bold mb-2">성장 로그 & KPI</h3>
              <p className="text-sm text-gray-600">
                일일 집중시간, 통과 미션, 에러 MTTR, 리팩터 비율 가시화
              </p>
            </Link>
          </div>
        </div>

        {/* AI Learning Philosophy */}
        <div className="mt-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">🧠 AI 시대, 그래도 기초가 중요한 이유</h2>
            <p className="text-xl text-white/90 mb-8">
              ChatGPT, Copilot 같은 AI 도구가 코드를 짜줍니다.<br />
              하지만 <span className="font-bold text-yellow-300">그 코드를 이해하고, 수정하고, 최적화</span>하려면?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-bold mb-2">정확한 질문</h3>
                <p className="text-sm text-white/80">
                  AI에게 뭘 물어야 할지 알려면 기초 개념이 필요해요
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                <div className="text-3xl mb-3">🔍</div>
                <h3 className="font-bold mb-2">코드 검증</h3>
                <p className="text-sm text-white/80">
                  AI가 준 답이 맞는지 판단하려면 지식이 있어야 해요
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-bold mb-2">빠른 디버깅</h3>
                <p className="text-sm text-white/80">
                  에러를 보고 바로 원인을 찾으려면 경험이 필요해요
                </p>
              </div>
            </div>
            <div className="mt-8 text-lg font-semibold">
              <span className="text-yellow-300">💡 AI는 도구, 실력은 당신의 것!</span><br />
              <span className="text-white/90">우리 플랫폼에서 AI와 함께 성장하세요</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 bg-white rounded-2xl p-12 shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">학습 성과 추적 & 게이미피케이션</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">🎮</div>
              <div className="text-2xl font-bold text-gray-900">레벨 시스템</div>
              <div className="text-gray-600 mt-1">경험치로 레벨업!</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">🏆</div>
              <div className="text-2xl font-bold text-gray-900">업적 뱃지</div>
              <div className="text-gray-600 mt-1">다양한 뱃지 획득</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">🔥</div>
              <div className="text-2xl font-bold text-gray-900">연속 출석</div>
              <div className="text-gray-600 mt-1">스트릭 유지하기</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">📊</div>
              <div className="text-2xl font-bold text-gray-900">실시간 KPI</div>
              <div className="text-gray-600 mt-1">성장 추적</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-4">지금 바로 시작하세요</h2>
          <p className="text-xl text-gray-600 mb-8">
            무료로 가입하고 첫 미션에 도전하세요
          </p>
          <Link
            href="/signup"
            className="inline-block px-12 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-xl"
          >
            시작하기 →
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-12 border-t border-gray-200 text-center text-gray-600">
          <p>© 2025 Dev Learning Platform. Made with ❤️ for developers.</p>
        </div>
      </div>
    </div>
  );
}
