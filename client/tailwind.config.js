/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
      },
      fontSize: {
        '3_5xl': [
          '2rem',
          {
            lineHeight: '2.375rem',
          },
        ],
      },
      height: {
        '1p': '1px',
      },
    },
    colors: {
      primary: 'rgb(var(--color-primary) / <alpha-value>)',
      gray: 'rgb(var(--color-gray))',
      background: 'rgb(var(--color-background) / <alpha-value>)',
      white: 'rgb(var(--color-white) / <alpha-value>)',
      transparent: 'transparent',
    },
  },
  plugins: [],
};
