import React, { useState } from 'react';
import { UserData, ExperienceLevel } from '../types';
import { Mail, ArrowRight, Lightbulb, BarChart, Clock, Loader2, BrainCircuit, Briefcase } from 'lucide-react';
import { 
    GOOGLE_FORM_ACTION_URL, 
    GOOGLE_FORM_ENTRY_NAME, 
    GOOGLE_FORM_ENTRY_ROLE, 
    GOOGLE_FORM_ENTRY_EMAIL 
} from '../constants';

interface RegistrationScreenProps {
  onComplete: (data: UserData) => void;
}

const RegistrationScreen: React.FC<RegistrationScreenProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | ''>('');
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim() || !email.trim() || !experienceLevel) {
      setError('Por favor completa todos los campos profesionales para continuar.');
      return;
    }
    if (!acceptedDisclaimer) {
      setError('Debes aceptar el aviso legal para generar el reporte.');
      return;
    }
    
    setIsSubmitting(true);

    if (GOOGLE_FORM_ACTION_URL && GOOGLE_FORM_ENTRY_NAME) {
        try {
            const formData = new FormData();
            formData.append(GOOGLE_FORM_ENTRY_NAME, name);
            formData.append(GOOGLE_FORM_ENTRY_ROLE, role);
            formData.append(GOOGLE_FORM_ENTRY_EMAIL, email);
            // Append experience level if you have a field for it, or append to role for now
            // formData.append("entry.EXPERIENCE_ID", experienceLevel); 

            await fetch(GOOGLE_FORM_ACTION_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            });
        } catch (err) {
            console.error("Error saving data", err);
        }
    }

    setTimeout(() => {
        setIsSubmitting(false);
        onComplete({ name, role, email, experienceLevel: experienceLevel as ExperienceLevel });
    }, 500);
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in pb-12">
        {/* Header Section */}
        <div className="text-center mb-10 bg-slate-800 text-white py-12 px-6 rounded-3xl shadow-lg border-b-4 border-brand-500">
            <div className="inline-block p-4 bg-white/10 rounded-full mb-6">
                <BrainCircuit className="text-brand-400" size={56} />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Diagnóstico de Madurez de IA</h1>
            <p className="mt-4 text-slate-300 text-xl max-w-3xl mx-auto">
                Evaluación Estratégica para Líderes y Profesionales
            </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
             <div className="bg-white p-10 rounded-2xl border border-slate-200 h-full shadow-sm">
                <h3 className="flex items-center text-slate-800 font-bold mb-6 text-xl">
                    <Lightbulb size={28} className="mr-3 text-brand-500" />
                    Propósito del Diagnóstico
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                    Esta herramienta evalúa su capacidad actual para apalancar la Inteligencia Artificial en entornos corporativos. Analizamos tanto la ejecución técnica como la visión de gobernanza para determinar su perfil de liderazgo.
                </p>
            </div>

            <div className="bg-white p-10 rounded-2xl border border-slate-200 h-full shadow-sm">
                <h3 className="flex items-center text-slate-800 font-bold mb-6 text-xl">
                    <BarChart size={28} className="mr-3 text-brand-500" />
                    Reporte Ejecutivo
                </h3>
                <ul className="text-slate-600 text-lg space-y-3">
                    <li className="flex items-start">
                        <span className="mr-2 text-brand-500 font-bold">•</span> Matriz de Posicionamiento (Tech vs Strategy)
                    </li>
                    <li className="flex items-start">
                        <span className="mr-2 text-brand-500 font-bold">•</span> Análisis de brechas y riesgos operativos
                    </li>
                    <li className="flex items-start">
                        <span className="mr-2 text-brand-500 font-bold">•</span> Recomendaciones para escalar al siguiente nivel
                    </li>
                </ul>
            </div>
        </div>

        {/* Form Section */}
        <div className="bg-white p-10 md:p-12 rounded-3xl shadow-xl border-t-8 border-slate-700 w-full">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center justify-center md:justify-start">
                <Mail size={28} className="mr-3 text-slate-600" />
                Datos del Perfil Profesional
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                         <div>
                            <label htmlFor="name" className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider">Nombre Completo</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isSubmitting}
                                className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                                placeholder="Ej. Juan Pérez"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider">Correo Corporativo</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isSubmitting}
                                className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                                placeholder="nombre@empresa.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="role" className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider">Cargo / Rol Actual</label>
                            <input
                                type="text"
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                disabled={isSubmitting}
                                className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                                placeholder="Ej. Director de Operaciones"
                            />
                        </div>

                         <div>
                            <label htmlFor="experience" className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider">Nivel de Experiencia Profesional</label>
                            <div className="relative">
                                <select
                                    id="experience"
                                    value={experienceLevel}
                                    onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
                                    disabled={isSubmitting}
                                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors appearance-none cursor-pointer"
                                >
                                    <option value="" disabled>Selecciona tu nivel...</option>
                                    <option value="JUNIOR">Junior / Iniciando (0-5 años)</option>
                                    <option value="MID">Intermedio / Manager (5-15 años)</option>
                                    <option value="SENIOR">Senior / Directivo (+15 años)</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                                    <Briefcase size={20} />
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">Esto nos ayuda a calibrar las recomendaciones del reporte.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                        AVISO DE PRIVACIDAD: Los datos recolectados se utilizan exclusivamente para la generación del reporte de diagnóstico. No compartimos información con terceros. Al continuar, usted acepta los términos de uso de esta herramienta de evaluación profesional.
                    </p>
                    <label className="flex items-center cursor-pointer p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <input 
                            type="checkbox" 
                            checked={acceptedDisclaimer}
                            onChange={(e) => setAcceptedDisclaimer(e.target.checked)}
                            disabled={isSubmitting}
                            className="w-5 h-5 text-brand-600 rounded border-slate-300 focus:ring-brand-500" 
                        />
                        <span className="ml-3 text-sm font-medium text-slate-700">Acepto los términos y condiciones del servicio.</span>
                    </label>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100 text-center font-medium">
                        {error}
                    </div>
                )}

                <div className="flex flex-col items-center pt-4">
                    <button
                        type="submit"
                        className="w-full md:w-auto md:min-w-[350px] bg-brand-600 text-white font-bold py-4 px-8 rounded-lg text-lg cursor-not-allowed flex items-center justify-center gap-3 transition-all shadow hover:shadow-lg disabled:opacity-50 disabled:shadow-none"
                        disabled={!acceptedDisclaimer || isSubmitting}
                        style={acceptedDisclaimer ? { cursor: 'pointer' } : {}}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin" size={24} />
                                Generando Perfil...
                            </>
                        ) : (
                            <>
                                Iniciar Evaluación
                                <ArrowRight size={24} />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default RegistrationScreen;