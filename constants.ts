import { Question, AssessmentResult, Answers, ExperienceLevel } from './types';

export const APP_TITLE = "Diagnóstico de Madurez de IA";

// --- CONFIGURACIÓN DE GOOGLE SHEETS ---
export const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeXGH9RWprB3Ef0N1BnQBJ8OoPVfiiJ6GC436AsTonvErQkcw/formResponse"; 
export const GOOGLE_FORM_ENTRY_NAME = "entry.809885765";
export const GOOGLE_FORM_ENTRY_ROLE = "entry.1640079808";
export const GOOGLE_FORM_ENTRY_EMAIL = "entry.814121095";
// --------------------------------------

export const QUESTIONS: Question[] = [
  // --- SECTION A: OPERATIONAL MASTERY (AXIS X - TECH) ---
  {
    id: 1,
    category: "TECH",
    text: "Tienes un PDF de 40 páginas con una nueva regulación y necesitas saber si afecta a tu empresa. ¿Qué haces?",
    options: [
      { text: "Lo leo completo y subrayo manualmente.", points: 0 },
      { text: "Copio y pego párrafos en ChatGPT gratuito.", points: 3 },
      { text: "Subo el archivo a una IA (Claude/Gemini) y pido tabla comparativa.", points: 7 },
      { text: "Uso un script/GPT personalizado que analiza el documento automáticamente.", points: 10 }
    ]
  },
  {
    id: 2,
    category: "TECH",
    text: "Debes enviar un correo delicado a un cliente molesto. ¿Cuál es tu flujo?",
    options: [
      { text: "Lo escribo yo mismo desde cero.", points: 1 },
      { text: "Le pido a la IA: 'Escribe un correo de disculpa'.", points: 3 },
      { text: "Doy contexto clave a la IA y le pido un borrador con tono empático.", points: 7 },
      { text: "Uso una automatización que detecta el tono y sugiere borradores según manual de estilo.", points: 10 }
    ]
  },
  {
    id: 3,
    category: "TECH",
    text: "Tu Director te pide analizar la 'Encuesta de Satisfacción Laboral' (Excel) para ver por qué hay rotación en TI.",
    options: [
      { text: "Filtro el Excel manualmente y leo comentarios uno por uno.", points: 0 },
      { text: "Pregunto a ChatGPT causas generales y busco si aplican.", points: 3 },
      { text: "Subo el Excel anonimizado a Data Analysis y pido cruce de variables y gráficas.", points: 8 },
      { text: "Tengo un dashboard IA que procesa encuestas en tiempo real y alerta bajadas de sentimiento.", points: 10 }
    ]
  },
  {
    id: 4,
    category: "TECH",
    text: "La IA te da una respuesta que parece correcta pero contiene un dato falso (alucinación).",
    options: [
      { text: "No me doy cuenta y lo uso.", points: 0 },
      { text: "Googleo el dato para verificar.", points: 4 },
      { text: "Tengo un proceso de Fact-Checking riguroso con fuentes oficiales.", points: 8 },
      { text: "Diseño prompts con restricciones 'anti-alucinación' desde el origen.", points: 10 }
    ]
  },
  // --- SECTION B: STRATEGIC MATURITY (AXIS Y - STRATEGY) ---
  {
    id: 5,
    category: "STRATEGY",
    text: "Encuentras una herramienta de IA nueva increíble para video. ¿Qué haces?",
    options: [
      { text: "Me registro con correo corporativo y subo datos reales.", points: -5 },
      { text: "Uso correo personal y datos ficticios para probar.", points: 5 },
      { text: "Reviso términos de privacidad antes de usarla.", points: 8 },
      { text: "Solicito auditoría de IT/Legal antes de considerarla.", points: 10 }
    ]
  },
  {
    id: 6,
    category: "STRATEGY",
    text: "¿Cómo decides cuándo usar IA en un proyecto?",
    options: [
      { text: "Cuando tengo flojera o prisa.", points: 1 },
      { text: "Cuando recuerdo que existe la herramienta.", points: 3 },
      { text: "Evalúo si la tarea es repetitiva, de datos o creativa (Criterio ROI).", points: 7 },
      { text: "Tengo un mapa de procesos 'Human-in-the-loop' definido.", points: 10 }
    ]
  },
  {
    id: 7,
    category: "STRATEGY",
    text: "Un empleado quiere usar ChatGPT para filtrar currículums. ¿Qué respondes?",
    options: [
      { text: "¡Sí! Que empiece mañana.", points: 0 },
      { text: "No, la IA no tiene criterio.", points: 2 },
      { text: "Sí, pero anonimizando datos personales (PII) primero.", points: 7 },
      { text: "Solo para filtrado técnico (Hard Skills), auditando sesgos.", points: 10 }
    ]
  },
  {
    id: 8,
    category: "STRATEGY",
    text: "¿Cuál es tu rol actual frente a la adopción de IA en la empresa?",
    options: [
      { text: "Espectador: Espero instrucciones.", points: 0 },
      { text: "Usuario Silencioso: La uso solo para mí.", points: 3 },
      { text: "Evangelista: Comparto tips informalmente.", points: 7 },
      { text: "Patrocinador: Impulso presupuesto y políticas oficiales.", points: 10 }
    ]
  },
  {
    id: 9,
    category: "STRATEGY",
    text: "No hay presupuesto para IA este año. ¿Qué haces?",
    options: [
      { text: "Me resigno.", points: 0 },
      { text: "Uso versiones gratuitas por mi cuenta.", points: 3 },
      { text: "Preparo un caso de negocio para un piloto pequeño.", points: 8 },
      { text: "Reasigno partidas para financiar la transformación.", points: 10 }
    ]
  },
  {
    id: 10,
    category: "STRATEGY",
    text: "¿Cómo ves tu puesto en 3 años?",
    options: [
      { text: "Me preocupa que me reemplacen.", points: 0 },
      { text: "Igual, esto es una moda.", points: 1 },
      { text: "Haciendo lo mismo pero más rápido.", points: 6 },
      { text: "Evolucionado a orquestador de sistemas y estrategia.", points: 10 }
    ]
  }
];

