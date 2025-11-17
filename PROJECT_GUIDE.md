# 🎓 AI 기반 홈스쿨링 학습 플랫폼

> **재미있고 효과적인 학습 경험을 제공하는 AI 기반 게임화 학습 플랫폼**

![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)

---

## ✨ 주요 기능

### 🎯 **핵심 학습 컴포넌트**

#### 📝 LearningCard - 스마트 학습 카드
- **암기/참고 영역 색상 구분**: 외워야 할 부분은 노란색, 참고용은 파란색
- **카드 뒤집기 애니메이션**: 문제-답변 형식으로 학습
- **암기 완료 체크**: 학습 진행도 추적
- **난이도 표시**: Easy/Medium/Hard 레벨링

```tsx
<LearningCard
  title="useState Hook 기본"
  type="memorize"  // memorize | reference | practice
  tags={['React', 'Hooks']}
  difficulty="medium"
  frontContent={/* 문제 */}
  backContent={/* 답변 */}
  onMastered={() => console.log('Mastered!')}
/>
```

#### 💡 HintPanel - 반짝이는 힌트 시스템
- **3단계 힌트 시스템**: 가벼운 힌트 → 중간 힌트 → 거의 정답
- **반짝이는 애니메이션**: 사용자 주의를 끄는 시각 효과
- **학습 점수에 영향 없음**: 부담 없이 힌트 사용 가능

```tsx
<HintPanel
  hints={[
    { id: '1', level: 1, content: '기본 힌트' },
    { id: '2', level: 2, content: '중간 힌트' },
    { id: '3', level: 3, content: '상세 힌트' },
  ]}
  autoShow={true}  // 자동으로 3초 후 표시
  onHintReveal={(hintId, level) => {}}
/>
```

#### ⭐ QuizPopup - 깜짝 퀴즈 알림
- **랜덤 타이밍 출현**: 학습 중 예상치 못한 시점에 등장
- **아름다운 애니메이션**: 부드러운 모달 전환 효과
- **즉시 피드백**: 정답/오답 실시간 표시
- **AI 생성 설명**: 틀린 문제에 대한 상세 설명

```tsx
<QuizPopup
  quiz={{
    question: "React Hook의 반환값은?",
    options: ['값만', '배열', '객체', '함수'],
    correctAnswer: 1,
    explanation: "useState는 [값, 설정함수] 배열을 반환합니다."
  }}
  onAnswer={(id, isCorrect) => {}}
  onClose={() => {}}
/>
```

---

### 🎮 **게임화 & 인터랙션**

#### 🎯 HooksGameCard - React Hooks 드래그 게임
- **드래그 앤 드롭 인터페이스**: Framer Motion 기반 부드러운 UX
- **실시간 정답 체크**: 드롭할 때마다 즉시 피드백
- **점수 시스템**: 정확도에 따른 점수 계산
- **재시도 가능**: 완료 후 다시 도전 가능

```tsx
<HooksGameCard
  availableHooks={[
    { id: '1', name: 'useState', emoji: '📦', description: '상태 관리' },
    { id: '2', name: 'useEffect', emoji: '⚡', description: '부수 효과' },
  ]}
  dropZones={[
    { id: 'z1', label: '컴포넌트 상태 관리', acceptedHooks: ['useState'] },
  ]}
  onComplete={(score) => console.log(score)}
/>
```

#### 📊 ProgressAnimation - 학습 진행 애니메이션
- **부드러운 카운트업**: 숫자가 부드럽게 증가하는 효과
- **프로그레스 바**: 반짝이는 진행 막대
- **레벨업 축하**: 레벨 달성 시 화려한 애니메이션

```tsx
<ProgressAnimation
  value={350}
  maxValue={500}
  label="현재 레벨 XP"
  icon="⭐"
  color="purple"  // indigo | green | purple | orange | pink | blue
  showPercentage={true}
  animated={true}
/>

{/* 레벨업 카드 */}
<LevelUpCard
  level={5}
  rewards={['새로운 배지 획득', '특별 미션 해금']}
  onClose={() => {}}
/>
```

---

### 🤖 **AI 통합 기능**

#### 💬 AIAssistant - AI 학습 도우미
- **실시간 대화**: OpenAI GPT-4o-mini 기반
- **학습 맥락 이해**: 현재 학습 주제 기반 답변
- **대화 기록 저장**: Supabase에 자동 저장
- **빠른 제안**: 자주 묻는 질문 템플릿

