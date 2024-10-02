import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
 content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
 theme: {
  extend: {
   fontFamily: {
    sans: ["Inter", ...defaultTheme.fontFamily.sans],
    oswald: ["Oswald", ...defaultTheme.fontFamily.sans],
   },
   colors: {
    neutral: "rgba(229, 231, 235)",
    primary: "rgba(255, 255, 255)",
   },
  },
 },
 plugins: [],
};
