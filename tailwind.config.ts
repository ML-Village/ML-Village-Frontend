import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        hero: "url('/assets/background.png')",
        gradient: "url('/assets/gradient.png')",
        "curved-gradient": "url('/assets/curved-gradient.png')",
        "inverted-background": "url('/assets/inverted-background.png')",
        banner: "url('/assets/banner.png')",
      },
      colors: {
        brand: {
          offwhite: "#F0F8FF",
          text: "#333333",
          primary: "#0B98FF",
          secondary: "#012677",
          tertiary: "#2A4D70",
          code: "#282C34",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("preline/plugin")],
};
export default config;
