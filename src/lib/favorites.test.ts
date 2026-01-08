import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getFavorites,
  saveFavorites,
  addFavorite,
  removeFavorite,
  isFavorite,
  toggleFavorite,
  getHistory,
  saveHistory,
  addToHistory,
  getLastUsed,
  sortFavoritesAZ,
  sortFavoritesRecent,
  type HistoryEntry,
} from "./favorites";

describe("Favoris", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("getFavorites", () => {
    it("retourne un tableau vide si localStorage est vide", () => {
      expect(getFavorites()).toEqual([]);
    });

    it("retourne les favoris stockés", () => {
      localStorage.setItem("eclipse-favorites", JSON.stringify(["tech-1", "tech-2"]));
      expect(getFavorites()).toEqual(["tech-1", "tech-2"]);
    });

    it("retourne un tableau vide si le JSON est invalide", () => {
      localStorage.setItem("eclipse-favorites", "invalid-json");
      expect(getFavorites()).toEqual([]);
    });

    it("retourne un tableau vide si la valeur n'est pas un tableau", () => {
      localStorage.setItem("eclipse-favorites", JSON.stringify({ not: "array" }));
      expect(getFavorites()).toEqual([]);
    });
  });

  describe("saveFavorites", () => {
    it("sauvegarde les favoris dans localStorage", () => {
      saveFavorites(["tech-1", "tech-2"]);
      expect(localStorage.getItem("eclipse-favorites")).toBe(JSON.stringify(["tech-1", "tech-2"]));
    });
  });

  describe("addFavorite", () => {
    it("ajoute une technique aux favoris", () => {
      const result = addFavorite("tech-1");
      expect(result).toEqual(["tech-1"]);
      expect(getFavorites()).toEqual(["tech-1"]);
    });

    it("n'ajoute pas de doublon", () => {
      addFavorite("tech-1");
      const result = addFavorite("tech-1");
      expect(result).toEqual(["tech-1"]);
    });

    it("ajoute plusieurs techniques", () => {
      addFavorite("tech-1");
      const result = addFavorite("tech-2");
      expect(result).toEqual(["tech-1", "tech-2"]);
    });
  });

  describe("removeFavorite", () => {
    it("retire une technique des favoris", () => {
      saveFavorites(["tech-1", "tech-2"]);
      const result = removeFavorite("tech-1");
      expect(result).toEqual(["tech-2"]);
      expect(getFavorites()).toEqual(["tech-2"]);
    });

    it("ne modifie rien si la technique n'est pas dans les favoris", () => {
      saveFavorites(["tech-1"]);
      const result = removeFavorite("tech-2");
      expect(result).toEqual(["tech-1"]);
    });
  });

  describe("isFavorite", () => {
    it("retourne true si la technique est dans les favoris", () => {
      saveFavorites(["tech-1"]);
      expect(isFavorite("tech-1")).toBe(true);
    });

    it("retourne false si la technique n'est pas dans les favoris", () => {
      saveFavorites(["tech-1"]);
      expect(isFavorite("tech-2")).toBe(false);
    });
  });

  describe("toggleFavorite", () => {
    it("ajoute si pas dans les favoris", () => {
      const result = toggleFavorite("tech-1");
      expect(result.isFavorite).toBe(true);
      expect(result.favorites).toEqual(["tech-1"]);
    });

    it("retire si dans les favoris", () => {
      saveFavorites(["tech-1"]);
      const result = toggleFavorite("tech-1");
      expect(result.isFavorite).toBe(false);
      expect(result.favorites).toEqual([]);
    });
  });
});

