"use client";

import { useRouter } from "next/navigation";

/**
 * Page Aide - Ressources d'aide pour adolescents
 *
 * Ressources officielles québécoises : Tel-Jeunes, 988, Info-Social 811
 * Ton : normalisant, pas alarmiste, respect de l'autonomie
 * ADN : complice, jamais infantilisant
 */
export default function AidePage() {
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col px-6 py-8 pb-safe">
      {/* Bouton retour */}
      <button
        onClick={() => router.back()}
        className="self-start mb-6 text-eclipse-muted hover:text-eclipse-text transition-colors flex items-center gap-2"
        aria-label="Retour"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Retour
      </button>

      {/* En-tête */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Besoin de parler?</h1>
        <p className="text-eclipse-muted">
          Des personnes formées t&apos;écoutent, sans jugement. C&apos;est
          gratuit et confidentiel.
        </p>
      </header>

      {/* Section Tel-Jeunes (principale) */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-souffle">Tel-Jeunes</h2>
        <p className="text-eclipse-muted text-sm mb-4">
          Pour les jeunes de moins de 20 ans. Confidentiel — on ne contacte pas
          tes parents.
        </p>

        <div className="space-y-3">
          {/* Texto */}
          <a
            href="sms:5146001002"
            className="flex items-center gap-4 p-4 rounded-xl bg-eclipse-card border border-eclipse-muted/20 hover:border-souffle/50 transition-all touch-feedback"
          >
            <div
              className="w-10 h-10 rounded-full bg-souffle/20 flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              <svg
                className="w-5 h-5 text-souffle"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium text-eclipse-text">Texto / SMS</p>
              <p className="text-eclipse-muted text-sm">514-600-1002</p>
              <p className="text-eclipse-muted/60 text-xs mt-1">
                8h à 22h30, 7j/7
              </p>
            </div>
            <span className="text-souffle text-sm font-medium">Écrire</span>
          </a>

          {/* Chat */}
          <a
            href="https://www.teljeunes.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-eclipse-card border border-eclipse-muted/20 hover:border-souffle/50 transition-all touch-feedback"
          >
            <div
              className="w-10 h-10 rounded-full bg-souffle/20 flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              <svg
                className="w-5 h-5 text-souffle"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium text-eclipse-text">Chat en ligne</p>
              <p className="text-eclipse-muted text-sm">teljeunes.com</p>
              <p className="text-eclipse-muted/60 text-xs mt-1">
                8h à minuit, 7j/7
              </p>
            </div>
            <span className="text-souffle text-sm font-medium">Ouvrir</span>
          </a>

          {/* Téléphone */}
          <a
            href="tel:18002632266"
            className="flex items-center gap-4 p-4 rounded-xl bg-eclipse-card border border-eclipse-muted/20 hover:border-souffle/50 transition-all touch-feedback"
          >
            <div
              className="w-10 h-10 rounded-full bg-souffle/20 flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              <svg
                className="w-5 h-5 text-souffle"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium text-eclipse-text">Téléphone</p>
              <p className="text-eclipse-muted text-sm">1-800-263-2266</p>
              <p className="text-eclipse-muted/60 text-xs mt-1">
                6h à 2h, 7j/7
              </p>
            </div>
            <span className="text-souffle text-sm font-medium">Appeler</span>
          </a>
        </div>
      </section>

      {/* Section Pensées difficiles */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-ancrage">
          Pensées difficiles
        </h2>
        <p className="text-eclipse-muted text-sm mb-4">
          Si tu traverses un moment vraiment tough, ces lignes sont là 24h/24.
        </p>

        <div className="space-y-3">
          {/* 988 */}
          <a
            href="tel:988"
            className="flex items-center gap-4 p-4 rounded-xl bg-eclipse-card border border-eclipse-muted/20 hover:border-ancrage/50 transition-all touch-feedback"
          >
            <div
              className="w-10 h-10 rounded-full bg-ancrage/20 flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              <span className="text-ancrage font-bold text-lg">988</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-eclipse-text">
                Ligne nationale de prévention
              </p>
              <p className="text-eclipse-muted text-sm">
                Appel ou texto au 988
              </p>
              <p className="text-eclipse-muted/60 text-xs mt-1">24h/24, 7j/7</p>
            </div>
            <span className="text-ancrage text-sm font-medium">Appeler</span>
          </a>

          {/* suicide.ca */}
          <a
            href="https://suicide.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-eclipse-card border border-eclipse-muted/20 hover:border-ancrage/50 transition-all touch-feedback"
          >
            <div
              className="w-10 h-10 rounded-full bg-ancrage/20 flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              <svg
                className="w-5 h-5 text-ancrage"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium text-eclipse-text">Chat suicide.ca</p>
              <p className="text-eclipse-muted text-sm">Clavardage en direct</p>
              <p className="text-eclipse-muted/60 text-xs mt-1">24h/24, 7j/7</p>
            </div>
            <span className="text-ancrage text-sm font-medium">Ouvrir</span>
          </a>
        </div>
      </section>

      {/* Section Autres ressources */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-faire-le-point">
          Autres ressources
        </h2>

        <div className="space-y-3">
          {/* Jeunesse, J'écoute */}
          <a
            href="sms:686868&body=PARLER"
            className="flex items-center gap-4 p-4 rounded-xl bg-eclipse-card border border-eclipse-muted/20 hover:border-faire-le-point/50 transition-all touch-feedback"
          >
            <div
              className="w-10 h-10 rounded-full bg-faire-le-point/20 flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              <svg
                className="w-5 h-5 text-faire-le-point"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium text-eclipse-text">
                Jeunesse, J&apos;écoute
              </p>
              <p className="text-eclipse-muted text-sm">
                Texto : PARLER au 686868
              </p>
              <p className="text-eclipse-muted/60 text-xs mt-1">24h/24, 7j/7</p>
            </div>
            <span className="text-faire-le-point text-sm font-medium">
              Écrire
            </span>
          </a>

          {/* Info-Social 811 */}
          <a
            href="tel:811"
            className="flex items-center gap-4 p-4 rounded-xl bg-eclipse-card border border-eclipse-muted/20 hover:border-faire-le-point/50 transition-all touch-feedback"
          >
            <div
              className="w-10 h-10 rounded-full bg-faire-le-point/20 flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              <span className="text-faire-le-point font-bold text-lg">811</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-eclipse-text">Info-Social 811</p>
              <p className="text-eclipse-muted text-sm">Option 2</p>
              <p className="text-eclipse-muted/60 text-xs mt-1">24h/24, 7j/7</p>
            </div>
            <span className="text-faire-le-point text-sm font-medium">
              Appeler
            </span>
          </a>

          {/* Aire ouverte */}
          <a
            href="https://www.quebec.ca/sante/trouver-une-ressource/aire-ouverte"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-eclipse-card border border-eclipse-muted/20 hover:border-faire-le-point/50 transition-all touch-feedback"
          >
            <div
              className="w-10 h-10 rounded-full bg-faire-le-point/20 flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              <svg
                className="w-5 h-5 text-faire-le-point"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium text-eclipse-text">Aire ouverte</p>
              <p className="text-eclipse-muted text-sm">
                Services gratuits 12-25 ans
              </p>
              <p className="text-eclipse-muted/60 text-xs mt-1">
                En personne, sans rendez-vous
              </p>
            </div>
            <span className="text-faire-le-point text-sm font-medium">
              Trouver
            </span>
          </a>
        </div>
      </section>

      {/* Note de confidentialité */}
      <footer className="mt-auto pt-6 border-t border-eclipse-muted/20">
        <div className="bg-eclipse-card/50 rounded-xl p-4">
          <p className="text-eclipse-muted text-sm">
            Ces services sont <strong className="text-eclipse-text">gratuits</strong> et{" "}
            <strong className="text-eclipse-text">confidentiels</strong>. Tu n&apos;as pas besoin
            de donner ton nom.
          </p>
          <p className="text-eclipse-muted/60 text-xs mt-2">
            Au Québec, les 14 ans et plus ont droit à la confidentialité de
            leurs soins de santé.
          </p>
        </div>
      </footer>
    </div>
  );
}
