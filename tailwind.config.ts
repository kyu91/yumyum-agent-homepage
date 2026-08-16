import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**", "./src/components/**"],
  theme: {
    extend: {
      colors: {
        cream: "#f7f3eb",
        surface: "#fffdf8",
        paper: "#fff9ef",
        ink: "#251b19",
        brown: "#4b2a1e",
        orange: "#e57a2d",
        coral: "#f36f56",
        peach: "#f5b16f",
        butter: "#ffd27e",
        mint: "#e4efdd",
        line: "#eaded1",
        muted: "#746962",
      },
    },
  },
  plugins: [],
};

export default config;
