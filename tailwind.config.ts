import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#2563eb",
          700: "#1d4ed8"
        },
        accent: {
          100: "#ffedd5",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c"
        }
      }
    }
  },
  plugins: []
};

export default config;
