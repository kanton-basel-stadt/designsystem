import type { UnpluginOptions } from 'unplugin'
import { transformIdsInCode } from '../utils/transformIdsInCode'

export function getTransformIdsUnplugin(): UnpluginOptions {
  return {
    name: '@kanton-basel-stadt/designsystem/transform-ids',
    enforce: 'pre',
    transform: transformIdsInCode,
    esbuild: {
      onLoadFilter: /\.(?!woff2?$)[^.]+$/i,
    },
    vite: {
      config() {
        return {
          optimizeDeps: {
            exclude: ['@kanton-basel-stadt/designsystem/dist/configs/icons-index'],
          },
        }
      },
    },
  }
}