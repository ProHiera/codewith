'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * QuizPopup - 깜짝 퀴즈 알림
 * 
 * 학습 중 랜덤하게 나타나는 인터랙티브 퀴즈 팝업
 * 아름다운 애니메이션과 함께 등장하여 학습 내용 복습
 */

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation?: string;
  relatedTopic?: string;
}

export interface QuizPopupProps {
  quiz: QuizQuestion;
  onAnswer: (questionId: string, isCorrect: boolean, selectedIndex: number) => void;
  onClose: () => void;
  showImmediately?: boolean;
}

export default function QuizPopup({
  quiz,
  onAnswer,
  onClose,
  showImmediately = false,
}: QuizPopupProps) {
  const [isVisible, setIsVisible] = useState(showImmediately);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (!showImmediately) {
      // 약간의 딜레이 후 표시
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, [showImmediately]);

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null || isAnswered) return;

    const correct = selectedOption === quiz.correctAnswer;
    setIsCorrect(correct);
    setIsAnswered(true);
    onAnswer(quiz.id, correct, selectedOption);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={isAnswered ? handleClose : undefined}
          />

          {/* Quiz Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 100 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
              }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden"
            >
              {/* Header with sparkle animation */}
              <div className="relative bg-linear-to-r from-purple-500 to-pink-500 px-8 py-6 text-white overflow-hidden">
                {/* Animated background particles */}
                <motion.div
                  className="absolute inset-0 opacity-30"
                  initial={{ backgroundPosition: '0% 0%' }}
                  animate={{ backgroundPosition: '100% 100%' }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                  }}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="text-4xl"
                    >
                      ⭐
                    </motion.div>
                    <div>
                      <h2 className="text-2xl font-bold">깜짝 퀴즈!</h2>
                      <p className="text-sm opacity-90">방금 배운 내용을 확인해볼까요?</p>
                    </div>
                  </div>
                  {quiz.relatedTopic && (
                    <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                      #{quiz.relatedTopic}
                    </div>
                  )}
                </div>
              </div>

              {/* Question */}
              <div className="px-8 py-6">
                <div className="bg-gray-50 rounded-2xl p-6 mb-6 border-2 border-gray-200">
                  <p className="text-lg font-semibold text-gray-800 leading-relaxed">
                    {quiz.question}
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-6">
                  {quiz.options.map((option, index) => {
                    const isSelected = selectedOption === index;
                    const isCorrectOption = index === quiz.correctAnswer;
                    
                    let optionStyle = 'border-gray-300 bg-white hover:border-purple-400 hover:bg-purple-50';
                    
                    if (isAnswered) {
                      if (isCorrectOption) {
                        optionStyle = 'border-green-500 bg-green-50';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'border-red-500 bg-red-50';
                      } else {
                        optionStyle = 'border-gray-200 bg-gray-50 opacity-50';
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-purple-500 bg-purple-100';
                    }

                    return (
                      <motion.button
                        key={index}
                        whileHover={!isAnswered ? { scale: 1.02 } : {}}
                        whileTap={!isAnswered ? { scale: 0.98 } : {}}
                        onClick={() => handleSelectOption(index)}
                        disabled={isAnswered}
                        className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all ${optionStyle} ${
                          isAnswered ? 'cursor-default' : 'cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${
                              isAnswered && isCorrectOption
                                ? 'bg-green-500 border-green-500 text-white'
                                : isAnswered && isSelected && !isCorrect
                                ? 'bg-red-500 border-red-500 text-white'
                                : isSelected
                                ? 'bg-purple-500 border-purple-500 text-white'
                                : 'border-gray-300 text-gray-600'
                            }`}
                          >
                            {isAnswered && isCorrectOption ? '✓' : String.fromCharCode(65 + index)}
                          </div>
                          <span className={`flex-1 ${isAnswered && !isCorrectOption && isSelected ? 'text-gray-500' : 'text-gray-800'}`}>
                            {option}
                          </span>
                          {isAnswered && isCorrectOption && (
                            <span className="text-green-600 text-xl">✓</span>
                          )}
                          {isAnswered && isSelected && !isCorrect && (
                            <span className="text-red-600 text-xl">✗</span>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {isAnswered && quiz.explanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`rounded-xl p-6 mb-6 border-2 ${
                        isCorrect
                          ? 'bg-green-50 border-green-300'
                          : 'bg-blue-50 border-blue-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">
                          {isCorrect ? '🎉' : '💡'}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-bold mb-2 ${
                            isCorrect ? 'text-green-800' : 'text-blue-800'
                          }`}>
                            {isCorrect ? '정답입니다!' : '설명'}
                          </h4>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {quiz.explanation}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {!isAnswered ? (
                    <>
                      <button
                        onClick={handleClose}
                        className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all"
                      >
                        나중에
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={selectedOption === null}
                        className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
                          selectedOption !== null
                            ? 'bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        제출하기
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleClose}
                      className="w-full px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold transition-all shadow-lg"
                    >
                      {isCorrect ? '🎉 계속 학습하기' : '📚 다시 복습하기'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
