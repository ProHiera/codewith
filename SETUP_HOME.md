# 🏠 집에서 프로젝트 설정하기

## 1. 코드 다운로드

```bash
git clone https://github.com/ProHiera/codewith.git
cd codewith
npm install
```

## 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일 생성:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://yfxmfmafipyjpuxeeosm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmeG1mbWFmaXB5anB1eGVlb3NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MjUwODEsImV4cCI6MjA3ODQwMTA4MX0.FojiO9wHAM-ti_aUTFe2Zki6Y8RvkixQhPSwYdWT9nw
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 3. Supabase 접속 정보

### 웹 대시보드
- **URL**: https://supabase.com
- **프로젝트 ID**: yfxmfmafipyjpuxeeosm
- **프로젝트 URL**: https://yfxmfmafipyjpuxeeosm.supabase.co

### 대시보드에서 할 수 있는 작업

#### 📊 Table Editor
- 모든 테이블 데이터 보기/수정
- 새로운 row 추가/삭제
- 테이블 구조 확인

#### 📝 SQL Editor
```sql
-- 예: 새 테이블 생성
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- RLS 정책 설정
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own notes"
  ON notes FOR SELECT
  USING (auth.uid() = user_id);
```

#### 🔐 Authentication
- 사용자 목록 확인
- 수동으로 사용자 추가/삭제
- OAuth 제공자 설정 (Google, GitHub 등)
- Email 템플릿 수정

#### 🗄️ Database > Policies
- Row Level Security (RLS) 정책 관리
- 테이블별 접근 권한 설정

## 4. 데이터베이스 초기 설정

처음 설정할 때 SQL 실행 순서:

```bash
# Supabase Dashboard > SQL Editor에서 순서대로 실행

1. database/schema.sql        # 기본 테이블 생성
2. database/gamification.sql  # 게임화 기능
3. database/achievements.sql  # 업적 시스템
4. database/new-features.sql  # 추가 기능
5. database/seed.sql          # 샘플 데이터
```

## 5. 로컬 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속

## 6. 주요 체크포인트

### ✅ 확인사항
- [ ] `.env.local` 파일이 프로젝트 루트에 있는가?
- [ ] Supabase 대시보드에서 테이블들이 보이는가?
- [ ] Authentication > Settings에서 Site URL이 `http://localhost:3000`인가?
- [ ] 로그인/회원가입이 정상 작동하는가?

### 🔧 문제 해결

#### "Invalid API key" 에러
- `.env.local` 파일 확인
- 파일명이 정확히 `.env.local`인지 확인
- 개발 서버 재시작 (`npm run dev`)

#### 로그인이 안 됨
1. Supabase Dashboard > Authentication > URL Configuration
2. Site URL: `http://localhost:3000`
3. Redirect URLs에 추가:
   - `http://localhost:3000/auth/callback`

#### 데이터베이스 접근 안 됨
1. Supabase Dashboard > Database > Policies
2. RLS 정책 확인
3. SQL Editor에서 테이블 존재 확인:
   ```sql
   SELECT * FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```

## 7. 추가 팁

### Supabase Studio (로컬)
로컬에서 Supabase를 완전히 독립적으로 실행하려면:

```bash
# Supabase CLI 설치
npm install -g supabase

# 로컬 Supabase 시작
supabase init
supabase start

# 마이그레이션 생성
supabase migration new initial_schema
```

### 환경 분리
개발/프로덕션 환경 분리:

```bash
# .env.local (로컬 개발)
NEXT_PUBLIC_SUPABASE_URL=https://yfxmfmafipyjpuxeeosm.supabase.co

# .env.production (배포용)
NEXT_PUBLIC_SUPABASE_URL=https://your-production-project.supabase.co
```

## 8. 유용한 Supabase 기능

### 실시간 구독
```typescript
// 테이블 변경사항 실시간 감지
supabase
  .channel('notes')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'notes' },
    (payload) => console.log('Change:', payload)
  )
  .subscribe()
```

### Storage (파일 업로드)
```typescript
// 이미지 업로드
const { data, error } = await supabase
  .storage
  .from('avatars')
  .upload('public/avatar1.png', file)
```

### Edge Functions
- Supabase Dashboard > Edge Functions
- 서버리스 함수 작성/배포

## 📚 참고 자료

- Supabase 공식 문서: https://supabase.com/docs
- Next.js + Supabase 가이드: https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs
- SQL 튜토리얼: https://supabase.com/docs/guides/database

---

**중요**: `.env.local` 파일은 절대 Git에 커밋하지 마세요! (이미 `.gitignore`에 포함됨)
