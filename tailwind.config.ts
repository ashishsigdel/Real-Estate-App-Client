import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        skin: "#5caf90",
        danger: "#dc3545",
        warning: "#ffc107",
        primary: "#0d6efd",
        success: "#198754",
        dark: "#161a2a",
        extraDark: "#1d2235",
        lightcolor: "#C3DAE2",
        darkcolor: "#34383D",
      },
      screens: {
        lg: "1152px",
      },
    },
  },
  plugins: [],
};
export default config;
