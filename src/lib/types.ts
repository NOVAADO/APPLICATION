/**
 * Types pour l'application Éclipse - NOVA ADO
 * Version 2.0.0 - Structure 3 niveaux par carte (Croissant / Quartier / Pleine lune)
 */

// === TYPES DE BASE ===

export type MoonPhase = "croissant" | "quartier" | "pleine-lune";
export type DiscretionLevel = "public_ok" | "discret" | "prive";
export type EvidenceLevel = "A" | "B" | "C";

// === TIMER ===

export interface TimerPhase {
  name: string;
  duration: number; // en secondes
}

export interface TimerConfig {
  phases: TimerPhase[];
  cycles: number;
  totalDuration: number; // en secondes
}

// === EVIDENCE / SOURCES ===

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

// === NIVEAU (Phase de lune) ===

export interface TechniqueLevel {
  instructions: string[];
  durationSeconds: number;
  timer: boolean;
  timerConfig: TimerConfig | null;
}

// === TECHNIQUE (CARTE) ===

export interface Technique {
  id: string;
  title: string;
  category: string;

  // Phrase d'ouverture (constat / permission / invitation)
  // Doit fonctionner même si l'ado ne fait rien
  openingPhrase: string;

  // 3 niveaux indépendants (l'ado choisit UN seul niveau)
  levels: {
    croissant: TechniqueLevel;    // 🌒 10-30s - léger, rapide, discret
    quartier: TechniqueLevel;     // 🌓 30-90s - pause moyenne
    "pleine-lune": TechniqueLevel; // 🌕 1-3 min - reset plus marqué
  };

  // Métadonnées
  note: string | null;
  material: string | null;
  tags: string[];
  premium: boolean;
  discretionLevel: DiscretionLevel;
  evidence: Evidence;
}

// === CATÉGORIE ===

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  premium: boolean;
  order: number;
}

// === FEEDBACK & HISTORIQUE ===

export type Feedback = "helped" | "meh" | "nope";

export interface HistoryEntry {
  techniqueId: string;
  level: MoonPhase; // Quel niveau a été utilisé
  timestamp: number;
  feedback?: Feedback;
}

// === STORE (localStorage) ===

export interface EclipseStore {
  favorites: string[]; // IDs des techniques
  history: HistoryEntry[];
  isPremium: boolean;
  premiumCode?: string;
  preferredLevel?: MoonPhase; // Niveau préféré de l'utilisateur
}

// === CONSTANTES UI ===

export const MOON_PHASES = {
  croissant: {
    label: "Croissant",
    emoji: "🌒",
    icon: "/pictos/premier-croissant.png",
    durationRange: "10-30s",
    description: "Léger, rapide, discret"
  },
  quartier: {
    label: "Quartier",
    emoji: "🌓",
    icon: "/pictos/demi-lune.png",
    durationRange: "30-90s",
    description: "Pause moyenne"
  },
  "pleine-lune": {
    label: "Pleine lune",
    emoji: "🌕",
    icon: "/pictos/pleine-lune.png",
    durationRange: "1-3 min",
    description: "Reset plus marqué"
  }
} as const;
