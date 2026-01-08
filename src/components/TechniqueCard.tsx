"use client";

import type { Technique, Category } from "@/lib/types";
import { formatDuration, formatIntensity } from "@/lib/techniques";

interface TechniqueCardProps {
  technique: Technique;
  category?: Category;
  onFavorite?: () => void;
  isFavorite?: boolean;
  onDone?: () => void;
  onAnother?: () => void;
  onStartTimer?: () => void;
}

/**
 * Fiche complète d'une technique
 * Affiche : titre, métadonnées, instructions, note, matériel
 */
export function TechniqueCard({
  technique,
  category,
  onFavorite,
  isFavorite = false,
  onDone,
  onAnother,
  onStartTimer,
}: TechniqueCardProps) {
  const categoryColor = category?.color || "#7DD3FC";

  return (
    <article className="flex flex-col h-full">
      {/* En-tête avec métadonnées */}
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">
          {technique.title}
        </h1>

        {/* Tags : durée, intensité, catégorie */}
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="px-3 py-1 rounded-full bg-eclipse-card text-eclipse-muted">
            {formatDuration(technique.duration)}
          </span>
          <span className="px-3 py-1 rounded-full bg-eclipse-card text-eclipse-muted">
            {formatIntensity(technique.intensity)}
          </span>
          {category && (
            <span
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
            >
              {category.name}
            </span>
          )}
        </div>
      </header>

      {/* Matériel requis */}
      {technique.material && (
        <div className="mb-4 p-3 rounded-lg bg-eclipse-card/50 border border-eclipse-muted/20">
          <span className="text-eclipse-muted text-sm">Besoin : </span>
          <span className="text-eclipse-text">{technique.material}</span>
        </div>
      )}

      {/* Instructions numérotées */}
      <ol className="space-y-4 mb-6 flex-1" aria-label="Instructions">
        {technique.instructions.map((instruction, index) => (
          <li key={index} className="flex gap-4">
            <span
              className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium"
              style={{ backgroundColor: `${categoryColor}30`, color: categoryColor }}
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <span className="text-eclipse-text leading-relaxed pt-0.5">
              {instruction}
            </span>
          </li>
        ))}
      </ol>

      {/* Note contextuelle */}
      {technique.note && (
        <p className="text-eclipse-muted text-sm italic mb-6 px-4 py-3 bg-eclipse-card/30 rounded-lg">
          {technique.note}
        </p>
      )}

      {/* Actions */}
      <div className="mt-auto space-y-3">
        {/* Bouton Timer (si la technique a un timer) */}
        {onStartTimer && (
          <button
            onClick={onStartTimer}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-souffle to-ancrage text-eclipse-bg font-semibold text-lg touch-feedback hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            aria-label={`Lancer le timer pour ${technique.title}`}
          >
            <span aria-hidden="true">▶</span>
            Lancer le timer
          </button>
        )}

        {/* Bouton principal */}
        {onDone && (
          <button
            onClick={onDone}
            className={`w-full py-3.5 rounded-xl font-semibold text-lg touch-feedback hover:opacity-90 transition-opacity ${
              onStartTimer
                ? "bg-eclipse-card border border-eclipse-muted/30 text-eclipse-text"
                : "bg-gradient-to-r from-ancrage to-souffle text-eclipse-bg"
            }`}
          >
            C&apos;est fait
          </button>
        )}

        {/* Actions secondaires */}
        <div className="flex gap-3">
          {onFavorite && (
            <button
              onClick={onFavorite}
              className={`flex-1 py-3 rounded-xl border font-medium touch-feedback transition-all ${
                isFavorite
                  ? "border-yellow-400 text-yellow-400 bg-yellow-400/10"
                  : "border-eclipse-muted/30 text-eclipse-muted hover:border-yellow-400/50 hover:text-yellow-400"
              }`}
              aria-pressed={isFavorite}
              aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              {isFavorite ? "★ Favori" : "☆ Favori"}
            </button>
          )}

          {onAnother && (
            <button
              onClick={onAnother}
              className="flex-1 py-3 rounded-xl border border-eclipse-muted/30 text-eclipse-muted font-medium touch-feedback hover:border-eclipse-accent/50 hover:text-eclipse-accent transition-all"
            >
              Autre technique
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
