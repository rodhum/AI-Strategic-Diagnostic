import React, { useState } from 'react';
import { Phase, UserData, Answers } from './types';
import { APP_TITLE, QUESTIONS } from './constants';
import WelcomeScreen from './components/WelcomeScreen';
import RegistrationScreen from './components/RegistrationScreen';
import AssessmentScreen from './components/AssessmentScreen';
import ResultScreen from './components/ResultScreen';
import { BrainCircuit } from 'lucide-react';

const App: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const startQuiz = () => {
    setPhase('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegistration = (data: UserData) => {
    setUserData(data);
    setPhase('assessment');
    // Ensure we start at 0
    setCurrentQuestionIndex(0);
  };

  const handleAnswer = (questionId: number, value: number) => {
    // Record answer
    setAnswers(prev => ({ ...prev, [questionId]: value }));

    // Move to next or finish
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      // Small delay for UX to feel natural
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
    } else {
      setTimeout(() => {
        setPhase('results');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
    }
  };

  const resetQuiz = () => {
    setPhase('intro');
    setUserData(null);
    setAnswers({});
    setCurrentQuestionIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-brand-200 selection:text-brand-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2" onClick={resetQuiz} style={{cursor: 'pointer'}}>
            <BrainCircuit className="text-brand-600" size={28} />
            <span className="font-bold text-lg text-slate-800 tracking-tight">{APP_TITLE}</span>
          </div>
          
          <div className="flex items-center gap-4">
            {phase !== 'intro' && userData && (
              <div className="hidden md:flex items-center gap-3 border-r border-slate-200 pr-4">
                 <div className="text-right">
                   <p className="text-xs font-bold text-slate-900">{userData.name}</p>
                   <p className="text-[10px] text-slate-500 uppercase tracking-wide truncate max-w-[120px]">{userData.role}</p>
                 </div>
                 <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-xs">
                   {userData.name.charAt(0)}
                 </div>
              </div>
            )}
            <img 
              src="https://i.postimg.cc/fLzNJ8zW/Logo-GCC-Crop.png" 
              alt="Logo GCC" 
              className="h-12 md:h-16 w-auto object-contain"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-start p-4 md:p-8">
        <div className="w-full max-w-6xl">
          {phase === 'intro' && (
            <WelcomeScreen onStart={startQuiz} />
          )}

          <div className="w-full">
            {phase === 'register' && (
              <RegistrationScreen onComplete={handleRegistration} />
            )}

            {phase === 'assessment' && userData && (
              <AssessmentScreen 
                currentQuestionIndex={currentQuestionIndex}
                onAnswer={handleAnswer}
                userName={userData.name}
              />
            )}

            {phase === 'results' && userData && (
              <ResultScreen 
                userData={userData}
                answers={answers}
                onReset={resetQuiz}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;