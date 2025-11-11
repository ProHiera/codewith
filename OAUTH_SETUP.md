# OAuth 로그인 설정 가이드

## 🔐 현재 프로젝트 상황

- **프로젝트 URL (개발)**: http://localhost:3000
- **Supabase URL**: `.env.local` 파일의 `NEXT_PUBLIC_SUPABASE_URL` 확인
- **OAuth 콜백 경로**: `/auth/callback`
- **로그인 성공 후 이동**: `/dashboard`

---

## 📋 사전 준비

1. **Supabase 프로젝트 정보 확인**
   ```bash
   # .env.local 파일 열기
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   ```
   
2. **프로젝트 참조 ID 확인**
   - Supabase URL에서 `https://` 뒤에 나오는 부분
   - 예: `xxxxxxxxxxxxx.supabase.co` → `xxxxxxxxxxxxx`가 프로젝트 참조 ID

---

## 1️⃣ Google OAuth 설정 (상세 가이드)

### Step 1: Google Cloud Console 접속

1. **브라우저에서 접속**
   - https://console.cloud.google.com/

2. **Google 계정으로 로그인**

### Step 2: 새 프로젝트 생성

1. **상단 드롭다운에서 "새 프로젝트" 클릭**
   
2. **프로젝트 정보 입력**
   - 프로젝트 이름: `dev-learning-platform` (또는 원하는 이름)
   - 위치: 조직 없음 (개인 프로젝트)
   - "만들기" 클릭

3. **프로젝트 선택**
   - 생성된 프로젝트가 자동 선택되었는지 확인

### Step 3: OAuth 동의 화면 구성

1. **좌측 메뉴에서 "APIs & Services" → "OAuth 동의 화면" 클릭**

2. **User Type 선택**
   - ✅ **External** 선택 (외부 사용자도 로그인 가능)
   - "만들기" 클릭

3. **앱 정보 입력**
   - **앱 이름**: `개발 학습 플랫폼`
   - **사용자 지원 이메일**: 본인 Gmail 주소
   - **앱 로고**: (선택사항) 나중에 추가 가능
   - **앱 도메인**: 
     - 애플리케이션 홈페이지: `http://localhost:3000` (개발용)
   - **승인된 도메인**: (지금은 비워둠, 배포 후 추가)
   - **개발자 연락처 이메일**: 본인 Gmail 주소
   - "저장 후 계속" 클릭

4. **범위(Scopes) 설정**
   - "저장 후 계속" 클릭 (기본값 사용)

5. **테스트 사용자 추가** (개발 단계에서 필요)
   - "+ ADD USERS" 클릭
   - 테스트할 Gmail 주소 입력
   - "저장 후 계속" 클릭

6. **요약 확인 후 "대시보드로 돌아가기"**

### Step 4: OAuth 2.0 클라이언트 ID 생성 ⭐

1. **좌측 메뉴에서 "사용자 인증 정보(Credentials)" 클릭**

2. **상단의 "+ CREATE CREDENTIALS" 클릭**
   - "OAuth 클라이언트 ID" 선택

3. **애플리케이션 유형 선택**
   - ✅ **웹 애플리케이션** 선택

4. **클라이언트 정보 입력**
   - **이름**: `Dev Learning Platform Web Client`

5. **승인된 JavaScript 원본 추가** ⚠️ 중요!
   - "+ URI 추가" 클릭
   - 입력: `http://localhost:3000`
   - 입력: `http://localhost:3001` (다른 포트 사용 시 대비)

6. **승인된 리디렉션 URI 추가** ⚠️ 가장 중요!
   - "+ URI 추가" 클릭
   - 입력 형식: `https://<YOUR_PROJECT_REF>.supabase.co/auth/v1/callback`
   - **실제 예시**: 
     ```
     https://abcdefghijklmnop.supabase.co/auth/v1/callback
     ```
   - ⚠️ `.env.local`의 `NEXT_PUBLIC_SUPABASE_URL` 값을 복사해서 `/auth/v1/callback` 추가!

7. **"만들기" 클릭**

8. **팝업에서 Client ID와 Client Secret 복사** 📋
   ```
   Client ID: 123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com
   Client Secret: GOCSPX-abcdefghijklmnopqrstuvwx
   ```
   - ⚠️ 이 값들을 메모장에 임시 저장!

### Step 5: Supabase에 Google 설정 등록

1. **Supabase Dashboard 접속**
   - https://supabase.com/dashboard
   - 본인 프로젝트 선택

2. **Authentication → Providers 이동**
   - 좌측 메뉴에서 "Authentication" 클릭
   - "Providers" 탭 클릭

