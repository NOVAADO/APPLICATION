"use client";

import { use, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TechniqueCard } from "@/components/TechniqueCard";
import { FeedbackPrompt } from "@/components/FeedbackPrompt";
import type { Feedback } from "@/lib/types";
import {
  getTechniqueById,
  getTechniqueByIdUnfiltered,
  getCategoryById,
  drawTechnique,
} from "@/lib/techniques";
import { isDemoMode, DEMO_MICROCOPY } from "@/lib/demo";

interface TechniquePageProps {
  params: Promise<{ id: string }>;
}

/**
 * Page Fiche Technique — Version 2.5.0
 *
 * Simplifié : le timer et l'accordéon sont intégrés dans TechniqueCard.
 * Cette page gère : favoris, partage, "Autre carte", feedback, historique.
 */
export default function TechniquePage({ params }: TechniquePageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const feedbackCount = useRef(0);

  // Charger les favoris depuis localStorage
  useEffect(() => {
    const stored = localStorage.getItem("eclipse-favorites");
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        // Ignore erreur de parsing
      }
    }
  }, []);

  // Compatibilité anciens IDs — remap préfixe v1 → v2.4
  const OLD_PREFIX_MAP: Record<string, string> = {
    "decharge-": "defoule-",
    "ancrage-": "atterris-",
    "faire-le-point-": "repere-",
    "paroles-": "accroche-",
    "chaos-": "decroche-",
    "combinaison-": "enchaine-",
  };

  let resolvedId = id;
  for (const [oldPrefix, newPrefix] of Object.entries(OLD_PREFIX_MAP)) {
    if (id.startsWith(oldPrefix)) {
      resolvedId = id.replace(oldPrefix, newPrefix);
      break;
    }
  }

  // Redirect si l'ID a été remappé
  if (resolvedId !== id) {
    router.replace(`/technique/${resolvedId}`);
    return null;
  }

  const technique = getTechniqueById(resolvedId);
  const category = technique ? getCategoryById(technique.category) : undefined;

  // Technique hors whitelist en mode démo → page soft "Dans le jeu complet"
  if (!technique && isDemoMode()) {
    const existsInFull = getTechniqueByIdUnfiltered(resolvedId);
    if (existsInFull) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-eclipse-card flex items-center justify-center">
            <svg className="w-8 h-8 text-eclipse-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="text-lg font-medium mb-2">{DEMO_MICROCOPY.cardBlockedTitle}</p>
          <p className="text-eclipse-muted mb-8">{DEMO_MICROCOPY.cardBlockedSubtitle}</p>
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button
              onClick={() => router.push("/jeu-physique")}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-souffle to-atterris text-eclipse-bg font-semibold touch-feedback hover:opacity-90 transition-opacity"
            >
              Voir le jeu
            </button>
            <button
              onClick={() => router.push("/")}
              className="w-full py-3 text-eclipse-muted hover:text-eclipse-text transition-colors"
            >
              Retour à l&apos;accueil
            </button>
          </div>
        </div>
      );
    }
  }

  // Technique non trouvée (n'existe pas du tout)
  if (!technique) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <p className="text-xl mb-4">Cette technique n&apos;existe plus.</p>
        <button
          onClick={() => router.push("/")}
          className="text-eclipse-accent hover:underline"
        >
          Retour à l&apos;accueil
        </button>
      </div>
    );
  }

  const isFavorite = favorites.includes(technique.id);

  const handleFavorite = () => {
    let newFavorites: string[];

    if (isFavorite) {
      newFavorites = favorites.filter((f) => f !== technique.id);
      toast("Retiré des favoris");
    } else {
      newFavorites = [...favorites, technique.id];
      toast("Ajouté aux favoris");
    }

    setFavorites(newFavorites);
    localStorage.setItem("eclipse-favorites", JSON.stringify(newFavorites));
  };

  // Enregistrer dans l'historique avec feedback optionnel
  const saveToHistory = (feedback?: Feedback) => {
    const historyEntry = {
      techniqueId: technique.id,
      timestamp: Date.now(),
      feedback,
    };

    const storedHistory = localStorage.getItem("eclipse-history");
    let history = [];

    if (storedHistory) {
      try {
        history = JSON.parse(storedHistory);
      } catch {
        // Ignore
      }
    }

    history.unshift(historyEntry);
    // Garder les 50 dernières entrées max
    history = history.slice(0, 50);

    localStorage.setItem("eclipse-history", JSON.stringify(history));

    // Retour à l'accueil
    router.push("/");
  };

  const handleDone = () => {
    // Demander feedback 1 fois sur 3 (pas intrusif)
    feedbackCount.current += 1;
    if (feedbackCount.current % 3 === 1) {
      setShowFeedback(true);
    } else {
      saveToHistory();
    }
  };

  const handleFeedback = (feedback: Feedback) => {
    setShowFeedback(false);
    saveToHistory(feedback);
  };

  const handleSkipFeedback = () => {
    setShowFeedback(false);
    saveToHistory();
  };

  const handleAnother = () => {
    // Tirer une autre technique (même catégorie si possible)
    const newTechnique = drawTechnique({
      category: technique.category,
    });

    if (newTechnique && newTechnique.id !== technique.id) {
      router.push(`/technique/${newTechnique.id}`);
    } else {
      // Si même technique ou aucune, tirer sans filtre
      const fallback = drawTechnique();
      if (fallback) {
        router.push(`/technique/${fallback.id}`);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col px-6 py-8 pb-safe">
      {/* Bouton retour */}
      <button
        onClick={() => router.back()}
        className="self-start mb-6 text-eclipse-muted hover:text-eclipse-text transition-colors flex items-center gap-2"
        aria-label="Retour"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Retour
      </button>

      {/* Mode Feedback */}
      {showFeedback ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold mb-2">{technique.title}</h2>
          <p className="text-atterris font-medium mb-8">C&apos;est fait.</p>
          <FeedbackPrompt
            onFeedback={handleFeedback}
            onSkip={handleSkipFeedback}
          />
        </div>
      ) : (
        <>
          {/* Fiche technique — accordéon + timer intégrés */}
          <TechniqueCard
            technique={technique}
            category={category}
            onFavorite={handleFavorite}
            isFavorite={isFavorite}
            onAnother={handleAnother}
          />

          {/* Disclaimer légal discret */}
          <footer className="mt-8 pt-4 border-t border-eclipse-muted/20">
            <p className="text-eclipse-muted/60 text-xs text-center">
              Éclipse est là pour t&apos;accompagner, mais ce n&apos;est pas un service de santé.
              <br />
              Si ça va vraiment pas,{" "}
              <a
                href="/aide"
                className="text-souffle hover:underline underline-offset-2"
              >
                parles-en
              </a>
              .
            </p>
          </footer>
        </>
      )}
    </div>
  );
}
