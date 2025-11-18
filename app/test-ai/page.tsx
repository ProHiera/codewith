'use client';

import { useState } from 'react';
import { Card, Typography, Space, Button, Input, Alert, Spin } from 'antd';
import { RobotOutlined, SendOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function TestAIPage() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleTest = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt }),
      });
      const data = await res.json();
      setResponse(data.message || '응답을 받을 수 없습니다.');
    } catch {
      setResponse('AI 응답 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <Card>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={2}>
                <RobotOutlined /> AI 테스트
              </Title>
              <Paragraph>
                OpenAI API 연동을 테스트합니다. 질문을 입력하고 AI의 응답을 확인하세요.
              </Paragraph>
            </div>

            <Alert
              message="API Key 설정 필요"
              description="환경변수에 OPENAI_API_KEY를 설정해야 사용 가능합니다."
              type="warning"
              showIcon
            />

            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <TextArea
                rows={4}
                placeholder="AI에게 질문을 입력하세요..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={loading}
              />

              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleTest}
                loading={loading}
                size="large"
                disabled={!prompt.trim()}
              >
                전송
              </Button>

              {loading && (
                <div style={{ textAlign: 'center', padding: '24px' }}>
                  <Spin size="large" tip="AI가 응답을 생성하고 있습니다..." />
                </div>
              )}

              {response && !loading && (
                <Card title="AI 응답" size="small" style={{ background: '#fafafa' }}>
                  <Paragraph>{response}</Paragraph>
                </Card>
              )}
            </Space>
          </Space>
        </Card>
      </div>
    </div>
  );
}
