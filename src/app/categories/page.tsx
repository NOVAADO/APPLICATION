"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { getSortedCategories, getFreeTechniques } from "@/lib/techniques";
import { DEMO_MICROCOPY } from "@/lib/demo";

/**
 * Filtres CSS pour teinter les SVG selon la couleur de catégorie
 * Convertit un SVG noir en couleur cible
 */
const COLOR_FILTERS: Record<string, string> = {
  "#7DD3FC": "brightness(0) saturate(100%) invert(79%) sepia(31%) saturate(593%) hue-rotate(166deg) brightness(102%) contrast(98%)", // Souffle - bleu clair
  "#4ADE80": "brightness(0) saturate(100%) invert(76%) sepia(47%) saturate(459%) hue-rotate(83deg) brightness(93%) contrast(92%)", // Ancrage - vert
  "#EF4444": "brightness(0) saturate(100%) invert(36%) sepia(95%) saturate(2754%) hue-rotate(339deg) brightness(98%) contrast(92%)", // Paroles fortes - rouge
  "#2DD4BF": "brightness(0) saturate(100%) invert(76%) sepia(45%) saturate(482%) hue-rotate(118deg) brightness(93%) contrast(91%)", // Combinaison - turquoise
  "#FB923C": "brightness(0) saturate(100%) invert(67%) sepia(53%) saturate(1226%) hue-rotate(334deg) brightness(101%) contrast(97%)", // Décharge - orange
  "#A78BFA": "brightness(0) saturate(100%) invert(59%) sepia(76%) saturate(456%) hue-rotate(210deg) brightness(101%) contrast(96%)", // Faire le point - violet
  "#FBBF24": "brightness(0) saturate(100%) invert(76%) sepia(67%) saturate(583%) hue-rotate(356deg) brightness(103%) contrast(97%)", // Chaos - jaune
  "#94A3B8": "brightness(0) saturate(100%) invert(68%) sepia(12%) saturate(419%) hue-rotate(176deg) brightness(95%) contrast(89%)", // Carte blanche - gris-bleu
};

/**
 * Page Catégories
 *
 * Grille des catégories avec pictos SVG et descriptions
 * Les catégories premium sont marquées mais accessibles (pour le MVP, tout est débloqué)
 */
export default function CategoriesPage() {
  const router = useRouter();
  const categories = getSortedCategories();
  const freeTechniques = getFreeTechniques();

  // Compter les techniques gratuites par catégorie (2 par catégorie max)
  const countByCategory = (categoryId: string) =>
    freeTechniques.filter((t) => t.category === categoryId).length;

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
        {categories.map((category) => {
          // Carte blanche est toujours verrouillée (pas de cartes dans la PWA)
          const isCarteBlanche = category.id === "carte-blanche";
          const cardCount = countByCategory(category.id);

          return (
            <button
              key={category.id}
              onClick={() => !isCarteBlanche && router.push(`/categories/${category.id}`)}
              className={`relative p-5 rounded-2xl text-left transition-all ${
                isCarteBlanche
                  ? "opacity-60 cursor-default"
                  : "touch-feedback hover:scale-[1.02]"
              }`}
              style={{
                backgroundColor: `${category.color}15`,
                borderColor: `${category.color}30`,
                borderWidth: "1px",
              }}
              role="listitem"
              aria-disabled={isCarteBlanche}
            >
              {/* Badge : Carte blanche verrouillée avec cadenas, autres catégories affichent le nombre de cartes */}
              {isCarteBlanche ? (
                <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full bg-eclipse-card text-eclipse-muted flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  {DEMO_MICROCOPY.cardLocked}
                </span>
              ) : cardCount > 0 ? (
                <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full bg-eclipse-card text-eclipse-muted">
                  {cardCount} carte{cardCount > 1 ? "s" : ""}
                </span>
              ) : null}

              {/* Picto catégorie - teinté avec la couleur de la catégorie */}
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
                  style={{
                    filter: COLOR_FILTERS[category.color] || "none",
                  }}
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
                {isCarteBlanche
                  ? "Disponible dans la boîte Éclipse"
                  : category.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
