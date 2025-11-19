'use client';

import { useState } from 'react';
import { Card, Typography, Form, Input, Button, Space, Alert } from 'antd';
import { BugOutlined, SearchOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function ErrorDoctorPage() {
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<{ cause?: string; solution?: string; examples?: string } | null>(null);

  const handleDiagnose = async (values: { errorMessage: string; code: string }) => {
    setLoading(true);
    try {
      const res = await fetch('/api/error/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      setDiagnosis(data);
    } catch {
      alert('진단에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={2}>
              <BugOutlined /> 에러 진단 도우미
            </Title>
            <Paragraph>에러 메시지와 코드를 입력하면 AI가 원인과 해결방법을 알려드립니다.</Paragraph>
          </div>

            <Form layout="vertical" onFinish={handleDiagnose}>
              <Form.Item
                name="errorMessage"
                label="에러 메시지"
                rules={[{ required: true, message: '에러 메시지를 입력해주세요' }]}
              >
                <TextArea rows={3} placeholder="TypeError: Cannot read property 'map' of undefined" />
              </Form.Item>

              <Form.Item
                name="code"
                label="에러가 발생한 코드"
                rules={[{ required: true, message: '코드를 입력해주세요' }]}
              >
                <TextArea rows={8} placeholder="const result = data.map(item => item.name);" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  htmlType="submit"
                  loading={loading}
                  size="large"
                >
                  진단하기
                </Button>
              </Form.Item>
            </Form>

            {diagnosis && (
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Alert
                  message="진단 완료"
                  description="AI가 에러를 분석했습니다."
                  type="success"
                  showIcon
                />

                <Card title={<><CheckCircleOutlined /> 원인</>} size="small">
                  <Paragraph>{diagnosis.cause || '원인을 분석 중입니다...'}</Paragraph>
                </Card>

                <Card title="해결 방법" size="small">
                  <Paragraph>{diagnosis.solution || '해결방법을 생성 중입니다...'}</Paragraph>
                </Card>

                {diagnosis.examples && (
                  <Card title="수정 예시" size="small">
                    <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 8, overflow: 'auto' }}>
                      {diagnosis.examples}
                    </pre>
                  </Card>
                )}
              </Space>
            )}
          </Space>
        </Card>
      </Space>
  );
}
