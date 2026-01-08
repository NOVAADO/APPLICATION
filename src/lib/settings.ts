/**
 * Gestion des paramètres utilisateur - Application Éclipse
 *
 * Stockage localStorage :
 * - eclipse-settings: Settings (paramètres utilisateur)
 *
 * Clés localStorage documentées :
 * - eclipse-favorites: string[] (IDs des techniques favorites)
 * - eclipse-history: HistoryEntry[] (historique des consultations)
 * - eclipse-settings: Settings (paramètres ci-dessous)
 */

import { STORAGE_KEYS } from "./constants";

export interface Settings {
  /** Mode immersif sur les fiches techniques (masque BottomNav) */
  immersiveMode: boolean;
  /** Annonces vocales du timer (changements de phase) */
  timerAnnouncements: boolean;
  /** Tri par défaut des favoris: "recent" ou "az" */
  defaultFavoritesSort: "recent" | "az";
}

const SETTINGS_KEY = STORAGE_KEYS.SETTINGS;
const FAVORITES_KEY = STORAGE_KEYS.FAVORITES;
const HISTORY_KEY = STORAGE_KEYS.HISTORY;

/**
 * Paramètres par défaut
 */
export const DEFAULT_SETTINGS: Settings = {
  immersiveMode: true,
  timerAnnouncements: true,
  defaultFavoritesSort: "recent",
};

/**
 * Récupère les paramètres depuis localStorage
 * Retourne les valeurs par défaut si non définis
 */
export function getSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;

  const stored = localStorage.getItem(SETTINGS_KEY);
  if (!stored) return DEFAULT_SETTINGS;

  try {
    const parsed = JSON.parse(stored);
    // Fusionne avec les defaults pour gérer les nouvelles clés
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

/**
 * Sauvegarde les paramètres dans localStorage
 */
export function saveSettings(settings: Settings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

/**
 * Met à jour un paramètre spécifique
 */
export function updateSetting<K extends keyof Settings>(
  key: K,
  value: Settings[K]
): Settings {
  const current = getSettings();
  const updated = { ...current, [key]: value };
  saveSettings(updated);
  return updated;
}

/**
 * Réinitialise les paramètres aux valeurs par défaut
 */
export function resetSettings(): Settings {
  saveSettings(DEFAULT_SETTINGS);
  return DEFAULT_SETTINGS;
}

/**
 * Réinitialise toutes les données utilisateur
 * (favoris, historique, paramètres)
 */
export function resetAllUserData(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(FAVORITES_KEY);
  localStorage.removeItem(HISTORY_KEY);
  localStorage.removeItem(SETTINGS_KEY);
}

/**
 * Vérifie si des données utilisateur existent
 */
export function hasUserData(): boolean {
  if (typeof window === "undefined") return false;

  return (
    localStorage.getItem(FAVORITES_KEY) !== null ||
    localStorage.getItem(HISTORY_KEY) !== null ||
    localStorage.getItem(SETTINGS_KEY) !== null
  );
}
