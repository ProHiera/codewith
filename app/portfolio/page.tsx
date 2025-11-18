'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Project } from '@/types';
import { 
  Card, 
  Row, 
  Col, 
  Button, 
  Space, 
  Typography, 
  Modal, 
  Form, 
  Input,
  Tag,
  Spin,
  Empty
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  GithubOutlined,
  GlobalOutlined,
  FolderOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

export default function PortfolioPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    checkUser();
    fetchProjects();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
    }
  };

  const fetchProjects = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch {
      // Silent fail
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: { title: string; stack: string; repo_url: string; demo_url: string; summary: string }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.from('projects').insert({
        user_id: user.id,
        ...values,
      });

      if (error) throw error;
      
      form.resetFields();
      setShowModal(false);
      fetchProjects();
    } catch {
      alert('프로젝트 저장에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spin size="large" tip="로딩 중..." />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', position: 'sticky', top: 64, zIndex: 100 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '16px 50px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={2} style={{ margin: 0 }}>
              <FolderOutlined /> 내 포트폴리오
            </Title>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 50px' }}>
        <div style={{ marginBottom: 24 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => setShowModal(true)}
          >
            프로젝트 추가
          </Button>
        </div>

        {projects.length === 0 ? (
          <Card>
            <Empty description="아직 프로젝트가 없습니다. 첫 프로젝트를 추가해보세요!" />
          </Card>
        ) : (
          <Row gutter={[16, 16]}>
            {projects.map((project) => (
              <Col xs={24} md={12} lg={8} key={project.id}>
                <Card hoverable>
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <Title level={4}>{project.title}</Title>
                    <Paragraph ellipsis={{ rows: 3 }}>
                      {project.summary}
                    </Paragraph>
                    <Space wrap>
                      {project.stack.split(',').map((tech, idx) => (
                        <Tag key={idx} color="blue">{tech.trim()}</Tag>
                      ))}
                    </Space>
                    <Space style={{ marginTop: 12 }}>
                      {project.repo_url && (
                        <Button
                          icon={<GithubOutlined />}
                          href={project.repo_url}
                          target="_blank"
                        >
                          GitHub
                        </Button>
                      )}
                      {project.demo_url && (
                        <Button
                          icon={<GlobalOutlined />}
                          href={project.demo_url}
                          target="_blank"
                        >
                          데모
                        </Button>
                      )}
                    </Space>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>

      <Modal
        title="프로젝트 추가"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="프로젝트 제목"
            rules={[{ required: true, message: '제목을 입력해주세요' }]}
          >
            <Input placeholder="프로젝트 제목" />
          </Form.Item>

          <Form.Item
            name="stack"
            label="기술 스택"
            rules={[{ required: true, message: '기술 스택을 입력해주세요' }]}
          >
            <Input placeholder="React, TypeScript, Node.js (쉼표로 구분)" />
          </Form.Item>

          <Form.Item name="repo_url" label="GitHub URL">
            <Input placeholder="https://github.com/..." />
          </Form.Item>

          <Form.Item name="demo_url" label="데모 URL">
            <Input placeholder="https://..." />
          </Form.Item>

          <Form.Item
            name="summary"
            label="프로젝트 요약"
            rules={[{ required: true, message: '요약을 입력해주세요' }]}
          >
            <TextArea rows={4} placeholder="프로젝트 설명..." />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setShowModal(false)}>취소</Button>
              <Button type="primary" htmlType="submit">
                저장하기
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
