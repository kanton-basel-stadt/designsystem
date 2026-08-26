import { beforeEach, expect, it, vi } from 'vitest'
import { getPostcssConfig } from '../../../../src/core/utils/getPostcssConfig.ts'

beforeEach(() => {
  vi.mock('../../../../src/core/configs/postcss.config', () => {
    return {
      createPostcssConfig: vi.fn((options?: { useTailwindVitePlugin?: boolean }) => ({
        plugins: {
          ...(options?.useTailwindVitePlugin ? {} : { '@tailwindcss/postcss': {} }),
        },
      })),
      default: {
        plugins: {
          '@tailwindcss/postcss': {},
        },
      },
    }
  })

  vi.mock('../../../../src/core/configs/applyTailwindUserConfig.ts', () => ({
    applyTailwindUserConfig: vi.fn(),
  }))

  vi.mock('postcss-load-config/src/options.js', () => ({
    default: vi.fn(() => 'Options loaded'),
  }))

  vi.mock('postcss-load-config/src/plugins.js', () => ({
    default: vi.fn(() => 'Plugins loaded'),
  }))
})

it('delivers the standard PostCSS + Tailwind config if no alterations are specified', async () => {
  const loadPluginsMock = await import('postcss-load-config/src/plugins.js')
  const loadOptionsMock = await import('postcss-load-config/src/options.js')
  const { applyTailwindUserConfig } = await import('../../../../src/core/configs/applyTailwindUserConfig.ts')

  const loadPluginsSpy = vi.spyOn(loadPluginsMock, 'default')
  const loadOptionsSpy = vi.spyOn(loadOptionsMock, 'default')

  const result = await getPostcssConfig('some/config/path', undefined)

  expect(result).toStrictEqual({
    file: 'some/config/path/postcss.config.ts',
    plugins: 'Plugins loaded',
    options: 'Options loaded',
  })

  expect(applyTailwindUserConfig).not.toHaveBeenCalled()

  const expectedConfig = {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  }

  expect(loadPluginsSpy).toHaveBeenCalledOnce()
  expect(loadPluginsSpy).toHaveBeenCalledWith(expectedConfig, 'some/config/path/postcss.config.ts')

  expect(loadOptionsSpy).toHaveBeenCalledOnce()
  expect(loadOptionsSpy).toHaveBeenCalledWith(expectedConfig, 'some/config/path/postcss.config.ts')
})

it('should apply Tailwind config overrides, if present', async () => {
  const loadPluginsMock = await import('postcss-load-config/src/plugins.js')
  const loadOptionsMock = await import('postcss-load-config/src/options.js')
  const { applyTailwindUserConfig } = await import('../../../../src/core/configs/applyTailwindUserConfig.ts')

  const loadPluginsSpy = vi.spyOn(loadPluginsMock, 'default')
  const loadOptionsSpy = vi.spyOn(loadOptionsMock, 'default')

  const result = await getPostcssConfig('some/config/path', {
    content: ['/path/to/templates/**/*.html'],
  })

  expect(result).toStrictEqual({
    file: 'some/config/path/postcss.config.ts',
    plugins: 'Plugins loaded',
    options: 'Options loaded',
  })

  expect(applyTailwindUserConfig).toHaveBeenCalledOnce()
  expect(applyTailwindUserConfig).toHaveBeenCalledWith({
    content: ['/path/to/templates/**/*.html'],
  })

  const expectedConfig = {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  }

  expect(loadPluginsSpy).toHaveBeenCalledWith(expectedConfig, 'some/config/path/postcss.config.ts')
  expect(loadOptionsSpy).toHaveBeenCalledWith(expectedConfig, 'some/config/path/postcss.config.ts')
})

it('omits @tailwindcss/postcss when the Tailwind Vite plugin is used', async () => {
  const loadPluginsMock = await import('postcss-load-config/src/plugins.js')
  const loadOptionsMock = await import('postcss-load-config/src/options.js')

  const loadPluginsSpy = vi.spyOn(loadPluginsMock, 'default')
  const loadOptionsSpy = vi.spyOn(loadOptionsMock, 'default')

  await getPostcssConfig('some/config/path', undefined, { useTailwindVitePlugin: true })

  const expectedConfig = {
    plugins: {},
  }

  expect(loadPluginsSpy).toHaveBeenCalledWith(expectedConfig, 'some/config/path/postcss.config.ts')
  expect(loadOptionsSpy).toHaveBeenCalledWith(expectedConfig, 'some/config/path/postcss.config.ts')
})
