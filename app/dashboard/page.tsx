'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Button, 
  Space, 
  Typography, 
  Progress,
  List,
  Tag,
  Spin
} from 'antd';
import {
  TrophyOutlined,
  CodeOutlined,
  BugOutlined,
  ProjectOutlined,
  RocketOutlined,
  LogoutOutlined,
  FileTextOutlined,
  UserOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface Submission {
  id: string;
  score: number;
  created_at: string;
}

interface Stats {
  totalSubmissions: number;
  completedMissions: number;
  averageScore: number;
  totalErrors: number;
  totalProjects: number;
  recentActivity: Submission[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    totalSubmissions: 0,
    completedMissions: 0,
    averageScore: 0,
    totalErrors: 0,
    totalProjects: 0,
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);

  const fetchStats = useCallback(async (userId: string) => {
    try {
      const { data: submissions } = await supabase
        .from('submissions')
        .select('*')
        .eq('user_id', userId);

      const { data: errors } = await supabase
        .from('errors')
        .select('*')
        .eq('user_id', userId);

      const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId);

      const totalSubmissions = submissions?.length || 0;
      const completedMissions = submissions?.filter((s) => s.score >= 80).length || 0;
      const averageScore = totalSubmissions > 0
        ? Math.round(submissions!.reduce((sum, s) => sum + s.score, 0) / totalSubmissions)
        : 0;

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentSubmissions = submissions?.filter(
        (s) => new Date(s.created_at) > sevenDaysAgo
      ) || [];

      setStats({
        totalSubmissions,
        completedMissions,
        averageScore,
        totalErrors: errors?.length || 0,
        totalProjects: projects?.length || 0,
        recentActivity: recentSubmissions,
      });
    } catch {
      // Silent fail
    } finally {
      setLoading(false);
    }
  }, []);

  const checkUser = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }
    setUser(user);
    fetchStats(user.id);
  }, [router, fetchStats]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <Space direction="vertical" size="large" style={{ width: '100%', padding: 24, textAlign: 'center' }}>
        <Spin size="large" tip="로딩 중..." />
      </Space>
    );
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Title level={2} style={{ margin: 0 }}>
            <UserOutlined /> 대시보드
          </Title>
          <Space>
            <Text type="secondary">{user?.email}</Text>
            <Button icon={<LogoutOutlined />} onClick={handleLogout}>로그아웃</Button>
          </Space>
        </Space>
      </Card>

      <Card>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="제출 횟수"
                  value={stats.totalSubmissions}
                  prefix={<CodeOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="완료한 미션"
                  value={stats.completedMissions}
                  prefix={<TrophyOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="평균 점수"
                  value={stats.averageScore}
                  suffix="점"
                  prefix={<RocketOutlined />}
                  valueStyle={{ color: '#722ed1' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="발견한 에러"
                  value={stats.totalErrors}
                  prefix={<BugOutlined />}
                  valueStyle={{ color: '#fa8c16' }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card title={<Title level={4} style={{ margin: 0 }}>최근 활동 (7일)</Title>}>
                {stats.recentActivity.length === 0 ? (
                  <Text type="secondary">최근 활동이 없습니다</Text>
                ) : (
                  <List
                    dataSource={stats.recentActivity}
                    renderItem={(item) => (
                      <List.Item>
                        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                          <Space>
                            <CodeOutlined style={{ fontSize: 20, color: '#1890ff' }} />
                            <div>
                              <Text>제출 완료</Text>
                              <br />
                              <Text type="secondary" style={{ fontSize: 12 }}>
                                {new Date(item.created_at).toLocaleString('ko-KR')}
                              </Text>
                            </div>
                          </Space>
                          <Tag color={item.score >= 80 ? 'success' : 'default'}>
                            {item.score}점
                          </Tag>
                        </Space>
                      </List.Item>
                    )}
                  />
                )}
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title={<Title level={4} style={{ margin: 0 }}>학습 진행도</Title>}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div>
                    <Text type="secondary">미션 완료율</Text>
                    <Progress
                      percent={stats.totalSubmissions > 0 
                        ? Math.round((stats.completedMissions / stats.totalSubmissions) * 100)
                        : 0}
                      strokeColor="#52c41a"
                    />
                  </div>
                  <div>
                    <Text type="secondary">평균 점수</Text>
                    <Progress
                      percent={stats.averageScore}
                      strokeColor="#722ed1"
                    />
                  </div>
                </Space>
              </Card>

              <Card 
                style={{ marginTop: 16 }}
                title={<Title level={4} style={{ margin: 0 }}>프로젝트</Title>}
              >
                <Statistic
                  value={stats.totalProjects}
                  prefix={<ProjectOutlined />}
                  suffix="개"
                  valueStyle={{ fontSize: 32 }}
                />
              </Card>
            </Col>
          </Row>
      </Card>

          <Card>
            <Space size="middle" wrap>
              <Button type="primary" icon={<RocketOutlined />} size="large" onClick={() => router.push('/missions')}>
                미션 시작하기
              </Button>
              <Button icon={<FileTextOutlined />} size="large" onClick={() => router.push('/notes')}>
                내 메모
              </Button>
              <Button icon={<TrophyOutlined />} size="large" onClick={() => router.push('/learning-hub')}>
                학습 허브
              </Button>
            </Space>
          </Card>
    </Space>
  );
}
