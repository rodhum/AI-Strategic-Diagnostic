import React from 'react';
import { BrainCircuit, ArrowRight, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center max-w-6xl mx-auto animate-fade-in pb-12">
      
      {/* Hero Section */}
      <div className="bg-slate-800 w-full text-white rounded-3xl p-8 md:p-16 text-center mb-12 shadow-2xl relative overflow-hidden border-b-4 border-brand-500">
        <div className="relative z-10">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <BrainCircuit size={64} className="text-brand-400" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Diagnóstico de Madurez Estratégica en IA
            </h1>
            <h2 className="text-xl md:text-2xl text-slate-300 font-light mb-8 max-w-3xl mx-auto">
            Evalúa la preparación operativa y estratégica de tu perfil profesional
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed text-lg">
            La adopción de IA no es solo técnica; es estratégica. Este diagnóstico profesional analiza tu perfil en dos ejes clave: Maestría Operativa y Visión Estratégica, para determinar tu cuadrante de liderazgo en la transformación digital.
            </p>
        </div>
      </div>

      {/* What is AI Readiness */}
      <div className="w-full mb-16 text-center">
        <h3 className="text-3xl font-bold text-slate-800 mb-10">Dimensiones de la Evaluación</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          
          <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 hover:border-brand-300 transition-all duration-300">
            <div className="w-14 h-14 mx-auto bg-brand-50 rounded-full flex items-center justify-center mb-6 text-brand-600">
              <TrendingUp size={32} />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-3">Maestría Operativa</h4>
            <p className="text-slate-600 leading-relaxed text-sm">
              Análisis de tu capacidad técnica para ejecutar tareas, automatizar flujos y utilizar herramientas avanzadas de IA.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 hover:border-purple-300 transition-all duration-300">
            <div className="w-14 h-14 mx-auto bg-purple-50 rounded-full flex items-center justify-center mb-6 text-purple-600">
              <ShieldCheck size={32} />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-3">Madurez Estratégica</h4>
            <p className="text-slate-600 leading-relaxed text-sm">
              Evaluación de tu criterio en gobernanza, ética, seguridad de datos y alineación con objetivos de negocio.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 hover:border-blue-300 transition-all duration-300">
            <div className="w-14 h-14 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-600">
              <Zap size={32} />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-3">Plan de Transformación</h4>
            <p className="text-slate-600 leading-relaxed text-sm">
              Identificación de tu arquetipo de liderazgo y recomendaciones tácticas para escalar tu impacto organizacional.
            </p>
          </div>

        </div>
      </div>

      {/* The Matrix Explanation */}
      <div className="w-full bg-slate-50 py-16 px-6 rounded-3xl mb-16 border border-slate-200">
        <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">La Matriz de Competencias</h3>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg">
                Más allá de una puntuación lineal, este sistema te ubica en uno de los cuatro cuadrantes de madurez profesional.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <div className="bg-slate-200 p-6 rounded-xl text-center border-t-4 border-slate-500">
                <h5 className="font-bold text-slate-700 mb-2">Explorador Curioso</h5>
                <p className="text-xs text-slate-600">Baja Técnica / Baja Estrategia</p>
             </div>
             <div className="bg-yellow-50 p-6 rounded-xl text-center border-t-4 border-yellow-500">
                <h5 className="font-bold text-slate-800 mb-2">Técnico Aislado</h5>
                <p className="text-xs text-slate-600">Alta Técnica / Baja Estrategia</p>
             </div>
             <div className="bg-blue-50 p-6 rounded-xl text-center border-t-4 border-blue-500">
                <h5 className="font-bold text-slate-800 mb-2">Visionario Teórico</h5>
                <p className="text-xs text-slate-600">Baja Técnica / Alta Estrategia</p>
             </div>
             <div className="bg-purple-50 p-6 rounded-xl text-center border-t-4 border-purple-600 shadow-md">
                <h5 className="font-bold text-purple-900 mb-2">Arquitecto de Transformación</h5>
                <p className="text-xs text-slate-600">Alta Técnica / Alta Estrategia</p>
             </div>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="bg-slate-800 w-full text-white rounded-2xl p-10 text-center shadow-xl">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">Comienza tu Diagnóstico Profesional</h3>
        <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Evaluación confidencial de 10 puntos de control situacionales. 
            <br/><span className="text-sm opacity-70">Tiempo estimado: 4 minutos.</span>
        </p>
        <button
          onClick={onStart}
          className="bg-brand-500 hover:bg-brand-600 text-white text-lg font-bold py-4 px-10 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
        >
          Iniciar Diagnóstico
          <ArrowRight size={20} />
        </button>
      </div>

    </div>
  );
};

export default WelcomeScreen;