export const getResult = (answers: Answers): AssessmentResult => {
  // 1. Calculate Axis Scores
  let techScore = 0;
  let strategyScore = 0;

  Object.entries(answers).forEach(([questionId, points]) => {
    const q = QUESTIONS.find(q => q.id === parseInt(questionId));
    if (q) {
      if (q.category === 'TECH') {
        techScore += points;
      } else if (q.category === 'STRATEGY') {
        strategyScore += points;
      }
    }
  });

  // 2. Dynamic Normalization
  // Calculate max possible points per category dynamically to ensure the engine is robust to question changes.
  const maxTechPoints = QUESTIONS
    .filter(q => q.category === 'TECH')
    .reduce((acc, q) => acc + Math.max(...q.options.map(o => o.points)), 0);

  const maxStrategyPoints = QUESTIONS
    .filter(q => q.category === 'STRATEGY')
    .reduce((acc, q) => acc + Math.max(...q.options.map(o => o.points)), 0);

  const finalTechScore = Math.max(0, techScore);
  const finalStrategyScore = Math.max(0, strategyScore);

  const techPercent = maxTechPoints > 0 ? (finalTechScore / maxTechPoints) * 100 : 0;
  const strategyPercent = maxStrategyPoints > 0 ? (finalStrategyScore / maxStrategyPoints) * 100 : 0;

  // 3. Determine Profile (The 4 Quadrants)
  // Threshold: 50%
  const isHighTech = techPercent >= 50;
  const isHighStrategy = strategyPercent >= 50;

  // QUADRANT 1: < 50 Tech, < 50 Strategy
  if (!isHighTech && !isHighStrategy) {
    return {
      techScore: finalTechScore,
      strategyScore: finalStrategyScore,
      levelTitle: "EXPLORADOR CURIOSO",
      shortDescription: "Tienes interés, pero aún no has dado el salto operativo ni estratégico.",
      fullDescription: "Estás en la etapa de descubrimiento. Eres consciente de que la IA existe y tienes curiosidad, pero tu uso es esporádico o básico. Aún no aplicas herramientas de forma sistemática en tu trabajo diario ni participas activamente en la definición de estrategias organizacionales. Tu mayor oportunidad está en pasar de la observación a la experimentación activa.",
      quote: "\"La curiosidad es el primer paso, pero la acción es lo que genera resultados.\"",
      whyFits: [
        `Maestría Operativa baja (${techPercent.toFixed(0)}%): Uso limitado de herramientas.`,
        `Madurez Estratégica baja (${strategyPercent.toFixed(0)}%): Falta de visión de gobernanza.`,
        "Enfoque de espectador ante la tecnología."
      ],
      behaviors: [
        "Usar IA solo cuando alguien más te lo sugiere.",
        "Dudas sobre qué herramientas son seguras o útiles.",
        "Realizar manualmente tareas que podrían automatizarse."
      ],
      challenges: [
        "Vencer el miedo a 'romper algo'.",
        "Desconocimiento de casos de uso prácticos.",
        "Sensación de estar quedándose atrás."
      ],
      recommendations: [
        "Dedica 15 minutos diarios a probar una herramienta de IA.",
        "Identifica una tarea repetitiva semanal y automatízala.",
        "Busca formación básica en prompting."
      ],
      color: "#64748b" // Slate
    };
  }

  // QUADRANT 2: >= 50 Tech, < 50 Strategy
  if (isHighTech && !isHighStrategy) {
    return {
      techScore: finalTechScore,
      strategyScore: finalStrategyScore,
      levelTitle: "TÉCNICO AISLADO",
      shortDescription: "Alto dominio de herramientas, pero con riesgos de visión y gobernanza.",
      fullDescription: "Eres un operador táctico muy hábil. Sabes cómo hacer que la IA trabaje para ti y resuelva problemas inmediatos. Sin embargo, operas en un silo, posiblemente utilizando 'Shadow AI' (herramientas no aprobadas) y sin alinear tus esfuerzos con los objetivos o políticas de seguridad de la empresa. Tu potencia técnica necesita dirección estratégica.",
      quote: "\"La tecnología es solo una herramienta; la estrategia es cómo la usas para aportar valor.\"",
      whyFits: [
        `Alta Maestría Operativa (${techPercent.toFixed(0)}%): Dominas la ejecución.`,
        `Baja Madurez Estratégica (${strategyPercent.toFixed(0)}%): Riesgo de uso no regulado.`,
        "Enfoque en la eficiencia individual sobre la seguridad corporativa."
      ],
      behaviors: [
        "Probar cada nueva herramienta que sale al mercado.",
        "Saltarse protocolos de seguridad por agilidad.",
        "Resolver problemas complejos sin documentar el proceso."
      ],
      challenges: [
        "Riesgos de seguridad de datos y privacidad.",
        "Dificultad para justificar el ROI a la dirección.",
        "Falta de escalabilidad de tus soluciones."
      ],
      recommendations: [
        "Revisa las políticas de IA de tu empresa antes de usar herramientas.",
        "Documenta tus flujos de trabajo para que otros puedan replicarlos.",
        "Conecta tus automatizaciones con los KPIs del negocio."
      ],
      color: "#eab308" // Yellow/Amber
    };
  }

  // QUADRANT 3: < 50 Tech, >= 50 Strategy
  if (!isHighTech && isHighStrategy) {
    return {
      techScore: finalTechScore,
      strategyScore: finalStrategyScore,
      levelTitle: "VISIONARIO TEÓRICO",
      shortDescription: "Entiendes el impacto y la ética, pero te falta ejecución práctica.",
      fullDescription: "Tienes una visión clara de hacia dónde debe ir la organización con la IA. Entiendes los riesgos éticos, la gobernanza y el impacto en el negocio. Sin embargo, te falta 'barro'. Al no utilizar las herramientas intensivamente, tus estrategias pueden volverse abstractas o desconectadas de la realidad técnica de lo que es posible hoy en día.",
      quote: "\"La estrategia sin ejecución es solo una alucinación.\"",
      whyFits: [
        `Alta Madurez Estratégica (${strategyPercent.toFixed(0)}%): Visión clara y ética.`,
        `Baja Maestría Operativa (${techPercent.toFixed(0)}%): Falta de práctica real.`,
        "Liderazgo conceptual sin validación técnica."
      ],
      behaviors: [
        "Diseñar políticas de IA sin haber usado las herramientas.",
        "Frenar iniciativas por precaución excesiva.",
        "Delegar toda la ejecución técnica."
      ],
      challenges: [
        "Perder credibilidad ante los equipos técnicos.",
        "Proponer soluciones que la tecnología actual no soporta.",
        "Lentitud en la implementación."
      ],
      recommendations: [
        "Realiza 'Reverse Mentoring' con un perfil técnico.",
        "Oblígate a usar IA para una tarea estratégica real.",
        "Lanza pilotos pequeños antes de grandes regulaciones."
      ],
      color: "#3b82f6" // Blue
    };
  }

  // QUADRANT 4: >= 50 Tech, >= 50 Strategy
  return {
    techScore: finalTechScore,
    strategyScore: finalStrategyScore,
    levelTitle: "ARQUITECTO DE TRANSFORMACIÓN",
    shortDescription: "Líder integral que combina maestría técnica con visión de negocio.",
    fullDescription: "Representas el perfil ideal para la era de la IA. No solo dominas las herramientas técnicas, sino que las aplicas con un criterio estratégico impecable. Entiendes cómo equilibrar la innovación con la seguridad y cómo escalar soluciones que transforman no solo tu trabajo, sino el de toda la organización.",
    quote: "\"El verdadero poder de la IA está en la intersección de la tecnología y la humanidad.\"",
    whyFits: [
      `Alta Maestría Operativa (${techPercent.toFixed(0)}%): Ejecución excelente.`,
      `Alta Madurez Estratégica (${strategyPercent.toFixed(0)}%): Visión de negocio.`,
      "Capacidad para liderar y transformar."
    ],
    behaviors: [
      "Crear sistemas escalables y seguros.",
      "Mentorear a otros en el uso ético de IA.",
      "Impulsar la innovación alineada a objetivos corporativos."
    ],
    challenges: [
      "Mantenerse actualizado en un campo que cambia a diario.",
      "Gestionar la resistencia al cambio en la organización.",
      "Evitar el burnout por ser el referente único."
    ],
    recommendations: [
      "Lidera un Centro de Excelencia de IA.",
      "Comparte tus casos de éxito en foros externos.",
      "Ayuda a definir la estrategia de IA de la compañía a largo plazo."
    ],
    color: "#7c3aed" // Violet/Purple
  };
};

