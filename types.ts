export type Phase = 'intro' | 'register' | 'assessment' | 'results';

export type ExperienceLevel = 'JUNIOR' | 'MID' | 'SENIOR';

export interface UserData {
  name: string;
  role: string;
  email: string;
  experienceLevel: ExperienceLevel;
}

export interface Option {
  text: string;
  points: number; // Changed from simple value to specific points for weighting
}

export interface Question {
  id: number;
  category: 'TECH' | 'STRATEGY'; // Axis X (Tech) or Axis Y (Strategy)
  text: string;
  options: Option[];
}

export interface AssessmentResult {
  techScore: number;
  strategyScore: number;
  levelTitle: string;
  shortDescription: string;
  fullDescription: string;
  quote: string;
  whyFits: string[];
  behaviors: string[];
  challenges: string[];
  recommendations: string[];
  color: string;
}

export type Answers = Record<number, number>;