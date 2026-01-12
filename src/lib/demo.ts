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
 * 1. Impact immédiat (aide vite)
 * 2. Simplicité (compréhensible en 10 secondes)
 * 3. Faible gêne sociale (faisable en mode Furtif)
 * 4. Pertinence ado 13+ (stress scolaire, pression sociale)
 * 5. Ton ADN (pas infantilisant, pas moralisateur)
 * 6. Sécurité (aucune instruction risquée)
 *
 * Contrainte de diversité : 1 Furtif + 1 Libre par catégorie
 * Total : 12 cartes (2 par catégorie × 6 catégories actives)
 * Note : Combinaison n'a pas de cartes disponibles, Carte blanche est verrouillée
 */
export const DEMO_CARD_IDS: string[] = [
  // SOUFFLE (2)
  "souffle-478",      // Furtif | 29/30 | Ultra validé, faisable en classe sans qu'on te remarque
  "souffle-soupir",   // Libre  | 28/30 | Effet immédiat, un seul geste, pas de compte à faire

  // DÉCHARGE (2)
  "decharge-croises", // Furtif | 27/30 | Discret (assis), réveille sans faire de bruit
  "decharge-secoue",  // Libre  | 28/30 | Validé TRE, libère la frustration, fun à faire

  // ANCRAGE (2)
  "ancrage-54321",    // Furtif | 30/30 | Anti-panique classique, faisable discrètement partout
  "ancrage-glacons",  // Libre  | 27/30 | Sensation forte pour moments intenses, mémorable

  // FAIRE LE POINT (2)
  "faire-le-point-echelle", // Furtif | 28/30 | Simple, concret, "petit pas" parlant pour les ados
  "faire-le-point-ecrire",  // Libre  | 29/30 | Journaling validé, "cell ou papier", libératoire

  // PAROLES FORTES (2)
  "paroles-encore-la", // Furtif | 29/30 | Phrase puissante, pas moralisatrice, touche direct
  "paroles-ami",       // Libre  | 28/30 | Auto-compassion, validé scientifiquement, introspection

  // CHAOS (2)
  "chaos-mode-pnj",        // Furtif | 29/30 | Gaming, humour, ultra discret en public
  "chaos-ninja-silencieux", // Libre  | 28/30 | Jeu de rôle fun, mouvement, "mission" engageante
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
export const DEMO_CARD_COUNT = DEMO_CARD_IDS.length; // 12

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
 *
 * 6 catégories actives × 2 cartes = 12 cartes total
 * Combinaison : 0 cartes disponibles
 * Carte blanche : verrouillée (jeu physique uniquement)
 */
export const DEMO_STATS = {
  totalCards: 12,
  byCategory: {
    souffle: 2,
    decharge: 2,
    ancrage: 2,
    "faire-le-point": 2,
    "paroles-fortes": 2,
    chaos: 2,
    combinaison: 0,
  },
  byMode: {
    furtif: 7,
    libre: 7,
  },
} as const;
