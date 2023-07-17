/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,html}",
  "./node_modules/flowbite/**/*.js"],
  darkMode: 'class',
  theme: {
    screens: {
      'sm-x3': { "max": "390px" },
      'sm-x2': { "max": "500px" },
      'sm': { "max": "767px" },
      'md': { "max": "900px" },
      'lg': { "max": "1200px" },
      'lg-x2': { "min": "1201px" },

    },
    borderWidth:{
      '1': '1px',
    },
    fontFamily: {
      "vazirBold": 'vazirBold',
      "vazirMedium": 'vazirMedium',
      "vazirLight": 'vazirLight',
      "cursive":"cursive"
    },
    extend: {
      colors: {
        'secondText': '#8d8d8d',
        'golden': '#ffc542',
        'redBg': '#ff4242',
        'hederBg': '#18191d',
        'mainBg': '#111217'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}

