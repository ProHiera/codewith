'use client';

import { useState } from 'react';
import { Card, Typography, Space, Collapse, Tag, Tabs } from 'antd';
import { CodeOutlined, BookOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

// Basic clean code principles
const cleanCodePrinciples = [
  {
    title: '단일 책임 원칙 (SRP)',
    description: '클래스는 단 하나의 책임만 가져야 한다.',
    examples: [
      {
        bad: `class UserManager {
  save(user) { /* DB 저장 */ }
  sendEmail(user) { /* 이메일 전송 */ }
}`,
        good: `class UserRepository { save(user) { /* DB 저장 */ } }
class EmailService { sendEmail(user) { /* 이메일 전송 */ } }`
      }
    ]
  }
];

export default function CleanCodePage() {
  const [activeTab, setActiveTab] = useState('principles');

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={1}>
            <CodeOutlined style={{ marginRight: '16px' }} />
            클린 코드 가이드
          </Title>
          <Paragraph style={{ fontSize: '18px', color: '#666' }}>
            읽기 쉽고, 유지보수하기 쉬운 코드를 작성하는 방법을 배워보세요
          </Paragraph>
        </div>

        <Tabs activeKey={activeTab} onChange={setActiveTab} type="card">
          <TabPane
            tab={
              <Space>
                <BookOutlined />
                <Text>기본 원칙</Text>
              </Space>
            }
            key="principles"
          >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {cleanCodePrinciples.map((principle, index) => (
                <Card key={index} title={
                  <Space>
                    <BookOutlined />
                    <Text strong>{principle.title}</Text>
                  </Space>
                }>
                  <Paragraph>{principle.description}</Paragraph>
                  <Collapse>
                    <Collapse.Panel header={
                      <Space>
                        <CodeOutlined />
                        <Text>코드 예제</Text>
                      </Space>
                    }>
                      <div style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ flex: 1 }}>
                          <Card size="small" title="나쁜 예" style={{ backgroundColor: '#fff2f0' }}>
                            <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                              {principle.examples[0].bad}
                            </pre>
                          </Card>
                        </div>
                        <div style={{ flex: 1 }}>
                          <Card size="small" title="좋은 예" style={{ backgroundColor: '#f6ffed' }}>
                            <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                              {principle.examples[0].good}
                            </pre>
                          </Card>
                        </div>
                      </div>
                    </Collapse.Panel>
                  </Collapse>
                </Card>
              ))}
            </Space>
          </TabPane>

          <TabPane tab="리팩토링 챌린지" key="challenges">
            <Card>
              <Text>리팩토링 챌린지 기능이 곧 추가됩니다.</Text>
            </Card>
          </TabPane>

          <TabPane tab="디자인 패턴" key="patterns">
            <Card>
              <Text>디자인 패턴 학습 기능이 곧 추가됩니다.</Text>
            </Card>
          </TabPane>

          <TabPane tab="품질 지표" key="metrics">
            <Card>
              <Text>코드 품질 분석 기능이 곧 추가됩니다.</Text>
            </Card>
          </TabPane>

          <TabPane tab="성취 배지" key="badges">
            <Card>
              <Text>성취 배지 시스템이 곧 추가됩니다.</Text>
            </Card>
          </TabPane>
        </Tabs>
      </Space>
    </div>
  );
}