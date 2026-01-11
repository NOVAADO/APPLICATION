"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DrawButton } from "@/components/DrawButton";
import { DurationFilter } from "@/components/DurationFilter";
import { ContextFilter, type ContextOption } from "@/components/ContextFilter";
import { drawTechnique, countAvailableTechniques } from "@/lib/techniques";
import type { Duration, Preset } from "@/lib/types";

/**
 * Page d'accueil - Éclipse NOVA ADO
 *
 * Objectif : technique en < 10 secondes
 * Microcopy : "T'as besoin d'une pause ?"
 */
export default function HomePage() {
  const router = useRouter();
  const [duration, setDuration] = useState<Duration | null>(null);
  const [context, setContext] = useState<ContextOption>("all");
  const [isDrawing, setIsDrawing] = useState(false);

  // Convertir le contexte en preset (null si "all")
  const preset: Preset | null = context === "all" ? null : context;

  // Calculer les durées incompatibles selon le contexte
  // Preset A (Public) : max 120s → pas de 5 min
  const disabledDurations: Duration[] = context === "A" ? [5] : [];

  // Compter les techniques disponibles avec les filtres actuels
  const availableCount = countAvailableTechniques({ duration, preset });

  // Réinitialiser la durée si elle devient incompatible avec le contexte
  useEffect(() => {
    if (duration && disabledDurations.includes(duration)) {
      setDuration(null);
    }
  }, [context, duration, disabledDurations]);

  const handleDraw = () => {
    setIsDrawing(true);

    // Petit délai pour le feedback visuel
    setTimeout(() => {
      const technique = drawTechnique({ duration, preset });

      if (technique) {
        router.push(`/technique/${technique.id}`);
      } else {
        // Fallback si aucune technique trouvée (ne devrait pas arriver)
        setIsDrawing(false);
      }
    }, 150);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
      {/* Titre principal */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
        T&apos;as besoin d&apos;une pause ?
      </h1>

      {/* Sous-titre */}
      <p className="text-eclipse-muted text-center mb-10">
        Une technique. 2 à 5 minutes. Direct.
      </p>

      {/* Sélecteur de contexte */}
      <div className="mb-6">
        <ContextFilter selected={context} onChange={setContext} />
      </div>

      {/* Filtres durée */}
      <div className="mb-8">
        <DurationFilter
          selected={duration}
          onChange={setDuration}
          disabledDurations={disabledDurations}
        />
      </div>

      {/* État vide : aucune technique disponible */}
      {availableCount === 0 ? (
        <div className="text-center mb-4">
          <p className="text-eclipse-muted mb-4">
            Aucune technique disponible avec ces filtres.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                setContext("all");
                setDuration(null);
              }}
              className="px-4 py-2 rounded-lg bg-eclipse-accent text-eclipse-bg font-medium touch-feedback"
            >
              Tout afficher
            </button>
            <button
              onClick={() => setDuration(null)}
              className="px-4 py-2 rounded-lg bg-eclipse-card text-eclipse-text border border-eclipse-muted/30 font-medium touch-feedback hover:border-eclipse-accent/50"
            >
              Retirer le filtre durée
            </button>
          </div>
        </div>
      ) : (
        /* CTA principal */
        <DrawButton onClick={handleDraw} disabled={isDrawing} />
      )}

      {/* Séparateur */}
      <div className="flex items-center gap-4 my-8 w-full max-w-xs">
        <div className="flex-1 h-px bg-eclipse-muted/30" />
        <span className="text-eclipse-muted text-sm">ou</span>
        <div className="flex-1 h-px bg-eclipse-muted/30" />
      </div>

      {/* CTA secondaire */}
      <button
        onClick={() => router.push("/categories")}
        className="text-eclipse-accent hover:underline underline-offset-4 transition-colors"
      >
        Choisis une catégorie
      </button>

      {/* Footer discret */}
      <footer className="mt-auto pt-12 text-center">
        <p className="text-eclipse-muted/60 text-xs">
          Conçu au Québec •{" "}
          <a
            href="https://novaado.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-eclipse-muted transition-colors"
          >
            novaado.ca
          </a>
          {" "}•{" "}
          <a
            href="/mentions-legales"
            className="hover:text-eclipse-muted transition-colors"
          >
            Mentions légales
          </a>
        </p>
      </footer>
    </div>
  );
}
