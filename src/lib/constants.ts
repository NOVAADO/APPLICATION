/**
 * Constantes centralisées - Application Éclipse
 */

/**
 * Clés localStorage
 */
export const STORAGE_KEYS = {
  FAVORITES: "eclipse-favorites",
  HISTORY: "eclipse-history",
  SETTINGS: "eclipse-settings",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
