import tailwindConfig from './tailwind.config.ts'

export default {
  plugins: {
    'postcss-import': {},
    'postcss-mixins': {},
    'tailwindcss/nesting': {},
    'tailwindcss': {
      config: tailwindConfig,
    },
    'postcss-inline-svg': {},
    'postcss-hexrgba': {
      colorFunctionNotation: 'modern',
      transformToBareValue: true,
    },
    'cssnano': {
      preset: 'default',
    },
  },
}
