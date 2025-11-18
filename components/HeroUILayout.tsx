'use client';

import Link from "next/link";
import { HeroUIProvider } from "@heroui/react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@heroui/react";
import GlobalAICoach from "@/components/GlobalAICoach";

export default function HeroUILayout({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      {/* Hero UI Navbar */}
      <Navbar isBordered maxWidth="xl" className="bg-white/80 backdrop-blur-md">
        <NavbarBrand>
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-linear-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold text-gray-900">CodeWith</span>
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden md:flex gap-8" justify="center">
          <NavbarItem>
            <Link href="/catalog" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              강의 목록
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/missions" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              미션
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/learning-paths" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              로드맵
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              대시보드
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden sm:flex">
            <Button as={Link} href="/login" variant="light" className="font-medium">
              로그인
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} href="/signup" color="primary" className="font-medium">
              무료 시작
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-linear-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <span className="text-xl font-bold">CodeWith</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI와 함께하는 즐거운 코딩 학습
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">학습</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/catalog" className="hover:text-white transition-colors">강의 목록</Link></li>
                <li><Link href="/missions" className="hover:text-white transition-colors">미션</Link></li>
                <li><Link href="/learning-paths" className="hover:text-white transition-colors">로드맵</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">도구</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/ai-coach" className="hover:text-white transition-colors">AI 코치</Link></li>
                <li><Link href="/error-doctor" className="hover:text-white transition-colors">에러 닥터</Link></li>
                <li><Link href="/git-simulator" className="hover:text-white transition-colors">Git 시뮬레이터</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">회사</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">소개</a></li>
                <li><a href="#" className="hover:text-white transition-colors">블로그</a></li>
                <li><a href="#" className="hover:text-white transition-colors">문의</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© 2025 CodeWith by ProHiera. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <GlobalAICoach />
    </HeroUIProvider>
  );
}
