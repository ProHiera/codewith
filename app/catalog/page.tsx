import Link from 'next/link';
import { CATALOG, DOMAINS, LANGS, type Domain } from '@/lib/catalog';
import { Card, Row, Col, Tag, Space, Typography, Button } from 'antd';
import { 
  CodeOutlined,
  DatabaseOutlined,
  CloudOutlined,
  ToolOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CatalogPage({ searchParams }: Props) {
  const params = await searchParams;
  const domain = (params?.domain as Domain | undefined) || undefined;
  const lang = (params?.lang as string | undefined) || undefined;

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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #e6f7ff 0%, #fff 100%)', padding: '24px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={1}>카탈로그</Title>
            <Text type="secondary" style={{ fontSize: 16 }}>
              {domainLabel ? `${domainLabel}` : '전체'}
              {langLabel ? ` · ${langLabel}` : ''} 보기
            </Text>
          </div>

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
                <Space wrap>
                  {LANGS.filter(l => l.category === 'frontend').map(l => (
                    <Link key={l.key} href={`/catalog?${domain ? `domain=${domain}&` : ''}lang=${l.key}`}>
                      <Tag color={lang === l.key ? 'purple' : 'default'} style={{ cursor: 'pointer' }}>
                        {l.label}
                      </Tag>
                    </Link>
                  ))}
                </Space>
              </div>
              <div>
                <Text strong style={{ marginBottom: 8, display: 'block' }}>Backend</Text>
                <Space wrap>
                  {LANGS.filter(l => l.category === 'backend').map(l => (
                    <Link key={l.key} href={`/catalog?${domain ? `domain=${domain}&` : ''}lang=${l.key}`}>
                      <Tag color={lang === l.key ? 'purple' : 'default'} style={{ cursor: 'pointer' }}>
                        {l.label}
                      </Tag>
                    </Link>
                  ))}
                </Space>
              </div>
              <div>
                <Text strong style={{ marginBottom: 8, display: 'block' }}>DevOps</Text>
                <Space wrap>
                  {LANGS.filter(l => l.category === 'devops').map(l => (
                    <Link key={l.key} href={`/catalog?${domain ? `domain=${domain}&` : ''}lang=${l.key}`}>
                      <Tag color={lang === l.key ? 'purple' : 'default'} style={{ cursor: 'pointer' }}>
                        {l.label}
                      </Tag>
                    </Link>
                  ))}
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
                      <Paragraph type="secondary" style={{ textAlign: 'center', marginBottom: 12 }}>
                        {item.description}
                      </Paragraph>
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
      </div>
    </div>
  );
}
