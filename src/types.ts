import type { Config as TailwindConfig } from 'tailwindcss'
import type { Options as UnpluginIconsOptions } from 'unplugin-icons'

export interface Options {
  iconOptions?: UnpluginIconsOptions
  tailwindOptions?: {
    targetDir?: string
    config?: Partial<TailwindConfig>
    /** Use @tailwindcss/vite instead of @tailwindcss/postcss (required for Astro 7 / Vite 8). */
    useVitePlugin?: boolean
  }
}
