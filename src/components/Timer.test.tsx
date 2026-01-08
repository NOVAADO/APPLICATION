import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Timer } from "./Timer";

describe("Timer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("État initial (idle)", () => {
    it("affiche 'Prêt ?' au démarrage", () => {
      render(<Timer duration={60} />);
      expect(screen.getByText("Prêt ?")).toBeInTheDocument();
    });

    it("affiche le bouton Démarrer", () => {
      render(<Timer duration={60} />);
      expect(screen.getByRole("button", { name: /démarrer/i })).toBeInTheDocument();
    });

    it("n'affiche pas le temps restant", () => {
      render(<Timer duration={60} />);
      expect(screen.queryByText(/:/)).not.toBeInTheDocument();
    });
  });

  describe("Phase Prépare", () => {
    it("démarre la phase Prépare au clic sur Démarrer", () => {
      render(<Timer duration={60} />);

      fireEvent.click(screen.getByRole("button", { name: /démarrer/i }));

      expect(screen.getByText("Installe-toi...")).toBeInTheDocument();
    });

    it("affiche 5 secondes de décompte", () => {
      render(<Timer duration={60} />);

      fireEvent.click(screen.getByRole("button", { name: /démarrer/i }));

      expect(screen.getByText("0:05")).toBeInTheDocument();
    });

    it("passe à la phase Technique après 5 secondes", () => {
      render(<Timer duration={60} techniqueName="Respiration 4-7-8" />);

      fireEvent.click(screen.getByRole("button", { name: /démarrer/i }));

      // Avance de 5 secondes
      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(screen.getByText("Respiration 4-7-8")).toBeInTheDocument();
    });
  });

  describe("Phase Technique", () => {
    it("affiche le nom de la technique", () => {
      render(<Timer duration={60} techniqueName="Test Technique" />);

      fireEvent.click(screen.getByRole("button", { name: /démarrer/i }));

      // Skip phase Prépare
      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(screen.getByText("Test Technique")).toBeInTheDocument();
    });

    it("affiche la durée de la technique", () => {
      render(<Timer duration={120} />); // 2 minutes

      fireEvent.click(screen.getByRole("button", { name: /démarrer/i }));

      // Skip phase Prépare
      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(screen.getByText("2:00")).toBeInTheDocument();
    });

    it("passe à la phase Cooldown après la durée technique", () => {
      render(<Timer duration={2} />); // 2 secondes pour aller plus vite

      fireEvent.click(screen.getByRole("button", { name: /démarrer/i }));

      // Avance seconde par seconde: Prépare (5s) + Technique (2s)
      for (let i = 0; i < 7; i++) {
        act(() => {
          vi.advanceTimersByTime(1000);
        });
      }

      expect(screen.getByText("Reprends doucement...")).toBeInTheDocument();
    });
  });

  describe("Phase Cooldown", () => {
    it("affiche 'Reprends doucement...'", () => {
      render(<Timer duration={1} />);

      fireEvent.click(screen.getByRole("button", { name: /démarrer/i }));

      // Avance seconde par seconde pour laisser React traiter les transitions
      // Prépare: 5s
      for (let i = 0; i < 5; i++) {
        act(() => {
          vi.advanceTimersByTime(1000);
        });
      }
      // Technique: 1s
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(screen.getByText("Reprends doucement...")).toBeInTheDocument();
    });

    it("passe à Done après 5 secondes de cooldown", () => {
      render(<Timer duration={1} />);

      fireEvent.click(screen.getByRole("button", { name: /démarrer/i }));

      // Avance seconde par seconde: Prépare (5s) + Technique (1s) + Cooldown (5s) = 11s
      for (let i = 0; i < 11; i++) {
        act(() => {
          vi.advanceTimersByTime(1000);
        });
      }

      expect(screen.getByText("C'est fait.")).toBeInTheDocument();
    });
  });

  describe("Phase Done", () => {
    it("affiche 'Bien joué.'", () => {
      render(<Timer duration={1} />);

      fireEvent.click(screen.getByRole("button", { name: /démarrer/i }));

      // Avance seconde par seconde pour toutes les phases
      for (let i = 0; i < 11; i++) {
        act(() => {
          vi.advanceTimersByTime(1000);
        });
      }

      expect(screen.getByText("Bien joué.")).toBeInTheDocument();
    });

    it("appelle onComplete quand terminé", () => {
      const onComplete = vi.fn();
      render(<Timer duration={1} onComplete={onComplete} />);

      fireEvent.click(screen.getByRole("button", { name: /démarrer/i }));

      // Avance seconde par seconde
      for (let i = 0; i < 11; i++) {
        act(() => {
          vi.advanceTimersByTime(1000);
        });
      }

      expect(onComplete).toHaveBeenCalledTimes(1);
    });
  });

  describe("Contrôles Pause/Reprendre", () => {
    it("affiche le bouton Pause pendant l'exécution", () => {
      render(<Timer duration={60} />);

      fireEvent.click(screen.getByRole("button", { name: /démarrer/i }));

      expect(screen.getByRole("button", { name: /pause/i })).toBeInTheDocument();
    });

    it("met en pause le décompte", () => {
      render(<Timer duration={60} />);

      fireEvent.click(screen.getByRole("button", { name: /démarrer/i }));

      // Note le temps initial
      expect(screen.getByText("0:05")).toBeInTheDocument();

      // Met en pause
      fireEvent.click(screen.getByRole("button", { name: /pause/i }));

      // Avance le temps
      act(() => {
        vi.advanceTimersByTime(3000);
      });

      // Le temps ne devrait pas avoir changé
      expect(screen.getByText("0:05")).toBeInTheDocument();
      expect(screen.getByText("En pause")).toBeInTheDocument();
    });

    it("reprend le décompte", () => {
      render(<Timer duration={60} />);

      fireEvent.click(screen.getByRole("button", { name: /démarrer/i }));
      fireEvent.click(screen.getByRole("button", { name: /pause/i }));
      fireEvent.click(screen.getByRole("button", { name: /reprendre/i }));

      // Avance de 2 secondes
      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(screen.getByText("0:03")).toBeInTheDocument();
    });
  });

  describe("Contrôle Terminer", () => {
    it("affiche le bouton Terminer pendant l'exécution", () => {
      render(<Timer duration={60} />);

      fireEvent.click(screen.getByRole("button", { name: /démarrer/i }));

      expect(screen.getByRole("button", { name: /terminer/i })).toBeInTheDocument();
    });

    it("retourne à l'état idle au clic sur Terminer", () => {
      render(<Timer duration={60} />);

      fireEvent.click(screen.getByRole("button", { name: /démarrer/i }));
      fireEvent.click(screen.getByRole("button", { name: /terminer/i }));

      expect(screen.getByText("Prêt ?")).toBeInTheDocument();
    });

    it("appelle onCancel quand terminé prématurément", () => {
      const onCancel = vi.fn();
      render(<Timer duration={60} onCancel={onCancel} />);

      fireEvent.click(screen.getByRole("button", { name: /démarrer/i }));
      fireEvent.click(screen.getByRole("button", { name: /terminer/i }));

      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibilité", () => {
    it("a une zone aria-live pour les annonces", () => {
      render(<Timer duration={60} />);

      const liveRegion = screen.getByRole("status");
      expect(liveRegion).toHaveAttribute("aria-live", "polite");
    });

    it("a une barre de progression avec les attributs ARIA", () => {
      render(<Timer duration={60} />);

      fireEvent.click(screen.getByRole("button", { name: /démarrer/i }));

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveAttribute("aria-valuemin", "0");
      expect(progressBar).toHaveAttribute("aria-valuemax", "100");
    });
  });

  describe("Durée par défaut", () => {
    it("utilise 60 secondes si duration est 0", () => {
      render(<Timer duration={0} />);

      fireEvent.click(screen.getByRole("button", { name: /démarrer/i }));

      // Skip phase Prépare
      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(screen.getByText("1:00")).toBeInTheDocument();
    });
  });
});
