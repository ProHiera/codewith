'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LEVELS, LEVEL_ASSESSMENT_QUESTIONS, type LearnerLevel } from '@/types/levels';
import { supabase } from '@/lib/supabase/client';

export default function LevelAssessmentPage() {
  const router = useRouter();
  const [step, setStep] = useState<'choose' | 'test'>('choose');
  const [selectedLevel, setSelectedLevel] = useState<LearnerLevel | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [testComplete, setTestComplete] = useState(false);
  const [assessedLevel, setAssessedLevel] = useState<LearnerLevel | null>(null);

  const handleChooseLevel = async (level: LearnerLevel) => {
    setSelectedLevel(level);
    
    // 사용자 레벨 업데이트
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('users')
        .update({ learner_level: level })
        .eq('id', user.id);
      
      router.push('/dashboard?message=레벨이 설정되었습니다!');
    }
  };

  const handleStartTest = () => {
    setStep('test');
  };

  const handleAnswer = (questionId: string, answerIndex: number) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleNext = () => {
    if (currentQuestionIndex < LEVEL_ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 테스트 완료 - 점수 계산
      calculateLevel();
    }
  };

  const calculateLevel = async () => {
    let totalScore = 0;
    let maxScore = 0;

    LEVEL_ASSESSMENT_QUESTIONS.forEach((q) => {
      maxScore += q.points;
      if (answers[q.id] === q.correctAnswer) {
        totalScore += q.points;
      }
    });

    const percentage = (totalScore / maxScore) * 100;

    let level: LearnerLevel;
    if (percentage >= 80) level = 'professional';
    else if (percentage >= 60) level = 'advanced';
    else if (percentage >= 40) level = 'intermediate';
    else if (percentage >= 20) level = 'elementary';
    else level = 'beginner';

    setAssessedLevel(level);
    setTestComplete(true);

    // 사용자 레벨 업데이트
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('users')
        .update({ learner_level: level })
        .eq('id', user.id);
    }
  };

  const currentQuestion = LEVEL_ASSESSMENT_QUESTIONS[currentQuestionIndex];

  if (testComplete && assessedLevel) {
    const levelInfo = LEVELS[assessedLevel];
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">{levelInfo.icon}</div>
            <h1 className="text-3xl font-bold mb-2">평가 완료!</h1>
            <p className="text-xl text-gray-600 mb-6">
              당신의 레벨은 <span className={`font-bold text-${levelInfo.color}-600`}>{levelInfo.name}</span>입니다
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="text-gray-700 mb-4">{levelInfo.description}</p>
              <div className="text-left">
                <h3 className="font-bold mb-2">추천 스킬:</h3>
                <ul className="space-y-1">
                  {levelInfo.skills.map((skill, i) => (
                    <li key={i} className="text-sm text-gray-600">✓ {skill}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="font-bold mb-3">추천 학습 경로:</h3>
              <div className="space-y-2">
                {levelInfo.recommendedPath.map((path, i) => (
                  <div key={i} className="bg-white rounded px-4 py-2 text-sm">
                    {i + 1}. {path}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => router.push('/dashboard')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              대시보드로 이동
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'test') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">
                  질문 {currentQuestionIndex + 1} / {LEVEL_ASSESSMENT_QUESTIONS.length}
                </span>
                <span className="text-sm font-semibold text-blue-600">
                  {currentQuestion.points}점
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${((currentQuestionIndex + 1) / LEVEL_ASSESSMENT_QUESTIONS.length) * 100}%`
                  }}
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">{currentQuestion.question}</h2>

            <div className="space-y-3 mb-8">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(currentQuestion.id, index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    answers[currentQuestion.id] === index
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                이전
              </button>
              <button
                onClick={handleNext}
                disabled={answers[currentQuestion.id] === undefined}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {currentQuestionIndex === LEVEL_ASSESSMENT_QUESTIONS.length - 1 ? '완료' : '다음'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">나의 학습 레벨 설정</h1>
          <p className="text-xl text-gray-600">
            두 가지 방법 중 하나를 선택하세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-5xl mb-4 text-center">📝</div>
            <h2 className="text-2xl font-bold mb-4 text-center">레벨 평가 테스트</h2>
            <p className="text-gray-600 mb-6 text-center">
              15개의 질문으로 당신의 실력을 정확히 평가합니다
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-sm">15개 객관식 문제</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-sm">약 10분 소요</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-sm">정확한 레벨 추천</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-sm">맞춤 학습 경로 제공</span>
              </li>
            </ul>
            <button
              onClick={handleStartTest}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              테스트 시작하기
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-5xl mb-4 text-center">🎯</div>
            <h2 className="text-2xl font-bold mb-4 text-center">직접 선택하기</h2>
            <p className="text-gray-600 mb-6 text-center">
              내 수준을 알고 있다면 바로 선택하세요
            </p>
            <div className="space-y-3">
              {(Object.keys(LEVELS) as LearnerLevel[]).map((levelKey) => {
                const level = LEVELS[levelKey];
                return (
                  <button
                    key={levelKey}
                    onClick={() => handleChooseLevel(levelKey)}
                    className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all hover:shadow-md"
                  >
                    <div className="flex items-center">
                      <span className="text-3xl mr-3">{level.icon}</span>
                      <div className="flex-1">
                        <div className="font-bold">{level.name}</div>
                        <div className="text-sm text-gray-500">{level.description}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-bold mb-2 flex items-center">
            <span className="text-yellow-600 mr-2">💡</span>
            레벨 시스템이란?
          </h3>
          <p className="text-sm text-gray-700">
            당신의 레벨에 맞는 학습 콘텐츠, 미션, 추천 경로를 제공합니다. 
            언제든지 대시보드에서 레벨을 변경할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
