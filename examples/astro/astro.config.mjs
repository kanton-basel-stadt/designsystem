import { defineConfig } from 'astro/config'
import KantonBSDesignsystemPlugin from '@kanton-basel-stadt/designsystem/astro'

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
