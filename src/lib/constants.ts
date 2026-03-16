/**
 * Constantes partagées - Application Éclipse
 *
 * Centralise les clés localStorage et autres constantes
 * pour éviter les duplications et faciliter la maintenance.
 */

/**
 * Clés localStorage utilisées par l'application
 */
export const STORAGE_KEYS = {
  FAVORITES: "eclipse-favorites",
  HISTORY: "eclipse-history",
  SETTINGS: "eclipse-settings",
  ONBOARDING: "eclipse-onboarding-done",
  GAME_PROMO_SHOWN: "eclipse-game-promo-shown",
  VIEWED_CARDS: "eclipse-demo-viewed-cards",
  DEMO_COMPLETION_DISMISSED: "eclipse-demo-completion-dismissed",
} as const;

/**
 * Type utilitaire pour les valeurs de STORAGE_KEYS
 */
export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
