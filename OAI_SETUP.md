# OpenAI 설정 가이드

이 프로젝트의 AI 채팅 API(`app/api/ai/chat/route.ts`)는 기본적으로 OpenAI Chat Completions API를 사용합니다. 환경 변수에 API 키가 없으면 한국어 모의 응답(간단한 패턴 매칭)으로 자동 폴백합니다.

## 1) 환경 변수 설정
루트에 `.env.local` 파일을 생성하고 다음을 추가하세요.

```
OPENAI_API_KEY=sk-...             # 필수: OpenAI API 키
OPENAI_MODEL=gpt-4o-mini          # 선택: 기본 모델(미설정 시 gpt-4o-mini)
```

> 참고: `.env.local`는 서버에서만 사용됩니다. 키를 클라이언트로 노출하지 않습니다.

## 2) 의존성 설치
이미 `openai` 패키지는 `package.json`에 포함되어 있습니다. 설치가 필요하면 다음을 실행하세요.

```
npm install
```

## 3) 로컬에서 테스트
개발 서버 실행 후, 다음 경로로 POST 요청을 보내면 됩니다.

- Endpoint: `POST /api/ai/chat`
- Body(JSON):

```
{
  "messages": [
    { "role": "user", "content": "리액트 useEffect 의존성 배열 설명해줘" }
  ],
  "temperature": 0.3,
  "max_tokens": 512
}
```

응답(JSON):

```
{
  "response": "...한국어 답변...",
  "provider": "openai",      // 키 없으면 "fallback"
  "model": "gpt-4o-mini",
  "usage": { /* OpenAI 토큰 사용량(있을 때) */ }
}
```

## 4) 문제 해결
- 401/429가 발생하면: 키/요금제/쿼터를 확인하세요.
- 모델 미지원 에러: `OPENAI_MODEL`을 사용 가능한 모델로 변경하세요.
- 배포 환경: 배포 플랫폼의 환경 변수 설정에 동일하게 등록해야 합니다.

## 5) 한국어 응답 보장
서버에서 시스템 프롬프트로 "한국어로만 답변"을 강제합니다. 클라이언트에서 별도 지시가 없어도 항상 한국어로 응답합니다.
