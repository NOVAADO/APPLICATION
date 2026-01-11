import { describe, it, expect, beforeEach } from "vitest";
import {
  getSettings,
  saveSettings,
  updateSetting,
  resetSettings,
  resetAllUserData,
  hasUserData,
  DEFAULT_SETTINGS,
  type Settings,
} from "./settings";

describe("Settings", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("DEFAULT_SETTINGS", () => {
    it("a les bonnes valeurs par défaut", () => {
      expect(DEFAULT_SETTINGS).toEqual({
        immersiveMode: true,
        timerAnnouncements: true,
        timerSounds: false,
        defaultFavoritesSort: "recent",
      });
    });
  });

  describe("getSettings", () => {
    it("retourne les paramètres par défaut si localStorage est vide", () => {
      expect(getSettings()).toEqual(DEFAULT_SETTINGS);
    });

    it("retourne les paramètres stockés", () => {
      const customSettings: Settings = {
        immersiveMode: false,
        timerAnnouncements: false,
        timerSounds: true,
        defaultFavoritesSort: "az",
      };
      localStorage.setItem("eclipse-settings", JSON.stringify(customSettings));
      expect(getSettings()).toEqual(customSettings);
    });

    it("retourne les paramètres par défaut si le JSON est invalide", () => {
      localStorage.setItem("eclipse-settings", "invalid-json");
      expect(getSettings()).toEqual(DEFAULT_SETTINGS);
    });

    it("fusionne avec les defaults pour les nouvelles clés", () => {
      // Simule une ancienne version avec moins de clés
      localStorage.setItem(
        "eclipse-settings",
        JSON.stringify({ immersiveMode: false })
      );
      const settings = getSettings();
      expect(settings.immersiveMode).toBe(false);
      expect(settings.timerAnnouncements).toBe(true); // Valeur par défaut
      expect(settings.timerSounds).toBe(false); // Valeur par défaut
      expect(settings.defaultFavoritesSort).toBe("recent"); // Valeur par défaut
    });
  });

  describe("saveSettings", () => {
    it("sauvegarde les paramètres dans localStorage", () => {
      const settings: Settings = {
        immersiveMode: false,
        timerAnnouncements: true,
        timerSounds: false,
        defaultFavoritesSort: "az",
      };
      saveSettings(settings);
      expect(localStorage.getItem("eclipse-settings")).toBe(
        JSON.stringify(settings)
      );
    });
  });

  describe("updateSetting", () => {
    it("met à jour un paramètre spécifique", () => {
      const result = updateSetting("immersiveMode", false);
      expect(result.immersiveMode).toBe(false);
      expect(result.timerAnnouncements).toBe(true); // Inchangé
    });

    it("persiste le changement dans localStorage", () => {
      updateSetting("defaultFavoritesSort", "az");
      const stored = JSON.parse(localStorage.getItem("eclipse-settings")!);
      expect(stored.defaultFavoritesSort).toBe("az");
    });

    it("préserve les autres paramètres", () => {
      saveSettings({
        immersiveMode: false,
        timerAnnouncements: false,
        timerSounds: true,
        defaultFavoritesSort: "az",
      });
      const result = updateSetting("immersiveMode", true);
      expect(result.timerAnnouncements).toBe(false);
      expect(result.timerSounds).toBe(true);
      expect(result.defaultFavoritesSort).toBe("az");
    });
  });

  describe("resetSettings", () => {
    it("réinitialise aux valeurs par défaut", () => {
      saveSettings({
        immersiveMode: false,
        timerAnnouncements: false,
        timerSounds: true,
        defaultFavoritesSort: "az",
      });
      const result = resetSettings();
      expect(result).toEqual(DEFAULT_SETTINGS);
    });

    it("persiste la réinitialisation", () => {
      saveSettings({
        immersiveMode: false,
        timerAnnouncements: false,
        timerSounds: true,
        defaultFavoritesSort: "az",
      });
      resetSettings();
      expect(getSettings()).toEqual(DEFAULT_SETTINGS);
    });
  });

  describe("resetAllUserData", () => {
    it("supprime favoris, historique et paramètres", () => {
      localStorage.setItem("eclipse-favorites", JSON.stringify(["tech-1"]));
      localStorage.setItem(
        "eclipse-history",
        JSON.stringify([{ techniqueId: "tech-1", timestamp: 1000 }])
      );
      localStorage.setItem("eclipse-settings", JSON.stringify({ immersiveMode: false }));

      resetAllUserData();

      expect(localStorage.getItem("eclipse-favorites")).toBeNull();
      expect(localStorage.getItem("eclipse-history")).toBeNull();
      expect(localStorage.getItem("eclipse-settings")).toBeNull();
    });

    it("ne fait rien si aucune donnée n'existe", () => {
      // Ne devrait pas lever d'erreur
      expect(() => resetAllUserData()).not.toThrow();
    });
  });

  describe("hasUserData", () => {
    it("retourne false si aucune donnée", () => {
      expect(hasUserData()).toBe(false);
    });

    it("retourne true si des favoris existent", () => {
      localStorage.setItem("eclipse-favorites", JSON.stringify(["tech-1"]));
      expect(hasUserData()).toBe(true);
    });

    it("retourne true si de l'historique existe", () => {
      localStorage.setItem(
        "eclipse-history",
        JSON.stringify([{ techniqueId: "tech-1", timestamp: 1000 }])
      );
      expect(hasUserData()).toBe(true);
    });

    it("retourne true si des paramètres existent", () => {
      localStorage.setItem("eclipse-settings", JSON.stringify({ immersiveMode: false }));
      expect(hasUserData()).toBe(true);
    });
  });
});

describe("Types Settings", () => {
  it("defaultFavoritesSort accepte 'recent' et 'az'", () => {
    const settingsRecent: Settings = {
      ...DEFAULT_SETTINGS,
      defaultFavoritesSort: "recent",
    };
    const settingsAz: Settings = {
      ...DEFAULT_SETTINGS,
      defaultFavoritesSort: "az",
    };
    expect(settingsRecent.defaultFavoritesSort).toBe("recent");
    expect(settingsAz.defaultFavoritesSort).toBe("az");
  });
});
