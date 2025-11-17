# Environment Setup Guide

`.env.local` 파일을 설정해야 합니다.

## 1. Supabase 설정

1. [Supabase](https://supabase.com) 접속 및 로그인
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. Settings → API 메뉴로 이동
4. 다음 값 복사:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

5. `.env.local` 파일에 붙여넣기:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-very-long-anon-key-here
```

## 2. 데이터베이스 스키마 생성

1. Supabase Dashboard → SQL Editor
2. `database/schema.sql` 파일 내용 복사
3. SQL Editor에서 실행

## 3. OpenAI 설정 (선택사항)

AI 기능을 사용하려면:

1. [OpenAI](https://platform.openai.com) 가입
2. API Keys 메뉴에서 새 키 생성
3. `.env.local`에 추가:

```env
OPENAI_API_KEY=sk-your-openai-api-key
```

## 4. 개발 서버 실행

```bash
npm run dev
```

이제 http://localhost:3000 접속 가능합니다!
