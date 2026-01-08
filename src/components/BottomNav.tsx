"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { getSettings } from "@/lib/settings";

interface NavItem {
  href: string;
  label: string;
  icon: string;
  ariaLabel: string;
}

const navItems: NavItem[] = [
  { href: "/", label: "Accueil", icon: "/pictos/nav-accueil.svg", ariaLabel: "Aller à l'accueil" },
  { href: "/categories", label: "Catégories", icon: "/pictos/nav-categories.svg", ariaLabel: "Voir les catégories" },
  { href: "/favorites", label: "Favoris", icon: "/pictos/nav-favoris.svg", ariaLabel: "Voir tes favoris" },
  { href: "/parametres", label: "Réglages", icon: "/pictos/nav-reglages.svg", ariaLabel: "Ouvrir les réglages" },
];

/**
 * Barre de navigation en bas de l'écran
 *
 * 4 items : Accueil, Catégories, Favoris, Réglages
 * Highlight de l'item actif
 * A11y : nav avec aria-label, liens avec aria-current
 */
export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [immersiveMode, setImmersiveMode] = useState(true);

  // Charger le réglage mode immersif
  useEffect(() => {
    const settings = getSettings();
    setImmersiveMode(settings.immersiveMode);
  }, []);

  // Ne pas afficher sur les pages de technique si mode immersif activé
  if (immersiveMode && pathname.startsWith("/technique/")) {
    return null;
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-eclipse-bg/95 backdrop-blur-sm border-t border-eclipse-muted/20 pb-safe z-50"
      aria-label="Navigation principale"
    >
      <ul className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <button
                onClick={() => router.push(item.href)}
                className={`flex flex-col items-center justify-center w-16 h-14 rounded-lg transition-all touch-feedback ${
                  isActive
                    ? "text-eclipse-accent"
                    : "text-eclipse-muted hover:text-eclipse-text"
                }`}
                aria-label={item.ariaLabel}
                aria-current={isActive ? "page" : undefined}
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={24}
                  height={24}
                  className={`w-6 h-6 mb-0.5 transition-all ${
                    isActive ? "opacity-100" : "opacity-60"
                  }`}
                  style={{
                    filter: isActive
                      ? "invert(56%) sepia(95%) saturate(1000%) hue-rotate(166deg) brightness(100%)"
                      : "invert(70%) sepia(0%) saturate(0%) brightness(100%)",
                  }}
                  aria-hidden="true"
                />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
