'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Input, Button, Space, Typography, List, Avatar, Spin } from 'antd';
import { 
  SendOutlined, 
  RobotOutlined,
  UserOutlined,
  BulbOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function AICoachPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '안녕하세요! 저는 당신의 전용 개발 코치입니다. 🤖\n\n코딩 문제, 개념 이해, 커리어 고민 등 무엇이든 물어보세요!\n\n💡 팁: 구체적인 코드나 에러 메시지를 공유하면 더 정확한 도움을 드릴 수 있어요.',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const quickQuestions = [
    '🎯 CSS Flexbox를 쉽게 설명해주세요',
    '🔧 async/await와 Promise의 차이는?',
    '📚 React Hook 사용법 알려주세요',
    '💼 주니어 개발자 취업 팁',
    '🐛 디버깅 잘하는 방법',
  ];

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.reply || '죄송합니다. 응답을 생성할 수 없습니다.',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        role: 'assistant',
        content: '오류가 발생했습니다. 다시 시도해주세요.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={1}>
              <RobotOutlined /> AI 개발 코치
            </Title>
            <Paragraph>
              코딩 문제부터 커리어 고민까지, 무엇이든 물어보세요!
            </Paragraph>
          </div>

          <Space wrap>
            {quickQuestions.map((q, idx) => (
              <Button
                key={idx}
                icon={<BulbOutlined />}
                onClick={() => handleSend(q)}
                disabled={loading}
              >
                {q}
              </Button>
            ))}
          </Space>

          <Card style={{ minHeight: '60vh', maxHeight: '70vh', overflow: 'auto' }}>
            <List
              dataSource={messages}
              renderItem={(msg) => (
                <List.Item style={{ border: 'none' }}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={msg.role === 'user' ? <UserOutlined /> : <RobotOutlined />}
                        style={{ background: msg.role === 'user' ? '#1890ff' : '#52c41a' }}
                      />
                    }
                    title={msg.role === 'user' ? '나' : 'AI 코치'}
                    description={
                      <div style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>
                        <Text>{msg.content}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {new Date(msg.timestamp).toLocaleTimeString('ko-KR')}
                        </Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
            {loading && (
              <div style={{ textAlign: 'center', padding: 20 }}>
                <Spin tip="AI가 생각 중..." />
              </div>
            )}
          </Card>

          <Card>
            <Space.Compact style={{ width: '100%' }}>
              <TextArea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="질문을 입력하세요..."
                autoSize={{ minRows: 2, maxRows: 6 }}
                onPressEnter={(e) => {
                  if (!e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={loading}
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={() => handleSend()}
                loading={loading}
                style={{ height: 'auto' }}
              >
                전송
              </Button>
            </Space.Compact>
          </Card>

          <Card style={{ background: '#fffbe6', border: '1px solid #ffe58f' }}>
            <Text strong>💡 더 나은 답변을 받으려면:</Text>
            <ul style={{ marginTop: 8, marginBottom: 0 }}>
              <li>구체적인 코드나 에러 메시지를 포함하세요</li>
              <li>무엇을 시도했는지 설명해주세요</li>
              <li>원하는 결과를 명확히 해주세요</li>
            </ul>
          </Card>
        </Space>
      </div>
    </div>
  );
}
