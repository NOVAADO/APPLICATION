import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { Onboarding } from "@/components/Onboarding";

export const metadata: Metadata = {
  title: "NOVA ADO – Le jeu Éclipse | 49 cartes pour faire pause",
  description:
    "49 cartes simples pour aider les ados à gérer leurs émotions et faire pause quand ça déborde.",
  manifest: "/manifest.json",
  metadataBase: new URL("https://eclipse.novaado.ca"),
  openGraph: {
    title: "NOVA ADO – Le jeu Éclipse | 49 cartes pour faire pause",
    description:
      "49 cartes simples pour aider les ados à gérer leurs émotions et faire pause quand ça déborde.",
    url: "https://eclipse.novaado.ca",
    siteName: "Éclipse – NOVA ADO",
    images: [
      {
        url: "/og-eclipse-v2.png",
        width: 1200,
        height: 630,
        alt: "Le jeu Éclipse par NOVA ADO — 49 cartes pour faire pause",
        type: "image/png",
      },
    ],
    locale: "fr_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVA ADO – Le jeu Éclipse",
    description:
      "49 cartes pour faire pause quand les émotions débordent.",
    images: ["/og-eclipse-v2.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Éclipse",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0F172A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-CA">
      <body className="antialiased">
        <main className="min-h-screen flex flex-col pb-20">
          {children}
        </main>
        <BottomNav />
        <Onboarding />
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1E293B",
              color: "#F8FAFC",
              border: "1px solid rgba(148, 163, 184, 0.2)",
            },
          }}
        />
      </body>
    </html>
  );
}
