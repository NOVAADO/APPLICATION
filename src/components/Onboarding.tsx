"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { STORAGE_KEYS } from "@/lib/constants";

interface OnboardingStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: OnboardingStep[] = [
  {
    title: "Bienvenue sur Éclipse",
    description: "T'as besoin d'une pause ? On te propose des techniques rapides pour gérer ton stress.",
    icon: (
      <svg className="w-12 h-12 text-souffle" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: "Tire une carte",
    description: "Choisis ta durée, ton contexte, et on te propose une technique adaptée. Simple.",
    icon: (
      <svg className="w-12 h-12 text-ancrage" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    title: "Garde tes favoris",
    description: "Les techniques qui marchent pour toi, tu les retrouves ici. Pas de compte, tout reste sur ton téléphone.",
    icon: (
      <svg className="w-12 h-12 text-decharge" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
];

/**
 * Onboarding discret - 3 étapes max
 *
 * A11y : focus trap, Échap pour fermer, aria-modal
 * ADN : pas de blabla, direct, skippable
 */
export function Onboarding() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
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
  }, [isVisible, currentStep]);

  const handleClose = useCallback(() => {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING, "true");
    setIsVisible(false);
    // Restaurer le focus
    previousFocusRef.current?.focus();
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isVisible) return null;

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

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
        className="w-full max-w-sm bg-eclipse-card rounded-2xl p-6 border border-eclipse-muted/20 shadow-xl"
      >
        {/* Indicateur d'étapes */}
        <div className="flex justify-center gap-2 mb-6" role="status" aria-live="polite">
          <span className="sr-only">Étape {currentStep + 1} sur {steps.length}</span>
          {steps.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep ? "bg-eclipse-accent" : "bg-eclipse-muted/30"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Contenu de l'étape */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {step.icon}
          </div>
          <h2 id="onboarding-title" className="text-xl font-bold mb-2">
            {step.title}
          </h2>
          <p id="onboarding-desc" className="text-eclipse-muted text-sm">
            {step.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <button
              onClick={handlePrevious}
              className="flex-1 py-3 rounded-xl border border-eclipse-muted/30 text-eclipse-muted font-medium hover:border-eclipse-accent/50 transition-all"
              aria-label="Étape précédente"
            >
              Précédent
            </button>
          )}

          <button
            onClick={handleNext}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-souffle to-ancrage text-eclipse-bg font-semibold hover:opacity-90 transition-opacity"
          >
            {isLastStep ? "C'est parti" : "Suivant"}
          </button>
        </div>

        {/* Bouton passer */}
        <button
          onClick={handleClose}
          className="w-full mt-4 py-2 text-eclipse-muted/60 text-sm hover:text-eclipse-muted transition-colors"
          aria-label="Passer l'introduction"
        >
          Passer
          <span className="sr-only"> (raccourci : Échap)</span>
        </button>
      </div>
    </div>
  );
}
