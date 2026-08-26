import type { Options } from './types'

import tailwindcss from '@tailwindcss/vite'
import unplugin from '.'

export default (options: Options) => ({
  name: '@kanton-basel-stadt/designsystem',
  hooks: {
    'astro:config:setup': async (astro: any) => {
      astro.config.vite.plugins ||= []
      astro.config.vite.plugins.push(
        tailwindcss(),
        unplugin.vite({
          ...options,
          tailwindOptions: {
            ...options.tailwindOptions,
            useVitePlugin: true,
          },
        }),
      )
    },
  },
})
