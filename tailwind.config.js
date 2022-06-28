/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/login.handlebars',
    './views/*',
    './views/layouts/main.handlebars'
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'blue': '#1fb6ff',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
    },
    extend: {},
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      'display': ['Pacifico'],
      'body': ['Pangolin']
    },
  },
  plugins: [],
}
