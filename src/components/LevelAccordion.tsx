"use client";

import { useRef, useEffect } from "react";
import type { MoonPhase, TechniqueLevel } from "@/lib/types";
import { MOON_PHASES } from "@/lib/types";
import { InlineTimer } from "./InlineTimer";

interface LevelAccordionProps {
  phase: MoonPhase;
  level: TechniqueLevel;
  isOpen: boolean;
  onToggle: () => void;
  categoryColor: string;
}

/**
 * Accordéon pour un niveau de technique (phase de lune).
 *
 * Replié : icône lune + durée + shortInstruction
 * Déplié : instructions complètes + minuterie optionnelle
 *
 * Règles :
 * - Pas de texte "Premier croissant" etc. — juste icône + durée
 * - Boutons ≥ 44px, aria-expanded, aria-controls
 * - Fermer l'accordéon arrête la minuterie (composant se démonte)
 */
export function LevelAccordion({
  phase,
  level,
  isOpen,
  onToggle,
  categoryColor,
}: LevelAccordionProps) {
  const phaseData = MOON_PHASES[phase];
  const contentRef = useRef<HTMLDivElement>(null);
  const panelId = `level-panel-${phase}`;
  const headerId = `level-header-${phase}`;

  // Auto-scroll vers le niveau ouvert
  useEffect(() => {
    if (isOpen && contentRef.current) {
      // Petit délai pour laisser l'animation commencer
      const timeout = setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Durée : utiliser durationLabel du niveau, fallback sur default
  const durationLabel = level.durationLabel || phaseData.defaultDurationLabel;

  // Timer duration : utiliser durationSeconds du niveau, fallback sur default
  const timerDuration = level.durationSeconds || phaseData.defaultDurationSeconds;

  return (
    <div className="rounded-xl overflow-hidden">
      {/* En-tête cliquable */}
      <button
        id={headerId}
        onClick={onToggle}
        className={`w-full min-h-[44px] flex items-center gap-3 px-4 py-3 text-left transition-colors ${
          isOpen
            ? "bg-gray-50"
            : "bg-white hover:bg-gray-50"
        }`}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        {/* Icône trio de lunes */}
        <img
          src={phaseData.icon}
          alt={phaseData.description}
          className="w-10 h-5 flex-shrink-0 object-contain"
        />

        {/* Durée */}
        <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
          {durationLabel}
        </span>

        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-gray-400 ml-auto flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Short instruction (visible quand replié) */}
      {!isOpen && level.shortInstruction && (
        <div className="px-4 pb-3 bg-white">
          <p className="text-sm text-gray-500 leading-snug">
            {level.shortInstruction}
          </p>
        </div>
      )}

      {/* Contenu déplié */}
      {isOpen && (
        <div
          id={panelId}
          ref={contentRef}
          role="region"
          aria-labelledby={headerId}
          className="px-4 pb-4 bg-gray-50"
        >
          {/* Instructions complètes */}
          <ol className="space-y-3 mt-2" aria-label="Instructions">
            {level.instructions.map((instruction, index) => (
              <li key={index} className="flex gap-3">
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white"
                  style={{ backgroundColor: categoryColor }}
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <span className="text-sm text-gray-700 leading-relaxed pt-0.5">
                  {instruction}
                </span>
              </li>
            ))}
          </ol>

          {/* Minuterie (si la technique supporte un timer pour ce niveau) */}
          {level.timer && (
            <InlineTimer duration={timerDuration} />
          )}

          {/* Micro-copy autonomie (si pas de timer) */}
          {!level.timer && (
            <p className="text-xs text-gray-400 mt-4 text-center">
              Prends le temps qu&apos;il te faut.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
