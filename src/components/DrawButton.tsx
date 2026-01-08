"use client";

import Image from "next/image";

interface DrawButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

/**
 * Bouton principal "Tire une carte"
 * CTA principal de l'accueil - doit être visible et accessible
 * Inclut le picto pige-carte
 */
export function DrawButton({ onClick, disabled = false }: DrawButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full max-w-xs mx-auto
        py-4 px-8 rounded-2xl
        text-lg font-semibold
        bg-gradient-to-r from-souffle to-ancrage
        text-eclipse-bg
        shadow-lg shadow-souffle/20
        transition-all duration-200
        touch-feedback
        flex items-center justify-center gap-3
        ${disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:shadow-xl hover:shadow-souffle/30 hover:scale-[1.02]"
        }
      `}
      aria-label="Tirer une carte au hasard"
    >
      <Image
        src="/pictos/pige-carte.png"
        alt=""
        width={28}
        height={28}
        className="w-7 h-7"
        aria-hidden="true"
      />
      Tire une carte
    </button>
  );
}
