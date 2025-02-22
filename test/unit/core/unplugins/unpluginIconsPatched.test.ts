import unpluginIcons from 'unplugin-icons'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { beforeEach, expect, it, vi } from 'vitest'
import { getUnpluginIconsPatchedUnplugin } from '../../../../src/core/unplugins/unpluginIconsPatched.ts'

beforeEach(() => {
  vi.mock('../../../../src/core/utils/getDirName.ts', () => ({
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

  const mockedCustomIconLoader = async (_: string) => Promise.resolve('some mocked path')

  const mockedSomeFunction = vi.mocked(FileSystemIconLoader, true)

  mockedSomeFunction.mockReturnValue(mockedCustomIconLoader)

  const transformIdsUnplugin = getUnpluginIconsPatchedUnplugin({}, { framework: 'vite' })

  expect(transformIdsUnplugin.name).toBe('unplugin-icons-patched')
  expect(transformIdsUnplugin.enforce).toBe('pre')

  expect(mockedSomeFunction).toHaveBeenCalledOnce()
  expect(mockedSomeFunction).toHaveBeenCalledWith(
    process.platform === 'win32' ? 'D:\\foo\\bar\\assets/symbols' : '/foo/bar/assets/symbols',
    expect.any(Function),
  )

  const passedCallback = mockedSomeFunction.mock.calls[0][1]

  expect(passedCallback).toBeDefined()

  const exampleSvgToOptimize = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="" viewBox="0 0 20 20">
      <!-- Some comment --><path stroke="currentColor" d="m0 0 L 1 1"/>
    </svg>`
  const expectedOptimizedSvg = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" d="m0 0 L 1 1"/></svg>'

  // Test would fail earlier if it wasn't defined, so we imply definition.
  expect(passedCallback!(exampleSvgToOptimize)).toEqual(expectedOptimizedSvg)

  expect(rawSpy).toHaveBeenCalledWith({
    compiler: 'web-components',
    customCollections: {
      symbol: mockedCustomIconLoader,
    },
    webComponents: {
      autoDefine: true,
    },
  }, {
    framework: 'vite',
  })
})
