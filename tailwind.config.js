/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        fade: 'fadeIn 2s',
        fadeSlow: 'fadeIn 8s'
      },
      keyframes: {
        fadeIn: {
          from :{
            opacity: 0,
          },
          to : {
            opacity: 1,
          }
        },
      },
    },
  },
  plugins: [],
}

