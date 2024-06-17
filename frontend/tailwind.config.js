/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-main-orange': '#CF9845',
        'custom-black' : '#080808',
        'hover-dark' : ' #140e05',
      },
    },
  },
  plugins: [],
}
