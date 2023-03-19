/** @type {import('tailwindcss').Config} */
// import colors from "tailwindcss/colors"
module.exports = {
  mode: 'jit',
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // primary: colors.neutral,
      colors: {
        'gray' : {
          400 : '#969798',
          500 : '#666666',
          700 : '#353535',
          800 : '#262626',
          900 : '#171818',
        },
      },
    },
  },
  plugins: [],
}
