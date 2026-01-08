"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getSettings } from "@/lib/settings";

type TimerPhase = "idle" | "prepare" | "technique" | "cooldown" | "done";

interface TimerProps {
  /** Durée de la technique en secondes */
  duration: number;
  /** Nom de la phase technique (affiché pendant l'exécution) */
  techniqueName?: string;
  /** Callback quand le timer est terminé */
  onComplete?: () => void;
  /** Callback quand le timer est annulé */
  onCancel?: () => void;
}

// Durées des phases fixes (en secondes)
const PREPARE_DURATION = 5;
const COOLDOWN_DURATION = 5;

/**
 * Timer guidé MVP - 3 phases
 *
 * 1. Prépare (5s) - "Installe-toi"
 * 2. Technique (durée variable) - Exécution
 * 3. Reviens (5s) - "Reprends doucement"
 *
 * Contrôles : Démarrer / Pause / Reprendre / Terminer
 * A11y : aria-live pour changements de phase, boutons accessibles clavier
 * Offline : aucune dépendance externe
 */
export function Timer({
  duration,
  techniqueName = "Technique",
  onComplete,
  onCancel,
}: TimerProps) {
  const [phase, setPhase] = useState<TimerPhase>("idle");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [phaseAnnouncement, setPhaseAnnouncement] = useState("");
  const [announcementsEnabled, setAnnouncementsEnabled] = useState(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Charger le réglage des annonces
  useEffect(() => {
    const settings = getSettings();
    setAnnouncementsEnabled(settings.timerAnnouncements);
  }, []);

  // Durée totale de la phase technique
  const techniqueDuration = duration > 0 ? duration : 60; // 60s par défaut

  // Nettoyer l'intervalle
  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Démarrer une phase
  const startPhase = useCallback((newPhase: TimerPhase, phaseDuration: number) => {
    setPhase(newPhase);
    setTimeRemaining(phaseDuration);
    setIsPaused(false);

    // Annonce pour lecteur d'écran (si activé dans les réglages)
    if (announcementsEnabled) {
      const announcements: Record<TimerPhase, string> = {
        idle: "",
        prepare: "Phase de préparation. Installe-toi.",
        technique: `Phase technique. ${techniqueName}.`,
        cooldown: "Phase de retour. Reprends doucement.",
        done: "Terminé.",
      };
      setPhaseAnnouncement(announcements[newPhase]);
    } else {
      setPhaseAnnouncement("");
    }
  }, [techniqueName, announcementsEnabled]);

  // Gérer la transition entre phases
  const handlePhaseComplete = useCallback(() => {
    clearTimer();

    switch (phase) {
      case "prepare":
        startPhase("technique", techniqueDuration);
        break;
      case "technique":
        startPhase("cooldown", COOLDOWN_DURATION);
        break;
      case "cooldown":
        setPhase("done");
        if (announcementsEnabled) {
          setPhaseAnnouncement("Terminé.");
        }
        onComplete?.();
        break;
      default:
        break;
    }
  }, [phase, techniqueDuration, startPhase, clearTimer, onComplete, announcementsEnabled]);

  // Effet pour le décompte
  useEffect(() => {
    if (phase === "idle" || phase === "done" || isPaused) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handlePhaseComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearTimer();
  }, [phase, isPaused, handlePhaseComplete, clearTimer]);

  // Actions utilisateur
  const handleStart = () => {
    startPhase("prepare", PREPARE_DURATION);
  };

  const handlePause = () => {
    setIsPaused(true);
    clearTimer();
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleStop = () => {
    clearTimer();
    setPhase("idle");
    setTimeRemaining(0);
    setIsPaused(false);
    onCancel?.();
  };

  // Formater le temps (mm:ss)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Texte de la phase actuelle
  const getPhaseText = (): string => {
    switch (phase) {
      case "idle":
        return "Prêt ?";
      case "prepare":
        return "Installe-toi...";
      case "technique":
        return techniqueName;
      case "cooldown":
        return "Reprends doucement...";
      case "done":
        return "C'est fait.";
      default:
        return "";
    }
  };

  // Couleur selon la phase
  const getPhaseColor = (): string => {
    switch (phase) {
      case "prepare":
        return "text-yellow-400";
      case "technique":
        return "text-souffle";
      case "cooldown":
        return "text-ancrage";
      case "done":
        return "text-ancrage";
      default:
        return "text-eclipse-text";
    }
  };

  // Indicateur de progression
  const getProgress = (): number => {
    let totalPhase = 0;
    switch (phase) {
      case "prepare":
        totalPhase = PREPARE_DURATION;
        break;
      case "technique":
        totalPhase = techniqueDuration;
        break;
      case "cooldown":
        totalPhase = COOLDOWN_DURATION;
        break;
      default:
        return 0;
    }
    return ((totalPhase - timeRemaining) / totalPhase) * 100;
  };

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      {/* Annonce pour lecteurs d'écran (aria-live polite, pas de spam) */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {phaseAnnouncement}
      </div>

      {/* Affichage principal */}
      <div className="text-center">
        {/* Phase actuelle */}
        <p className={`text-lg font-medium mb-2 ${getPhaseColor()}`}>
          {getPhaseText()}
        </p>

        {/* Temps restant */}
        {phase !== "idle" && phase !== "done" && (
          <p
            className="text-5xl sm:text-6xl font-bold tabular-nums"
            aria-label={`Temps restant : ${formatTime(timeRemaining)}`}
          >
            {formatTime(timeRemaining)}
          </p>
        )}
      </div>

      {/* Barre de progression */}
      {phase !== "idle" && phase !== "done" && (
        <div
          className="w-full max-w-xs h-2 bg-eclipse-card rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={Math.round(getProgress())}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progression de la phase"
        >
          <div
            className={`h-full transition-all duration-1000 ease-linear ${
              phase === "prepare"
                ? "bg-yellow-400"
                : phase === "technique"
                ? "bg-souffle"
                : "bg-ancrage"
            }`}
            style={{ width: `${getProgress()}%` }}
          />
        </div>
      )}

      {/* Indicateur pause */}
      {isPaused && (
        <p className="text-eclipse-muted text-sm animate-pulse">
          En pause
        </p>
      )}

      {/* Contrôles */}
      <div className="flex gap-3 flex-wrap justify-center">
        {/* État idle : bouton Démarrer */}
        {phase === "idle" && (
          <button
            onClick={handleStart}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-souffle to-ancrage text-eclipse-bg font-semibold text-lg touch-feedback hover:opacity-90 transition-opacity"
          >
            Démarrer
          </button>
        )}

        {/* En cours : Pause/Reprendre + Terminer */}
        {phase !== "idle" && phase !== "done" && (
          <>
            {isPaused ? (
              <button
                onClick={handleResume}
                className="px-6 py-3 rounded-xl bg-souffle text-eclipse-bg font-medium touch-feedback hover:opacity-90 transition-opacity"
                aria-label="Reprendre le timer"
              >
                ▶ Reprendre
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="px-6 py-3 rounded-xl bg-eclipse-card border border-eclipse-muted/30 text-eclipse-text font-medium touch-feedback hover:border-eclipse-accent/50 transition-all"
                aria-label="Mettre en pause"
              >
                ⏸ Pause
              </button>
            )}

            <button
              onClick={handleStop}
              className="px-6 py-3 rounded-xl border border-eclipse-muted/30 text-eclipse-muted font-medium touch-feedback hover:border-red-400/50 hover:text-red-400 transition-all"
              aria-label="Terminer et quitter le timer"
            >
              ✕ Terminer
            </button>
          </>
        )}

        {/* Terminé : message de confirmation */}
        {phase === "done" && (
          <p className="text-ancrage font-medium text-lg">
            Bien joué.
          </p>
        )}
      </div>

      {/* Phases restantes (indicateur discret) */}
      {phase !== "idle" && phase !== "done" && (
        <div className="flex gap-2 mt-2">
          <span
            className={`w-2 h-2 rounded-full ${
              phase === "prepare" ? "bg-yellow-400" : "bg-eclipse-muted/30"
            }`}
            aria-hidden="true"
          />
          <span
            className={`w-2 h-2 rounded-full ${
              phase === "technique" ? "bg-souffle" : "bg-eclipse-muted/30"
            }`}
            aria-hidden="true"
          />
          <span
            className={`w-2 h-2 rounded-full ${
              phase === "cooldown" ? "bg-ancrage" : "bg-eclipse-muted/30"
            }`}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}
