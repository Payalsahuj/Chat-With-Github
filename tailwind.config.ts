import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        navy: {
          light: "#384766",
          DEFAULT: "#1e2a47",
          dark: "#172138",
        },
        github: {
          blue: "#0366d6",
          purple: "#6f42c1",
          green: "#2cbe4e",
        },
        card: {
          DEFAULT: "#ffffff",
          light: "#f6f8fa",
          dark: "#eaecef",
        },
        border: {
          DEFAULT: "rgba(0, 0, 0, 0.1)",
          light: "rgba(0, 0, 0, 0.05)",
        },
        text: {
          primary: "#24292e",
          secondary: "#586069",
          tertiary: "#6a737d",
        },
      },
      boxShadow: {
        card: "0 4px 20px rgba(0, 0, 0, 0.05)",
        hover: "0 8px 24px rgba(0, 0, 0, 0.08)",
        input: "0 2px 6px rgba(0, 0, 0, 0.04)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "slide-in-right": "slideInRight 0.4s ease-out forwards",
        "pulse-subtle": "pulseSubtle 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      backdropFilter: {
        "blur-sm": "blur(4px)",
      },
      borderRadius: {
        DEFAULT: "8px",
        lg: "12px",
        xl: "16px",
      },
    },
  },
} satisfies Config;
