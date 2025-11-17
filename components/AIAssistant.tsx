'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AIAssistant - AI 기반 학습 도우미
 * 
 * 학습 중 AI와 대화하며 개념 이해, 질문 답변, 코드 리뷰 등을 지원
 */

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AIAssistantProps {
  onSendMessage?: (message: string) => Promise<string>;
  initialMessages?: Message[];
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'sidebar';
}

export default function AIAssistant({
  onSendMessage,
  initialMessages = [],
  className = '',
  position = 'bottom-right',
}: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = onSendMessage
        ? await onSendMessage(input)
        : '죄송합니다. AI 서비스에 연결할 수 없습니다.';

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI 응답 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'sidebar': 'top-0 right-0 h-full',
  };

  const quickSuggestions = [
    '이 개념을 쉽게 설명해줘',
    '코드 예시를 보여줘',
    '퀴즈 문제를 내줘',
    '실무에서 어떻게 쓰여?',
  ];

  return (
    <div className={`fixed ${positionClasses[position]} z-50 ${className}`}>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full shadow-2xl flex items-center justify-center text-3xl hover:shadow-blue-300 transition-all"
          >
            🤖
          </motion.button>
        )}

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl w-96 h-[600px] flex flex-col overflow-hidden border-2 border-blue-200"
          >
            {/* Header */}
            <div className="bg-linear-to-r from-blue-500 to-cyan-500 px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🤖</div>
                <div>
                  <h3 className="font-bold text-lg">AI 학습 도우미</h3>
                  <p className="text-xs opacity-90">무엇이든 물어보세요</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">👋</div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    안녕하세요!
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    학습 중 궁금한 점을 물어보세요
                  </p>
                  
                  {/* Quick Suggestions */}
                  <div className="space-y-2">
                    {quickSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setInput(suggestion)}
                        className="w-full px-4 py-2 bg-white hover:bg-blue-50 border border-gray-200 rounded-lg text-sm text-gray-700 transition-all text-left"
                      >
                        💡 {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white border-2 border-gray-200 text-gray-800'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">🤖</span>
                        <span className="text-xs font-semibold text-gray-500">
                          AI 도우미
                        </span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-400'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border-2 border-gray-200 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <motion.div
                          className="w-2 h-2 bg-blue-500 rounded-full"
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-blue-500 rounded-full"
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-blue-500 rounded-full"
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">AI가 답변을 준비 중...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t-2 border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="질문을 입력하세요..."
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    input.trim() && !isLoading
                      ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  전송
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * AISummaryCard - AI 생성 요약 카드
 */
export interface AISummaryCardProps {
  topic: string;
  summary: string;
  keyPoints?: string[];
  onRegenerate?: () => void;
  className?: string;
}

export function AISummaryCard({
  topic,
  summary,
  keyPoints = [],
  onRegenerate,
  className = '',
}: AISummaryCardProps) {
  return (
    <div className={`bg-linear-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <h3 className="text-lg font-bold text-gray-800">AI 요약</h3>
        </div>
        {onRegenerate && (
          <button
            onClick={onRegenerate}
            className="px-3 py-1 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 transition-all"
          >
            🔄 재생성
          </button>
        )}
      </div>

      {/* Topic */}
      <div className="bg-white rounded-xl p-3 mb-4 border border-cyan-200">
        <span className="text-sm font-semibold text-cyan-700">주제: </span>
        <span className="text-sm text-gray-800">{topic}</span>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl p-4 mb-4 border border-gray-200">
        <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
      </div>

      {/* Key Points */}
      {keyPoints.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <span>💡</span> 핵심 포인트
          </h4>
          <ul className="space-y-2">
            {keyPoints.map((point, index) => (
              <li
                key={index}
                className="flex items-start gap-2 bg-white rounded-lg p-3 border border-gray-200"
              >
                <span className="text-cyan-600 font-bold text-sm">{index + 1}.</span>
                <span className="text-sm text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
