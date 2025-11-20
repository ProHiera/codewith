'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Card, Typography, Row, Col, Button, Space, Input, Select, Table,
  Tabs, Alert, Progress, Badge, Divider,
  Modal, Tooltip, Popover, Drawer, Steps, Rate, Tag
} from 'antd';
import {
  BulbOutlined, CodeOutlined, ExperimentOutlined, BookOutlined,
  SettingOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

export default function UIGuidePage() {
  const [activeTab, setActiveTab] = useState('0');
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // UI 라이브러리 데이터
  const uiLibraries = [
    {
      name: 'Ant Design',
      creator: 'Ant Financial',
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      color: '#1890ff',
      recommended: true,
      description: '중국 최대 금융사에서 만든 엔터프라이즈급 컴포넌트 라이브러리',
      pros: [
        '풍부한 컴포넌트 생태계',
        'TypeScript 완벽 지원',
        '중국어/영어 다국어 지원',
        '기업용으로 검증됨'
      ],
      cons: [
        '무거운 번들 사이즈',
        '중국어 우선 정책',
        '커스터마이징 제한적'
      ],
      useCases: ['기업 애플리케이션', '관리자 패널', '대규모 프로젝트'],
      installCommand: 'npm install antd'
    },
    {
      name: 'MUI (Material-UI)',
      creator: 'Google',
      icon: 'https://mui.com/static/logo.png',
      color: '#007acc',
      recommended: true,
      description: 'Google의 Material Design을 구현한 React 컴포넌트 라이브러리',
      pros: [
        'Material Design 표준 준수',
        '모바일 친화적',
        '커스터마이징 자유도 높음',
        '광범위한 커뮤니티'
      ],
      cons: [
        '러닝커브 높음',
        '과도한 추상화',
        '스타일링 복잡도'
      ],
      useCases: ['모바일 앱', '웹 애플리케이션', '크로스 플랫폼'],
      installCommand: 'npm install @mui/material @emotion/react @emotion/styled'
    },
    {
      name: 'Shadcn/ui',
      creator: 'shadcn',
      icon: 'https://ui.shadcn.com/favicon.ico',
      color: '#000000',
      recommended: true,
      description: 'Radix UI와 Tailwind CSS를 기반으로 한 모던 컴포넌트 라이브러리',
      pros: [
        '가벼운 번들 사이즈',
        '완전한 커스터마이징',
        '접근성 우수',
        '최신 디자인 트렌드'
      ],
      cons: [
        '상대적으로 새로운 라이브러리',
        '기본 컴포넌트 수가 적음',
        '초기 설정 복잡'
      ],
      useCases: ['스타트업', '개인 프로젝트', '디자인 감도 높은 프로젝트'],
      installCommand: 'npx shadcn-ui@latest init'
    },
    {
      name: 'Chakra UI',
      creator: 'Segun Adebayo',
      icon: 'https://chakra-ui.com/favicon.ico',
      color: '#319795',
      recommended: false,
      description: '접근성과 모던 디자인을 중시하는 컴포넌트 라이브러리',
      pros: [
        '접근성 우선',
        '직관적인 API',
        '다크모드 지원',
        '작은 번들 사이즈'
      ],
      cons: [
        '커뮤니티 규모 작음',
        '컴포넌트 수가 제한적',
        '기업 지원 부족'
      ],
      useCases: ['접근성 중요 프로젝트', '소규모 팀', '개인 프로젝트'],
      installCommand: 'npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion'
    },
    {
      name: 'React Bootstrap',
      creator: 'Bootstrap Team',
      icon: 'https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png',
      color: '#7952b3',
      recommended: false,
      description: 'Bootstrap 프레임워크를 React 컴포넌트로 포팅한 라이브러리',
      pros: [
        'Bootstrap 생태계 활용',
        '익숙한 그리드 시스템',
        '광범위한 브라우저 지원',
        '안정적인 유지보수'
      ],
      cons: [
        '오래된 디자인',
        '커스터마이징 어려움',
        '무거운 스타일링'
      ],
      useCases: ['빠른 프로토타이핑', '기존 Bootstrap 프로젝트', '관리자 페이지'],
      installCommand: 'npm install react-bootstrap bootstrap'
    },
    {
      name: 'Semantic UI React',
      creator: 'Semantic Org',
      icon: 'https://react.semantic-ui.com/logo.png',
      color: '#35bdb4',
      recommended: false,
      description: '의미론적 HTML을 지향하는 직관적인 컴포넌트 라이브러리',
      pros: [
        '직관적인 클래스명',
        '쉬운 커스터마이징',
        '의미론적 마크업',
        'jQuery 독립적'
      ],
      cons: [
        '유지보수 중단 우려',
        '커뮤니티 규모 작음',
        '모던 트렌드 미흡'
      ],
      useCases: ['의미론적 마크업 중요', '기존 Semantic UI 프로젝트', '학습용'],
      installCommand: 'npm install semantic-ui-react semantic-ui-css'
    }
  ];

  // 샘플 데이터들
  const componentExamples = [
    {
      title: 'Button 컴포넌트',
      description: '가장 기본적인 인터랙션 요소',
      code: `<Button type="primary">Primary Button</Button>
<Button type="default">Default Button</Button>
<Button type="dashed">Dashed Button</Button>
<Button type="text">Text Button</Button>
<Button type="link">Link Button</Button>`,
      demo: (
        <Space>
          <Button type="primary">Primary</Button>
          <Button type="default">Default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="text">Text</Button>
          <Button type="link">Link</Button>
        </Space>
      )
    },
    {
      title: 'Input 컴포넌트',
      description: '사용자 입력을 받는 폼 요소',
      code: `<Input placeholder="기본 입력" />
<Input.Search placeholder="검색 입력" />
<TextArea placeholder="여러 줄 입력" rows={4} />`,
      demo: (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input placeholder="기본 입력" />
          <Input.Search placeholder="검색 입력" />
          <TextArea placeholder="여러 줄 입력" rows={3} />
        </Space>
      )
    },
    {
      title: 'Select 컴포넌트',
      description: '드롭다운 선택 요소',
      code: `<Select placeholder="선택하세요" style={{ width: 200 }}>
  <Option value="option1">옵션 1</Option>
  <Option value="option2">옵션 2</Option>
  <Option value="option3">옵션 3</Option>
</Select>`,
      demo: (
        <Select placeholder="선택하세요" style={{ width: 200 }}>
          <Option value="option1">옵션 1</Option>
          <Option value="option2">옵션 2</Option>
          <Option value="option3">옵션 3</Option>
        </Select>
      )
    }
  ];

  const reusableComponents = [
    {
      title: 'CustomCard 컴포넌트',
      description: '재사용 가능한 카드 컴포넌트 만들기',
      code: `const CustomCard = ({ title, children, variant = 'default' }) => {
  const variants = {
    default: { borderColor: '#d9d9d9' },
    primary: { borderColor: '#1890ff' },
    success: { borderColor: '#52c41a' }
  };

  return (
    <Card
      title={title}
      style={{
        borderLeft: \`4px solid \${variants[variant].borderColor}\`,
        marginBottom: 16
      }}
    >
      {children}
    </Card>
  );
};

// 사용법
<CustomCard title="기본 카드">내용</CustomCard>
<CustomCard title="프라이머리 카드" variant="primary">내용</CustomCard>`,
      demo: (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Card title="기본 카드" style={{ borderLeft: '4px solid #d9d9d9' }}>
            <p>기본 스타일의 재사용 카드</p>
          </Card>
          <Card title="프라이머리 카드" style={{ borderLeft: '4px solid #1890ff' }}>
            <p>프라이머리 스타일의 재사용 카드</p>
          </Card>
        </Space>
      )
    },
    {
      title: 'StatusBadge 컴포넌트',
      description: '상태 표시를 위한 재사용 배지',
      code: `const StatusBadge = ({ status, text }) => {
  const statusConfig = {
    success: { color: 'success', icon: <CheckCircleOutlined /> },
    warning: { color: 'warning', icon: <WarningOutlined /> },
    error: { color: 'error', icon: <WarningOutlined /> },
    info: { color: 'processing', icon: <InfoCircleOutlined /> }
  };

  const config = statusConfig[status] || statusConfig.info;

  return (
    <Badge status={config.color} text={text} />
  );
};

// 사용법
<StatusBadge status="success" text="완료됨" />
<StatusBadge status="warning" text="주의 필요" />
<StatusBadge status="error" text="오류 발생" />`,
      demo: (
        <Space>
          <Badge status="success" text="완료됨" />
          <Badge status="warning" text="주의 필요" />
          <Badge status="error" text="오류 발생" />
          <Badge status="processing" text="진행 중" />
        </Space>
      )
    }
  ];

  const tableColumns = [
    {
      title: '컴포넌트',
      dataIndex: 'component',
      key: 'component',
    },
    {
      title: '용도',
      dataIndex: 'purpose',
      key: 'purpose',
    },
    {
      title: '중요도',
      dataIndex: 'importance',
      key: 'importance',
      render: (importance: number) => (
        <Rate disabled defaultValue={importance} />
      ),
    },
  ];

  const tableData = [
    {
      key: '1',
      component: 'Button',
      purpose: '사용자 액션 트리거',
      importance: 5,
    },
    {
      key: '2',
      component: 'Input',
      purpose: '데이터 입력',
      importance: 5,
    },
    {
      key: '3',
      component: 'Card',
      purpose: '콘텐츠 그룹화',
      importance: 4,
    },
    {
      key: '4',
      component: 'Table',
      purpose: '데이터 표시',
      importance: 4,
    },
    {
      key: '5',
      component: 'Modal',
      purpose: '중요 정보 표시',
      importance: 3,
    },
  ];

  // 탭 콘텐츠들
  const tabItems = [
    {
      key: '0',
      label: <span><BulbOutlined />라이브러리 추천</span>,
      children: (
        <>
          <Row gutter={[24, 24]}>
            {uiLibraries.map((library, index) => (
              <Col xs={24} lg={8} key={index}>
                <Card
                  title={
                    <Space>
                      <Image
                        src={library.icon}
                        alt={`${library.name} logo`}
                        width={32}
                        height={32}
                        style={{
                          objectFit: 'contain'
                        }}
                      />
                      <div>
                        <Title level={4} style={{ margin: 0 }}>{library.name}</Title>
                        <Text type="secondary">{library.creator}</Text>
                      </div>
                    </Space>
                  }
                  extra={
                    <Tag color={library.recommended ? 'success' : 'default'}>
                      {library.recommended ? '추천' : '보통'}
                    </Tag>
                  }
                >
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <Text strong>{library.description}</Text>

                    <div>
                      <Text strong style={{ color: '#52c41a' }}>장점:</Text>
                      <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
                        {library.pros.map((pro, i) => (
                          <li key={i} style={{ marginBottom: 4 }}>
                            <Text type="success">✓</Text> {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <Text strong style={{ color: '#ff4d4f' }}>단점:</Text>
                      <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
                        {library.cons.map((con, i) => (
                          <li key={i} style={{ marginBottom: 4 }}>
                            <Text type="danger">✗</Text> {con}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <Text strong>추천 사용처:</Text>
                      <div style={{ marginTop: 8 }}>
                        {library.useCases.map((useCase, i) => (
                          <Tag key={i} color="blue" style={{ marginBottom: 4 }}>
                            {useCase}
                          </Tag>
                        ))}
                      </div>
                    </div>

                    <div style={{
                      background: '#f6f8fa',
                      padding: 12,
                      borderRadius: 6,
                      marginTop: 16
                    }}>
                      <Text strong>설치 명령어:</Text>
                      <div style={{
                        fontFamily: 'monospace',
                        fontSize: 12,
                        marginTop: 4,
                        background: '#fff',
                        padding: 8,
                        borderRadius: 4,
                        border: '1px solid #d9d9d9'
                      }}>
                        {library.installCommand}
                      </div>
                    </div>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>

          <Divider />

          <Card title="프로젝트별 추천 가이드" style={{ marginTop: 24 }}>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <Card title="🚀 빠른 프로토타이핑" type="inner">
                  <Text>빠른 개발과 프로토타이핑이 필요한 경우</Text>
                  <div style={{ marginTop: 12 }}>
                    <Tag color="success">Ant Design</Tag>
                    <Tag color="processing">MUI</Tag>
                  </div>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card title="🎨 커스텀 디자인" type="inner">
                  <Text>브랜드 가이드라인이 엄격한 경우</Text>
                  <div style={{ marginTop: 12 }}>
                    <Tag color="success">Shadcn/ui</Tag>
                    <Tag color="processing">Tailwind + 컴포넌트</Tag>
                  </div>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card title="📱 모바일 우선" type="inner">
                  <Text>모바일 앱이나 반응형 디자인이 중요한 경우</Text>
                  <div style={{ marginTop: 12 }}>
                    <Tag color="success">MUI</Tag>
                    <Tag color="processing">Ant Design</Tag>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>
        </>
      )
    },
    {
      key: '1',
      label: <span><BookOutlined />기초 컴포넌트</span>,
      children: (
        <Row gutter={[24, 24]}>
          {componentExamples.map((example, index) => (
            <Col xs={24} lg={12} key={index}>
              <Card
                title={<Space><CodeOutlined />{example.title}</Space>}
                extra={<Text type="secondary">{example.description}</Text>}
              >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div style={{
                    background: '#f6f8fa',
                    padding: 16,
                    borderRadius: 6,
                    fontFamily: 'monospace',
                    fontSize: 12,
                    whiteSpace: 'pre-wrap',
                    overflowX: 'auto'
                  }}>
                    {example.code}
                  </div>
                  <Divider>실행 결과</Divider>
                  {example.demo}
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      )
    },
    {
      key: '2',
      label: <span><ExperimentOutlined />고급 컴포넌트</span>,
      children: (
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card title="진행 상태 컴포넌트">
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <Text strong>Progress Bar</Text>
                  <Progress percent={75} status="active" />
                </div>
                <div>
                  <Text strong>Steps</Text>
                  <Steps current={1} size="small">
                    <Step title="설계" />
                    <Step title="개발" />
                    <Step title="테스트" />
                    <Step title="배포" />
                  </Steps>
                </div>
              </Space>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="데이터 표시 컴포넌트">
              <Table
                columns={tableColumns}
                dataSource={tableData}
                pagination={false}
                size="small"
              />
            </Card>
          </Col>
        </Row>
      )
    },
    {
      key: '3',
      label: <span><BulbOutlined />재사용 패턴</span>,
      children: (
        <>
          <Alert
            message="중복 코드 피하기"
            description="자주 사용하는 UI 패턴을 컴포넌트로 만들어 재사용하세요. 이는 코드 유지보수성과 일관성을 높여줍니다."
            type="info"
            showIcon
            style={{ marginBottom: 24 }}
          />

          <Row gutter={[24, 24]}>
            {reusableComponents.map((component, index) => (
              <Col xs={24} key={index}>
                <Card
                  title={<Space><SettingOutlined />{component.title}</Space>}
                  extra={<Text type="secondary">{component.description}</Text>}
                >
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div style={{
                      background: '#f6f8fa',
                      padding: 16,
                      borderRadius: 6,
                      fontFamily: 'monospace',
                      fontSize: 12,
                      whiteSpace: 'pre-wrap',
                      overflowX: 'auto'
                    }}>
                      {component.code}
                    </div>
                    <Divider>실행 결과</Divider>
                    {component.demo}
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )
    },
    {
      key: '4',
      label: <span><ExperimentOutlined />인터랙티브 데모</span>,
      children: (
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card title="모달과 드로어">
              <Space>
                <Button type="primary" onClick={() => setModalVisible(true)}>
                  모달 열기
                </Button>
                <Button onClick={() => setDrawerVisible(true)}>
                  드로어 열기
                </Button>
              </Space>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="툴팁과 팝오버">
              <Space>
                <Tooltip title="이것은 툴팁입니다!">
                  <Button>툴팁</Button>
                </Tooltip>
                <Popover content={<div>팝오버 내용입니다.</div>} title="팝오버 제목">
                  <Button>팝오버</Button>
                </Popover>
              </Space>
            </Card>
          </Col>
        </Row>
      )
    }
  ];

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 헤더 */}
        <Card>
          <Space align="center">
            <BulbOutlined style={{ fontSize: 32, color: '#1890ff' }} />
            <div>
              <Title level={2} style={{ margin: 0 }}>UI 컴포넌트 가이드</Title>
              <Text type="secondary">Ant Design 컴포넌트 사용법과 재사용 패턴 학습</Text>
            </div>
          </Space>
        </Card>

        {/* 메인 콘텐츠 */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
        />

        {/* 모달 */}
        <Modal
          title="샘플 모달"
          open={modalVisible}
          onOk={() => setModalVisible(false)}
          onCancel={() => setModalVisible(false)}
        >
          <p>이것은 모달 창의 내용입니다.</p>
          <p>사용자에게 중요한 정보를 표시할 때 사용합니다.</p>
        </Modal>

        {/* 드로어 */}
        <Drawer
          title="샘플 드로어"
          placement="right"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
        >
          <p>이것은 드로어의 내용입니다.</p>
          <p>추가 정보를 표시하거나 폼을 입력할 때 유용합니다.</p>
        </Drawer>
      </Space>
    </div>
  );
}