```tsx
<AIAssistant
  onSendMessage={async (message) => {
    const response = await fetch('/api/ai/assistant', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
    return response.json();
  }}
  position="bottom-right"  // bottom-right | bottom-left | sidebar
/>
```

#### 📄 AISummaryCard - AI 생성 요약
- **자동 요약 생성**: 학습 내용을 2-3문장으로 압축
- **핵심 포인트 추출**: 중요한 부분만 하이라이트
- **재생성 기능**: 원하는 스타일로 다시 생성

```tsx
<AISummaryCard
  topic="React Hooks"
  summary="useState는 함수형 컴포넌트에서 상태를 관리..."
  keyPoints={[
    '배열 구조 분해 사용',
    '초기값 필수',
    '리렌더링 트리거',
  ]}
  onRegenerate={() => {}}
/>
```

---

### 👥 **커뮤니티 기능**

#### 📝 CommunityPost - 학습 노트 공유
- **AI 자동 요약**: 게시글 작성 시 자동으로 요약 생성
- **카테고리 시스템**: 노트/질문/토론/프로젝트 구분
- **좋아요/댓글**: 실시간 카운트 업데이트
- **태그 시스템**: 관련 주제로 필터링

```tsx
<CommunityPost
  post={{
    title: "React Hooks 완벽 정리",
    content: "useState, useEffect 등...",
    category: "note",  // note | question | discussion | showcase
    tags: ['React', 'Hooks'],
    aiSummary: "React Hooks 사용법 정리",
    likes: 42,
    comments: 8,
  }}
  onLike={(postId) => {}}
  onComment={(postId) => {}}
/>
```

#### 💬 DiscussionThread - 댓글 스레드
- **중첩 댓글**: 대댓글 지원
- **실시간 업데이트**: 새 댓글 즉시 표시
- **댓글 좋아요**: 유용한 댓글 하이라이트

```tsx
<DiscussionThread
  postId="post-123"
  comments={[...]}
  onAddComment={(content) => {}}
/>
```

#### 🔗 NoteShare - 노트 공유 카드
- **암기 완료 통계**: 몇 개 암기했는지 표시
- **한 번에 공유**: 버튼 클릭으로 커뮤니티 게시

```tsx
<NoteShare
  note={{
    title: "JavaScript 핵심 개념",
    content: "클로저, 프로토타입, 비동기...",
    tags: ['JavaScript'],
    masteredCount: 8,
  }}
  onShare={() => {}}
/>
```

---

## 🏗️ **기술 스택**

### Frontend
- **Next.js 16** - App Router, Server Components
- **React 19.2** - Latest features
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Modern styling
- **Framer Motion** - Smooth animations
- **React Query** - (예정) Data fetching & caching

### Backend & Database
- **Supabase** - Auth, Database, Storage
- **PostgreSQL** - Relational database
- **Row Level Security** - Fine-grained access control

### AI Integration
- **OpenAI GPT-4o-mini** - Chat, summarization, quiz generation

---

## 📁 **프로젝트 구조**

```
dev-learning-platform/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── ai/
│   │   │   └── assistant/        # AI 챗봇
│   │   ├── learning/
│   │   │   └── cards/            # 학습 카드 CRUD
│   │   ├── quiz/                 # 퀴즈 제출 & 채점
│   │   └── community/
│   │       └── posts/            # 커뮤니티 게시글
│   ├── learning-hub/             # 통합 학습 허브
│   ├── dashboard/                # 메인 대시보드
│   └── ...
├── components/                   # React 컴포넌트
│   ├── LearningCard.tsx          # 학습 카드
│   ├── HintPanel.tsx             # 힌트 패널
│   ├── QuizPopup.tsx             # 퀴즈 팝업
│   ├── HooksGameCard.tsx         # Hooks 게임
│   ├── ProgressAnimation.tsx     # 진행도 애니메이션
│   ├── AIAssistant.tsx           # AI 도우미
│   ├── CommunityPost.tsx         # 커뮤니티 포스트
│   └── ...
├── database/                     # Database schemas
│   ├── schema.sql                # 기본 스키마
│   ├── extended-schema.sql       # 확장 스키마
│   └── seed.sql                  # 샘플 데이터
├── types/                        # TypeScript types
│   ├── index.ts                  # 기본 타입
│   └── extended.ts               # 확장 타입
└── lib/                          # Utilities
    └── supabase/
        ├── client.ts             # Client-side Supabase
        └── server.ts             # Server-side Supabase
```

