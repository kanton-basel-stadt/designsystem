import type { PluginAPI, PluginCreator } from 'tailwindcss/types/config'
import { describe, expect, it } from 'vitest'
import config from '../../../../src/core/configs/tailwind.config.ts'

describe('tailwind CSS Configuration - Basic Assertions', () => {
  it('should export an object configuration', () => {
    expect(typeof config).toBe('object')
    expect(config).not.toBeNull()
  })

  it('should include content dependencies as a non-empty array of strings', () => {
    expect(Array.isArray(config.content)).toBe(true)
    expect((config.content as string[]).length).toBeGreaterThan(0)

    ;(config.content as string[]).forEach((entry) => {
      expect(typeof entry).toBe('string')
      expect(entry.length).toBeGreaterThan(0)
    })
  })

  it('should include the correct safelist and an empty blocklist', () => {
    expect(config.safelist).toContain('h-0')
    expect(config.blocklist).toEqual([])
  })

  it('should have expected corePlugins disabled', () => {
    expect(config.corePlugins).toEqual(
      expect.objectContaining({
        textOpacity: false,
        container: false,
        content: false,
      }),
    )
  })
})

describe('theme - Detailed Checks', () => {
  it('should define custom screen breakpoints', () => {
    expect(config.theme?.screens).toEqual({
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1210px',
      xxl: '1920px',
    })
  })

  it('should define spacing values that are either pixel-based or CSS variables', () => {
    const spacing = config.theme?.spacing
    Object.values(spacing as unknown as string[]).forEach((value) => {
      expect(typeof value).toBe('string')
      const isPx = value.endsWith('px')
      const isVar = value.startsWith('var(')
      expect(isPx || isVar).toBe(true)
    })
  })

  it('should define proper borderWidth values', () => {
    const borderWidth = config.theme?.borderWidth
    Object.entries(borderWidth as unknown as string[]).forEach(([key, value]) => {
      expect(typeof value).toBe('string')
      if (key === '0') {
        expect(value).toBe('0')
      }
      else {
        expect(value).toMatch(/^\d+px$/)
      }
    })
  })

  it('should define maxWidth values correctly', () => {
    expect(config.theme?.maxWidth).toEqual(
      expect.objectContaining({
        reduced: '970px',
        prose: '836px',
        box: '610px',
        fit: 'fit-content',
      }),
    )
  })

  it('should define lineHeight values correctly', () => {
    expect(config.theme?.lineHeight).toEqual({
      none: '1',
      tight: '1.2',
      snug: '1.3',
      normal: '1.4',
    })
  })

  it('should define font sizes as arrays of two pixel values', () => {
    const fontSizes = config.theme?.fontSize
    Object.entries(fontSizes as unknown as string[][]).forEach(([_, value]) => {
      expect(Array.isArray(value)).toBe(true)
      expect(value).toHaveLength(2)
      value.forEach((v) => {
        expect(typeof v).toBe('string')
        expect(v).toMatch(/\d+px/)
      })
    })
  })

  it('should define fontFamily and fontWeight correctly', () => {
    expect(config.theme).toBeDefined()
    expect(config.theme?.fontFamily).toBeDefined()

    // @ts-expect-error We know it's there, we just checked.
    expect(Object.keys(config.theme!.fontFamily)).toContain('sans')

    // @ts-expect-error We know it's there, we just checked.
    expect(config.theme!.fontFamily!.sans).toEqual([
      'Inter',
      'Inter Fallback',
      'Helvetica Neue',
      'Helvetica',
      'Arial',
      'sans-serif',
    ])
    expect(config.theme!.fontWeight).toEqual({
      normal: '400',
      medium: '500',
      bold: '700',
    })
  })

  it('should define borderRadius values correctly', () => {
    expect(config.theme?.borderRadius).toEqual({
      none: '0px',
      full: '9999px',
      large: '10px',
      DEFAULT: '4px',
    })
  })

  it('should define basic colors correctly', () => {
    const colors = config.theme?.colors
    expect(colors).toHaveProperty('white', '#ffffff')
    expect(colors).toHaveProperty('current', 'currentColor')
    expect(colors).toHaveProperty('transparent', 'transparent')
    expect(colors).toHaveProperty('body', 'black')
  })

  it('should define a primary color configuration with keys 50-900 following the expected format', () => {
    expect(config.theme).toBeDefined()
    expect(config.theme?.colors).toBeDefined()

    // @ts-expect-error We know it's there, we just checked.
    const primary = config.theme!.colors!.primary
    expect(primary).toBeDefined()
    for (const key of ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']) {
      expect(primary).toHaveProperty(key)
      // Expect a value like: rgb(var(--color-primary-XXX) / <alpha-value>)
      expect(primary[key]).toMatch(/^rgb\(var\(--color-primary-\d{1,3}\) \/ <alpha-value>\)$/)
    }
  })

  it('should have customContent with values enclosed in double quotes', () => {
    const customContent = config.theme?.customContent
    Object.entries(customContent as unknown as string[]).forEach(([_, value]) => {
      expect(typeof value).toBe('string')
      expect(value.startsWith('"')).toBe(true)
      expect(value.endsWith('"')).toBe(true)
    })
  })
})

