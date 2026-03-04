/**
 * Gestion des techniques - Application Éclipse
 * Version 2.6.0 - Filtrage centralisé via whitelist démo
 *
 * RÈGLE : toutes les pages consomment getAvailableTechniques()
 * et getAvailableCategories(). Jamais techniques.json directement.
 */

import type { Technique, Category, DiscretionLevel } from "./types";
import techniquesData from "@/data/techniques.json";
import categoriesData from "@/data/categories.json";
import { isDemoMode, ALLOWED_CODES } from "./demo";

// ── Données brutes (complètes) ──
const allTechniques: Technique[] = techniquesData.techniques as Technique[];
const allCategories: Category[] = categoriesData.categories as Category[];

// ── FONCTION CENTRALE : getAvailableTechniques ──
// C'est LA source de vérité pour toute l'app.

/**
 * Retourne les techniques accessibles.
 * En mode DÉMO : uniquement celles dont code ∈ ALLOWED_CODES.
 * En mode complet : toutes.
 */
export function getAvailableTechniques(): Technique[] {
  if (isDemoMode()) {
    return allTechniques.filter((t) => ALLOWED_CODES.includes(t.code));
  }
  return allTechniques;
}

/**
 * Retourne les catégories qui ont ≥1 technique disponible.
 * En mode DÉMO, les catégories vides sont exclues.
 */
export function getAvailableCategories(): Category[] {
  const available = getAvailableTechniques();
  const activeCategoryIds = new Set(available.map((t) => t.category));

  return allCategories.filter((c) => activeCategoryIds.has(c.id));
}

/**
 * Raccourci : techniques disponibles (legacy compat)
 */
export const techniques: Technique[] = getAvailableTechniques();
export const categories: Category[] = allCategories;

// ── Fonctions de filtrage ──

/**
 * Récupère les techniques gratuites parmi les disponibles
 */
export function getFreeTechniques(): Technique[] {
  return getAvailableTechniques().filter((t) => !t.premium);
}

/**
 * Filtre les techniques par catégorie
 */
export function filterByCategory(
  techs: Technique[],
  categoryId: string | null
): Technique[] {
  if (!categoryId) return techs;
  return techs.filter((t) => t.category === categoryId);
}

/**
 * Filtre les techniques par niveau de discrétion
 */
export function filterByDiscretion(
  techs: Technique[],
  level: DiscretionLevel | null
): Technique[] {
  if (!level) return techs;
  return techs.filter((t) => t.discretionLevel === level);
}

// ── Tirage aléatoire (toujours dans le set disponible) ──

/**
 * Tire une technique au hasard parmi une liste
 */
export function drawRandomTechnique(techs: Technique[]): Technique | null {
  if (techs.length === 0) return null;
  const index = Math.floor(Math.random() * techs.length);
  return techs[index];
}

/**
 * Tire une technique au hasard dans le set disponible (whitelist en démo)
 */
export function drawTechnique(options?: {
  category?: string | null;
  discretionLevel?: DiscretionLevel | null;
  includePremium?: boolean;
}): Technique | null {
  let filtered = options?.includePremium
    ? getAvailableTechniques()
    : getFreeTechniques();

  if (options?.category) {
    filtered = filterByCategory(filtered, options.category);
  }
  if (options?.discretionLevel) {
    filtered = filterByDiscretion(filtered, options.discretionLevel);
  }

  return drawRandomTechnique(filtered);
}

// ── Lookups ──

/**
 * Récupère une technique par son ID.
 * En mode DÉMO, retourne undefined si la technique est hors whitelist.
 */
export function getTechniqueById(id: string): Technique | undefined {
  return getAvailableTechniques().find((t) => t.id === id);
}

/**
 * Récupère une technique par son ID SANS filtre whitelist.
 * Utilisé uniquement pour vérifier si l'ID existe dans la base complète
 * (pour distinguer "carte hors démo" vs "carte inexistante").
 */
export function getTechniqueByIdUnfiltered(id: string): Technique | undefined {
  return allTechniques.find((t) => t.id === id);
}

/**
 * Récupère une catégorie par son ID
 */
export function getCategoryById(id: string): Category | undefined {
  return allCategories.find((c) => c.id === id);
}

/**
 * Récupère les catégories triées par ordre (seulement celles avec cartes disponibles)
 */
export function getSortedCategories(): Category[] {
  return [...getAvailableCategories()].sort((a, b) => a.order - b.order);
}

/**
 * Récupère les catégories gratuites
 */
export function getFreeCategories(): Category[] {
  return getAvailableCategories().filter((c) => !c.premium);
}

// ── Formatage ──

/**
 * Formate la durée en secondes pour l'affichage
 */
export function formatDurationSeconds(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (secs === 0) {
    return `${mins} min`;
  }
  return `${mins}m ${secs}s`;
}

/**
 * Récupère la plage de durées pour une technique (min-max des 3 niveaux)
 */
export function getTechniqueDurationRange(technique: Technique): string {
  const durations = [
    technique.levels.croissant.durationSeconds,
    technique.levels.quartier.durationSeconds,
    technique.levels["pleine-lune"].durationSeconds,
  ];
  const min = Math.min(...durations);
  const max = Math.max(...durations);
  return `${formatDurationSeconds(min)} - ${formatDurationSeconds(max)}`;
}

// ── Evidence ──

/**
 * Récupère les techniques validées au Canada
 */
export function getCanadaValidatedTechniques(): Technique[] {
  return getAvailableTechniques().filter((t) => t.evidence.isCanadaValidated);
}

/**
 * Récupère les techniques par niveau de preuve
 */
export function getTechniquesByEvidenceLevel(level: "A" | "B" | "C"): Technique[] {
  return getAvailableTechniques().filter((t) => t.evidence.level === level);
}

/**
 * Compte les techniques disponibles selon les filtres
 */
export function countAvailableTechniques(options?: {
  category?: string | null;
  discretionLevel?: DiscretionLevel | null;
  includePremium?: boolean;
}): number {
  let filtered = options?.includePremium
    ? getAvailableTechniques()
    : getFreeTechniques();

  if (options?.category) {
    filtered = filterByCategory(filtered, options.category);
  }
  if (options?.discretionLevel) {
    filtered = filterByDiscretion(filtered, options.discretionLevel);
  }

  return filtered.length;
}
