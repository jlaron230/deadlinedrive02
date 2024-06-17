/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../frontend/src/index.css",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.css",
  ],
  theme: {
    extend: {    
      colors: {
        theme1: '#CF9845',
        theme2: '#C97D50',
        themeBlack: '#080808',
        themeWhite: '#FFFFFF',
        themeGray: '#697077'
      },
      fontFamily: {
        serif: ['Laila', 'serif'],
        serif: ['Imprima', 'sans-serif'],
      },
    },
  },
  plugins: [],
}