3. **Google 제공자 활성화**
   - "Google" 찾기
   - 토글 스위치 ON (Enable Sign in with Google)

4. **Client ID와 Client Secret 입력**
   - **Client ID (for OAuth)**: 위에서 복사한 Client ID 붙여넣기
   - **Client Secret (for OAuth)**: 위에서 복사한 Client Secret 붙여넣기

5. **"Save" 클릭** ✅

### Step 6: 테스트

1. **개발 서버 실행 중인지 확인**
   ```bash
   npm run dev
   ```

2. **브라우저에서 접속**
   - http://localhost:3000/login

3. **"Google로 계속하기" 버튼 클릭**
   - Google 로그인 화면으로 리디렉션
   - 테스트 사용자로 로그인
   - 권한 동의
   - `/dashboard`로 자동 이동 확인! ✅

---

## 2️⃣ GitHub OAuth 설정 (상세 가이드)

### Step 1: GitHub Developer Settings 접속

1. **GitHub 로그인 후 Settings 이동**
   - https://github.com/settings/developers
   - 또는: GitHub 프로필 → Settings → Developer settings

### Step 2: OAuth App 생성

1. **"OAuth Apps" 클릭**

2. **"New OAuth App" 버튼 클릭**

3. **애플리케이션 정보 입력**
   - **Application name**: `개발 학습 플랫폼`
   - **Homepage URL**: `http://localhost:3000`
   - **Application description**: `CSS 스피드런과 AI 코치가 있는 개발 학습 플랫폼` (선택사항)
   - **Authorization callback URL** ⚠️ 중요!:
     ```
     https://<YOUR_PROJECT_REF>.supabase.co/auth/v1/callback
     ```
     예시: `https://abcdefghijklmnop.supabase.co/auth/v1/callback`

4. **"Register application" 클릭**

### Step 3: Client ID와 Secret 확인

1. **생성된 앱 페이지에서 확인**
   - **Client ID**: 자동으로 표시됨
     ```
     예: Iv1.1234567890abcdef
     ```
   - 복사해서 메모장에 저장

2. **Client Secret 생성**
   - "Generate a new client secret" 버튼 클릭
   - ⚠️ **생성된 Secret은 지금만 볼 수 있으니 바로 복사!**
     ```
     예: 1234567890abcdef1234567890abcdef12345678
     ```

### Step 4: Supabase에 GitHub 설정 등록

1. **Supabase Dashboard → Authentication → Providers**

2. **GitHub 제공자 활성화**
   - "GitHub" 찾기
   - 토글 ON

3. **Client ID와 Client Secret 입력**
   - **Client ID**: GitHub에서 복사한 Client ID
   - **Client Secret**: GitHub에서 복사한 Client Secret

4. **"Save" 클릭** ✅

### Step 5: 테스트

1. http://localhost:3000/login 접속
2. "GitHub로 계속하기" 클릭
3. GitHub 권한 승인
4. `/dashboard`로 리디렉션 확인! ✅

---

## 3️⃣ Kakao OAuth 설정 (상세 가이드)

### Step 1: Kakao Developers 접속

1. **카카오 개발자 사이트 접속**
   - https://developers.kakao.com/

2. **카카오 계정으로 로그인**

### Step 2: 애플리케이션 생성

1. **"내 애플리케이션" 메뉴 클릭**

2. **"애플리케이션 추가하기" 버튼 클릭**

3. **앱 정보 입력**
   - **앱 이름**: `개발 학습 플랫폼`
   - **사업자명**: 개인 이름 입력
   - **카테고리**: "교육" 선택

4. **"저장" 클릭**

### Step 3: 플랫폼 설정

1. **생성된 앱 클릭 → "앱 설정" → "플랫폼"**

2. **"Web 플랫폼 등록" 클릭**

3. **사이트 도메인 입력**
   - `http://localhost:3000`
   - "저장" 클릭

### Step 4: 카카오 로그인 활성화 및 Redirect URI 설정 ⭐

1. **좌측 메뉴 "제품 설정" → "카카오 로그인" 클릭**

2. **"카카오 로그인 활성화" ON**

3. **"Redirect URI 등록" 섹션에서 "+ Redirect URI 등록" 클릭**

4. **Redirect URI 입력** ⚠️ 중요!
   ```
   https://<YOUR_PROJECT_REF>.supabase.co/auth/v1/callback
   ```
   예시: `https://abcdefghijklmnop.supabase.co/auth/v1/callback`

5. **"저장" 클릭**

### Step 5: 동의 항목 설정

1. **"제품 설정" → "카카오 로그인" → "동의 항목" 탭**

