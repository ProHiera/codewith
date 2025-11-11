// 학습자 레벨 시스템
export type LearnerLevel = 
  | 'beginner'      // 초등학생: 프로그래밍 입문
  | 'elementary'    // 중학생: 기초 문법 이해
  | 'intermediate'  // 고등학생: 프로젝트 시작
  | 'advanced'      // 대학생: 심화 개념
  | 'professional'; // 현업: 실무 패턴

export interface LevelInfo {
  id: LearnerLevel;
  name: string;
  description: string;
  icon: string;
  color: string;
  skills: string[];
  recommendedPath: string[];
}

export const LEVELS: Record<LearnerLevel, LevelInfo> = {
  beginner: {
    id: 'beginner',
    name: '🌱 입문자',
    description: '프로그래밍을 처음 시작해요',
    icon: '🌱',
    color: 'green',
    skills: [
      'HTML 기본 태그',
      'CSS 색상과 크기',
      '변수와 데이터 타입',
      '간단한 조건문과 반복문'
    ],
    recommendedPath: [
      'HTML/CSS 기초',
      'JavaScript 입문',
      '첫 웹페이지 만들기'
    ]
  },
  elementary: {
    id: 'elementary',
    name: '🌿 기초 학습자',
    description: '기본 문법을 이해하고 있어요',
    icon: '🌿',
    color: 'lime',
    skills: [
      'CSS Flexbox & Grid',
      '함수 작성',
      'DOM 조작',
      '이벤트 핸들링',
      '배열과 객체'
    ],
    recommendedPath: [
      'CSS 스피드런',
      'JavaScript 중급',
      '인터랙티브 웹 만들기',
      '클론 코딩 입문'
    ]
  },
  intermediate: {
    id: 'intermediate',
    name: '🌳 중급 개발자',
    description: '프로젝트를 만들 수 있어요',
    icon: '🌳',
    color: 'blue',
    skills: [
      'React/Vue 컴포넌트',
      '비동기 프로그래밍',
      'API 통신',
      '상태 관리',
      'Git 사용법'
    ],
    recommendedPath: [
      'React/Vue 프레임워크',
      'API 실습 샌드박스',
      '비동기 흐름 리허설',
      '포트폴리오 프로젝트',
      'DB 스키마 설계'
    ]
  },
  advanced: {
    id: 'advanced',
    name: '🎓 고급 개발자',
    description: '심화 개념을 다룰 수 있어요',
    icon: '🎓',
    color: 'purple',
    skills: [
      '디자인 패턴',
      '성능 최적화',
      '테스트 작성',
      '보안 개념',
      '아키텍처 설계'
    ],
    recommendedPath: [
      '실무 패턴 학습',
      '테스트 주도 개발',
      '성능 최적화',
      '접근성 & SEO',
      '배포 자동화'
    ]
  },
  professional: {
    id: 'professional',
    name: '💼 현업 개발자',
    description: '실무 경험이 있어요',
    icon: '💼',
    color: 'red',
    skills: [
      '코드 리뷰',
      '시스템 설계',
      '레거시 리팩터링',
      '팀 협업',
      '기술 의사결정'
    ],
    recommendedPath: [
      '실무 패턴 심화',
      '면접 리허설',
      '아키텍처 설계',
      '코드 품질 관리',
      '멘토링 스킬'
    ]
  }
};

export interface LevelAssessment {
  id: string;
  level: LearnerLevel;
  question: string;
  type: 'multiple' | 'code' | 'yesno';
  options?: string[];
  correctAnswer?: string | number;
  points: number;
}

