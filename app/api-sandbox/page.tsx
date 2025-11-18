'use client';

import { useState } from 'react';
import { Card, Typography, Space, Button, Form, Input, Select, Tag } from 'antd';
import { ApiOutlined, SendOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function ApiSandboxPage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const handleRequest = async (values: { method: string; url: string; body: string }) => {
    setLoading(true);
    try {
      const res = await fetch(values.url, {
        method: values.method,
        headers: { 'Content-Type': 'application/json' },
        body: values.method !== 'GET' ? values.body : undefined,
      });
      const data = await res.json();
      setResponse({ status: res.status, data });
    } catch (error: any) {
      setResponse({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Card>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={2}>
                <ApiOutlined /> API 샌드박스
              </Title>
              <Paragraph>REST API 요청을 테스트하고 응답을 확인해보세요.</Paragraph>
            </div>

            <Form layout="vertical" onFinish={handleRequest}>
              <Form.Item name="method" label="HTTP 메서드" initialValue="GET">
                <Select>
                  <Select.Option value="GET">GET</Select.Option>
                  <Select.Option value="POST">POST</Select.Option>
                  <Select.Option value="PUT">PUT</Select.Option>
                  <Select.Option value="DELETE">DELETE</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="url"
                label="API URL"
                rules={[{ required: true, message: 'URL을 입력해주세요' }]}
              >
                <Input placeholder="https://api.example.com/users" />
              </Form.Item>

              <Form.Item name="body" label="Request Body (JSON)">
                <TextArea rows={6} placeholder='{"name": "John", "age": 30}' />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SendOutlined />}
                  loading={loading}
                  size="large"
                >
                  요청 보내기
                </Button>
              </Form.Item>
            </Form>

            {response && (
              <Card title="응답" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  {response.status && (
                    <Tag color={response.status === 200 ? 'success' : 'error'}>
                      Status: {response.status}
                    </Tag>
                  )}
                  <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 8, overflow: 'auto' }}>
                    {JSON.stringify(response.data || response.error, null, 2)}
                  </pre>
                </Space>
              </Card>
            )}
          </Space>
        </Card>
      </div>
    </div>
  );
}
