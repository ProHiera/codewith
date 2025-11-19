'use client';

import { useState } from 'react';
import { Card, Typography, Space, Button, Checkbox, Progress, Alert, Tag } from 'antd';
import { RocketOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const skills = [
  { name: 'HTML/CSS', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express', category: 'Backend' },
  { name: 'SQL', category: 'Database' },
  { name: 'Git', category: 'DevOps' },
];

export default function LevelAssessmentPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = () => {
    const count = selected.length;
    if (count <= 2) setResult('입문');
    else if (count <= 4) setResult('초급');
    else if (count <= 6) setResult('중급');
    else setResult('고급');
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
              <Title level={2}>
                <RocketOutlined /> 레벨 자가 진단
              </Title>
              <Paragraph>보유한 기술 스택을 선택하면 현재 레벨을 평가해드립니다.</Paragraph>
              <Progress
                percent={Math.round((selected.length / skills.length) * 100)}
                status="active"
              />
            </div>

            <Card title="보유 기술 선택" size="small">
              <Checkbox.Group
                value={selected}
                onChange={(values) => setSelected(values as string[])}
                style={{ width: '100%' }}
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  {skills.map((skill) => (
                    <div key={skill.name} style={{ padding: '8px 0' }}>
                      <Checkbox value={skill.name}>
                        {skill.name}
                        <Tag color="blue" style={{ marginLeft: 8 }}>{skill.category}</Tag>
                      </Checkbox>
                    </div>
                  ))}
                </Space>
              </Checkbox.Group>
            </Card>

            <Button
              type="primary"
              size="large"
              icon={<CheckCircleOutlined />}
              onClick={handleSubmit}
              disabled={selected.length === 0}
              block
            >
              진단하기
            </Button>

            {result && (
              <Alert
                message={`현재 레벨: ${result}`}
                description={`${selected.length}개의 기술을 보유하고 계시네요!`}
                type="success"
                showIcon
              />
            )}
          </Space>
        </Card>
      </Space>
  );
}
