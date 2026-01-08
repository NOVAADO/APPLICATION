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
        // NOVA ADO brand colors based on categories
        souffle: "#7DD3FC",
        decharge: "#FB923C",
        ancrage: "#4ADE80",
        "faire-le-point": "#A78BFA",
        "paroles-fortes": "#EF4444",
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
