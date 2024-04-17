import type { Options as UnpluginIconsOptions } from 'unplugin-icons'

export interface Options {
  iconOptions?: UnpluginIconsOptions
  tailwindOptions?: {
    targetDir?: string
  }
}
