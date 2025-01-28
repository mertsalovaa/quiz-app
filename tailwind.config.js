// eslint-disable-next-line no-undef
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{html,ts}', 'src/**/*.{css,scss}'],
  theme: {
    extend: {
      colors: {
        accent: '#3545E9',
        warning: '#FEFD54',
        success: '#63C995',
        error: '#E23D69',
        primary: '#222328',
        secondary: '#969AB0',
        bright: '#FFFFFF',
        muted: '#7C9CBF',
        shade: '#DBE2EA',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.radio-before': {
          background: 'theme("colors.bright")',
          border: '2px solid theme("colors.shade")',
          'border-radius': '100%',
          content: '""',
          display: 'inline-block',
          height: '1.4em',
          width: '1.4em',
          'margin-right': '10px',
          'text-align': 'center',
          transition:' all 250ms ease',
        },
        '.radio-before-checked:before': {
          'background-color': 'theme("colors.error")',
          'border-color': 'theme("colors.error")',
          'box-shadow': 'inset 0 0 0 4px theme("colors.bright")',
        }
      });
    }),
  ],
};