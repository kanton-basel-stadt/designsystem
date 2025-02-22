import { expect, it } from 'vitest'
import postcssConfig from '../../../../src/core/configs/postcss.config'
import tailwindConfig from '../../../../src/core/configs/tailwind.config.ts'

it('should define the correct plugins', () => {
  expect(postcssConfig.plugins).toHaveProperty('postcss-import')
  expect(postcssConfig.plugins).toHaveProperty('postcss-mixins')
  expect(postcssConfig.plugins).toHaveProperty('tailwindcss/nesting')
  expect(postcssConfig.plugins).toHaveProperty('tailwindcss')
  expect(postcssConfig.plugins).toHaveProperty('postcss-inline-svg')
  expect(postcssConfig.plugins).toHaveProperty('postcss-hexrgba')
  expect(postcssConfig.plugins).toHaveProperty('cssnano')
})

it('should correctly configure TailwindCSS', () => {
  expect(postcssConfig.plugins.tailwindcss).toEqual({ config: tailwindConfig })
})

it('should configure postcss-hexrgba correctly', () => {
  expect(postcssConfig.plugins['postcss-hexrgba']).toEqual({
    colorFunctionNotation: 'modern',
    transformToBareValue: true,
  })
})

it('should configure cssnano with default preset', () => {
  expect(postcssConfig.plugins.cssnano).toEqual({
    preset: 'default',
  })
})
