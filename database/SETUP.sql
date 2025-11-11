-- ============================================
-- 개발 학습 플랫폼 - 최종 데이터베이스 설정
-- ============================================
-- 이 파일 하나만 실행하면 모든 설정이 완료됩니다.
-- Supabase SQL Editor에서 실행하세요.

-- ============================================
-- 1단계: 기본 테이블 및 트리거 설정
-- ============================================

-- 1-1. 기존 트리거 삭제
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- 1-2. users 테이블 생성
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  nickname TEXT,
  learner_level TEXT DEFAULT 'beginner',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 1-3. 누락된 컬럼 추가 (있다면 스킵)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'learner_level') THEN
    ALTER TABLE public.users ADD COLUMN learner_level TEXT DEFAULT 'beginner';
  END IF;
  IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'nickname') THEN
    ALTER TABLE public.users ADD COLUMN nickname TEXT;
  END IF;
  IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'created_at') THEN
    ALTER TABLE public.users ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;
  IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'updated_at') THEN
    ALTER TABLE public.users ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;
END $$;

-- ============================================
-- 2단계: RLS (Row Level Security) 설정
-- ============================================

-- 2-1. RLS 활성화
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 2-2. 기존 정책 삭제
DROP POLICY IF EXISTS "Users can view own data" ON public.users;
DROP POLICY IF EXISTS "Users can update own data" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authentication" ON public.users;
DROP POLICY IF EXISTS "Allow public insert during signup" ON public.users;

-- 2-3. 새 RLS 정책 생성
CREATE POLICY "Users can view own data"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Enable insert for authentication"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================
-- 3단계: 트리거 함수 생성 (이메일 자동 확인 포함)
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- public.users 테이블에 레코드 생성
  INSERT INTO public.users (id, email, nickname, learner_level)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nickname', ''),
    'beginner'
  );
  
  -- 이메일 자동 확인 처리 (이메일 인증 없이 바로 로그인 가능)
  UPDATE auth.users
  SET email_confirmed_at = NOW()
  WHERE id = NEW.id AND email_confirmed_at IS NULL;
  
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    RETURN NEW;
  WHEN OTHERS THEN
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3-1. 트리거 생성
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 4단계: 기존 사용자 이메일 확인 처리
-- ============================================

UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;

-- ============================================
-- 5단계: 인덱스 생성 (성능 최적화)
-- ============================================

CREATE INDEX IF NOT EXISTS users_email_idx ON public.users(email);
CREATE INDEX IF NOT EXISTS users_learner_level_idx ON public.users(learner_level);

-- ============================================
-- 6단계: 설정 확인
-- ============================================

SELECT 'users 테이블 존재:' AS check_name, 
  EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users') AS result
UNION ALL
SELECT 'RLS 활성화:',
  (SELECT rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'users')::text
UNION ALL
SELECT 'RLS 정책 개수:',
  (SELECT COUNT(*)::text FROM pg_policies WHERE schemaname = 'public' AND tablename = 'users')
UNION ALL
SELECT '트리거 함수 존재:',
  EXISTS (SELECT FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE n.nspname = 'public' AND p.proname = 'handle_new_user')::text
UNION ALL
SELECT '트리거 존재:',
  EXISTS (SELECT FROM information_schema.triggers WHERE event_object_schema = 'auth' AND event_object_table = 'users' AND trigger_name = 'on_auth_user_created')::text;

-- ============================================
-- 완료!
-- ============================================
-- ✅ 데이터베이스 설정 완료
-- ✅ 회원가입 시 자동으로 users 테이블에 레코드 생성
-- ✅ 이메일 인증 없이 바로 로그인 가능
-- ✅ RLS 보안 정책 활성화
--
-- 다음 단계:
-- 1. Supabase Dashboard → Authentication → Providers → Email
-- 2. "Allow new users to sign up" 을 ON으로 설정
-- 3. "Confirm email" 을 OFF로 설정
-- 4. Save 클릭
-- 5. http://localhost:3000/signup 에서 회원가입 테스트
-- ============================================
