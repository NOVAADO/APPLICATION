"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSettings } from "@/lib/settings";

interface NavItem {
  href: string;
  label: string;
  icon: string;
  ariaLabel: string;
}

const navItems: NavItem[] = [
  { href: "/", label: "Accueil", icon: "🏠", ariaLabel: "Aller à l'accueil" },
  { href: "/categories", label: "Catégories", icon: "📂", ariaLabel: "Voir les catégories" },
  { href: "/favorites", label: "Favoris", icon: "★", ariaLabel: "Voir tes favoris" },
  { href: "/parametres", label: "Réglages", icon: "⚙️", ariaLabel: "Ouvrir les réglages" },
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
                <span className="text-xl mb-0.5" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
