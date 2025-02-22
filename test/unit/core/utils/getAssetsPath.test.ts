import { beforeEach, expect, it, vi } from 'vitest'
import { getAssetsPath } from '../../../../src/core/utils/getAssetsPath.ts'

beforeEach(() => {
  vi.mock('../../../../src/core/utils/getDirName.ts', () => {
    return { getDirName: () => '/foo/bar' }
  })
})

it('returns the correct path', () => {
  const gottenAssetsPath = getAssetsPath()
  const srcDirName = process.platform === 'win32' ? 'D:\\foo\\bar\\assets' : '/foo/bar/assets'

  expect(gottenAssetsPath).toBe(srcDirName)
})
