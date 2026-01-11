"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { STORAGE_KEYS } from "@/lib/constants";

/**
 * Onboarding ultra-simplifié - 1 seule page
 *
 * ADN ANTILOPE : "Éclipse n'enseigne pas. Elle accompagne."
 * → Pas de tutoriel, juste une invitation à essayer
 *
 * A11y : focus trap, Échap pour fermer, aria-modal
 */
export function Onboarding() {
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Vérifier si l'onboarding a déjà été vu
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem(STORAGE_KEYS.ONBOARDING);
    if (!hasSeenOnboarding) {
      // Petit délai pour laisser la page se charger
      const timer = setTimeout(() => {
        previousFocusRef.current = document.activeElement as HTMLElement;
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Focus trap et gestion clavier
  useEffect(() => {
    if (!isVisible || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus initial
    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }

      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isVisible]);

  const handleClose = useCallback(() => {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING, "true");
    setIsVisible(false);
    // Restaurer le focus
    previousFocusRef.current?.focus();
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-eclipse-bg/90 backdrop-blur-sm px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      aria-describedby="onboarding-desc"
    >
      <div
        ref={modalRef}
        className="w-full max-w-sm bg-eclipse-card rounded-2xl p-6 border border-eclipse-muted/20 shadow-xl text-center"
      >
        {/* Icône */}
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-souffle/20 to-ancrage/20 flex items-center justify-center">
          <Image
            src="/pictos/pige-carte.svg"
            alt=""
            width={32}
            height={32}
            className="brightness-0 invert"
            aria-hidden="true"
          />
        </div>

        {/* Message principal - ADN compliant */}
        <h2 id="onboarding-title" className="text-xl font-bold mb-3">
          Éclipse
        </h2>
        <p id="onboarding-desc" className="text-eclipse-muted mb-4">
          Des techniques pour faire pause.
          <br />
          Tu tires, tu testes, c&apos;est tout.
        </p>

        {/* Explication des modes - ultra court */}
        <p className="text-eclipse-muted/70 text-sm mb-6">
          <span className="text-eclipse-text">Furtif</span> = discret, où tu veux.
          <br />
          <span className="text-eclipse-text">Libre</span> = chez toi, plus de place.
        </p>

        {/* CTA unique */}
        <button
          onClick={handleClose}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-souffle to-ancrage text-eclipse-bg font-semibold hover:opacity-90 transition-opacity"
        >
          C&apos;est parti
        </button>
      </div>
    </div>
  );
}
