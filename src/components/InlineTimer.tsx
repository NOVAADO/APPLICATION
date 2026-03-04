"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface InlineTimerProps {
  /** Durée en secondes (borne haute du niveau). 0 = chronomètre */
  duration: number;
  /** Callback quand la minuterie est terminée */
  onComplete?: () => void;
  /** Callback quand l'utilisateur arrête manuellement */
  onStop?: () => void;
}

type TimerState = "idle" | "running" | "paused" | "done";

/**
 * Minuterie intégrée dans l'accordéon d'un niveau.
 *
 * - Compte à rebours si duration > 0
 * - Chronomètre (compte vers le haut) si duration === 0
 * - États : Idle → Running → Paused → Done
 * - Micro-copy ADN : "C'est correct. Tu peux arrêter."
 * - Boutons ≥ 44px, accessibles
 */
export function InlineTimer({ duration, onComplete, onStop }: InlineTimerProps) {
  const isCountdown = duration > 0;
  const [state, setState] = useState<TimerState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const remaining = isCountdown ? Math.max(0, duration - elapsed) : elapsed;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Nettoyage au démontage
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  // Tick
  useEffect(() => {
    if (state === "running") {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => {
          const next = prev + 1;
          if (isCountdown && next >= duration) {
            clearTimer();
            setState("done");
            onComplete?.();
            return duration;
          }
          return next;
        });
      }, 1000);
    } else {
      clearTimer();
    }

    return () => clearTimer();
  }, [state, duration, isCountdown, clearTimer, onComplete]);

  const handleStart = () => {
    setElapsed(0);
    setState("running");
  };

  const handlePause = () => {
    setState("paused");
  };

  const handleResume = () => {
    setState("running");
  };

  const handleReset = () => {
    clearTimer();
    setElapsed(0);
    setState("idle");
    onStop?.();
  };

  // Formatage mm:ss
  const displayTime = isCountdown ? remaining : elapsed;
  const minutes = Math.floor(displayTime / 60);
  const seconds = displayTime % 60;
  const timeStr = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  // Progression (0 → 1) pour le compte à rebours
  const progress = isCountdown && duration > 0 ? elapsed / duration : 0;

  return (
    <div className="mt-4" role="timer" aria-label="Minuterie">
      {/* Affichage du temps */}
      <div className="text-center mb-3">
        <span
          className={`font-mono text-2xl font-semibold ${
            state === "done" ? "text-atterris" : "text-gray-800"
          }`}
          aria-live="polite"
        >
          {timeStr}
        </span>

        {/* Barre de progression (compte à rebours uniquement) */}
        {isCountdown && state !== "idle" && (
          <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-souffle rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        )}
      </div>

      {/* Message de fin */}
      {state === "done" && (
        <p className="text-center text-sm text-gray-600 mb-3">
          C&apos;est correct. Tu peux arrêter.
        </p>
      )}

      {/* Boutons */}
      <div className="flex gap-2 justify-center">
        {state === "idle" && (
          <button
            onClick={handleStart}
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-souffle/20 text-souffle font-medium text-sm hover:bg-souffle/30 transition-colors"
            aria-label="Démarrer la minuterie"
          >
            Démarrer
          </button>
        )}

        {state === "running" && (
          <>
            <button
              onClick={handlePause}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium text-sm hover:bg-gray-200 transition-colors"
              aria-label="Mettre en pause"
            >
              Pause
            </button>
            <button
              onClick={handleReset}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-gray-100 text-gray-500 font-medium text-sm hover:bg-gray-200 transition-colors"
              aria-label="Réinitialiser la minuterie"
            >
              Arrêter
            </button>
          </>
        )}

        {state === "paused" && (
          <>
            <button
              onClick={handleResume}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-souffle/20 text-souffle font-medium text-sm hover:bg-souffle/30 transition-colors"
              aria-label="Reprendre la minuterie"
            >
              Reprendre
            </button>
            <button
              onClick={handleReset}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-gray-100 text-gray-500 font-medium text-sm hover:bg-gray-200 transition-colors"
              aria-label="Réinitialiser la minuterie"
            >
              Arrêter
            </button>
          </>
        )}

        {state === "done" && (
          <button
            onClick={handleReset}
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-gray-100 text-gray-600 font-medium text-sm hover:bg-gray-200 transition-colors"
            aria-label="Réinitialiser"
          >
            Réinitialiser
          </button>
        )}
      </div>

      {/* Micro-copy autonomie (affiché sauf en mode done qui a son propre message) */}
      {state !== "done" && state !== "idle" && (
        <p className="text-center text-xs text-gray-400 mt-2">
          Tu peux arrêter quand tu veux.
        </p>
      )}
    </div>
  );
}
