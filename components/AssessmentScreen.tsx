import React from 'react';
import { Question } from '../types';
import { QUESTIONS } from '../constants';

interface AssessmentScreenProps {
  currentQuestionIndex: number;
  onAnswer: (questionId: number, points: number) => void;
  userName: string;
}

const AssessmentScreen: React.FC<AssessmentScreenProps> = ({ 
  currentQuestionIndex, 
  onAnswer,
  userName
}) => {
  const question = QUESTIONS[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex) / QUESTIONS.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-semibold uppercase text-slate-500 mb-2">
          <span>Progreso</span>
          <span>Pregunta {currentQuestionIndex + 1} de {QUESTIONS.length}</span>
        </div>
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border-t-4 border-brand-500 animate-fade-in">
        <div className="mb-6">
          <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-3 ${question.category === 'TECH' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
            {question.category === 'TECH' ? 'Maestría Operativa' : 'Madurez Estratégica'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
            {question.text}
          </h2>
        </div>

        <div className="space-y-4">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onAnswer(question.id, option.points)}
              className="w-full text-left p-4 md:p-5 border-2 border-slate-100 rounded-xl hover:border-brand-400 hover:bg-brand-50 transition-all duration-200 group flex items-start"
            >
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold group-hover:bg-brand-500 group-hover:text-white transition-colors mr-4 mt-0.5">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="text-lg text-slate-700 group-hover:text-slate-900">
                {option.text}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-8 text-center text-slate-400 text-sm">
        Responde con honestidad, {userName}. No hay respuestas incorrectas.
      </div>
    </div>
  );
};

export default AssessmentScreen;