-- Clean Code Programming System Tables
-- 중급자 이상을 위한 클린코드 학습 시스템

-- 코드 리뷰 이슈
CREATE TABLE IF NOT EXISTS code_review_issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  code_snippet TEXT NOT NULL,
  language VARCHAR(50) NOT NULL, -- javascript, typescript, python, java
  severity VARCHAR(20) NOT NULL, -- error, warning, info, suggestion
  category VARCHAR(50) NOT NULL, -- naming, structure, complexity, duplication, performance, readability
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  current_code TEXT NOT NULL,
  suggested_code TEXT,
  principle TEXT, -- Clean Code 원칙
  line_number INTEGER,
  is_resolved BOOLEAN DEFAULT false,
  applied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 리팩토링 챌린지
CREATE TABLE IF NOT EXISTS refactoring_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  level VARCHAR(20) NOT NULL, -- beginner, intermediate, advanced
  category VARCHAR(50) NOT NULL, -- naming, structure, complexity, solid, patterns
  time_limit INTEGER, -- seconds
  bad_code TEXT NOT NULL,
  good_code TEXT NOT NULL,
  explanation TEXT NOT NULL,
  principles TEXT[], -- Clean Code 원칙들
  hints TEXT[], -- 단계별 힌트
  steps JSONB, -- 리팩토링 단계들
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 리팩토링 챌린지 완료 기록
CREATE TABLE IF NOT EXISTS refactoring_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES refactoring_challenges(id) ON DELETE CASCADE,
  user_code TEXT NOT NULL,
  time_taken INTEGER NOT NULL, -- seconds
  hints_used INTEGER DEFAULT 0,
  completed_steps TEXT[], -- 완료한 단계 ID들
  score INTEGER, -- 0-100
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, challenge_id, created_at)
);

-- 디자인 패턴 카드
CREATE TABLE IF NOT EXISTS design_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL, -- creational, structural, behavioral, solid
  difficulty VARCHAR(20) NOT NULL, -- easy, medium, hard
  icon VARCHAR(10),
  description TEXT NOT NULL,
  problem TEXT NOT NULL, -- 어떤 문제를 해결하나
  solution TEXT NOT NULL, -- 어떻게 해결하나
  real_world_example TEXT,
  code_before TEXT, -- 패턴 적용 전
  code_after TEXT, -- 패턴 적용 후
  pros TEXT[], -- 장점
  cons TEXT[], -- 단점
  related_patterns TEXT[], -- 관련 패턴들
  use_cases TEXT[], -- 사용 사례
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 디자인 패턴 학습 기록
CREATE TABLE IF NOT EXISTS pattern_mastery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  pattern_id UUID REFERENCES design_patterns(id) ON DELETE CASCADE,
  mastered BOOLEAN DEFAULT false,
  review_count INTEGER DEFAULT 0,
  last_reviewed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, pattern_id)
);

-- 코드 품질 메트릭 기록
CREATE TABLE IF NOT EXISTS code_metrics_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  project_name VARCHAR(255),
  language VARCHAR(50),
  complexity INTEGER, -- 순환 복잡도
  maintainability INTEGER, -- 0-100
  test_coverage INTEGER, -- 0-100
  duplication INTEGER, -- 중복 코드 비율 0-100
  lines_of_code INTEGER,
  comment_lines INTEGER,
  measured_at TIMESTAMPTZ DEFAULT now()
);

-- Clean Code 학습 진행도
CREATE TABLE IF NOT EXISTS clean_code_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total_reviews INTEGER DEFAULT 0,
  issues_resolved INTEGER DEFAULT 0,
  challenges_completed INTEGER DEFAULT 0,
  patterns_mastered INTEGER DEFAULT 0,
  current_level VARCHAR(20) DEFAULT 'beginner', -- beginner, intermediate, advanced, expert
  experience_points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- 클린코드 뱃지
CREATE TABLE IF NOT EXISTS clean_code_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(10),
  category VARCHAR(50), -- reviewer, refactorer, pattern_master, quality_guru
  requirement JSONB, -- 획득 조건
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 사용자 클린코드 뱃지
CREATE TABLE IF NOT EXISTS user_clean_code_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES clean_code_badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_code_review_issues_user ON code_review_issues(user_id);
CREATE INDEX IF NOT EXISTS idx_code_review_issues_severity ON code_review_issues(severity);
CREATE INDEX IF NOT EXISTS idx_code_review_issues_resolved ON code_review_issues(is_resolved);

