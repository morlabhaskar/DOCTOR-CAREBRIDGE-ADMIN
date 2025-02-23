/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':"#1F7D7D",
        'dar':"#000000",
        'dar2':"#414C4C",
        'whi':"#FFFFFF",
        'whi2':"#AAAFAF",
      },
    },
  },
  darkMode:'class',
  plugins: [],
}
