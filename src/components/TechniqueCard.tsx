"use client";

import { toast } from "sonner";
import type { Technique, Category, MoonPhase } from "@/lib/types";
import { MOON_PHASES } from "@/lib/types";
import { formatDurationSeconds } from "@/lib/techniques";

interface TechniqueCardProps {
  technique: Technique;
  category?: Category;
  selectedLevel: MoonPhase | null;
  onSelectLevel: (level: MoonPhase) => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
  onDone?: () => void;
  onAnother?: () => void;
  onStartTimer?: () => void;
}

/**
 * Fiche complète d'une technique - Version 2.0.0
 * Affiche : titre, sélection de niveau (phases de lune), instructions du niveau choisi
 */
export function TechniqueCard({
  technique,
  category,
  selectedLevel,
  onSelectLevel,
  onFavorite,
  isFavorite = false,
  onDone,
  onAnother,
  onStartTimer,
}: TechniqueCardProps) {
  const categoryColor = category?.color || "#7DD3FC";

  // Récupérer le niveau actuellement sélectionné
  const currentLevel = selectedLevel ? technique.levels[selectedLevel] : null;

  const handleShare = async () => {
    const shareText = `J'ai essayé "${technique.title}" avec Éclipse. Une technique rapide pour gérer le stress.`;
    const shareUrl = "https://eclipse.novaado.ca";

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Éclipse - NOVA ADO",
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // Utilisateur a annulé le partage
        if ((err as Error).name !== "AbortError") {
          // Fallback copie
          await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
          toast("Lien copié");
        }
      }
    } else {
      // Fallback pour desktop
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      toast("Lien copié");
    }
  };

  return (
    <article className="flex flex-col h-full">
      {/* En-tête avec titre et catégorie */}
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">
          {technique.title}
        </h1>

        {/* Tag catégorie */}
        {category && (
          <span
            className="px-3 py-1 rounded-full text-sm"
            style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
          >
            {category.name}
          </span>
        )}
      </header>

      {/* Phrase d'ouverture */}
      {technique.openingPhrase && (
        <p className="text-eclipse-muted text-lg leading-relaxed mb-6 px-1">
          {technique.openingPhrase}
        </p>
      )}

      {/* Sélection du niveau (phases de lune) */}
      <div className="mb-6">
        <p className="text-eclipse-muted text-sm mb-3">Choisis ton intensité :</p>
        <div className="grid grid-cols-3 gap-2">
          {(Object.entries(MOON_PHASES) as [MoonPhase, typeof MOON_PHASES[MoonPhase]][]).map(([key, phase]) => {
            const levelData = technique.levels[key];
            const isSelected = selectedLevel === key;

            return (
              <button
                key={key}
                onClick={() => onSelectLevel(key)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  isSelected
                    ? "border-eclipse-accent bg-eclipse-accent/10"
                    : "border-eclipse-muted/30 hover:border-eclipse-accent/50"
                }`}
                aria-pressed={isSelected}
              >
                <span className="text-2xl block mb-1">{phase.emoji}</span>
                <span className="text-sm font-medium block">{phase.label}</span>
                <span className="text-xs text-eclipse-muted block">
                  {formatDurationSeconds(levelData.durationSeconds)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Matériel requis */}
      {technique.material && (
        <div className="mb-4 p-3 rounded-lg bg-eclipse-card/50 border border-eclipse-muted/20">
          <span className="text-eclipse-muted text-sm">Besoin : </span>
          <span className="text-eclipse-text">{technique.material}</span>
        </div>
      )}

      {/* Instructions du niveau sélectionné */}
      {currentLevel && currentLevel.instructions.length > 0 && (
        <div className="mb-6 flex-1">
          <p className="text-eclipse-muted text-sm mb-3">
            {MOON_PHASES[selectedLevel!].emoji} Niveau {MOON_PHASES[selectedLevel!].label} :
          </p>
          <ol className="space-y-4" aria-label="Instructions">
            {currentLevel.instructions.map((instruction, index) => (
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
        </div>
      )}

      {/* Message si aucun niveau sélectionné */}
      {!selectedLevel && (
        <div className="mb-6 flex-1 flex items-center justify-center">
          <p className="text-eclipse-muted text-center">
            Choisis un niveau pour voir les instructions.
          </p>
        </div>
      )}

      {/* Note contextuelle */}
      {technique.note && selectedLevel && (
        <p className="text-eclipse-muted text-sm italic mb-6 px-4 py-3 bg-eclipse-card/30 rounded-lg">
          {technique.note}
        </p>
      )}

      {/* Actions */}
      <div className="mt-auto space-y-3">
        {/* Bouton Timer (si la technique a un timer pour ce niveau) */}
        {onStartTimer && selectedLevel && (
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
        {onDone && selectedLevel && (
          <button
            onClick={onDone}
            className={`w-full py-3.5 rounded-xl font-semibold text-lg touch-feedback hover:opacity-90 transition-opacity ${
              onStartTimer
                ? "bg-eclipse-card border border-eclipse-muted/30 text-eclipse-text"
                : "bg-gradient-to-r from-ancrage to-souffle text-eclipse-bg"
            }`}
            aria-label={`Marquer ${technique.title} comme fait`}
          >
            C&apos;est fait
          </button>
        )}

        {/* Actions secondaires */}
        <div className="flex gap-2">
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
              aria-label="Tirer une autre technique"
            >
              Autre
            </button>
          )}

          <button
            onClick={handleShare}
            className="px-4 py-3 rounded-xl border border-eclipse-muted/30 text-eclipse-muted font-medium touch-feedback hover:border-souffle/50 hover:text-souffle transition-all"
            aria-label="Partager cette technique"
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
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
