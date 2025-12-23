import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  extend: {
    colors: {
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",

      primary: "hsl(var(--primary))",
      "primary-foreground": "hsl(var(--primary-foreground))",

      secondary: "hsl(var(--secondary))",
      "secondary-foreground": "hsl(var(--secondary-foreground))",

      accent: "hsl(var(--accent))",
      "accent-foreground": "hsl(var(--accent-foreground))",

      destructive: "hsl(var(--destructive))",
      border: "hsl(var(--border))",
      ring: "hsl(var(--ring))",
    },
  },
},

  plugins: [require("tailwindcss-animate")],
};
export default config;
