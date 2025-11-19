'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, Typography, Space, Row, Col, Tag, Button, Alert, Divider } from 'antd';
import { 
  RocketOutlined, 
  CheckCircleOutlined, 
  WarningOutlined,
  ThunderboltOutlined,
  CodeOutlined,
  CloudOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const techStacks = [
  {
    id: 1,
    name: '스타트업 MVP 스택',
    level: '초급 ~ 중급',
    popular: true,
    frontend: { name: 'React', version: '18.x', skillicon: 'react' },
    backend: { name: 'Node.js + Express', version: '20.x LTS', skillicon: 'nodejs,express' },
    database: { name: 'MongoDB', version: '7.x', skillicon: 'mongodb' },
    deployment: { name: 'Vercel + MongoDB Atlas', skillicon: 'vercel' },
    pros: [
      'JavaScript 단일 언어로 풀스택 개발',
      '빠른 프로토타입 개발 (2-4주)',
      '무료 배포 가능 (Vercel Free Tier)',
      '방대한 npm 생태계',
      'JSON 기반으로 프론트-백엔드 데이터 교환 간편'
    ],
    cons: [
      'JavaScript 타입 안정성 부족 (TypeScript 권장)',
      'MongoDB 스키마 유연성으로 인한 데이터 일관성 문제 가능',
      '대규모 트래픽 처리에는 부적합',
      'NoSQL 경험 필요'
    ],
    useCases: ['MVP', '프로토타입', '소규모 스타트업', '개인 프로젝트'],
    deployGuide: '/deploy-guide?stack=vercel-mongodb',
    color: '#61dafb'
  },
  {
    id: 2,
    name: '엔터프라이즈 표준 스택',
    level: '중급 ~ 고급',
    popular: true,
    frontend: { name: 'React + TypeScript', version: '18.x + 5.x', skillicon: 'react,ts' },
    backend: { name: 'Spring Boot', version: '3.2.x', skillicon: 'spring' },
    database: { name: 'MySQL', version: '8.x', skillicon: 'mysql' },
    deployment: { name: 'AWS EC2 + RDS', skillicon: 'aws' },
    pros: [
      '대기업 표준 기술 스택 (취업 유리)',
      '강력한 타입 시스템 (Java + TypeScript)',
      'ACID 트랜잭션 보장 (MySQL)',
      '대규모 트래픽 처리 가능',
      'Spring Security로 강력한 인증/인가',
      '풍부한 레거시 자료와 커뮤니티'
    ],
    cons: [
      '초기 설정 복잡도 높음',
      '개발 속도가 상대적으로 느림',
      'AWS 비용 발생 (월 $20~50)',
      'Java 학습 곡선',
      '배포 과정 복잡 (CI/CD 설정 필요)'
    ],
    useCases: ['대기업 프로젝트', '금융/의료 시스템', '보안 중요 서비스', '대규모 B2B'],
    deployGuide: '/deploy-guide?stack=aws-ec2-rds',
    color: '#6db33f'
  },
  {
    id: 3,
    name: '모던 풀스택 (Next.js)',
    level: '중급',
    popular: true,
    frontend: { name: 'Next.js 14 (App Router)', version: '14.x', skillicon: 'nextjs' },
    backend: { name: 'Next.js API Routes + Prisma', version: '14.x + 5.x', skillicon: 'nextjs,prisma' },
    database: { name: 'PostgreSQL', version: '16.x', skillicon: 'postgres' },
    deployment: { name: 'Vercel + Supabase', skillicon: 'vercel,supabase' },
    pros: [
      'SSR/SSG로 SEO 최적화',
      'API Routes로 별도 백엔드 불필요',
      'Prisma로 타입 안전한 ORM',
      'Vercel 배포 한 번 클릭',
      'React Server Components',
      'PostgreSQL의 강력한 쿼리 기능'
    ],
    cons: [
      'Next.js 학습 곡선 (App Router 새로운 패러다임)',
      'Prisma 제약사항 존재',
      '복잡한 비즈니스 로직에는 한계',
      'Supabase 무료 티어 제한 (500MB DB)',
      'Serverless 특성상 Cold Start 가능'
    ],
    useCases: ['블로그', '포트폴리오', '랜딩 페이지', '중소규모 SaaS', 'SEO 중요 서비스'],
    deployGuide: '/deploy-guide?stack=vercel-supabase',
    color: '#000000'
  },
  {
    id: 4,
    name: 'AI/데이터 중심 스택',
    level: '중급 ~ 고급',
    popular: false,
    frontend: { name: 'React + TypeScript', version: '18.x + 5.x', skillicon: 'react,ts' },
    backend: { name: 'FastAPI (Python)', version: '0.104.x', skillicon: 'fastapi,python' },
    database: { name: 'PostgreSQL + Redis', version: '16.x + 7.x', skillicon: 'postgres,redis' },
    deployment: { name: 'AWS ECS + RDS', skillicon: 'aws' },
    pros: [
      'Python으로 AI/ML 모델 쉽게 통합',
      'FastAPI의 빠른 성능 (비동기)',
      '자동 API 문서화 (Swagger)',
      'PostgreSQL + Redis 조합으로 고성능 캐싱',
      'Pandas, NumPy 등 데이터 분석 라이브러리 활용'
    ],
    cons: [
      'Python 멀티스레딩 제약 (GIL)',
      'FastAPI 생태계가 Spring보다 작음',
      'ECS 비용 부담 (월 $50+)',
      'Redis 관리 복잡도',
      'Python 타입 힌팅 한계'
    ],
    useCases: ['AI 챗봇', '추천 시스템', '데이터 분석 대시보드', '이미지/영상 처리'],
    deployGuide: '/deploy-guide?stack=aws-ecs',
    color: '#009688'
  },
  {
    id: 5,
    name: 'JAMstack (정적 사이트)',
    level: '초급',
    popular: false,
    frontend: { name: 'Next.js (Static)', version: '14.x', skillicon: 'nextjs' },
    backend: { name: 'Headless CMS (Strapi)', version: '4.x', skillicon: 'nodejs' },
    database: { name: 'SQLite / PostgreSQL', version: '-', skillicon: 'sqlite,postgres' },
    deployment: { name: 'Netlify + Strapi Cloud', skillicon: 'netlify' },
    pros: [
      '초고속 로딩 (CDN 배포)',
      '서버 비용 거의 없음 (정적 호스팅)',
      'CMS로 비개발자도 콘텐츠 관리',
      '보안 우수 (서버 공격 면적 최소)',
      'Netlify 무료 배포'
    ],
    cons: [
      '동적 기능 제한적',
      '실시간 데이터 처리 불가',
      'CMS 의존도 높음',
      '복잡한 비즈니스 로직 구현 어려움',
      '빌드 시간 증가 (콘텐츠 많을수록)'
    ],
    useCases: ['블로그', '문서 사이트', '회사 홈페이지', '마케팅 랜딩 페이지'],
    deployGuide: '/deploy-guide?stack=netlify',
    color: '#00c7b7'
  },
  {
    id: 6,
    name: '마이크로서비스 (고급)',
    level: '고급',
    popular: false,
    frontend: { name: 'React + Micro-Frontend', version: '18.x', skillicon: 'react' },
    backend: { name: 'Spring Boot (Multi-Module)', version: '3.2.x', skillicon: 'spring,java' },
    database: { name: 'MySQL + MongoDB (Polyglot)', version: '8.x + 7.x', skillicon: 'mysql,mongodb' },
    deployment: { name: 'AWS EKS (Kubernetes)', skillicon: 'kubernetes,aws' },
    pros: [
      '서비스 독립적 확장',
      '장애 격리 (한 서비스 다운해도 전체 영향 최소)',
      '팀별 기술 스택 자유',
      '대규모 조직에 적합',
      'CI/CD 파이프라인 독립'
    ],
    cons: [
      '운영 복잡도 매우 높음',
      'Kubernetes 학습 곡선 가파름',
      'AWS EKS 비용 매우 높음 (월 $200+)',
      '분산 트랜잭션 어려움',
      '초기 구축 기간 길음 (3개월+)'
    ],
    useCases: ['대규모 플랫폼', '글로벌 서비스', '넷플릭스/우버 수준', '다국적 조직'],
    deployGuide: '/deploy-guide?stack=aws-eks',
    color: '#326ce5'
  }
];

export default function TechStackPage() {
  const [selectedStack, setSelectedStack] = useState<number | null>(null);

  const selected = selectedStack !== null ? techStacks[selectedStack] : null;

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card>
        <Title level={1}>
          <ThunderboltOutlined /> 기술 스택 추천
        </Title>
        <Paragraph style={{ fontSize: 16 }}>
          프로젝트 목적에 맞는 프론트엔드 · 백엔드 · DB · 배포 조합을 추천합니다
        </Paragraph>
        <Alert
          message="💡 팁: 초보자는 '스타트업 MVP 스택'이나 'JAMstack'부터 시작하세요!"
          type="info"
          showIcon
        />
      </Card>

      <Card>
        <Title level={3}>추천 기술 스택</Title>
        <Row gutter={[16, 16]}>
          {techStacks.map((stack, idx) => (
            <Col xs={24} md={12} lg={8} key={stack.id}>
              <Card
                hoverable
                onClick={() => setSelectedStack(idx)}
                style={{
                  borderLeft: `4px solid ${stack.color}`,
                  height: '100%',
                  background: selectedStack === idx ? '#f0f5ff' : '#fff'
                }}
              >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div>
                    <Title level={4} style={{ marginBottom: 8 }}>
                      {stack.name}
                    </Title>
                    <Space wrap>
                      <Tag color="blue">{stack.level}</Tag>
                      {stack.popular && <Tag color="gold">인기</Tag>}
                    </Space>
                  </div>

                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <div>
                      <Text type="secondary">Frontend</Text>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Image 
                          src={`https://skillicons.dev/icons?i=${stack.frontend.skillicon}`}
                          alt={stack.frontend.name}
                          width={24}
                          height={24}
                        />
                        <Text strong>{stack.frontend.name}</Text>
                      </div>
                    </div>
                    <div>
                      <Text type="secondary">Backend</Text>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Image 
                          src={`https://skillicons.dev/icons?i=${stack.backend.skillicon}`}
                          alt={stack.backend.name}
                          width={24}
                          height={24}
                        />
                        <Text strong>{stack.backend.name}</Text>
                      </div>
                    </div>
                    <div>
                      <Text type="secondary">Database</Text>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Image 
                          src={`https://skillicons.dev/icons?i=${stack.database.skillicon}`}
                          alt={stack.database.name}
                          width={24}
                          height={24}
                        />
                        <Text strong>{stack.database.name}</Text>
                      </div>
                    </div>
                    <div>
                      <Text type="secondary">Deployment</Text>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Image 
                          src={`https://skillicons.dev/icons?i=${stack.deployment.skillicon}`}
                          alt={stack.deployment.name}
                          width={24}
                          height={24}
                        />
                        <Text strong>{stack.deployment.name}</Text>
                      </div>
                    </div>
                  </Space>

                  <Button 
                    type="primary" 
                    block
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedStack(idx);
                    }}
                  >
                    자세히 보기
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {selected && (
        <Card style={{ borderLeft: `4px solid ${selected.color}` }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={2}>{selected.name}</Title>
              <Space wrap>
                <Tag color="blue">{selected.level}</Tag>
                {selected.popular && <Tag color="gold">인기 스택</Tag>}
              </Space>
            </div>

            <Divider />

            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Card size="small" style={{ background: '#f6ffed', borderColor: '#b7eb8f' }}>
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <Title level={4}>
                      <CheckCircleOutlined style={{ color: '#52c41a' }} /> 장점
                    </Title>
                    <ul style={{ paddingLeft: 20, margin: 0 }}>
                      {selected.pros.map((pro, idx) => (
                        <li key={idx} style={{ marginBottom: 8 }}>
                          <Text>{pro}</Text>
                        </li>
                      ))}
                    </ul>
                  </Space>
                </Card>
              </Col>

              <Col xs={24} md={12}>
                <Card size="small" style={{ background: '#fff2e8', borderColor: '#ffbb96' }}>
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <Title level={4}>
                      <WarningOutlined style={{ color: '#fa8c16' }} /> 단점
                    </Title>
                    <ul style={{ paddingLeft: 20, margin: 0 }}>
                      {selected.cons.map((con, idx) => (
                        <li key={idx} style={{ marginBottom: 8 }}>
                          <Text>{con}</Text>
                        </li>
                      ))}
                    </ul>
                  </Space>
                </Card>
              </Col>
            </Row>

            <Divider />

            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Card size="small">
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <Title level={4}>
                      <CodeOutlined /> 기술 스택 상세
                    </Title>
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      <Card type="inner" size="small">
                        <Text strong>Frontend</Text>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                          <Image 
                            src={`https://skillicons.dev/icons?i=${selected.frontend.skillicon}`}
                            alt={selected.frontend.name}
                            width={32}
                            height={32}
                          />
                          <span>{selected.frontend.name} {selected.frontend.version}</span>
                        </div>
                      </Card>
                      <Card type="inner" size="small">
                        <Text strong>Backend</Text>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                          <Image 
                            src={`https://skillicons.dev/icons?i=${selected.backend.skillicon}`}
                            alt={selected.backend.name}
                            width={32}
                            height={32}
                          />
                          <span>{selected.backend.name} {selected.backend.version}</span>
                        </div>
                      </Card>
                      <Card type="inner" size="small">
                        <Text strong>Database</Text>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                          <Image 
                            src={`https://skillicons.dev/icons?i=${selected.database.skillicon}`}
                            alt={selected.database.name}
                            width={32}
                            height={32}
                          />
                          <span>{selected.database.name} {selected.database.version}</span>
                        </div>
                      </Card>
                      <Card type="inner" size="small">
                        <Text strong>Deployment</Text>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                          <Image 
                            src={`https://skillicons.dev/icons?i=${selected.deployment.skillicon}`}
                            alt={selected.deployment.name}
                            width={32}
                            height={32}
                          />
                          <span>{selected.deployment.name}</span>
                        </div>
                      </Card>
                    </Space>
                  </Space>
                </Card>
              </Col>

              <Col xs={24} md={12}>
                <Card size="small">
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <Title level={4}>
                      <RocketOutlined /> 적합한 프로젝트
                    </Title>
                    <Space wrap>
                      {selected.useCases.map((useCase, idx) => (
                        <Tag key={idx} color="purple" style={{ fontSize: 14, padding: '4px 12px' }}>
                          {useCase}
                        </Tag>
                      ))}
                    </Space>
                  </Space>
                </Card>
              </Col>
            </Row>

            <Divider />

            <Card style={{ background: '#e6f7ff', borderColor: '#91d5ff' }}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Title level={4}>
                  <CloudOutlined /> 배포 가이드 바로가기
                </Title>
                <Paragraph>
                  <Text strong>{selected.deployment.name}</Text>에 배포하는 방법을 단계별로 안내합니다.
                </Paragraph>
                <Link href={selected.deployGuide}>
                  <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
                    {selected.deployment.name} 배포 가이드 보기
                  </Button>
                </Link>
              </Space>
            </Card>
          </Space>
        </Card>
      )}
    </Space>
  );
}
