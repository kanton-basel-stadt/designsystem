import KantonBSDesignsystemPlugin from '@kanton-basel-stadt/designsystem/astro'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [
    KantonBSDesignsystemPlugin({
      iconOptions: {
        compiler: 'astro',
      },
    }),
  ],
})
