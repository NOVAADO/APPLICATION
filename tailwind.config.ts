import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // NOVA ADO brand colors based on categories (v2.4)
        souffle: "#7DD3FC",
        defoule: "#FB923C",
        atterris: "#4ADE80",
        repere: "#A78BFA",
        enchaine: "#2DD4BF",
        accroche: "#EF4444",
        decroche: "#FBBF24",
        "carte-blanche": "#94A3B8",
        // UI colors
        eclipse: {
          bg: "#0F172A",
          card: "#1E293B",
          text: "#F8FAFC",
          muted: "#94A3B8",
          accent: "#7DD3FC",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