2. **필수 동의 항목 설정**
   - 닉네임: 필수 동의 (선택)
   - 프로필 사진: 필수 동의 (선택)
   - 카카오계정(이메일): 필수 동의 ✅ (반드시 설정!)

### Step 6: REST API 키 및 Client Secret 확인

1. **"앱 설정" → "앱 키" 메뉴**

2. **REST API 키 복사** 📋
   ```
   예: 1234567890abcdef1234567890abcdef
   ```
   - ⚠️ 이것이 Supabase의 **Client ID**로 사용됨!

3. **"제품 설정" → "카카오 로그인" → "보안" 탭**

4. **Client Secret 코드 생성**
   - "Client Secret" 섹션에서 "코드 생성" 클릭
   - **생성된 코드 복사** 📋
   - **"활성화 상태" 토글 ON** ⚠️ 반드시!

### Step 7: Supabase에 Kakao 설정 등록

1. **Supabase Dashboard → Authentication → Providers**

2. **Kakao 제공자 활성화**
   - "Kakao" 찾기
   - 토글 ON

3. **Client ID와 Client Secret 입력**
   - **Client ID**: 카카오의 **REST API 키**
   - **Client Secret**: 카카오에서 생성한 **Client Secret 코드**

4. **"Save" 클릭** ✅

### Step 8: 테스트

1. http://localhost:3000/login 접속
2. "Kakao로 계속하기" 클릭
3. 카카오 로그인 및 동의
4. `/dashboard`로 리디렉션 확인! ✅

---

## ✅ 설정 완료 후 테스트

1. **개발 서버 실행**
   ```bash
   npm run dev
   ```

2. **로그인 페이지 접속**
   - http://localhost:3000/login

3. **각 OAuth 버튼 클릭 및 로그인 테스트**
   - Google로 계속하기
   - GitHub로 계속하기
   - Kakao로 계속하기

4. **성공 시 자동으로 대시보드로 리디렉션**
   - http://localhost:3000/dashboard

---

## 🔧 환경 변수

`.env.local` 파일에 이미 설정된 Supabase 환경 변수만 있으면 됩니다:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**⚠️ 중요**: `.env.local` 파일을 열어 `NEXT_PUBLIC_SUPABASE_URL` 값을 확인하세요!
- 예: `https://abcdefghijklmnop.supabase.co`
- 이 URL에 `/auth/v1/callback`을 붙인 것이 모든 OAuth Redirect URI입니다!

---

## ✅ 빠른 체크리스트

### Google 설정 완료 확인
- [ ] Google Cloud Console에서 프로젝트 생성
- [ ] OAuth 동의 화면 구성 (External)
- [ ] 테스트 사용자 추가
- [ ] OAuth 클라이언트 ID 생성 (웹 애플리케이션)
- [ ] 승인된 리디렉션 URI에 `https://xxxxx.supabase.co/auth/v1/callback` 추가
- [ ] Client ID와 Client Secret 복사
- [ ] Supabase에서 Google 제공자 활성화
- [ ] Client ID/Secret 입력 및 저장
- [ ] 로그인 테스트 성공

### GitHub 설정 완료 확인
- [ ] GitHub OAuth App 생성
- [ ] Authorization callback URL에 `https://xxxxx.supabase.co/auth/v1/callback` 설정
- [ ] Client Secret 생성 및 복사 (한 번만 보임!)
- [ ] Supabase에서 GitHub 제공자 활성화
- [ ] Client ID/Secret 입력 및 저장
- [ ] 로그인 테스트 성공

### Kakao 설정 완료 확인
- [ ] Kakao Developers에서 앱 생성
- [ ] Web 플랫폼 등록 (localhost:3000)
- [ ] 카카오 로그인 활성화
- [ ] Redirect URI에 `https://xxxxx.supabase.co/auth/v1/callback` 등록
- [ ] 동의 항목 설정 (이메일 필수)
- [ ] REST API 키 복사 (Client ID로 사용)
- [ ] Client Secret 생성 및 **활성화 상태 ON**
- [ ] Supabase에서 Kakao 제공자 활성화
- [ ] REST API 키(Client ID)/Client Secret 입력 및 저장
- [ ] 로그인 테스트 성공

---

## 🎯 현재 코드의 OAuth 플로우 설명

### 1단계: 사용자가 OAuth 버튼 클릭
```tsx
// app/login/page.tsx 또는 app/signup/page.tsx (116-127줄)
<button onClick={() => handleOAuthLogin('google')}>
  <svg>...</svg>
  Google로 계속하기
</button>
```

