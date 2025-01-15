// vite.config.ts
import KantonBSDesignsystemPlugin from '@kanton-basel-stadt/designsystem/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    KantonBSDesignsystemPlugin({
      tailwindOptions: {
        config: {
          content: [
            './some-path/**/*.html',
          ],
        },
      },
    }),
  ],
  server: {
    fs: {
      strict: false,
    },
  },
})
