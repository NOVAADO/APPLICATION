"use client";

import type { Preset } from "@/lib/types";
import {
  getFreeTechniques,
  getPresetATechniques,
  getPresetBTechniques,
} from "@/lib/techniques";

export type ContextOption = Preset | "all";

interface ContextFilterProps {
  selected: ContextOption;
  onChange: (context: ContextOption) => void;
}

/**
 * Sélecteur de contexte — Presets Éclipse
 * - Public (école/bus) = Preset A
 * - Tranquille = Preset B
 * - Toutes = comportement par défaut
 */
export function ContextFilter({ selected, onChange }: ContextFilterProps) {
  // Compteurs de techniques par contexte
  const counts = {
    all: getFreeTechniques().length,
    A: getPresetATechniques().filter((t) => !t.premium).length,
    B: getPresetBTechniques().filter((t) => !t.premium).length,
  };

  const options: { value: ContextOption; label: string; description: string }[] = [
    { value: "all", label: "Toutes", description: "Toutes les techniques" },
    { value: "A", label: "Public", description: "École, bus, file d'attente" },
    { value: "B", label: "Tranquille", description: "Pause, coin tranquille" },
  ];

  return (
    <div
      className="flex flex-col gap-2 items-center"
      role="group"
      aria-label="Contexte"
    >
      <span className="text-eclipse-muted text-sm">Où es-tu ?</span>
      <div className="flex gap-2">
        {options.map(({ value, label, description }) => {
          const isSelected = selected === value;
          const count = counts[value];
          return (
            <button
              key={value}
              onClick={() => onChange(value)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-150 touch-feedback
                ${isSelected
                  ? "bg-eclipse-accent text-eclipse-bg"
                  : "bg-eclipse-card text-eclipse-text border border-eclipse-muted/30 hover:border-eclipse-accent/50"
                }
              `}
              aria-pressed={isSelected}
              title={description}
            >
              {label} ({count})
            </button>
          );
        })}
      </div>
    </div>
  );
}
