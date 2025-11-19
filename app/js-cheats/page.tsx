'use client';

import { useState } from 'react';
import { Card, Space, Typography } from 'antd';
import { BookOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function Page() {
  const [level] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card>
        <Title level={1}><BookOutlined /> JavaScript 치트시트</Title>
        <Paragraph style={{ fontSize: 16 }}>
          자주 사용하는 JavaScript 문법과 패턴을 빠르게 찾아보세요
        </Paragraph>
      </Card>

      <Card title={`현재 레벨: ${level === 'beginner' ? '초급' : level === 'intermediate' ? '중급' : '고급'}`}>
            <Paragraph>
              JavaScript 치트시트 컴포넌트가 여기에 표시됩니다.
            </Paragraph>
            <Paragraph type="secondary">
            자세한 치트시트 내용은 StudyCheatsheet 컴포넌트를 Ant Design으로 변환해야 합니다.
          </Paragraph>
        </Card>
      </Space>
  );
}