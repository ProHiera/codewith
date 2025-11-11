'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';

type APIMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type HttpMethod = APIMethod;

type Template = {
  id: string;
  name: string;
  method: HttpMethod;
  description: string;
  code: string;
};

const templates: Template[] = [
  {
    id: 'fetch-get',
    name: 'Fetch GET 요청',
    method: 'GET',
    description: '기본적인 GET 요청으로 데이터 가져오기',
    code: `async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/users');
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}`
  },
  {
    id: 'fetch-post',
    name: 'Fetch POST 요청',
    method: 'POST',
    description: 'JSON 데이터를 서버에 전송',
    code: `async function createUser(userData) {
  try {
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}`
  },
  {
    id: 'axios-get',
    name: 'Axios GET 요청',
    method: 'GET',
    description: 'Axios로 간편하게 데이터 가져오기',
    code: `import axios from 'axios';

async function fetchData() {
  try {
    const response = await axios.get('https://api.example.com/users');
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Server error:', error.response.status);
    } else if (error.request) {
      console.error('Network error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
  }
}`
  },
  {
    id: 'axios-auth',
    name: 'Axios 인증 포함',
    method: 'GET',
    description: 'Authorization 헤더에 토큰 포함',
    code: `import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Authorization': \`Bearer \${localStorage.getItem('token')}\`
  }
});

async function fetchProtectedData() {
  try {
    const response = await api.get('/protected/users');
    return response.data;
  } catch (error) {
    console.error('Auth error:', error);
  }
}`
  }
];

const fakeServerResponses = {
  users: {
    success: [
      { id: 1, name: '김철수', email: 'kim@example.com' },
      { id: 2, name: '이영희', email: 'lee@example.com' },
      { id: 3, name: '박민수', email: 'park@example.com' }
    ],
    error: { message: 'Server Error', status: 500 }
  },
  user: {
    success: { id: 101, name: '새 사용자', email: 'new@example.com', createdAt: new Date().toISOString() },
    error: { message: 'Validation Error', status: 400 }
  }
};

export default function ApiSandboxPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(templates[0]);
  const [code, setCode] = useState(templates[0].code);
  const [url, setUrl] = useState('https://api.example.com/users');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [responseTime, setResponseTime] = useState<number>(0);

  const selectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setCode(template.code);
    setResponse(null);
    setError(null);
  };

  const runCode = async () => {
    setIsLoading(true);
    setResponse(null);
    setError(null);
    const startTime = Date.now();

    // 가짜 서버 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const endTime = Date.now();
    setResponseTime(endTime - startTime);

    // 성공 케이스 (80% 확률)
    if (Math.random() > 0.2) {
      if (selectedTemplate.method === 'GET') {
        setResponse(fakeServerResponses.users.success);
      } else if (selectedTemplate.method === 'POST') {
        setResponse(fakeServerResponses.user.success);
      } else {
        setResponse({ message: 'Success', updated: true });
      }
    } else {
      // 에러 케이스 (20% 확률)
      setError('Network Error: Failed to fetch');
    }

    setIsLoading(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    alert('코드가 클립보드에 복사되었습니다!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">🔌 API 실습 샌드박스</h1>
          <p className="text-gray-600 text-lg">
            fetch, axios 템플릿으로 API 호출을 연습하고 가짜 서버로 테스트하세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 템플릿 선택 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">템플릿 선택</h2>
              <div className="space-y-3">
                {templates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => selectTemplate(template)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedTemplate.id === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold">{template.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        template.method === 'GET' ? 'bg-green-100 text-green-700' :
                        template.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {template.method}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 설정 */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h3 className="font-bold mb-4">⚙️ 설정</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">API URL</label>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Authorization Token</label>
                  <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Bearer token..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 코드 에디터 & 결과 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 코드 에디터 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
                <span className="font-semibold">코드 에디터</span>
                <button
                  onClick={copyCode}
                  className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
                >
                  📋 복사
                </button>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-6 font-mono text-sm bg-gray-900 text-white min-h-[300px] focus:outline-none"
                spellCheck={false}
              />
            </div>

            {/* 실행 버튼 */}
            <button
              onClick={runCode}
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  실행 중...
                </>
              ) : (
                <>▶ 코드 실행</>
              )}
            </button>

            {/* 응답 결과 */}
            {(response || error) && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
                  <span className="font-semibold">응답 결과</span>
                  <span className="text-sm text-gray-400">{responseTime}ms</span>
                </div>
                <div className="p-6">
                  {error ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="font-bold text-red-900 mb-2">❌ Error</div>
                      <pre className="text-sm text-red-700">{error}</pre>
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="font-bold text-green-900 mb-2">✅ Success (200)</div>
                      <pre className="text-sm text-gray-800 overflow-x-auto">
                        {JSON.stringify(response, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 학습 팁 */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-3">💡 API 호출 핵심 포인트</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>try-catch 필수:</strong> 네트워크 에러는 언제든 발생할 수 있어요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>response.ok 체크:</strong> fetch는 404, 500도 에러로 던지지 않아요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>헤더 설정:</strong> Content-Type, Authorization 잊지 마세요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>로딩 상태:</strong> API 호출 중 사용자에게 피드백을 주세요</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
