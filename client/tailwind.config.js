/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem'
    },
    extend: {
      colors: {
        lightGrey: '#F0F1F0',
        mediumGrey: '#777777',
        empowerPinkDark: '#ffa477',
        empowerPink: '#FCD0BA',
        empowerGreen: '#C4DDB9',
        empowerTeal: '#DEECE9',
        empoerPurple: '#DCC6E7',
        empowerYellow: '#FBE29F',
        empowerBlue: '#C1CBE6'
      }
    }
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    'prettier-plugin-tailwindcss'
  ]
};
