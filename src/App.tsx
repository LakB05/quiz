import React, { useState } from 'react';
import { ChevronRight, CheckCircle, XCircle, Award, MessageCircle } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number[]; // now supports multiple answers
}

const quizData: Question[] = [
  {
    id: 1,
    question: "The 'Big 4' are primarily known as:",
    options: ["Accounting consulting firms", "Strategy consulting firms", "HR consulting firms", "Technology consulting firms"],
    correctAnswer: [0]
  },
  {
    id: 2,
    question: "'Big 3' are primarily known as:",
    options: ["Technology consulting firms", "Strategy consulting firms", "HR consulting firms", "Accounting consulting firms"],
    correctAnswer: [1]
  },
  {
    id: 3,
    question: "Management consulting includes:",
    options: ["Strategy", "Operations", "Human Resources", "Tech & Finance"],
    correctAnswer: [0, 1, 2, 3]
  },
  {
    id: 4,
    question: "What is BCG's Growth Share Matrix?",
    options: ["Portfolio Management", "Investment Management", "Growth Management", "Operations Management"],
    correctAnswer: [0]
  },
  {
    id: 5,
    question: "Key components of the BCG Growth Matrix?",
    options: ["Company growth rate & Market growth", "Market growth & Feasibility", "Feasibility & Relevant", "Market growth rate & Relative Market Share"],
    correctAnswer: [3]
  },
  {
    id: 6,
    question: "MECE stands for?",
    options: ["Mutually Exhaustive, Completely Exclusive", "Mutually Exclusive, Completely Exhaustive", "Mutually Elective, Completely Exclusive", "Mutually Exclusive, Completely Elective"],
    correctAnswer: [1]
  },
  {
    id: 7,
    question: "MECE Approach is:",
    options: ["Problem-solving & structuring principle", "Overlapping the issues", "Breaking down complex issues", "Item categorised in many ways"],
    correctAnswer: [0, 2]
  },
  {
    id: 8,
    question: "SMART Approach stands for?",
    options: ["Specific, Massive, Achievable, Responsive, Time-bound", "Smart, Measureable, Actionable, Responsive, Traditional", "Specific, Measureable, Achievable, Relevant, Time-bound", "Seamless, Massive, Approachable, Reframe, Traceable"],
    correctAnswer: [2]
  },
  {
    id: 9,
    question: "McKinsey's 7's framework primarily aims:",
    options: ["Organizational effectiveness", "Organizational efficiency", "Quantitative Measurement System", "Analyse external market conditions"],
    correctAnswer: [0]
  }
];

const motivationalMessages = [
  "You are going good! 🎉",
  "Keep it up! 🌟",
  "Nice work! 👏",
  "Excellent! 🔥",
  "Outstanding! 💪",
  "Well done! ✨"
];

const emphatheticMessages = [
  "Wrong attempt, don't stop, move ahead! 💪",
  "It's okay, keep trying! 🌈",
  "Don't worry, you've got this! 💫",
  "Keep going, you're learning! 📚",
  "Stay positive and continue! 🌟",
  "Every mistake is a step forward! 🚀"
];

