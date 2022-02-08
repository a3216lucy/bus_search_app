module.exports = {
  content: ["./*.{html,js}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        "roboto": ["Roboto"],
      },
      width: { 
        '120': '35rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};