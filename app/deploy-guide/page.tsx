'use client';

import { Card, Typography, Space, Collapse, Tag, Alert } from 'antd';
import { RocketOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const steps = [
  {
    title: '1. 저장소 준비',
    items: ['GitHub 저장소 생성', 'package.json 설정 확인', 'build 스크립트 확인'],
  },
  {
    title: '2. Vercel 배포',
    items: ['Vercel 계정 생성', 'GitHub 연동', 'Import Project', '자동 배포 설정'],
  },
  {
    title: '3. 환경변수 설정',
    items: ['Vercel 대시보드에서 Environment Variables 추가', '.env 파일 내용 복사', 'Production/Preview 환경 설정'],
  },
  {
    title: '4. 커스텀 도메인',
    items: ['도메인 구매 (선택사항)', 'Vercel에 도메인 연결', 'DNS 설정', 'SSL 인증서 자동 발급'],
  },
];

export default function DeployGuidePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <Card>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={2}>
                <RocketOutlined /> 배포 가이드
              </Title>
              <Paragraph>
                Next.js 프로젝트를 Vercel에 배포하는 방법을 단계별로 안내합니다.
              </Paragraph>
            </div>

            <Alert
              message="배포 전 체크리스트"
              description={
                <ul style={{ marginBottom: 0 }}>
                  <li>npm run build가 로컬에서 성공하는지 확인</li>
                  <li>환경변수 목록 준비</li>
                  <li>.gitignore에 .env 파일이 포함되어 있는지 확인</li>
                </ul>
              }
              type="info"
              showIcon
            />

            <Collapse accordion>
              {steps.map((step, idx) => (
                <Collapse.Panel
                  key={idx}
                  header={
                    <Space>
                      <Tag color="blue">단계 {idx + 1}</Tag>
                      <span>{step.title}</span>
                    </Space>
                  }
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {step.items.map((item, i) => (
                      <div key={i} style={{ padding: '4px 0' }}>
                        <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                        {item}
                      </div>
                    ))}
                  </Space>
                </Collapse.Panel>
              ))}
            </Collapse>

            <Alert
              message="추가 리소스"
              description={
                <>
                  <a href="https://vercel.com/docs" target="_blank" rel="noopener noreferrer">
                    Vercel 공식 문서
                  </a>
                  {' · '}
                  <a href="https://nextjs.org/docs/deployment" target="_blank" rel="noopener noreferrer">
                    Next.js 배포 가이드
                  </a>
                </>
              }
              type="success"
            />
          </Space>
        </Card>
      </div>
    </div>
  );
}
