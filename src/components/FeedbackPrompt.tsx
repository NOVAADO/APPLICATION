"use client";

import type { Feedback } from "@/lib/types";

interface FeedbackPromptProps {
  onFeedback: (feedback: Feedback) => void;
  onSkip: () => void;
}

/**
 * Feedback post-technique - optionnel et rapide
 *
 * ADN : pictogrammes noirs (pas d'émojis), texte visible, 100% optionnel
 * A11y : aria-label complets, navigation clavier, skip visible
 */
export function FeedbackPrompt({ onFeedback, onSkip }: FeedbackPromptProps) {
  return (
    <div className="text-center py-8">
      <p className="text-eclipse-muted text-sm mb-6">
        Comment tu te sens ?
      </p>

      <div
        className="flex justify-center gap-4"
        role="radiogroup"
        aria-label="Évaluation de la technique"
      >
        {/* Ça a aidé */}
        <button
          onClick={() => onFeedback("helped")}
          className="flex flex-col items-center gap-2 p-4 rounded-xl border border-eclipse-muted/30 hover:border-ancrage/50 hover:bg-ancrage/10 transition-all touch-feedback min-w-[80px]"
          aria-label="Ça a aidé"
        >
          <svg
            className="w-8 h-8 text-eclipse-text"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-xs text-eclipse-muted">Ça aide</span>
        </button>

        {/* Neutre */}
        <button
          onClick={() => onFeedback("meh")}
          className="flex flex-col items-center gap-2 p-4 rounded-xl border border-eclipse-muted/30 hover:border-eclipse-accent/50 hover:bg-eclipse-accent/10 transition-all touch-feedback min-w-[80px]"
          aria-label="Sans avis"
        >
          <svg
            className="w-8 h-8 text-eclipse-text"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 12h8M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-xs text-eclipse-muted">Bof</span>
        </button>

        {/* Pas pour moi */}
        <button
          onClick={() => onFeedback("nope")}
          className="flex flex-col items-center gap-2 p-4 rounded-xl border border-eclipse-muted/30 hover:border-decharge/50 hover:bg-decharge/10 transition-all touch-feedback min-w-[80px]"
          aria-label="Pas pour moi"
        >
          <svg
            className="w-8 h-8 text-eclipse-text"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-xs text-eclipse-muted">Pas pour moi</span>
        </button>
      </div>

      {/* Bouton passer - toujours visible */}
      <button
        onClick={onSkip}
        className="mt-6 text-eclipse-muted/60 text-sm hover:text-eclipse-muted transition-colors"
        aria-label="Passer cette question"
      >
        Passer
      </button>
    </div>
  );
}
