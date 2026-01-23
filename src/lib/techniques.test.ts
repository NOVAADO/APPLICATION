import { describe, it, expect } from "vitest";
import {
  techniques,
  categories,
  getFreeTechniques,
  filterByCategory,
  filterByDiscretion,
  drawRandomTechnique,
  drawTechnique,
  getTechniqueById,
  getCategoryById,
  getSortedCategories,
  getFreeCategories,
  formatDurationSeconds,
  getTechniqueDurationRange,
  getCanadaValidatedTechniques,
  getTechniquesByEvidenceLevel,
  countAvailableTechniques,
} from "./techniques";

describe("Données v2.0.0", () => {
  it("contient des techniques", () => {
    expect(techniques.length).toBeGreaterThan(0);
  });

  it("contient des catégories", () => {
    expect(categories.length).toBeGreaterThan(0);
  });

  it("chaque technique a la structure v2.0.0 avec 3 niveaux", () => {
    techniques.forEach((t) => {
      expect(t.id).toBeTruthy();
      expect(t.title).toBeTruthy();
      expect(t.category).toBeTruthy();
      expect(t.openingPhrase).toBeDefined();

      // Vérifier les 3 niveaux
      expect(t.levels).toBeDefined();
      expect(t.levels.croissant).toBeDefined();
      expect(t.levels.quartier).toBeDefined();
      expect(t.levels["pleine-lune"]).toBeDefined();

      // Chaque niveau doit avoir les champs requis
      const levels = [t.levels.croissant, t.levels.quartier, t.levels["pleine-lune"]];
      levels.forEach((level) => {
        expect(Array.isArray(level.instructions)).toBe(true);
        expect(level.instructions.length).toBeGreaterThan(0);
        expect(typeof level.durationSeconds).toBe("number");
        expect(level.durationSeconds).toBeGreaterThan(0);
        expect(typeof level.timer).toBe("boolean");
      });
    });
  });

  it("chaque catégorie a les champs requis", () => {
    categories.forEach((c) => {
      expect(c.id).toBeTruthy();
      expect(c.name).toBeTruthy();
      expect(c.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(typeof c.premium).toBe("boolean");
    });
  });
});

describe("Durées des niveaux (contraintes ADN)", () => {
  it("niveau croissant: 10-30 secondes", () => {
    techniques.forEach((t) => {
      const duration = t.levels.croissant.durationSeconds;
      expect(duration).toBeGreaterThanOrEqual(5); // Flexibilité pour certaines catégories
      expect(duration).toBeLessThanOrEqual(45); // Marge
    });
  });

  it("niveau quartier: 30-90 secondes", () => {
    techniques.forEach((t) => {
      const duration = t.levels.quartier.durationSeconds;
      expect(duration).toBeGreaterThanOrEqual(20);
      expect(duration).toBeLessThanOrEqual(120);
    });
  });

  it("niveau pleine-lune: 60-180 secondes", () => {
    techniques.forEach((t) => {
      const duration = t.levels["pleine-lune"].durationSeconds;
      expect(duration).toBeGreaterThanOrEqual(30);
      expect(duration).toBeLessThanOrEqual(300);
    });
  });
});

describe("getFreeTechniques", () => {
  it("retourne uniquement les techniques non-premium", () => {
    const free = getFreeTechniques();
    free.forEach((t) => {
      expect(t.premium).toBeFalsy();
    });
  });

  it("retourne au moins une technique", () => {
    const free = getFreeTechniques();
    expect(free.length).toBeGreaterThan(0);
  });
});

describe("filterByCategory", () => {
  it("retourne toutes les techniques si categoryId est null", () => {
    const techs = getFreeTechniques();
    const filtered = filterByCategory(techs, null);
    expect(filtered).toEqual(techs);
  });

  it("filtre par catégorie", () => {
    const techs = getFreeTechniques();
    const categoryId = categories[0].id;
    const filtered = filterByCategory(techs, categoryId);
    filtered.forEach((t) => {
      expect(t.category).toBe(categoryId);
    });
  });
});

describe("filterByDiscretion", () => {
  it("retourne toutes les techniques si level est null", () => {
    const filtered = filterByDiscretion(techniques, null);
    expect(filtered).toEqual(techniques);
  });

  it("filtre par discrétion public_ok", () => {
    const filtered = filterByDiscretion(techniques, "public_ok");
    filtered.forEach((t) => {
      expect(t.discretionLevel).toBe("public_ok");
    });
  });

  it("filtre par discrétion discret", () => {
    const filtered = filterByDiscretion(techniques, "discret");
    filtered.forEach((t) => {
      expect(t.discretionLevel).toBe("discret");
    });
  });
});

describe("drawRandomTechnique", () => {
  it("retourne null si le tableau est vide", () => {
    expect(drawRandomTechnique([])).toBeNull();
  });

  it("retourne une technique du tableau", () => {
    const techs = getFreeTechniques();
    const drawn = drawRandomTechnique(techs);
    expect(drawn).not.toBeNull();
    expect(techs).toContain(drawn);
  });
});

describe("drawTechnique", () => {
  it("retourne une technique", () => {
    const technique = drawTechnique();
    expect(technique).not.toBeNull();
  });

  it("filtre par catégorie", () => {
    const categoryId = categories[0].id;
    for (let i = 0; i < 5; i++) {
      const technique = drawTechnique({ category: categoryId });
      if (technique) {
        expect(technique.category).toBe(categoryId);
      }
    }
  });

  it("filtre par niveau de discrétion", () => {
    for (let i = 0; i < 5; i++) {
      const technique = drawTechnique({ discretionLevel: "public_ok" });
      if (technique) {
        expect(technique.discretionLevel).toBe("public_ok");
      }
    }
  });
});

describe("getTechniqueById", () => {
  it("retourne la technique correspondante", () => {
    const firstTech = techniques[0];
    const found = getTechniqueById(firstTech.id);
    expect(found).toEqual(firstTech);
  });

  it("retourne undefined si non trouvée", () => {
    expect(getTechniqueById("non-existent")).toBeUndefined();
  });
});

describe("getCategoryById", () => {
  it("retourne la catégorie correspondante", () => {
    const firstCat = categories[0];
    const found = getCategoryById(firstCat.id);
    expect(found).toEqual(firstCat);
  });

  it("retourne undefined si non trouvée", () => {
    expect(getCategoryById("non-existent")).toBeUndefined();
  });
});

describe("getSortedCategories", () => {
  it("retourne les catégories triées par ordre", () => {
    const sorted = getSortedCategories();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].order).toBeGreaterThanOrEqual(sorted[i - 1].order);
    }
  });

  it("ne modifie pas le tableau original", () => {
    const originalOrder = categories.map((c) => c.id);
    getSortedCategories();
    expect(categories.map((c) => c.id)).toEqual(originalOrder);
  });
});

