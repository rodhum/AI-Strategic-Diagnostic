import React, { useEffect, useRef, useState } from 'react';
import { Answers, UserData } from '../types';
import { getResult, getGenerationalInsight } from '../constants';
import { RefreshCw, CheckCircle2, Award, Download, BarChart3, Rocket, Lock, Users, Lightbulb } from 'lucide-react';

interface ResultScreenProps {
  userData: UserData;
  answers: Answers;
  onReset: () => void;
}

// Helper component for Scroll Animations
const ScrollReveal = ({ children, delay = 0 }: { children?: React.ReactNode, delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '50px' // Start slightly before it enters the viewport
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div 
      ref={ref} 
      className={`reveal-on-scroll ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ResultScreen: React.FC<ResultScreenProps> = ({ userData, answers, onReset }) => {
  // Calculate Result using matrix logic
  const result = getResult(answers);
  const generationalTip = getGenerationalInsight(result.levelTitle, userData.experienceLevel);
  
  // Calculate percentages for visualization
  const techPercent = Math.min(100, Math.max(0, (result.techScore / 40) * 100));
  const stratPercent = Math.min(100, Math.max(0, (result.strategyScore / 60) * 100));

  return (
    <div className="max-w-6xl mx-auto pb-12 animate-fade-in print:pb-0">
      
      {/* 1. Dark Header Card */}
      <div className="bg-slate-700 text-white rounded-t-3xl p-12 text-center shadow-lg relative overflow-hidden animate-fade-in print:bg-slate-700 print:text-white">
        <div className="relative z-10">
            <div className="inline-block p-4 bg-white/10 rounded-full mb-6">
                <Award size={48} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3 whitespace-normal md:whitespace-nowrap leading-tight">
                Perfil de Madurez en IA
            </h1>
            <p className="text-slate-300 text-xl">
                Análisis multidimensional: Operativo vs. Estratégico
            </p>
        </div>
      </div>

      {/* 2. Stage Result Banner */}
      <ScrollReveal delay={100}>
        <div className="bg-[#ebe3d9] border border-[#d6c9b8] p-10 text-center mb-10 shadow-sm relative print:bg-[#ebe3d9]">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-700 mb-6 uppercase tracking-wider">
                Tu Arquetipo de IA es:
            </h2>
            <div className="text-4xl md:text-6xl font-extrabold mb-4" style={{ color: result.color }}>
            {result.levelTitle}
            </div>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: result.color }}></div>
            <p className="text-slate-700 italic text-2xl font-serif max-w-4xl mx-auto leading-relaxed">"{result.shortDescription}"</p>
        </div>
      </ScrollReveal>

      {/* 3. Matrix Scores Visualization */}
      <ScrollReveal delay={150}>
        <div className="bg-white p-8 md:p-10 mb-10 rounded-xl shadow-sm border border-slate-200">
           <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              {/* Tech Score */}
              <div className="flex-1 w-full max-w-sm">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-slate-600 font-bold uppercase text-sm">Maestría Operativa (Tech)</span>
                  <span className="text-2xl font-bold text-blue-600">{techPercent.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-4">
                  <div className="bg-blue-500 h-4 rounded-full transition-all duration-1000" style={{ width: `${techPercent}%` }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">Habilidad técnica, uso de herramientas y prompts.</p>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-20 bg-slate-200"></div>

              {/* Strategy Score */}
              <div className="flex-1 w-full max-w-sm">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-slate-600 font-bold uppercase text-sm">Madurez Estratégica</span>
                  <span className="text-2xl font-bold text-purple-600">{stratPercent.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-4">
                  <div className="bg-purple-500 h-4 rounded-full transition-all duration-1000" style={{ width: `${stratPercent}%` }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">Gobernanza, ética, seguridad y visión de negocio.</p>
              </div>
           </div>
        </div>
      </ScrollReveal>

      {/* 4. Detailed Description Box */}
      <ScrollReveal delay={200}>
        <div className="bg-[#e8e6df] border-l-8 p-8 md:p-10 mb-10 rounded-r-xl shadow-sm print:bg-[#e8e6df]" style={{ borderColor: result.color }}>
            <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="mt-1 hidden md:block" style={{ color: result.color }}>
                    <BarChart3 size={40} />
                </div>
                <div>
                    <h3 className="font-bold text-slate-700 text-2xl mb-4">
                        Análisis Detallado
                    </h3>
                    <p className="text-slate-700 leading-loose text-xl mb-6">
                    Hola <strong>{userData.name}</strong>. {result.fullDescription}
                    </p>
                    
                    {/* Generational Insight Block */}
                    <div className="bg-white/50 border border-slate-300 p-6 rounded-lg flex items-start gap-4">
                        <Lightbulb className="text-yellow-600 shrink-0 mt-1" size={24} />
                        <p className="text-slate-800 font-medium italic text-lg leading-relaxed">
                            {generationalTip}
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </ScrollReveal>

      {/* 5. Why This Stage Fits You */}
      <ScrollReveal>
        <div className="bg-white border border-slate-200 rounded-2xl p-10 mb-10 shadow-sm">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3" style={{ color: result.color }}>
                <span className="text-4xl">☆</span> Por Qué encajas en este perfil
            </h3>
            <ul className="space-y-5">
                {result.whyFits.map((item, idx) => (
                    <li key={idx} className="text-slate-700 text-xl flex items-start gap-4">
                        <span className="text-slate-400 mt-1">•</span> {item}
                    </li>
                ))}
            </ul>
        </div>
      </ScrollReveal>

      {/* 6. Quote */}
      <ScrollReveal>
        <div className="bg-[#ebe3d9] p-10 rounded-2xl mb-10 text-center italic text-slate-700 font-medium text-2xl font-serif print:bg-[#ebe3d9]">
            {result.quote}
        </div>
      </ScrollReveal>

      {/* 7. Behaviors & Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Behaviors */}
        <ScrollReveal>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm h-full">
                <h3 className="text-2xl font-bold text-slate-600 mb-6 flex items-center gap-3">
                    <CheckCircle2 size={32} /> Comportamientos
                </h3>
                <ul className="space-y-5">
                    {result.behaviors.map((item, idx) => (
                        <li key={idx} className="text-slate-700 text-lg flex items-start gap-3">
                            <span className="text-slate-400 mt-1">→</span> {item}
                        </li>
                    ))}
                </ul>
            </div>
        </ScrollReveal>
        
        {/* Challenges */}
        <ScrollReveal delay={150}>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm h-full">
                <h3 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-3">
                    <span className="text-3xl">⚠️</span> Riesgos y Desafíos
                </h3>
                <ul className="space-y-5">
                    {result.challenges.map((item, idx) => (
                        <li key={idx} className="text-slate-700 text-lg flex items-start gap-3">
                            <span className="text-slate-400 mt-1">→</span> {item}
                        </li>
                    ))}
                </ul>
            </div>
        </ScrollReveal>
      </div>

      {/* 8. THE PITCH (Replaces Action Plan) */}
      <ScrollReveal>
        <div className="bg-slate-900 text-white p-10 rounded-2xl mb-10 shadow-xl overflow-hidden relative print:bg-slate-900 print:text-white">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-6 text-brand-400 uppercase tracking-wide">
                    ¿CÓMO ACELERAR TU EVOLUCIÓN?
                </h3>
                
                <div className="space-y-6 text-lg">
                    <p className="text-slate-300 leading-relaxed">
                        Probablemente has pensado en tomar un curso online. Pero los cursos caducan rápido.
                    </p>
                    
                    <div className="bg-white/10 p-6 rounded-xl border border-white/10 print:border-slate-600">
                        <strong className="block text-2xl text-white mb-2">Bienvenido al Campus Virtual GCC.</strong>
                        <p className="text-slate-200">No somos una escuela. Somos tu <strong>Centro de Excelencia y Consultoría Digital</strong>.</p>
                    </div>

                    <p className="text-slate-300">Mientras otros te dan teoría, nosotros te entregamos:</p>
                    
                    <ul className="space-y-4 mt-4">
                        <li className="flex items-start gap-3">
                            <Rocket className="text-brand-500 shrink-0 mt-1" size={24} />
                            <span><strong>Consultoría On-Demand</strong> con expertos de negocio.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Lock className="text-brand-500 shrink-0 mt-1" size={24} />
                            <span><strong>Herramientas y Políticas</strong> listas para implementar (Copy-Paste).</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Users className="text-brand-500 shrink-0 mt-1" size={24} />
                            <span>Una <strong>Comunidad exclusiva</strong> de Directivos y Líderes de RRHH.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </ScrollReveal>

      {/* 9. Video REMOVED */}

      {/* 10. NEXT STEPS (Replaces CTA Box) */}
      <ScrollReveal>
        <div className="bg-white border-2 border-brand-100 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-400 to-brand-600 print:hidden"></div>
            
            <h3 className="text-3xl md:text-4xl font-black text-slate-800 mb-6">
                TU SIGUIENTE PASO INTELIGENTE
            </h3>
            
            <div className="text-left max-w-2xl mx-auto mb-10">
                <p className="text-xl text-slate-600 mb-6 text-center">
                    No empieces desde cero. Activa tu <strong>Concierge Digital</strong>.
                </p>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <p className="font-semibold text-slate-700 mb-4">Al ingresar, nuestro sistema usará este diagnóstico para personalizar tu Onboarding:</p>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-slate-700">
                            <span className="bg-brand-100 text-brand-700 font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0 print:border print:border-brand-700">1</span>
                            <span>Configurará tu panel según tu nivel: <span className="font-bold text-brand-600">{result.levelTitle}</span>.</span>
                        </li>
                        <li className="flex items-center gap-3 text-slate-700">
                            <span className="bg-brand-100 text-brand-700 font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0 print:border print:border-brand-700">2</span>
                            <span>Desbloqueará tu <strong>"Kit de Inicio Estratégico"</strong>.</span>
                        </li>
                        <li className="flex items-center gap-3 text-slate-700">
                            <span className="bg-brand-100 text-brand-700 font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0 print:border print:border-brand-700">3</span>
                            <span>Te dará una ruta de navegación clara para tu primera victoria.</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center gap-4 items-center print:hidden">
                <button 
                    onClick={() => window.open('https://campus.gcc.com', '_blank')}
                    className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-5 bg-brand-600 text-white font-black text-xl rounded-xl hover:bg-brand-700 transition-all shadow-lg hover:shadow-brand-500/30 transform hover:-translate-y-1 animate-pulse"
                >
                    INGRESAR AL CAMPUS Y RECLAMAR MI KIT
                    <Rocket size={24} />
                </button>
            </div>
             <div className="mt-6 flex flex-col md:flex-row justify-center gap-6 print:hidden">
                <button 
                    onClick={() => window.print()}
                    className="inline-flex items-center justify-center gap-2 text-slate-400 hover:text-slate-600 font-medium text-sm underline decoration-slate-300 underline-offset-4 transition-colors"
                >
                    <Download size={16} />
                    Guardar copia de mi diagnóstico (PDF)
                </button>
                 <button 
                    onClick={onReset}
                    className="inline-flex items-center justify-center gap-2 text-slate-400 hover:text-slate-600 font-medium text-sm underline decoration-slate-300 underline-offset-4 transition-colors"
                >
                    <RefreshCw size={16} />
                    Reiniciar
                </button>
            </div>
        </div>
      </ScrollReveal>

      {/* 11. Footer Notice */}
      <div className="mt-12 bg-[#ebe3d9] p-8 rounded-xl text-center print:bg-[#ebe3d9]">
        <h4 className="font-bold text-slate-700 text-lg mb-2">¡Gracias por completar el Explorador de Habilidades!</h4>
        <p className="text-base text-slate-500 mb-2">
            Resultados basados en la Matriz de Madurez de IA v2.0
        </p>
        <p className="text-sm text-slate-400 mb-2">
            Fecha: {new Date().toLocaleDateString()}
        </p>
        <p className="text-sm text-slate-400 font-medium">
            GCC ® 2025
        </p>
      </div>

    </div>
  );
};

export default ResultScreen;