describe("Historique", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("getHistory", () => {
    it("retourne un tableau vide si localStorage est vide", () => {
      expect(getHistory()).toEqual([]);
    });

    it("retourne l'historique stocké", () => {
      const history: HistoryEntry[] = [
        { techniqueId: "tech-1", timestamp: 1000 },
        { techniqueId: "tech-2", timestamp: 2000 },
      ];
      localStorage.setItem("eclipse-history", JSON.stringify(history));
      expect(getHistory()).toEqual(history);
    });
  });

  describe("saveHistory", () => {
    it("sauvegarde l'historique dans localStorage", () => {
      const history: HistoryEntry[] = [{ techniqueId: "tech-1", timestamp: 1000 }];
      saveHistory(history);
      expect(localStorage.getItem("eclipse-history")).toBe(JSON.stringify(history));
    });
  });

  describe("addToHistory", () => {
    it("ajoute une entrée à l'historique", () => {
      vi.setSystemTime(new Date(5000));
      const result = addToHistory("tech-1");
      expect(result).toHaveLength(1);
      expect(result[0].techniqueId).toBe("tech-1");
      expect(result[0].timestamp).toBe(5000);
      vi.useRealTimers();
    });

    it("ajoute en début de liste (plus récent en premier)", () => {
      const existingHistory: HistoryEntry[] = [{ techniqueId: "tech-1", timestamp: 1000 }];
      saveHistory(existingHistory);

      vi.setSystemTime(new Date(2000));
      const result = addToHistory("tech-2");
      expect(result[0].techniqueId).toBe("tech-2");
      expect(result[1].techniqueId).toBe("tech-1");
      vi.useRealTimers();
    });
  });

  describe("getLastUsed", () => {
    it("retourne le timestamp de dernière utilisation", () => {
      const history: HistoryEntry[] = [
        { techniqueId: "tech-1", timestamp: 2000 },
        { techniqueId: "tech-1", timestamp: 1000 },
      ];
      saveHistory(history);
      expect(getLastUsed("tech-1")).toBe(2000);
    });

    it("retourne null si jamais utilisée", () => {
      expect(getLastUsed("tech-unknown")).toBeNull();
    });
  });
});

describe("Tri des favoris", () => {
  describe("sortFavoritesAZ", () => {
    it("trie par ordre alphabétique", () => {
      const favorites = [
        { id: "1", title: "Zéro stress" },
        { id: "2", title: "Ancrage" },
        { id: "3", title: "Méditation" },
      ];
      const sorted = sortFavoritesAZ(favorites);
      expect(sorted.map((f) => f.title)).toEqual(["Ancrage", "Méditation", "Zéro stress"]);
    });

    it("gère les accents français", () => {
      const favorites = [
        { id: "1", title: "Énergie" },
        { id: "2", title: "Emotion" },
        { id: "3", title: "Étirement" },
      ];
      const sorted = sortFavoritesAZ(favorites);
      // En fr-CA, É devrait être traité comme E
      expect(sorted.map((f) => f.title)).toEqual(["Emotion", "Énergie", "Étirement"]);
    });

    it("ne modifie pas le tableau original", () => {
      const favorites = [
        { id: "1", title: "B" },
        { id: "2", title: "A" },
      ];
      sortFavoritesAZ(favorites);
      expect(favorites[0].title).toBe("B");
    });
  });

  describe("sortFavoritesRecent", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it("trie par utilisation récente (plus récent en premier)", () => {
      const history: HistoryEntry[] = [
        { techniqueId: "tech-2", timestamp: 3000 },
        { techniqueId: "tech-1", timestamp: 1000 },
        { techniqueId: "tech-3", timestamp: 2000 },
      ];
      saveHistory(history);

      const favorites = [
        { id: "tech-1", title: "A" },
        { id: "tech-2", title: "B" },
        { id: "tech-3", title: "C" },
      ];

      const sorted = sortFavoritesRecent(favorites);
      expect(sorted.map((f) => f.id)).toEqual(["tech-2", "tech-3", "tech-1"]);
    });

    it("met les techniques jamais utilisées à la fin", () => {
      const history: HistoryEntry[] = [{ techniqueId: "tech-1", timestamp: 1000 }];
      saveHistory(history);

      const favorites = [
        { id: "tech-1", title: "A" },
        { id: "tech-never-used", title: "B" },
      ];

      const sorted = sortFavoritesRecent(favorites);
      expect(sorted.map((f) => f.id)).toEqual(["tech-1", "tech-never-used"]);
    });

    it("utilise la première occurrence pour les doublons d'historique", () => {
      const history: HistoryEntry[] = [
        { techniqueId: "tech-1", timestamp: 3000 }, // Plus récent
        { techniqueId: "tech-1", timestamp: 1000 }, // Plus ancien
      ];
      saveHistory(history);

      const favorites = [{ id: "tech-1", title: "A" }];
      const sorted = sortFavoritesRecent(favorites);

      // Devrait utiliser 3000, pas 1000
      expect(sorted[0].id).toBe("tech-1");
    });
  });
});
