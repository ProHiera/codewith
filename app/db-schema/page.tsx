'use client';

import { Card, Typography, Space, Tabs, Tag } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const schemas = {
  users: {
    columns: [
      { name: 'id', type: 'UUID', key: 'PRIMARY KEY' },
      { name: 'email', type: 'VARCHAR(255)', key: 'UNIQUE NOT NULL' },
      { name: 'password', type: 'VARCHAR(255)', key: 'NOT NULL' },
      { name: 'created_at', type: 'TIMESTAMP', key: 'DEFAULT NOW()' },
    ],
  },
  projects: {
    columns: [
      { name: 'id', type: 'UUID', key: 'PRIMARY KEY' },
      { name: 'user_id', type: 'UUID', key: 'FOREIGN KEY' },
      { name: 'title', type: 'VARCHAR(255)', key: 'NOT NULL' },
      { name: 'stack', type: 'TEXT[]', key: '' },
      { name: 'created_at', type: 'TIMESTAMP', key: 'DEFAULT NOW()' },
    ],
  },
  notes: {
    columns: [
      { name: 'id', type: 'UUID', key: 'PRIMARY KEY' },
      { name: 'user_id', type: 'UUID', key: 'FOREIGN KEY' },
      { name: 'content', type: 'TEXT', key: 'NOT NULL' },
      { name: 'tags', type: 'TEXT[]', key: '' },
      { name: 'created_at', type: 'TIMESTAMP', key: 'DEFAULT NOW()' },
    ],
  },
};

export default function DbSchemaPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Card>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={2}>
                <DatabaseOutlined /> 데이터베이스 스키마
              </Title>
              <Paragraph>프로젝트의 데이터베이스 테이블 구조를 확인하세요.</Paragraph>
            </div>

            <Tabs
              items={Object.entries(schemas).map(([tableName, schema]) => ({
                key: tableName,
                label: tableName,
                children: (
                  <Card size="small">
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: '#fafafa', borderBottom: '2px solid #f0f0f0' }}>
                          <th style={{ padding: 12, textAlign: 'left' }}>컬럼명</th>
                          <th style={{ padding: 12, textAlign: 'left' }}>타입</th>
                          <th style={{ padding: 12, textAlign: 'left' }}>제약조건</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schema.columns.map((col, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
                            <td style={{ padding: 12 }}>
                              <Tag color="blue">{col.name}</Tag>
                            </td>
                            <td style={{ padding: 12 }}>
                              <code>{col.type}</code>
                            </td>
                            <td style={{ padding: 12 }}>
                              {col.key && <Tag color="green">{col.key}</Tag>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card>
                ),
              }))}
            />
          </Space>
        </Card>
      </div>
    </div>
  );
}
