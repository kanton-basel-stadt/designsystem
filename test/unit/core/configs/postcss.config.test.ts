import { expect, it } from 'vitest'
import postcssConfig, { createPostcssConfig } from '../../../../src/core/configs/postcss.config'

it('should define the correct plugins', () => {
  expect(postcssConfig.plugins).toHaveProperty('postcss-mixins')
  expect(postcssConfig.plugins).toHaveProperty('@tailwindcss/postcss')
  expect(postcssConfig.plugins).toHaveProperty('postcss-inline-svg')
  expect(postcssConfig.plugins).toHaveProperty('cssnano')
  expect(postcssConfig.plugins).not.toHaveProperty('postcss-import')
  expect(postcssConfig.plugins).not.toHaveProperty('tailwindcss')
  expect(postcssConfig.plugins).not.toHaveProperty('tailwindcss/nesting')
  expect(postcssConfig.plugins).not.toHaveProperty('postcss-hexrgba')
})

it('should configure cssnano with default preset', () => {
  expect(postcssConfig.plugins.cssnano).toEqual({
    preset: 'default',
  })
})

it('can omit @tailwindcss/postcss when using the Tailwind Vite plugin', () => {
  const vitePostcssConfig = createPostcssConfig({ useTailwindVitePlugin: true })

  expect(vitePostcssConfig.plugins).toHaveProperty('postcss-mixins')
  expect(vitePostcssConfig.plugins).not.toHaveProperty('@tailwindcss/postcss')
  expect(vitePostcssConfig.plugins).toHaveProperty('postcss-inline-svg')
  expect(vitePostcssConfig.plugins).toHaveProperty('cssnano')
})
