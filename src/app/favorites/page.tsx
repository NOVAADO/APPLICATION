"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  getTechniqueById,
  getCategoryById,
  formatDuration,
  formatIntensity,
} from "@/lib/techniques";
import { getSettings } from "@/lib/settings";
import type { Technique } from "@/lib/types";

type SortOption = "az" | "recent";

interface HistoryEntry {
  techniqueId: string;
  timestamp: number;
}

/**
 * Page Favoris
 *
 * Affiche les techniques favorites stockées dans localStorage
 * Tri : A-Z ou Récents (basé sur l'historique)
 * Actions : accès fiche, retirer favori
 */
export default function FavoritesPage() {
  const router = useRouter();

  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [sortBy, setSortBy] = useState<SortOption | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger favoris, historique et réglages depuis localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("eclipse-favorites");
    const storedHistory = localStorage.getItem("eclipse-history");

    if (storedFavorites) {
      try {
        setFavoriteIds(JSON.parse(storedFavorites));
      } catch {
        // Ignore
      }
    }

    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch {
        // Ignore
      }
    }

    // Charger le tri par défaut depuis les réglages
    const settings = getSettings();
    setSortBy(settings.defaultFavoritesSort);

    setIsLoaded(true);
  }, []);

  // Récupérer les techniques favorites avec leurs données
  const favorites = useMemo(() => {
    return favoriteIds
      .map((id) => getTechniqueById(id))
      .filter((t): t is Technique => t !== undefined);
  }, [favoriteIds]);

  // Trier les favoris
  const sortedFavorites = useMemo(() => {
    const sorted = [...favorites];
    const currentSort = sortBy ?? "recent"; // Fallback avant chargement

    if (currentSort === "az") {
      sorted.sort((a, b) => a.title.localeCompare(b.title, "fr-CA"));
    } else if (currentSort === "recent") {
      // Trier par dernière utilisation (historique)
      const lastUsed = new Map<string, number>();
      history.forEach((entry) => {
        if (!lastUsed.has(entry.techniqueId)) {
          lastUsed.set(entry.techniqueId, entry.timestamp);
        }
      });

      sorted.sort((a, b) => {
        const timeA = lastUsed.get(a.id) || 0;
        const timeB = lastUsed.get(b.id) || 0;
        return timeB - timeA; // Plus récent en premier
      });
    }

    return sorted;
  }, [favorites, sortBy, history]);

  // Retirer un favori
  const handleRemoveFavorite = (techniqueId: string) => {
    const newFavorites = favoriteIds.filter((id) => id !== techniqueId);
    setFavoriteIds(newFavorites);
    localStorage.setItem("eclipse-favorites", JSON.stringify(newFavorites));
  };

  // Naviguer vers une technique
  const handleGoToTechnique = (techniqueId: string) => {
    router.push(`/technique/${techniqueId}`);
  };

  // État de chargement
  if (!isLoaded) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-eclipse-muted">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col px-6 py-8 pb-safe">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">Tes favoris</h1>
          {favorites.length > 0 && (
            <span className="text-eclipse-muted text-sm">
              {favorites.length} favori{favorites.length > 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Tri (seulement si on a des favoris) */}
        {favorites.length > 1 && (
          <div
            className="flex gap-2 mt-4"
            role="group"
            aria-label="Trier par"
          >
            <button
              onClick={() => setSortBy("az")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                sortBy === "az"
                  ? "bg-eclipse-accent text-eclipse-bg"
                  : "bg-eclipse-card text-eclipse-muted border border-eclipse-muted/30"
              }`}
              aria-pressed={sortBy === "az"}
            >
              A–Z
            </button>
            <button
              onClick={() => setSortBy("recent")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                sortBy === "recent" || sortBy === null
                  ? "bg-eclipse-accent text-eclipse-bg"
                  : "bg-eclipse-card text-eclipse-muted border border-eclipse-muted/30"
              }`}
              aria-pressed={sortBy === "recent" || sortBy === null}
            >
              Récents
            </button>
          </div>
        )}
      </header>

      {/* Liste vide */}
      {favorites.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <p className="text-xl font-medium mb-2">Pas encore de favoris.</p>
          <p className="text-eclipse-muted mb-8">
            Quand tu trouves une technique qui marche, appuie sur ★
          </p>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button
              onClick={() => router.push("/")}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-souffle to-ancrage text-eclipse-bg font-semibold text-lg touch-feedback hover:opacity-90 transition-opacity"
            >
              Tirer une technique
            </button>
            <button
              onClick={() => router.push("/categories")}
              className="w-full py-3 rounded-xl border border-eclipse-muted/30 text-eclipse-muted font-medium touch-feedback hover:border-eclipse-accent/50 hover:text-eclipse-accent transition-all"
            >
              Voir les catégories
            </button>
          </div>
        </div>
      ) : (
        /* Liste des favoris */
        <ul className="space-y-3 flex-1" role="list" aria-label="Liste des favoris">
          {sortedFavorites.map((technique) => {
            const category = getCategoryById(technique.category);
            const categoryColor = category?.color || "#7DD3FC";

            return (
              <li key={technique.id}>
                <div className="flex items-stretch gap-2">
                  {/* Carte technique (cliquable) */}
                  <button
                    onClick={() => handleGoToTechnique(technique.id)}
                    className="flex-1 p-4 rounded-xl bg-eclipse-card border border-eclipse-muted/20 text-left touch-feedback hover:border-eclipse-accent/30 transition-all flex items-center gap-3"
                    aria-label={`Voir ${technique.title}`}
                  >
                    {/* Picto catégorie */}
                    {category && (
                      <div className="w-10 h-10 flex-shrink-0" aria-hidden="true">
                        <Image
                          src={`/pictos/${category.icon}`}
                          alt=""
                          width={40}
                          height={40}
                          className="w-full h-full object-contain"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h2 className="font-medium text-eclipse-text mb-1 truncate">
                        {technique.title}
                      </h2>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-eclipse-muted">
                          {formatDuration(technique.duration)}
                        </span>
                        <span className="text-eclipse-muted/50">•</span>
                        <span className="text-eclipse-muted">
                          {formatIntensity(technique.intensity)}
                        </span>
                        {category && (
                          <>
                            <span className="text-eclipse-muted/50">•</span>
                            <span style={{ color: categoryColor }}>
                              {category.name}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Bouton retirer */}
                  <button
                    onClick={() => handleRemoveFavorite(technique.id)}
                    className="px-4 rounded-xl bg-eclipse-card border border-eclipse-muted/20 text-yellow-400 hover:bg-red-500/10 hover:border-red-400/30 hover:text-red-400 transition-all touch-feedback"
                    aria-label={`Retirer ${technique.title} des favoris`}
                  >
                    ★
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Navigation footer */}
      <nav className="mt-6 pt-4 border-t border-eclipse-muted/20">
        <button
          onClick={() => router.push("/")}
          className="text-eclipse-accent hover:underline underline-offset-4 transition-colors"
        >
          ← Retour à l'accueil
        </button>
      </nav>
    </div>
  );
}
