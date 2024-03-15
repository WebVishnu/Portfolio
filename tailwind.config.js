/** @type {import('tailwindcss').Config} */
module.exports = {
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
      animation: {
        marquee: "marquee 15s linear infinite",
        rotate: "rotate 2s linear infinite",
      },
      keyframes: {
        rotate: {
          "0%": { rotate: "0deg" },
          "100%": { rotate: "360deg" },
        },
        marquee: {
          "0%": { left: 0 },
          "100%": { left: "-50%" },
        },
      },
    },
  },
  plugins: [],
};