### 2단계: handleOAuthLogin 함수 실행
```tsx
// app/login/page.tsx (41-59줄)
const handleOAuthLogin = async (provider: 'google' | 'github' | 'kakao') => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      // 개발 환경: http://localhost:3000/auth/callback
      // 프로덕션: https://your-domain.com/auth/callback
    },
  });
  
  if (error && error.message.includes('not enabled')) {
    // ⚠️ 현재 보고 있는 에러 메시지!
    setError(`${provider.toUpperCase()} 로그인이 아직 설정되지 않았습니다. 
             OAUTH_SETUP.md 파일을 참고하여 Supabase Dashboard에서 
             ${provider} 제공자를 활성화해주세요.`);
  }
};
```

### 3단계: OAuth 제공자 페이지로 리디렉션
- Supabase가 자동으로 Google/GitHub/Kakao 로그인 페이지로 리디렉션
- 사용자가 로그인 및 권한 동의

### 4단계: Supabase 콜백 URL로 리디렉션
```
https://xxxxx.supabase.co/auth/v1/callback?code=인증코드...
```
- Supabase가 OAuth 제공자로부터 인증 정보 받음
- 검증 후 다시 앱의 `/auth/callback`으로 리디렉션

### 5단계: 앱의 콜백 라우트가 세션 생성
```tsx
// app/auth/callback/route.ts (전체 파일)
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
    // ✅ 인증 코드를 실제 로그인 세션으로 변환!
  }

  // ✅ 로그인 완료! 대시보드로 이동
  return NextResponse.redirect(new URL('/dashboard', requestUrl.origin));
}
```

### 6단계: 대시보드 접속 완료! 🎉
- 사용자 정보가 자동으로 `auth.users` 테이블에 저장됨
- 이메일, 이름 등이 OAuth 제공자에서 자동으로 가져와짐

---

## 📸 각 단계별 설정 화면 예시

### `.env.local` 파일 예시
```env
# 프로젝트 루트의 .env.local 파일
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ⬆️ 이 URL을 복사해서 OAuth Redirect URI에 사용!
# https://abcdefghijklmnop.supabase.co/auth/v1/callback
```

### Google Cloud Console - Redirect URI 설정
```
승인된 리디렉션 URI:
┌─────────────────────────────────────────────────────────────┐
│ https://abcdefghijklmnop.supabase.co/auth/v1/callback     │  
└─────────────────────────────────────────────────────────────┘
```

### GitHub - Callback URL 설정
```
Authorization callback URL:
┌─────────────────────────────────────────────────────────────┐
│ https://abcdefghijklmnop.supabase.co/auth/v1/callback     │
└─────────────────────────────────────────────────────────────┘
```

### Kakao Developers - Redirect URI 설정
```
Redirect URI:
┌─────────────────────────────────────────────────────────────┐
│ https://abcdefghijklmnop.supabase.co/auth/v1/callback     │
└─────────────────────────────────────────────────────────────┘
```

### Supabase Dashboard - Google Provider 설정
```
Authentication → Providers → Google

Enable Sign in with Google: [ON]

Google OAuth 2.0 Client ID:
┌─────────────────────────────────────────────────────────────┐
│ 123456789012-abcdefg...apps.googleusercontent.com          │
└─────────────────────────────────────────────────────────────┘

Google OAuth 2.0 Client Secret:
┌─────────────────────────────────────────────────────────────┐
│ GOCSPX-abcdefghijklmnopqrstuvwxyz                          │
└─────────────────────────────────────────────────────────────┘

[Save] 버튼 클릭!
```

---

## 📝 주의사항

1. **프로덕션 배포 시**
   - 각 OAuth 제공자에 프로덕션 도메인 추가
   - Redirect URI를 프로덕션 URL로 업데이트

2. **보안**
   - Client Secret은 절대 GitHub에 커밋하지 마세요
   - Supabase Dashboard에서만 관리하세요

3. **사용자 프로필**
   - OAuth 로그인 시 자동으로 users 테이블에 레코드 생성
   - nickname은 OAuth 제공자의 이름 또는 이메일로 자동 설정

---

## 🐛 문제 해결

### "OAuth 로그인에 실패했습니다" 오류
- Supabase에서 해당 제공자가 활성화되어 있는지 확인
- Client ID/Secret이 올바른지 확인
- Redirect URI가 정확한지 확인

### 로그인 후 리디렉션 안 됨
- `/auth/callback/route.ts` 파일이 생성되어 있는지 확인
- 브라우저 콘솔에서 에러 메시지 확인

### Kakao 로그인 실패
- Kakao Developers에서 카카오 로그인 활성화 여부 확인
- Client Secret이 생성되고 활성화되어 있는지 확인
