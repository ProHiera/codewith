# 배포 환경 변수 설정 가이드

## ⚠️ 중요: 환경 변수 보안

`.env.local` 파일은 **절대 Git에 커밋하면 안 됩니다!**
- `.gitignore`에 `.env*`가 포함되어 있어 자동으로 무시됩니다
- API 키가 유출되면 보안 문제와 비용 발생 위험이 있습니다

## 🚀 배포 플랫폼별 환경 변수 설정

### 1. Vercel (권장)

#### 방법 1: Dashboard에서 설정
1. Vercel 프로젝트 → Settings → Environment Variables
2. 다음 변수들을 추가:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
   OPENAI_API_KEY = sk-your-key (선택사항)
   ```
3. Environment: Production, Preview, Development 모두 체크
4. Save → Redeploy

#### 방법 2: CLI로 설정
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
# 값 입력 후 엔터
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# 값 입력 후 엔터
```

### 2. Netlify

1. Site settings → Build & deploy → Environment
2. Environment variables → Add a variable
3. Key-Value 쌍으로 추가:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   OPENAI_API_KEY
   ```
4. Save → Trigger deploy

### 3. Railway

1. 프로젝트 선택 → Variables 탭
2. New Variable 클릭
3. 환경 변수 추가:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   OPENAI_API_KEY
   ```
4. Deploy

### 4. AWS Amplify

1. App settings → Environment variables
2. Manage variables → Add variable
3. 변수 추가 후 Save
4. Redeploy

## 📝 환경 변수 목록

### 필수 (Supabase 사용 시)
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase public anon key

### 선택 (AI 기능 사용 시)
- `OPENAI_API_KEY`: OpenAI API 키

## 🔒 보안 체크리스트

- [ ] `.env.local` 파일이 `.gitignore`에 포함되어 있는지 확인
- [ ] Git 히스토리에 API 키가 노출되지 않았는지 확인
- [ ] 배포 플랫폼에 환경 변수 설정 완료
- [ ] 로컬과 배포 환경의 환경 변수가 다른지 확인 (같은 키 사용 가능하지만 프로젝트 분리 권장)

## 🧪 배포 전 테스트

로컬에서 프로덕션 빌드 테스트:
```bash
npm run build
npm start
```

환경 변수가 제대로 로드되는지 확인 후 배포하세요!

## 💡 팁

1. **개발/프로덕션 환경 분리**
   - 로컬 개발: 테스트용 Supabase 프로젝트
   - 프로덕션: 실제 서비스용 Supabase 프로젝트

2. **환경 변수 백업**
   - 팀원과 공유할 때는 안전한 방법 사용 (1Password, LastPass 등)
   - Slack/이메일로 API 키 공유 금지

3. **키 순환**
   - 정기적으로 API 키 갱신
   - 유출 의심 시 즉시 키 재발급
