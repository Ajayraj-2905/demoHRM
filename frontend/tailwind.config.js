module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customRed: {
          default: '#f70000',
          light: '#fe8484',
          dark: '#ff5656',
          extraLight: '#ff7555',
          extraDark: '#df4343',
        },
        customBlue: {
          default: '#1f166f',
          light: '#96abf5',
          dark: '#405089',
        },
        customPurple: {
          default: '#7d07ff',
          light: '#b77ef5',
        },
        customGreen: {
          default: '#35a90d',
          light: '#bbff8c',
          dark: '#6daf45',
        },
        customYellow: {
          default: '#d7b95f',
          light: '#f7d693',
          dark: '#e8bb61',
          bright: '#f0e918',
        },
        customTeal: {
          default: '#29ab91',
          light: '#6fd3ff',
          dark: '#6fd6d6',
        },
        customOrange: {
          default: '#ff7300',
          light: '#ff8700',
          dark: '#ec8727',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
};
