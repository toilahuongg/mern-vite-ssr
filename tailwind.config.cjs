/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: 'rgb(var(--color-primary))',
      gray: 'rgb(var(--color-gray))',
      background: 'rgb(var(--color-background))',
      white: 'rgb(var(--color-white))',
    },
    fontFamily: {
      sans: "'Quicksand', sans-serif",
      serif: "'Gelasio', serif",
    },
  },
  plugins: [],
};
