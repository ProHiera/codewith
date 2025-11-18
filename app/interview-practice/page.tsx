'use client';

import { useState } from 'react';
import { Card, Typography, Space, Button, Radio, Alert, Progress, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, TrophyOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const questions = [
  {
    question: 'JavaScript에서 클로저(Closure)란 무엇인가요?',
    options: [
      '함수와 함수가 선언된 렉시컬 환경의 조합',
      '비동기 처리를 위한 패턴',
      '객체 생성 패턴',
      '에러 처리 방법',
    ],
    answer: 0,
    category: 'JavaScript',
  },
  {
    question: 'React의 useEffect 훅의 역할은 무엇인가요?',
    options: [
      '상태 관리',
      '사이드 이펙트 처리',
      '컴포넌트 렌더링',
      '라우팅',
    ],
    answer: 1,
    category: 'React',
  },
  {
    question: 'RESTful API의 특징이 아닌 것은?',
    options: [
      '무상태성(Stateless)',
      '캐시 가능(Cacheable)',
      '세션 기반 인증',
      '계층화 시스템',
    ],
    answer: 2,
    category: 'Backend',
  },
];

export default function InterviewPracticePage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    if (selected === questions[currentQ].answer) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <Card>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={2}>
                <TrophyOutlined /> 기술 면접 연습
              </Title>
              <Progress
                percent={Math.round((currentQ / questions.length) * 100)}
                status="active"
              />
            </div>

            <Card size="small" style={{ background: '#f9f9f9' }}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                  <Tag color="purple">{questions[currentQ].category}</Tag>
                  <Title level={4} style={{ marginTop: 12 }}>
                    Q{currentQ + 1}. {questions[currentQ].question}
                  </Title>
                </div>

                <Radio.Group
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                  disabled={showResult}
                  style={{ width: '100%' }}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {questions[currentQ].options.map((opt, idx) => (
                      <Radio key={idx} value={idx} style={{ padding: '8px 0' }}>
                        {opt}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>

                {showResult && (
                  <Alert
                    message={selected === questions[currentQ].answer ? '정답입니다!' : '오답입니다'}
                    type={selected === questions[currentQ].answer ? 'success' : 'error'}
                    icon={selected === questions[currentQ].answer ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                    showIcon
                  />
                )}

                <Space>
                  {!showResult ? (
                    <Button
                      type="primary"
                      onClick={handleSubmit}
                      disabled={selected === null}
                    >
                      제출하기
                    </Button>
                  ) : currentQ < questions.length - 1 ? (
                    <Button type="primary" onClick={handleNext}>
                      다음 문제
                    </Button>
                  ) : (
                    <Alert
                      message={`최종 점수: ${score} / ${questions.length}`}
                      type="info"
                      showIcon
                    />
                  )}
                </Space>
              </Space>
            </Card>
          </Space>
        </Card>
      </div>
    </div>
  );
}