describe('animations and Keyframes - Detailed Tests', () => {
  it('should define keyframes correctly', () => {
    const keyframes = config.theme?.extend?.keyframes
    expect(keyframes).toHaveProperty('jump-x')
    expect(keyframes).toHaveProperty('jump-y')
    expect(keyframes).toHaveProperty('jump-x-reverse')
    expect(keyframes).toHaveProperty('jump-xy')
    expect(keyframes).toHaveProperty('jump-scale')
    expect(keyframes).toHaveProperty('wiggle')
    expect(keyframes).toHaveProperty('rotate')

    // @ts-expect-error We know it's there, we just checked.
    expect(keyframes['jump-x']).toEqual({
      '0%': { transform: 'translateX(0)' },
      '20%': { transform: 'translateX(0.15em)' },
      '60%': { transform: 'translateX(-0.15em)' },
      '100%': { transform: 'translateX(0)' },
    })
  })

  it('should have animation definitions that include a duration and easing', () => {
    const animations = config.theme?.extend?.animation
    Object.entries(animations as unknown as string[]).forEach(([_, value]) => {
      expect(typeof value).toBe('string')
      expect(value).toContain('var(--animation-duration')
      // Check that the animation string contains an easing function (e.g. ease-in-out or linear)
      const hasEasing = value.includes('ease-in-out') || value.includes('linear')
      expect(hasEasing).toBe(true)
    })
  })
})

describe('content Dependencies - Detailed Tests', () => {
  it('should include file patterns with proper file endings', () => {
    const content = config.content as string[]
    // The first entry is expected to be a glob pattern like: ./*.{html,js,ts,jsx,tsx,...}
    expect(content[0]).toMatch(/\.\/\*\.\{.+\}$/)
    // Check that each glob pattern has a part for files (e.g., "**/*.")
    content.forEach((entry) => {
      expect(entry).toMatch(/(\*\*\/\*\.\{.*\})|(\.\/\*\.\{.*\})/)
    })
  })
})

describe('plugins - Detailed Tests', () => {
  // Our configuration defines two plugins.
  const [{ handler: variantPlugin }, { handler: utilityPlugin }] = config.plugins as { handler: PluginCreator, config: undefined }[]

  it('should register expected variants in the variant plugin', () => {
    const variantCalls: Array<{ name: string, value: string }> = []
    const fakeContext = {
      addVariant: (name: string, value: string) => {
        variantCalls.push({ name, value })
      },
    } as PluginAPI

    variantPlugin(fakeContext)

    expect(variantCalls).toContainEqual({
      name: 'mobile-only',
      value: '@media screen and (max-width: theme(\'screens.md\'))',
    })
    expect(variantCalls).toContainEqual({
      name: 'not-last',
      value: '&:not(:last-child)',
    })
    expect(variantCalls).toContainEqual({
      name: 'not-first',
      value: '&:not(:first-child)',
    })
  })

  it('should register expected utilities in the utility plugin', () => {
    const utilityCalls: Array<{ utilities: Record<string, any>, options: any }> = []
    const fakeContext: PluginAPI = {
      matchUtilities: (utilities: Record<string, any>, options: any) => {
        utilityCalls.push({ utilities, options })
      },
      theme: (key: string) => {
        if (key === 'rotate')
          return { 45: '45deg', 90: '90deg' }
        if (key === 'transitionDuration')
          return { 300: '300ms' }
        if (key === 'customContent')
          return config.theme?.customContent
        return {}
      },
    } as PluginAPI

    utilityPlugin(fakeContext)
    // Expect three calls to matchUtilities:
    // 1. For 'animation-rotation'
    const rotationCall = utilityCalls.find(call => Object.prototype.hasOwnProperty.call(call.utilities, 'animation-rotation'))
    expect(rotationCall).toBeDefined()
    expect(rotationCall?.options).toEqual({ values: { 45: '45deg', 90: '90deg' }, type: 'any' })

    // 2. For 'animation-duration'
    const durationCall = utilityCalls.find(call => Object.prototype.hasOwnProperty.call(call.utilities, 'animation-duration'))
    expect(durationCall).toBeDefined()
    expect(durationCall?.options).toEqual({ values: { 300: '300ms' }, type: 'any' })

    // 3. For 'content'
    const contentCall = utilityCalls.find(call => Object.prototype.hasOwnProperty.call(call.utilities, 'content'))
    expect(contentCall).toBeDefined()
    expect(contentCall?.options).toEqual({ values: config.theme?.customContent })

    // Additionally, test the function for 'content'
    const contentFn = contentCall!.utilities.content
    const result = contentFn('"test"')
    expect(result).toEqual({
      content: ['"test"', '"test" / ""'],
    })
  })
})
