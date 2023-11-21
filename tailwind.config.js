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
      width: {
        mobile: "360px", // 手機版寬度
      },
      height: {
        mobile: "620px", // 手機版高度
      },
      colors: {
        passenger:'#f8f3ed',
        dark_o:'#d9854e',
      },
      maxHeight: {
        route_board: '400px',
      },
    },
  },
  plugins: [],
};