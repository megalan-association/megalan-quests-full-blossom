import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "320px", // iPhone SE breakpoint
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        beige: "#fff6e9",
        pink: "#ea4f91",
        "light-pink": "#ffe6eb",
        green: "#6e8b1c",
        "light-green": "#d1d08c",
        brown: "#794d2d",
      },
      fontFamily: {
        heading: ["var(--font-fredoka)"],
        body: ["var(--font-montserrat)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
