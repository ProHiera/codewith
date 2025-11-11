import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    // 간단한 AI 응답 시뮬레이션 (실제로는 OpenAI API 등을 사용)
    const lastMessage = messages[messages.length - 1];
    const userQuestion = lastMessage.content.toLowerCase();

    let response = '';

    // 패턴 매칭 기반 응답
    if (userQuestion.includes('flexbox') || userQuestion.includes('flex')) {
      response = `# Flexbox 완벽 가이드 📦

Flexbox는 1차원 레이아웃 시스템입니다!

**기본 구조:**
\`\`\`css
.container {
  display: flex;
  justify-content: center;  /* 가로 정렬 */
  align-items: center;      /* 세로 정렬 */
  gap: 20px;                /* 아이템 간격 */
}
\`\`\`

**주요 속성:**
- \`flex-direction\`: row, column (방향)
- \`justify-content\`: center, space-between (주축 정렬)
- \`align-items\`: center, stretch (교차축 정렬)
- \`flex-wrap\`: wrap, nowrap (줄바꿈)

**실전 팁:**
✅ 중앙 정렬: justify-content + align-items를 center로
✅ 간격: gap 사용 (margin보다 깔끔)
✅ 반응형: flex-wrap으로 자동 줄바꿈

더 궁금한 부분이 있나요?`;
    } else if (userQuestion.includes('async') || userQuestion.includes('await') || userQuestion.includes('promise')) {
      response = `# async/await vs Promise 비교 ⚡

**Promise (전통 방식):**
\`\`\`javascript
fetchData()
  .then(data => processData(data))
  .then(result => console.log(result))
  .catch(error => console.error(error));
\`\`\`

**async/await (현대 방식):**
\`\`\`javascript
async function getData() {
  try {
    const data = await fetchData();
    const result = await processData(data);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

**주요 차이점:**
1. **가독성**: async/await가 동기 코드처럼 읽힘
2. **에러 처리**: try-catch 사용 가능
3. **본질**: 둘 다 Promise 기반 (async/await는 문법 설탕)

**실전 패턴:**
\`\`\`javascript
// 병렬 처리
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts()
]);

// 순차 처리
const user = await fetchUser();
const posts = await fetchPosts(user.id);
\`\`\`

다음 단계로 무엇을 배우고 싶으신가요?`;
    } else if (userQuestion.includes('hook') || userQuestion.includes('react')) {
      response = `# React Hooks 마스터하기 🎣

**필수 Hooks:**

**1. useState - 상태 관리**
\`\`\`javascript
const [count, setCount] = useState(0);
setCount(count + 1);  // 값 업데이트
\`\`\`

**2. useEffect - 사이드 이펙트**
\`\`\`javascript
useEffect(() => {
  // 컴포넌트 마운트/업데이트 시 실행
  fetchData();
  
  return () => {
    // 클린업 (언마운트 시)
    cleanup();
  };
}, [dependency]);  // 의존성 배열
\`\`\`

**3. useContext - 전역 상태**
\`\`\`javascript
const value = useContext(MyContext);
\`\`\`

**황금 규칙:**
✅ 컴포넌트 최상위에서만 호출
✅ 조건문/반복문 안에서 호출 금지
✅ 의존성 배열 정확히 설정

**자주 하는 실수:**
❌ useEffect 무한 루프
❌ 의존성 배열 누락
❌ 이전 상태 무시

더 자세한 Hook이 궁금하신가요? (useCallback, useMemo, useRef 등)`;
    } else if (userQuestion.includes('취업') || userQuestion.includes('주니어') || userQuestion.includes('면접')) {
      response = `# 주니어 개발자 취업 전략 💼

**포트폴리오 준비:**
1. **실전 프로젝트 3-5개**
   - GitHub README 상세히 작성
   - 배포 링크 필수
   - 트러블 슈팅 문서화

2. **코드 품질**
   - 깔끔한 코드 컨벤션
   - 주석과 문서화
   - Git 커밋 메시지 규칙

**기술 스택:**
✅ 한 분야 깊게 (프론트/백엔드)
✅ 기본기 탄탄히 (JS, HTML, CSS)
✅ 현업 도구 경험 (Git, 협업 툴)

**면접 준비:**
- 자기소개 1분 요약
- 프로젝트 설명 3분
- 기술 개념 쉽게 설명 연습
- 모르면 솔직히 + 학습 의지 표현

**차별화 포인트:**
🌟 블로그/TIL 운영
🌟 오픈소스 기여
🌟 스터디/커뮤니티 활동
🌟 꾸준한 GitHub 활동

구체적으로 어떤 부분이 궁금하신가요?`;
    } else if (userQuestion.includes('디버깅') || userQuestion.includes('버그') || userQuestion.includes('에러')) {
      response = `# 효과적인 디버깅 전략 🐛

**단계별 접근법:**

**1. 에러 메시지 정확히 읽기**
- 어디서 발생? (파일, 라인)
- 무슨 문제? (타입, 참조 등)
- 스택 트레이스 따라가기

**2. 콘솔 디버깅**
\`\`\`javascript
console.log('변수:', variable);
console.table(array);  // 배열 예쁘게
console.trace();       // 호출 스택
\`\`\`

**3. 브레이크포인트 활용**
- Chrome DevTools 사용
- debugger; 키워드
- 조건부 브레이크포인트

**4. 이분 탐색 접근**
- 절반씩 코드 주석 처리
- 문제 범위 좁히기

**디버깅 체크리스트:**
✅ 변수 초기화 확인
✅ 타입 불일치 체크
✅ 비동기 순서 확인
✅ null/undefined 체크
✅ 오타 확인

**프로 팁:**
🔥 Rubber Duck Debugging (고무 오리에게 설명)
🔥 문제 재현 최소화
🔥 Git bisect로 버그 커밋 찾기

어떤 에러로 고민 중이신가요?`;
    } else {
      response = `좋은 질문이네요! 😊

"${lastMessage.content}"에 대해 말씀드리면:

**핵심 개념:**
이 주제는 개발에서 중요한 부분입니다. 구체적인 코드 예시나 상황을 공유해주시면 더 정확한 도움을 드릴 수 있습니다!

**추천 학습 순서:**
1. 기본 개념 이해
2. 간단한 예제 실습
3. 실전 프로젝트 적용
4. 트러블 슈팅 경험

**관련 질문:**
- 구체적인 코드나 에러가 있나요?
- 어떤 부분이 가장 이해하기 어려우신가요?
- 실전에서 어떻게 적용하고 싶으신가요?

더 구체적으로 질문해주시면 맞춤형 답변을 드리겠습니다! 🚀`;
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('AI chat error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
