/**
 * Mode DÉMO - Configuration de l'aperçu gratuit
 *
 * L'app est un tunnel de vente doux pour le jeu physique.
 * Cette sélection montre les meilleures cartes pour donner envie.
 *
 * Agents consultés :
 * - NOVAADO_ADN.md : "jeu" pas "outil", tunnel doux
 * - novaado-antilope-gardien-adn.md : ton direct, pas commercial
 * - novaado-antilope-agent-microcopy-ton.md : microcopy sans pression
 */

/**
 * IDs des cartes sélectionnées pour la DÉMO
 *
 * Critères de scoring "13+" (0-5 par critère) :
 * 1. Impact immédiat
 * 2. Simplicité
 * 3. Faible gêne sociale
 * 4. Pertinence ado
 * 5. Ton juste
 * 6. Sécurité
 *
 * Score minimum requis : 27/30
 */
export const DEMO_CARD_IDS: string[] = [
  // Souffle (3) - Fondamentaux respiratoires
  "souffle-478",         // Respiration 4-7-8 | Furtif | Ultra efficace, classique validé
  "souffle-carree",      // Respiration carrée | Furtif | Navy SEALs, crédibilité ado
  "souffle-soupir",      // Le grand soupir | Libre | Effet immédiat, ultra simple

  // Ancrage (4) - Retour au présent
  "ancrage-54321",       // 5-4-3-2-1 | Furtif | Anti-panique, faisable en classe
  "ancrage-pieds",       // Pieds au sol | Furtif | Invisible, puissant
  "ancrage-main-coeur",  // Main sur le cœur | Furtif | Réconfort immédiat
  "ancrage-reset-postural", // Reset postural | Furtif | Discret, "athlète"

  // Décharge (2) - Libération physique
  "decharge-croises",    // Mouvements croisés | Libre | Réveille sans être loud
  "decharge-secoue",     // Secoue tout | Libre | Défoule, validé TRE

  // Paroles fortes (5) - Affirmations ado-friendly
  "paroles-encore-la",   // Encore là | Furtif | Puissant, pas moralisateur
  "paroles-droit",       // T'as le droit | Furtif | Permission, pas injonction
  "paroles-repos",       // Repos mérité | Furtif | Anti-culpabilité
  "paroles-bordel",      // Le bordel | Furtif | Langage ado, validant
  "paroles-lacher",      // Lâcher | Furtif | ACT validé Canada

  // Chaos (3) - Cassure créative
  "chaos-mode-pnj",      // Mode PNJ | Furtif | Gaming, discret, fun
  "chaos-machoire-molle", // Mâchoire molle | Furtif | Ultra discret, efficace
  "chaos-slow-motion",   // Slow motion | Furtif | Fun, invisible

  // Faire le point (1) - Métacognition
  "faire-le-point-stop", // STOP | Furtif | Acronyme mémorable, MBSR
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
export const DEMO_CARD_COUNT = DEMO_CARD_IDS.length; // 18

/**
 * Microcopy pour le tunnel de vente doux
 *
 * Agent : novaado-antilope-agent-microcopy-ton.md
 * - Pas de "premium" ou "payant"
 * - Ton informatif, pas commercial
 * - Respecte l'ADN : "jeu" pas "outil"
 */
export const DEMO_MICROCOPY = {
  // Message sur les cartes non disponibles
  cardLocked: "Dans le jeu complet",

  // Message pour catégorie avec cartes limitées
  categoryLimited: "Ici, c'est un aperçu. Le jeu complet est dans la boîte.",

  // Message pour la promo du jeu physique (après 5 techniques)
  gamePromo: "Éclipse existe aussi en version cartes",

  // Sous-titre promo
  gamePromoSubtitle: "52 cartes physiques pour les moments sans écran",

  // CTA doux (pas "Acheter maintenant")
  gamePromoCTA: "Découvrir le jeu",

  // Message état vide (aucune carte dispo avec filtres)
  emptyStateDemo: "Pas de carte avec ces filtres dans l'aperçu.",
  emptyStateHint: "Le jeu complet a plus de choix.",
} as const;

/**
 * Statistiques DÉMO par catégorie
 */
export const DEMO_STATS = {
  totalCards: 18,
  byCategory: {
    souffle: 3,
    ancrage: 4,
    decharge: 2,
    "paroles-fortes": 5,
    chaos: 3,
    "faire-le-point": 1,
  },
  byMode: {
    furtif: 14,
    libre: 4,
  },
} as const;
