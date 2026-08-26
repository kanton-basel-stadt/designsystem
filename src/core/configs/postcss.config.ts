const basePlugins = {
  'postcss-mixins': {},
  'postcss-inline-svg': {},
  'cssnano': {
    preset: 'default',
  },
} as const

export function createPostcssConfig(options?: { useTailwindVitePlugin?: boolean }) {
  return {
    plugins: {
      ...basePlugins,
      ...(options?.useTailwindVitePlugin ? {} : { '@tailwindcss/postcss': {} }),
    },
  }
}

export default createPostcssConfig()