// 레벨 평가 테스트
export const LEVEL_ASSESSMENT_QUESTIONS: LevelAssessment[] = [
  // 입문 레벨 테스트
  {
    id: 'q1',
    level: 'beginner',
    question: 'HTML에서 제목을 만드는 태그는?',
    type: 'multiple',
    options: ['<title>', '<h1>', '<header>', '<head>'],
    correctAnswer: 1,
    points: 10
  },
  {
    id: 'q2',
    level: 'beginner',
    question: 'CSS에서 글자 색을 빨간색으로 만들려면?',
    type: 'multiple',
    options: ['color: red;', 'background: red;', 'text: red;', 'font-color: red;'],
    correctAnswer: 0,
    points: 10
  },
  {
    id: 'q3',
    level: 'beginner',
    question: 'JavaScript 변수를 선언할 때 사용하는 키워드는?',
    type: 'multiple',
    options: ['var, let, const', 'int, string, bool', 'variable, value', 'define, set'],
    correctAnswer: 0,
    points: 10
  },
  
  // 기초 레벨 테스트
  {
    id: 'q4',
    level: 'elementary',
    question: 'Flexbox에서 자식 요소를 중앙 정렬하는 속성은?',
    type: 'multiple',
    options: [
      'align-items: center; justify-content: center;',
      'text-align: center;',
      'margin: auto;',
      'position: center;'
    ],
    correctAnswer: 0,
    points: 15
  },
  {
    id: 'q5',
    level: 'elementary',
    question: 'DOM에서 id로 요소를 찾는 메서드는?',
    type: 'multiple',
    options: [
      'document.getElementById()',
      'document.findById()',
      'document.getElement()',
      'document.selectId()'
    ],
    correctAnswer: 0,
    points: 15
  },
  {
    id: 'q6',
    level: 'elementary',
    question: '배열에서 마지막 요소를 제거하는 메서드는?',
    type: 'multiple',
    options: ['pop()', 'push()', 'shift()', 'slice()'],
    correctAnswer: 0,
    points: 15
  },

  // 중급 레벨 테스트
  {
    id: 'q7',
    level: 'intermediate',
    question: 'Promise의 세 가지 상태가 아닌 것은?',
    type: 'multiple',
    options: ['pending', 'fulfilled', 'rejected', 'loading'],
    correctAnswer: 3,
    points: 20
  },
  {
    id: 'q8',
    level: 'intermediate',
    question: 'React에서 컴포넌트 상태를 관리하는 Hook은?',
    type: 'multiple',
    options: ['useState', 'useData', 'useStore', 'useVariable'],
    correctAnswer: 0,
    points: 20
  },
  {
    id: 'q9',
    level: 'intermediate',
    question: 'REST API에서 데이터를 생성할 때 사용하는 HTTP 메서드는?',
    type: 'multiple',
    options: ['POST', 'GET', 'PUT', 'DELETE'],
    correctAnswer: 0,
    points: 20
  },

  // 고급 레벨 테스트
  {
    id: 'q10',
    level: 'advanced',
    question: 'JavaScript의 클로저(Closure)란?',
    type: 'multiple',
    options: [
      '함수가 선언될 때의 렉시컬 환경을 기억하는 함수',
      '함수를 닫는 중괄호',
      '비동기 함수의 종료',
      '에러 핸들링 블록'
    ],
    correctAnswer: 0,
    points: 25
  },
  {
    id: 'q11',
    level: 'advanced',
    question: 'useMemo와 useCallback의 차이는?',
    type: 'multiple',
    options: [
      'useMemo는 값을, useCallback은 함수를 메모이제이션',
      'useMemo는 함수를, useCallback은 값을 메모이제이션',
      '둘 다 같은 기능',
      'useMemo는 비동기, useCallback은 동기'
    ],
    correctAnswer: 0,
    points: 25
  },
  {
    id: 'q12',
    level: 'advanced',
    question: 'DB 정규화 3NF(Third Normal Form)의 조건은?',
    type: 'multiple',
    options: [
      '2NF를 만족하고 이행적 종속이 없음',
      '1NF를 만족하고 부분 종속이 없음',
      '중복 데이터가 전혀 없음',
      '외래키가 모두 설정됨'
    ],
    correctAnswer: 0,
    points: 25
  },

  // 현업 레벨 테스트
  {
    id: 'q13',
    level: 'professional',
    question: 'SOLID 원칙 중 "D"가 의미하는 것은?',
    type: 'multiple',
    options: [
      'Dependency Inversion Principle',
      'Data Integrity Principle',
      'Design Pattern Principle',
      'Database Normalization'
    ],
    correctAnswer: 0,
    points: 30
  },
  {
    id: 'q14',
    level: 'professional',
    question: 'CI/CD 파이프라인의 목적이 아닌 것은?',
    type: 'multiple',
    options: [
      '코드 작성 자동화',
      '테스트 자동화',
      '빌드 자동화',
      '배포 자동화'
    ],
    correctAnswer: 0,
    points: 30
  },
  {
    id: 'q15',
    level: 'professional',
    question: '마이크로서비스 아키텍처의 장점이 아닌 것은?',
    type: 'multiple',
    options: [
      '단순한 데이터베이스 관리',
      '독립적인 배포',
      '기술 스택 유연성',
      '확장성 향상'
    ],
    correctAnswer: 0,
    points: 30
  }
];
