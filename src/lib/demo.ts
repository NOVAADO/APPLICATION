/**
 * Mode DÉMO - Configuration de l'aperçu gratuit
 * Version 2.5.0
 *
 * L'app est un tunnel de vente doux pour le jeu physique.
 * Cette sélection montre les meilleures cartes pour donner envie.
 *
 * Références :
 * - NOVAADO_ADN.md : "jeu" pas "outil", tunnel doux
 * - AGENT_ECLIPSE.md : structure cartes, signature/secours
 */

/**
 * IDs des cartes sélectionnées pour la DÉMO
 *
 * Objectif : 18 cartes à terme (2-3 par catégorie)
 * Actuellement : toutes les cartes disponibles (7)
 * À compléter quand plus de techniques seront ajoutées
 */
export const DEMO_CARD_IDS: string[] = [
  // SOUFFLE — S01
  "souffle-001",

  // DÉFOULE — D01
  "defoule-001",

  // ATTERRIS — A01
  "atterris-001",

  // REPÈRE — F01
  "repere-001",

  // ENCHAÎNE — C01
  "enchaine-001",

  // ACCROCHE — P01 (format: phrase unique)
  "accroche-001",

  // DÉCROCHE — X01 (format: absurde)
  "decroche-001",
];

/**
 * Vérifie si l'app est en mode DÉMO
 * Activé par variable d'environnement NEXT_PUBLIC_DEMO_MODE=true
 */
export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE === "true";
}

/**
 * Vérifie si une technique fait partie de la DÉMO
 */
export function isDemoCard(techniqueId: string): boolean {
  return DEMO_CARD_IDS.includes(techniqueId);
}

/**
 * Nombre de cartes dans la DÉMO
 */
export const DEMO_CARD_COUNT = DEMO_CARD_IDS.length;

/**
 * Microcopy pour le tunnel de vente doux
 *
 * Vocabulaire : "Dans le jeu complet" (pas "premium", pas "verrouillé")
 * Ton : informatif, pas commercial, respecte l'ADN
 */
export const DEMO_MICROCOPY = {
  // Message sur les cartes non disponibles
  cardLocked: "Dans le jeu complet",

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

/**
 * Statistiques DÉMO par catégorie
 */
export const DEMO_STATS = {
  totalCards: DEMO_CARD_IDS.length,
  byCategory: {
    souffle: 1,
    defoule: 1,
    atterris: 1,
    repere: 1,
    enchaine: 1,
    accroche: 1,
    decroche: 1,
  },
} as const;
