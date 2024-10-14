
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C92A2A' ,
        secondary: '#020202',
        rare: '#D7B06A',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(180deg, #C92A2A 0%, #000 100%)',
      },
    },
  },
  plugins: [],
}

