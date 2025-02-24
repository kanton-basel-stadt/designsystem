import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { expect, it } from 'vitest'
import { getDirName } from '../../../../src/core/utils/getDirName.ts'

it('returns the correct path', () => {
  const gottenDirName = getDirName()
  const srcDirName = path.dirname(fileURLToPath(import.meta.url)).replace(`test${path.sep}unit`, 'src')

  expect(gottenDirName).toBe(srcDirName)
})
