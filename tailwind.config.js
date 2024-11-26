
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
        primary: '#0F4C98' ,
        secondary: '#FFF',
        // rare: '#D7B06A',
        rare: '#FFFF',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(180deg, #0F4C98 20%, #fff 100%)',
        'gradient-light': 'linear-gradient(180deg, #0F4C98 0%, #4A3A1D 100%)',
        'gradient-secondary': 'linear-gradient(180deg, #E2E2E2 40%, #FFF 100%)',
        'hero-image' : 'url(/src/assets/images/waryt-logo2.png)',
      },
    },
  },
  plugins: [],
}

