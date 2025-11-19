'use client';

import { useState } from 'react';
import { Card, Typography, Space, Button, Spin, Tag, Timeline } from 'antd';
import { ThunderboltOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function AsyncSimulatorPage() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<Array<{ time: number; message: string; type: string }>>([]);

  const simulateAsync = async () => {
    setLoading(true);
    setLogs([]);
    
    addLog('동기 작업 1 시작', 'sync');
    await delay(1000);
    addLog('동기 작업 1 완료', 'sync');
    
    addLog('비동기 작업 시작 (Promise)', 'async');
    fetchData();
    
    addLog('동기 작업 2 시작', 'sync');
    await delay(500);
    addLog('동기 작업 2 완료', 'sync');
    
    setLoading(false);
  };

  const fetchData = async () => {
    await delay(2000);
    addLog('비동기 작업 완료 (데이터 로드)', 'async');
  };

  const addLog = (message: string, type: string) => {
    setLogs(prev => [...prev, { time: Date.now(), message, type }]);
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <Card>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={2}>
                <ThunderboltOutlined /> 비동기 처리 시뮬레이터
              </Title>
              <Paragraph>
                동기/비동기 코드의 실행 순서를 시각적으로 확인해보세요.
              </Paragraph>
            </div>

            <Button
              type="primary"
              size="large"
              icon={<ClockCircleOutlined />}
              onClick={simulateAsync}
              loading={loading}
              block
            >
              시뮬레이션 시작
            </Button>

            {logs.length > 0 && (
              <Card title="실행 로그" size="small">
                <Timeline>
                  {logs.map((log, idx) => (
                    <Timeline.Item
                      key={idx}
                      color={log.type === 'sync' ? 'blue' : 'green'}
                      dot={<CheckCircleOutlined />}
                    >
                      <Tag color={log.type === 'sync' ? 'blue' : 'green'}>
                        {log.type === 'sync' ? '동기' : '비동기'}
                      </Tag>
                      <span style={{ marginLeft: 8 }}>{log.message}</span>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Card>
            )}

            {loading && (
              <div style={{ textAlign: 'center', padding: '24px' }}>
                <Spin size="large" tip="실행 중..." />
              </div>
            )}
          </Space>
        </Card>
      </div>
    </div>
  );
}
