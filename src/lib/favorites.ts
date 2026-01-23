/**
 * Gestion des favoris et de l'historique - Application Éclipse
 *
 * Stockage localStorage :
 * - eclipse-favorites: string[] (IDs des techniques favorites)
 * - eclipse-history: HistoryEntry[] (historique des consultations)
 */

import { STORAGE_KEYS } from "./constants";
import type { HistoryEntry, MoonPhase } from "./types";

// Ré-exporter pour les imports existants
export type { HistoryEntry } from "./types";

const FAVORITES_KEY = STORAGE_KEYS.FAVORITES;
const HISTORY_KEY = STORAGE_KEYS.HISTORY;

/**
 * Récupère les favoris depuis localStorage
 */
export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(FAVORITES_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Sauvegarde les favoris dans localStorage
 */
export function saveFavorites(favoriteIds: string[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
}

/**
 * Ajoute une technique aux favoris
 */
export function addFavorite(techniqueId: string): string[] {
  const favorites = getFavorites();
  if (favorites.includes(techniqueId)) return favorites;

  const newFavorites = [...favorites, techniqueId];
  saveFavorites(newFavorites);
  return newFavorites;
}

/**
 * Retire une technique des favoris
 */
export function removeFavorite(techniqueId: string): string[] {
  const favorites = getFavorites();
  const newFavorites = favorites.filter((id) => id !== techniqueId);
  saveFavorites(newFavorites);
  return newFavorites;
}

/**
 * Vérifie si une technique est dans les favoris
 */
export function isFavorite(techniqueId: string): boolean {
  return getFavorites().includes(techniqueId);
}

/**
 * Toggle le statut favori d'une technique
 */
export function toggleFavorite(techniqueId: string): { favorites: string[]; isFavorite: boolean } {
  if (isFavorite(techniqueId)) {
    return { favorites: removeFavorite(techniqueId), isFavorite: false };
  }
  return { favorites: addFavorite(techniqueId), isFavorite: true };
}

/**
 * Récupère l'historique depuis localStorage
 */
export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(HISTORY_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Sauvegarde l'historique dans localStorage
 */
export function saveHistory(history: HistoryEntry[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

/**
 * Ajoute une entrée à l'historique
 * @param techniqueId - ID de la technique
 * @param level - Niveau de lune utilisé (croissant, quartier ou pleine-lune)
 */
export function addToHistory(techniqueId: string, level: MoonPhase = "croissant"): HistoryEntry[] {
  const history = getHistory();
  const entry: HistoryEntry = {
    techniqueId,
    level,
    timestamp: Date.now(),
  };

  // Ajoute en début de liste (plus récent en premier)
  const newHistory = [entry, ...history];
  saveHistory(newHistory);
  return newHistory;
}

/**
 * Récupère le timestamp de dernière utilisation d'une technique
 */
export function getLastUsed(techniqueId: string): number | null {
  const history = getHistory();
  const entry = history.find((h) => h.techniqueId === techniqueId);
  return entry?.timestamp ?? null;
}

/**
 * Trie les favoris par ordre alphabétique (A-Z)
 */
export function sortFavoritesAZ<T extends { title: string }>(favorites: T[]): T[] {
  return [...favorites].sort((a, b) => a.title.localeCompare(b.title, "fr-CA"));
}

/**
 * Trie les favoris par utilisation récente
 */
export function sortFavoritesRecent<T extends { id: string }>(favorites: T[]): T[] {
  const history = getHistory();

  // Crée une map des dernières utilisations
  const lastUsedMap = new Map<string, number>();
  history.forEach((entry) => {
    // Garde seulement la première occurrence (la plus récente)
    if (!lastUsedMap.has(entry.techniqueId)) {
      lastUsedMap.set(entry.techniqueId, entry.timestamp);
    }
  });

  return [...favorites].sort((a, b) => {
    const timeA = lastUsedMap.get(a.id) || 0;
    const timeB = lastUsedMap.get(b.id) || 0;
    return timeB - timeA; // Plus récent en premier
  });
}
