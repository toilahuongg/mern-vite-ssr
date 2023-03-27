/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: 'rgb(var(--color-primary) / <alpha-value>)',
      gray: 'rgb(var(--color-gray))',
      background: 'rgb(var(--color-background) / <alpha-value>)',
      white: 'rgb(var(--color-white) / <alpha-value>)',
    },
    fontFamily: {
      sans: "'Quicksand', sans-serif",
      serif: "'Gelasio', serif",
    },
  },
  plugins: [],
};
