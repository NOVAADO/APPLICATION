/**
 * Types pour l'application Éclipse - NOVA ADO
 * Version 2.5.0 - Accordéon + Minuterie intégrée
 */

// === TYPES DE BASE ===

export type MoonPhase = "croissant" | "quartier" | "pleine-lune";
export type CardFormat = "levels" | "accroche" | "decroche";
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
  shortInstruction: string;    // résumé 1 ligne (accordéon replié)
  durationLabel: string;       // "10–30 sec", "30–60 sec", "1–2 min" (affichage)
  durationSeconds: number;     // borne haute en secondes (minuterie)
  timer: boolean;
  timerConfig: TimerConfig | null;
}

// === TECHNIQUE (CARTE) ===

export interface Technique {
  id: string;
  code: string;              // Code officiel : S01, D01, A01, F01, C01, P01, X01, CB01
  title: string;
  category: string;
  format: CardFormat;        // "levels" | "accroche" | "decroche"

  // Phrase d'ouverture (constat / permission / invitation)
  // Présente pour : Souffle, Défoule, Atterris, Repère, Enchaîne, Carte blanche
  // Absente pour : Accroche, Décroche
  openingPhrase: string;

  // 3 niveaux indépendants (l'ado choisit UN seul niveau)
  // Non utilisé si format === "accroche" ou "decroche"
  levels: {
    croissant: TechniqueLevel;
    quartier: TechniqueLevel;
    "pleine-lune": TechniqueLevel;
  };

  // Phrases de clôture (uniques par carte, v2.4)
  signature: string;         // ✦ quotidien, préventif
  rescue: string;            // ⚡ urgence, quand ça déborde

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
    icon: "/pictos/premier-croissant.png",
    defaultDurationLabel: "10–30 sec",
    defaultDurationSeconds: 30,
    description: "Léger, rapide, discret"
  },
  quartier: {
    icon: "/pictos/demi-lune.png",
    defaultDurationLabel: "30–60 sec",
    defaultDurationSeconds: 60,
    description: "Pause moyenne"
  },
  "pleine-lune": {
    icon: "/pictos/pleine-lune.png",
    defaultDurationLabel: "1–2 min",
    defaultDurationSeconds: 120,
    description: "Reset plus marqué"
  }
} as const;
