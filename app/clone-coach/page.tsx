'use client';

import { useState } from 'react';
import { Card, Typography, Row, Col, Button, Space, Tag, Input, Divider } from 'antd';
import { GithubOutlined, CodeOutlined, RocketOutlined, CheckCircleOutlined, FileOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const projects = [
  { title: 'Netflix 클론', difficulty: '고급', stack: ['React', 'Next.js', 'TMDB API'], repo: '#' },
  { title: 'Airbnb 클론', difficulty: '고급', stack: ['React', 'Node.js', 'MongoDB'], repo: '#' },
  { title: 'Twitter 클론', difficulty: '중급', stack: ['React', 'Firebase', 'Tailwind'], repo: '#' },
  { title: 'Trello 클론', difficulty: '중급', stack: ['React', 'Redux', 'DnD'], repo: '#' },
  { title: 'Slack 클론', difficulty: '고급', stack: ['React', 'Socket.io', 'Express'], repo: '#' },
  { title: 'Instagram 클론', difficulty: '고급', stack: ['React', 'GraphQL', 'AWS S3'], repo: '#' },
];

export default function CloneCoachPage() {
  const [, setSelectedProject] = useState<number | null>(null);
  const [userCode, setUserCode] = useState(`// 여기에 코드를 작성하세요
function App() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;`);

  const referenceCode = `// 참고 코드
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="container">
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;`;

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card>
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

      <Card>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            {/* VS Code 스타일 에디터 - 내 코드 */}
            <Card 
              title={
                <Space>
                  <FileOutlined />
                  <Text style={{ color: '#fff' }}>App.jsx</Text>
                  <Tag color="blue">내 코드</Tag>
                </Space>
              }
              headStyle={{ 
                background: '#1e1e1e',
                color: '#fff',
                borderRadius: '8px 8px 0 0'
              }}
              bodyStyle={{ 
                background: '#1e1e1e',
                padding: 0
              }}
            >
              <div style={{ 
                background: '#252526',
                padding: '8px 12px',
                borderBottom: '1px solid #3e3e42',
                fontFamily: 'Consolas, Monaco, monospace',
                fontSize: 12,
                color: '#858585'
              }}>
                <Space>
                  <Text style={{ color: '#858585' }}>1</Text>
                  <Text style={{ color: '#858585' }}>problems</Text>
                  <Divider type="vertical" style={{ borderColor: '#3e3e42' }} />
                  <Text style={{ color: '#858585' }}>UTF-8</Text>
                  <Text style={{ color: '#858585' }}>JavaScript JSX</Text>
                </Space>
              </div>
              <TextArea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                style={{
                  background: '#1e1e1e',
                  border: 'none',
                  color: '#d4d4d4',
                  fontFamily: 'Consolas, Monaco, monospace',
                  fontSize: 14,
                  minHeight: 400,
                  resize: 'none'
                }}
                autoSize={{ minRows: 20, maxRows: 30 }}
              />
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            {/* VS Code 스타일 에디터 - 참고 코드 */}
            <Card 
              title={
                <Space>
                  <FileOutlined />
                  <Text style={{ color: '#fff' }}>Reference.jsx</Text>
                  <Tag color="green">참고 코드</Tag>
                </Space>
              }
              headStyle={{ 
                background: '#1e1e1e',
                color: '#fff',
                borderRadius: '8px 8px 0 0'
              }}
              bodyStyle={{ 
                background: '#1e1e1e',
                padding: 0
              }}
            >
              <div style={{ 
                background: '#252526',
                padding: '8px 12px',
                borderBottom: '1px solid #3e3e42',
                fontFamily: 'Consolas, Monaco, monospace',
                fontSize: 12,
                color: '#858585'
              }}>
                <Space>
                  <CheckCircleOutlined style={{ color: '#4ec9b0' }} />
                  <Text style={{ color: '#858585' }}>No problems</Text>
                  <Divider type="vertical" style={{ borderColor: '#3e3e42' }} />
                  <Text style={{ color: '#858585' }}>UTF-8</Text>
                  <Text style={{ color: '#858585' }}>JavaScript JSX</Text>
                </Space>
              </div>
              <pre style={{
                background: '#1e1e1e',
                color: '#d4d4d4',
                fontFamily: 'Consolas, Monaco, monospace',
                fontSize: 14,
                padding: '16px',
                margin: 0,
                minHeight: 400,
                overflow: 'auto'
              }}>
                {referenceCode}
              </pre>
            </Card>
          </Col>
        </Row>

        <Card style={{ marginTop: 16 }}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Title level={4}>
              <CheckCircleOutlined /> AI 코드 비교 분석
            </Title>
            <Paragraph>
              두 코드의 차이점과 개선 방향을 분석합니다.
            </Paragraph>
            <Button type="primary" size="large">
              코드 비교 시작
            </Button>
          </Space>
        </Card>
      </Card>

      <Card>
        <Title level={3}>프로젝트 템플릿</Title>
        <Paragraph>아래 프로젝트를 선택하여 클론 코딩을 시작하세요.</Paragraph>
        <Divider />

        <Row gutter={[16, 16]}>
          {projects.map((project, idx) => (
            <Col xs={24} md={12} lg={8} key={idx}>
              <Card hoverable onClick={() => setSelectedProject(idx)}>
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
      </Card>
    </Space>
  );
}
