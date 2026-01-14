import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DrawButton } from "./DrawButton";

describe("DrawButton", () => {
  it("affiche le texte 'Tire une carte'", () => {
    render(<DrawButton onClick={() => {}} />);
    expect(screen.getByText("Tire une carte")).toBeInTheDocument();
  });

  it("appelle onClick au clic", () => {
    const onClick = vi.fn();
    render(<DrawButton onClick={onClick} />);

    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("a un aria-label accessible", () => {
    render(<DrawButton onClick={() => {}} />);
    expect(screen.getByLabelText(/tirer une carte/i)).toBeInTheDocument();
  });

  it("est désactivé quand disabled=true", () => {
    render(<DrawButton onClick={() => {}} disabled={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("n'est pas désactivé par défaut", () => {
    render(<DrawButton onClick={() => {}} />);
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("n'appelle pas onClick quand désactivé", () => {
    const onClick = vi.fn();
    render(<DrawButton onClick={onClick} disabled={true} />);

    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("contient une image (picto)", () => {
    render(<DrawButton onClick={() => {}} />);
    // L'image a role="presentation" car aria-hidden="true", donc on utilise querySelector
    const img = document.querySelector('img[src="/pictos/pige-carte.svg"]');
    expect(img).toBeInTheDocument();
  });
});
