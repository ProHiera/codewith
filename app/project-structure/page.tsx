'use client';

import { useState } from 'react';
import { Card, Typography, Space, Row, Col, Tag } from 'antd';
import {
  FolderOutlined,
  FolderOpenOutlined,
  FileOutlined,
  FileTextOutlined,
  SettingOutlined,
  DatabaseOutlined,
  LockOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

interface FileInfo {
  name: string;
  type: 'file' | 'folder';
  icon: 'file' | 'folder' | 'ts' | 'json' | 'md' | 'js' | 'sql' | 'tsx' | 'css' | 'config';
  description: string;
  details: string;
  category: 'frontend' | 'backend' | 'database' | 'config' | 'docs' | 'deployment';
  importance: 'critical' | 'important' | 'optional';
  children?: FileInfo[];
}

const projectStructure: FileInfo[] = [
  {
    name: 'app',
    type: 'folder',
    icon: 'folder',
    description: 'Next.js 앱 라우터 - 모든 페이지와 API 라우트',
    details: 'Next.js 13+의 App Router 방식. 각 폴더가 URL 경로가 되며, page.tsx가 해당 경로의 페이지 컴포넌트입니다.',
    category: 'frontend',
    importance: 'critical',
    children: [
      {
        name: 'page.tsx',
        type: 'file',
        icon: 'tsx',
        description: '메인 홈페이지 (localhost:3000/)',
        details: '프로젝트의 첫 화면. Hero 섹션, Frontend/Backend 도구, DevOps 도구 등을 표시합니다.',
        category: 'frontend',
        importance: 'critical'
      },
      {
        name: 'layout.tsx',
        type: 'file',
        icon: 'tsx',
        description: '전체 레이아웃 및 메타데이터',
        details: '모든 페이지에 공통으로 적용되는 레이아웃. Sidebar, 폰트, Ant Design Provider 등이 포함됩니다.',
        category: 'frontend',
        importance: 'critical'
      },
      {
        name: 'globals.css',
        type: 'file',
        icon: 'css',
        description: '전역 스타일시트',
        details: 'Tailwind CSS 설정과 전역 CSS 스타일이 정의된 파일입니다.',
        category: 'frontend',
        importance: 'important'
      },
      {
        name: 'api/',
        type: 'folder',
        icon: 'folder',
        description: 'API 라우트 폴더',
        details: 'Next.js API Routes. 백엔드 로직, AI API 호출, 데이터베이스 쿼리 등을 처리합니다.',
        category: 'backend',
        importance: 'critical',
        children: [
          {
            name: 'ai/chat/route.ts',
            type: 'file',
            icon: 'ts',
            description: 'AI 채팅 API',
            details: 'OpenAI GPT API를 호출하여 사용자 질문에 답변하는 엔드포인트입니다.',
            category: 'backend',
            importance: 'critical'
          }
        ]
      },
      {
        name: 'missions/',
        type: 'folder',
        icon: 'folder',
        description: 'CSS 스피드런 페이지',
        details: 'CSS 실습 미션을 보여주고 자동 채점하는 페이지입니다.',
        category: 'frontend',
        importance: 'important'
      }
    ]
  },
  {
    name: 'components',
    type: 'folder',
    icon: 'folder',
    description: '재사용 가능한 React 컴포넌트',
    details: '여러 페이지에서 공통으로 사용되는 UI 컴포넌트들입니다. SidebarMenu, AIAssistant, CodeEditor 등이 있습니다.',
    category: 'frontend',
    importance: 'critical',
    children: [
      {
        name: 'SidebarMenu.tsx',
        type: 'file',
        icon: 'tsx',
        description: '사이드바 메뉴 컴포넌트',
        details: '왼쪽 네비게이션 사이드바. 모든 페이지 링크를 표시합니다.',
        category: 'frontend',
        importance: 'important'
      },
      {
        name: 'CodeEditor.tsx',
        type: 'file',
        icon: 'tsx',
        description: '코드 에디터 컴포넌트',
        details: 'Monaco Editor를 사용한 코드 편집기 컴포넌트입니다.',
        category: 'frontend',
        importance: 'important'
      }
    ]
  },
  {
    name: 'database',
    type: 'folder',
    icon: 'folder',
    description: 'SQL 스키마 및 시드 데이터',
    details: 'Supabase PostgreSQL 데이터베이스의 테이블 스키마, 초기 데이터, 마이그레이션 파일입니다.',
    category: 'database',
    importance: 'critical',
    children: [
      {
        name: 'schema.sql',
        type: 'file',
        icon: 'sql',
        description: '데이터베이스 스키마',
        details: 'users, profiles, missions, learning_cards 등 모든 테이블 정의',
        category: 'database',
        importance: 'critical'
      },
      {
        name: 'seed.sql',
        type: 'file',
        icon: 'sql',
        description: '초기 데이터',
        details: '개발/테스트용 샘플 데이터를 데이터베이스에 삽입하는 SQL',
        category: 'database',
        importance: 'optional'
      }
    ]
  },
  {
    name: 'lib',
    type: 'folder',
    icon: 'folder',
    description: '유틸리티 함수 및 라이브러리',
    details: 'Supabase 클라이언트, 카탈로그 데이터, 헬퍼 함수 등이 포함됩니다.',
    category: 'backend',
    importance: 'important',
    children: [
      {
        name: 'supabase/client.ts',
        type: 'file',
        icon: 'ts',
        description: 'Supabase 클라이언트 (클라이언트 컴포넌트용)',
        details: 'Browser에서 사용하는 Supabase 클라이언트 초기화',
        category: 'backend',
        importance: 'critical'
      },
      {
        name: 'supabase/server.ts',
        type: 'file',
        icon: 'ts',
        description: 'Supabase 클라이언트 (서버 컴포넌트용)',
        details: 'Server에서 사용하는 Supabase 클라이언트 초기화',
        category: 'backend',
        importance: 'critical'
      }
    ]
  },
  {
    name: 'types',
    type: 'folder',
    icon: 'folder',
    description: 'TypeScript 타입 정의',
    details: '프로젝트 전체에서 사용하는 타입스크립트 인터페이스와 타입 정의',
    category: 'frontend',
    importance: 'important',
    children: [
      {
        name: 'database.types.ts',
        type: 'file',
        icon: 'ts',
        description: 'Supabase 데이터베이스 타입',
        details: 'Supabase CLI로 자동 생성된 데이터베이스 스키마 타입',
        category: 'backend',
        importance: 'important'
      }
    ]
  },
  {
    name: 'package.json',
    type: 'file',
    icon: 'json',
    description: 'Node.js 프로젝트 설정',
    details: '프로젝트 이름, 버전, 의존성 패키지, 스크립트 명령어(npm run dev, build 등)가 정의됩니다.',
    category: 'config',
    importance: 'critical'
  },
  {
    name: 'next.config.ts',
    type: 'file',
    icon: 'config',
    description: 'Next.js 설정 파일',
    details: 'Next.js 프레임워크 설정. 이미지 최적화, 환경변수, 빌드 옵션 등을 설정합니다.',
    category: 'config',
    importance: 'critical'
  },
  {
    name: 'tsconfig.json',
    type: 'file',
    icon: 'json',
    description: 'TypeScript 컴파일러 설정',
    details: 'TypeScript 컴파일러 옵션. strict 모드, 모듈 시스템, path alias 등을 설정합니다.',
    category: 'config',
    importance: 'important'
  },
  {
    name: '.env.local',
    type: 'file',
    icon: 'config',
    description: '환경변수 파일 (로컬)',
    details: 'API 키, 데이터베이스 URL 등 민감한 정보를 저장. Git에 커밋되지 않습니다.',
    category: 'config',
    importance: 'critical'
  },
  {
    name: 'README.md',
    type: 'file',
    icon: 'md',
    description: '프로젝트 설명서',
    details: '프로젝트 소개, 설치 방법, 사용법, 기여 가이드 등이 작성된 마크다운 문서',
    category: 'docs',
    importance: 'important'
  },
  {
    name: '.gitignore',
    type: 'file',
    icon: 'file',
    description: 'Git 제외 파일 목록',
    details: 'Git에 커밋하지 않을 파일/폴더를 지정. node_modules, .env, .next 등',
    category: 'config',
    importance: 'important'
  }
];

export default function ProjectStructurePage() {
  const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['app', 'components']));

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  const getFileIcon = (icon: string, isOpen = false) => {
    const iconStyle = { fontSize: 16, marginRight: 6 };
    switch (icon) {
      case 'folder':
        return isOpen ? (
          <FolderOpenOutlined style={{ ...iconStyle, color: '#dcb67a' }} />
        ) : (
          <FolderOutlined style={{ ...iconStyle, color: '#dcb67a' }} />
        );
      case 'tsx':
        return <span style={{ ...iconStyle, color: '#1dd3b0', fontWeight: 'bold' }}>TS</span>;
      case 'ts':
        return <span style={{ ...iconStyle, color: '#3b8ac4', fontWeight: 'bold' }}>TS</span>;
      case 'json':
        return <span style={{ ...iconStyle, color: '#f5c84c', fontWeight: 'bold' }}>{ }</span>;
      case 'sql':
        return <DatabaseOutlined style={{ ...iconStyle, color: '#e37933' }} />;
      case 'md':
        return <FileTextOutlined style={{ ...iconStyle, color: '#519aba' }} />;
      case 'css':
        return <span style={{ ...iconStyle, color: '#519aba', fontWeight: 'bold' }}>CSS</span>;
      case 'config':
        return <SettingOutlined style={{ ...iconStyle, color: '#519aba' }} />;
      default:
        return <FileOutlined style={{ ...iconStyle, color: '#858585' }} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'frontend': return 'blue';
      case 'backend': return 'green';
      case 'database': return 'orange';
      case 'config': return 'purple';
      case 'docs': return 'cyan';
      case 'deployment': return 'red';
      default: return 'default';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'red';
      case 'important': return 'orange';
      case 'optional': return 'green';
      default: return 'default';
    }
  };

  const renderFileTree = (items: FileInfo[], depth = 0) => {
    return items.map((item, index) => {
      const isExpanded = expandedFolders.has(item.name);
      const isSelected = selectedFile?.name === item.name;
      
      return (
        <div key={index} style={{ marginLeft: depth * 16 }}>
          <div
            onClick={() => {
              if (item.type === 'folder') {
                toggleFolder(item.name);
              }
              setSelectedFile(item);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '4px 8px',
              cursor: 'pointer',
              backgroundColor: isSelected ? '#37373d' : 'transparent',
              borderRadius: 3,
              marginBottom: 1,
              transition: 'all 0.15s',
              userSelect: 'none'
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.currentTarget.style.backgroundColor = '#2a2d2e';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            {item.type === 'folder' && (
              <span style={{ marginRight: 4, color: '#cccccc', fontSize: 12 }}>
                {isExpanded ? '▼' : '▶'}
              </span>
            )}
            {getFileIcon(item.icon, isExpanded)}
            <span 
              style={{ 
                fontSize: 13, 
                color: '#cccccc',
                fontFamily: 'Consolas, "Courier New", monospace',
                fontWeight: item.type === 'folder' ? 500 : 400
              }}
            >
              {item.name}
            </span>
          </div>
          {item.type === 'folder' && isExpanded && item.children && (
            <div style={{ marginTop: 0 }}>
              {renderFileTree(item.children, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card>
        <Title level={1}>
          <FolderOutlined /> 프로젝트 구조 이해하기
        </Title>
        <Paragraph>
          실제 VS Code처럼 파일 트리를 탐색하고, 각 파일/폴더의 역할을 배워보세요!
        </Paragraph>
        <Space>
          <Tag icon={<InfoCircleOutlined />} color="blue">클릭하면 설명이 나옵니다</Tag>
          <Tag icon={<CheckCircleOutlined />} color="success">실전 프로젝트 구조</Tag>
        </Space>
      </Card>

      <Row gutter={[24, 24]}>
        {/* File Tree */}
        <Col xs={24} lg={10}>
          <Card 
            title={
              <Space>
                <FolderOpenOutlined style={{ color: '#dcb67a' }} />
                <Text strong style={{ color: '#cccccc' }}>프로젝트 파일 트리</Text>
              </Space>
            }
            style={{ 
              height: '100%',
              backgroundColor: '#252526'
            }}
            headStyle={{
              backgroundColor: '#2d2d30',
              color: '#cccccc',
              borderBottom: '1px solid #1e1e1e'
            }}
            bodyStyle={{
              backgroundColor: '#252526',
              padding: 0
            }}
          >
            <div style={{ 
              backgroundColor: '#1e1e1e', 
              padding: '12px 8px', 
              borderRadius: 6,
              minHeight: 600,
              maxHeight: 800,
              overflowY: 'auto',
              border: '1px solid #333'
            }}>
              <div>
                {renderFileTree(projectStructure)}
              </div>
            </div>
          </Card>
        </Col>

        {/* File Details */}
        <Col xs={24} lg={14}>
          <Card 
            title={
              <Space>
                {selectedFile ? getFileIcon(selectedFile.icon) : <InfoCircleOutlined />}
                <Text strong>{selectedFile ? selectedFile.name : '파일을 선택하세요'}</Text>
              </Space>
            }
            style={{ height: '100%' }}
          >
            {selectedFile ? (
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <Space size="small">
                    <Tag color={getCategoryColor(selectedFile.category)}>
                      {selectedFile.category}
                    </Tag>
                    <Tag color={getImportanceColor(selectedFile.importance)}>
                      {selectedFile.importance === 'critical' ? '🔥 필수' : 
                       selectedFile.importance === 'important' ? '⚡ 중요' : '✅ 선택'}
                    </Tag>
                    <Tag icon={selectedFile.type === 'folder' ? <FolderOutlined /> : <FileOutlined />}>
                      {selectedFile.type}
                    </Tag>
                  </Space>
                </div>

                <div>
                  <Title level={4}>📝 간단 설명</Title>
                  <Paragraph style={{ fontSize: 16 }}>
                    {selectedFile.description}
                  </Paragraph>
                </div>

                <div>
                  <Title level={4}>📚 상세 설명</Title>
                  <Paragraph style={{ fontSize: 15, lineHeight: 1.8 }}>
                    {selectedFile.details}
                  </Paragraph>
                </div>

                {selectedFile.children && selectedFile.children.length > 0 && (
                  <div>
                    <Title level={4}>📂 하위 파일 ({selectedFile.children.length}개)</Title>
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      {selectedFile.children.map((child, idx) => (
                        <Card 
                          key={idx}
                          size="small"
                          hoverable
                          onClick={() => setSelectedFile(child)}
                          style={{ cursor: 'pointer' }}
                        >
                          <Space>
                            {getFileIcon(child.icon)}
                            <Text strong>{child.name}</Text>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              - {child.description}
                            </Text>
                          </Space>
                        </Card>
                      ))}
                    </Space>
                  </div>
                )}

                <div>
                  <Title level={4}>💡 학습 팁</Title>
                  <Card style={{ backgroundColor: '#f0f7ff' }}>
                    {selectedFile.importance === 'critical' && (
                      <Paragraph>
                        <LockOutlined /> <Text strong>필수 파일</Text>: 이 파일이 없으면 프로젝트가 작동하지 않습니다. 
                        반드시 이해하고 넘어가세요!
                      </Paragraph>
                    )}
                    {selectedFile.importance === 'important' && (
                      <Paragraph>
                        <CheckCircleOutlined /> <Text strong>중요 파일</Text>: 프로젝트의 핵심 기능을 담당합니다. 
                        시간을 들여 학습하면 큰 도움이 됩니다.
                      </Paragraph>
                    )}
                    {selectedFile.importance === 'optional' && (
                      <Paragraph>
                        <InfoCircleOutlined /> <Text strong>선택 파일</Text>: 있으면 좋지만 없어도 기본 기능은 작동합니다. 
                        여유가 있을 때 학습하세요.
                      </Paragraph>
                    )}
                  </Card>
                </div>
              </Space>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <FolderOutlined style={{ fontSize: 64, color: '#d9d9d9', marginBottom: 16 }} />
                <Title level={4} type="secondary">왼쪽에서 파일이나 폴더를 클릭해보세요!</Title>
                <Paragraph type="secondary">
                  각 파일의 역할과 중요도를 배울 수 있습니다.
                </Paragraph>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* Quick Guide */}
      <Card title="🎯 빠른 가이드">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card size="small" style={{ backgroundColor: '#fff1f0' }}>
              <Space direction="vertical">
                <Text strong>🔥 필수 파일</Text>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  package.json, next.config.ts, app/page.tsx 등
                </Text>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ backgroundColor: '#fff7e6' }}>
              <Space direction="vertical">
                <Text strong>⚡ 중요 파일</Text>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  components/, lib/, types/ 등
                </Text>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ backgroundColor: '#f6ffed' }}>
              <Space direction="vertical">
                <Text strong>✅ 선택 파일</Text>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  seed.sql, README.md 등
                </Text>
              </Space>
            </Card>
          </Col>
        </Row>
      </Card>
    </Space>
  );
}
