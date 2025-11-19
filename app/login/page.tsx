'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';
import { Form, Input, Button, Card, Space, Typography, Divider, Alert } from 'antd';
import { 
  MailOutlined, 
  LockOutlined, 
  GoogleOutlined, 
  GithubOutlined 
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError('');

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (loginError) throw loginError;

      if (data.user) {
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      let errorMessage = '로그인에 실패했습니다.';
      const error = err as { message?: string };
      
      if (error.message) {
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = '이메일 또는 비밀번호가 올바르지 않습니다.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = '이메일 인증이 필요합니다. 이메일을 확인해주세요.';
        } else if (error.message.includes('For security purposes')) {
          errorMessage = '보안을 위해 잠시 후 다시 시도해주세요.';
        } else if (error.message.includes('rate limit')) {
          errorMessage = '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        if (error.message.includes('not enabled')) {
          setError(`${provider.toUpperCase()} 로그인이 아직 설정되지 않았습니다.`);
        } else {
          throw error;
        }
      }
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error.message || 'OAuth 로그인에 실패했습니다.');
    }
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%', padding: 24, justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Card style={{ maxWidth: 480, width: '100%' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2}>로그인</Title>
            <Paragraph type="secondary">개발 학습을 시작하세요</Paragraph>
          </div>

          {message && (
            <Alert message={message} type="success" showIcon />
          )}

          <Form
            form={form}
            onFinish={handleLogin}
            layout="vertical"
            size="large"
          >
            {error && (
              <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />
            )}

            <Form.Item
              name="email"
              label="이메일"
              rules={[
                { required: true, message: '이메일을 입력해주세요' },
                { type: 'email', message: '유효한 이메일을 입력해주세요' }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="이메일" />
            </Form.Item>

            <Form.Item
              name="password"
              label="비밀번호"
              rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="비밀번호" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                로그인
              </Button>
            </Form.Item>
          </Form>

          <Divider>또는</Divider>

          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Button
              block
              icon={<GoogleOutlined />}
              onClick={() => handleOAuthLogin('google')}
            >
              Google로 계속하기
            </Button>

            <Button
              block
              icon={<GithubOutlined />}
              onClick={() => handleOAuthLogin('github')}
            >
              GitHub로 계속하기
            </Button>
          </Space>

          <div style={{ textAlign: 'center' }}>
            <Text type="secondary">
              계정이 없으신가요?{' '}
              <Link href="/signup">회원가입</Link>
            </Text>
          </div>
        </Space>
      </Card>
    </Space>
  );
}
