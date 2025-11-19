'use client';

import { Card, Typography, Space, Checkbox, Alert, Tag } from 'antd';
import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const checks = [
  { category: 'Semantic HTML', items: ['헤딩 계층 구조', '의미있는 HTML 태그 사용', 'form 레이블 연결'] },
  { category: 'Keyboard Navigation', items: ['Tab 키 네비게이션', 'Enter/Space 키 동작', 'Focus 표시'] },
  { category: 'Color Contrast', items: ['텍스트 대비율 4.5:1 이상', '버튼/링크 식별 가능', '색상만으로 정보 전달 안함'] },
  { category: 'Screen Reader', items: ['alt 텍스트', 'aria-label', 'aria-describedby'] },
];

export default function AccessibilityCheckerPage() {
  return (
    <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card>
          <Title level={2}>
            <CheckCircleOutlined /> 접근성 체크리스트
          </Title>
          <Paragraph>
            웹 접근성 표준(WCAG)을 준수하기 위한 체크리스트입니다.
          </Paragraph>
        </Card>

        <Alert
          message="웹 접근성이란?"
          description="장애인, 고령자 등 모든 사용자가 웹사이트를 이용할 수 있도록 보장하는 것입니다."
          type="info"
          showIcon
          icon={<WarningOutlined />}
        />

        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {checks.map((check, idx) => (
            <Card key={idx} title={<Tag color="purple">{check.category}</Tag>} size="small">
              <Checkbox.Group style={{ width: '100%' }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  {check.items.map((item, i) => (
                    <Checkbox key={i} value={item}>
                      {item}
                    </Checkbox>
                  ))}
                </Space>
              </Checkbox.Group>
            </Card>
          ))}
        </Space>

        <Alert
          message="추천 도구"
          description={
            <>
              <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer">
                WCAG 2.1 Quick Reference
              </a>
              {' · '}
              <a href="https://wave.webaim.org/" target="_blank" rel="noopener noreferrer">
                WAVE Accessibility Tool
              </a>
            </>
          }
          type="success"
        />
      </Space>
    </div>
  );
}
