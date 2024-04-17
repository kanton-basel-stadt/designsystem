const path = require('node:path')

module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-mixins': {},
    'tailwindcss/nesting': {},
    'tailwindcss': {
      config: path.resolve(path.join(__dirname, '/tailwind.config.ts')),
    },
    'postcss-hexrgba': {
      colorFunctionNotation: 'modern',
      transformToBareValue: true,
    },
    'cssnano': {
      preset: 'default',
    },
  },
}