// Utility function to check if two arrays match (ignoring order)
const arraysEqual = (a: number[], b: number[]) =>
  a.length === b.length && a.every(val => b.includes(val));

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const currentQuestion = quizData[currentQuestionIndex];
  const isCorrect = arraysEqual(selectedAnswers, currentQuestion?.correctAnswer);

  const toggleAnswer = (answerIndex: number) => {
    if (showFeedback) return;

    setSelectedAnswers(prev =>
      prev.includes(answerIndex)
        ? prev.filter(a => a !== answerIndex)
        : [...prev, answerIndex]
    );
  };

  const handleSubmitAnswer = () => {
    if (showFeedback) return;
    setShowFeedback(true);

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswers([]);
      setShowFeedback(false);
    } else {
      setIsQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowFeedback(false);
    setScore(0);
    setIsQuizComplete(false);
  };

  const handleJoinWhatsApp = () => {
    const whatsappLink = "https://chat.whatsapp.com/YOUR_GROUP_LINK_HERE";
    window.open(whatsappLink, '_blank');
  };

  const getRandomMessage = (messages: string[]) => {
    return messages[Math.floor(Math.random() * messages.length)];
  };

  if (isQuizComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2d5016] via-[#4a7c59] to-[#1A2D45] flex items-center justify-center p-4">
        {/* DCG Logo */}
        <div className="absolute top-6 right-6">
          <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg">
            <img 
              src="/dtuconsultinggroup.jpg" 
              alt="DTU Consulting Group" 
              className="h-12 w-auto object-contain"
            />
          </div>
        </div>

        {/* Society Name and Tagline */}
        <div className="absolute top-6 left-6">
          <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg">
            <h2 className="text-[#1A2D45] font-bold text-xl mb-2">DTU Consulting Group</h2>
            <p className="text-[#2d5016] font-semibold text-sm mb-1">People | Productivity | Profitability</p>
            <p className="text-[#4a7c59] text-xs">Love discussing business? We do too!</p>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <Award className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-[#1A2D45] mb-2">Quiz Complete!</h1>
            <p className="text-gray-600 text-lg">Congratulations on finishing the quiz</p>
          </div>
          
          <div className="bg-gradient-to-r from-[#4a7c59] to-[#2d5016] rounded-2xl p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Your Score</h2>
            <p className="text-4xl font-bold text-white">{score}/{quizData.length}</p>
            <p className="text-white mt-2">
              {score === quizData.length ? "Perfect Score! 🎉" : 
               score >= quizData.length * 0.7 ? "Great Job! 👏" : 
               "Good Effort! Keep Learning! 💪"}
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleJoinWhatsApp}
              className="w-full bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Join Our WhatsApp Group
            </button>
            
            <button
              onClick={resetQuiz}
              className="w-full bg-[#1A2D45] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1A2D45]/90 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2d5016] via-[#4a7c59] to-[#1A2D45] flex items-center justify-center p-4">
      {/* DCG Logo */}
      <div className="absolute top-6 right-6">
        <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg">
          <img 
            src="/dtuconsultinggroup.jpg" 
            alt="DTU Consulting Group" 
            className="h-12 w-auto object-contain"
          />
        </div>
      </div>

      {/* Society Name and Tagline */}
      <div className="absolute top-6 left-6">
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg">
          <h2 className="text-[#1A2D45] font-bold text-xl mb-2">DTU Consulting Group</h2>
          <p className="text-[#2d5016] font-semibold text-sm mb-1">People | Productivity | Profitability</p>
          <p className="text-[#4a7c59] text-xs">Love discussing business? We do too!</p>
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestionIndex + 1} of {quizData.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              Score: {score}/{quizData.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#4a7c59] to-[#2d5016] h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A2D45] mb-6 leading-relaxed">
            {currentQuestion.question}
          </h1>
        </div>

        {/* Options */}
        <div className="space-y-4 mb-8">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswers.includes(index);
            const isCorrectOption = currentQuestion.correctAnswer.includes(index);

            return (
              <button
                key={index}
                onClick={() => toggleAnswer(index)}
                disabled={showFeedback}
                className={`w-full p-4 text-left rounded-2xl border-2 transition-all duration-200 transform hover:scale-[1.02] ${
                  showFeedback
                    ? isSelected
                      ? isCorrect
                        ? 'bg-green-50 border-green-300 text-green-800'
                        : isCorrectOption
                        ? 'bg-green-50 border-green-300 text-green-800'
                        : 'bg-red-50 border-red-300 text-red-800'
                      : isCorrectOption
                      ? 'bg-green-50 border-green-300 text-green-800'
                      : 'bg-gray-50 border-gray-200 text-gray-500'
                    : isSelected
                    ? 'bg-[#4a7c59]/10 border-[#4a7c59] text-[#2d5016]'
                    : 'bg-white border-gray-200 hover:border-[#4a7c59] hover:bg-[#4a7c59]/5 text-gray-800'
                }`}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-[#2d5016]/10 flex items-center justify-center mr-4 text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="font-medium">{option}</span>
                  {showFeedback && isSelected && (
                    isCorrectOption ? (
                      <CheckCircle className="w-6 h-6 text-green-600 ml-auto" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 ml-auto" />
                    )
                  )}
                  {showFeedback && !isSelected && isCorrectOption && (
                    <CheckCircle className="w-6 h-6 text-green-600 ml-auto" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback Message */}
        {showFeedback && (
          <div className={`mb-6 p-4 rounded-2xl text-center ${
            isCorrect 
              ? 'bg-[#4a7c59]/10 border border-[#4a7c59]/30' 
              : 'bg-orange-50 border border-orange-200'
          }`}>
            <p className={`text-lg font-semibold ${
              isCorrect ? 'text-[#2d5016]' : 'text-orange-800'
            }`}>
              {isCorrect 
                ? getRandomMessage(motivationalMessages)
                : getRandomMessage(emphatheticMessages)
              }
            </p>
          </div>
        )}

        {/* Submit / Next Button */}
        {!showFeedback ? (
          <div className="flex justify-center">
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswers.length === 0}
              className="bg-[#1A2D45] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1A2D45]/90 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              Submit Answer
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={handleNextQuestion}
              className="bg-[#1A2D45] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1A2D45]/90 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              {currentQuestionIndex < quizData.length - 1 ? 'Next Question' : 'Finish Quiz'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
