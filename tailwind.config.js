module.exports = {
  purge: ['./pages/**/*.js', './src/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins:
          "'Poppins', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        raleway: "'Raleway', ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
      },
      maxWidth: {
        '1080px': '1080px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
