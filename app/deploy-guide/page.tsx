'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';

interface Platform {
  id: string;
  name: string;
  logo: string;
  color: string;
  pricing: 'free' | 'freemium' | 'paid';
  description: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
  steps: DeployStep[];
}

interface DeployStep {
  title: string;
  description: string;
  command?: string;
  note?: string;
  aiTip: string;
}

const PLATFORMS: Platform[] = [
  {
    id: 'vercel',
    name: 'Vercel',
    logo: '▲',
    color: 'from-black to-gray-800',
    pricing: 'freemium',
    description: 'Next.js를 만든 회사의 배포 플랫폼. 프론트엔드에 최적화되어 있어요.',
    pros: [
      '✅ Next.js 프로젝트 자동 감지',
      '✅ Git 연동으로 자동 배포',
      '✅ 무료 SSL 인증서',
      '✅ 글로벌 CDN 제공',
      '✅ 배포 속도가 매우 빠름'
    ],
    cons: [
      '⚠️ 서버리스 함수 실행 시간 제한 (10초)',
      '⚠️ 대용량 트래픽은 유료',
      '⚠️ 백엔드 API 구축에는 제한적'
    ],
    bestFor: [
      '📱 React/Next.js 프로젝트',
      '🎨 포트폴리오 사이트',
      '🚀 프로토타입 빠른 배포',
      '💼 프론트엔드 중심 프로젝트'
    ],
    steps: [
      {
        title: 'GitHub 저장소 준비',
        description: '프로젝트를 GitHub에 푸시하세요.',
        command: 'git push origin main',
        aiTip: '🤖 Vercel은 GitHub와 연동이 핵심이에요! 코드를 푸시하면 자동으로 배포돼요.'
      },
      {
        title: 'Vercel 계정 생성',
        description: 'vercel.com에서 GitHub 계정으로 로그인하세요.',
        note: '💡 GitHub 계정으로 간편하게 가입할 수 있어요',
        aiTip: '🤖 GitHub으로 로그인하면 저장소 접근 권한을 자동으로 받아요!'
      },
      {
        title: 'Import Project',
        description: 'Dashboard에서 "Import Project" 버튼을 클릭하고 GitHub 저장소를 선택하세요.',
        aiTip: '🤖 Next.js 프로젝트라면 모든 설정을 자동으로 감지해줘요!'
      },
      {
        title: '환경 변수 설정',
        description: 'Environment Variables에 API 키 등을 추가하세요.',
        note: '⚠️ 민감한 정보는 절대 코드에 직접 넣지 마세요!',
        aiTip: '🤖 .env 파일의 내용을 여기에 복사하면 돼요. NEXT_PUBLIC_으로 시작하는 변수는 클라이언트에서도 사용 가능해요!'
      },
      {
        title: '배포 시작',
        description: '"Deploy" 버튼을 클릭하면 자동으로 빌드 및 배포가 시작돼요.',
        aiTip: '🤖 보통 1~2분이면 배포가 완료돼요. 진행 상황을 실시간으로 볼 수 있어요!'
      },
      {
        title: '도메인 확인',
        description: '배포가 완료되면 .vercel.app 도메인이 자동으로 생성돼요.',
        note: '🎉 커스텀 도메인도 무료로 연결할 수 있어요!',
        aiTip: '🤖 이제 코드를 푸시할 때마다 자동으로 재배포돼요. 너무 편하죠? 😊'
      }
    ]
  },
  {
    id: 'netlify',
    name: 'Netlify',
    logo: '◆',
    color: 'from-teal-400 to-cyan-600',
    pricing: 'freemium',
    description: '정적 사이트와 Jamstack 프로젝트에 특화된 배포 플랫폼이에요.',
    pros: [
      '✅ 정적 사이트 무료 호스팅',
      '✅ Form 처리 기능 내장',
      '✅ A/B 테스팅 지원',
      '✅ Serverless Functions 지원',
      '✅ 직관적인 UI'
    ],
    cons: [
      '⚠️ 빌드 시간 제한 (월 300분)',
      '⚠️ Next.js SSR은 제한적 지원',
      '⚠️ 대규모 트래픽 시 속도 저하'
    ],
    bestFor: [
      '📄 정적 사이트 (HTML/CSS/JS)',
      '⚛️ React, Vue, Angular SPA',
      '📝 블로그 & 문서 사이트',
      '🎯 랜딩 페이지'
    ],
    steps: [
      {
        title: 'GitHub 저장소 준비',
        description: '프로젝트를 GitHub, GitLab, 또는 Bitbucket에 푸시하세요.',
        command: 'git push origin main',
        aiTip: '🤖 Netlify는 3개의 Git 플랫폼을 모두 지원해요!'
      },
      {
        title: 'Netlify 계정 생성',
        description: 'netlify.com에서 계정을 만드세요.',
        aiTip: '🤖 GitHub, GitLab, Bitbucket 중 하나로 간편 가입 가능해요!'
      },
      {
        title: 'New Site from Git',
        description: '"New site from Git" 버튼을 클릭하고 저장소를 연결하세요.',
        aiTip: '🤖 저장소 권한을 요청하면 승인해주세요!'
      },
      {
        title: '빌드 설정',
        description: 'Build command와 Publish directory를 설정하세요.',
        command: 'npm run build',
        note: '💡 React: build, Next.js: .next, Vue: dist',
        aiTip: '🤖 대부분의 프레임워크는 자동 감지돼요. 설정이 이상하면 수동으로 수정하세요!'
      },
      {
        title: '환경 변수 설정',
        description: 'Site settings > Environment variables에서 설정하세요.',
        aiTip: '🤖 API 키나 비밀번호 같은 민감한 정보를 여기에 넣으세요!'
      },
      {
        title: '배포 완료',
        description: '"Deploy site" 버튼을 클릭하면 배포가 시작돼요.',
        note: '🎉 .netlify.app 도메인이 자동 생성돼요!',
        aiTip: '🤖 배포 로그에서 에러를 확인할 수 있어요. 빨간 글씨를 주의깊게 보세요!'
      }
    ]
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    logo: '☁️',
    color: 'from-blue-500 to-blue-700',
    pricing: 'freemium',
    description: 'Microsoft의 클라우드 플랫폼. 엔터프라이즈급 서비스를 제공해요.',
    pros: [
      '✅ 200달러 무료 크레딧 (첫 달)',
      '✅ 다양한 서비스 제공',
      '✅ 엔터프라이즈급 보안',
      '✅ Microsoft 제품과 통합',
      '✅ 전 세계 데이터센터'
    ],
    cons: [
      '⚠️ 학습 곡선이 가파름',
      '⚠️ 복잡한 가격 체계',
      '⚠️ 설정이 복잡함',
      '⚠️ 초보자에게는 어려움'
    ],
    bestFor: [
      '🏢 기업용 애플리케이션',
      '💻 .NET 기반 프로젝트',
      '🔐 보안이 중요한 프로젝트',
      '📊 데이터 분석 & AI/ML'
    ],
    steps: [
      {
        title: 'Azure 계정 생성',
        description: 'azure.microsoft.com에서 무료 계정을 만드세요.',
        note: '💳 신용카드 등록 필요 (자동 결제 안 됨)',
        aiTip: '🤖 학생이라면 Azure for Students로 100달러 크레딧을 받을 수 있어요!'
      },
      {
        title: 'Azure Portal 접속',
        description: 'portal.azure.com에 로그인하세요.',
        aiTip: '🤖 포털이 처음엔 복잡해 보이지만, 차근차근 따라오세요!'
      },
      {
        title: 'App Service 생성',
        description: '"Create a resource" > "Web App"을 선택하세요.',
        aiTip: '🤖 Static Web Apps는 프론트엔드, App Service는 풀스택에 적합해요!'
      },
      {
        title: '기본 설정',
        description: 'Resource group, 이름, Runtime stack을 설정하세요.',
        note: '💡 Node.js, Python, .NET, Java 등 선택 가능',
        aiTip: '🤖 Resource group은 프로젝트별로 리소스를 묶는 폴더 같은 거예요!'
      },
      {
        title: 'GitHub Actions 연동',
        description: 'Deployment Center에서 GitHub 저장소를 연결하세요.',
        aiTip: '🤖 GitHub Actions 파일이 자동으로 생성되어 CI/CD가 구축돼요!'
      },
      {
        title: '환경 변수 설정',
        description: 'Configuration > Application settings에서 환경 변수를 추가하세요.',
        aiTip: '🤖 변경 후 반드시 "Save" 버튼을 눌러야 적용돼요!'
      },
      {
        title: '배포 확인',
        description: 'GitHub에 코드를 푸시하면 자동으로 배포돼요.',
        note: '🎉 azurewebsites.net 도메인으로 접속 가능해요!',
        aiTip: '🤖 Deployment Center에서 배포 상태를 확인할 수 있어요!'
      }
    ]
  },
  {
    id: 'aws',
    name: 'Amazon AWS',
    logo: '🧡',
    color: 'from-orange-500 to-yellow-600',
    pricing: 'freemium',
    description: '세계 최대 클라우드 플랫폼. 거의 모든 것을 할 수 있어요.',
    pros: [
      '✅ 12개월 무료 티어',
      '✅ 가장 많은 서비스 제공',
      '✅ 높은 안정성과 확장성',
      '✅ 풍부한 문서와 커뮤니티',
      '✅ 글로벌 인프라'
    ],
    cons: [
      '⚠️ 매우 복잡한 UI',
      '⚠️ 학습 곡선이 매우 가파름',
      '⚠️ 예상치 못한 비용 발생 가능',
      '⚠️ 초보자에게 부적합'
    ],
    bestFor: [
      '🏢 대규모 엔터프라이즈',
      '📈 확장성이 중요한 프로젝트',
      '🔧 복잡한 인프라 필요',
      '🌍 글로벌 서비스'
    ],
    steps: [
      {
        title: 'AWS 계정 생성',
        description: 'aws.amazon.com에서 계정을 만드세요.',
        note: '💳 신용카드 등록 필수 (1달러 임시 결제)',
        aiTip: '🤖 무료 티어를 초과하면 비용이 발생하니 주의하세요!'
      },
      {
        title: 'IAM 사용자 생성',
        description: 'IAM 서비스에서 관리자 권한을 가진 사용자를 만드세요.',
        note: '🔐 루트 계정은 절대 사용하지 마세요!',
        aiTip: '🤖 보안을 위해 MFA(2단계 인증)를 꼭 설정하세요!'
      },
      {
        title: 'Amplify 또는 Elastic Beanstalk 선택',
        description: 'Amplify(프론트엔드) 또는 Elastic Beanstalk(풀스택)을 선택하세요.',
        aiTip: '🤖 초보자라면 Amplify가 훨씬 쉬워요!'
      },
      {
        title: 'Amplify 앱 생성',
        description: 'AWS Amplify > New App > Host web app을 선택하세요.',
        aiTip: '🤖 GitHub 저장소를 연결하면 자동 배포가 설정돼요!'
      },
      {
        title: 'GitHub 연동',
        description: 'GitHub 권한을 승인하고 저장소와 브랜치를 선택하세요.',
        aiTip: '🤖 main 브랜치를 선택하면 푸시할 때마다 배포돼요!'
      },
      {
        title: '빌드 설정',
        description: 'amplify.yml 파일이 자동 생성돼요. 필요시 수정하세요.',
        command: 'npm run build',
        aiTip: '🤖 Next.js, React, Vue 등은 자동으로 감지돼요!'
      },
      {
        title: '환경 변수 설정',
        description: 'App settings > Environment variables에서 추가하세요.',
        aiTip: '🤖 Amplify에서는 빌드와 런타임 변수를 구분해요!'
      },
      {
        title: '배포 확인',
        description: '배포가 완료되면 .amplifyapp.com 도메인이 생성돼요.',
        note: '🎉 Route 53으로 커스텀 도메인도 연결 가능해요!',
        aiTip: '🤖 CloudWatch에서 로그를 확인할 수 있어요. 에러가 나면 여기를 보세요!'
      }
    ]
  },
  {
    id: 'render',
    name: 'Render',
    logo: '🎨',
    color: 'from-purple-500 to-pink-600',
    pricing: 'freemium',
    description: 'Heroku의 대안으로 떠오르는 심플한 배포 플랫폼이에요.',
    pros: [
      '✅ 무료 플랜 제공',
      '✅ 풀스택 앱 배포 가능',
      '✅ PostgreSQL 무료 제공',
      '✅ 자동 SSL',
      '✅ Docker 지원'
    ],
    cons: [
      '⚠️ 무료 플랜은 15분 미사용시 슬립',
      '⚠️ 빌드 속도 느림',
      '⚠️ 제한적인 리전 선택'
    ],
    bestFor: [
      '🔧 풀스택 애플리케이션',
      '🐍 Python/Django 프로젝트',
      '🟢 Node.js + DB',
      '🐳 Docker 컨테이너'
    ],
    steps: [
      {
        title: 'Render 계정 생성',
        description: 'render.com에서 GitHub으로 가입하세요.',
        aiTip: '🤖 GitHub 계정만 있으면 바로 시작할 수 있어요!'
      },
      {
        title: 'New Web Service',
        description: 'Dashboard에서 "New +" > "Web Service"를 클릭하세요.',
        aiTip: '🤖 정적 사이트는 "Static Site"를, 백엔드는 "Web Service"를 선택하세요!'
      },
      {
        title: 'GitHub 저장소 연결',
        description: '배포할 저장소를 선택하세요.',
        aiTip: '🤖 저장소가 안 보이면 "Configure account" 버튼을 눌러 권한을 추가하세요!'
      },
      {
        title: '서비스 설정',
        description: '이름, 리전, 브랜치, 빌드 명령어를 설정하세요.',
        command: 'npm install && npm run build',
        note: '💡 Start command: npm start',
        aiTip: '🤖 무료 플랜은 Oregon 리전만 사용할 수 있어요!'
      },
      {
        title: '환경 변수 추가',
        description: 'Environment 탭에서 변수를 추가하세요.',
        aiTip: '🤖 DATABASE_URL 같은 변수는 자동으로 생성돼요!'
      },
      {
        title: '데이터베이스 추가 (선택)',
        description: '"New +" > "PostgreSQL"로 무료 DB를 추가할 수 있어요.',
        note: '💡 무료 플랜은 90일 후 자동 삭제돼요',
        aiTip: '🤖 DB를 만들면 연결 정보가 자동으로 환경 변수에 추가돼요!'
      },
      {
        title: '배포 시작',
        description: '"Create Web Service" 버튼을 클릭하면 배포가 시작돼요.',
        note: '🎉 .onrender.com 도메인이 생성돼요!',
        aiTip: '🤖 첫 배포는 좀 오래 걸려요. 로그를 보면서 기다리세요! ☕'
      }
    ]
  },
  {
    id: 'railway',
    name: 'Railway',
    logo: '🚂',
    color: 'from-gray-800 to-purple-900',
    pricing: 'freemium',
    description: '개발자 친화적인 인프라 플랫폼. 매우 직관적이에요.',
    pros: [
      '✅ 5달러 무료 크레딧',
      '✅ 데이터베이스 원클릭 배포',
      '✅ 깔끔한 UI/UX',
      '✅ Docker 지원',
      '✅ 빠른 배포 속도'
    ],
    cons: [
      '⚠️ 무료 크레딧 소진 후 유료',
      '⚠️ 트래픽 제한 있음',
      '⚠️ 상대적으로 비싼 가격'
    ],
    bestFor: [
      '🔧 풀스택 MVP',
      '🚀 스타트업 프로젝트',
      '💾 DB가 필요한 앱',
      '⚡ 빠른 프로토타이핑'
    ],
    steps: [
      {
        title: 'Railway 계정 생성',
        description: 'railway.app에서 GitHub으로 로그인하세요.',
        note: '💳 5달러 무료 크레딧 제공',
        aiTip: '🤖 이메일 인증만 하면 바로 5달러를 받을 수 있어요!'
      },
      {
        title: 'New Project',
        description: '"New Project" > "Deploy from GitHub repo"를 선택하세요.',
        aiTip: '🤖 템플릿도 제공되니 참고하세요!'
      },
      {
        title: '저장소 선택',
        description: 'GitHub 저장소를 연결하고 선택하세요.',
        aiTip: '🤖 권한 승인을 요청하면 허용해주세요!'
      },
      {
        title: '자동 설정',
        description: 'Railway가 자동으로 프레임워크를 감지하고 설정해요.',
        aiTip: '🤖 Node.js, Python, Go, Ruby 등 대부분 자동 감지돼요!'
      },
      {
        title: '환경 변수 설정',
        description: 'Variables 탭에서 환경 변수를 추가하세요.',
        aiTip: '🤖 Raw Editor를 사용하면 .env 파일을 통째로 붙여넣을 수 있어요!'
      },
      {
        title: '데이터베이스 추가 (선택)',
        description: '"New" > "Database" > PostgreSQL/MySQL/MongoDB 등을 선택하세요.',
        note: '💡 DB 연결 정보는 자동으로 환경 변수에 추가돼요',
        aiTip: '🤖 클릭 몇 번으로 DB를 추가할 수 있어요. 너무 쉽죠? 😊'
      },
      {
        title: '도메인 설정',
        description: 'Settings > Domains에서 .railway.app 도메인을 생성하세요.',
        note: '🎉 커스텀 도메인도 무료로 연결 가능해요!',
        aiTip: '🤖 배포가 완료되면 도메인 클릭으로 바로 접속할 수 있어요!'
      }
    ]
  }
];

