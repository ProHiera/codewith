'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';

type Pattern = {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  useCase: string;
  code: {
    before: string;
    after: string;
  };
  benefits: string[];
};

const PATTERNS: Pattern[] = [
  {
    id: 'compound-component',
    name: 'Compound Component',
    category: 'React',
    icon: '🧩',
    description: '여러 컴포넌트를 조합하여 유연한 API를 제공하는 패턴',
    useCase: '재사용 가능한 Select, Tabs, Accordion 등',
    code: {
      before: `// ❌ Props 지옥
<Select 
  options={options}
  onChange={handleChange}
  renderOption={customRender}
  placeholder="선택하세요"
  disabled={false}
  showSearch={true}
/>`,
      after: `// ✅ Compound Component
<Select value={value} onChange={setValue}>
  <Select.Trigger>선택하세요</Select.Trigger>
  <Select.Options>
    <Select.Option value="1">옵션 1</Select.Option>
    <Select.Option value="2">옵션 2</Select.Option>
  </Select.Options>
</Select>`
    },
    benefits: [
      'API가 직관적이고 유연함',
      'Props drilling 감소',
      '컴포넌트 조합의 자유도 증가'
    ]
  },
  {
    id: 'repository-pattern',
    name: 'Repository Pattern',
    category: 'Backend',
    icon: '🗄️',
    description: '데이터 접근 로직을 추상화하여 비즈니스 로직과 분리',
    useCase: 'DB 쿼리 로직 캡슐화, 테스트 용이성 향상',
    code: {
      before: `// ❌ 비즈니스 로직에 DB 쿼리 직접 작성
async function createUser(data) {
  const user = await prisma.user.create({
    data: { ...data }
  });
  return user;
}`,
      after: `// ✅ Repository로 분리
class UserRepository {
  async create(data) {
    return prisma.user.create({ data });
  }
  async findById(id) {
    return prisma.user.findUnique({ where: { id } });
  }
}

// Service에서 사용
const userRepo = new UserRepository();
const user = await userRepo.create(data);`
    },
    benefits: [
      'DB 교체 시 Repository만 수정',
      '테스트 시 Mock 객체 주입 용이',
      '비즈니스 로직과 데이터 접근 분리'
    ]
  },
  {
    id: 'custom-hooks',
    name: 'Custom Hooks',
    category: 'React',
    icon: '🪝',
    description: '재사용 가능한 상태 로직을 Hook으로 추출',
    useCase: 'API 호출, Form 관리, localStorage 등',
    code: {
      before: `// ❌ 컴포넌트 안에 반복되는 로직
function UserList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    fetch('/api/users')
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);
  
  // ...
}`,
      after: `// ✅ Custom Hook으로 추출
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading };
}

// 사용
function UserList() {
  const { data, loading } = useFetch('/api/users');
  // ...
}`
    },
    benefits: [
      '로직 재사용성 극대화',
      '컴포넌트가 간결해짐',
      '테스트와 유지보수 용이'
    ]
  },
  {
    id: 'factory-pattern',
    name: 'Factory Pattern',
    category: 'Design Pattern',
    icon: '🏭',
    description: '객체 생성 로직을 캡슐화하여 유연하게 인스턴스 생성',
    useCase: '다양한 타입의 객체를 조건에 따라 생성',
    code: {
      before: `// ❌ 조건문으로 직접 생성
function createNotification(type, message) {
  if (type === 'email') {
    return new EmailNotification(message);
  } else if (type === 'sms') {
    return new SMSNotification(message);
  } else if (type === 'push') {
    return new PushNotification(message);
  }
}`,
      after: `// ✅ Factory로 추상화
class NotificationFactory {
  static create(type, message) {
    const notifications = {
      email: EmailNotification,
      sms: SMSNotification,
      push: PushNotification
    };
    
    const NotificationClass = notifications[type];
    return new NotificationClass(message);
  }
}

const notification = NotificationFactory.create('email', 'Hello');`
    },
    benefits: [
      '새로운 타입 추가 시 확장 용이',
      '생성 로직 중앙 관리',
      '코드 가독성 향상'
    ]
  },
  {
    id: 'middleware-pattern',
    name: 'Middleware Pattern',
    category: 'Backend',
    icon: '🔗',
    description: '요청/응답 처리 파이프라인에 기능을 추가',
    useCase: '인증, 로깅, 에러 처리, 요청 검증',
    code: {
      before: `// ❌ 각 라우트에서 반복
app.get('/api/users', (req, res) => {
  // 인증 체크
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // 로깅
  console.log(\`\${new Date()} - GET /api/users\`);
  
  // 실제 로직
  const users = getUsers();
  res.json(users);
});`,
      after: `// ✅ Middleware로 분리
const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

const logger = (req, res, next) => {
  console.log(\`\${new Date()} - \${req.method} \${req.path}\`);
  next();
};

app.use(logger);
app.get('/api/users', auth, (req, res) => {
  const users = getUsers();
  res.json(users);
});`
    },
    benefits: [
      '관심사 분리 (Separation of Concerns)',
      '코드 재사용성',
      '파이프라인 구조로 확장 용이'
    ]
  },
  {
    id: 'render-props',
    name: 'Render Props',
    category: 'React',
    icon: '🎭',
    description: '렌더링 로직을 props로 전달하여 유연한 컴포넌트 작성',
    useCase: '데이터 로딩, 마우스 추적, 인증 상태 등',
    code: {
      before: `// ❌ 고정된 렌더링
function DataLoader() {
  const { data, loading } = useFetch('/api/data');
  
  if (loading) return <Spinner />;
  return <ul>{data.map(item => <li>{item}</li>)}</ul>;
}`,
      after: `// ✅ Render Props로 유연하게
function DataLoader({ url, render }) {
  const { data, loading } = useFetch(url);
  
  if (loading) return <Spinner />;
  return render(data);
}

// 사용
<DataLoader 
  url="/api/users"
  render={(users) => (
    <ul>{users.map(u => <li>{u.name}</li>)}</ul>
  )}
/>`
    },
    benefits: [
      '렌더링 로직을 컴포넌트 외부에서 제어',
      '높은 재사용성',
      'UI와 로직 분리'
    ]
  }
];

