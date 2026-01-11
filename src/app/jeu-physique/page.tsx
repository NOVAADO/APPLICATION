"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

/**
 * Page Jeu Physique
 *
 * Présentation sobre du jeu de cartes Éclipse
 * Ton informatif, pas commercial
 * Accessible depuis Réglages > À propos
 */
export default function JeuPhysiquePage() {
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col px-6 py-8 pb-safe">
      {/* Bouton retour */}
      <button
        onClick={() => router.back()}
        className="self-start mb-6 text-eclipse-muted hover:text-eclipse-text transition-colors flex items-center gap-2"
        aria-label="Retour"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Retour
      </button>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Le jeu Éclipse</h1>
          <p className="text-eclipse-muted">
            52 cartes physiques pour les moments sans écran
          </p>
        </header>

        {/* Illustration */}
        <div className="mx-auto mb-8 w-48 h-32 rounded-xl bg-gradient-to-br from-souffle/20 to-ancrage/20 border border-eclipse-muted/20 flex items-center justify-center">
          <div className="text-center">
            <Image
              src="/pictos/pige-carte.svg"
              alt=""
              width={48}
              height={48}
              className="mx-auto mb-1 brightness-0 invert"
              aria-hidden="true"
            />
            <p className="text-xs text-eclipse-muted">52 cartes</p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-6 mb-8">
          <p className="text-eclipse-text leading-relaxed">
            Éclipse, c&apos;est d&apos;abord un jeu de cartes.
            Certains s&apos;en servent pour souffler entre deux cours.
            D&apos;autres, pour traverser un moment plus difficile.
          </p>

          <p className="text-eclipse-muted text-sm">
            Il n&apos;y a pas de bonne ou de mauvaise façon de l&apos;utiliser.
          </p>
        </div>

        {/* Ce que tu reçois */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-eclipse-muted uppercase tracking-wide mb-4">
            Ce que tu reçois
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-eclipse-card border border-eclipse-muted/20 text-center">
              <p className="text-2xl font-bold text-souffle">52</p>
              <p className="text-xs text-eclipse-muted mt-1">cartes</p>
            </div>
            <div className="p-4 rounded-xl bg-eclipse-card border border-eclipse-muted/20 text-center">
              <p className="text-2xl font-bold text-ancrage">8</p>
              <p className="text-xs text-eclipse-muted mt-1">catégories</p>
            </div>
            <div className="p-4 rounded-xl bg-eclipse-card border border-eclipse-muted/20 text-center">
              <p className="text-2xl font-bold text-eclipse-accent">1</p>
              <p className="text-xs text-eclipse-muted mt-1">code app</p>
            </div>
          </div>
        </section>

        {/* Pourquoi les deux */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-eclipse-muted uppercase tracking-wide mb-4">
            Pourquoi les deux?
          </h2>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-eclipse-card border border-eclipse-muted/20">
              <p className="font-medium mb-1">L&apos;app</p>
              <p className="text-sm text-eclipse-muted">
                Urgence, timer, toujours dans ta poche
              </p>
            </div>
            <div className="p-4 rounded-xl bg-eclipse-card border border-eclipse-muted/20">
              <p className="font-medium mb-1">Le jeu</p>
              <p className="text-sm text-eclipse-muted">
                Exploration, tactile, pause écran
              </p>
            </div>
          </div>
          <p className="text-eclipse-muted text-sm mt-4 text-center italic">
            C&apos;est pas l&apos;un ou l&apos;autre. C&apos;est l&apos;un et l&apos;autre.
          </p>
        </section>

        {/* Prix et CTA */}
        <div className="mt-auto space-y-4">
          <p className="text-center text-eclipse-muted text-sm">
            34,99 $ CAD • Conçu au Québec
          </p>

          <a
            href="https://novaado.ca/eclipse"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-souffle to-ancrage text-eclipse-bg font-semibold text-center touch-feedback hover:opacity-90 transition-opacity"
          >
            Voir sur novaado.ca
          </a>

          <button
            onClick={() => router.back()}
            className="block w-full py-3 text-eclipse-muted text-center hover:text-eclipse-text transition-colors"
          >
            Retour à l&apos;app
          </button>
        </div>
      </div>

      {/* Note légale */}
      <footer className="mt-6 pt-4 border-t border-eclipse-muted/20">
        <p className="text-eclipse-muted/60 text-xs text-center">
          L&apos;app reste gratuite et complète sans le jeu.
          <br />
          Pas de pression.
        </p>
      </footer>
    </div>
  );
}
