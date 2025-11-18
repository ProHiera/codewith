'use client';

import { useState } from 'react';
import { Card, Space, Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function Page() {
  const [level] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={1}>📚 JavaScript 치트시트</Title>
            <Paragraph style={{ fontSize: 16 }}>
              자주 사용하는 JavaScript 문법과 패턴을 빠르게 찾아보세요
            </Paragraph>
          </div>

          <Card title={`현재 레벨: ${level === 'beginner' ? '초급' : level === 'intermediate' ? '중급' : '고급'}`}>
            <Paragraph>
              JavaScript 치트시트 컴포넌트가 여기에 표시됩니다.
            </Paragraph>
            <Paragraph type="secondary">
              자세한 치트시트 내용은 StudyCheatsheet 컴포넌트를 Ant Design으로 변환해야 합니다.
            </Paragraph>
          </Card>
        </Space>
      </div>
    </div>
  );
}
