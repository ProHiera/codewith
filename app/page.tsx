'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SidebarMenu from '@/components/SidebarMenu';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function HomePage() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [level, setLevel] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const supabase = createClientComponentClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          setUser(user);
          const { data: profile } = await supabase
            .from('profiles')
            .select('nickname, current_level')
            .eq('id', user.id)
            .single();
          
          if (profile?.nickname) {
            setNickname(profile.nickname);
          } else {
            setNickname(user.email?.split('@')[0] || '개발자');
          }

          if (profile?.current_level) {
            const levelNames: Record<number, string> = {
              1: '초보', 2: '입문', 3: '초급', 4: '중급',
              5: '고급', 6: '전문가', 7: '마스터'
            };
            setLevel(levelNames[profile.current_level] || '초보');
          } else {
            setLevel('초보');
          }
        }
      } catch (error) {
        // Silent fail - user not logged in
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
  <div className="min-h-screen bg-white">
  <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_380px] gap-6">
          {/* Left: Sidebar */}
          <aside className="hidden lg:block">
            <SidebarMenu />
          </aside>
          <div>
            {/* Hero Section with Target Audience */}
            <div className="text-center mb-16">
              {!loading && user ? (
                // 로그인한 사용자
                <>
                  <div className="inline-block px-8 py-4 bg-purple-50 rounded-2xl mb-6 border border-purple-200">
                    <p className="text-lg font-bold text-purple-900">🎉 환영합니다!</p>
                  </div>

                  <h1 className="text-7xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                    안녕, <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-pink-500 to-blue-600">{nickname}</span>님!<br />
                    <span className="text-5xl text-gray-800">오늘도 재밌게 놀아볼까요?</span>
                  </h1>

                  <div className="inline-block px-6 py-3 bg-amber-50 rounded-2xl mb-6 border border-amber-200">
                    <p className="text-base font-bold text-amber-900">
                      🏆 지금은 <span className="text-amber-700">{level}</span> 레벨자예요!
                    </p>
                  </div>
                  
                  <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                    AI가 함께하는 즐거운 학습 시간! 🚀
                  </p>

                  <div className="flex gap-4 justify-center mb-8">
                    <Link href="/dashboard" className="px-10 py-4 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 font-bold text-xl transition-all hover:scale-105 hover:shadow-xl">
                      🎯 대시보드
                    </Link>
                    <Link href="/missions" className="px-10 py-4 bg-white text-gray-900 border-2 border-gray-900 rounded-2xl hover:bg-gray-50 font-bold text-xl transition-all hover:scale-105">
                      📋 오늘의 미션
                    </Link>
                  </div>
                </>
              ) : (
                // 비로그인 사용자
                <>
              {/* Pain Point Banner */}
              <div className="inline-block px-6 py-3 bg-red-50 rounded-2xl mb-6 border border-red-200">
                <p className="text-sm font-bold text-red-800">
                  😫 혼자 공부하면 루틴이 무너지고, 뭘 외워야 할지 모르겠다면?
                </p>
              </div>

          <h1 className="text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            집에서 혼자 공부하는<br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-600">
              당신을 위한 AI 학습 파트너
            </span>
          </h1>
          
          <p className="text-2xl text-gray-900 mb-4 font-bold">
            🎯 초보 개발자 · 취준생 · N잡 준비생 · 비전공자를 위한
          </p>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            짧고 재미있게! AI가 복습 스케줄, 약점 분석, 퀴즈 출제까지<br />
            <span className="font-bold text-purple-700">외울 것은 노란색, 이해만 할 것은 파란색</span>으로 한눈에 구분
          </p>

          <div className="flex gap-4 justify-center mb-8">
            <Link
              href="/signup"
              className="px-10 py-4 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 font-bold text-xl transition-all hover:scale-105 hover:shadow-xl"
            >
              🚀 무료로 시작하기
            </Link>
            <Link
              href="/login"
              className="px-10 py-4 bg-white text-gray-900 border-2 border-gray-900 rounded-2xl hover:bg-gray-50 font-bold text-xl transition-all hover:scale-105"
            >
              로그인
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-xl">✓</span>
              <span className="font-semibold">100% 무료</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-xl">✓</span>
              <span className="font-semibold">회원가입 30초</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-xl">✓</span>
              <span className="font-semibold">ADHD 친화적</span>
            </div>
          </div>
                </>
              )}
        </div>

        {/* Quick Start Section - Git & Deploy */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Git 시뮬레이터 */}
          <Link href="/git-simulator" className="group bg-linear-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-xl hover:scale-105">
            <div className="flex items-start gap-4">
              <div className="text-6xl group-hover:scale-110 transition-transform">🌿</div>
              <div className="flex-1">
                <h3 className="text-2xl font-black text-gray-900 mb-2">Git 시뮬레이터</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Git 명령어를 브라우저에서 직접 실습하고 배워요!<br />
                  <span className="text-sm text-green-700 font-semibold">init → add → commit → push까지 한번에</span>
                </p>
                <div className="flex items-center gap-2 text-green-700 font-bold">
                  <span>바로 시작하기</span>
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </div>
          </Link>

          {/* 배포 가이드 */}
          <Link href="/deploy-guide" className="group bg-linear-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-xl hover:scale-105">
            <div className="flex items-start gap-4">
              <div className="text-6xl group-hover:scale-110 transition-transform">🚀</div>
              <div className="flex-1">
                <h3 className="text-2xl font-black text-gray-900 mb-2">배포 가이드</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Vercel, Netlify, Railway로 내 프로젝트를 세상에 공개!<br />
                  <span className="text-sm text-purple-700 font-semibold">환경 변수 설정부터 도메인 연결까지</span>
                </p>
                <div className="flex items-center gap-2 text-purple-700 font-bold">
                  <span>배포 배우기</span>
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Target Audience Section */}
        <div className="mb-24 bg-gray-50 rounded-3xl p-12 border border-gray-200">
          <h2 className="text-4xl font-black text-center mb-4 text-gray-900">
            ✋ 이런 분들을 위해 만들었어요
          </h2>
          <p className="text-center text-gray-700 mb-10 text-lg">
            하나라도 해당되면 바로 시작하세요!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-purple-300">
              <div className="text-5xl mb-4 text-center">🏠</div>
              <h3 className="text-xl font-bold mb-3 text-center text-gray-900">
                집에서 혼자 공부하지만<br />루틴을 못 지키는 사람
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                매일 알림, 연속 출석 스트릭, AI 코치가<br />
                <span className="font-bold text-purple-700">루틴을 대신 관리</span>해 드려요
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-blue-300">
              <div className="text-5xl mb-4 text-center">💰</div>
              <h3 className="text-xl font-bold mb-3 text-center text-gray-900">
                무료로 배우고 싶은<br />초보 개발자 · 취준생
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                비싼 인강 없이도<br />
                <span className="font-bold text-blue-700">AI 코치 + 자동 채점 + 피드백</span>까지<br />
                완전 무료!
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-green-300">
              <div className="text-5xl mb-4 text-center">🎓</div>
              <h3 className="text-xl font-bold mb-3 text-center text-gray-900">
                비전공자지만 AI로<br />웹 개발 시작하고 싶은 사람
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                전공 지식 없이도<br />
                <span className="font-bold text-green-700">AI 도구 + 실습 중심</span>으로<br />
                직접 웹사이트 만들기!
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-yellow-300">
              <div className="text-5xl mb-4 text-center">⚡</div>
              <h3 className="text-xl font-bold mb-3 text-center text-gray-900">
                ADHD 성향 · 집중력 부족<br />짧고 재밌는 학습 필요
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                하루 <span className="font-bold text-yellow-700">10~15분 미션</span>,<br />
                게임처럼 레벨업 · 뱃지 · 퀴즈 팝업으로<br />
                재미있게!
              </p>
            </div>
          </div>
        </div>

        {/* Pain Points & Solutions */}
        <div className="mb-24">
          <h2 className="text-4xl font-black text-center mb-4 text-gray-900">
            😓 이런 고민, 우리가 해결할게요
          </h2>
          <p className="text-center text-gray-700 mb-12 text-lg">
            혼자 공부하는 사람들의 진짜 고민을 알아요
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pain Point 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-8 border-red-500">
              <div className="flex items-start gap-4">
                <div className="text-4xl">😫</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-red-700">
                    혼자 공부하면 루틴이 무너짐
                  </h3>
                  <p className="text-gray-700 mb-4">
                    &ldquo;오늘은 쉬어도 되겠지...&rdquo; → 일주일 째 안 함
                  </p>
                  <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg">
                    <p className="font-bold text-green-900 mb-2">✨ 우리의 해결책</p>
                    <p className="text-green-800">
                      <strong>연속 출석 스트릭</strong> · <strong>매일 알림</strong> · <strong>AI 코치 독촉</strong><br />
                      게임처럼 재밌게 습관 만들기!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pain Point 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-8 border-orange-500">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🤔</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-orange-700">
                    뭘 외워야 할지 구분 못 함
                  </h3>
                  <p className="text-gray-700 mb-4">
                    전부 중요해 보여서 다 외우다가 포기...
                  </p>
                  <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg">
                    <p className="font-bold text-green-900 mb-2">✨ 우리의 해결책</p>
                    <p className="text-green-800">
                      <strong className="text-yellow-700">노란색 = 암기 필수</strong> ·
                      <strong className="text-blue-700"> 파란색 = 이해만</strong> ·
                      <strong className="text-purple-700"> 보라색 = 실습</strong><br />
                      색깔로 한눈에 구분!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pain Point 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-8 border-yellow-500">
              <div className="flex items-start gap-4">
                <div className="text-4xl">📅</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-yellow-700">
                    복습 타이밍을 스스로 관리하기 힘듦
                  </h3>
                  <p className="text-gray-700 mb-4">
                    언제 다시 봐야 하는지 몰라서 그냥 안 봄
                  </p>
                  <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg">
                    <p className="font-bold text-green-900 mb-2">✨ 우리의 해결책</p>
                    <p className="text-green-800">
                      <strong>AI가 자동 복습 스케줄 생성</strong><br />
                      1일 후 → 3일 후 → 7일 후<br />
                      놀라운 퀴즈 팝업으로 복습 알림!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pain Point 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-8 border-purple-500">
              <div className="flex items-start gap-4">
                <div className="text-4xl">😴</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-purple-700">
                    기존 인강/교재는 지루하고 상호작용 약함
                  </h3>
                  <p className="text-gray-700 mb-4">
                    재생만 하고 딴짓... 배운 게 없음
                  </p>
                  <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg">
                    <p className="font-bold text-green-900 mb-2">✨ 우리의 해결책</p>
                    <p className="text-green-800">
                      <strong>게임화 시스템</strong> · <strong>실시간 피드백</strong><br />
                      <strong>깜짝 퀴즈</strong> · <strong>뱃지 수집</strong> · <strong>레벨업</strong><br />
                      지루할 틈이 없어요!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-24 bg-gray-900 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-black text-center mb-4">
            💎 우리가 제공하는 핵심 가치
          </h2>
          <p className="text-center text-white/90 mb-12 text-xl">
            다른 학습 플랫폼과 뭐가 다른가요?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/20">
              <div className="text-5xl mb-4 text-center">🤖</div>
              <h3 className="text-2xl font-bold mb-4 text-center">
                AI가 다 알아서 관리
              </h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 text-xl">✓</span>
                  <span><strong>복습 스케줄</strong> 자동 생성</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 text-xl">✓</span>
                  <span><strong>약점 분석</strong> 후 맞춤 문제</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 text-xl">✓</span>
                  <span><strong>퀴즈 자동 출제</strong> 및 채점</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 text-xl">✓</span>
                  <span><strong>24/7 AI 코치</strong> 질문 답변</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/20">
              <div className="text-5xl mb-4 text-center">🎨</div>
              <h3 className="text-2xl font-bold mb-4 text-center">
                색깔로 딱 구분
              </h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 text-2xl">●</span>
                  <span><strong className="text-yellow-300">노란색</strong> = 암기 필수 (외워야 함!)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-300 text-2xl">●</span>
                  <span><strong className="text-blue-300">파란색</strong> = 참고용 (이해만)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-300 text-2xl">●</span>
                  <span><strong className="text-purple-300">보라색</strong> = 실습 (직접 해보기)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-300 text-xl">✓</span>
                  <span>뇌가 <strong>자동으로 우선순위</strong> 인식!</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/20">
              <div className="text-5xl mb-4 text-center">🎮</div>
              <h3 className="text-2xl font-bold mb-4 text-center">
                게임처럼 재밌게
              </h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 text-xl">🎯</span>
                  <span><strong>레벨업 시스템</strong> (경험치 획득)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 text-xl">🏆</span>
                  <span><strong>업적 뱃지</strong> 수집</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 text-xl">🔥</span>
                  <span><strong>연속 출석</strong> 스트릭</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 text-xl">💥</span>
                  <span><strong>깜짝 퀴즈</strong> 이벤트</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-2xl font-bold mb-2">
              💡 학습이 아니라 <span className="text-yellow-300">게임이 되는 경험</span>
            </p>
            <p className="text-lg text-white/90">
              지루한 공부는 그만! 재미있게 실력을 쌓으세요
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/level-assessment" className="bg-linear-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105 text-white cursor-pointer">
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

          <Link href="/ai-coach" className="bg-linear-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105 text-white cursor-pointer">
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

          <Link href="/dashboard" className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105 cursor-pointer border border-gray-200">
            <div className="text-5xl mb-4">🎮</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">게임화 시스템</h3>
            <p className="text-gray-700 mb-4">
              레벨업, 뱃지, 연속 출석! 게임처럼 재미있게 학습하세요.
            </p>
            <ul className="text-sm text-gray-800 space-y-2">
              <li>✓ 경험치 & 레벨 시스템</li>
              <li>✓ 업적 배지 수집</li>
              <li>✓ 연속 학습 스트릭</li>
            </ul>
          </Link>

          <Link href="/missions" className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105 cursor-pointer border border-gray-200">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">CSS 스피드런</h3>
            <p className="text-gray-700 mb-4">
              하루 10~15분 과제로 CSS 마스터하기. 자동 채점과 리팩터 가이드 제공.
            </p>
            <ul className="text-sm text-gray-800 space-y-2">
              <li>✓ 실시간 자동 채점</li>
              <li>✓ 단계별 피드백</li>
              <li>✓ 반응형 디자인</li>
            </ul>
          </Link>
        </div>

  {/* New Features Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-black text-center mb-12 text-gray-900">🚀 더 많은 학습 도구</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/clone-coach" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border border-gray-200">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">클론 코딩 코치</h3>
              <p className="text-sm text-gray-700">
                목표 사이트 선택 → 섹션별 체크리스트 → 차이점 비교 스냅샷
              </p>
            </Link>

            <Link href="/error-doctor" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border border-gray-200">
              <div className="text-4xl mb-3">🩺</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">에러 닥터</h3>
              <p className="text-sm text-gray-700">
                콘솔 로그 붙여넣기 → 원인 그래프 → 복구 스크립트 자동 생성
              </p>
            </Link>

            <Link href="/concept-snaps" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border border-gray-200">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">JS 개념 스냅샷</h3>
              <p className="text-sm text-gray-700">
                표현식/문, this, async 흐름을 단계별 카드로 쉽게 설명
              </p>
            </Link>

            <Link href="/async-simulator" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border border-gray-200">
              <div className="text-4xl mb-3">🎬</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">비동기 흐름 리허설</h3>
              <p className="text-sm text-gray-700">
                setLoading → await → 파싱 → finally를 애니메이션 시뮬레이션
              </p>
            </Link>

            <Link href="/api-sandbox" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border border-gray-200">
              <div className="text-4xl mb-3">🔌</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">API 실습 샌드박스</h3>
              <p className="text-sm text-gray-700">
                axios/fetch 템플릿 생성. 토큰 주입. 가짜 서버 포함
              </p>
            </Link>

            <Link href="/db-schema" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border border-gray-200">
              <div className="text-4xl mb-3">🗄️</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">DB 스키마 메이커</h3>
              <p className="text-sm text-gray-700">
                요구사항 → 3NF 테이블 제안 → DDL 생성 → 샘플 데이터 주입
              </p>
            </Link>

            <Link href="/portfolio" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border border-gray-200">
              <div className="text-4xl mb-3">💼</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">포트폴리오 빌더</h3>
              <p className="text-sm text-gray-700">
                프로젝트 카드 생성. 코드·데모·리드미 자동 구성
              </p>
            </Link>

            <Link href="/commit-assistant" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border border-gray-200">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">커밋/PR 비서</h3>
              <p className="text-sm text-gray-700">
                변경분 분석 → Conventional Commits 제안 → PR 템플릿
              </p>
            </Link>

                        <Link href="/learning-radar" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border border-gray-200">
              <div className="text-4xl mb-3">📡</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">학습 레이더</h3>
              <p className="text-sm text-gray-700">
                취약한 개념 분석 → 오늘 복습할 것 → 우선순위 제안
              </p>
            </Link>

            <Link href="/interview-practice" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border border-gray-200">
              <div className="text-4xl mb-3">🎤</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">면접 리허설</h3>
              <p className="text-sm text-gray-700">
                기술질문 생성 → 모범 답안 · 함정 · 실습 링크 연결
              </p>
            </Link>

            <Link href="/learning-paths" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border border-gray-200">
              <div className="text-4xl mb-3">🗺️</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">러닝 경로 프리셋</h3>
              <p className="text-sm text-gray-700">
                목표별 추천 학습 순서 → N주 로드맵 → 체크리스트
              </p>
            </Link>

            <Link href="/pattern-scaffolder" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border border-gray-200">
              <div className="text-4xl mb-3">🏗️</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">실무 패턴 주입기</h3>
              <p className="text-sm text-gray-700">
                Controller→Service→Repository 예제 스캐폴딩. 테스트 포함
              </p>
            </Link>

            <Link href="/clean-code" className="bg-indigo-600 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer text-white">
              <div className="text-4xl mb-3">🧹</div>
              <h3 className="text-xl font-bold mb-2">클린 코드 프로그래밍</h3>
              <p className="text-sm text-indigo-100">
                중급자 이상 필수! 코드 리뷰, 리팩토링, 디자인 패턴 마스터
              </p>
            </Link>

            <Link href="/accessibility-checker" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border border-gray-200">
              <div className="text-4xl mb-3">♿</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">접근성 검사기</h3>
              <p className="text-sm text-gray-700">
                aria-label 누락 감지. 수정 PR 패치 제안
              </p>
            </Link>

            <Link href="/dashboard" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border border-gray-200">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">성장 로그 & KPI</h3>
              <p className="text-sm text-gray-700">
                일일 집중시간, 통과 미션, 에러 MTTR, 리팩터 비율 가시화
              </p>
            </Link>
          </div>
        </div>

  {/* AI Learning Philosophy */}
    <div className="mt-24 bg-gray-900 rounded-2xl p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-6">🧠 AI 시대, 그래도 기초가 중요한 이유</h2>
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
        <div className="mt-16 bg-white rounded-2xl p-12 shadow-xl border border-gray-200">
          <h2 className="text-3xl font-black text-center mb-12 text-gray-900">학습 성과 추적 & 게이미피케이션</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">🎮</div>
              <div className="text-2xl font-bold text-gray-900">레벨 시스템</div>
              <div className="text-gray-700 mt-1">경험치로 레벨업!</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">🏆</div>
              <div className="text-2xl font-bold text-gray-900">업적 뱃지</div>
              <div className="text-gray-700 mt-1">다양한 뱃지 획득</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">🔥</div>
              <div className="text-2xl font-bold text-gray-900">연속 출석</div>
              <div className="text-gray-700 mt-1">스트릭 유지하기</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">📊</div>
              <div className="text-2xl font-bold text-gray-900">실시간 KPI</div>
              <div className="text-gray-700 mt-1">성장 추적</div>
            </div>
          </div>
        </div>

  {/* CTA */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-black mb-4 text-gray-900">지금 바로 시작하세요</h2>
          <p className="text-xl text-gray-700 mb-8">
            무료로 가입하고 첫 미션에 도전하세요
          </p>
          <Link
            href="/signup"
            className="inline-block px-12 py-4 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 font-bold text-xl hover:shadow-xl transition-all"
          >
            시작하기 →
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-12 border-t border-gray-300 text-center text-gray-700">
          <p>© 2025 by ProHiera</p>
        </div>
          </div>
          {/* Right: Empty space */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </div>
  );
}
