'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Mission } from '@/types';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Card, 
  Row, 
  Col, 
  Tag, 
  Button, 
  Space, 
  Typography, 
  Spin,
  Empty
} from 'antd';
import {
  TrophyOutlined,
  RobotOutlined,
  FileTextOutlined,
  DashboardOutlined,
  FolderOutlined,
  BugOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function MissionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          // 환경변수 없을 때는 데모 데이터 사용
          setMissions([
            {
              id: '1',
              title: 'Flexbox 레이아웃 만들기',
              type: 'css',
              spec_json: { description: 'flex 속성을 사용해서 반응형 레이아웃을 만들어보세요' },
              created_at: new Date().toISOString()
            },
            {
              id: '2',
              title: 'Grid 갤러리 만들기',
              type: 'css',
              spec_json: { description: 'CSS Grid로 이미지 갤러리를 구성하세요' },
              created_at: new Date().toISOString()
            },
            {
              id: '3',
              title: '애니메이션 버튼',
              type: 'css',
              spec_json: { description: 'hover 시 부드러운 애니메이션이 적용되는 버튼 만들기' },
              created_at: new Date().toISOString()
            }
          ] as Mission[]);
          setLoading(false);
          return;
        }
        const { data, error } = await supabase
          .from('missions')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setMissions(data || []);
      } catch {
        // 에러 시 데모 데이터
        setMissions([
          {
            id: '1',
            title: 'Flexbox 레이아웃 만들기',
            type: 'css',
            spec_json: { description: 'flex 속성을 사용해서 반응형 레이아웃을 만들어보세요' },
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            title: 'Grid 갤러리 만들기',
            type: 'css',
            spec_json: { description: 'CSS Grid로 이미지 갤러리를 구성하세요' },
            created_at: new Date().toISOString()
          },
          {
            id: '3',
            title: '애니메이션 버튼',
            type: 'css',
            spec_json: { description: 'hover 시 부드러운 애니메이션이 적용되는 버튼 만들기' },
            created_at: new Date().toISOString()
          }
        ] as Mission[]);
      } finally {
        setLoading(false);
      }
    };
    void run();
  }, [router]);

  const selectedDomain = (searchParams.get('domain') || '').toLowerCase();
  const selectedLang = (searchParams.get('lang') || '').toLowerCase();

  const langToMissionType: Record<string, Mission['type']> = {
    js: 'javascript',
    javascript: 'javascript',
    react: 'react',
    css: 'css',
  } as const;

  const domainToTypes: Record<string, Mission['type'][]> = {
    frontend: ['css', 'javascript', 'react'],
    devops: ['error'],
    backend: [],
    data: [],
  } as const;

  const filteredMissions = missions.filter((m) => {
    if (selectedLang) {
      const t = langToMissionType[selectedLang];
      if (t && m.type !== t) return false;
    }
    if (selectedDomain) {
      const allowed = domainToTypes[selectedDomain];
      if (Array.isArray(allowed)) {
        if (allowed.length === 0) return false;
        if (!allowed.includes(m.type)) return false;
      }
    }
    return true;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'css': return 'blue';
      case 'javascript': return 'gold';
      case 'react': return 'green';
      default: return 'red';
    }
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
            <TrophyOutlined /> 오늘의 미션
          </Title>
          <Space wrap>
            <Button icon={<RobotOutlined />} onClick={() => router.push('/ai-coach')}>AI 코치</Button>
            <Button icon={<FileTextOutlined />} onClick={() => router.push('/notes')}>메모</Button>
            <Button icon={<DashboardOutlined />} onClick={() => router.push('/dashboard')}>대시보드</Button>
            <Button icon={<FolderOutlined />} onClick={() => router.push('/portfolio')}>포트폴리오</Button>
            <Button icon={<BugOutlined />} onClick={() => router.push('/error-doctor')}>에러 닥터</Button>
          </Space>
        </Space>
      </Card>

      <Card>
        {(selectedDomain || selectedLang) && (
          <Space style={{ marginBottom: 24 }} wrap>
            <Text type="secondary">필터:</Text>
            {selectedDomain && (
              <Tag
                closable
                onClose={() => router.push(`/missions${selectedLang ? `?lang=${selectedLang}` : ''}`)}
              >
                도메인: {selectedDomain}
              </Tag>
            )}
            {selectedLang && (
              <Tag
                closable
                onClose={() => router.push(`/missions${selectedDomain ? `?domain=${selectedDomain}` : ''}`)}
              >
                언어: {selectedLang}
              </Tag>
            )}
            <Link href="/missions">
              <Button type="link" size="small">모두 보기</Button>
            </Link>
          </Space>
        )}

        {filteredMissions.length === 0 ? (
          <Card>
            <Empty description="아직 미션이 없습니다." />
          </Card>
        ) : (
          <Row gutter={[16, 16]}>
            {filteredMissions.map((mission) => (
              <Col xs={24} md={12} lg={8} key={mission.id}>
                <Link href={`/missions/${mission.id}`}>
                  <Card hoverable style={{ height: '100%' }}>
                    <div style={{ marginBottom: 12 }}>
                      <Tag color={getTypeColor(mission.type)}>
                        {mission.type.toUpperCase()}
                      </Tag>
                    </div>
                    
                    <Title level={4} style={{ marginTop: 12 }}>
                      {mission.title}
                    </Title>
                    
                    <Paragraph ellipsis={{ rows: 2 }} type="secondary">
                      {mission.spec_json?.description || '미션을 완료하세요'}
                    </Paragraph>
                    
                    <div style={{ marginTop: 16 }}>
                      <Space>
                        <ClockCircleOutlined />
                        <Text type="secondary" style={{ fontSize: 12 }}>10-15분</Text>
                      </Space>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </Card>
    </Space>
  );
}
