/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    screens:{
      'sm-x3':{"max":"390px"}, 
      'sm-x2':{"max":"500px"},
      'sm':{"max":"767px"},
      'md':{"max":"900px"},
      'lg':{"max":"1200px"},
      'lg-x2':{"min":"1201px"},
     
    },
    fontFamily:{
      "vazirBold" : 'vazirBold',
      "vazirMedium" : 'vazirMedium',
      "vazirLight" : 'vazirLight'
    },
    extend: {},
  },
  plugins: [],
}

