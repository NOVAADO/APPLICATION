import { describe, it, expect } from "vitest";
import {
  techniques,
  categories,
  getFreeTechniques,
  filterByDuration,
  filterByIntensity,
  filterByCategory,
  drawRandomTechnique,
  drawTechnique,
  getTechniqueById,
  getCategoryById,
  getSortedCategories,
  getFreeCategories,
  formatDuration,
  formatIntensity,
  filterByPreset,
  filterByDiscretion,
  getPresetATechniques,
  getPresetBTechniques,
  getCanadaValidatedTechniques,
  getTechniquesByEvidenceLevel,
} from "./techniques";

describe("Données", () => {
  it("contient des techniques", () => {
    expect(techniques.length).toBeGreaterThan(0);
  });

  it("contient des catégories", () => {
    expect(categories.length).toBeGreaterThan(0);
  });

  it("chaque technique a les champs requis", () => {
    techniques.forEach((t) => {
      expect(t.id).toBeTruthy();
      expect(t.title).toBeTruthy();
      expect(t.category).toBeTruthy();
      expect(t.duration).toBeGreaterThan(0);
      expect(["soft", "normal", "intense"]).toContain(t.intensity);
      expect(t.instructions.length).toBeGreaterThan(0);
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

describe("filterByDuration", () => {
  it("retourne toutes les techniques si duration est null", () => {
    const techs = getFreeTechniques();
    const filtered = filterByDuration(techs, null);
    expect(filtered).toEqual(techs);
  });

  it("filtre les techniques de 2 min (inclut 2 et 3 min)", () => {
    const techs = getFreeTechniques();
    const filtered = filterByDuration(techs, 2);
    filtered.forEach((t) => {
      expect(t.duration).toBeLessThanOrEqual(3);
    });
  });

  it("filtre les techniques de 5 min exactement", () => {
    const techs = getFreeTechniques();
    const filtered = filterByDuration(techs, 5);
    filtered.forEach((t) => {
      expect(t.duration).toBe(5);
    });
  });
});

describe("filterByIntensity", () => {
  it("retourne toutes les techniques si intensity est null", () => {
    const techs = getFreeTechniques();
    const filtered = filterByIntensity(techs, null);
    expect(filtered).toEqual(techs);
  });

  it("filtre par intensité soft", () => {
    const techs = getFreeTechniques();
    const filtered = filterByIntensity(techs, "soft");
    filtered.forEach((t) => {
      expect(t.intensity).toBe("soft");
    });
  });

  it("filtre par intensité intense", () => {
    const techs = getFreeTechniques();
    const filtered = filterByIntensity(techs, "intense");
    filtered.forEach((t) => {
      expect(t.intensity).toBe("intense");
    });
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

describe("formatDuration", () => {
  it("formate la durée en minutes", () => {
    expect(formatDuration(2)).toBe("2 min");
    expect(formatDuration(5)).toBe("5 min");
  });
});

describe("formatIntensity", () => {
  it("traduit soft en Douce", () => {
    expect(formatIntensity("soft")).toBe("Douce");
  });

  it("traduit normal en Normale", () => {
    expect(formatIntensity("normal")).toBe("Normale");
  });

  it("traduit intense", () => {
    expect(formatIntensity("intense")).toBe("Intense");
  });
});

// ============================================
// Tests v1.1.0 - Presets et Evidence (Canada)
// ============================================

describe("Champs v1.1.0", () => {
  it("chaque technique a les champs v1.1.0 requis", () => {
    techniques.forEach((t) => {
      expect(typeof t.durationSeconds).toBe("number");
      expect(["public_ok", "discret", "prive"]).toContain(t.discretionLevel);
      expect(Array.isArray(t.presets)).toBe(true);
      expect(t.evidence).toBeDefined();
      expect(typeof t.evidence.isCanadaValidated).toBe("boolean");
      expect(["A", "B", "C"]).toContain(t.evidence.level);
      expect(Array.isArray(t.evidence.canadaSources)).toBe(true);
      expect(Array.isArray(t.evidence.scientificSources)).toBe(true);
      expect(typeof t.evidence.needsReview).toBe("boolean");
    });
  });
});

describe("filterByPreset", () => {
  it("retourne toutes les techniques si preset est null", () => {
    const filtered = filterByPreset(techniques, null);
    expect(filtered).toEqual(techniques);
  });

  it("filtre par preset A", () => {
    const filtered = filterByPreset(techniques, "A");
    filtered.forEach((t) => {
      expect(t.presets).toContain("A");
    });
  });

  it("filtre par preset B", () => {
    const filtered = filterByPreset(techniques, "B");
    filtered.forEach((t) => {
      expect(t.presets).toContain("B");
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

  it("filtre par discrétion prive", () => {
    const filtered = filterByDiscretion(techniques, "prive");
    filtered.forEach((t) => {
      expect(t.discretionLevel).toBe("prive");
    });
  });
});

describe("Preset A - Validation règles strictes", () => {
  it("retourne au moins une technique", () => {
    const presetA = getPresetATechniques();
    expect(presetA.length).toBeGreaterThan(0);
  });

  it("aucune technique Preset A ne dépasse 120 secondes", () => {
    const presetA = getPresetATechniques();
    presetA.forEach((t) => {
      expect(t.durationSeconds).toBeLessThanOrEqual(120);
    });
  });

  it("toutes les techniques Preset A sont public_ok", () => {
    const presetA = getPresetATechniques();
    presetA.forEach((t) => {
      expect(t.discretionLevel).toBe("public_ok");
    });
  });

  it("contient 12 techniques attendues (8 de base + 4 paroles adaptables)", () => {
    const presetA = getPresetATechniques();
    expect(presetA.length).toBe(12);
  });
});

describe("Preset B - Validation règles strictes", () => {
  it("retourne au moins une technique", () => {
    const presetB = getPresetBTechniques();
    expect(presetB.length).toBeGreaterThan(0);
  });

  it("aucune technique Preset B ne dépasse 300 secondes", () => {
    const presetB = getPresetBTechniques();
    presetB.forEach((t) => {
      expect(t.durationSeconds).toBeLessThanOrEqual(300);
    });
  });

  it("aucune technique Preset B n'est privée", () => {
    const presetB = getPresetBTechniques();
    presetB.forEach((t) => {
      expect(t.discretionLevel).not.toBe("prive");
    });
  });

  it("contient 7 techniques attendues", () => {
    const presetB = getPresetBTechniques();
    expect(presetB.length).toBe(7);
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

  it("retourne des techniques niveau B", () => {
    const levelB = getTechniquesByEvidenceLevel("B");
    expect(levelB.length).toBeGreaterThan(0);
    levelB.forEach((t) => {
      expect(t.evidence.level).toBe("B");
    });
  });

  it("14 techniques niveau A, 11 niveau B", () => {
    const levelA = getTechniquesByEvidenceLevel("A");
    const levelB = getTechniquesByEvidenceLevel("B");
    expect(levelA.length).toBe(14);
    expect(levelB.length).toBe(11);
  });

  it("aucune technique niveau C (toutes confirmées)", () => {
    const levelC = getTechniquesByEvidenceLevel("C");
    expect(levelC.length).toBe(0);
  });
});

// ============================================
// Tests drawTechnique avec preset
// ============================================

describe("drawTechnique avec preset", () => {
  it("retourne une technique Preset A quand preset='A'", () => {
    // Exécuter plusieurs fois pour tester la randomisation
    for (let i = 0; i < 10; i++) {
      const technique = drawTechnique({ preset: "A" });
      expect(technique).not.toBeNull();
      if (technique) {
        expect(technique.presets).toContain("A");
        expect(technique.durationSeconds).toBeLessThanOrEqual(120);
        expect(technique.discretionLevel).toBe("public_ok");
      }
    }
  });

  it("retourne une technique Preset B quand preset='B'", () => {
    for (let i = 0; i < 10; i++) {
      const technique = drawTechnique({ preset: "B" });
      expect(technique).not.toBeNull();
      if (technique) {
        expect(technique.presets).toContain("B");
        expect(technique.durationSeconds).toBeLessThanOrEqual(300);
        expect(["public_ok", "discret"]).toContain(technique.discretionLevel);
      }
    }
  });

  it("retourne n'importe quelle technique quand preset=null", () => {
    const technique = drawTechnique({ preset: null });
    expect(technique).not.toBeNull();
  });

  it("combine preset et duration correctement", () => {
    // Preset A avec durée 2 min (≤3 min en duration)
    for (let i = 0; i < 5; i++) {
      const technique = drawTechnique({ preset: "A", duration: 2 });
      expect(technique).not.toBeNull();
      if (technique) {
        expect(technique.presets).toContain("A");
        expect(technique.duration).toBeLessThanOrEqual(3);
      }
    }
  });
});
