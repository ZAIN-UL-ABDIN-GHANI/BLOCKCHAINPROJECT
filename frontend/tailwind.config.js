/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7ff",
          100: "#dbeeff",
          200: "#bae0ff",
          300: "#7cc4fd",
          400: "#38a3f8",
          500: "#0e84e5",
          600: "#0267c3",
          700: "#0353a0",
          800: "#07407d",
          900: "#0b3568",
        },
      },
      fontFamily: {
        display: ["'DM Sans'", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      boxShadow: {
        "brand-sm": "0 1px 6px rgba(14,132,229,0.15)",
        brand: "0 4px 20px rgba(14,132,229,0.2)",
        "brand-lg": "0 8px 32px rgba(14,132,229,0.25)",
        card: "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 24px rgba(14,132,229,0.15), 0 1px 4px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
