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
        background: "#f7f6f1", // 背景色としてのカスタムカラーを追加
        peach: {
          100: "#ffe5d4",
          200: "#ffccaa",
          300: "#ffb380",
          400: "#ff9966",
        },
        orange: {
          500: "#ff8c00",
          600: "#ff7700",
        },
      },
      fontFamily: {
        playful: ['"Caveat"', '"Indie Flower"', 'cursive'],
      },
    },
  },
  plugins: [],
};

export default config;
