import { expect, it } from 'vitest'
import { getTransformIdsUnplugin } from '../../../src/core/unplugins/transformIds.ts'
import { transformIdsInCode } from '../../../src/core/utils/transformIdsInCode.ts'

it('sets up a correct unplugin with configs', () => {
  const transformIdsUnplugin = getTransformIdsUnplugin()

  expect(transformIdsUnplugin.name).toBe('@kanton-basel-stadt/designsystem/transform-ids')
  expect(transformIdsUnplugin.enforce).toBe('pre')
  expect(transformIdsUnplugin.transform).toStrictEqual(transformIdsInCode)
  expect(transformIdsUnplugin.esbuild).toStrictEqual({
    onLoadFilter: /\.(?!woff2?$)[^.]+$/i,
  })

  expect(transformIdsUnplugin.vite).toBeDefined()

  // @ts-expect-error We're testing exactly that.
  expect(transformIdsUnplugin.vite.config).toBeDefined()

  // @ts-expect-error We know the vite config function is around, we just tested for it.
  expect(transformIdsUnplugin.vite.config()).toStrictEqual({
    optimizeDeps: {
      exclude: ['@kanton-basel-stadt/designsystem/dist/configs/icons-index'],
    },
  })
})
