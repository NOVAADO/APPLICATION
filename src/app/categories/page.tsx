"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { getSortedCategories } from "@/lib/techniques";

/**
 * Page Catégories
 *
 * Grille des catégories avec pictos SVG et descriptions
 * Les catégories premium sont marquées mais accessibles (pour le MVP, tout est débloqué)
 */
export default function CategoriesPage() {
  const router = useRouter();
  const categories = getSortedCategories();

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

      {/* Titre */}
      <h1 className="text-2xl font-bold mb-6">Catégories</h1>

      {/* Grille des catégories */}
      <div className="grid grid-cols-2 gap-4" role="list">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => router.push(`/categories/${category.id}`)}
            className="relative p-5 rounded-2xl text-left touch-feedback transition-all hover:scale-[1.02]"
            style={{
              backgroundColor: `${category.color}15`,
              borderColor: `${category.color}30`,
              borderWidth: "1px",
            }}
            role="listitem"
          >
            {/* Badge Premium */}
            {category.premium && (
              <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full bg-eclipse-card text-eclipse-muted">
                Premium
              </span>
            )}

            {/* Picto SVG catégorie */}
            <div
              className="w-12 h-12 mb-3 flex items-center justify-center"
              aria-hidden="true"
            >
              <Image
                src={`/pictos/${category.icon}`}
                alt=""
                width={48}
                height={48}
                className="w-full h-full object-contain"
                aria-hidden="true"
              />
            </div>

            {/* Nom */}
            <h2
              className="font-semibold mb-1"
              style={{ color: category.color }}
            >
              {category.name}
            </h2>

            {/* Description */}
            <p className="text-eclipse-muted text-sm">
              {category.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