export default function DeployGuide() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showAiTip, setShowAiTip] = useState(true);
  const [showEnvGuide, setShowEnvGuide] = useState(false);

  const handlePlatformSelect = (platform: Platform) => {
    setSelectedPlatform(platform);
    setCurrentStep(0);
    setCompletedSteps([]);
    setShowAiTip(true);
  };

  const handleStepComplete = (index: number) => {
    if (!completedSteps.includes(index)) {
      setCompletedSteps([...completedSteps, index]);
    }
    if (index < (selectedPlatform?.steps.length || 0) - 1) {
      setCurrentStep(index + 1);
      setShowAiTip(true);
      setTimeout(() => setShowAiTip(false), 15000);
    }
  };

  const getPricingBadge = (pricing: string) => {
    switch (pricing) {
      case 'free':
        return <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">100% 무료</span>;
      case 'freemium':
        return <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">무료 플랜 있음</span>;
      case 'paid':
        return <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">유료</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-4">
      <PageHeader />

      {/* AI Tip Floating */}
      {showAiTip && selectedPlatform && (
        <div className="fixed bottom-8 right-8 z-50 animate-bounce">
          <div className="relative">
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-6 max-w-md border-4 border-indigo-500">
              <div className="flex items-start gap-4">
                <div className="text-5xl">🤖</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 text-indigo-600">AI 배포 도우미</h3>
                  <p className="text-sm leading-relaxed">
                    {selectedPlatform.steps[currentStep]?.aiTip}
                  </p>
                </div>
                <button
                  onClick={() => setShowAiTip(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto mt-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4">🚀 배포 플랫폼 완벽 가이드</h1>
          <p className="text-2xl text-purple-300 mb-2">개발부터 배포까지, AI와 함께 단계별로 배워요</p>
          <p className="text-lg text-purple-200">초보자도 5분이면 내 프로젝트를 인터넷에 올릴 수 있어요!</p>
        </div>

        {/* 환경 변수 보안 가이드 */}
        {!selectedPlatform && (
          <div className="mb-12 bg-red-500/20 border-2 border-red-500 rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <span className="text-5xl">🔒</span>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 text-red-300">배포 전 필수! 환경 변수 보안</h2>
                <p className="text-lg text-red-100">API 키 유출을 막는 방법을 먼저 배워봅시다</p>
              </div>
              <button
                onClick={() => setShowEnvGuide(!showEnvGuide)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-all"
              >
                {showEnvGuide ? '접기 ▲' : '자세히 보기 ▼'}
              </button>
            </div>

            {showEnvGuide && (
              <div className="bg-black/30 rounded-xl p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-yellow-300">⚠️ 절대 하지 말아야 할 것</h3>
                  <div className="space-y-2 text-red-200">
                    <div className="flex items-start gap-3 bg-red-900/30 p-3 rounded-lg">
                      <span className="text-2xl">❌</span>
                      <div>
                        <p className="font-bold">코드에 직접 API 키 넣기</p>
                        <code className="text-xs bg-black/50 px-2 py-1 rounded">const API_KEY = "sk-1234..." // 이렇게 하면 안 돼요!</code>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-red-900/30 p-3 rounded-lg">
                      <span className="text-2xl">❌</span>
                      <div>
                        <p className="font-bold">.env 파일을 Git에 커밋하기</p>
                        <code className="text-xs bg-black/50 px-2 py-1 rounded">git add .env.local // 절대 안 돼요!</code>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-red-900/30 p-3 rounded-lg">
                      <span className="text-2xl">❌</span>
                      <div>
                        <p className="font-bold">환경 변수를 Slack/카톡으로 공유하기</p>
                        <p className="text-sm">메신저 히스토리에 남으면 위험해요!</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-green-300">✅ 올바른 방법</h3>
                  <div className="space-y-4">
                    <div className="bg-green-900/20 border border-green-500/50 p-4 rounded-lg">
                      <h4 className="font-bold mb-2 text-green-200">1. .env.local 파일 생성</h4>
                      <div className="bg-black/50 p-3 rounded font-mono text-sm mb-2">
                        <div className="text-gray-400"># .env.local</div>
                        <div>NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co</div>
                        <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...</div>
                        <div>OPENAI_API_KEY=sk-proj...</div>
                      </div>
                      <p className="text-sm text-green-200">💡 이 파일은 로컬에만 존재해요</p>
                    </div>

                    <div className="bg-green-900/20 border border-green-500/50 p-4 rounded-lg">
                      <h4 className="font-bold mb-2 text-green-200">2. .gitignore 확인</h4>
                      <div className="bg-black/50 p-3 rounded font-mono text-sm mb-2">
                        <div className="text-gray-400"># .gitignore</div>
                        <div className="text-yellow-300">.env*</div>
                        <div>node_modules/</div>
                        <div>.next/</div>
                      </div>
                      <p className="text-sm text-green-200">💡 .env*가 있으면 모든 환경 변수 파일이 Git에 안 올라가요</p>
                    </div>

                    <div className="bg-green-900/20 border border-green-500/50 p-4 rounded-lg">
                      <h4 className="font-bold mb-2 text-green-200">3. 배포 플랫폼에서 설정</h4>
                      <ul className="space-y-2 text-sm text-green-200">
                        <li className="flex items-start gap-2">
                          <span>▲</span>
                          <span><strong>Vercel:</strong> Settings → Environment Variables</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>◆</span>
                          <span><strong>Netlify:</strong> Site settings → Environment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>🚂</span>
                          <span><strong>Railway:</strong> Variables 탭</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>☁️</span>
                          <span><strong>Azure:</strong> Configuration → Application settings</span>
                        </li>
                      </ul>
                      <p className="text-sm text-green-200 mt-3">💡 각 플랫폼의 Dashboard에서 직접 입력하세요!</p>
                    </div>

                    <div className="bg-blue-900/20 border border-blue-500/50 p-4 rounded-lg">
                      <h4 className="font-bold mb-2 text-blue-200">🎓 환경 변수 네이밍 규칙</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-green-400">✓</span>
                          <div>
                            <code className="bg-black/50 px-2 py-1 rounded">NEXT_PUBLIC_*</code>
                            <span className="text-blue-200 ml-2">- 브라우저에서도 접근 가능 (공개 정보만!)</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-400">✓</span>
                          <div>
                            <code className="bg-black/50 px-2 py-1 rounded">API_KEY, DATABASE_URL</code>
                            <span className="text-blue-200 ml-2">- 서버에서만 접근 가능 (비밀 정보)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900/20 border border-purple-500/50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2 text-purple-200">📚 더 알아보기</h4>
                  <div className="space-y-3 text-sm text-purple-200">
                    <p>• <strong>ENV_SETUP.md</strong> - 로컬 환경 변수 설정 가이드</p>
                    <p>• <strong>DEPLOYMENT_ENV.md</strong> - 배포 플랫폼별 상세 가이드</p>
                    <div className="mt-4">
                      <a
                        href="/git-simulator"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition-all"
                      >
                        🌿 Git 시뮬레이터에서 .gitignore 실습하기 →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!selectedPlatform ? (
          /* 플랫폼 선택 화면 */
          <div>
            <div className="mb-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold mb-4">💡 배포 플랫폼이란?</h2>
              <p className="text-lg mb-4">
                여러분이 만든 웹사이트나 앱을 인터넷에 올려서 전 세계 사람들이 접속할 수 있게 해주는 서비스예요.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-blue-500/20 p-4 rounded-xl">
                  <div className="text-3xl mb-2">🎨</div>
                  <h3 className="font-bold mb-2">프론트엔드 특화</h3>
                  <p className="text-sm">Vercel, Netlify</p>
                  <p className="text-xs text-gray-300 mt-2">React, Next.js 같은 프론트엔드 프로젝트에 최적화</p>
                </div>
                <div className="bg-purple-500/20 p-4 rounded-xl">
                  <div className="text-3xl mb-2">🔧</div>
                  <h3 className="font-bold mb-2">풀스택 플랫폼</h3>
                  <p className="text-sm">Render, Railway</p>
                  <p className="text-xs text-gray-300 mt-2">백엔드 + 데이터베이스까지 한 번에</p>
                </div>
                <div className="bg-orange-500/20 p-4 rounded-xl">
                  <div className="text-3xl mb-2">☁️</div>
                  <h3 className="font-bold mb-2">클라우드 거대기업</h3>
                  <p className="text-sm">AWS, Azure</p>
                  <p className="text-xs text-gray-300 mt-2">엔터프라이즈급, 다양한 기능 제공</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6">📦 플랫폼을 선택하세요</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PLATFORMS.map((platform) => (
                <div
                  key={platform.id}
                  onClick={() => handlePlatformSelect(platform)}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/20 hover:border-white/60 cursor-pointer transition-all hover:scale-105 hover:shadow-2xl"
                >
                  <div className={`w-16 h-16 bg-linear-to-br ${platform.color} rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-lg`}>
                    {platform.logo}
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold">{platform.name}</h3>
                    {getPricingBadge(platform.pricing)}
                  </div>
                  <p className="text-sm text-gray-300 mb-4">{platform.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-bold text-yellow-300">✨ 추천 대상</p>
                    {platform.bestFor.map((item, idx) => (
                      <p key={idx} className="text-xs text-gray-300">{item}</p>
                    ))}
                  </div>

                  <button className="w-full py-3 bg-linear-to-r from-purple-500 to-pink-500 rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all">
                    배포 가이드 시작 →
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-linear-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="text-5xl">💡</div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">초보자를 위한 추천</h3>
                  <div className="space-y-2">
                    <p className="text-lg">🥇 <strong>Vercel</strong>: Next.js / React 프로젝트라면 1순위</p>
                    <p className="text-lg">🥈 <strong>Netlify</strong>: 정적 사이트나 Vue/Angular 프로젝트</p>
                    <p className="text-lg">🥉 <strong>Render</strong>: 백엔드 + DB가 필요한 풀스택 프로젝트</p>
                    <p className="text-sm text-yellow-200 mt-4">
                      ⚠️ AWS와 Azure는 매우 강력하지만, 초보자에게는 어려워요. 
                      위 3개 플랫폼 중 하나로 시작하는 걸 추천해요!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* 상세 가이드 화면 */
          <div>
            <button
              onClick={() => {
                setSelectedPlatform(null);
                setShowAiTip(false);
              }}
              className="mb-6 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all"
            >
              ← 플랫폼 다시 선택
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 플랫폼 정보 */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <div className={`w-20 h-20 bg-linear-to-br ${selectedPlatform.color} rounded-2xl flex items-center justify-center text-5xl mb-4 shadow-lg`}>
                    {selectedPlatform.logo}
                  </div>
                  <h2 className="text-3xl font-bold mb-3">{selectedPlatform.name}</h2>
                  {getPricingBadge(selectedPlatform.pricing)}
                  <p className="text-sm text-gray-300 mt-4">{selectedPlatform.description}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-3 text-green-400">장점</h3>
                  <ul className="space-y-2">
                    {selectedPlatform.pros.map((pro, idx) => (
                      <li key={idx} className="text-sm">{pro}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-3 text-orange-400">단점</h3>
                  <ul className="space-y-2">
                    {selectedPlatform.cons.map((con, idx) => (
                      <li key={idx} className="text-sm">{con}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-3 text-purple-400">추천 대상</h3>
                  <ul className="space-y-2">
                    {selectedPlatform.bestFor.map((item, idx) => (
                      <li key={idx} className="text-sm">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 단계별 가이드 */}
              <div className="lg:col-span-2">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">📝 배포 단계</h2>
                    <div className="text-sm bg-purple-500 px-4 py-2 rounded-full">
                      {completedSteps.length}/{selectedPlatform.steps.length} 완료
                    </div>
                  </div>

                  <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
                    {selectedPlatform.steps.map((step, index) => (
                      <div
                        key={index}
                        className={`p-6 rounded-xl border-2 transition-all ${
                          completedSteps.includes(index)
                            ? 'bg-green-500/20 border-green-400'
                            : currentStep === index
                            ? 'bg-purple-500/20 border-purple-400 shadow-lg'
                            : 'bg-white/5 border-white/10'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">
                            {completedSteps.includes(index) ? '✅' : `${index + 1}.`}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-sm text-gray-300 mb-3">{step.description}</p>
                            
                            {step.command && (
                              <div className="bg-black/50 p-3 rounded-lg mb-3 font-mono text-sm">
                                <code>{step.command}</code>
                              </div>
                            )}

                            {step.note && (
                              <div className="bg-yellow-500/20 border border-yellow-500/50 p-3 rounded-lg mb-3">
                                <p className="text-sm text-yellow-200">{step.note}</p>
                              </div>
                            )}

                            {currentStep === index && (
                              <div className="bg-blue-500/20 border border-blue-500/50 p-4 rounded-lg mb-3">
                                <div className="flex items-start gap-3">
                                  <span className="text-2xl">🤖</span>
                                  <p className="text-sm flex-1">{step.aiTip}</p>
                                </div>
                              </div>
                            )}

                            {!completedSteps.includes(index) && currentStep === index && (
                              <button
                                onClick={() => handleStepComplete(index)}
                                className="mt-3 px-6 py-2 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg font-bold transition-all"
                              >
                                ✓ 완료했어요!
                              </button>
                            )}

                            {completedSteps.includes(index) && (
                              <div className="mt-3 text-green-400 font-bold flex items-center gap-2">
                                <span>🎉</span>
                                <span>완료!</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {completedSteps.length === selectedPlatform.steps.length && (
                    <div className="mt-6 bg-linear-to-r from-purple-500 to-pink-500 p-8 rounded-2xl text-center">
                      <div className="text-6xl mb-4">🎊</div>
                      <h3 className="text-3xl font-bold mb-2">축하합니다!</h3>
                      <p className="text-xl mb-4">
                        {selectedPlatform.name}에 성공적으로 배포했어요!
                      </p>
                      <p className="text-sm text-purple-100 mb-6">
                        이제 여러분의 프로젝트를 전 세계 사람들이 볼 수 있어요. 🌍
                      </p>
                      <div className="flex gap-4 justify-center">
                        <button
                          onClick={() => {
                            setCurrentStep(0);
                            setCompletedSteps([]);
                          }}
                          className="px-6 py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transition-all"
                        >
                          🔄 다시 보기
                        </button>
                        <button
                          onClick={() => {
                            setSelectedPlatform(null);
                            setShowAiTip(false);
                          }}
                          className="px-6 py-3 bg-purple-900 rounded-xl font-bold hover:bg-purple-800 transition-all"
                        >
                          다른 플랫폼 배우기 →
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Tips */}
                <div className="bg-linear-to-r from-indigo-500/20 to-purple-500/20 border-2 border-indigo-500/50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span>💡</span>
                    <span>배포 꿀팁</span>
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400">⭐</span>
                      <span>.env 파일은 절대 Git에 올리지 마세요! 환경 변수는 플랫폼 설정에서 추가하세요.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400">⭐</span>
                      <span>배포 전에 로컬에서 `npm run build`가 성공하는지 꼭 확인하세요.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400">⭐</span>
                      <span>에러가 나면 배포 로그를 꼭 확인하세요. 대부분의 문제는 로그에 답이 있어요!</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400">⭐</span>
                      <span>무료 플랜의 제한을 확인하고, 초과하지 않도록 주의하세요.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
