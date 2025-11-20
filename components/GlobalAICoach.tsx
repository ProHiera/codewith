'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, Input, Button, Space, Spin, Typography } from 'antd';
import { CloseOutlined, SendOutlined } from '@ant-design/icons';

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
        <div
          style={{
            position: 'fixed',
            right: 32,
            bottom: 32,
            zIndex: 1000,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setIsOpen(true)}
          title="AI 코치에게 물어보기"
        >

          {/*home main image*/}
            <Image
              src="/ai-character.png"
              alt="AI Coach"
              width={80}
              height={80}
              style={{ display: 'block' }}
            />
        </div>
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
              padding: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Space>

                  <Image 
                    src="/ai-character.png" 
                    alt="AI Coach" 
                    width={56} 
                    height={56}
                    style={{}}
                  />

                <div>
                  <Title level={3} style={{ margin: 0, color: 'white', fontSize: 24 }}>AI 개발 코치</Title>
                  <Text style={{ color: '#9ca3af', fontSize: 14 }}>항상 함께하는 코딩 파트너</Text>
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
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    alignItems: 'flex-start',
                    gap: 8
                  }}
                >
                  {msg.role === 'ai' && (
                    <Image 
                      src="/ai-character.png" 
                      alt="AI" 
                      width={40} 
                      height={40}
                      style={{ flexShrink: 0 }}
                    />
                  )}
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
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 8 }}>
                  <Image 
                    src="/ai-character.png" 
                    alt="AI" 
                    width={40} 
                    height={40}
                    style={{ flexShrink: 0 }}
                  />
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
