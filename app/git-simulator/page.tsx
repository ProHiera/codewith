'use client';

import { useState } from 'react';
import { Card, Typography, Space, Button, Steps, Alert, Tag, Input } from 'antd';
import { GitlabOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const stages = [
  { title: 'git init', description: '저장소 초기화' },
  { title: 'git add', description: '파일 스테이징' },
  { title: 'git commit', description: '변경사항 커밋' },
  { title: 'git push', description: '원격 저장소에 푸시' },
];

export default function GitSimulatorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [commands, setCommands] = useState<string[]>([]);
  const [inputCommand, setInputCommand] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '$ Git Bash initialized',
    '$ Welcome to Git Simulator',
  ]);

  const handleCommand = (cmd: string) => {
    const newCommands = [...commands, cmd];
    const newOutput = [...terminalOutput, `$ ${cmd}`];
    
    // Git 명령어 시뮬레이션
    if (cmd.startsWith('git init')) {
      newOutput.push('Initialized empty Git repository in /project/.git/');
      if (currentStep === 0) setCurrentStep(1);
    } else if (cmd.startsWith('git add')) {
      newOutput.push('Changes staged successfully');
      if (currentStep === 1) setCurrentStep(2);
    } else if (cmd.startsWith('git commit')) {
      newOutput.push('[main a1b2c3d] Initial commit');
      newOutput.push(' 1 file changed, 10 insertions(+)');
      if (currentStep === 2) setCurrentStep(3);
    } else if (cmd.startsWith('git push')) {
      newOutput.push('Enumerating objects: 3, done.');
      newOutput.push('Counting objects: 100% (3/3), done.');
      newOutput.push('Writing objects: 100% (3/3), 250 bytes | 250.00 KiB/s, done.');
      newOutput.push('Total 3 (delta 0), reused 0 (delta 0)');
      if (currentStep === 3) setCurrentStep(4);
    } else if (cmd === 'git status') {
      if (currentStep === 0) {
        newOutput.push('fatal: not a git repository');
      } else if (currentStep === 1) {
        newOutput.push('On branch main');
        newOutput.push('Untracked files:');
        newOutput.push('  (use "git add <file>..." to include in what will be committed)');
        newOutput.push('        index.html');
      } else if (currentStep === 2) {
        newOutput.push('On branch main');
        newOutput.push('Changes to be committed:');
        newOutput.push('  (use "git restore --staged <file>..." to unstage)');
        newOutput.push('        new file:   index.html');
      } else {
        newOutput.push('On branch main');
        newOutput.push('nothing to commit, working tree clean');
      }
    } else if (cmd === 'git log') {
      if (currentStep >= 3) {
        newOutput.push('commit a1b2c3d4e5f6g7h8i9j0 (HEAD -> main)');
        newOutput.push('Author: Developer <dev@example.com>');
        newOutput.push('Date:   ' + new Date().toDateString());
        newOutput.push('');
        newOutput.push('    Initial commit');
      } else {
        newOutput.push('fatal: your current branch \'main\' does not have any commits yet');
      }
    } else {
      newOutput.push(`command not found: ${cmd}`);
    }
    
    setCommands(newCommands);
    setTerminalOutput(newOutput);
    setInputCommand('');
  };

  const handleInputCommand = () => {
    if (inputCommand.trim()) {
      handleCommand(inputCommand.trim());
    }
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card>
        <Title level={2}>
          <GitlabOutlined /> Git 시뮬레이터
        </Title>
        <Paragraph>실제 Git Bash처럼 명령어를 실습하고 워크플로우를 이해해보세요.</Paragraph>
      </Card>

      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Steps current={currentStep}>
            {stages.map((stage, idx) => (
              <Steps.Step key={idx} title={stage.title} description={stage.description} />
            ))}
          </Steps>

          {/* Git Bash Terminal */}
          <Card 
            title={
              <Space>
                <Text style={{ color: '#fff' }}>● ● ●</Text>
                <Text style={{ color: '#fff' }}>MINGW64:/c/project (main)</Text>
              </Space>
            }
            headStyle={{ 
              background: '#2d2d2d',
              color: '#fff',
              borderRadius: '8px 8px 0 0'
            }}
            bodyStyle={{ 
              background: '#1e1e1e',
              fontFamily: 'Consolas, Monaco, monospace',
              fontSize: 14,
              minHeight: 300,
              maxHeight: 500,
              overflow: 'auto'
            }}
          >
            <Space direction="vertical" size={0} style={{ width: '100%' }}>
              {terminalOutput.map((line, idx) => (
                <div key={idx} style={{ 
                  color: line.startsWith('$') ? '#4ec9b0' : '#d4d4d4',
                  padding: '2px 0'
                }}>
                  {line}
                </div>
              ))}
              
              {/* Input Line */}
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                <Text style={{ color: '#4ec9b0', marginRight: 8 }}>$</Text>
                <Input
                  value={inputCommand}
                  onChange={(e) => setInputCommand(e.target.value)}
                  onPressEnter={handleInputCommand}
                  placeholder="명령어를 입력하세요 (예: git init)"
                  style={{ 
                    background: 'transparent',
                    border: 'none',
                    color: '#d4d4d4',
                    fontFamily: 'Consolas, Monaco, monospace',
                    boxShadow: 'none'
                  }}
                  autoFocus
                />
              </div>
            </Space>
          </Card>

          <Alert
            message={currentStep < 4 ? stages[currentStep].title : '완료!'}
            description={currentStep < 4 ? stages[currentStep].description : '모든 단계를 완료했습니다!'}
            type={currentStep < 4 ? 'info' : 'success'}
            showIcon
          />

          <Card title="빠른 명령어" size="small">
            <Space wrap>
              <Button onClick={() => handleCommand('git init')}>git init</Button>
              <Button onClick={() => handleCommand('git add .')}>git add .</Button>
              <Button onClick={() => handleCommand('git commit -m &quot;Initial commit&quot;')}>
                git commit -m &quot;Initial commit&quot;
              </Button>
              <Button onClick={() => handleCommand('git push origin main')}>git push origin main</Button>
              <Button type="dashed" onClick={() => handleCommand('git status')}>git status</Button>
              <Button type="dashed" onClick={() => handleCommand('git log')}>git log</Button>
              <Button 
                danger 
                onClick={() => {
                  setCommands([]);
                  setTerminalOutput(['$ Git Bash initialized', '$ Welcome to Git Simulator']);
                  setCurrentStep(0);
                  setInputCommand('');
                }}
              >
                초기화
              </Button>
            </Space>
          </Card>

          {commands.length > 0 && (
            <Card title="실행한 명령어 기록" size="small">
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                {commands.map((cmd, idx) => (
                  <Tag key={idx} icon={<CheckCircleOutlined />} color="success">
                    {cmd}
                  </Tag>
                ))}
              </Space>
            </Card>
          )}
        </Space>
      </Card>
    </Space>
  );
}
