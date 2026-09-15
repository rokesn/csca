/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        study: "0 12px 32px -12px rgba(49, 46, 129, 0.35)",
        card: "0 8px 24px -12px rgba(15, 23, 42, 0.25)",
      },
      borderRadius: { study: "1.25rem" },
    },
  },
  plugins: []
};
export default config;
