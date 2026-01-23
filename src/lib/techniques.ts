/**
 * Gestion des techniques - Application Éclipse
 * Version 2.0.0 - Modèle 3 niveaux par carte (phases de lune)
 *
 * Mode DÉMO : L'app peut fonctionner en mode aperçu (cartes sélectionnées)
 * pour servir de tunnel de vente doux vers le jeu physique.
 */

import type { Technique, Category, MoonPhase, DiscretionLevel, MOON_PHASES } from "./types";
import techniquesData from "@/data/techniques.json";
import categoriesData from "@/data/categories.json";
import { isDemoMode, DEMO_CARD_IDS } from "./demo";

// Données typées
const allTechniques: Technique[] = techniquesData.techniques as Technique[];
export const categories: Category[] = categoriesData.categories as Category[];

/**
 * Techniques disponibles selon le mode (DÉMO ou complet)
 * En mode DÉMO : uniquement les cartes sélectionnées
 */
export const techniques: Technique[] = isDemoMode()
  ? allTechniques.filter((t) => DEMO_CARD_IDS.includes(t.id))
  : allTechniques;

/**
 * Récupère toutes les techniques gratuites (non-premium)
 */
export function getFreeTechniques(): Technique[] {
  return techniques.filter((t) => !t.premium);
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

/**
 * Tire une technique au hasard parmi une liste
 */
export function drawRandomTechnique(techs: Technique[]): Technique | null {
  if (techs.length === 0) return null;
  const index = Math.floor(Math.random() * techs.length);
  return techs[index];
}

/**
 * Tire une technique au hasard avec filtres optionnels
 * Ne retourne que des techniques gratuites par défaut
 */
export function drawTechnique(options?: {
  category?: string | null;
  discretionLevel?: DiscretionLevel | null;
  includePremium?: boolean;
}): Technique | null {
  let filtered = options?.includePremium ? techniques : getFreeTechniques();

  if (options?.category) {
    filtered = filterByCategory(filtered, options.category);
  }
  if (options?.discretionLevel) {
    filtered = filterByDiscretion(filtered, options.discretionLevel);
  }

  return drawRandomTechnique(filtered);
}

/**
 * Récupère une technique par son ID
 */
export function getTechniqueById(id: string): Technique | undefined {
  return techniques.find((t) => t.id === id);
}

/**
 * Récupère une catégorie par son ID
 */
export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

/**
 * Récupère les catégories triées par ordre
 */
export function getSortedCategories(): Category[] {
  return [...categories].sort((a, b) => a.order - b.order);
}

/**
 * Récupère les catégories gratuites
 */
export function getFreeCategories(): Category[] {
  return categories.filter((c) => !c.premium);
}

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
 * Récupère les techniques validées au Canada
 */
export function getCanadaValidatedTechniques(): Technique[] {
  return techniques.filter((t) => t.evidence.isCanadaValidated);
}

/**
 * Récupère les techniques par niveau de preuve
 */
export function getTechniquesByEvidenceLevel(level: "A" | "B" | "C"): Technique[] {
  return techniques.filter((t) => t.evidence.level === level);
}

/**
 * Compte les techniques disponibles selon les filtres
 */
export function countAvailableTechniques(options?: {
  category?: string | null;
  discretionLevel?: DiscretionLevel | null;
  includePremium?: boolean;
}): number {
  let filtered = options?.includePremium ? techniques : getFreeTechniques();

  if (options?.category) {
    filtered = filterByCategory(filtered, options.category);
  }
  if (options?.discretionLevel) {
    filtered = filterByDiscretion(filtered, options.discretionLevel);
  }

  return filtered.length;
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
