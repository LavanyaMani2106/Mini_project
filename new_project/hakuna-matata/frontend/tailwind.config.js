/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F8A8B',
        secondary: '#6BC5B6', 
        accent: '#FF9A76',
        background: '#F9F7F7'
      },
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'],
        'heading': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}