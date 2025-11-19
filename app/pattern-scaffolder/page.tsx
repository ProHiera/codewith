'use client';

import { Card, Typography, Row, Col, Button, Space, Tag, Collapse } from 'antd';
import { ApiOutlined, DownloadOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const patterns = [
  {
    name: 'Singleton',
    category: 'Creational',
    description: '인스턴스를 하나만 생성하고 전역적으로 접근 가능하게 합니다.',
    code: 'class Singleton { private static instance; private constructor() {} ... }',
  },
  {
    name: 'Factory',
    category: 'Creational',
    description: '객체 생성 로직을 캡슐화하여 유연성을 높입니다.',
    code: 'class Factory { createProduct(type) { ... } }',
  },
  {
    name: 'Observer',
    category: 'Behavioral',
    description: '객체의 상태 변화를 관찰하는 옵저버들에게 자동으로 알립니다.',
    code: 'class Subject { notify() { this.observers.forEach(o => o.update()); } }',
  },
  {
    name: 'Strategy',
    category: 'Behavioral',
    description: '알고리즘을 캡슐화하여 런타임에 교체 가능하게 합니다.',
    code: 'class Context { setStrategy(strategy) { this.strategy = strategy; } }',
  },
];

export default function PatternScaffolderPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card>
        <Space direction="vertical" size="small">
          <Title level={2}>
            <ApiOutlined /> 디자인 패턴 스캐폴더
          </Title>
          <Paragraph>
            자주 사용되는 디자인 패턴 보일러플레이트를 생성합니다.
          </Paragraph>
        </Space>
      </Card>

        <Row gutter={[16, 16]}>
          {patterns.map((pattern, idx) => (
            <Col xs={24} md={12} key={idx}>
              <Card hoverable>
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title level={4} style={{ margin: 0 }}>{pattern.name}</Title>
                    <Tag color="blue">{pattern.category}</Tag>
                  </div>
                  <Paragraph>{pattern.description}</Paragraph>
                  <Collapse ghost>
                    <Collapse.Panel header="코드 미리보기" key="1">
                      <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 8, overflow: 'auto' }}>
                        {pattern.code}
                      </pre>
                    </Collapse.Panel>
                  </Collapse>
                  <Button type="primary" icon={<DownloadOutlined />} block>
                    코드 생성
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
  );
}
