/**
 * Types pour l'application Éclipse - NOVA ADO
 */

export type Duration = 2 | 3 | 5;
export type Intensity = "soft" | "normal" | "intense";
export type DiscretionLevel = "public_ok" | "discret" | "prive";
export type EvidenceLevel = "A" | "B" | "C";
export type Preset = "A" | "B";

export interface TimerPhase {
  name: string;
  duration: number; // en secondes
}

export interface TimerConfig {
  phases: TimerPhase[];
  cycles: number;
  totalDuration: number; // en secondes
}

export interface CanadaSource {
  org: string;
  title: string;
  year?: number | null;
  url?: string;
}

export interface ScientificSource {
  title: string;
  year?: number | null;
  url?: string;
}

export interface Evidence {
  isCanadaValidated: boolean;
  level: EvidenceLevel;
  canadaSources: CanadaSource[];
  scientificSources: ScientificSource[];
  notes?: string;
  needsReview: boolean;
}

export interface Technique {
  id: string;
  title: string;
  category: string;
  duration: Duration;
  intensity: Intensity;
  instructions: string[];
  note: string | null;
  timer: boolean;
  timerConfig: TimerConfig | null;
  material: string | null;
  tags: string[];
  premium: boolean;
  // Champs v1.1.0
  durationSeconds: number;
  discretionLevel: DiscretionLevel;
  presets: Preset[];
  evidence: Evidence;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  premium: boolean;
  order: number;
}

// Feedback après une technique
export type Feedback = "helped" | "meh" | "nope";

// Entrée dans l'historique (V1.1)
export interface HistoryEntry {
  techniqueId: string;
  timestamp: number;
  feedback?: Feedback;
}

// État du localStorage
export interface EclipseStore {
  favorites: string[]; // IDs des techniques
  history: HistoryEntry[];
  isPremium: boolean;
  premiumCode?: string;
}
