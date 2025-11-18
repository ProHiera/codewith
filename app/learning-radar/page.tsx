'use client';

import { Card, Typography, Space, Progress, Row, Col, Tag } from 'antd';
import { RadarChartOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const skills = [
  { name: 'JavaScript', level: 75, category: 'Frontend' },
  { name: 'React', level: 85, category: 'Frontend' },
  { name: 'TypeScript', level: 60, category: 'Frontend' },
  { name: 'Node.js', level: 50, category: 'Backend' },
  { name: 'SQL', level: 40, category: 'Database' },
  { name: 'Git', level: 70, category: 'DevOps' },
];

export default function LearningRadarPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Card>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={2}>
                <RadarChartOutlined /> 학습 레이더 차트
              </Title>
              <Paragraph>
                현재 보유한 기술 스택의 숙련도를 시각화합니다.
              </Paragraph>
            </div>

            <Row gutter={[16, 16]}>
              {skills.map((skill, idx) => (
                <Col xs={24} md={12} key={idx}>
                  <Card size="small">
                    <Space direction="vertical" style={{ width: '100%' }} size="small">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 500 }}>{skill.name}</span>
                        <Tag color="blue">{skill.category}</Tag>
                      </div>
                      <Progress
                        percent={skill.level}
                        status={skill.level >= 70 ? 'success' : 'active'}
                        strokeColor={
                          skill.level >= 70 ? '#52c41a' : skill.level >= 50 ? '#1890ff' : '#faad14'
                        }
                      />
                      <div style={{ fontSize: 12, color: '#666' }}>
                        {skill.level >= 70 ? '숙련' : skill.level >= 50 ? '중급' : '초급'}
                      </div>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </Space>
        </Card>
      </div>
    </div>
  );
}
