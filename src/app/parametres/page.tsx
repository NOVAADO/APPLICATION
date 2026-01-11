"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getSettings,
  updateSetting,
  resetAllUserData,
  hasUserData,
  type Settings,
} from "@/lib/settings";

/**
 * Page Paramètres / Réglages
 *
 * Permet de configurer :
 * - Mode immersif fiches (ON/OFF)
 * - Annonces timer (ON/OFF)
 * - Tri par défaut favoris (Récents / A-Z)
 * - Réinitialisation des données
 */
export default function ParametresPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  // Charger les paramètres au montage
  useEffect(() => {
    setSettings(getSettings());
    setHasData(hasUserData());
  }, []);

  // Mettre à jour un paramètre
  const handleToggle = (key: keyof Settings, value: boolean | string) => {
    const updated = updateSetting(key, value as never);
    setSettings(updated);
  };

  // Réinitialiser toutes les données
  const handleReset = () => {
    resetAllUserData();
    setSettings(getSettings());
    setHasData(false);
    setShowResetConfirm(false);
    setResetDone(true);
    // Masquer le message après 3 secondes
    setTimeout(() => setResetDone(false), 3000);
  };

  // État de chargement
  if (!settings) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-eclipse-muted">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col px-6 py-8 pb-safe">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Réglages</h1>
        <p className="text-eclipse-muted mt-1">
          Personnalise ton expérience Éclipse
        </p>
      </header>

      {/* Sections de paramètres */}
      <div className="space-y-6 flex-1">
        {/* Section Affichage */}
        <section>
          <h2 className="text-sm font-semibold text-eclipse-muted uppercase tracking-wide mb-3">
            Affichage
          </h2>
          <div className="space-y-2">
            {/* Mode immersif */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-eclipse-card border border-eclipse-muted/20">
              <div className="flex-1 pr-4">
                <p className="font-medium">Mode immersif</p>
                <p className="text-sm text-eclipse-muted mt-0.5">
                  Masque la navigation sur les fiches techniques
                </p>
              </div>
              <Toggle
                checked={settings.immersiveMode}
                onChange={(checked) => handleToggle("immersiveMode", checked)}
                ariaLabel="Activer le mode immersif"
              />
            </div>
          </div>
        </section>

        {/* Section Timer */}
        <section>
          <h2 className="text-sm font-semibold text-eclipse-muted uppercase tracking-wide mb-3">
            Timer
          </h2>
          <div className="space-y-2">
            {/* Annonces timer */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-eclipse-card border border-eclipse-muted/20">
              <div className="flex-1 pr-4">
                <p className="font-medium">Annonces des phases</p>
                <p className="text-sm text-eclipse-muted mt-0.5">
                  Lecture des changements de phase pour les lecteurs d'écran
                </p>
              </div>
              <Toggle
                checked={settings.timerAnnouncements}
                onChange={(checked) =>
                  handleToggle("timerAnnouncements", checked)
                }
                ariaLabel="Activer les annonces du timer"
              />
            </div>
          </div>
        </section>

        {/* Section Favoris */}
        <section>
          <h2 className="text-sm font-semibold text-eclipse-muted uppercase tracking-wide mb-3">
            Favoris
          </h2>
          <div className="space-y-2">
            {/* Tri par défaut */}
            <div className="p-4 rounded-xl bg-eclipse-card border border-eclipse-muted/20">
              <p className="font-medium mb-3">Tri par défaut</p>
              <div
                className="flex gap-2"
                role="radiogroup"
                aria-label="Tri par défaut des favoris"
              >
                <button
                  onClick={() => handleToggle("defaultFavoritesSort", "recent")}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                    settings.defaultFavoritesSort === "recent"
                      ? "bg-eclipse-accent text-eclipse-bg"
                      : "bg-eclipse-bg border border-eclipse-muted/30 text-eclipse-muted"
                  }`}
                  role="radio"
                  aria-checked={settings.defaultFavoritesSort === "recent"}
                >
                  Récents
                </button>
                <button
                  onClick={() => handleToggle("defaultFavoritesSort", "az")}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                    settings.defaultFavoritesSort === "az"
                      ? "bg-eclipse-accent text-eclipse-bg"
                      : "bg-eclipse-bg border border-eclipse-muted/30 text-eclipse-muted"
                  }`}
                  role="radio"
                  aria-checked={settings.defaultFavoritesSort === "az"}
                >
                  A–Z
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section Aide */}
        <section>
          <h2 className="text-sm font-semibold text-eclipse-muted uppercase tracking-wide mb-3">
            Aide
          </h2>
          <div className="space-y-2">
            <button
              onClick={() => router.push("/aide")}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-eclipse-card border border-eclipse-muted/20 hover:border-souffle/50 transition-all touch-feedback text-left"
            >
              <div className="flex-1">
                <p className="font-medium">Besoin de parler?</p>
                <p className="text-sm text-eclipse-muted mt-0.5">
                  Ressources d&apos;aide gratuites et confidentielles
                </p>
              </div>
              <svg
                className="w-5 h-5 text-eclipse-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </section>

        {/* Section Données */}
        <section>
          <h2 className="text-sm font-semibold text-eclipse-muted uppercase tracking-wide mb-3">
            Données
          </h2>
          <div className="space-y-2">
            {/* Réinitialiser */}
            <div className="p-4 rounded-xl bg-eclipse-card border border-eclipse-muted/20">
              <p className="font-medium mb-1">Réinitialiser mes données</p>
              <p className="text-sm text-eclipse-muted mb-4">
                Supprime tes favoris, historique et réglages
              </p>

              {resetDone ? (
                <p className="text-ancrage font-medium text-center py-2.5">
                  Données réinitialisées.
                </p>
              ) : !showResetConfirm ? (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  disabled={!hasData}
                  className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                    hasData
                      ? "bg-red-500/10 border border-red-400/30 text-red-400 hover:bg-red-500/20"
                      : "bg-eclipse-bg border border-eclipse-muted/20 text-eclipse-muted/50 cursor-not-allowed"
                  }`}
                  aria-label="Réinitialiser toutes les données"
                >
                  {hasData ? "Réinitialiser" : "Aucune donnée à supprimer"}
                </button>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-red-400 font-medium">
                    Es-tu sûr·e ? Cette action est irréversible.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleReset}
                      className="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-all"
                    >
                      Confirmer
                    </button>
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium bg-eclipse-bg border border-eclipse-muted/30 text-eclipse-muted hover:border-eclipse-accent/50 transition-all"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Navigation footer */}
      <nav className="mt-6 pt-4 border-t border-eclipse-muted/20">
        <button
          onClick={() => router.push("/")}
          className="text-eclipse-accent hover:underline underline-offset-4 transition-colors"
        >
          ← Retour à l'accueil
        </button>
      </nav>
    </div>
  );
}

/**
 * Composant Toggle (interrupteur ON/OFF)
 */
function Toggle({
  checked,
  onChange,
  ariaLabel,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-7 rounded-full transition-colors ${
        checked ? "bg-eclipse-accent" : "bg-eclipse-muted/30"
      }`}
    >
      <span
        className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
