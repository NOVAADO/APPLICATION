import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BottomNav } from "./BottomNav";

// Mock usePathname pour simuler différentes routes
const mockUsePathname = vi.fn();

// Mock getSettings
const mockGetSettings = vi.fn();
vi.mock("@/lib/settings", () => ({
  getSettings: () => mockGetSettings(),
}));

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");
  return {
    ...actual,
    usePathname: () => mockUsePathname(),
    useRouter: () => ({
      push: vi.fn(),
      back: vi.fn(),
    }),
  };
});

describe("BottomNav", () => {
  beforeEach(() => {
    // Par défaut, mode immersif activé
    mockGetSettings.mockReturnValue({
      immersiveMode: true,
      timerAnnouncements: true,
      defaultFavoritesSort: "recent",
    });
  });

  describe("Affichage", () => {
    it("affiche les 4 items de navigation sur la page d'accueil", () => {
      mockUsePathname.mockReturnValue("/");
      render(<BottomNav />);

      expect(screen.getByText("Accueil")).toBeInTheDocument();
      expect(screen.getByText("Catégories")).toBeInTheDocument();
      expect(screen.getByText("Favoris")).toBeInTheDocument();
      expect(screen.getByText("Réglages")).toBeInTheDocument();
    });

    it("affiche les 4 items sur /categories", () => {
      mockUsePathname.mockReturnValue("/categories");
      render(<BottomNav />);

      expect(screen.getByText("Accueil")).toBeInTheDocument();
      expect(screen.getByText("Catégories")).toBeInTheDocument();
      expect(screen.getByText("Favoris")).toBeInTheDocument();
      expect(screen.getByText("Réglages")).toBeInTheDocument();
    });

    it("affiche les 4 items sur /favorites", () => {
      mockUsePathname.mockReturnValue("/favorites");
      render(<BottomNav />);

      expect(screen.getByText("Accueil")).toBeInTheDocument();
      expect(screen.getByText("Catégories")).toBeInTheDocument();
      expect(screen.getByText("Favoris")).toBeInTheDocument();
      expect(screen.getByText("Réglages")).toBeInTheDocument();
    });

    it("affiche les 4 items sur /parametres", () => {
      mockUsePathname.mockReturnValue("/parametres");
      render(<BottomNav />);

      expect(screen.getByText("Accueil")).toBeInTheDocument();
      expect(screen.getByText("Catégories")).toBeInTheDocument();
      expect(screen.getByText("Favoris")).toBeInTheDocument();
      expect(screen.getByText("Réglages")).toBeInTheDocument();
    });
  });

  describe("Mode immersif", () => {
    it("ne s'affiche pas sur les pages de technique si mode immersif activé", () => {
      mockGetSettings.mockReturnValue({ immersiveMode: true });
      mockUsePathname.mockReturnValue("/technique/some-id");
      const { container } = render(<BottomNav />);

      expect(container.firstChild).toBeNull();
    });

    it("ne s'affiche pas sur /technique/respiration-4-7-8 si mode immersif activé", () => {
      mockGetSettings.mockReturnValue({ immersiveMode: true });
      mockUsePathname.mockReturnValue("/technique/respiration-4-7-8");
      const { container } = render(<BottomNav />);

      expect(container.firstChild).toBeNull();
    });

    it("s'affiche sur les pages de technique si mode immersif désactivé", () => {
      mockGetSettings.mockReturnValue({ immersiveMode: false });
      mockUsePathname.mockReturnValue("/technique/some-id");
      render(<BottomNav />);

      expect(screen.getByText("Accueil")).toBeInTheDocument();
      expect(screen.getByText("Catégories")).toBeInTheDocument();
      expect(screen.getByText("Favoris")).toBeInTheDocument();
      expect(screen.getByText("Réglages")).toBeInTheDocument();
    });
  });

  describe("État actif", () => {
    it("marque Accueil comme actif sur /", () => {
      mockUsePathname.mockReturnValue("/");
      render(<BottomNav />);

      const accueilButton = screen.getByLabelText(/aller à l'accueil/i);
      expect(accueilButton).toHaveAttribute("aria-current", "page");
    });

    it("marque Catégories comme actif sur /categories", () => {
      mockUsePathname.mockReturnValue("/categories");
      render(<BottomNav />);

      const categoriesButton = screen.getByLabelText(/voir les catégories/i);
      expect(categoriesButton).toHaveAttribute("aria-current", "page");
    });

    it("marque Favoris comme actif sur /favorites", () => {
      mockUsePathname.mockReturnValue("/favorites");
      render(<BottomNav />);

      const favorisButton = screen.getByLabelText(/voir tes favoris/i);
      expect(favorisButton).toHaveAttribute("aria-current", "page");
    });

    it("ne marque rien comme actif sur une sous-page", () => {
      mockUsePathname.mockReturnValue("/categories/souffle");
      render(<BottomNav />);

      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).not.toHaveAttribute("aria-current", "page");
      });
    });
  });

  describe("Accessibilité", () => {
    it("a un aria-label sur la navigation", () => {
      mockUsePathname.mockReturnValue("/");
      render(<BottomNav />);

      expect(screen.getByLabelText(/navigation principale/i)).toBeInTheDocument();
    });

    it("chaque bouton a un aria-label", () => {
      mockUsePathname.mockReturnValue("/");
      render(<BottomNav />);

      expect(screen.getByLabelText(/aller à l'accueil/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/voir les catégories/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/voir tes favoris/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/ouvrir les réglages/i)).toBeInTheDocument();
    });
  });

  describe("État actif Réglages", () => {
    it("marque Réglages comme actif sur /parametres", () => {
      mockUsePathname.mockReturnValue("/parametres");
      render(<BottomNav />);

      const reglagesButton = screen.getByLabelText(/ouvrir les réglages/i);
      expect(reglagesButton).toHaveAttribute("aria-current", "page");
    });
  });
});
