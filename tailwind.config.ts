import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "black-50": "rgba(0, 0, 0, 0.5)",
      },
      colors: {
        barSuccess: "#3F9242",
        success: "#A3D9A5",
        barError: "#BB2525",
        error: "#F39B9A",
        barWarning: "#E9B949",
        warning: "#F8E3A2",
      },
      width: {
        "50vw": "50vw",
      },
      maxHeight: {
        "80vh": "80vh",
      },
      boxShadow: {
        custom: "0 0 3px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
