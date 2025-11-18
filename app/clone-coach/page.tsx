'use client';

import { Card, Typography, Row, Col, Button, Space, Tag } from 'antd';
import { GithubOutlined, CodeOutlined, RocketOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const projects = [
  { title: 'Netflix 클론', difficulty: '고급', stack: ['React', 'Next.js', 'TMDB API'], repo: '#' },
  { title: 'Airbnb 클론', difficulty: '고급', stack: ['React', 'Node.js', 'MongoDB'], repo: '#' },
  { title: 'Twitter 클론', difficulty: '중급', stack: ['React', 'Firebase', 'Tailwind'], repo: '#' },
  { title: 'Trello 클론', difficulty: '중급', stack: ['React', 'Redux', 'DnD'], repo: '#' },
  { title: 'Slack 클론', difficulty: '고급', stack: ['React', 'Socket.io', 'Express'], repo: '#' },
  { title: 'Instagram 클론', difficulty: '고급', stack: ['React', 'GraphQL', 'AWS S3'], repo: '#' },
];

export default function CloneCoachPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Card style={{ marginBottom: 24 }}>
          <Space direction="vertical" size="small">
            <Title level={2}>
              <CodeOutlined /> 프로젝트 클론 코칭
            </Title>
            <Paragraph>
              실전 프로젝트를 따라 만들면서 실무 역량을 키워보세요. 
              단계별 가이드와 AI 코칭으로 완성까지 함께합니다.
            </Paragraph>
          </Space>
        </Card>

        <Row gutter={[16, 16]}>
          {projects.map((project, idx) => (
            <Col xs={24} md={12} lg={8} key={idx}>
              <Card hoverable>
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <Title level={4}>{project.title}</Title>
                  <Tag color={project.difficulty === '고급' ? 'red' : 'blue'}>
                    {project.difficulty}
                  </Tag>
                  <Space wrap>
                    {project.stack.map((tech, i) => (
                      <Tag key={i} color="purple">{tech}</Tag>
                    ))}
                  </Space>
                  <Space style={{ marginTop: 12 }}>
                    <Button type="primary" icon={<RocketOutlined />}>
                      시작하기
                    </Button>
                    <Button icon={<GithubOutlined />} href={project.repo} target="_blank">
                      템플릿
                    </Button>
                  </Space>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
