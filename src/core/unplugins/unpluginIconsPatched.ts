import type { UnpluginContextMeta, UnpluginInstance, UnpluginOptions } from 'unplugin'
import type { Options as UnpluginIconsOptions } from 'unplugin-icons'
import type { Options } from '../../types'
import merge from 'lodash.merge'
import unpluginIcons from 'unplugin-icons'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { getAssetsPath } from '../utils/getAssetsPath.ts'
import { transformIconId } from '../utils/transformIconId'

export function getUnpluginIconsPatchedUnplugin(options: Options, meta: UnpluginContextMeta): UnpluginOptions {
  const unpluginIconsConfig: UnpluginIconsOptions = {
    customCollections: {
      symbol: FileSystemIconLoader(`${getAssetsPath()}/symbols`),
    },
    compiler: 'web-components',
    webComponents: {
      autoDefine: true,
    },
  }

  // If the selected icon compiler _isn't_ web-components, there's no need to specify config for it.
  const mergedUnpluginIconsConfig = merge(unpluginIconsConfig, options.iconOptions)
  if (mergedUnpluginIconsConfig.compiler !== 'web-components') {
    delete mergedUnpluginIconsConfig.webComponents
  }

  let builtUnpluginIcons: UnpluginInstance<UnpluginIconsOptions | undefined, boolean> & { raw: { name: string } } = unpluginIcons
  if ('default' in unpluginIcons)
    builtUnpluginIcons = unpluginIcons.default as UnpluginInstance<UnpluginIconsOptions | undefined, boolean> & { raw: { name: string } }

  const usableUnpluginIcons = builtUnpluginIcons.raw(mergedUnpluginIconsConfig, meta) as UnpluginOptions

  return {
    ...usableUnpluginIcons,
    name: 'unplugin-icons-patched',
    resolveId(id) {
      // @ts-expect-error We know it's there.
      return usableUnpluginIcons.resolveId(transformIconId(id))
    },
    loadInclude(id: string) {
      // @ts-expect-error We know it's there.
      return usableUnpluginIcons.loadInclude(transformIconId(id))
    },
    async load(id: string) {
      // @ts-expect-error We know it's there.
      return await usableUnpluginIcons.load(transformIconId(id))
    },
  }
}
