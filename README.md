# 🚀 개발 학습 플랫폼 - Dev Learning Platform

AI 코치와 게이미피케이션으로 즐겁게 배우는 **종합 개발자 양성 플랫폼**

---

## ✨ 핵심 기능

### 🎯 레벨 시스템 (신규!)
- **5단계 학습자 레벨**: 입문자 🌱 → 기초 🌿 → 중급 🌳 → 고급 🎓 → 현업 💼
- **레벨 평가 테스트**: 15문제로 정확한 실력 진단
- **직접 선택 모드**: 본인의 수준을 알고 있다면 바로 선택
- **맞춤 학습 경로**: 레벨별 추천 커리큘럼 자동 제공

### 🤖 AI 개발 코치
- 24/7 실시간 질의응답
- 코드 리뷰 및 피드백
- 학습 내용 메모 저장
- Flexbox, async/await, React Hooks 등 패턴 매칭 답변

### � 게이미피케이션 시스템
- **경험치 & 레벨**: 미션 완료 시 EXP 획득, 100 EXP마다 레벨업
- **업적 배지**: 9가지 기본 배지 (첫 미션, 연속 출석 등)
- **연속 학습 스트릭**: 매일 접속하여 스트릭 유지
- **KPI 대시보드**: 일일 활동, 성장 그래프 시각화

### ⚡ CSS 스피드런 미션 엔진
- 하루 10~15분 과제
- 자동 채점 시스템
- 실시간 피드백 제공
- 리팩터 가이드 제공

### 2. 에러 닥터 🩺
- 콘솔/빌드 로그 분석
- 원인 그래프 시각화
- 해결 단계 제시
- 복구 스크립트 자동 생성

### 3. 포트폴리오 빌더 📂
- 프로젝트 카드 생성
- 코드/데모/README 자동 구성
- 기술 스택 태그
- GitHub/Demo 링크 연동

### 4. 학습 대시보드 📊
- KPI 시각화 (완료율, MTTR, 리텐션)
- 일간/주간 활동 리포트
- 성취도 추적
- 최근 활동 타임라인

## 🛠️ 기술 스택

- **프론트엔드**: Next.js 16, React 19, TypeScript
- **스타일링**: Tailwind CSS 4
- **백엔드**: Supabase (Auth + DB)
- **데이터베이스**: PostgreSQL (Supabase)
- **배포**: Vercel + Supabase

## 📦 설치 방법

### 1. 저장소 클론

```bash
git clone <repository-url>
cd dev-learning-platform
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.local.example` 파일을 복사하여 `.env.local` 파일을 생성합니다:

```bash
cp .env.local.example .env.local
```

다음 환경 변수를 설정하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Supabase 설정

#### 4-1. 프로젝트 생성
1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. 프로젝트 URL과 API 키를 `.env.local`에 추가

#### 4-2. 데이터베이스 설정 (한 번에 완료)
1. Supabase Dashboard → SQL Editor
2. `database/SETUP.sql` 파일 내용을 복사하여 실행
3. 실행 결과에서 5개 체크 항목이 모두 통과하는지 확인

#### 4-3. 인증 설정
1. Supabase Dashboard → Authentication → Providers → Email
2. 다음과 같이 설정:
   - ✅ **Allow new users to sign up**: ON
   - ❌ **Confirm email**: OFF (개발 중)
3. Save 클릭

#### 4-4. OAuth 설정 (선택사항)
Google, GitHub, Kakao 로그인을 사용하려면 `OAUTH_SETUP.md` 참고

### 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

## 📁 주요 파일 구조

