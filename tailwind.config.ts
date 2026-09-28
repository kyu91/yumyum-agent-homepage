import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**", "./src/components/**"],
  theme: {
    extend: {
      colors: {
        paper: "#ffffff",
        ink: "#1a1a1a",
        orange: "#ff6c2f",
        blue: "#0078bf",
        pink: "#ff48b0",
        muted: "#38434a",
        // Orange x blue riso plates fully overprinted — the ground for dark "second ink" pages,
        // not a neutral near-black. Computed by multiplying the two plate colors per channel.
        overprint: "#003323",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      keyframes: {
        chew: {
          "0%": { transform: "scale(1, 1)" },
          "35%": { transform: "scale(1.08, 0.78)" },
          "60%": { transform: "scale(0.94, 1.06)" },
          "100%": { transform: "scale(1, 1)" },
        },
        register: {
          "0%": { transform: "translate(-5px, 4px)" },
          "60%": { transform: "translate(-5px, 4px)" },
          "100%": { transform: "translate(0, 0)" },
        },
      },
      animation: {
        chew: "chew 420ms cubic-bezier(0.2, 0.9, 0.3, 1)",
        register: "register 420ms cubic-bezier(0.2, 0.9, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
