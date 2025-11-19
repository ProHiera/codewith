'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Card, 
  Row, 
  Col, 
  Tag, 
  Button, 
  Space, 
  Typography, 
  Divider,
  Alert,
  Steps
} from 'antd';
import {
  RocketOutlined,
  BookOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  FireOutlined,
  CheckCircleOutlined,
  BulbOutlined,
  AimOutlined,
  BgColorsOutlined,
  ExperimentOutlined,
  ToolOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

type PathPreset = {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  skills: string[];
  roadmap: RoadmapStep[];
};

type RoadmapStep = {
  week: number;
  title: string;
  topics: string[];
  goals: string[];
};

const PRESETS: PathPreset[] = [
  {
    id: 'frontend-basics',
    title: '프론트엔드 기초',
    icon: <BgColorsOutlined style={{ fontSize: 24 }} />,
    description: 'HTML, CSS, JavaScript 기초부터 React까지',
    duration: '12주',
    difficulty: 'beginner',
    topics: ['HTML', 'CSS', 'JavaScript', 'React'],
    skills: ['웹 기본 구조', '반응형 디자인', 'DOM 조작', '컴포넌트'],
    roadmap: [
      {
        week: 1,
        title: 'HTML 기초',
        topics: ['시맨틱 태그', '폼과 입력', '접근성'],
        goals: ['간단한 프로필 페이지 만들기']
      },
      {
        week: 2,
        title: 'CSS 기초',
        topics: ['선택자', 'Box Model', 'Flexbox'],
        goals: ['카드 레이아웃 구현하기']
      },
      {
        week: 3,
        title: 'JavaScript 기초',
        topics: ['변수와 타입', '함수', '조건문과 반복'],
        goals: ['계산기 만들기']
      },
      {
        week: 4,
        title: 'DOM 조작',
        topics: ['이벤트', 'querySelector', 'classList'],
        goals: ['투두 리스트 만들기']
      }
    ]
  },
  {
    id: 'react-deep-dive',
    title: 'React 심화',
    icon: <ExperimentOutlined style={{ fontSize: 24 }} />,
    description: 'React Hooks부터 성능 최적화까지',
    duration: '8주',
    difficulty: 'intermediate',
    topics: ['Hooks', 'Context API', '최적화', 'Next.js'],
    skills: ['상태 관리', '성능 개선', 'SSR', 'API 연동'],
    roadmap: [
      {
        week: 1,
        title: 'useState & useEffect',
        topics: ['상태 관리 기초', '사이드 이펙트', '의존성 배열'],
        goals: ['날씨 앱 만들기']
      },
      {
        week: 2,
        title: 'Custom Hooks',
        topics: ['Hook 추출', '재사용성', '로직 분리'],
        goals: ['useFetch 훅 만들기']
      },
      {
        week: 3,
        title: 'Context API',
        topics: ['전역 상태', 'Provider', 'Consumer'],
        goals: ['테마 전환 기능 구현']
      },
      {
        week: 4,
        title: '성능 최적화',
        topics: ['memo', 'useMemo', 'useCallback'],
        goals: ['대량 데이터 렌더링 최적화']
      }
    ]
  },
  {
    id: 'backend-nodejs',
    title: 'Node.js 백엔드',
    icon: <ToolOutlined style={{ fontSize: 24 }} />,
    description: 'Express부터 데이터베이스 연동까지',
    duration: '10주',
    difficulty: 'intermediate',
    topics: ['Express', 'REST API', 'Database', 'Authentication'],
    skills: ['API 설계', 'DB 모델링', '인증/인가', '배포'],
    roadmap: [
      {
        week: 1,
        title: 'Express 기초',
        topics: ['라우팅', '미들웨어', 'Request/Response'],
        goals: ['간단한 API 서버 만들기']
      },
      {
        week: 2,
        title: 'REST API 설계',
        topics: ['HTTP 메서드', '상태 코드', 'RESTful 원칙'],
        goals: ['게시판 CRUD API 구현']
      },
      {
        week: 3,
        title: 'Database 연동',
        topics: ['PostgreSQL', 'Prisma ORM', '관계 설정'],
        goals: ['사용자-게시물 모델 구현']
      },
      {
        week: 4,
        title: '인증 구현',
        topics: ['JWT', 'bcrypt', '미들웨어'],
        goals: ['로그인/회원가입 구현']
      }
    ]
  },
  {
    id: 'fullstack-swe',
    title: '풀스택 개발자',
    icon: <RocketOutlined style={{ fontSize: 24 }} />,
    description: '프론트엔드부터 백엔드, 배포까지 전체 과정',
    duration: '16주',
    difficulty: 'advanced',
    topics: ['React', 'Node.js', 'Database', 'DevOps'],
    skills: ['풀스택 개발', 'CI/CD', '클라우드 배포', '성능 모니터링'],
    roadmap: [
      {
        week: 1,
        title: '프로젝트 기획',
        topics: ['요구사항 분석', 'DB 설계', 'API 명세'],
        goals: ['기술 스택 선정 및 설계']
      },
      {
        week: 2,
        title: '백엔드 구축',
        topics: ['Express + Prisma', 'REST API', 'Validation'],
        goals: ['API 서버 구현']
      },
      {
        week: 3,
        title: '프론트엔드 구축',
        topics: ['Next.js', 'TypeScript', 'TailwindCSS'],
        goals: ['UI 컴포넌트 구현']
      },
      {
        week: 4,
        title: '배포 및 운영',
        topics: ['Vercel', 'Supabase', 'GitHub Actions'],
        goals: ['프로덕션 배포']
      }
    ]
  }
];

export default function LearningPathsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const mode = searchParams?.get('mode');
  const recommended = searchParams?.get('recommended');
  const preselectId = searchParams?.get('select');
  const level = searchParams?.get('level') as 'beginner' | 'intermediate' | 'advanced' | null;

  const levelDefault = useMemo(() => {
    if (!level) return null;
    return PRESETS.find(p => p.difficulty === level) || null;
  }, [level]);

  const initialSelected = useMemo<PathPreset | null>(() => {
    if (preselectId) {
      return PRESETS.find(p => p.id === preselectId) || null;
    }
    return levelDefault;
  }, [preselectId, levelDefault]);

  const [selectedPath, setSelectedPath] = useState<PathPreset | null>(initialSelected);

  const filteredPresets = PRESETS.filter(preset => 
    filter === 'all' || preset.difficulty === filter
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'default';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '초급';
      case 'intermediate': return '중급';
      case 'advanced': return '고급';
      default: return difficulty;
    }
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card>
        <Title level={1}>
          <BookOutlined /> 러닝 경로 프리셋
        </Title>
        <Paragraph style={{ fontSize: 16 }}>
          목표별 추천 학습 순서와 로드맵을 제공합니다
        </Paragraph>
      </Card>

      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {(recommended === '1' || recommended === 'true') && (
            <Alert
              message="레벨 평가 결과에 맞춘 추천 경로"
              description={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                  <Text>
                    {selectedPath
                      ? `${selectedPath.title} · 예상 ${selectedPath.duration} · 주제 ${selectedPath.topics.length}개`
                      : '왼쪽에서 추천 경로를 확인하거나 자유 학습을 선택하세요'}
                  </Text>
                  <Space>
                    <Button
                      type="primary"
                      onClick={() => {
                        const id = selectedPath?.id || levelDefault?.id || PRESETS[0].id;
                        router.push(`/learning-paths?mode=guided&select=${id}${level ? `&level=${level}` : ''}`);
                      }}
                    >
                      이대로 진행할게요
                    </Button>
                    <Button onClick={() => router.push('/learning-paths?mode=free')}>
                      자유롭게 학습할래요!
                    </Button>
                  </Space>
                </div>
              }
              type="info"
              icon={<TrophyOutlined />}
              showIcon
            />
          )}

          <Space>
            <Button
              type={filter === 'all' ? 'primary' : 'default'}
              onClick={() => setFilter('all')}
            >
              전체
            </Button>
            <Button
              type={filter === 'beginner' ? 'primary' : 'default'}
              onClick={() => setFilter('beginner')}
              style={filter === 'beginner' ? { background: '#52c41a', borderColor: '#52c41a' } : {}}
            >
              초급
            </Button>
            <Button
              type={filter === 'intermediate' ? 'primary' : 'default'}
              onClick={() => setFilter('intermediate')}
              style={filter === 'intermediate' ? { background: '#faad14', borderColor: '#faad14' } : {}}
            >
              중급
            </Button>
            <Button
              type={filter === 'advanced' ? 'primary' : 'default'}
              onClick={() => setFilter('advanced')}
              style={filter === 'advanced' ? { background: '#f5222d', borderColor: '#f5222d' } : {}}
            >
              고급
            </Button>
          </Space>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={8}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                {filteredPresets.map(preset => (
                  <Card
                    key={preset.id}
                    hoverable
                    onClick={() => setSelectedPath(preset)}
                    style={{
                      border: selectedPath?.id === preset.id ? '2px solid #1890ff' : '1px solid #d9d9d9'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                      <Text style={{ fontSize: 32 }}>{preset.icon}</Text>
                      <Tag color={getDifficultyColor(preset.difficulty)}>
                        {getDifficultyText(preset.difficulty)}
                      </Tag>
                    </div>
                    <Title level={4}>{preset.title}</Title>
                    <Paragraph type="secondary">{preset.description}</Paragraph>
                    <Space size="small">
                      <Text type="secondary">
                        <ClockCircleOutlined /> {preset.duration}
                      </Text>
                      <Divider type="vertical" />
                      <Text type="secondary">
                        <BookOutlined /> {preset.topics.length}개 주제
                      </Text>
                    </Space>
                  </Card>
                ))}
              </Space>
            </Col>

            <Col xs={24} lg={16}>
              {selectedPath ? (
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <Card>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
                      <Space>
                        <Text style={{ fontSize: 48 }}>{selectedPath.icon}</Text>
                        <div>
                          <Title level={2} style={{ margin: 0 }}>{selectedPath.title}</Title>
                          <Text type="secondary">{selectedPath.description}</Text>
                        </div>
                      </Space>
                      <Tag color={getDifficultyColor(selectedPath.difficulty)}>
                        {getDifficultyText(selectedPath.difficulty)}
                      </Tag>
                    </div>

                    <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                      <Col span={12}>
                        <Card style={{ background: '#e6f7ff', border: 'none' }}>
                          <Text type="secondary">예상 기간</Text>
                          <Title level={3} style={{ margin: '8px 0 0 0', color: '#1890ff' }}>
                            {selectedPath.duration}
                          </Title>
                        </Card>
                      </Col>
                      <Col span={12}>
                        <Card style={{ background: '#f9f0ff', border: 'none' }}>
                          <Text type="secondary">주요 주제</Text>
                          <Title level={3} style={{ margin: '8px 0 0 0', color: '#722ed1' }}>
                            {selectedPath.topics.length}개
                          </Title>
                        </Card>
                      </Col>
                    </Row>

                    <div style={{ marginBottom: 16 }}>
                      <Title level={5}>
                        <FireOutlined /> 학습 주제
                      </Title>
                      <Space wrap>
                        {selectedPath.topics.map((topic, idx) => (
                          <Tag key={idx} color="blue">{topic}</Tag>
                        ))}
                      </Space>
                    </div>

                    <div>
                      <Title level={5}>
                        <TrophyOutlined /> 획득 스킬
                      </Title>
                      <Space wrap>
                        {selectedPath.skills.map((skill, idx) => (
                          <Tag key={idx} color="green">{skill}</Tag>
                        ))}
                      </Space>
                    </div>
                  </Card>

                  <Card title={<Title level={4}><ClockCircleOutlined /> 주차별 로드맵</Title>}>
                    <Steps
                      direction="vertical"
                      current={-1}
                      items={selectedPath.roadmap.map((step) => ({
                        title: `Week ${step.week}: ${step.title}`,
                        description: (
                          <div style={{ marginTop: 8 }}>
                            <div style={{ marginBottom: 8 }}>
                              <Text strong><BookOutlined /> 학습 내용</Text>
                              <ul style={{ marginTop: 4, paddingLeft: 20 }}>
                                {step.topics.map((topic, i) => (
                                  <li key={i}><Text type="secondary">{topic}</Text></li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <Text strong><AimOutlined /> 목표</Text>
                              <ul style={{ marginTop: 4, paddingLeft: 20 }}>
                                {step.goals.map((goal, i) => (
                                  <li key={i}><Text type="secondary">{goal}</Text></li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ),
                        icon: <BookOutlined />
                      }))}
                    />

                    <Button
                      type="primary"
                      size="large"
                      block
                      icon={<RocketOutlined />}
                      style={{ marginTop: 24 }}
                      onClick={() => {
                        const base = '/missions';
                        if (mode === 'guided') {
                          router.push(`${base}?path=${selectedPath.id}`);
                        } else {
                          router.push(base);
                        }
                      }}
                    >
                      이 경로로 시작하기
                    </Button>
                  </Card>

                  <Card style={{ background: 'linear-gradient(135deg, #fff7e6 0%, #ffe7ba 100%)' }}>
                    <Title level={4}>
                      <BulbOutlined /> 학습 팁
                    </Title>
                    <Space direction="vertical">
                      <div style={{ display: 'flex', gap: 8 }}>
                        <CheckCircleOutlined style={{ color: '#52c41a', marginTop: 4 }} />
                        <Text>매일 30분씩 꾸준히 학습하는 것이 몰아서 하는 것보다 효과적입니다</Text>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <CheckCircleOutlined style={{ color: '#52c41a', marginTop: 4 }} />
                        <Text>각 주차 목표를 직접 만들어보고 코드 리뷰를 받으세요</Text>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <CheckCircleOutlined style={{ color: '#52c41a', marginTop: 4 }} />
                        <Text>이해가 안 되는 부분은 건너뛰지 말고 충분히 연습하세요</Text>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <CheckCircleOutlined style={{ color: '#52c41a', marginTop: 4 }} />
                        <Text>학습 내용을 블로그나 노션에 정리하면 기억에 오래 남습니다</Text>
                      </div>
                    </Space>
                  </Card>
                </Space>
              ) : (
                <Card style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ fontSize: 80, marginBottom: 16 }}>🗺️</div>
                  <Title level={3}>학습 경로를 선택하세요</Title>
                  <Paragraph type="secondary">
                    왼쪽에서 원하는 학습 경로를 클릭하면 상세 로드맵을 확인할 수 있습니다
                  </Paragraph>
                </Card>
              )}
            </Col>
          </Row>
        </Space>
      </Card>
    </Space>
  );
}
