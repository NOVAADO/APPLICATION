"use client";

import { use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  getCategoryById,
  filterByCategory,
  getFreeTechniques,
  getTechniqueDurationRange,
} from "@/lib/techniques";
import { MOON_PHASES } from "@/lib/types";

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Page Liste des techniques d'une catégorie
 *
 * Affiche toutes les techniques de la catégorie avec durée et intensité
 */
export default function CategoryPage({ params }: CategoryPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const category = getCategoryById(id);
  const techniques = filterByCategory(getFreeTechniques(), id);

  // Catégorie non trouvée
  if (!category) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <p className="text-xl mb-4">Cette catégorie n&apos;existe pas.</p>
        <button
          onClick={() => router.push("/categories")}
          className="text-eclipse-accent hover:underline"
        >
          Voir les catégories
        </button>
      </div>
    );
  }

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

      {/* En-tête catégorie */}
      <header className="mb-6 flex items-center gap-4">
        {/* Picto catégorie */}
        <div className="w-14 h-14 flex-shrink-0" aria-hidden="true">
          <Image
            src={`/pictos/${category.icon}`}
            alt=""
            width={56}
            height={56}
            className="w-full h-full object-contain"
            aria-hidden="true"
          />
        </div>
        <div>
          <h1
            className="text-2xl font-bold mb-1"
            style={{ color: category.color }}
          >
            {category.name}
          </h1>
          <p className="text-eclipse-muted">{category.description}</p>
        </div>
      </header>

      {/* Liste des techniques */}
      {techniques.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <p className="text-eclipse-muted mb-4">
            Aucune technique disponible dans cette catégorie.
          </p>
          <button
            onClick={() => router.push("/")}
            className="text-eclipse-accent hover:underline"
          >
            Retour à l&apos;accueil
          </button>
        </div>
      ) : (
        <ul className="space-y-3" role="list">
          {techniques.map((technique) => (
            <li key={technique.id}>
              <button
                onClick={() => router.push(`/technique/${technique.id}`)}
                className="w-full p-4 rounded-xl bg-eclipse-card border border-eclipse-muted/20 text-left touch-feedback hover:border-eclipse-accent/30 transition-all"
              >
                <h2 className="font-medium text-eclipse-text mb-1">
                  {technique.title}
                </h2>
                <p className="text-eclipse-muted text-sm">
                  {getTechniqueDurationRange(technique)}
                </p>
                <div className="flex gap-1 mt-1">
                  {Object.entries(MOON_PHASES).map(([key, phase]) => (
                    <span key={key} className="text-xs" title={phase.description}>
                      {phase.emoji}
                    </span>
                  ))}
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
