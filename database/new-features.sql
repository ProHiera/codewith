-- 사용자 테이블에 학습 레벨 추가
ALTER TABLE users ADD COLUMN IF NOT EXISTS learner_level TEXT DEFAULT 'beginner';

-- 레벨 체크 제약 조건
ALTER TABLE users ADD CONSTRAINT check_learner_level 
  CHECK (learner_level IN ('beginner', 'elementary', 'intermediate', 'advanced', 'professional'));

-- 새로운 기능 테이블들

-- 1. 클론 코딩 프로젝트
CREATE TABLE IF NOT EXISTS clone_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  target_url TEXT,
  thumbnail_url TEXT,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'elementary', 'intermediate', 'advanced')),
  sections JSONB, -- 섹션별 체크리스트
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. JS 개념 스냅 (개념 설명 카드)
CREATE TABLE IF NOT EXISTS concept_snaps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT, -- 'expression', 'this', 'async', etc.
  level TEXT,
  cards JSONB, -- 단계별 설명 카드
  alternatives JSONB, -- 대체 표현
  examples JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. 비동기 흐름 시뮬레이션 기록
CREATE TABLE IF NOT EXISTS async_simulations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  code TEXT,
  steps JSONB, -- 애니메이션 단계
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. API 샌드박스 프로젝트
CREATE TABLE IF NOT EXISTS api_sandboxes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  base_url TEXT,
  headers JSONB, -- 토큰 등
  endpoints JSONB, -- API 엔드포인트 목록
  mock_data JSONB, -- 가짜 서버 데이터
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 5. DB 스키마 프로젝트
CREATE TABLE IF NOT EXISTS db_schemas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  requirements TEXT, -- 요구사항
  tables JSONB, -- 테이블 정의
  indexes JSONB, -- 인덱스 정의
  ddl TEXT, -- 생성된 DDL
  sample_data JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 6. 커밋/PR 제안
CREATE TABLE IF NOT EXISTS commit_suggestions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  changes TEXT, -- 변경 내용
  conventional_commit TEXT, -- 제안된 커밋 메시지
  pr_template TEXT, -- PR 템플릿
  created_at TIMESTAMP DEFAULT NOW()
);

-- 7. 학습 레이더 (취약 개념 추적)
CREATE TABLE IF NOT EXISTS learning_radar (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  concept TEXT NOT NULL,
  strength INTEGER DEFAULT 0, -- 0-100
  last_practiced TIMESTAMP,
  repeat_cycle INTEGER DEFAULT 1, -- 복습 주기 (일)
  next_review TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 8. 면접 리허설
CREATE TABLE IF NOT EXISTS interview_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT, -- 'frontend', 'backend', 'database', etc.
  level TEXT,
  question TEXT NOT NULL,
  model_answer TEXT,
  traps JSONB, -- 함정 포인트
  practice_links JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS interview_practices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  question_id UUID REFERENCES interview_questions(id),
  user_answer TEXT,
  feedback TEXT,
  score INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 9. 러닝 경로 프리셋
CREATE TABLE IF NOT EXISTS learning_paths (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  duration_weeks INTEGER,
  level TEXT,
  curriculum JSONB, -- 주차별 커리큘럼
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_learning_paths (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  path_id UUID REFERENCES learning_paths(id),
  current_week INTEGER DEFAULT 1,
  progress INTEGER DEFAULT 0,
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- 10. 실무 패턴 프로젝트
CREATE TABLE IF NOT EXISTS pattern_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  pattern_type TEXT, -- 'mvc', 'repository', 'service', etc.
  code JSONB, -- 생성된 코드
  tests JSONB, -- 테스트 코드
  created_at TIMESTAMP DEFAULT NOW()
);

-- 11. 접근성 검사 결과
CREATE TABLE IF NOT EXISTS accessibility_checks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  url TEXT,
  issues JSONB, -- 발견된 문제
  fixes JSONB, -- 수정 제안
  pr_patch TEXT, -- PR 패치
  created_at TIMESTAMP DEFAULT NOW()
);

-- 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_clone_projects_user ON clone_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_async_simulations_user ON async_simulations(user_id);
CREATE INDEX IF NOT EXISTS idx_api_sandboxes_user ON api_sandboxes(user_id);
CREATE INDEX IF NOT EXISTS idx_db_schemas_user ON db_schemas(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_radar_user ON learning_radar(user_id);
CREATE INDEX IF NOT EXISTS idx_interview_practices_user ON interview_practices(user_id);
CREATE INDEX IF NOT EXISTS idx_user_learning_paths_user ON user_learning_paths(user_id);

-- RLS 정책
ALTER TABLE clone_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE async_simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_sandboxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE db_schemas ENABLE ROW LEVEL SECURITY;
ALTER TABLE commit_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_radar ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_practices ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE pattern_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE accessibility_checks ENABLE ROW LEVEL SECURITY;

-- 각 테이블에 대한 정책
CREATE POLICY "Users can view own clone projects" ON clone_projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own clone projects" ON clone_projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own clone projects" ON clone_projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own clone projects" ON clone_projects FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own async simulations" ON async_simulations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own async simulations" ON async_simulations FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own API sandboxes" ON api_sandboxes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own API sandboxes" ON api_sandboxes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own API sandboxes" ON api_sandboxes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own API sandboxes" ON api_sandboxes FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own DB schemas" ON db_schemas FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own DB schemas" ON db_schemas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own DB schemas" ON db_schemas FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own DB schemas" ON db_schemas FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own learning radar" ON learning_radar FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own learning radar" ON learning_radar FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own learning radar" ON learning_radar FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own interview practices" ON interview_practices FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own interview practices" ON interview_practices FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own learning paths" ON user_learning_paths FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own learning paths" ON user_learning_paths FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own learning paths" ON user_learning_paths FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own pattern projects" ON pattern_projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own pattern projects" ON pattern_projects FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own accessibility checks" ON accessibility_checks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own accessibility checks" ON accessibility_checks FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 공개 읽기 정책 (모든 사용자가 볼 수 있는 데이터)
CREATE POLICY "Anyone can view concept snaps" ON concept_snaps FOR SELECT USING (true);
CREATE POLICY "Anyone can view interview questions" ON interview_questions FOR SELECT USING (true);
CREATE POLICY "Anyone can view learning paths" ON learning_paths FOR SELECT USING (true);
