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
 * Lien principal vers la page d'achat / campagne.
 * Pendant la campagne La Ruche, pointe vers la collecte.
 * Après la campagne, remettre : "https://novaado.ca/eclipse"
 */
export const BUY_URL =
  "https://laruchequebec.com/fr/projets/80cd4414-6656-4da8-8f55-b268f6a1818e";

/**
 * Label du CTA principal d'achat
 * Après la campagne, remettre : "Voir sur novaado.ca"
 */
export const BUY_CTA_LABEL = "Soutenir sur La Ruche";

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
  cardBlockedSubtitle: "49 cartes physiques, même esprit.",

  // Message pour catégorie hors démo
  categoryLimited: "Ici, c'est un aperçu. Le jeu complet est dans la boîte.",

  // Message pour la promo du jeu physique (après 5 techniques)
  gamePromo: "Éclipse existe aussi en version cartes",

  // Sous-titre promo
  gamePromoSubtitle: "49 cartes physiques pour les moments sans écran",

  // CTA doux (pas "Acheter maintenant")
  gamePromoCTA: "Découvrir le jeu",

  // Message état vide
  emptyStateDemo: "Pas de carte avec ces filtres dans l'aperçu.",
  emptyStateHint: "Le jeu complet a plus de choix.",
} as const;

/**
 * Nombre d'exercices avant le tunnel doux vers le jeu physique
 */
export const PROMO_THRESHOLD = 3;

/**
 * Nombre maximum d'affichages de la promo jeu physique
 */
export const PROMO_MAX_SHOWS = 3;

/**
 * Délai minimum entre deux affichages de la promo (en ms)
 * 7 jours = 7 * 24 * 60 * 60 * 1000
 */
export const PROMO_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;
