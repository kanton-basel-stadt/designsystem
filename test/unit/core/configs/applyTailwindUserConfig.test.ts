import { afterEach, expect, it } from 'vitest'
import { applyTailwindUserConfig, getTailwindUserConfig } from '../../../../src/core/configs/applyTailwindUserConfig.ts'

afterEach(() => {
  applyTailwindUserConfig({})
  Reflect.deleteProperty(globalThis, '__kantonBsDesignsystemTailwindUserConfig')
})

it('returns an empty object when no user config has been applied', () => {
  Reflect.deleteProperty(globalThis, '__kantonBsDesignsystemTailwindUserConfig')
  expect(getTailwindUserConfig()).toEqual({})
})

it('stores and returns the user-provided Tailwind config', () => {
  applyTailwindUserConfig({ content: ['./src/**/*.html'] })
  expect(getTailwindUserConfig()).toEqual({ content: ['./src/**/*.html'] })
})