export default function PatternScaffolderPage() {
  const [selectedPattern, setSelectedPattern] = useState<Pattern>(PATTERNS[0]);
  const [showBefore, setShowBefore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(PATTERNS.map(p => p.category)))];
  const filteredPatterns = selectedCategory === 'all' 
    ? PATTERNS 
    : PATTERNS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">💉 실무 패턴 주입기</h1>
          <p className="text-gray-600 text-lg">
            프로덕션에서 검증된 디자인 패턴과 Best Practice를 학습합니다
          </p>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category === 'all' ? '전체' : category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 패턴 목록 */}
          <div className="lg:col-span-1 space-y-3">
            {filteredPatterns.map(pattern => (
              <div
                key={pattern.id}
                onClick={() => setSelectedPattern(pattern)}
                className={`bg-white rounded-xl shadow-lg p-4 cursor-pointer transition-all ${
                  selectedPattern.id === pattern.id
                    ? 'ring-2 ring-emerald-500 shadow-xl'
                    : 'hover:shadow-xl'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{pattern.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm truncate">{pattern.name}</h3>
                    <span className="text-xs text-gray-500">{pattern.category}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{pattern.description}</p>
              </div>
            ))}
          </div>

          {/* 패턴 상세 */}
          <div className="lg:col-span-3 space-y-6">
            {/* 패턴 정보 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">{selectedPattern.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedPattern.name}</h2>
                    <span className="text-sm text-gray-500">{selectedPattern.category}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{selectedPattern.description}</p>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">💡 사용 사례</h3>
                <p className="text-blue-700 text-sm">{selectedPattern.useCase}</p>
              </div>
            </div>

            {/* 코드 비교 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">📝 코드 예시</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowBefore(true)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      showBefore
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Before ❌
                  </button>
                  <button
                    onClick={() => setShowBefore(false)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      !showBefore
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    After ✅
                  </button>
                </div>
              </div>

              <div className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                <pre className="whitespace-pre-wrap">
                  {showBefore ? selectedPattern.code.before : selectedPattern.code.after}
                </pre>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    showBefore ? selectedPattern.code.before : selectedPattern.code.after
                  );
                  alert('클립보드에 복사되었습니다!');
                }}
                className="mt-4 w-full bg-gray-700 hover:bg-gray-800 text-white py-2 rounded-lg font-semibold"
              >
                📋 코드 복사
              </button>
            </div>

            {/* 장점 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">✨ 패턴 적용 시 장점</h2>
              <ul className="space-y-3">
                {selectedPattern.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <span className="text-gray-700 flex-1">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 실습 제안 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">🎯 직접 적용해보기</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-white rounded-lg p-4">
                  <div className="font-semibold mb-2">1️⃣ 코드 이해하기</div>
                  <p className="text-gray-600">Before와 After 코드를 비교하며 차이점을 파악하세요</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="font-semibold mb-2">2️⃣ 직접 작성하기</div>
                  <p className="text-gray-600">패턴을 적용하여 간단한 예제를 직접 구현해보세요</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="font-semibold mb-2">3️⃣ 프로젝트에 적용</div>
                  <p className="text-gray-600">기존 프로젝트에서 리팩토링할 부분을 찾아 패턴을 적용하세요</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
