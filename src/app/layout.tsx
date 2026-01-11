import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { Onboarding } from "@/components/Onboarding";

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
