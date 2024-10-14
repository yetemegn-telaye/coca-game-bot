
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#C92A2A' ,
        secondary: '#020202',
        rare: '#D7B06A',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(180deg, #C92A2A 0%, #000 100%)',
        'gradient-light': 'linear-gradient(180deg, #C92A2A 0%, #4A3A1D 100%)',
        'gradient-secondary': 'linear-gradient(180deg, #E2E2E2 40%, #000 100%)',
        'hero-image' : 'url(/src/assets/images/beer_bg.png)',
      },
    },
  },
  plugins: [],
}

