"use client";

import { use, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TechniqueCard } from "@/components/TechniqueCard";
import { Timer } from "@/components/Timer";
import { FeedbackPrompt } from "@/components/FeedbackPrompt";
import type { Feedback, MoonPhase } from "@/lib/types";
import { MOON_PHASES } from "@/lib/types";
import {
  getTechniqueById,
  getCategoryById,
  drawTechnique,
} from "@/lib/techniques";

interface TechniquePageProps {
  params: Promise<{ id: string }>;
}

/**
 * Page Fiche Technique - Version 2.0.0
 *
 * Affiche une technique avec sélection du niveau (phase de lune)
 * Permet : choisir le niveau, marquer comme fait, ajouter aux favoris, tirer une autre
 * Timer guidé si la technique le supporte
 */
export default function TechniquePage({ params }: TechniquePageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<MoonPhase | null>(null);
  const [showTimer, setShowTimer] = useState(false);
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

  const technique = getTechniqueById(id);
  const category = technique ? getCategoryById(technique.category) : undefined;

  // Technique non trouvée
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

  // Récupérer le niveau sélectionné
  const currentLevel = selectedLevel ? technique.levels[selectedLevel] : null;

  // Calculer la durée du timer en secondes pour le niveau sélectionné
  const timerDuration = currentLevel?.timerConfig?.totalDuration
    ?? currentLevel?.durationSeconds
    ?? 60;

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
      level: selectedLevel || "croissant",
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
    // Fermer le timer si ouvert et réinitialiser le niveau
    setShowTimer(false);
    setSelectedLevel(null);

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

  const handleStartTimer = () => {
    setShowTimer(true);
  };

  const handleTimerComplete = () => {
    // Timer terminé = technique faite
    handleDone();
  };

  const handleTimerCancel = () => {
    setShowTimer(false);
  };

  return (
    <div className="flex-1 flex flex-col px-6 py-8 pb-safe">
      {/* Bouton retour */}
      <button
        onClick={() => {
          if (showTimer) {
            setShowTimer(false);
          } else {
            router.back();
          }
        }}
        className="self-start mb-6 text-eclipse-muted hover:text-eclipse-text transition-colors flex items-center gap-2"
        aria-label={showTimer ? "Fermer le timer" : "Retour"}
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
        {showTimer ? "Fermer le timer" : "Retour"}
      </button>

      {/* Mode Feedback */}
      {showFeedback ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold mb-2">{technique.title}</h2>
          <p className="text-ancrage font-medium mb-8">C&apos;est fait.</p>
          <FeedbackPrompt
            onFeedback={handleFeedback}
            onSkip={handleSkipFeedback}
          />
        </div>
      ) : showTimer && currentLevel ? (
        <div className="flex-1 flex flex-col">
          {/* Titre de la technique */}
          <h1 className="text-xl font-bold text-center mb-2">
            {technique.title}
          </h1>
          <p className="text-eclipse-muted text-center text-sm mb-6">
            {category?.name}
          </p>

          {/* Timer */}
          <Timer
            duration={timerDuration}
            techniqueName={technique.title}
            onComplete={handleTimerComplete}
            onCancel={handleTimerCancel}
          />

          {/* Instructions en mode compact */}
          {currentLevel && (
            <div className="mt-auto pt-6 border-t border-eclipse-muted/20">
              <p className="text-eclipse-muted text-sm mb-3">Instructions :</p>
              <ol className="space-y-2 text-sm text-eclipse-text/80">
                {currentLevel.instructions.slice(0, 3).map((instruction, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-eclipse-muted">{index + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
                {currentLevel.instructions.length > 3 && (
                  <li className="text-eclipse-muted">
                    + {currentLevel.instructions.length - 3} autres étapes...
                  </li>
                )}
              </ol>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Fiche technique avec sélection de niveau */}
          <TechniqueCard
            technique={technique}
            category={category}
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
            onFavorite={handleFavorite}
            isFavorite={isFavorite}
            onDone={selectedLevel ? handleDone : undefined}
            onAnother={handleAnother}
            onStartTimer={selectedLevel && currentLevel?.timer ? handleStartTimer : undefined}
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
