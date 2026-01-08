"use client";

import type { Duration } from "@/lib/types";

interface DurationFilterProps {
  selected: Duration | null;
  onChange: (duration: Duration | null) => void;
  disabledDurations?: Duration[];
}

/**
 * Filtres de durée - "2 min" ou "5 min"
 * Microcopy NOVA ADO : direct, pas de blabla
 */
export function DurationFilter({ selected, onChange, disabledDurations = [] }: DurationFilterProps) {
  const durations: { value: Duration; label: string }[] = [
    { value: 2, label: "2 min" },
    { value: 5, label: "5 min" },
  ];

  return (
    <div
      className="flex gap-3 justify-center"
      role="group"
      aria-label="Filtre par durée"
    >
      {durations.map(({ value, label }) => {
        const isSelected = selected === value;
        const isDisabled = disabledDurations.includes(value);
        return (
          <button
            key={value}
            onClick={() => !isDisabled && onChange(isSelected ? null : value)}
            disabled={isDisabled}
            className={`
              px-6 py-2.5 rounded-full text-base font-medium
              transition-all duration-150
              ${isDisabled
                ? "bg-eclipse-card/50 text-eclipse-muted/50 border border-eclipse-muted/20 cursor-not-allowed"
                : isSelected
                  ? "bg-eclipse-accent text-eclipse-bg touch-feedback"
                  : "bg-eclipse-card text-eclipse-text border border-eclipse-muted/30 hover:border-eclipse-accent/50 touch-feedback"
              }
            `}
            aria-pressed={isSelected}
            aria-disabled={isDisabled}
            title={isDisabled ? "Non disponible avec ce contexte" : undefined}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
