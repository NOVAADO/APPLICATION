/**
 * Mode DÉMO - Whitelist stricte des cartes accessibles
 * Version 2.6.0
 *
 * Source de vérité unique : demo-cards.json → allowedCodes
 * Toute l'app filtre via getAvailableTechniques() définie dans techniques.ts.
 *
 * Références :
 * - NOVAADO_ADN.md : "jeu" pas "outil", tunnel doux
 * - AGENT_ECLIPSE.md : structure cartes, signature/secours
 */

import demoCardsData from "@/data/demo-cards.json";

/**
 * Codes whitelistés — source de vérité unique.
 * Pour changer le set démo, éditer demo-cards.json.
 */
export const ALLOWED_CODES: string[] = demoCardsData.allowedCodes;

/**
 * Vérifie si l'app est en mode DÉMO
 * Activé par variable d'environnement NEXT_PUBLIC_DEMO_MODE=true
 */
export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE === "true";
}

/**
 * Vérifie si un code fait partie de la whitelist démo
 */
export function isAllowedCode(code: string): boolean {
  return ALLOWED_CODES.includes(code);
}

/**
 * Nombre de cartes dans la whitelist
 */
export const DEMO_CARD_COUNT = ALLOWED_CODES.length;

/**
 * Microcopy pour le tunnel de vente doux
 *
 * Vocabulaire : "Dans le jeu complet" (pas "premium", pas "verrouillé")
 * Ton : informatif, pas commercial, respecte l'ADN
 */
export const DEMO_MICROCOPY = {
  // Message sur les cartes non disponibles
  cardLocked: "Dans le jeu complet",

  // Message page bloquée (technique hors whitelist)
  cardBlockedTitle: "Cette carte fait partie du jeu complet.",
  cardBlockedSubtitle: "52 cartes physiques, même esprit.",

  // Message pour catégorie hors démo
  categoryLimited: "Ici, c'est un aperçu. Le jeu complet est dans la boîte.",

  // Message pour la promo du jeu physique (après 5 techniques)
  gamePromo: "Éclipse existe aussi en version cartes",

  // Sous-titre promo
  gamePromoSubtitle: "52 cartes physiques pour les moments sans écran",

  // CTA doux (pas "Acheter maintenant")
  gamePromoCTA: "Découvrir le jeu",

  // Message état vide
  emptyStateDemo: "Pas de carte avec ces filtres dans l'aperçu.",
  emptyStateHint: "Le jeu complet a plus de choix.",
} as const;

/**
 * Nombre d'exercices avant le tunnel doux vers le jeu physique
 */
export const PROMO_THRESHOLD = 5;