```
dev-learning-platform/
├── app/                      # Next.js App Router
│   ├── dashboard/            # 대시보드 (KPI, 레벨, 게이미피케이션)
│   ├── level-assessment/     # 레벨 평가 테스트
│   ├── login/                # 로그인 (Email + OAuth)
│   ├── signup/               # 회원가입
│   └── missions/             # 미션 시스템
├── database/                 # 데이터베이스
│   ├── SETUP.sql             # ⭐ 통합 설정 스크립트 (이것만 실행)
│   ├── schema.sql            # 기본 스키마
│   ├── gamification.sql      # 게이미피케이션 테이블
│   └── new-features.sql      # 신규 기능 테이블
├── types/                    # TypeScript 타입
│   └── levels.ts             # 레벨 시스템 타입 및 평가 문제
└── OAUTH_SETUP.md            # OAuth 설정 가이드
```

## 🗄️ 데이터베이스 스키마

### 핵심 테이블
- **users**: 사용자 정보 (이메일, 닉네임, 레벨)
- **user_progress**: 경험치, 레벨, 스트릭
- **achievements**: 업적 배지 시스템
- **missions**: CSS 스피드런 미션
- **submissions**: 미션 제출 및 채점 결과

### 신규 기능 테이블 (15개)
클론 코딩, 개념 스냅샷, 비동기 시뮬레이터, API 샌드박스, DB 스키마 메이커, 커밋 제안, 학습 레이더, 면접 연습, 학습 경로, 패턴 프로젝트, 접근성 체커 등

> 💡 `database/SETUP.sql` 실행으로 모든 테이블이 자동 생성됩니다

## 🚀 주요 페이지

| 경로 | 설명 | 상태 |
|------|------|------|
| `/` | 홈페이지 (모든 기능 카드) | ✅ |
| `/login` | 로그인 (Email + OAuth) | ✅ |
| `/signup` | 회원가입 | ✅ |
| `/level-assessment` | 레벨 평가 테스트 | ✅ |
| `/dashboard` | 학습 대시보드 (KPI, 게이미피케이션) | ✅ |
| `/missions` | CSS 스피드런 미션 목록 | ✅ |
| `/missions/[id]` | 미션 에디터 | ✅ |
| `/ai-coach` | AI 개발 코치 | ✅ |
| 기타 14개 기능 | 클론코딩, 에러닥터, 포트폴리오 등 | 🚧 DB만 생성됨 |

## 📊 운영 지표

- **일간 활성 사용자** (DAU)
- **미션 완료율**
- **최초 성공률**
- **재도전 횟수**
- **에러 해결 시간** (MTTR)
- **포트폴리오 카드 생성률**
- **7일 리텐션**

## 💰 수익 모델 (향후 계획)

1. 프리미엄 미션팩
2. 포트폴리오 템플릿
3. 1:1 면접 코칭
4. 팀 요금제 (관리자 대시보드)
5. 수료증/인증서 발급

## 🔄 개발 현황

### ✅ 완료된 기능
- 회원가입/로그인 (Email + OAuth 준비)
- 5단계 레벨 시스템 + 평가 테스트
- 게이미피케이션 (EXP, 레벨, 배지, 스트릭)
- CSS 스피드런 미션 엔진
- AI 코치 채팅
- 학습 대시보드
- 데이터베이스 스키마 (20+ 테이블)

### 🚧 진행 중
- 14개 신규 기능 페이지 구현
  - 클론 코딩 코치
  - 에러 닥터
  - JS 개념 스냅샷
  - 비동기 흐름 시뮬레이터
  - API 샌드박스
  - DB 스키마 메이커
  - 포트폴리오 빌더
  - 커밋/PR 어시스턴트
  - 학습 레이더
  - 면접 리허설
  - 맞춤 학습 경로
  - 패턴 인젝터
  - 접근성 체커
  - 성장 KPI

### 📅 로드맵
- OAuth 활성화 (Google, GitHub, Kakao)
- JavaScript 미션 채점 엔진
- AI 피드백 고도화
- 팀 협업 기능

## 🤝 기여하기

이슈 등록 및 Pull Request 환영합니다!

## 📝 라이선스

MIT License

---

**Made with ❤️ for developers**


## 📧 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해주세요.

---

**Made with ❤️ for developers learning to code**
