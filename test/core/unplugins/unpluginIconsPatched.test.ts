import unpluginIcons from 'unplugin-icons'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { beforeEach, expect, it, vi } from 'vitest'
import { getUnpluginIconsPatchedUnplugin } from '../../../src/core/unplugins/unpluginIconsPatched.ts'

beforeEach(() => {
  vi.mock('../../../src/core/utils/getDirName.ts', () => ({
    getDirName: () => '/foo/bar',
  }))

  vi.mock('unplugin-icons/loaders', {
    spy: true,
  })

  vi.mock('unplugin-icons', {
    spy: true,
  })
})

it('sets up a correct unplugin with configs based on unplugin-icons', () => {
  const rawSpy = vi.spyOn(unpluginIcons, 'raw')

  // @ts-expect-error Even though TS thinks the mockTernValue method doesn't exist, since vitest mocks it, we know it does.
  FileSystemIconLoader.mockReturnValue('some mocked path')

  const transformIdsUnplugin = getUnpluginIconsPatchedUnplugin({}, { framework: 'vite' })

  expect(transformIdsUnplugin.name).toBe('unplugin-icons-patched')
  expect(transformIdsUnplugin.enforce).toBe('pre')

  expect(FileSystemIconLoader).toHaveBeenCalledOnce()
  expect(FileSystemIconLoader).toHaveBeenCalledWith('/foo/bar/assets/symbols')
  expect(rawSpy).toHaveBeenCalledWith({
    compiler: 'web-components',
    customCollections: {
      symbol: 'some mocked path',
    },
    webComponents: {
      autoDefine: true,
    },
  }, {
    framework: 'vite',
  })
})
