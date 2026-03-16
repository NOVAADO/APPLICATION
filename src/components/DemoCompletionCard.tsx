"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { BUY_URL, BUY_CTA_LABEL, DEMO_CARD_COUNT } from "@/lib/demo";
import { STORAGE_KEYS } from "@/lib/constants";

/**
 * Clé localStorage pour savoir si l'écran de conclusion a été fermé
 */
const COMPLETION_DISMISSED_KEY = "eclipse-demo-completion-dismissed";

/**
 * Clé localStorage pour les cartes uniques vues
 */
export const VIEWED_CARDS_KEY = "eclipse-demo-viewed-cards";

/**
 * Seuil minimum de cartes uniques vues pour afficher l'écran de conclusion
 */
const COMPLETION_THRESHOLD = 5;

/**
 * Retourne la liste des IDs de cartes uniques vues (depuis localStorage)
 */
export function getViewedCards(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(VIEWED_CARDS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Enregistre une carte comme vue (ajoute à la liste si pas déjà présente)
 */
export function markCardViewed(cardCode: string): void {
  if (typeof window === "undefined") return;
  const viewed = getViewedCards();
  if (!viewed.includes(cardCode)) {
    viewed.push(cardCode);
    localStorage.setItem(VIEWED_CARDS_KEY, JSON.stringify(viewed));
  }
}

/**
 * Écran de conclusion après exploration de la démo
 *
 * S'affiche quand l'utilisateur a vu >= COMPLETION_THRESHOLD cartes uniques.
 * Intégré dans le flow (pas un popup), ton chaleureux, pas commercial.
 * Se coordonne avec GamePromoCard : si cet écran s'affiche, GamePromoCard ne s'affiche plus.
 */
export function DemoCompletionCard() {
  const [viewedCount, setViewedCount] = useState(0);
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem(COMPLETION_DISMISSED_KEY);
    const viewed = getViewedCards();
    setViewedCount(viewed.length);
    setIsDismissed(dismissed === "true");
  }, []);

  // Ne pas afficher si pas assez de cartes vues ou déjà fermé
  if (viewedCount < COMPLETION_THRESHOLD || isDismissed) {
    return null;
  }

  const handleDismiss = () => {
    localStorage.setItem(COMPLETION_DISMISSED_KEY, "true");
    setIsDismissed(true);
  };

  const handleCTA = () => {
    handleDismiss();
    window.open(BUY_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full max-w-sm mx-auto mb-8 bg-eclipse-card rounded-2xl border border-eclipse-muted/20 p-6 shadow-lg">
      <div className="text-center">
        {/* Icône */}
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-souffle/20 to-atterris/20 flex items-center justify-center">
          <Image
            src="/pictos/pige-carte.svg"
            alt=""
            width={28}
            height={28}
            className="brightness-0 invert"
            aria-hidden="true"
          />
        </div>

        {/* Message */}
        <p className="text-eclipse-text mb-2">
          Tu viens d&apos;essayer{" "}
          <span className="font-bold">{viewedCount} cartes</span> d&apos;Éclipse.
        </p>
        <p className="text-eclipse-muted text-sm mb-6">
          Le jeu complet contient {49} cartes pour faire pause quand ça déborde.
        </p>

        {/* CTA */}
        <button
          onClick={handleCTA}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-souffle to-atterris text-eclipse-bg font-semibold touch-feedback hover:opacity-90 transition-opacity mb-3"
        >
          {BUY_CTA_LABEL}
        </button>

        {/* Fermer */}
        <button
          onClick={handleDismiss}
          className="w-full py-2 text-eclipse-muted text-sm hover:text-eclipse-text transition-colors"
        >
          Pas maintenant
        </button>

        {/* Note rassurante */}
        <p className="text-eclipse-muted/60 text-xs mt-3">
          Pas de pression. L&apos;aperçu reste disponible.
        </p>
      </div>
    </div>
  );
}