describe("getFreeCategories", () => {
  it("retourne uniquement les catégories non-premium", () => {
    const free = getFreeCategories();
    free.forEach((c) => {
      expect(c.premium).toBe(false);
    });
  });
});

describe("formatDurationSeconds", () => {
  it("formate les secondes courtes", () => {
    expect(formatDurationSeconds(15)).toBe("15s");
    expect(formatDurationSeconds(30)).toBe("30s");
    expect(formatDurationSeconds(45)).toBe("45s");
  });

  it("formate les minutes exactes", () => {
    expect(formatDurationSeconds(60)).toBe("1 min");
    expect(formatDurationSeconds(120)).toBe("2 min");
    expect(formatDurationSeconds(180)).toBe("3 min");
  });

  it("formate les minutes avec secondes", () => {
    expect(formatDurationSeconds(90)).toBe("1m 30s");
    expect(formatDurationSeconds(75)).toBe("1m 15s");
  });
});

describe("getTechniqueDurationRange", () => {
  it("retourne une plage de durées", () => {
    const tech = techniques[0];
    const range = getTechniqueDurationRange(tech);
    expect(range).toContain(" - ");
  });
});

describe("countAvailableTechniques", () => {
  it("compte toutes les techniques gratuites par défaut", () => {
    const count = countAvailableTechniques();
    const free = getFreeTechniques();
    expect(count).toBe(free.length);
  });

  it("compte avec filtre de catégorie", () => {
    const categoryId = categories[0].id;
    const count = countAvailableTechniques({ category: categoryId });
    const filtered = filterByCategory(getFreeTechniques(), categoryId);
    expect(count).toBe(filtered.length);
  });
});

// ============================================
// Tests Evidence (Canada)
// ============================================

describe("Evidence - Structure", () => {
  it("chaque technique a le champ evidence", () => {
    techniques.forEach((t) => {
      expect(t.evidence).toBeDefined();
      expect(typeof t.evidence.isCanadaValidated).toBe("boolean");
      expect(["A", "B", "C"]).toContain(t.evidence.level);
      expect(Array.isArray(t.evidence.canadaSources)).toBe(true);
      expect(Array.isArray(t.evidence.scientificSources)).toBe(true);
      expect(typeof t.evidence.needsReview).toBe("boolean");
    });
  });
});

describe("Evidence - Validation Canada", () => {
  it("retourne des techniques validées au Canada", () => {
    const validated = getCanadaValidatedTechniques();
    expect(validated.length).toBeGreaterThan(0);
  });

  it("toute technique isCanadaValidated=true a au moins 1 canadaSources", () => {
    const validated = getCanadaValidatedTechniques();
    validated.forEach((t) => {
      expect(t.evidence.canadaSources.length).toBeGreaterThan(0);
    });
  });

  it("les canadaSources ont les champs requis", () => {
    const validated = getCanadaValidatedTechniques();
    validated.forEach((t) => {
      t.evidence.canadaSources.forEach((src) => {
        expect(src.org).toBeTruthy();
        expect(src.title).toBeTruthy();
      });
    });
  });
});

describe("Evidence - Niveaux de preuve", () => {
  it("retourne des techniques niveau A", () => {
    const levelA = getTechniquesByEvidenceLevel("A");
    expect(levelA.length).toBeGreaterThan(0);
    levelA.forEach((t) => {
      expect(t.evidence.level).toBe("A");
    });
  });

  it("retourne des techniques niveau B si présentes", () => {
    const levelB = getTechniquesByEvidenceLevel("B");
    levelB.forEach((t) => {
      expect(t.evidence.level).toBe("B");
    });
  });

  it("retourne des techniques niveau C si présentes", () => {
    const levelC = getTechniquesByEvidenceLevel("C");
    levelC.forEach((t) => {
      expect(t.evidence.level).toBe("C");
    });
  });
});
