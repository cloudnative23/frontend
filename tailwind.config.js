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
      maxHeight: {
        route_board: '400px',
      },
      colors: {
        passenger:'#f8f3ed',  // orange
        passenger_dark:'#d9854e',
        driver:'#eef6f9',  // blue
        driver_dark: "#5284CF",
        go2work:'#57A368',  // green
        go2work_light:'#E4F8CC',
        go2home:'#DC7272',  // red
        go2home_light:'#FFE2E2',
        gray_light:'#F4F4F4', // gray
        gray_dark:'#757575',
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