---

## 🚀 **시작하기**

### 1. 환경 설정

```bash
# 저장소 클론
git clone <repository-url>
cd dev-learning-platform

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
```

### 2. 환경 변수 (.env.local)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key
```

### 3. 데이터베이스 설정

Supabase SQL Editor에서 다음 파일들을 순서대로 실행:

```bash
1. database/schema.sql           # 기본 테이블
2. database/gamification.sql     # 게임화 테이블
3. database/extended-schema.sql  # 학습 카드, 커뮤니티 등
4. database/seed.sql             # 샘플 데이터 (선택사항)
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 📊 **데이터베이스 스키마**

### 주요 테이블

#### `learning_cards` - 학습 카드
```sql
- id, user_id, title, type (memorize/reference/practice)
- front_content, back_content, tags[], difficulty
- is_mastered, mastered_at
```

#### `quiz_questions` - 퀴즈 문제
```sql
- id, mission_id, question, options (JSONB)
- correct_answer, explanation, difficulty
```

#### `quiz_results` - 퀴즈 결과
```sql
- id, user_id, question_id, selected_answer
- is_correct, time_spent
```

#### `community_posts` - 커뮤니티 게시글
```sql
- id, user_id, title, content, category
- tags[], ai_summary, likes_count, comments_count
```

#### `user_progress` - 학습 진행도
```sql
- id, user_id, current_level, total_xp
- streak_days, last_study_date
```

---

## 🎨 **디자인 시스템**

### 색상 팔레트

- **암기 (Memorize)**: Yellow/Orange 계열
  - `bg-yellow-50`, `border-yellow-400`, `text-yellow-700`

- **참고 (Reference)**: Blue/Slate 계열
  - `bg-blue-50`, `border-blue-300`, `text-blue-700`

- **연습 (Practice)**: Purple/Pink 계열
  - `bg-purple-50`, `border-purple-300`, `text-purple-700`

### 애니메이션 원칙

- **입장**: `opacity: 0 → 1`, `y: 20 → 0`
- **호버**: `scale: 1 → 1.05`
- **탭**: `scale: 1 → 0.95`
- **전환**: `300-500ms ease-out`

---

## 🔌 **API 엔드포인트**

### AI
- `POST /api/ai/assistant` - AI 챗봇 대화
- `GET /api/ai/assistant` - 대화 기록 조회

### 학습
- `POST /api/learning/cards` - 학습 카드 생성
- `GET /api/learning/cards?type=memorize` - 카드 조회

### 퀴즈
- `POST /api/quiz` - 퀴즈 제출
- `GET /api/quiz?difficulty=medium` - 퀴즈 조회

### 커뮤니티
- `POST /api/community/posts` - 게시글 작성
- `GET /api/community/posts?category=note` - 게시글 조회
- `POST /api/community/posts/[id]/like` - 좋아요 토글
- `POST /api/community/posts/[id]/comments` - 댓글 작성

---

## 🎯 **다음 단계**

### Phase 2 계획
- [ ] 학습 경로 (Learning Paths)
- [ ] 실시간 알림 시스템
- [ ] 소셜 학습 기능 (친구, 그룹 스터디)
- [ ] 모바일 앱 (React Native)
- [ ] 오프라인 모드
- [ ] 음성 인식 학습

### 개선 사항
- [ ] React Query 통합
- [ ] E2E 테스트 (Playwright)
- [ ] 성능 최적화
- [ ] PWA 지원
- [ ] 다크 모드

---

## 👨‍💻 **기여하기**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 **라이선스**

MIT License

---

## 💡 **컨셉 & 철학**

> **"학습은 게임처럼 재미있어야 하고, AI는 선생님처럼 친절해야 합니다."**

이 플랫폼은 다음 원칙을 따릅니다:

1. **짧고 집중된 학습**: 한 번에 하나의 개념
2. **즉시 피드백**: 틀려도 바로 배움
3. **게임화**: 점수, 레벨, 배지로 동기부여
4. **AI 지원**: 막힐 때마다 도움받기
5. **커뮤니티**: 함께 배우고 성장하기

---

**Made with ❤️ and ☕ by the CodeWith Team**
