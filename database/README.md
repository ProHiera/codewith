# 🚀 데이터베이스 설정 가이드

## 📋 빠른 시작 (Quick Start)

### 1️⃣ 통합 설정 실행 (권장)
Supabase SQL Editor에서 **`SETUP.sql`** 파일 내용을 실행하세요.
- ✅ users 테이블 생성
- ✅ RLS 정책 설정
- ✅ 트리거 함수 생성 (자동 사용자 생성 + 이메일 확인)
- ✅ 인덱스 생성
- ✅ 기존 사용자 이메일 확인 처리

### 2️⃣ 추가 기능 (선택사항)
필요한 기능에 따라 추가 SQL 파일을 실행하세요:
- **`gamification.sql`**: 게이미피케이션 시스템 (EXP, 레벨, 배지, 스트릭)
- **`achievements.sql`**: 업적 배지 시스템
- **`new-features.sql`**: 15개 신규 기능 테이블
- **`seed.sql`**: 샘플 데이터 (테스트용)

## 📁 파일 설명

| 파일 | 설명 | 필수 여부 |
|------|------|----------|
| **SETUP.sql** | 통합 설정 스크립트 (회원가입/로그인에 필요한 모든 것) | ✅ 필수 |
| schema.sql | 기본 테이블 스키마 | ℹ️ SETUP.sql에 포함됨 |
| gamification.sql | 게이미피케이션 테이블 | 🎮 게임 요소 사용 시 |
| achievements.sql | 업적 시스템 | 🏆 배지 기능 사용 시 |
| new-features.sql | 신규 기능 테이블 (15개) | 🚧 향후 기능용 |
| seed.sql | 샘플 데이터 | 🧪 테스트/개발용 |

## 🔧 Supabase Dashboard 설정

### Authentication 설정 (필수!)
1. **Authentication** → **Providers** → **Email**
2. 다음과 같이 설정:
   ```
   ✅ Allow new users to sign up: ON
   ❌ Confirm email: OFF (개발 중)
   ```
3. **Save** 클릭

### OAuth 설정 (선택사항)
Google, GitHub, Kakao 로그인을 사용하려면:
- 프로젝트 루트의 **`OAUTH_SETUP.md`** 참고

## ✅ 설정 확인

SETUP.sql 실행 후 다음 5개 항목이 모두 통과해야 합니다:

1. ✅ users 테이블 존재: `true`
2. ✅ RLS 활성화: `true`
3. ✅ RLS 정책 개수: `3`
4. ✅ 트리거 함수 존재: `true`
5. ✅ 트리거 존재: `true`

## 🎯 완료 후 테스트

```
http://localhost:3000/signup
```

회원가입 → 자동 로그인 → 대시보드 이동이 정상 작동하면 설정 완료! 🎉

## 🆘 문제 해결

### "Allow new users to sign up"이 OFF 상태
- Supabase Dashboard에서 이메일 제공자 설정 확인
- "Allow new users to sign up"을 ON으로 변경

### "이메일 인증이 필요합니다" 에러
- "Confirm email"이 아직 ON 상태
- OFF로 변경 후 기존 사용자는 자동으로 확인 처리됨

### 트리거가 작동하지 않음
- SETUP.sql을 다시 실행
- 트리거 존재 확인 쿼리 결과가 `true`인지 확인

---

**더 자세한 내용은 프로젝트 루트의 `README.md`를 참고하세요.**
