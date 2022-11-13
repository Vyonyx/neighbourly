/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFF736',
        neutral: '#D6D3D1',
        'neutral-d': '#57534e',
        'neutral-l': '#E7E5E4',
      },
    },
  },
  plugins: [require('daisyui')],
}