export const getGenerationalInsight = (profileTitle: string, experienceLevel: ExperienceLevel): string => {
  const tips: Record<string, Record<ExperienceLevel, string>> = {
    "EXPLORADOR CURIOSO": {
      "JUNIOR": "💡 Insight Generacional: Tu curiosidad es tu motor, pero necesitas estructura. No saltes de herramienta en herramienta sin dominar ninguna; enfócate en una a fondo.",
      "MID": "💡 Insight Generacional: Estás en una zona peligrosa. A tu nivel, no saber usar IA te dejará atrás rápido frente a los juniors que vienen empujando. Empieza hoy.",
      "SENIOR": "💡 Insight Generacional: Es normal sentir rechazo al cambio, pero tu experiencia de negocio combinada con IA sería imparable. Empieza con casos simples de estrategia."
    },
    "TÉCNICO AISLADO": {
      "JUNIOR": "💡 Insight Generacional: Tu dominio nativo digital es tu superpoder, pero la falta de visión estratégica es tu talón de Aquiles. No uses la IA solo para acabar rápido; úsala para presentar análisis que sorprendan.",
      "MID": "💡 Insight Generacional: Eres el 'bombero' que apaga fuegos con IA, pero te falta delegar y crear sistemas. Estás operando demasiado; empieza a dirigir con tecnología.",
      "SENIOR": "💡 Insight Generacional: Cuidado: puedes estar haciendo micro-management con tecnología nueva. Tu rol no es escribir el mejor prompt, sino definir el mejor objetivo para el equipo."
    },
    "VISIONARIO TEÓRICO": {
      "JUNIOR": "💡 Insight Generacional: Tienes buenas ideas, pero sin ejecución técnica ('barro'), no valen mucho en el mercado actual. Aprende cómo funcionan las herramientas 'por debajo'.",
      "MID": "💡 Insight Generacional: Te frustras porque los equipos no ejecutan tu visión. El problema es que pides cosas que la IA aún no hace bien. Necesitas 'ensuciarte las manos' para entender los límites.",
      "SENIOR": "💡 Insight Generacional: Entiendes el negocio mejor que nadie, pero tu desconexión con la herramienta te hace vulnerable. Tu reto no es volverte programador, sino entender la lógica del prompt para dirigir."
    },
    "ARQUITECTO DE TRANSFORMACIÓN": {
      "JUNIOR": "💡 Insight Generacional: Eres un 'unicornio' en el mercado. Aprovéchalo para ascender, pero mantén la humildad: la tecnología cambia cada semana, los fundamentos de negocio no.",
      "MID": "💡 Insight Generacional: Estás en el punto dulce de tu carrera. Tu desafío ahora es escalar tu conocimiento y evitar ser el cuello de botella de la innovación en tu empresa.",
      "SENIOR": "💡 Insight Generacional: Eres el líder que toda empresa busca. Tu legado será construir una cultura de IA ética y productiva, no solo implementar software."
    }
  };

  return tips[profileTitle]?.[experienceLevel] || "💡 Consejo: Sigue explorando la intersección entre tecnología y estrategia.";
};