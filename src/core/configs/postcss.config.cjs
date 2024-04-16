const path = require('path');

module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-mixins': {},
    'tailwindcss/nesting': {},
    'tailwindcss': {
      config: path.resolve(__dirname + '/tailwind.config.ts')
    },
    'postcss-hexrgba': {
      colorFunctionNotation: 'modern',
      transformToBareValue: true,
    },
    'cssnano': {
      preset: 'default'
    }
  },
};
