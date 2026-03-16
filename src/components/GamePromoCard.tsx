"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { STORAGE_KEYS } from "@/lib/constants";
import {
  PROMO_THRESHOLD,
  PROMO_MAX_SHOWS,
  PROMO_COOLDOWN_MS,
  BUY_URL,
  BUY_CTA_LABEL,
} from "@/lib/demo";

/**
 * Clés localStorage pour la promo multi-affichage
 */
const PROMO_COUNT_KEY = "eclipse-game-promo-count";
const PROMO_LAST_SHOWN_KEY = "eclipse-game-promo-last-shown";

/**
 * Carte de promotion discrète du jeu physique
 *
 * Affichée après PROMO_THRESHOLD techniques complétées
 * Maximum PROMO_MAX_SHOWS affichages, avec un cooldown de PROMO_COOLDOWN_MS entre chaque
 * Ton informatif, pas commercial
 * Respecte l'ADN : "on propose, on n'impose pas"
 */
export function GamePromoCard() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifier le nombre d'affichages précédents
    const showCount = parseInt(
      localStorage.getItem(PROMO_COUNT_KEY) || "0",
      10
    );
    if (showCount >= PROMO_MAX_SHOWS) {
      return;
    }

    // Vérifier le cooldown (7 jours entre chaque affichage)
    const lastShown = localStorage.getItem(PROMO_LAST_SHOWN_KEY);
    if (lastShown) {
      const elapsed = Date.now() - parseInt(lastShown, 10);
      if (elapsed < PROMO_COOLDOWN_MS) {
        return;
      }
    }

    // Vérifier le nombre de techniques complétées dans l'historique
    const historyRaw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!historyRaw) {
      return;
    }

    try {
      const history = JSON.parse(historyRaw);
      if (Array.isArray(history) && history.length >= PROMO_THRESHOLD) {
        setIsVisible(true);
      }
    } catch {
      // Ignore erreur de parsing
    }
  }, []);

  const handleDismiss = () => {
    // Incrémenter le compteur et enregistrer le timestamp
    const showCount = parseInt(
      localStorage.getItem(PROMO_COUNT_KEY) || "0",
      10
    );
    localStorage.setItem(PROMO_COUNT_KEY, String(showCount + 1));
    localStorage.setItem(PROMO_LAST_SHOWN_KEY, String(Date.now()));
    // Rétrocompat : aussi mettre l'ancien flag
    localStorage.setItem(STORAGE_KEYS.GAME_PROMO_SHOWN, "true");
    setIsVisible(false);
  };

  const handleViewGame = () => {
    handleDismiss();
    // Ouvrir La Ruche dans un nouvel onglet
    window.open(BUY_URL, "_blank", "noopener,noreferrer");
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-eclipse-bg/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-promo-title"
    >
      <div className="relative w-full max-w-sm bg-eclipse-card rounded-2xl border border-eclipse-muted/20 p-6 shadow-xl">
        {/* Bouton fermer */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-2 text-eclipse-muted hover:text-eclipse-text transition-colors"
          aria-label="Fermer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Contenu */}
        <div className="text-center">
          {/* Icône */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-souffle/20 to-atterris/20 flex items-center justify-center">
            <Image
              src="/pictos/pige-carte.svg"
              alt=""
              width={32}
              height={32}
              className="brightness-0 invert"
              aria-hidden="true"
            />
          </div>

          {/* Titre */}
          <h2
            id="game-promo-title"
            className="text-lg font-bold mb-2"
          >
            Tu savais?
          </h2>

          {/* Message */}
          <p className="text-eclipse-text mb-2">
            Éclipse existe aussi en version cartes.
          </p>
          <p className="text-eclipse-muted text-sm mb-6">
            49 cartes physiques, mêmes techniques.
            <br />
            La campagne est en cours sur La Ruche.
          </p>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleViewGame}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-souffle to-atterris text-eclipse-bg font-semibold touch-feedback hover:opacity-90 transition-opacity"
            >
              {BUY_CTA_LABEL}
            </button>
            <button
              onClick={handleDismiss}
              className="w-full py-3 text-eclipse-muted hover:text-eclipse-text transition-colors"
            >
              Pas maintenant
            </button>
          </div>

          {/* Note rassurante */}
          <p className="text-eclipse-muted/60 text-xs mt-4">
            L&apos;aperçu reste gratuit. Pas de pression.
          </p>
        </div>
      </div>
    </div>
  );
}
