'use client';

import { useState } from 'react';
import { FloatButton, Card, Input, Button, Space, Spin, Badge, Typography } from 'antd';
import { RobotOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function GlobalAICoach() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    {
      role: 'ai',
      content: '안녕하세요! 👋 AI 개발 코치입니다. 코딩하다 막히는 부분이 있으면 언제든 물어보세요!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: '죄송해요, 일시적인 오류가 발생했어요 다시 시도해주세요 ♥' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <FloatButton
          icon={<Badge dot color="green"><RobotOutlined style={{ fontSize: 24 }} /></Badge>}
          type="primary"
          style={{ 
            width: 64, 
            height: 64,
            right: 32,
            bottom: 32,
          }}
          onClick={() => setIsOpen(true)}
          tooltip="AI 코치에게 물어보기"
        />
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div style={{ 
          position: 'fixed', 
          bottom: 32, 
          right: 32, 
          zIndex: 1000, 
          width: 400, 
          height: 600,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Card 
            style={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 12px 48px rgba(0,0,0,0.15)',
              borderRadius: 16,
              overflow: 'hidden'
            }}
            bodyStyle={{ 
              padding: 0, 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{ 
              background: '#1f2937', 
              color: 'white', 
              padding: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Space>
                <Badge dot color="green">
                  <RobotOutlined style={{ fontSize: 32 }} />
                </Badge>
                <div>
                  <Title level={4} style={{ margin: 0, color: 'white', fontSize: 18 }}>AI 개발 코치</Title>
                  <Text style={{ color: '#9ca3af', fontSize: 12 }}>항상 함께하는 코딩 파트너</Text>
                </div>
              </Space>
              <Button 
                type="text" 
                icon={<CloseOutlined />}
                onClick={() => setIsOpen(false)}
                style={{ color: 'white' }}
              />
            </div>

            {/* Messages */}
            <div style={{ 
              flex: 1, 
              overflowY: 'auto', 
              padding: 16, 
              background: '#f9fafb',
              display: 'flex',
              flexDirection: 'column',
              gap: 16
            }}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{ 
                    display: 'flex', 
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div
                    style={{
                      maxWidth: '80%',
                      borderRadius: 16,
                      padding: '12px 16px',
                      background: msg.role === 'user' ? '#1f2937' : 'white',
                      color: msg.role === 'user' ? 'white' : '#1f2937',
                      border: msg.role === 'user' ? 'none' : '1px solid #e5e7eb',
                      fontSize: 14,
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{ 
                    background: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: 16, 
                    padding: '12px 16px'
                  }}>
                    <Spin size="small" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div style={{ 
              padding: '8px 16px', 
              background: '#f9fafb', 
              borderTop: '1px solid #e5e7eb'
            }}>
              <Space wrap size="small">
                {[
                  '코드 설명해줘',
                  '에러 해결법',
                  '최적화 방법',
                  '학습 팁'
                ].map((quick) => (
                  <Button
                    key={quick}
                    size="small"
                    onClick={() => {
                      setInput(quick);
                      setTimeout(() => handleSend(), 100);
                    }}
                    disabled={isLoading}
                  >
                    {quick}
                  </Button>
                ))}
              </Space>
            </div>

            {/* Input */}
            <div style={{ padding: 16, background: 'white', borderTop: '1px solid #e5e7eb' }}>
              <Space.Compact style={{ width: '100%' }}>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onPressEnter={handleKeyPress}
                  placeholder="무엇이든 물어보세요..."
                  disabled={isLoading}
                  style={{ borderRadius: '12px 0 0 12px' }}
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  style={{ borderRadius: '0 12px 12px 0' }}
                >
                  전송
                </Button>
              </Space.Compact>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
