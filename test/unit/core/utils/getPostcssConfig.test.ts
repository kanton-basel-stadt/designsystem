import { beforeEach, expect, it, vi } from 'vitest'
import { getPostcssConfig } from '../../../../src/core/utils/getPostcssConfig.ts'

beforeEach(() => {
  vi.mock('../../../../src/core/configs/postcss.config', () => {
    return {
      default: {
        plugins: {
          tailwindcss: {
            config: {
              someOption: 'someValue',
              someArray: ['some', 'values'],
            },
          },
        },
      },
    }
  })

  vi.mock('postcss-load-config/src/options.js', () => ({
    default: vi.fn(() => 'Options loaded'),
  }))

  vi.mock('postcss-load-config/src/plugins.js', () => ({
    default: vi.fn(() => 'Plugins loaded'),
  }))

  vi.mock('lodash.merge', () => ({
    default: vi.fn(() => 'merged'),
  }))
})

it('delivers the standard PostCSS + Tailwind config if no alterations are specified', async () => {
  const loadPluginsMock = await import('postcss-load-config/src/plugins.js')
  const loadOptionsMock = await import('postcss-load-config/src/options.js')

  const loadPluginsSpy = vi.spyOn(loadPluginsMock, 'default')
  const loadOptionsSpy = vi.spyOn(loadOptionsMock, 'default')

  const result = await getPostcssConfig('some/config/path', undefined)

  expect(result).toStrictEqual({
    file: 'some/config/path/postcss.config.ts',
    plugins: 'Plugins loaded',
    options: 'Options loaded',
  })

  expect(loadPluginsSpy).toHaveBeenCalledOnce()
  expect(loadPluginsSpy).toHaveBeenCalledWith({
    plugins: {
      tailwindcss: {
        config: {
          someOption: 'someValue',
          someArray: ['some', 'values'],
        },
      },
    },
  }, 'some/config/path/postcss.config.ts')

  expect(loadOptionsSpy).toHaveBeenCalledOnce()
  expect(loadOptionsSpy).toHaveBeenCalledWith({
    plugins: {
      tailwindcss: {
        config: {
          someOption: 'someValue',
          someArray: ['some', 'values'],
        },
      },
    },
  }, 'some/config/path/postcss.config.ts')
})

it('should merge Tailwind config, if present', async () => {
  const loadPluginsMock = await import('postcss-load-config/src/plugins.js')
  const loadOptionsMock = await import('postcss-load-config/src/options.js')
  const mergeMock = await import('lodash.merge')

  const loadPluginsSpy = vi.spyOn(loadPluginsMock, 'default')
  const loadOptionsSpy = vi.spyOn(loadOptionsMock, 'default')
  const mergeSpy = vi.spyOn(mergeMock, 'default')

  const result = await getPostcssConfig('some/config/path', {
    someOtherKey: 'someOtherValue',
  })

  expect(result).toStrictEqual({
    file: 'some/config/path/postcss.config.ts',
    plugins: 'Plugins loaded',
    options: 'Options loaded',
  })

  expect(mergeSpy).toHaveBeenCalledOnce()
  expect(mergeSpy).toHaveBeenCalledWith({
    someOption: 'someValue',
    someArray: ['some', 'values'],
  }, {
    someOtherKey: 'someOtherValue',
  })

  expect(loadPluginsSpy).toHaveBeenCalledWith({
    plugins: {
      tailwindcss: {
        config: 'merged',
      },
    },
  }, 'some/config/path/postcss.config.ts')

  expect(loadOptionsSpy).toHaveBeenCalledWith({
    plugins: {
      tailwindcss: {
        config: 'merged',
      },
    },
  }, 'some/config/path/postcss.config.ts')
})
