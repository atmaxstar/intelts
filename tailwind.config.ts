import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
          "fade-in-bottom": "fade-in-bottom 0.8s ease-out   both",
          "fade-in": "fade-in 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) 1.0s  both"
      },
      keyframes: {
          "fade-in-bottom": {
              "0%": {
                  transform: "translateY(50px)",
                  opacity: "0"
              },
              to: {
                  transform: "translateY(0)",
                  opacity: "1"
              }
          },
          "fade-in": {
              "0%": {
                  opacity: "0"
              },
              to: {
                  opacity: "1"
              }
          }
      }
    },
  },
  plugins: [],
};
export default config;
