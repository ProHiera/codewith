'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { 
  Button, 
  Card, 
  Tag, 
  Row, 
  Col, 
  Typography, 
  Space
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
  ToolOutlined
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
      icon: <CodeOutlined style={{ fontSize: 48, color: '#6366F1' }} />,
      title: 'AI가 다 알아서 관리',
      items: ['복습 스케줄 자동 생성', '약점 분석 후 맞춤 문제', '24/7 AI 코치 질문 답변']
    },
    {
      icon: <ThunderboltOutlined style={{ fontSize: 48, color: '#F59E0B' }} />,
      title: '색깔로 딱 구분',
      items: ['노란색 = 암기 필수', '파란색 = 이해만', '보라색 = 실습']
    },
    {
      icon: <TrophyOutlined style={{ fontSize: 48, color: '#10B981' }} />,
      title: '게임처럼 재밌게',
      items: ['레벨업 시스템', '업적 뱃지 수집', '연속 출석 스트릭']
    },
  ];

  const mainFeatures = [
    { icon: <RocketOutlined />, title: '레벨 평가', desc: '맞춤 학습 경로 제공', href: '/level-assessment', color: '#52c41a' },
    { icon: <CodeOutlined />, title: 'AI 코치', desc: '24/7 코드 리뷰', href: '/ai-coach', color: '#722ed1' },
    { icon: <ThunderboltOutlined />, title: 'CSS 스피드런', desc: '하루 10분 과제', href: '/missions', color: '#faad14' },
    { icon: <TrophyOutlined />, title: '게임화', desc: '레벨업 & 뱃지', href: '/dashboard', color: '#1890ff' },
  ];

  const learningTools = [
    { icon: <GitlabOutlined />, title: 'Git 시뮬레이터', desc: '브라우저에서 Git 실습', href: '/git-simulator' },
    { icon: <BugOutlined />, title: '에러 닥터', desc: '에러 분석 및 해결', href: '/error-doctor' },
    { icon: <CodeOutlined />, title: '클론 코딩 코치', desc: '비교 및 피드백', href: '/clone-coach' },
    { icon: <ThunderboltOutlined />, title: '비동기 시뮬레이터', desc: 'async/await 시각화', href: '/async-simulator' },
    { icon: <ApiOutlined />, title: 'API 샌드박스', desc: 'API 테스트 및 디버깅', href: '/api-sandbox' },
    { icon: <DatabaseOutlined />, title: 'DB 스키마 메이커', desc: '데이터베이스 설계', href: '/db-schema' },
    { icon: <BookOutlined />, title: 'JS 개념 스냅샷', desc: '핵심 개념 카드', href: '/concept-snaps' },
    { icon: <ExperimentOutlined />, title: 'JS 치트시트', desc: '빠른 문법 참고', href: '/js-cheats' },
  ];

  return (
    <div style={{ background: '#f5f5f5' }}>
      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '80px 24px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Tag 
            icon={<FireOutlined />} 
            color="gold" 
            style={{ marginBottom: 24, fontSize: 14, padding: '8px 16px' }}
          >
            100% 무료 · 회원가입 30초
          </Tag>

          {!loading && user ? (
            <Title style={{ color: 'white', marginBottom: 16, fontSize: 48 }}>
              안녕하세요, <span style={{ color: '#fbbf24' }}>{nickname}</span>님!<br />
              <span style={{ fontSize: 36 }}>오늘도 재밌게 학습해볼까요?</span>
            </Title>
          ) : (
            <Title style={{ color: 'white', marginBottom: 16, fontSize: 48 }}>
              집에서 혼자 공부하는<br />
              <span style={{ color: '#fbbf24' }}>당신을 위한 AI 학습 파트너</span>
            </Title>
          )}

          <Paragraph style={{ color: 'rgba(255,255,255,0.9)', fontSize: 18, marginBottom: 32 }}>
            초보 개발자 · 취준생 · N잡 준비생 · 비전공자를 위한<br />
            <Text strong style={{ color: 'white' }}>AI 코치가 함께하는 즐거운 코딩 학습</Text>
          </Paragraph>

          <Space size="large">
            {!loading && user ? (
              <>
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<RocketOutlined />}
                  href="/dashboard"
                  style={{ height: 48, fontSize: 16, paddingLeft: 32, paddingRight: 32 }}
                >
                  대시보드로 이동
                </Button>
                <Button 
                  size="large"
                  style={{ height: 48, fontSize: 16, paddingLeft: 32, paddingRight: 32, background: 'white' }}
                  href="/missions"
                >
                  오늘의 미션
                </Button>
              </>
            ) : (
              <>
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<RocketOutlined />}
                  href="/signup"
                  style={{ height: 48, fontSize: 16, paddingLeft: 32, paddingRight: 32 }}
                >
                  무료로 시작하기
                </Button>
                <Button 
                  size="large"
                  style={{ height: 48, fontSize: 16, paddingLeft: 32, paddingRight: 32, background: 'white' }}
                  href="/login"
                >
                  로그인
                </Button>
              </>
            )}
          </Space>

          <div style={{ marginTop: 32 }}>
            <Space size="large">
              <Tag icon={<CheckCircleOutlined />} color="success">100% 무료</Tag>
              <Tag icon={<CheckCircleOutlined />} color="success">회원가입 30초</Tag>
              <Tag icon={<CheckCircleOutlined />} color="success">ADHD 친화적</Tag>
            </Space>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 16 }}>
            💎 우리가 제공하는 핵심 가치
          </Title>
          <Paragraph style={{ textAlign: 'center', fontSize: 16, color: '#666', marginBottom: 48 }}>
            다른 학습 플랫폼과 뭐가 다른가요?
          </Paragraph>

          <Row gutter={[24, 24]}>
            {features.map((feature, idx) => (
              <Col xs={24} md={8} key={idx}>
                <Card 
                  hoverable
                  style={{ height: '100%', textAlign: 'center' }}
                >
                  <div style={{ marginBottom: 24 }}>{feature.icon}</div>
                  <Title level={4}>{feature.title}</Title>
                  <ul style={{ textAlign: 'left', paddingLeft: 20 }}>
                    {feature.items.map((item, i) => (
                      <li key={i} style={{ marginBottom: 8, color: '#666' }}>
                        <CheckCircleOutlined style={{ color: '#6366F1', marginRight: 8 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Main Features */}
      <div style={{ padding: '80px 24px', background: '#f5f5f5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 48 }}>
            <RocketOutlined /> 주요 기능
          </Title>

          <Row gutter={[24, 24]}>
            {mainFeatures.map((feature, idx) => (
              <Col xs={24} sm={12} lg={6} key={idx}>
                <Link href={feature.href}>
                  <Card 
                    hoverable
                    style={{ 
                      height: '100%', 
                      textAlign: 'center',
                      background: feature.color,
                      border: 'none'
                    }}
                    bodyStyle={{ color: 'white' }}
                  >
                    <div style={{ fontSize: 48, marginBottom: 16 }}>{feature.icon}</div>
                    <Title level={4} style={{ color: 'white', marginBottom: 8 }}>{feature.title}</Title>
                    <Paragraph style={{ color: 'rgba(255,255,255,0.9)', marginBottom: 0 }}>
                      {feature.desc}
                    </Paragraph>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* All Learning Tools */}
      <div style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 16 }}>
            <ToolOutlined /> 모든 학습 도구
          </Title>
          <Paragraph style={{ textAlign: 'center', fontSize: 16, color: '#666', marginBottom: 48 }}>
            개발부터 배포까지, 20개 이상의 실전 도구로 실력을 키워보세요
          </Paragraph>

          <Row gutter={[16, 16]}>
            {learningTools.map((tool, idx) => (
              <Col xs={24} sm={12} lg={6} key={idx}>
                <Link href={tool.href}>
                  <Card hoverable style={{ height: '100%' }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>{tool.icon}</div>
                    <Title level={5} style={{ marginBottom: 8 }}>{tool.title}</Title>
                    <Paragraph style={{ color: '#666', marginBottom: 0, fontSize: 14 }}>
                      {tool.desc}
                    </Paragraph>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '80px 24px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Title level={2} style={{ color: 'white', marginBottom: 16 }}>
            지금 바로 시작하세요! <RocketOutlined />
          </Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.9)', fontSize: 18, marginBottom: 32 }}>
            회원가입 30초면 끝! AI와 함께하는 즐거운 코딩 학습
          </Paragraph>
          <Space size="large">
            <Button 
              type="primary" 
              size="large"
              style={{ 
                height: 48, 
                fontSize: 16, 
                paddingLeft: 32, 
                paddingRight: 32,
                background: 'white',
                color: '#667eea',
                border: 'none'
              }}
              href="/signup"
            >
              무료로 시작하기
            </Button>
            <Button 
              size="large"
              style={{ 
                height: 48, 
                fontSize: 16, 
                paddingLeft: 32, 
                paddingRight: 32,
                background: 'transparent',
                color: 'white',
                borderColor: 'white'
              }}
              href="/catalog"
            >
              강의 둘러보기
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
}
