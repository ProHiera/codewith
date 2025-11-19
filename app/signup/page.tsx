'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';
import { Form, Input, Button, Card, Space, Typography, Divider, Alert } from 'antd';
import { 
  MailOutlined, 
  LockOutlined, 
  UserOutlined,
  GoogleOutlined, 
  GithubOutlined 
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSignUp = async (values: { email: string; password: string; nickname: string }) => {
    setLoading(true);
    setError('');

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            nickname: values.nickname,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (signInError) {
          router.push('/login?message=가입 완료! 로그인해주세요.');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err: unknown) {
      let errorMessage = '회원가입에 실패했습니다.';
      const error = err as { message?: string };
      
      if (error.message) {
        if (error.message.includes('For security purposes')) {
          errorMessage = '보안을 위해 42초 후에 다시 시도해주세요.';
        } else if (error.message.includes('User already registered')) {
          errorMessage = '이미 가입된 이메일입니다.';
        } else if (error.message.includes('Password should be')) {
          errorMessage = '비밀번호는 최소 6자 이상이어야 합니다.';
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
            <Title level={2}>회원가입</Title>
            <Paragraph type="secondary">개발 학습 플랫폼에 오신 것을 환영합니다</Paragraph>
          </div>

          <Form
            form={form}
            onFinish={handleSignUp}
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
              name="nickname"
              label="닉네임"
            >
              <Input prefix={<UserOutlined />} placeholder="닉네임 (선택)" />
            </Form.Item>

            <Form.Item
              name="password"
              label="비밀번호"
              rules={[
                { required: true, message: '비밀번호를 입력해주세요' },
                { min: 6, message: '비밀번호는 최소 6자 이상이어야 합니다' }
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="비밀번호 (최소 6자)" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                회원가입
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
              이미 계정이 있으신가요?{' '}
              <Link href="/login">로그인</Link>
            </Text>
          </div>
        </Space>
      </Card>
    </Space>
  );
}
