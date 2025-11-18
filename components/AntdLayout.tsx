'use client';

import { Layout, Menu, Button, Avatar, Dropdown, ConfigProvider } from 'antd';
import { 
  HomeOutlined, 
  BookOutlined, 
  RocketOutlined, 
  DashboardOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  CodeOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import GlobalAICoach from './GlobalAICoach';

const { Header, Content, Footer } = Layout;

export default function AntdLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const supabase = createClientComponentClient();
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link href="/">홈</Link>,
    },
    {
      key: 'catalog',
      icon: <BookOutlined />,
      label: <Link href="/catalog">강의 목록</Link>,
    },
    {
      key: 'missions',
      icon: <RocketOutlined />,
      label: <Link href="/missions">미션</Link>,
    },
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">대시보드</Link>,
    },
  ];

  const userMenuItems = user ? [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '프로필',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '로그아웃',
      danger: true,
    },
  ] : [];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#6366F1',
          colorSuccess: '#10B981',
          colorWarning: '#F59E0B',
          colorError: '#EF4444',
          colorInfo: '#3B82F6',
          borderRadius: 8,
          fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
        },
        components: {
          Button: {
            controlHeight: 40,
            fontWeight: 600,
          },
          Card: {
            borderRadiusLG: 12,
          },
        },
      }}
    >
      <Layout className="min-h-screen">
      <Header 
        style={{ 
          position: 'sticky', 
          top: 0, 
          zIndex: 1000, 
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          background: '#fff',
          borderBottom: '1px solid #f0f0f0',
          padding: '0 50px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <div style={{ 
                width: 40, 
                height: 40, 
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
              }}>
                <CodeOutlined style={{ fontSize: '20px', color: 'white' }} />
              </div>
              <span style={{ fontSize: 20, fontWeight: 700, color: '#1f2937' }}>CodeWith</span>
            </Link>
            
            <Menu 
              mode="horizontal" 
              items={menuItems}
              style={{ 
                border: 'none', 
                background: 'transparent',
                flex: 1,
                minWidth: 0
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {!loading && (
              user ? (
                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                  <Avatar 
                    size="large" 
                    icon={<UserOutlined />} 
                    style={{ cursor: 'pointer', background: '#6366F1' }}
                  />
                </Dropdown>
              ) : (
                <>
                  <Link href="/login">
                    <Button 
                      type="text"
                      icon={<LoginOutlined />}
                    >
                      로그인
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button 
                      type="primary"
                    >
                      무료 시작
                    </Button>
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </Header>

      <Content style={{ padding: '0', background: '#f5f5f5' }}>
        {children}
      </Content>

      <Footer style={{ textAlign: 'center', background: '#001529', color: 'white', marginTop: '48px', padding: '48px 50px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: '32px', textAlign: 'left' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ 
                  width: 32, 
                  height: 32, 
                  background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CodeOutlined style={{ fontSize: '16px', color: 'white' }} />
                </div>
                <span style={{ fontSize: 18, fontWeight: 700 }}>CodeWith</span>
              </div>
              <p style={{ color: '#9CA3AF', fontSize: 14, margin: 0 }}>
                AI와 함께하는 즐거운 코딩 학습
              </p>
            </div>

            <div>
              <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: 16 }}>학습</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: 8 }}><Link href="/catalog" style={{ color: '#9CA3AF', fontSize: 14, textDecoration: 'none', transition: 'color 0.3s' }}>강의 목록</Link></li>
                <li style={{ marginBottom: 8 }}><Link href="/missions" style={{ color: '#9CA3AF', fontSize: 14, textDecoration: 'none', transition: 'color 0.3s' }}>미션</Link></li>
                <li style={{ marginBottom: 8 }}><Link href="/learning-paths" style={{ color: '#9CA3AF', fontSize: 14, textDecoration: 'none', transition: 'color 0.3s' }}>로드맵</Link></li>
              </ul>
            </div>

            <div>
              <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: 16 }}>도구</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: 8 }}><Link href="/ai-coach" style={{ color: '#9CA3AF', fontSize: 14, textDecoration: 'none', transition: 'color 0.3s' }}>AI 코치</Link></li>
                <li style={{ marginBottom: 8 }}><Link href="/error-doctor" style={{ color: '#9CA3AF', fontSize: 14, textDecoration: 'none', transition: 'color 0.3s' }}>에러 닥터</Link></li>
                <li style={{ marginBottom: 8 }}><Link href="/git-simulator" style={{ color: '#9CA3AF', fontSize: 14, textDecoration: 'none', transition: 'color 0.3s' }}>Git 시뮬레이터</Link></li>
              </ul>
            </div>

            <div>
              <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: 16 }}>회사</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: 8 }}><a href="#" style={{ color: '#9CA3AF', fontSize: 14, textDecoration: 'none', transition: 'color 0.3s' }}>소개</a></li>
                <li style={{ marginBottom: 8 }}><a href="#" style={{ color: '#9CA3AF', fontSize: 14, textDecoration: 'none', transition: 'color 0.3s' }}>블로그</a></li>
                <li style={{ marginBottom: 8 }}><a href="#" style={{ color: '#9CA3AF', fontSize: 14, textDecoration: 'none', transition: 'color 0.3s' }}>문의</a></li>
              </ul>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #374151', paddingTop: 24 }}>
            <p style={{ color: '#6B7280', margin: 0 }}>© 2025 CodeWith by ProHiera. All rights reserved.</p>
          </div>
        </div>
      </Footer>

      <GlobalAICoach />
    </Layout>
    </ConfigProvider>
  );
}
