import type { UnpluginFactory, UnpluginOptions } from 'unplugin'
import type { Options } from './types'
import { createUnplugin } from 'unplugin'
import { getPostcssTailwindUnplugin } from './core/unplugins/postcssTailwind.ts'
import { getTransformIdsUnplugin } from './core/unplugins/transformIds.ts'
import { getUnpluginIconsPatchedUnplugin } from './core/unplugins/unpluginIconsPatched.ts'

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options, meta): Array<UnpluginOptions> => {
  if (options === undefined) {
    options = {}
  }

  return [
    getTransformIdsUnplugin(),
    getUnpluginIconsPatchedUnplugin(options, meta),
    getPostcssTailwindUnplugin(options),
  ]
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