CREATE INDEX IF NOT EXISTS idx_refactoring_challenges_level ON refactoring_challenges(level);
CREATE INDEX IF NOT EXISTS idx_refactoring_challenges_category ON refactoring_challenges(category);

CREATE INDEX IF NOT EXISTS idx_refactoring_completions_user ON refactoring_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_refactoring_completions_challenge ON refactoring_completions(challenge_id);

CREATE INDEX IF NOT EXISTS idx_design_patterns_category ON design_patterns(category);
CREATE INDEX IF NOT EXISTS idx_design_patterns_difficulty ON design_patterns(difficulty);

CREATE INDEX IF NOT EXISTS idx_pattern_mastery_user ON pattern_mastery(user_id);
CREATE INDEX IF NOT EXISTS idx_pattern_mastery_mastered ON pattern_mastery(mastered);

CREATE INDEX IF NOT EXISTS idx_code_metrics_user ON code_metrics_history(user_id);
CREATE INDEX IF NOT EXISTS idx_code_metrics_date ON code_metrics_history(measured_at);

CREATE INDEX IF NOT EXISTS idx_clean_code_progress_user ON clean_code_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_clean_code_progress_level ON clean_code_progress(current_level);

-- RLS Policies
ALTER TABLE code_review_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE refactoring_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE refactoring_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE pattern_mastery ENABLE ROW LEVEL SECURITY;
ALTER TABLE code_metrics_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE clean_code_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE clean_code_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_clean_code_badges ENABLE ROW LEVEL SECURITY;

-- Code Review Issues Policies
CREATE POLICY "Users can view their own code review issues"
  ON code_review_issues FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own code review issues"
  ON code_review_issues FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own code review issues"
  ON code_review_issues FOR UPDATE
  USING (auth.uid() = user_id);

-- Refactoring Challenges Policies (public read, admin write)
CREATE POLICY "Anyone can view refactoring challenges"
  ON refactoring_challenges FOR SELECT
  TO authenticated
  USING (true);

-- Refactoring Completions Policies
CREATE POLICY "Users can view their own completions"
  ON refactoring_completions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own completions"
  ON refactoring_completions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Design Patterns Policies (public read, admin write)
CREATE POLICY "Anyone can view design patterns"
  ON design_patterns FOR SELECT
  TO authenticated
  USING (true);

-- Pattern Mastery Policies
CREATE POLICY "Users can view their own pattern mastery"
  ON pattern_mastery FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own pattern mastery"
  ON pattern_mastery FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pattern mastery"
  ON pattern_mastery FOR UPDATE
  USING (auth.uid() = user_id);

-- Code Metrics Policies
CREATE POLICY "Users can view their own code metrics"
  ON code_metrics_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own code metrics"
  ON code_metrics_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Clean Code Progress Policies
CREATE POLICY "Users can view their own clean code progress"
  ON clean_code_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own clean code progress"
  ON clean_code_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own clean code progress"
  ON clean_code_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Clean Code Badges Policies
CREATE POLICY "Anyone can view clean code badges"
  ON clean_code_badges FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view their own clean code badges"
  ON user_clean_code_badges FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can earn clean code badges"
  ON user_clean_code_badges FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_clean_code_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_code_review_issues_updated_at
  BEFORE UPDATE ON code_review_issues
  FOR EACH ROW EXECUTE FUNCTION update_clean_code_updated_at();

CREATE TRIGGER update_refactoring_challenges_updated_at
  BEFORE UPDATE ON refactoring_challenges
  FOR EACH ROW EXECUTE FUNCTION update_clean_code_updated_at();

CREATE TRIGGER update_design_patterns_updated_at
  BEFORE UPDATE ON design_patterns
  FOR EACH ROW EXECUTE FUNCTION update_clean_code_updated_at();

CREATE TRIGGER update_pattern_mastery_updated_at
  BEFORE UPDATE ON pattern_mastery
  FOR EACH ROW EXECUTE FUNCTION update_clean_code_updated_at();

CREATE TRIGGER update_clean_code_progress_updated_at
  BEFORE UPDATE ON clean_code_progress
  FOR EACH ROW EXECUTE FUNCTION update_clean_code_updated_at();
