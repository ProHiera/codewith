'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import { 
  Tabs, 
  Card, 
  Progress, 
  Tag, 
  Button, 
  Space, 
  Typography, 
  Spin,
  Avatar,
  List,
  Row,
  Col
} from 'antd';
import {
  BookOutlined,
  TrophyOutlined,
  TeamOutlined,
  RocketOutlined,
  StarOutlined,
  LikeOutlined,
  CommentOutlined,
  DashboardOutlined,
  ThunderboltOutlined,
  GlobalOutlined,
  AppstoreOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

/**
 * 통합 학습 허브 - Ant Design으로 재구성
 */

export default function LearningHubPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('learn');

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
      setLoading(false);
    }
    loadUser();
  }, [router]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spin size="large" tip="로딩 중..." />
      </div>
    );
  }

  const learningCards = [
    {
      id: 1,
      title: 'useState Hook 기본',
      tags: ['React', 'Hooks'],
      difficulty: 'medium',
      description: 'React 상태 관리의 기본 Hook을 학습합니다.',
      progress: 70
    },
    {
      id: 2,
      title: 'useEffect Hook',
      tags: ['React', 'Hooks'],
      difficulty: 'medium',
      description: '부수 효과를 처리하는 Hook을 학습합니다.',
      progress: 45
    },
    {
      id: 3,
      title: 'Custom Hooks',
      tags: ['React', 'Advanced'],
      difficulty: 'hard',
      description: '재사용 가능한 커스텀 Hook을 만듭니다.',
      progress: 20
    },
  ];

  const practiceItems = [
    { id: 1, name: 'useState', icon: <AppstoreOutlined />, description: '상태 관리', color: '#1890ff' },
    { id: 2, name: 'useEffect', icon: <ThunderboltOutlined />, description: '부수 효과', color: '#722ed1' },
    { id: 3, name: 'useContext', icon: <GlobalOutlined />, description: '컨텍스트', color: '#52c41a' },
  ];

  const communityPosts = [
    {
      id: 1,
      author: { nickname: '코딩마스터', level: 5 },
      title: 'React Hooks 완벽 정리',
      content: 'useState, useEffect 등 주요 Hooks를 정리했습니다...',
      tags: ['React', 'Hooks'],
      likes: 42,
      comments: 8,
    },
    {
      id: 2,
      author: { nickname: '개발왕', level: 7 },
      title: 'useReducer vs useState',
      content: '복잡한 상태 관리에서 useReducer가 유용한 이유...',
      tags: ['React', 'State Management'],
      likes: 38,
      comments: 12,
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <div style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', position: 'sticky', top: 64, zIndex: 100 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '16px 50px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
              <BookOutlined /> 학습 허브
            </Title>
            <Space>
              <Text type="secondary">{user?.email}</Text>
              <Button 
                type="primary" 
                icon={<DashboardOutlined />}
                onClick={() => router.push('/dashboard')}
              >
                대시보드
              </Button>
            </Space>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 50px' }}>
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          size="large"
          items={[
            {
              key: 'learn',
              label: (
                <span>
                  <BookOutlined /> 학습
                </span>
              ),
              children: (
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  {/* Progress Card */}
                  <Card>
                    <Title level={4}>
                      <StarOutlined style={{ color: '#faad14' }} /> 오늘의 학습 진행도
                    </Title>
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <Text>현재 레벨 XP</Text>
                          <Text strong>350 / 500</Text>
                        </div>
                        <Progress percent={70} strokeColor="#722ed1" />
                      </div>
                    </Space>
                  </Card>

                  {/* Learning Cards */}
                  <Row gutter={[16, 16]}>
                    {learningCards.map((card) => (
                      <Col xs={24} md={12} lg={8} key={card.id}>
                        <Card 
                          hoverable
                          title={card.title}
                          extra={
                            <Tag color={card.difficulty === 'hard' ? 'red' : card.difficulty === 'medium' ? 'orange' : 'green'}>
                              {card.difficulty}
                            </Tag>
                          }
                        >
                          <Paragraph>{card.description}</Paragraph>
                          <Space wrap>
                            {card.tags.map((tag) => (
                              <Tag key={tag} color="blue">{tag}</Tag>
                            ))}
                          </Space>
                          <div style={{ marginTop: 16 }}>
                            <Text type="secondary">진행도</Text>
                            <Progress percent={card.progress} size="small" />
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Space>
              ),
            },
            {
              key: 'practice',
              label: (
                <span>
                  <TrophyOutlined /> 연습
                </span>
              ),
              children: (
                <Row gutter={[16, 16]}>
                  {practiceItems.map((item) => (
                    <Col xs={24} md={8} key={item.id}>
                      <Card 
                        hoverable
                        style={{ borderLeft: `4px solid ${item.color}` }}
                      >
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                          <div style={{ fontSize: 48, textAlign: 'center' }}>{item.icon}</div>
                          <Title level={4} style={{ textAlign: 'center', margin: 0 }}>{item.name}</Title>
                          <Text type="secondary" style={{ textAlign: 'center', display: 'block' }}>
                            {item.description}
                          </Text>
                          <Button type="primary" block icon={<RocketOutlined />}>
                            연습 시작
                          </Button>
                        </Space>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ),
            },
            {
              key: 'community',
              label: (
                <span>
                  <TeamOutlined /> 커뮤니티
                </span>
              ),
              children: (
                <List
                  itemLayout="vertical"
                  size="large"
                  dataSource={communityPosts}
                  renderItem={(post) => (
                    <Card style={{ marginBottom: 16 }} hoverable>
                      <List.Item
                        key={post.id}
                        actions={[
                          <Space key="likes">
                            <LikeOutlined />
                            {post.likes}
                          </Space>,
                          <Space key="comments">
                            <CommentOutlined />
                            {post.comments}
                          </Space>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar style={{ background: '#1890ff' }}>
                              {post.author.nickname[0]}
                            </Avatar>
                          }
                          title={
                            <Space>
                              <Text strong>{post.title}</Text>
                              <Tag color="gold">Lv.{post.author.level}</Tag>
                            </Space>
                          }
                          description={
                            <Space direction="vertical" size="small">
                              <Text type="secondary">by {post.author.nickname}</Text>
                              <Space wrap>
                                {post.tags.map((tag) => (
                                  <Tag key={tag} color="blue">{tag}</Tag>
                                ))}
                              </Space>
                            </Space>
                          }
                        />
                        <Paragraph ellipsis={{ rows: 2 }}>{post.content}</Paragraph>
                      </List.Item>
                    </Card>
                  )}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
