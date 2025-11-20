'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { 
  Button, 
  Card, 
  Tag, 
  Row, 
  Col, 
  Typography, 
  Space,
  Divider
} from 'antd';
import {
  RocketOutlined,
  CodeOutlined,
  BugOutlined,
  ApiOutlined,
  DatabaseOutlined,
  GitlabOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  FireOutlined,
  BookOutlined,
  ExperimentOutlined,
  ToolOutlined,
  CloudOutlined,
  DesktopOutlined,
  GlobalOutlined,
  FolderOutlined,
  BulbOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function HomePage() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const supabase = createClientComponentClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          setUser(user);
          const { data: profile } = await supabase
            .from('profiles')
            .select('nickname')
            .eq('id', user.id)
            .single();
          
          if (profile?.nickname) {
            setNickname(profile.nickname);
          } else {
            setNickname(user.email?.split('@')[0] || '개발자');
          }
        }
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const features = [
    {
      icon: <CodeOutlined style={{ fontSize: 48 }} />,
      title: 'AI가 다 알아서 관리',
      items: ['복습 스케줄 자동 생성', '약점 분석 후 맞춤 문제', '24/7 AI 코치 질문 답변']
    },
    {
      icon: <ThunderboltOutlined style={{ fontSize: 48 }} />,
      title: '색상으로 한눈에 구분해요',
      items: [
        { text: '빨간색 = 암기 필수', color: '#FF0000' },
        { text: '파란색 = 이해만', color: '#1890ff' },
        { text: '보라색 = 실습', color: '#722ed1' }
      ]
    },
    {
      icon: <TrophyOutlined style={{ fontSize: 48 }} />,
      title: '게임처럼 재밌게',
      items: ['레벨업 시스템', '업적 뱃지 수집', '연속 출석 스트릭']
    },
  ];

  const mainFeatures = [
    { icon: <RocketOutlined />, title: '레벨 평가', desc: '맞춤 학습 경로 제공', href: '/level-assessment' },
    { icon: <ThunderboltOutlined />, title: '기술 스택 추천', desc: '프로젝트별 최적 조합', href: '/tech-stack' },
    { icon: <CodeOutlined />, title: 'AI 코치', desc: '24/7 코드 리뷰', href: '/ai-coach' },
    { icon: <TrophyOutlined />, title: 'CSS 스피드런', desc: '하루 10분 과제', href: '/missions' },
  ];

  // Frontend tools by language
  const frontendTools = {
    all: [
      { icon: <FireOutlined />, title: 'CSS 스피드런', desc: '자동 채점 CSS 실습', href: '/missions', color: '#f5222d', langs: ['html', 'css'] },
  // 접근성 검사기는 기초상식에 통합
      { icon: <CodeOutlined />, title: 'JS 암기장', desc: '레벨별 JS 개념 암기', href: '/js-cheats', color: '#52c41a', langs: ['js'] },
      { icon: <BookOutlined />, title: 'JS 개념 스냅샷', desc: '표현식/문, this, async', href: '/concept-snaps', color: '#1890ff', langs: ['js'] },
      { icon: <ThunderboltOutlined />, title: '비동기 시뮬레이터', desc: 'await ~ finally 시각화', href: '/async-simulator', color: '#faad14', langs: ['js'] },
      { icon: <ApiOutlined />, title: 'API 샌드박스', desc: 'fetch/axios 실습', href: '/api-sandbox', color: '#13c2c2', langs: ['js', 'ts'] },
      { icon: <CodeOutlined />, title: '클론 코딩 코치', desc: 'VS Code 에디터 비교', href: '/clone-coach', color: '#722ed1', langs: ['react', 'vue'] },
    ],
    html: [
      { icon: <FireOutlined />, title: 'CSS 스피드런', desc: '자동 채점 CSS 실습', href: '/missions', color: '#f5222d' },
      { icon: <CheckCircleOutlined />, title: '접근성 검사기', desc: 'ARIA 점검 및 제안', href: '/accessibility-checker', color: '#52c41a' },
    ],
    css: [
      { icon: <FireOutlined />, title: 'CSS 스피드런', desc: '자동 채점 CSS 실습', href: '/missions', color: '#f5222d' },
    ],
    js: [
      { icon: <CodeOutlined />, title: 'JS 암기장', desc: '레벨별 JS 개념 암기', href: '/js-cheats', color: '#52c41a' },
      { icon: <BookOutlined />, title: 'JS 개념 스냅샷', desc: '표현식/문, this, async', href: '/concept-snaps', color: '#1890ff' },
      { icon: <ThunderboltOutlined />, title: '비동기 시뮬레이터', desc: 'await ~ finally 시각화', href: '/async-simulator', color: '#faad14' },
      { icon: <ApiOutlined />, title: 'API 샌드박스', desc: 'fetch/axios 실습', href: '/api-sandbox', color: '#13c2c2' },
    ],
    ts: [
      { icon: <ApiOutlined />, title: 'API 샌드박스', desc: 'fetch/axios 실습', href: '/api-sandbox', color: '#13c2c2' },
    ],
    react: [
      { icon: <CodeOutlined />, title: '클론 코딩 코치', desc: 'VS Code 에디터 비교', href: '/clone-coach', color: '#722ed1' },
    ],
    vue: [
      { icon: <CodeOutlined />, title: '클론 코딩 코치', desc: 'VS Code 에디터 비교', href: '/clone-coach', color: '#722ed1' },
    ],
  };

  // Backend tools by language
  const backendTools = {
    all: [
      { icon: <DatabaseOutlined />, title: 'DB 스키마 메이커', desc: '요구사항 → DDL 생성', href: '/db-schema', color: '#eb2f96', langs: ['sql'] },
      { icon: <ToolOutlined />, title: '실무 패턴 주입', desc: 'Controller→Service→Repository', href: '/pattern-scaffolder', color: '#13c2c2', langs: ['java', 'spring', 'node'] },
      { icon: <ApiOutlined />, title: 'API 샌드박스', desc: 'fetch/axios 실습', href: '/api-sandbox', color: '#13c2c2', langs: ['node', 'python', 'java'] },
    ],
    node: [
      { icon: <ToolOutlined />, title: '실무 패턴 주입', desc: 'Controller→Service→Repository', href: '/pattern-scaffolder', color: '#13c2c2' },
      { icon: <ApiOutlined />, title: 'API 샌드박스', desc: 'fetch/axios 실습', href: '/api-sandbox', color: '#13c2c2' },
    ],
    python: [
      { icon: <ApiOutlined />, title: 'API 샌드박스', desc: 'fetch/axios 실습', href: '/api-sandbox', color: '#13c2c2' },
    ],
    java: [
      { icon: <ToolOutlined />, title: '실무 패턴 주입', desc: 'Controller→Service→Repository', href: '/pattern-scaffolder', color: '#13c2c2' },
      { icon: <ApiOutlined />, title: 'API 샌드박스', desc: 'fetch/axios 실습', href: '/api-sandbox', color: '#13c2c2' },
    ],
    spring: [
      { icon: <ToolOutlined />, title: '실무 패턴 주입', desc: 'Controller→Service→Repository', href: '/pattern-scaffolder', color: '#13c2c2' },
    ],
    sql: [
      { icon: <DatabaseOutlined />, title: 'DB 스키마 메이커', desc: '요구사항 → DDL 생성', href: '/db-schema', color: '#eb2f96' },
    ],
  };

  // DevOps & General tools
  const devopsTools = [
    { icon: <RocketOutlined />, title: '배포 가이드', desc: 'Vercel/AWS 배포 실습', href: '/deploy-guide', color: '#52c41a' },
    { icon: <GitlabOutlined />, title: 'Git 시뮬레이터', desc: '브라우저에서 Git 실습', href: '/git-simulator', color: '#1890ff' },
    { icon: <BugOutlined />, title: '에러 닥터', desc: '에러 분석 및 해결', href: '/error-doctor', color: '#f5222d' },
    { icon: <BugOutlined />, title: '커밋/PR 비서', desc: 'Conventional Commits', href: '/commit-assistant', color: '#52c41a' },
  ];

  // Learning & Career tools
  const careerTools = [
    { icon: <ThunderboltOutlined />, title: '기술 스택 추천', desc: '프론트/백엔드/DB 조합', href: '/tech-stack', color: '#722ed1' },
    { icon: <TrophyOutlined />, title: '포트폴리오 빌더', desc: '프로젝트 카드 구성', href: '/portfolio', color: '#722ed1' },
    { icon: <CodeOutlined />, title: '면접 리허설', desc: '질문/모범답안/실습', href: '/interview-practice', color: '#1890ff' },
    { icon: <BookOutlined />, title: '러닝 경로', desc: '목표별 N주 로드맵', href: '/learning-paths', color: '#1890ff' },
    { icon: <ExperimentOutlined />, title: '학습 레이더', desc: '취약 개념 분석', href: '/learning-radar', color: '#faad14' },
    { icon: <CodeOutlined />, title: '클린 코드 가이드', desc: '리팩토링과 디자인 패턴', href: '/clean-code', color: '#52c41a' },
    { icon: <FolderOutlined />, title: '프로젝트 구조 배우기', desc: 'VS Code 파일 트리 시뮬레이션', href: '/project-structure', color: '#52c41a' },
    { icon: <BulbOutlined />, title: 'UI 컴포넌트 가이드', desc: 'Ant Design 사용법과 재사용 패턴', href: '/ui-guide', color: '#13c2c2' },
  ];

  const [selectedFrontendLang, setSelectedFrontendLang] = useState<string>('all');
  const [selectedBackendLang, setSelectedBackendLang] = useState<string>('all');

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* Hero Section */}
      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%', textAlign: 'center' }}>
          <Tag icon={<FireOutlined />} color="gold">100% 무료 · 회원가입 30초</Tag>

          {!loading && user ? (
            <>
              <Title>안녕하세요, <Text type="warning">{nickname}</Text>님!</Title>
              <Title level={2}>오늘도 재밌게 학습해볼까요?</Title>
            </>
          ) : (
            <>
              <Title>집에서 혼자 공부하는</Title>
              <Title style={{ fontSize: '2rem' }}>당신을 위한 AI 학습 파트너</Title>
            </>
          )}

          <Paragraph>
            초보 개발자 · 취준생 · N잡 준비생 · 비전공자 · ADHD<br />
            <Text strong>AI 코치가 함께하는 즐거운 코딩 학습</Text>
          </Paragraph>

          <Space>
            {!loading && user ? (
              <>
                <Button type="primary" size="large" icon={<RocketOutlined />} href="/dashboard">대시보드로 이동</Button>
                <Button size="large" href="/missions">오늘의 미션</Button>
              </>
            ) : (
              <>
                <Button type="primary" size="large" icon={<RocketOutlined />} href="/signup">무료로 시작하기</Button>
                <Button size="large" href="/login">로그인</Button>
              </>
            )}
          </Space>

          <Space>
            <Tag icon={<CheckCircleOutlined />} color="success">100% 무료</Tag>
            <Tag icon={<CheckCircleOutlined />} color="success">회원가입 30초</Tag>
            <Tag icon={<CheckCircleOutlined />} color="success">ADHD 친화적</Tag>
          </Space>
        </Space>
      </Card>

      {/* Core Values */}
      <Card>
        <Paragraph type="secondary" style={{ textAlign: 'center' }}>다른 학습 플랫폼과 뭐가 다른가요?</Paragraph>
        <Divider />

        <Row gutter={[24, 24]}>
          {features.map((feature, idx) => (
            <Col xs={24} md={8} key={idx}>
              <Card hoverable>
                <Space direction="vertical" size="middle" style={{ width: '100%', textAlign: 'center' }}>
                  {feature.icon}
                  <Title level={4}>{feature.title}</Title>
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    {feature.items.map((item, i) => (
                      <div key={i}>
                        <CheckCircleOutlined /> 
                        {typeof item === 'string' ? (item) : (
                          <Text strong style={{ color: item.color }}>{item.text}</Text>
                        )}
                      </div>
                    ))}
                  </Space>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Main Features */}
      <Card>
        <Title level={2} style={{ textAlign: 'center' }}><RocketOutlined /> 주요 기능</Title>
        <Divider />

        <Row gutter={[24, 24]}>
          {mainFeatures.map((feature, idx) => (
            <Col xs={24} sm={12} lg={6} key={idx}>
              <Link href={feature.href}>
                <Card hoverable>
                  <Space direction="vertical" size="middle" style={{ width: '100%', textAlign: 'center' }}>
                    <div style={{ fontSize: 48 }}>{feature.icon}</div>
                    <Title level={4}>{feature.title}</Title>
                    <Paragraph type="secondary">{feature.desc}</Paragraph>
                  </Space>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Frontend Basic Knowledge Section */}
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={2}>
              <BookOutlined /> 기초 상식
            </Title>
            <Paragraph type="secondary">웹 표준, HTML/CSS, 접근성, 반응형 등 프론트엔드 개발의 기본 개념을 익혀보세요.</Paragraph>
          </div>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card hoverable style={{ borderLeft: '4px solid #1890ff', height: '100%' }}>
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <div style={{ fontSize: 32, color: '#1890ff' }}><BookOutlined /></div>
                  <Title level={5} style={{ margin: 0 }}>HTML/CSS 기초</Title>
                  <Text type="secondary" style={{ fontSize: 13 }}>태그, 시맨틱 마크업, 스타일링의 기본</Text>
                </Space>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Link href="/accessibility-checker">
                <Card hoverable style={{ borderLeft: '4px solid #52c41a', height: '100%' }}>
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <div style={{ fontSize: 32, color: '#52c41a' }}><CheckCircleOutlined /></div>
                    <Title level={5} style={{ margin: 0 }}>웹 표준 & 접근성 검사기</Title>
                    <Text type="secondary" style={{ fontSize: 13 }}>W3C, ARIA, 시각장애인 지원, 접근성 자동 점검</Text>
                  </Space>
                </Card>
              </Link>
            </Col>
          </Row>
        </Space>
      </Card>

      {/* Frontend Section */}
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={2}>
              <DesktopOutlined />
              <span style={{ marginLeft: 8 }}>Frontend</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginLeft: 8, fontWeight: 500, fontSize: 16 }}>
                <span style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '4px 14px', marginRight: 4 }}>컴포넌트 구조 설계</span>
                <span style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '4px 14px', marginRight: 4 }}>컴포넌트 및 반응형 디자인 구현</span>
                <span style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '4px 14px', marginRight: 4 }}>목업 데이터 기반 시나리오 구현</span>
                <span style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '4px 14px', marginRight: 4 }}>API 연동</span>
                <span style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '4px 14px' }}>테스트 및 검증</span>
              </span>
            </Title>
            <Paragraph type="secondary">HTML, CSS, JavaScript, React, Vue 등 프론트엔드 기술 학습</Paragraph>
          </div>

          {/* Language Filter */}
          <Space wrap size="small">
            <Button 
              type={selectedFrontendLang === 'all' ? 'primary' : 'default'}
              onClick={() => setSelectedFrontendLang('all')}
            >
              전체 보기
            </Button>
            <Button 
              type={selectedFrontendLang === 'html' ? 'primary' : 'default'}
              onClick={() => setSelectedFrontendLang('html')}
              icon={<Image src="https://skillicons.dev/icons?i=html" alt="HTML" width={16} height={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }} />}
            >
              HTML
            </Button>
            <Button 
              type={selectedFrontendLang === 'css' ? 'primary' : 'default'}
              onClick={() => setSelectedFrontendLang('css')}
              icon={<Image src="https://skillicons.dev/icons?i=css" alt="CSS" width={16} height={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }} />}
            >
              CSS
            </Button>
            <Button 
              type={selectedFrontendLang === 'js' ? 'primary' : 'default'}
              onClick={() => setSelectedFrontendLang('js')}
              icon={<Image src="https://skillicons.dev/icons?i=js" alt="JS" width={16} height={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }} />}
            >
              JavaScript
            </Button>
            <Button 
              type={selectedFrontendLang === 'ts' ? 'primary' : 'default'}
              onClick={() => setSelectedFrontendLang('ts')}
              icon={<Image src="https://skillicons.dev/icons?i=ts" alt="TS" width={16} height={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }} />}
            >
              TypeScript
            </Button>
            <Button 
              type={selectedFrontendLang === 'react' ? 'primary' : 'default'}
              onClick={() => setSelectedFrontendLang('react')}
              icon={<Image src="https://skillicons.dev/icons?i=react" alt="React" width={16} height={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }} />}
            >
              React
            </Button>
            <Button 
              type={selectedFrontendLang === 'vue' ? 'primary' : 'default'}
              onClick={() => setSelectedFrontendLang('vue')}
              icon={<Image src="https://skillicons.dev/icons?i=vue" alt="Vue" width={16} height={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }} />}
            >
              Vue
            </Button>
          </Space>

          {/* 전체보기일 때만 카테고리별로 분리 */}
          {selectedFrontendLang === 'all' ? (
            <>
              <Divider orientation="left" plain>구조/설계</Divider>
              <Row gutter={[16, 16]}>
                {frontendTools.all.filter(t => t.title.includes('구조') || t.title.includes('접근성')).map((tool, idx) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={idx}>
                    <Link href={tool.href}>
                      <Card hoverable style={{ borderLeft: `4px solid ${tool.color}`, height: '100%' }}>
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                          <div style={{ fontSize: 32, color: tool.color }}>{tool.icon}</div>
                          <Title level={5} style={{ margin: 0 }}>{tool.title}</Title>
                          <Text type="secondary" style={{ fontSize: 13 }}>{tool.desc}</Text>
                        </Space>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
              <Divider orientation="left" plain>UI/디자인</Divider>
              <Row gutter={[16, 16]}>
                {frontendTools.all.filter(t => t.title.includes('CSS') || t.title.includes('클론')).map((tool, idx) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={idx}>
                    <Link href={tool.href}>
                      <Card hoverable style={{ borderLeft: `4px solid ${tool.color}`, height: '100%' }}>
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                          <div style={{ fontSize: 32, color: tool.color }}>{tool.icon}</div>
                          <Title level={5} style={{ margin: 0 }}>{tool.title}</Title>
                          <Text type="secondary" style={{ fontSize: 13 }}>{tool.desc}</Text>
                        </Space>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
              <Divider orientation="left" plain>로직/시나리오</Divider>
              <Row gutter={[16, 16]}>
                {frontendTools.all.filter(t => t.title.includes('JS') || t.title.includes('비동기')).map((tool, idx) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={idx}>
                    <Link href={tool.href}>
                      <Card hoverable style={{ borderLeft: `4px solid ${tool.color}`, height: '100%' }}>
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                          <div style={{ fontSize: 32, color: tool.color }}>{tool.icon}</div>
                          <Title level={5} style={{ margin: 0 }}>{tool.title}</Title>
                          <Text type="secondary" style={{ fontSize: 13 }}>{tool.desc}</Text>
                        </Space>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
              <Divider orientation="left" plain>API/연동</Divider>
              <Row gutter={[16, 16]}>
                {frontendTools.all.filter(t => t.title.includes('API')).map((tool, idx) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={idx}>
                    <Link href={tool.href}>
                      <Card hoverable style={{ borderLeft: `4px solid ${tool.color}`, height: '100%' }}>
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                          <div style={{ fontSize: 32, color: tool.color }}>{tool.icon}</div>
                          <Title level={5} style={{ margin: 0 }}>{tool.title}</Title>
                          <Text type="secondary" style={{ fontSize: 13 }}>{tool.desc}</Text>
                        </Space>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <Row gutter={[16, 16]}>
              {frontendTools[selectedFrontendLang as keyof typeof frontendTools].map((tool, idx) => (
                <Col xs={24} sm={12} md={8} lg={6} key={idx}>
                  <Link href={tool.href}>
                    <Card 
                      hoverable
                      style={{ 
                        borderLeft: `4px solid ${tool.color}`,
                        height: '100%'
                      }}
                    >
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <div style={{ fontSize: 32, color: tool.color }}>{tool.icon}</div>
                        <Title level={5} style={{ margin: 0 }}>{tool.title}</Title>
                        <Text type="secondary" style={{ fontSize: 13 }}>{tool.desc}</Text>
                      </Space>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          )}
        </Space>
      </Card>

      {/* Backend Section */}
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={2}>
              <DatabaseOutlined />
              <span style = {{ marginLeft: '8px' }}>Backend</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginLeft: 8, fontWeight: 500, fontSize: 16 }}>
                <span style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '4px 14px', marginRight: 4 }}>데이터베이스 설계</span>
                <span style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '4px 14px', marginRight: 4 }}>API 설계</span>
                <span style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '4px 14px', marginRight: 4 }}>비즈니스 로직 구현</span>
                <span style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '4px 14px', marginRight: 4 }}>API 배포 및 문서화</span>
                <span style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '4px 14px' }}>테스트 및 검증</span>
              </span>
            </Title>
            <Paragraph type="secondary">Node.js, Python, Java, Spring Boot 등 백엔드 기술 학습</Paragraph>
          </div>

          {/* Language Filter */}
          <Space wrap size="small">
            <Button 
              type={selectedBackendLang === 'all' ? 'primary' : 'default'}
              onClick={() => setSelectedBackendLang('all')}
            >
              전체 보기
            </Button>
            <Button 
              type={selectedBackendLang === 'node' ? 'primary' : 'default'}
              onClick={() => setSelectedBackendLang('node')}
              icon={<Image src="https://skillicons.dev/icons?i=nodejs" alt="Node" width={16} height={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }} />}
            >
              Node.js
            </Button>
            <Button 
              type={selectedBackendLang === 'python' ? 'primary' : 'default'}
              onClick={() => setSelectedBackendLang('python')}
              icon={<Image src="https://skillicons.dev/icons?i=python" alt="Python" width={16} height={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }} />}
            >
              Python
            </Button>
            <Button 
              type={selectedBackendLang === 'java' ? 'primary' : 'default'}
              onClick={() => setSelectedBackendLang('java')}
              icon={<Image src="https://skillicons.dev/icons?i=java" alt="Java" width={16} height={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }} />}
            >
              Java
            </Button>
            <Button 
              type={selectedBackendLang === 'spring' ? 'primary' : 'default'}
              onClick={() => setSelectedBackendLang('spring')}
              icon={<Image src="https://skillicons.dev/icons?i=spring" alt="Spring" width={16} height={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }} />}
            >
              Spring Boot
            </Button>
            <Button 
              type={selectedBackendLang === 'sql' ? 'primary' : 'default'}
              onClick={() => setSelectedBackendLang('sql')}
              icon={<Image src="https://skillicons.dev/icons?i=mysql" alt="SQL" width={16} height={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }} />}
            >
              SQL
            </Button>
          </Space>

          {selectedBackendLang === 'all' ? (
            <>
              <Divider orientation="left" plain>DB/설계</Divider>
              <Row gutter={[16, 16]}>
                {backendTools.all.filter(t => t.title.includes('DB')).map((tool, idx) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={idx}>
                    <Link href={tool.href}>
                      <Card hoverable style={{ borderLeft: `4px solid ${tool.color}`, height: '100%' }}>
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                          <div style={{ fontSize: 32, color: tool.color }}>{tool.icon}</div>
                          <Title level={5} style={{ margin: 0 }}>{tool.title}</Title>
                          <Text type="secondary" style={{ fontSize: 13 }}>{tool.desc}</Text>
                        </Space>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
              <Divider orientation="left" plain>API/패턴</Divider>
              <Row gutter={[16, 16]}>
                {backendTools.all.filter(t => t.title.includes('패턴') || t.title.includes('API')).map((tool, idx) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={idx}>
                    <Link href={tool.href}>
                      <Card hoverable style={{ borderLeft: `4px solid ${tool.color}`, height: '100%' }}>
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                          <div style={{ fontSize: 32, color: tool.color }}>{tool.icon}</div>
                          <Title level={5} style={{ margin: 0 }}>{tool.title}</Title>
                          <Text type="secondary" style={{ fontSize: 13 }}>{tool.desc}</Text>
                        </Space>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <Row gutter={[16, 16]}>
              {backendTools[selectedBackendLang as keyof typeof backendTools].map((tool, idx) => (
                <Col xs={24} sm={12} md={8} lg={6} key={idx}>
                  <Link href={tool.href}>
                    <Card 
                      hoverable
                      style={{ 
                        borderLeft: `4px solid ${tool.color}`,
                        height: '100%'
                      }}
                    >
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <div style={{ fontSize: 32, color: tool.color }}>{tool.icon}</div>
                        <Title level={5} style={{ margin: 0 }}>{tool.title}</Title>
                        <Text type="secondary" style={{ fontSize: 13 }}>{tool.desc}</Text>
                      </Space>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          )}
        </Space>
      </Card>

      {/* DevOps & Tools */}
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={2}>
              <CloudOutlined /> DevOps & 개발 도구
            </Title>
            <Paragraph type="secondary">Git, Docker, 배포, 에러 디버깅 등 실무 필수 도구</Paragraph>
          </div>

          {/* DevOps 전체보기: 배포/버전관리/디버깅 등 카테고리 분리 */}
          <Divider orientation="left" plain>배포/CI</Divider>
          <Row gutter={[16, 16]}>
            {devopsTools.filter(t => t.title.includes('배포')).map((tool, idx) => (
              <Col xs={24} sm={12} md={8} lg={6} key={idx}>
                <Link href={tool.href}>
                  <Card hoverable style={{ borderLeft: `4px solid ${tool.color}`, height: '100%' }}>
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      <div style={{ fontSize: 32, color: tool.color }}>{tool.icon}</div>
                      <Title level={5} style={{ margin: 0 }}>{tool.title}</Title>
                      <Text type="secondary" style={{ fontSize: 13 }}>{tool.desc}</Text>
                    </Space>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
          <Divider orientation="left" plain>버전관리/Git</Divider>
          <Row gutter={[16, 16]}>
            {devopsTools.filter(t => t.title.includes('Git')).map((tool, idx) => (
              <Col xs={24} sm={12} md={8} lg={6} key={idx}>
                <Link href={tool.href}>
                  <Card hoverable style={{ borderLeft: `4px solid ${tool.color}`, height: '100%' }}>
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      <div style={{ fontSize: 32, color: tool.color }}>{tool.icon}</div>
                      <Title level={5} style={{ margin: 0 }}>{tool.title}</Title>
                      <Text type="secondary" style={{ fontSize: 13 }}>{tool.desc}</Text>
                    </Space>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
          <Divider orientation="left" plain>디버깅/품질</Divider>
          <Row gutter={[16, 16]}>
            {devopsTools.filter(t => t.title.includes('에러') || t.title.includes('커밋')).map((tool, idx) => (
              <Col xs={24} sm={12} md={8} lg={6} key={idx}>
                <Link href={tool.href}>
                  <Card hoverable style={{ borderLeft: `4px solid ${tool.color}`, height: '100%' }}>
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      <div style={{ fontSize: 32, color: tool.color }}>{tool.icon}</div>
                      <Title level={5} style={{ margin: 0 }}>{tool.title}</Title>
                      <Text type="secondary" style={{ fontSize: 13 }}>{tool.desc}</Text>
                    </Space>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Space>
      </Card>

      {/* Career & Learning */}
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={2}>
              <GlobalOutlined /> 커리어 & 학습 관리
            </Title>
            <Paragraph type="secondary">포트폴리오, 면접, 학습 경로 등 취업 준비 도구</Paragraph>
          </div>

          <Row gutter={[16, 16]}>
            {careerTools.map((tool, idx) => (
              <Col xs={24} sm={12} md={8} lg={6} key={idx}>
                <Link href={tool.href}>
                  <Card 
                    hoverable
                    style={{ 
                      borderLeft: `4px solid ${tool.color}`,
                      height: '100%'
                    }}
                  >
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      <div style={{ fontSize: 32, color: tool.color }}>{tool.icon}</div>
                      <Title level={5} style={{ margin: 0 }}>{tool.title}</Title>
                      <Text type="secondary" style={{ fontSize: 13 }}>{tool.desc}</Text>
                    </Space>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Space>
      </Card>
    </Space>
  );
}
