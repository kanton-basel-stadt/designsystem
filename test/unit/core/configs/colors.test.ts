import { expect, it } from 'vitest'
import colors from '../../../../src/core/configs/colors.ts'

it('has all colors', () => {
  const colorKeys = Object.keys(colors)

  expect(colorKeys).toContain('green')
  expect(colorKeys).toContain('blue')
  expect(colorKeys).toContain('purple')
  expect(colorKeys).toContain('red')
  expect(colorKeys).toContain('gray')
  expect(colorKeys).toContain('brown')
  expect(colorKeys).toContain('yellow')
  expect(colorKeys).toContain('teal')
})

function getRealtiveLuminance(color: string) {
  const rgb = color.slice(1).match(/.{1,2}/g)!.map(p => Number.parseInt(p, 16))

  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
}

Object.entries(colors).forEach(([color, shades]) => {
  it(`has the correct ordering of shades for color ${color}`, () => {
    const shadeNumbers = Object.values(shades).map(getRealtiveLuminance)
    expect(shadeNumbers).toEqual(shadeNumbers.sort())
  })
})
