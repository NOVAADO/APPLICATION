import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ContextFilter, type ContextOption } from "./ContextFilter";

describe("ContextFilter", () => {
  it("affiche les trois options de contexte avec compteurs", () => {
    const onChange = vi.fn();
    render(<ContextFilter selected="all" onChange={onChange} />);

    // Les boutons affichent "Label (count)" - on utilise regex pour matcher
    expect(screen.getByText(/^Toutes/)).toBeInTheDocument();
    expect(screen.getByText(/^Public/)).toBeInTheDocument();
    expect(screen.getByText(/^Discret/)).toBeInTheDocument();
  });

  it("affiche le label 'Où es-tu ?'", () => {
    const onChange = vi.fn();
    render(<ContextFilter selected="all" onChange={onChange} />);

    expect(screen.getByText("Où es-tu ?")).toBeInTheDocument();
  });

  it("marque l'option sélectionnée avec aria-pressed", () => {
    const onChange = vi.fn();
    render(<ContextFilter selected="A" onChange={onChange} />);

    const publicButton = screen.getByText(/^Public/);
    const allButton = screen.getByText(/^Toutes/);

    expect(publicButton).toHaveAttribute("aria-pressed", "true");
    expect(allButton).toHaveAttribute("aria-pressed", "false");
  });

  it("appelle onChange avec la bonne valeur au clic", () => {
    const onChange = vi.fn();
    render(<ContextFilter selected="all" onChange={onChange} />);

    fireEvent.click(screen.getByText(/^Public/));
    expect(onChange).toHaveBeenCalledWith("A");

    fireEvent.click(screen.getByText(/^Discret/));
    expect(onChange).toHaveBeenCalledWith("B");

    fireEvent.click(screen.getByText(/^Toutes/));
    expect(onChange).toHaveBeenCalledWith("all");
  });

  it("a un role group avec aria-label", () => {
    const onChange = vi.fn();
    render(<ContextFilter selected="all" onChange={onChange} />);

    expect(screen.getByRole("group", { name: "Contexte" })).toBeInTheDocument();
  });
});
