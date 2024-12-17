import { beforeEach, expect, it, vi } from 'vitest'
import { getConfigsPath } from '../../../src/core/utils/getConfigsPath.ts'

beforeEach(() => {
  vi.mock('../../../src/core/utils/getDirName.ts', () => {
    return { getDirName: () => '/foo/bar' }
  })
})

it('returns the correct path', () => {
  const gottenConfigsPath = getConfigsPath()
  const srcDirName = '/foo/bar/configs'

  expect(gottenConfigsPath).toBe(srcDirName)
})
