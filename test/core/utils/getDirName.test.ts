import { expect, it } from 'vitest'
import { getDirName } from '../../../src/core/utils/getDirName.ts'

it('returns the correct path', () => {
  const gottenDirName = getDirName()
  const srcDirName = __dirname.replace('test', 'src')

  expect(gottenDirName).toBe(srcDirName)
})
