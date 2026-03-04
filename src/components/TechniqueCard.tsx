"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import type { Technique, Category, MoonPhase } from "@/lib/types";
import { LevelAccordion } from "./LevelAccordion";
import { WaveSeparator } from "./WaveSeparator";

interface TechniqueCardProps {
  technique: Technique;
  category?: Category;
  onFavorite?: () => void;
  isFavorite?: boolean;
  onAnother?: () => void;
}

/**
 * Fiche complète d'une technique — Version 2.5.0
 *
 * Layout fond clair sur fond sombre :
 * - En-tête : picto catégorie + nom + code
 * - Titre + phrase d'ouverture (si format "levels")
 * - Accordéon 3 niveaux (si format "levels")
 * - Phrase unique (si format "accroche")
 * - Format absurde (si format "decroche")
 * - Footer : Signature + Rescue
 *
 * Règles ADN :
 * - Pas d'emoji en UI (pictos internes uniquement)
 * - Ton ado 13+, non clinique, autonomie totale
 * - Boutons min 44px, accessible
 */
export function TechniqueCard({
  technique,
  category,
  onFavorite,
  isFavorite = false,
  onAnother,
}: TechniqueCardProps) {
  const categoryColor = category?.color || "#7DD3FC";
  const [openLevel, setOpenLevel] = useState<MoonPhase | null>(null);

  const handleToggleLevel = useCallback((phase: MoonPhase) => {
    setOpenLevel((current) => (current === phase ? null : phase));
  }, []);

  const handleShare = async () => {
    const shareText = `J'ai essayé "${technique.title}" avec Éclipse. Une technique rapide pour faire pause.`;
    const shareUrl = "https://eclipse.novaado.ca";

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Éclipse - NOVA ADO",
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
          toast("Lien copié");
        }
      }
    } else {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      toast("Lien copié");
    }
  };

  const isLevelsFormat = technique.format === "levels";
  const isAccrocheFormat = technique.format === "accroche";
  const isDecrocheFormat = technique.format === "decroche";

  const moonPhases: MoonPhase[] = ["croissant", "quartier", "pleine-lune"];

  return (
    <article className="bg-white/95 rounded-2xl shadow-lg overflow-hidden">
      {/* ── En-tête catégorie ── */}
      <header
        className="px-5 pt-5 pb-3 flex items-center gap-3"
        style={{ borderBottom: `2px solid ${categoryColor}20` }}
      >
        {/* Picto catégorie */}
        {category && (
          <img
            src={`/pictos/${category.icon}`}
            alt=""
            className="w-8 h-8 flex-shrink-0"
            style={{ filter: `drop-shadow(0 0 1px ${categoryColor})` }}
          />
        )}

        <div className="flex-1 min-w-0">
          {/* Nom catégorie */}
          <h2
            className="text-sm font-semibold truncate"
            style={{ color: categoryColor }}
          >
            {category?.name}
          </h2>
          {/* Micro-description */}
          <p className="text-xs text-gray-500 truncate">
            {category?.description}
          </p>
        </div>

        {/* Code carte */}
        <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded flex-shrink-0">
          {technique.code}
        </span>
      </header>

      {/* ── Corps de la carte ── */}
      <div className="px-5 py-4">
        {/* Titre */}
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          {technique.title}
        </h1>

        {/* Phrase d'ouverture (si format levels + phrase non vide) */}
        {isLevelsFormat && technique.openingPhrase && (
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {technique.openingPhrase}
          </p>
        )}

        {/* ── FORMAT: LEVELS (accordéon 3 niveaux) ── */}
        {isLevelsFormat && (
          <div className="space-y-0">
            {moonPhases.map((phase, index) => (
              <div key={phase}>
                <LevelAccordion
                  phase={phase}
                  level={technique.levels[phase]}
                  isOpen={openLevel === phase}
                  onToggle={() => handleToggleLevel(phase)}
                  categoryColor={categoryColor}
                />
                {/* Vague entre les niveaux (sauf après le dernier) */}
                {index < moonPhases.length - 1 && (
                  <WaveSeparator color={categoryColor} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── FORMAT: ACCROCHE (phrase unique) ── */}
        {isAccrocheFormat && (
          <div className="py-6">
            <div className="space-y-4">
              {technique.levels.croissant.instructions.map((phrase, i) => (
                <p key={i} className="text-lg text-gray-800 font-medium text-center leading-relaxed">
                  {phrase}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* ── FORMAT: DÉCROCHE (format unique, PAS de phases de lune) ── */}
        {isDecrocheFormat && (
          <div className="py-4">
            <div
              className="p-4 rounded-2xl"
              style={{ backgroundColor: `${categoryColor}15` }}
            >
              <div className="space-y-2">
                {technique.levels.croissant.instructions.map((instruction, i) => (
                  <p key={i} className="text-sm text-gray-800 leading-relaxed">
                    {instruction}
                  </p>
                ))}
              </div>
            </div>
            {technique.note && (
              <p className="text-xs text-gray-400 italic mt-3 text-center">
                {technique.note}
              </p>
            )}
          </div>
        )}
      </div>

      {/* ── Footer : Signature + Rescue ── */}
      <footer
        className="px-5 py-4 space-y-2"
        style={{ borderTop: `1px solid ${categoryColor}15` }}
      >
        {/* Signature (quotidien) */}
        {technique.signature && (
          <div className="flex items-start gap-2">
            <img
              src="/pictos/etoile.svg"
              alt=""
              className="w-4 h-4 flex-shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <p className="text-sm text-gray-600">{technique.signature}</p>
          </div>
        )}

        {/* Rescue (secours) */}
        {technique.rescue && (
          <div className="flex items-start gap-2">
            <img
              src="/pictos/secours.svg"
              alt=""
              className="w-4 h-4 flex-shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <p className="text-sm text-gray-600">{technique.rescue}</p>
          </div>
        )}
      </footer>

      {/* ── Actions ── */}
      <div className="px-5 pb-5 flex gap-2">
        {onFavorite && (
          <button
            onClick={onFavorite}
            className={`min-h-[44px] flex-1 py-3 rounded-xl border font-medium text-sm transition-all ${
              isFavorite
                ? "border-amber-400 text-amber-500 bg-amber-50"
                : "border-gray-200 text-gray-500 hover:border-amber-300 hover:text-amber-500"
            }`}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            Favori
          </button>
        )}

        {onAnother && (
          <button
            onClick={onAnother}
            className="min-h-[44px] flex-1 py-3 rounded-xl border border-gray-200 text-gray-500 font-medium text-sm hover:border-gray-300 transition-all"
            aria-label="Tirer une autre technique"
          >
            Autre
          </button>
        )}

        <button
          onClick={handleShare}
          className="min-h-[44px] px-4 py-3 rounded-xl border border-gray-200 text-gray-400 hover:text-gray-600 transition-all"
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
    </article>
  );
}
