import fs from 'node:fs'
import path from 'node:path'
import postcss from 'postcss'
import { expect, it } from 'vitest'
import { getPostcssConfig } from '../../../../src/core/utils/getPostcssConfig.ts'

it('compiles the design-system CSS with Tailwind v4', async () => {
  const cssPath = path.resolve('./src/core/assets/css/tailwind.css')
  const configPath = path.resolve('./src/core/configs')
  const { plugins } = await getPostcssConfig(configPath, undefined)
  const result = await postcss(plugins).process(fs.readFileSync(cssPath, 'utf8'), { from: cssPath })

  expect(result.css).not.toMatch(/theme\([^)]*\)/)
  expect(result.css).toContain('--max-width-prose:836px')
  expect(result.css).toContain('--color-primary-800:36 83 51')
  expect(result.css).toContain('.container{')
  expect(result.css).toContain('.button{')
  expect(result.css).not.toContain('65ch')
}, 15_000)
