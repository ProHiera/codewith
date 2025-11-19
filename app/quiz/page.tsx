'use client';

import { useState } from 'react';
import { Card, Typography, Space, Button, Radio, Alert, Progress } from 'antd';
import { QuestionCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const questions = [
  {
    question: '다음 중 JavaScript의 기본 데이터 타입이 아닌 것은?',
    options: ['string', 'number', 'array', 'boolean'],
    answer: 2,
  },
  {
    question: 'const로 선언한 변수는 재할당이 가능한가?',
    options: ['가능하다', '불가능하다', '조건부로 가능하다', '컴파일러에 따라 다르다'],
    answer: 1,
  },
];

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
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
                <QuestionCircleOutlined /> 퀴즈
              </Title>
              <Progress percent={Math.round(((current + 1) / questions.length) * 100)} />
            </div>

            <Card size="small" style={{ background: '#fafafa' }}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Title level={4}>
                  Q{current + 1}. {questions[current].question}
                </Title>

                <Radio.Group
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                  disabled={showResult}
                  style={{ width: '100%' }}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {questions[current].options.map((opt, idx) => (
                      <Radio key={idx} value={idx}>
                        {opt}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>

                {showResult && (
                  <Alert
                    message={selected === questions[current].answer ? '정답!' : '오답'}
                    type={selected === questions[current].answer ? 'success' : 'error'}
                    icon={
                      selected === questions[current].answer ? (
                        <CheckCircleOutlined />
                      ) : (
                        <CloseCircleOutlined />
                      )
                    }
                    showIcon
                  />
                )}

                <Space>
                  {!showResult ? (
                    <Button type="primary" onClick={handleSubmit} disabled={selected === null}>
                      제출
                    </Button>
                  ) : current < questions.length - 1 ? (
                    <Button type="primary" onClick={handleNext}>
                      다음
                    </Button>
                  ) : (
                    <Alert message={`점수: ${score} / ${questions.length}`} type="info" />
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
