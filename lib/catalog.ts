export type Domain = 'frontend' | 'backend' | 'data' | 'devops';

export type CatalogItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  domain: Domain;
  langs: string[]; // e.g., ['js', 'react', 'sql']
};

export const CATALOG: CatalogItem[] = [
  {
    id: 'js-cheats',
    title: 'JS 암기장',
    description: '레벨별 JS 개념 암기와 프리뷰',
    icon: '📒',
    path: '/js-cheats',
    domain: 'frontend',
    langs: ['js'],
  },
  {
    id: 'concept-snaps',
    title: 'JS 개념 스냅샷',
    description: '표현식/문, this, async 흐름 카드',
    icon: '📚',
    path: '/concept-snaps',
    domain: 'frontend',
    langs: ['js'],
  },
  {
    id: 'async-simulator',
    title: '비동기 흐름 리허설',
    description: 'await ~ finally 시퀀스 시뮬레이션',
    icon: '🎬',
    path: '/async-simulator',
    domain: 'frontend',
    langs: ['js'],
  },
  {
    id: 'api-sandbox',
    title: 'API 실습 샌드박스',
    description: 'fetch/axios, 토큰 주입, 가짜 서버',
    icon: '🔌',
    path: '/api-sandbox',
    domain: 'backend',
    langs: ['js', 'node'],
  },
  {
    id: 'db-schema',
    title: 'DB 스키마 메이커',
    description: '요구사항 → 3NF → DDL 생성',
    icon: '🗄️',
    path: '/db-schema',
    domain: 'data',
    langs: ['sql', 'prisma'],
  },
  {
    id: 'portfolio',
    title: '포트폴리오 빌더',
    description: '프로젝트 카드/링크 구성',
    icon: '💼',
    path: '/portfolio',
    domain: 'frontend',
    langs: ['react'],
  },
  {
    id: 'interview-practice',
    title: '면접 리허설',
    description: '질문/모범답안/함정/실습',
    icon: '🎤',
    path: '/interview-practice',
    domain: 'frontend',
    langs: ['js', 'react'],
  },
  {
    id: 'missions',
    title: 'CSS 스피드런',
    description: '자동 채점으로 CSS 실습',
    icon: '⚡',
    path: '/missions',
    domain: 'frontend',
    langs: ['css'],
  },
  {
    id: 'error-doctor',
    title: '에러 닥터',
    description: '로그 진단과 복구 제안',
    icon: '🩺',
    path: '/error-doctor',
    domain: 'devops',
    langs: ['js'],
  },
  {
    id: 'commit-assistant',
    title: '커밋/PR 비서',
    description: 'Conventional Commits/PR 템플릿',
    icon: '💬',
    path: '/commit-assistant',
    domain: 'devops',
    langs: ['git'],
  },
  {
    id: 'learning-paths',
    title: '러닝 경로 프리셋',
    description: '목표별 N주 로드맵',
    icon: '🗺️',
    path: '/learning-paths',
    domain: 'frontend',
    langs: ['react', 'node', 'sql'],
  },
  {
    id: 'pattern-scaffolder',
    title: '실무 패턴 주입기',
    description: 'Controller→Service→Repository',
    icon: '🏗️',
    path: '/pattern-scaffolder',
    domain: 'backend',
    langs: ['node', 'prisma'],
  },
  {
    id: 'accessibility-checker',
    title: '접근성 검사기',
    description: 'ARIA 점검 및 제안',
    icon: '♿',
    path: '/accessibility-checker',
    domain: 'frontend',
    langs: ['react'],
  },
  {
    id: 'learning-radar',
    title: '학습 레이더',
    description: '취약 개념 분석과 복습 제안',
    icon: '📡',
    path: '/learning-radar',
    domain: 'frontend',
    langs: ['js', 'react'],
  },
];

export const DOMAINS: { key: Domain; label: string }[] = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'data', label: 'Data' },
  { key: 'devops', label: 'DevOps' },
];

export const LANGS: { key: string; label: string }[] = [
  { key: 'js', label: 'JavaScript' },
  { key: 'react', label: 'React' },
  { key: 'node', label: 'Node/Express' },
  { key: 'sql', label: 'SQL' },
  { key: 'prisma', label: 'Prisma' },
  { key: 'java', label: 'Java' },
  { key: 'git', label: 'Git' },
  { key: 'css', label: 'CSS' },
];
