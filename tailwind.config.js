/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/preline/preline.js'],
  theme: {
    extend: {
      colors: {
        primary_color: '#16A34A',
        secondary_color: '#029638',
        tertiary_color: '#16A34A5B'
      }
    }
  },
  darkMode: 'class',
  plugins: [require('preline/plugin')]
}
