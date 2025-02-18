/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", 
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkBackground: "#1a1a1a",
        lightBackground: "#f0f0f0",
        primary: "#2563eb",
        secondary: "#9333ea",
      },
    },
  },
  plugins: [],
};
