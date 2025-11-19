'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CATALOG, DOMAINS, LANGS, type Domain } from '@/lib/catalog';
import { Card, Row, Col, Tag, Space, Typography, Button } from 'antd';
import { 
  CodeOutlined,
  DatabaseOutlined,
  CloudOutlined,
  ToolOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const domain = (searchParams.get('domain') as Domain | null) || undefined;
  const lang = searchParams.get('lang') || undefined;

  const items = CATALOG.filter(item => {
    const okDomain = domain ? item.domain === domain : true;
    const okLang = lang ? item.langs.includes(lang) : true;
    return okDomain && okLang;
  });

  const domainLabel = domain ? DOMAINS.find(d => d.key === domain)?.label : undefined;
  const langLabel = lang ? LANGS.find(l => l.key === lang)?.label : undefined;

  const getDomainIcon = (d: string) => {
    switch (d) {
      case 'frontend': return <CodeOutlined />;
      case 'backend': return <DatabaseOutlined />;
      case 'data': return <DatabaseOutlined />;
      case 'devops': return <CloudOutlined />;
      default: return <ToolOutlined />;
    }
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card>
        <Title level={1}>카탈로그</Title>
        <Text type="secondary" style={{ fontSize: 16 }}>
          {domainLabel ? `${domainLabel}` : '전체'}
          {langLabel ? ` · ${langLabel}` : ''} 보기
        </Text>
      </Card>

      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {(domain || lang) && (
            <Space wrap>
              {domain && (
                <Link href="/catalog">
                  <Tag closable color="blue">{domainLabel}</Tag>
                </Link>
              )}
              {lang && (
                <Link href={`/catalog${domain ? `?domain=${domain}` : ''}`}>
                  <Tag closable color="purple">{langLabel}</Tag>
                </Link>
              )}
            </Space>
          )}

          <Card title="도메인">
            <Space wrap>
              <Link href="/catalog">
                <Button type={!domain ? 'primary' : 'default'}>
                  전체
                </Button>
              </Link>
              {DOMAINS.map(d => (
                <Link key={d.key} href={`/catalog?domain=${d.key}${lang ? `&lang=${lang}` : ''}`}>
                  <Button
                    type={domain === d.key ? 'primary' : 'default'}
                    icon={getDomainIcon(d.key)}
                  >
                    {d.label}
                  </Button>
                </Link>
              ))}
            </Space>
          </Card>

          <Card title="기술 스택">
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Text strong style={{ marginBottom: 8, display: 'block' }}>Frontend</Text>
                <Space wrap size="small">
                  <Link href={`/catalog?${domain ? `domain=${domain}&` : ''}lang=html`}>
                    <Image 
                      src="https://skillicons.dev/icons?i=html" 
                      alt="HTML" 
                      width={40}
                      height={40}
                      style={{ 
                        cursor: 'pointer',
                        border: lang === 'html' ? '3px solid #722ed1' : 'none',
                        borderRadius: 8
                      }} 
                    />
                  </Link>
                  <Link href={`/catalog?${domain ? `domain=${domain}&` : ''}lang=css`}>
                    <Image 
                      src="https://skillicons.dev/icons?i=css" 
                      alt="CSS" 
                      width={40}
                      height={40}
                      style={{ 
                        cursor: 'pointer',
                        border: lang === 'css' ? '3px solid #722ed1' : 'none',
                        borderRadius: 8
                      }} 
                    />
                  </Link>
                  <Link href={`/catalog?${domain ? `domain=${domain}&` : ''}lang=js`}>
                    <Image 
                      src="https://skillicons.dev/icons?i=js" 
                      alt="JavaScript" 
                      width={40}
                      height={40}
                      style={{ 
                        cursor: 'pointer',
                        border: lang === 'js' ? '3px solid #722ed1' : 'none',
                        borderRadius: 8
                      }} 
                    />
                  </Link>
                  <Link href={`/catalog?${domain ? `domain=${domain}&` : ''}lang=ts`}>
                    <Image 
                      src="https://skillicons.dev/icons?i=ts" 
                      alt="TypeScript" 
                      width={40}
                      height={40}
                      style={{ 
                        cursor: 'pointer',
                        border: lang === 'ts' ? '3px solid #722ed1' : 'none',
                        borderRadius: 8
                      }} 
                    />
                  </Link>
                  <Link href={`/catalog?${domain ? `domain=${domain}&` : ''}lang=react`}>
                    <Image 
                      src="https://skillicons.dev/icons?i=react" 
                      alt="React" 
                      width={40}
                      height={40}
                      style={{ 
                        cursor: 'pointer',
                        border: lang === 'react' ? '3px solid #722ed1' : 'none',
                        borderRadius: 8
                      }} 
                    />
                  </Link>
                  <Link href={`/catalog?${domain ? `domain=${domain}&` : ''}lang=vue`}>
                    <Image 
                      src="https://skillicons.dev/icons?i=vue" 
                      alt="Vue" 
                      width={40}
                      height={40}
                      style={{ 
                        cursor: 'pointer',
                        border: lang === 'vue' ? '3px solid #722ed1' : 'none',
                        borderRadius: 8
                      }} 
                    />
                  </Link>
                </Space>
              </div>
              <div>
                <Text strong style={{ marginBottom: 8, display: 'block' }}>Backend</Text>
                <Space wrap size="small">
                  <Link href={`/catalog?${domain ? `domain=${domain}&` : ''}lang=node`}>
                    <Image 
                      src="https://skillicons.dev/icons?i=nodejs" 
                      alt="Node.js" 
                      width={40}
                      height={40}
                      style={{ 
                        cursor: 'pointer',
                        border: lang === 'node' ? '3px solid #722ed1' : 'none',
                        borderRadius: 8
                      }} 
                    />
                  </Link>
                  <Link href={`/catalog?${domain ? `domain=${domain}&` : ''}lang=python`}>
                    <Image 
                      src="https://skillicons.dev/icons?i=python" 
                      alt="Python" 
                      width={40}
                      height={40}
                      style={{ 
                        cursor: 'pointer',
                        border: lang === 'python' ? '3px solid #722ed1' : 'none',
                        borderRadius: 8
                      }} 
                    />
                  </Link>
                  <Link href={`/catalog?${domain ? `domain=${domain}&` : ''}lang=java`}>
                    <Image 
                      src="https://skillicons.dev/icons?i=java" 
                      alt="Java" 
                      width={40}
                      height={40}
                      style={{ 
                        cursor: 'pointer',
                        border: lang === 'java' ? '3px solid #722ed1' : 'none',
                        borderRadius: 8
                      }} 
                    />
                  </Link>
                  <Link href={`/catalog?${domain ? `domain=${domain}&` : ''}lang=spring`}>
                    <Image 
                      src="https://skillicons.dev/icons?i=spring" 
                      alt="Spring Boot" 
                      width={40}
                      height={40}
                      style={{ 
                        cursor: 'pointer',
                        border: lang === 'spring' ? '3px solid #722ed1' : 'none',
                        borderRadius: 8
                      }} 
                    />
                  </Link>
                </Space>
              </div>
              <div>
                <Text strong style={{ marginBottom: 8, display: 'block' }}>Database & DevOps</Text>
                <Space wrap size="small">
                  <Link href={`/catalog?${domain ? `domain=${domain}&` : ''}lang=sql`}>
                    <Image 
                      src="https://skillicons.dev/icons?i=mysql" 
                      alt="SQL" 
                      width={40}
                      height={40}
                      style={{ 
                        cursor: 'pointer',
                        border: lang === 'sql' ? '3px solid #722ed1' : 'none',
                        borderRadius: 8
                      }} 
                    />
                  </Link>
                  <Link href={`/catalog?${domain ? `domain=${domain}&` : ''}lang=prisma`}>
                    <Image 
                      src="https://skillicons.dev/icons?i=prisma" 
                      alt="Prisma" 
                      width={40}
                      height={40}
                      style={{ 
                        cursor: 'pointer',
                        border: lang === 'prisma' ? '3px solid #722ed1' : 'none',
                        borderRadius: 8
                      }} 
                    />
                  </Link>
                  <Link href={`/catalog?${domain ? `domain=${domain}&` : ''}lang=git`}>
                    <Image 
                      src="https://skillicons.dev/icons?i=git" 
                      alt="Git" 
                      width={40}
                      height={40}
                      style={{ 
                        cursor: 'pointer',
                        border: lang === 'git' ? '3px solid #722ed1' : 'none',
                        borderRadius: 8
                      }} 
                    />
                  </Link>
                  <Link href={`/catalog?${domain ? `domain=${domain}&` : ''}lang=docker`}>
                    <Image 
                      src="https://skillicons.dev/icons?i=docker" 
                      alt="Docker" 
                      width={40}
                      height={40}
                      style={{ 
                        cursor: 'pointer',
                        border: lang === 'docker' ? '3px solid #722ed1' : 'none',
                        borderRadius: 8
                      }} 
                    />
                  </Link>
                  <Link href={`/catalog?${domain ? `domain=${domain}&` : ''}lang=k8s`}>
                    <Image 
                      src="https://skillicons.dev/icons?i=kubernetes" 
                      alt="Kubernetes" 
                      width={40}
                      height={40}
                      style={{ 
                        cursor: 'pointer',
                        border: lang === 'k8s' ? '3px solid #722ed1' : 'none',
                        borderRadius: 8
                      }} 
                    />
                  </Link>
                </Space>
              </div>
            </Space>
          </Card>

          <Row gutter={[16, 16]}>
            {items.map(item => (
              <Col xs={24} md={12} lg={8} key={item.id}>
                <Link href={item.path}>
                  <Card hoverable style={{ height: '100%' }}>
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      <div style={{ fontSize: 48, textAlign: 'center' }}>
                        {item.icon}
                      </div>
                      <Title level={4} style={{ textAlign: 'center', margin: '8px 0' }}>
                        {item.title}
                      </Title>
                      <Text type="secondary" style={{ textAlign: 'center', marginBottom: 12, display: 'block' }}>
                        {item.description}
                      </Text>
                      <Space wrap style={{ justifyContent: 'center', width: '100%' }}>
                        {item.langs.map(l => (
                          <Tag key={l} color="blue">{l}</Tag>
                        ))}
                      </Space>
                    </Space>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>

          {items.length === 0 && (
            <Card>
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <Text type="secondary">선택한 필터에 맞는 항목이 없습니다.</Text>
              </div>
            </Card>
          )}
        </Space>
      </Card>
    </Space>
  );
}

