"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DrawButton } from "@/components/DrawButton";
import { GamePromoCard } from "@/components/GamePromoCard";
import { drawTechnique, countAvailableTechniques } from "@/lib/techniques";
import { isDemoMode, DEMO_MICROCOPY } from "@/lib/demo";

/**
 * Page d'accueil - Éclipse NOVA ADO
 * Version 2.0.0 - Interface simplifiée
 *
 * Objectif : technique en < 10 secondes
 * Microcopy : "T'as besoin d'une pause ?"
 */
export default function HomePage() {
  const router = useRouter();
  const [isDrawing, setIsDrawing] = useState(false);

  // Compter les techniques disponibles
  const availableCount = countAvailableTechniques();

  const handleDraw = () => {
    setIsDrawing(true);

    // Petit délai pour le feedback visuel
    setTimeout(() => {
      const technique = drawTechnique();

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
        Une technique. À ton rythme. Direct.
      </p>

      {/* État vide : aucune technique disponible */}
      {availableCount === 0 ? (
        <div className="text-center mb-4">
          <p className="text-eclipse-muted mb-4">
            {isDemoMode()
              ? DEMO_MICROCOPY.emptyStateDemo
              : "Aucune technique disponible."}
          </p>
          {isDemoMode() && (
            <p className="text-eclipse-muted/60 text-sm mb-4">
              {DEMO_MICROCOPY.emptyStateHint}
            </p>
          )}
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

      {/* Carte promo jeu physique (affichée 1 seule fois après 5 techniques) */}
      <GamePromoCard />
    </div>
  );
}
