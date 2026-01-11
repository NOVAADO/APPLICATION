import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Éclipse - NOVA ADO",
  description: "T'as besoin d'une pause ? Une technique. 2 à 5 minutes. Direct.",
  manifest: "/manifest.json",
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
      </body>
    </html>
  );
}
