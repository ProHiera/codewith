'use client';

import { Card, Typography, Space, Collapse, Tag } from 'antd';
import { CodeOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const principles = [
  {
    title: 'DRY (Don\'t Repeat Yourself)',
    description: '같은 코드를 반복하지 말고, 재사용 가능한 함수나 컴포넌트로 추상화하세요.',
    bad: 'function calcArea1() { return width * height; }\nfunction calcArea2() { return w * h; }',
    good: 'function calcArea(width, height) { return width * height; }',
  },
  {
    title: 'KISS (Keep It Simple, Stupid)',
    description: '복잡한 로직보다 단순하고 명확한 코드를 작성하세요.',
    bad: 'const result = data.filter(x => x).map(x => x.value).reduce((a,b) => a+b);',
    good: 'const sum = validData.reduce((total, item) => total + item.value, 0);',
  },
  {
    title: 'SOLID 원칙',
    description: '단일 책임, 개방-폐쇄, 리스코프 치환, 인터페이스 분리, 의존성 역전 원칙',
    bad: 'class User { save() {} sendEmail() {} validateData() {} }',
    good: 'class User {}\nclass UserRepository { save() {} }\nclass EmailService { send() {} }',
  },
  {
    title: '의미있는 네이밍',
    description: '변수명과 함수명은 목적을 명확히 드러내야 합니다.',
    bad: 'const d = new Date(); const x = users.filter(u => u.age > 18);',
    good: 'const currentDate = new Date(); const adults = users.filter(user => user.age > 18);',
  },
];

export default function CleanCodePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <Card style={{ marginBottom: 24 }}>
          <Space direction="vertical" size="small">
            <Title level={2}>
              <CodeOutlined /> 클린 코드 가이드
            </Title>
            <Paragraph>
              읽기 쉽고 유지보수하기 좋은 코드를 작성하는 방법을 배워보세요.
            </Paragraph>
          </Space>
        </Card>

        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {principles.map((principle, idx) => (
            <Card key={idx} title={<><CheckCircleOutlined /> {principle.title}</>}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Paragraph>{principle.description}</Paragraph>
                <Collapse>
                  <Collapse.Panel header={<Tag color="red">❌ 나쁜 예</Tag>} key="bad">
                    <pre style={{ background: '#fff1f0', padding: 12, borderRadius: 8, overflow: 'auto' }}>
                      {principle.bad}
                    </pre>
                  </Collapse.Panel>
                  <Collapse.Panel header={<Tag color="green">✅ 좋은 예</Tag>} key="good">
                    <pre style={{ background: '#f6ffed', padding: 12, borderRadius: 8, overflow: 'auto' }}>
                      {principle.good}
                    </pre>
                  </Collapse.Panel>
                </Collapse>
              </Space>
            </Card>
          ))}
        </Space>
      </div>
    </div>
  );
}
