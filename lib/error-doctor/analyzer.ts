interface ErrorAnalysis {
  rootCause: string;
  category: string;
  steps: string[];
  fixPatch?: string;
  severity: 'high' | 'medium' | 'low';
}

export class ErrorDoctor {
  private static patterns = [
    {
      regex: /Cannot find module ['"](.+)['"]/,
      category: 'Module Not Found',
      severity: 'high' as const,
      analyze: (match: RegExpMatchArray) => ({
        rootCause: `모듈 '${match[1]}'을 찾을 수 없습니다`,
        steps: [
          `1. 패키지가 설치되어 있는지 확인: npm list ${match[1]}`,
          `2. 설치되지 않았다면 설치: npm install ${match[1]}`,
          `3. import 경로가 올바른지 확인`,
          `4. node_modules를 삭제하고 재설치: rm -rf node_modules && npm install`,
        ],
        fixPatch: `npm install ${match[1]}`,
      }),
    },
    {
      regex: /TypeError: Cannot read propert(?:y|ies) of (undefined|null)/,
      category: 'Null/Undefined Reference',
      severity: 'high' as const,
      analyze: (match: RegExpMatchArray) => ({
        rootCause: `${match[1]} 값에 접근하려고 했습니다`,
        steps: [
          '1. 변수가 초기화되었는지 확인',
          '2. Optional chaining (?.) 사용 고려',
          '3. 조건문으로 null/undefined 체크 추가',
          '4. 기본값 설정 고려 (|| 또는 ?? 연산자)',
        ],
        fixPatch: `// Optional chaining 사용\nobj?.property\n\n// Null 체크\nif (obj !== null && obj !== undefined) {\n  obj.property\n}`,
      }),
    },
    {
      regex: /Unexpected token ['"](.+)['"]/,
      category: 'Syntax Error',
      severity: 'high' as const,
      analyze: (match: RegExpMatchArray) => ({
        rootCause: `예상치 못한 토큰 '${match[1]}'`,
        steps: [
          '1. 괄호, 중괄호, 대괄호가 올바르게 닫혔는지 확인',
          '2. 세미콜론이 필요한 곳에 있는지 확인',
          '3. 문자열 따옴표가 올바른지 확인',
          '4. JSX에서 중괄호 {} 사용 확인',
        ],
      }),
    },
    {
      regex: /React Hook .+ is called conditionally/,
      category: 'React Hooks',
      severity: 'high' as const,
      analyze: () => ({
        rootCause: 'React Hook이 조건문 안에서 호출되었습니다',
        steps: [
          '1. Hook은 항상 컴포넌트 최상위에서 호출해야 합니다',
          '2. 조건문, 반복문, 중첩 함수 안에서 Hook 호출 금지',
          '3. Hook 호출 순서는 항상 동일해야 합니다',
          '4. 조건부 로직은 Hook 내부에서 처리',
        ],
        fixPatch: `// ❌ 잘못된 예\nif (condition) {\n  const [state, setState] = useState();\n}\n\n// ✅ 올바른 예\nconst [state, setState] = useState();\nif (condition) {\n  setState(newValue);\n}`,
      }),
    },
    {
      regex: /CORS (policy|error)/i,
      category: 'CORS',
      severity: 'medium' as const,
      analyze: () => ({
        rootCause: 'CORS 정책으로 인해 요청이 차단되었습니다',
        steps: [
          '1. 서버에서 CORS 헤더 설정 확인',
          '2. Access-Control-Allow-Origin 헤더 추가',
          '3. 프록시 서버 사용 고려',
          '4. Next.js의 경우 next.config.js에서 rewrites 설정',
        ],
        fixPatch: `// Next.js next.config.js\nmodule.exports = {\n  async rewrites() {\n    return [\n      {\n        source: '/api/:path*',\n        destination: 'https://api.example.com/:path*',\n      },\n    ];\n  },\n};`,
      }),
    },
    {
      regex: /Failed to fetch|Network request failed/i,
      category: 'Network Error',
      severity: 'medium' as const,
      analyze: () => ({
        rootCause: '네트워크 요청 실패',
        steps: [
          '1. 인터넷 연결 확인',
          '2. API 엔드포인트 URL 확인',
          '3. 서버가 실행 중인지 확인',
          '4. try-catch로 에러 핸들링 추가',
          '5. 재시도 로직 구현',
        ],
        fixPatch: `async function fetchWithRetry(url, options, retries = 3) {\n  try {\n    const response = await fetch(url, options);\n    if (!response.ok) throw new Error('HTTP error');\n    return response;\n  } catch (error) {\n    if (retries > 0) {\n      await new Promise(r => setTimeout(r, 1000));\n      return fetchWithRetry(url, options, retries - 1);\n    }\n    throw error;\n  }\n}`,
      }),
    },
  ];

  static diagnose(logText: string): ErrorAnalysis {
    // Try to match known patterns
    for (const pattern of this.patterns) {
      const match = logText.match(pattern.regex);
      if (match) {
        const analysis = pattern.analyze(match);
        return {
          category: pattern.category,
          severity: pattern.severity,
          ...analysis,
        };
      }
    }

    // Generic error analysis
    return {
      rootCause: '알 수 없는 에러',
      category: 'Unknown',
      severity: 'medium',
      steps: [
        '1. 에러 메시지를 자세히 읽어보세요',
        '2. 스택 트레이스에서 에러 발생 위치 확인',
        '3. 최근 변경사항 되돌리기',
        '4. 콘솔에 추가 로그 출력해서 디버깅',
        '5. 공식 문서나 Stack Overflow 검색',
      ],
    };
  }

  static generateFixGraph(analysis: ErrorAnalysis): string {
    return `
증상: ${analysis.category}
  ↓
원인: ${analysis.rootCause}
  ↓
심각도: ${analysis.severity.toUpperCase()}
  ↓
해결 단계:
${analysis.steps.map((step) => `  ${step}`).join('\n')}
${analysis.fixPatch ? `\n수정 패치:\n${analysis.fixPatch}` : ''}
    `.trim();
  }
}
