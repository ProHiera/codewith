'use client';

import { useState } from 'react';
import { Card, Row, Col, Tag, Button, Space, Typography, Progress } from 'antd';
import {
  BookOutlined,
  LeftOutlined,
  RightOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  BulbOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

type ConceptSnap = {
  id: string;
  title: string;
  category: 'expression' | 'statement' | 'this' | 'async' | 'closure' | 'prototype';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  cards: ConceptCard[];
};

type ConceptCard = {
  step: number;
  title: string;
  code: string;
  explanation: string;
  visual?: string;
};

const concepts: ConceptSnap[] = [
  {
    id: 'expression-vs-statement',
    title: '표현식 vs 문(Statement)',
    category: 'expression',
    difficulty: 'beginner',
    cards: [
      {
        step: 1,
        title: '표현식이란?',
        code: '3 + 4\n"hello"\ntrue\nuser.name\ngetValue()',
        explanation: '표현식은 값을 반환하는 코드 조각입니다. 변수에 할당하거나 함수 인자로 사용할 수 있어요.',
        visual: '📦 → 값'
      },
      {
        step: 2,
        title: '문(Statement)이란?',
        code: 'let x = 10;\nif (x > 5) { }\nfor (let i = 0; i < 10; i++) { }\nreturn x;',
        explanation: '문은 동작을 수행하지만 값을 반환하지 않습니다. 변수에 할당할 수 없어요.',
        visual: '⚙️ → 동작'
      },
      {
        step: 3,
        title: '헷갈리는 예제',
        code: '// 표현식:\nconst result = x > 5 ? "big" : "small"\n\n// 문:\nif (x > 5) {\n  result = "big"\n}',
        explanation: '삼항 연산자는 표현식이라 값을 반환하지만, if는 문이라 값을 반환하지 않아요.',
        visual: '🤔'
      }
    ]
  },
  {
    id: 'this-keyword',
    title: 'this 키워드 완전 정복',
    category: 'this',
    difficulty: 'intermediate',
    cards: [
      {
        step: 1,
        title: '기본 규칙',
        code: 'function hello() {\n  console.log(this) // window (strict mode에선 undefined)\n}',
        explanation: '일반 함수에서 this는 호출 방식에 따라 달라집니다.',
        visual: '🌐 전역 객체'
      },
      {
        step: 2,
        title: '메서드 호출',
        code: 'const user = {\n  name: "Kim",\n  greet() {\n    console.log(this.name) // "Kim"\n  }\n}\nuser.greet()',
        explanation: '객체의 메서드로 호출하면 this는 그 객체를 가리킵니다.',
        visual: '👤 user 객체'
      },
      {
        step: 3,
        title: '화살표 함수',
        code: 'const user = {\n  name: "Kim",\n  greet: () => {\n    console.log(this.name) // undefined\n  }\n}',
        explanation: '화살표 함수는 자신의 this를 갖지 않고 상위 스코프의 this를 사용합니다.',
        visual: '⬆️ 상위 스코프'
      }
    ]
  },
  {
    id: 'async-await-flow',
    title: 'async/await 실행 흐름',
    category: 'async',
    difficulty: 'intermediate',
    cards: [
      {
        step: 1,
        title: 'Promise 기본',
        code: 'const promise = new Promise((resolve, reject) => {\n  setTimeout(() => resolve("완료!"), 1000)\n})\n\npromise.then(result => console.log(result))',
        explanation: 'Promise는 비동기 작업의 완료 또는 실패를 나타내는 객체입니다.',
        visual: '비동기 처리'
      },
      {
        step: 2,
        title: 'async 함수',
        code: 'async function fetchData() {\n  return "데이터"\n}\n\n// 자동으로 Promise를 반환\nfetchData().then(data => console.log(data))',
        explanation: 'async 함수는 항상 Promise를 반환합니다. return 값이 자동으로 resolve됩니다.',
        visual: '자동 Promise 변환'
      }
    ]
  },
  {
    id: 'closure',
    title: '클로저(Closure) 이해하기',
    category: 'closure',
    difficulty: 'advanced',
    cards: [
      {
        step: 1,
        title: '클로저란?',
        code: 'function outer() {\n  const secret = "비밀"\n  \n  function inner() {\n    console.log(secret) // 접근 가능!\n  }\n  \n  return inner\n}',
        explanation: '함수가 자신이 선언된 환경(스코프)을 기억하는 것을 클로저라고 합니다.',
        visual: '환경을 담은 함수'
      },
      {
        step: 2,
        title: '실용적인 예제',
        code: 'function createCounter() {\n  let count = 0\n  \n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    getCount: () => count\n  }\n}',
        explanation: '클로저로 private 변수를 만들 수 있습니다. count는 외부에서 직접 접근 불가!',
        visual: '캡슐화'
      }
    ]
  }
];

export default function ConceptSnapsPage() {
  const [selectedConcept, setSelectedConcept] = useState<ConceptSnap | null>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredConcepts = selectedCategory === 'all' 
    ? concepts 
    : concepts.filter(c => c.category === selectedCategory);

  const nextCard = () => {
    if (selectedConcept && currentCard < selectedConcept.cards.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const selectConcept = (concept: ConceptSnap) => {
    setSelectedConcept(concept);
    setCurrentCard(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'default';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '입문';
      case 'intermediate': return '중급';
      case 'advanced': return '고급';
      default: return difficulty;
    }
  };

  const categories = [
    { key: 'all', label: '전체' },
    { key: 'expression', label: '표현식/문' },
    { key: 'this', label: 'this' },
    { key: 'async', label: '비동기' },
    { key: 'closure', label: '클로저' }
  ];

  return (
    <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card>
          <Title level={1}>
            <BookOutlined /> JS 개념 스냅샷
          </Title>
          <Paragraph style={{ fontSize: 16 }}>
            어려운 JavaScript 개념을 카드 형식으로 쉽게 이해하세요
          </Paragraph>
        </Card>

        {!selectedConcept ? (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <>
              <Space wrap>
                {categories.map((cat) => (
                  <Button
                    key={cat.key}
                    type={selectedCategory === cat.key ? 'primary' : 'default'}
                    onClick={() => setSelectedCategory(cat.key)}
                  >
                    {cat.label}
                  </Button>
                ))}
              </Space>

              <Row gutter={[16, 16]}>
                {filteredConcepts.map(concept => (
                  <Col xs={24} md={12} key={concept.id}>
                    <Card
                      hoverable
                      onClick={() => selectConcept(concept)}
                      style={{ height: '100%' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                        <Title level={4}>{concept.title}</Title>
                        <Tag color={getDifficultyColor(concept.difficulty)}>
                          {getDifficultyText(concept.difficulty)}
                        </Tag>
                      </div>
                      <Paragraph type="secondary">
                        {concept.cards.length}단계 카드로 배우기
                      </Paragraph>
                      <Text style={{ color: '#1890ff', fontWeight: 600 }}>
                        시작하기 →
                      </Text>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Card style={{ background: 'linear-gradient(135deg, #f6f0ff 0%, #e6ccff 100%)', border: 'none' }}>
                <Title level={4}><BulbOutlined /> 효과적인 학습 방법</Title>
                <Space direction="vertical">
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Text strong style={{ color: '#722ed1' }}>1.</Text>
                    <Text>각 카드를 천천히 읽고 코드를 직접 실행해보세요</Text>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Text strong style={{ color: '#722ed1' }}>2.</Text>
                    <Text>이해가 안 되면 이전 카드로 돌아가서 다시 보세요</Text>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Text strong style={{ color: '#722ed1' }}>3.</Text>
                    <Text>배운 내용을 자신의 프로젝트에 바로 적용해보세요</Text>
                  </div>
                </Space>
              </Card>
            </>
          </Space>
        ) : (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <Title level={4} style={{ margin: 0 }}>{selectedConcept.title}</Title>
                <Button
                  icon={<CloseOutlined />}
                  onClick={() => setSelectedConcept(null)}
                >
                  닫기
                </Button>
              </div>
              <Progress
                percent={Math.round(((currentCard + 1) / selectedConcept.cards.length) * 100)}
                showInfo={false}
              />
              <Text type="secondary" style={{ marginTop: 8, display: 'block' }}>
                {currentCard + 1} / {selectedConcept.cards.length} 단계
              </Text>
            </Card>

            <Card>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '24px',
                borderRadius: '8px 8px 0 0',
                margin: '-24px -24px 24px -24px',
                color: 'white'
              }}>
                <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12, display: 'block', marginBottom: 8 }}>
                  Step {selectedConcept.cards[currentCard].step}
                </Text>
                <Title level={3} style={{ color: 'white', margin: 0 }}>
                  {selectedConcept.cards[currentCard].title}
                </Title>
                {selectedConcept.cards[currentCard].visual && (
                  <div style={{ fontSize: 40, marginTop: 12 }}>
                    {selectedConcept.cards[currentCard].visual}
                  </div>
                )}
              </div>

              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div style={{
                  background: '#1e1e1e',
                  padding: '20px',
                  borderRadius: 8,
                  color: 'white'
                }}>
                  <pre style={{ margin: 0, overflow: 'auto', fontSize: 14, lineHeight: 1.6 }}>
                    <code>{selectedConcept.cards[currentCard].code}</code>
                  </pre>
                </div>

                <Card style={{ background: '#e6f7ff', border: 'none', borderLeft: '4px solid #1890ff' }}>
                  <Text style={{ fontSize: 16, lineHeight: 1.6 }}>
                    {selectedConcept.cards[currentCard].explanation}
                  </Text>
                </Card>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16 }}>
                  <Button
                    icon={<LeftOutlined />}
                    onClick={prevCard}
                    disabled={currentCard === 0}
                    size="large"
                  >
                    이전
                  </Button>
                  
                  {currentCard < selectedConcept.cards.length - 1 ? (
                    <Button
                      type="primary"
                      icon={<RightOutlined />}
                      iconPosition="end"
                      onClick={nextCard}
                      size="large"
                    >
                      다음
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      icon={<CheckCircleOutlined />}
                      onClick={() => setSelectedConcept(null)}
                      size="large"
                      style={{ background: '#52c41a', borderColor: '#52c41a' }}
                    >
                      완료!
                    </Button>
                  )}
                </div>
              </Space>
            </Card>
          </Space>
        )}
      </Space>
    </div>
  );
}
