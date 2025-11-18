'use client';

import { useState } from 'react';
import { Card, Typography, Space, Button, Steps, Alert, Tag } from 'antd';
import { GitlabOutlined, BranchesOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const stages = [
  { title: 'git init', description: '저장소 초기화' },
  { title: 'git add', description: '파일 스테이징' },
  { title: 'git commit', description: '변경사항 커밋' },
  { title: 'git push', description: '원격 저장소에 푸시' },
];

export default function GitSimulatorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [commands, setCommands] = useState<string[]>([]);

  const handleCommand = (cmd: string) => {
    setCommands([...commands, cmd]);
    if (currentStep < stages.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <Card>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={2}>
                <GitlabOutlined /> Git 시뮬레이터
              </Title>
              <Paragraph>Git 명령어를 실습하고 워크플로우를 이해해보세요.</Paragraph>
            </div>

            <Steps current={currentStep}>
              {stages.map((stage, idx) => (
                <Steps.Step key={idx} title={stage.title} description={stage.description} />
              ))}
            </Steps>

            <Card title={<><BranchesOutlined /> 실습</>} size="small">
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Alert
                  message={stages[currentStep].title}
                  description={stages[currentStep].description}
                  type="info"
                  showIcon
                />

                <Space wrap>
                  <Button type="primary" onClick={() => handleCommand(stages[currentStep].title)}>
                    {stages[currentStep].title}
                  </Button>
                  <Button onClick={() => handleCommand('git status')}>git status</Button>
                  <Button onClick={() => handleCommand('git log')}>git log</Button>
                </Space>

                {commands.length > 0 && (
                  <Card title="실행한 명령어" size="small">
                    {commands.map((cmd, idx) => (
                      <div key={idx} style={{ padding: '4px 0' }}>
                        <Tag icon={<CheckCircleOutlined />} color="success">
                          $ {cmd}
                        </Tag>
                      </div>
                    ))}
                  </Card>
                )}
              </Space>
            </Card>
          </Space>
        </Card>
      </div>
    </div>
  );
}
