/**
 * Gestion des techniques - Application Éclipse
 */

import type { Technique, Category, Duration, Intensity, Preset, DiscretionLevel } from "./types";
import techniquesData from "@/data/techniques.json";
import categoriesData from "@/data/categories.json";

// Données typées
export const techniques: Technique[] = techniquesData.techniques as Technique[];
export const categories: Category[] = categoriesData.categories as Category[];

/**
 * Récupère toutes les techniques gratuites (non-premium)
 */
export function getFreeTechniques(): Technique[] {
  return techniques.filter((t) => !t.premium);
}

/**
 * Filtre les techniques par durée
 */
export function filterByDuration(
  techs: Technique[],
  duration: Duration | null
): Technique[] {
  if (!duration) return techs;
  // 2 min = techniques de 2 ou 3 min
  // 5 min = techniques de 5 min
  if (duration === 2) {
    return techs.filter((t) => t.duration <= 3);
  }
  return techs.filter((t) => t.duration === duration);
}

/**
 * Filtre les techniques par intensité
 */
export function filterByIntensity(
  techs: Technique[],
  intensity: Intensity | null
): Technique[] {
  if (!intensity) return techs;
  return techs.filter((t) => t.intensity === intensity);
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
  duration?: Duration | null;
  intensity?: Intensity | null;
  category?: string | null;
  preset?: Preset | null;
  includePremium?: boolean;
}): Technique | null {
  let filtered = options?.includePremium ? techniques : getFreeTechniques();

  // Filtre par preset (contexte) - appliqué en premier
  if (options?.preset === "A") {
    filtered = filtered.filter(
      (t) => t.presets.includes("A") && t.durationSeconds <= 120 && t.discretionLevel === "public_ok"
    );
  } else if (options?.preset === "B") {
    filtered = filtered.filter(
      (t) =>
        t.presets.includes("B") &&
        t.durationSeconds <= 300 &&
        (t.discretionLevel === "public_ok" || t.discretionLevel === "discret")
    );
  }

  if (options?.duration) {
    filtered = filterByDuration(filtered, options.duration);
  }
  if (options?.intensity) {
    filtered = filterByIntensity(filtered, options.intensity);
  }
  if (options?.category) {
    filtered = filterByCategory(filtered, options.category);
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
 * Formate la durée pour l'affichage
 */
export function formatDuration(duration: number): string {
  return `${duration} min`;
}

/**
 * Traduit l'intensité pour l'affichage
 */
export function formatIntensity(intensity: Intensity): string {
  const labels: Record<Intensity, string> = {
    soft: "Douce",
    normal: "Normale",
    intense: "Intense",
  };
  return labels[intensity];
}

/**
 * Filtre les techniques par preset (A ou B)
 */
export function filterByPreset(
  techs: Technique[],
  preset: Preset | null
): Technique[] {
  if (!preset) return techs;
  return techs.filter((t) => t.presets.includes(preset));
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
 * Récupère les techniques du Preset A (École/Public)
 * - Durée <= 120s
 * - Discrétion = public_ok
 */
export function getPresetATechniques(): Technique[] {
  return techniques.filter(
    (t) => t.presets.includes("A") && t.durationSeconds <= 120 && t.discretionLevel === "public_ok"
  );
}

/**
 * Récupère les techniques du Preset B (Discret)
 * - Durée 121-300s
 * - Discrétion = public_ok ou discret
 */
export function getPresetBTechniques(): Technique[] {
  return techniques.filter(
    (t) =>
      t.presets.includes("B") &&
      t.durationSeconds <= 300 &&
      (t.discretionLevel === "public_ok" || t.discretionLevel === "discret")
  );
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
  duration?: Duration | null;
  preset?: Preset | null;
  includePremium?: boolean;
}): number {
  let filtered = options?.includePremium ? techniques : getFreeTechniques();

  if (options?.preset === "A") {
    filtered = filtered.filter(
      (t) => t.presets.includes("A") && t.durationSeconds <= 120 && t.discretionLevel === "public_ok"
    );
  } else if (options?.preset === "B") {
    filtered = filtered.filter(
      (t) =>
        t.presets.includes("B") &&
        t.durationSeconds <= 300 &&
        (t.discretionLevel === "public_ok" || t.discretionLevel === "discret")
    );
  }

  if (options?.duration) {
    filtered = filterByDuration(filtered, options.duration);
  }

  return filtered.length;
}
