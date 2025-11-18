'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Note } from '@/types/gamification';
import { 
  Card, 
  Button, 
  Space, 
  Typography, 
  Modal, 
  Form, 
  Input, 
  Tag, 
  Row, 
  Col,
  Spin,
  Empty,
  message
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  RobotOutlined,
  FileTextOutlined,
  DashboardOutlined,
  CommentOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

export default function NotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch {
      message.error('메모를 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: { title: string; content: string; tags: string }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const tagsArray = values.tags.split(',').map(t => t.trim()).filter(Boolean);
      const noteData = {
        user_id: user.id,
        title: values.title,
        content: values.content,
        tags: tagsArray,
        is_ai_generated: false,
      };

      if (editingId) {
        const { error } = await supabase
          .from('notes')
          .update(noteData)
          .eq('id', editingId);

        if (error) throw error;
        message.success('메모가 수정되었습니다');
      } else {
        const { error } = await supabase
          .from('notes')
          .insert(noteData);

        if (error) throw error;
        message.success('메모가 저장되었습니다');
      }

      form.resetFields();
      setShowModal(false);
      setEditingId(null);
      fetchNotes();
    } catch {
      message.error('저장에 실패했습니다');
    }
  };

  const handleEdit = (note: Note) => {
    form.setFieldsValue({
      title: note.title,
      content: note.content,
      tags: note.tags.join(', '),
    });
    setEditingId(note.id);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: '메모 삭제',
      content: '정말 삭제하시겠습니까?',
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      async onOk() {
        try {
          const { error } = await supabase
            .from('notes')
            .delete()
            .eq('id', id);

          if (error) throw error;
          message.success('메모가 삭제되었습니다');
          fetchNotes();
        } catch {
          message.error('삭제에 실패했습니다');
        }
      }
    });
  };

  const handleNewNote = () => {
    form.resetFields();
    setEditingId(null);
    setShowModal(true);
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
              <FileTextOutlined /> 내 메모
            </Title>
            <Space>
              <Button icon={<CommentOutlined />} onClick={() => router.push('/ai-coach')}>
                AI 코치
              </Button>
              <Button icon={<DashboardOutlined />} onClick={() => router.push('/dashboard')}>
                대시보드
              </Button>
            </Space>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 50px' }}>
        <div style={{ marginBottom: 24 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleNewNote}
          >
            새 메모
          </Button>
        </div>

        {notes.length === 0 ? (
          <Card>
            <Empty description="아직 메모가 없습니다. 첫 메모를 작성해보세요!" />
          </Card>
        ) : (
          <Row gutter={[16, 16]}>
            {notes.map((note) => (
              <Col xs={24} md={12} lg={8} key={note.id}>
                <Card
                  hoverable
                  actions={[
                    <Button
                      key="edit"
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => handleEdit(note)}
                    >
                      수정
                    </Button>,
                    <Button
                      key="delete"
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(note.id)}
                    >
                      삭제
                    </Button>
                  ]}
                >
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <Title level={4} style={{ margin: 0 }}>{note.title}</Title>
                      {note.is_ai_generated && (
                        <Tag icon={<RobotOutlined />} color="purple">
                          AI 생성
                        </Tag>
                      )}
                    </div>

                    <Paragraph
                      ellipsis={{ rows: 4 }}
                      style={{ marginBottom: 12, whiteSpace: 'pre-wrap' }}
                    >
                      {note.content}
                    </Paragraph>

                    {note.tags.length > 0 && (
                      <Space wrap>
                        {note.tags.map((tag, idx) => (
                          <Tag key={idx} color="blue">#{tag}</Tag>
                        ))}
                      </Space>
                    )}

                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {new Date(note.created_at).toLocaleDateString('ko-KR')}
                    </Text>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>

      <Modal
        title={editingId ? '메모 수정' : '새 메모 작성'}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setEditingId(null);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="title"
            label="제목"
            rules={[{ required: true, message: '제목을 입력해주세요' }]}
          >
            <Input placeholder="메모 제목" size="large" />
          </Form.Item>

          <Form.Item
            name="content"
            label="내용"
            rules={[{ required: true, message: '내용을 입력해주세요' }]}
          >
            <TextArea
              rows={8}
              placeholder="메모 내용을 입력하세요..."
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="tags"
            label="태그 (쉼표로 구분)"
          >
            <Input placeholder="예: javascript, react, 학습" size="large" />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setShowModal(false)}>
                취소
              </Button>
              <Button type="primary" htmlType="submit">
                {editingId ? '수정하기' : '저장하기'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
