import path from 'node:path'
import { fileURLToPath } from 'node:url'

// CJS vs TS stuff
let dirname
try {
  dirname = __dirname
}
catch (_) {
  console.log(import.meta.url)
  const filename = fileURLToPath(import.meta.url)
  dirname = path.dirname(filename)
}

export default {
  plugins: {
    'postcss-import': {},
    'postcss-mixins': {},
    'tailwindcss/nesting': {},
    'tailwindcss': {
      config: path.resolve(`${dirname}/configs/tailwind.config.ts`),
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
