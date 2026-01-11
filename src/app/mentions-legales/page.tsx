import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales - Éclipse",
  description: "Mentions légales et avertissements de l'application Éclipse par NOVA ADO.",
};

/**
 * Page Mentions légales
 * Disclaimer complet ADN + ressources d'aide
 */
export default function MentionsLegalesPage() {
  return (
    <div className="flex-1 flex flex-col px-6 py-8 max-w-lg mx-auto">
      {/* Header */}
      <header className="mb-8">
        <Link
          href="/"
          className="text-eclipse-accent hover:underline underline-offset-4 text-sm"
        >
          ← Retour à l&apos;accueil
        </Link>
        <h1 className="text-2xl font-bold mt-4">Mentions légales</h1>
      </header>

      {/* Disclaimer principal */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3 text-eclipse-accent">
          Avertissement important
        </h2>
        <div className="bg-eclipse-card rounded-xl p-5 border border-eclipse-muted/20">
          <p className="text-eclipse-text leading-relaxed">
            NOVA ADO est un <strong>jeu ludique</strong> de soutien au quotidien.
            Il ne constitue pas un service de santé, un diagnostic ou un traitement
            et <strong>ne remplace pas un accompagnement professionnel</strong>.
          </p>
        </div>
      </section>

      {/* Ce que c'est / Ce que ce n'est pas */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Ce qu&apos;Éclipse n&apos;est pas</h2>
        <ul className="space-y-2 text-eclipse-muted">
          <li className="flex items-start gap-2">
            <span className="text-eclipse-accent">•</span>
            <span>Un traitement médical ou psychologique</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-eclipse-accent">•</span>
            <span>Une thérapie ou un suivi clinique</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-eclipse-accent">•</span>
            <span>Un outil de diagnostic</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-eclipse-accent">•</span>
            <span>Une promesse de résultat</span>
          </li>
        </ul>
      </section>

      {/* Ressources d'aide */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Besoin d&apos;aide ?</h2>
        <p className="text-eclipse-muted mb-4">
          Si tu traverses un moment difficile, parle à un adulte de confiance
          ou contacte une ressource d&apos;aide :
        </p>
        <div className="space-y-3">
          <a
            href="tel:1-800-263-2266"
            className="block bg-eclipse-card rounded-xl p-4 border border-eclipse-muted/20 hover:border-eclipse-accent/50 transition-colors"
          >
            <p className="font-semibold text-eclipse-text">Tel-Jeunes</p>
            <p className="text-eclipse-accent">1-800-263-2266</p>
            <p className="text-eclipse-muted text-sm">Texto : 514-600-1002</p>
          </a>
          <a
            href="tel:1-800-361-5085"
            className="block bg-eclipse-card rounded-xl p-4 border border-eclipse-muted/20 hover:border-eclipse-accent/50 transition-colors"
          >
            <p className="font-semibold text-eclipse-text">Ligne Parents</p>
            <p className="text-eclipse-accent">1-800-361-5085</p>
          </a>
        </div>
      </section>

      {/* Éditeur */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Éditeur</h2>
        <p className="text-eclipse-muted">
          <strong className="text-eclipse-text">NOVA ADO</strong>
          <br />
          Québec, Canada
          <br />
          <a
            href="https://novaado.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="text-eclipse-accent hover:underline"
          >
            novaado.ca
          </a>
        </p>
      </section>

      {/* Public cible */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Public cible</h2>
        <p className="text-eclipse-muted">
          Éclipse est conçu pour les adolescents de <strong className="text-eclipse-text">13 ans et plus</strong>.
        </p>
      </section>

      {/* Footer */}
      <footer className="mt-auto pt-8 text-center">
        <p className="text-eclipse-muted/60 text-xs">
          Conçu au Québec avec soin.
        </p>
      </footer>
    </div>
  );
}
