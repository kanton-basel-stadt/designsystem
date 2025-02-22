import fs from 'node:fs'
import path from 'node:path'
import { expect, it } from 'vitest'
import iconIndex from '../../../../src/core/configs/icons-index.ts'

it('should contain all icons in the fs', () => {
  const icons = fs.readdirSync(
    path.resolve(import.meta.dirname, '..', '..', '..', '..', 'src', 'core', 'assets', 'symbols'),
  ).map((i: string) => i.replace(/\.svg/g, ''))

  icons.forEach((icon: string) => {
    expect(iconIndex.iconNames).toContain(icon)
  })
})
