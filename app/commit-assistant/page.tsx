'use client';

import { useState } from 'react';
import { Card, Typography, Form, Input, Button, Space, Alert, Radio } from 'antd';
import { GitlabOutlined, ThunderboltOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function CommitAssistantPage() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const handleGenerate = async (values: { changes: string; type: string }) => {
    setLoading(true);
    try {
      // Mock generation
      const templates = [
        `${values.type}: ${values.changes.slice(0, 50)}`,
        `${values.type}: 변경사항 요약\n\n- ${values.changes.split('\n')[0]}`,
        `${values.type}: 기능 개선 및 버그 수정`,
      ];
      setMessages(templates);
    } catch {
      alert('생성에 실패했습니다.');
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
                <GitlabOutlined /> 커밋 메시지 도우미
              </Title>
              <Paragraph>변경 내용을 입력하면 규칙에 맞는 커밋 메시지를 생성해드립니다.</Paragraph>
            </div>

            <Form layout="vertical" onFinish={handleGenerate}>
              <Form.Item
                name="type"
                label="커밋 타입"
                initialValue="feat"
              >
                <Radio.Group>
                  <Radio.Button value="feat">✨ feat</Radio.Button>
                  <Radio.Button value="fix">🐛 fix</Radio.Button>
                  <Radio.Button value="docs">📝 docs</Radio.Button>
                  <Radio.Button value="style">💄 style</Radio.Button>
                  <Radio.Button value="refactor">♻️ refactor</Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="changes"
                label="변경 내용"
                rules={[{ required: true, message: '변경 내용을 입력해주세요' }]}
              >
                <TextArea
                  rows={6}
                  placeholder="- 로그인 페이지에 소셜 로그인 버튼 추가&#10;- OAuth 인증 로직 구현&#10;- 에러 핸들링 개선"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  icon={<ThunderboltOutlined />}
                  htmlType="submit"
                  loading={loading}
                  size="large"
                >
                  메시지 생성
                </Button>
              </Form.Item>
            </Form>

            {messages.length > 0 && (
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Alert message="추천 커밋 메시지" type="success" showIcon />
                {messages.map((msg, idx) => (
                  <Card key={idx} size="small">
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{msg}</pre>
                  </Card>
                ))}
              </Space>
            )}
          </Space>
        </Card>
      </div>
    </div>
  );
}
