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
        'custom-main-orange': '#CF9845',
        'custom-black' : '#080808',
        'hover-dark' : ' #140e05',
        'african-violet' : '#C98BB9',
        'butterscotch' : '#CF9845',
        'caramel' : '#C97D50',
        'ivory' : '#FFFFF0',
      },
      fontFamily: {
        serif: ['Laila', 'serif'],
        serif: ['Imprima', 'sans-serif'],
      },
    },
  },
  plugins: [],
}