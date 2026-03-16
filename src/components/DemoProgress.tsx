"use client";

import { useState, useEffect } from "react";
import { getViewedCards } from "@/components/DemoCompletionCard";
import { DEMO_CARD_COUNT } from "@/lib/demo";

/**
 * Indicateur de progression sobre pour la démo
 *
 * Affiche "X/7 cartes essayées" sur la page d'accueil
 * Discret, encourageant, sans pression
 */
export function DemoProgress() {
  const [viewedCount, setViewedCount] = useState(0);

  useEffect(() => {
    setViewedCount(getViewedCards().length);
  }, []);

  // Ne rien afficher si aucune carte vue
  if (viewedCount === 0) {
    return null;
  }

  return (
    <p className="text-eclipse-muted/70 text-sm text-center mt-4">
      {viewedCount}/{DEMO_CARD_COUNT} cartes essayées
    </p>
  );
}
