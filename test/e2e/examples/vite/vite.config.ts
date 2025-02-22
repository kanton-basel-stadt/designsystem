import path from 'node:path'
import KantonBSDesignsystemPlugin from '@kanton-basel-stadt/designsystem/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    KantonBSDesignsystemPlugin({
      tailwindOptions: {
        targetDir: `${path.resolve(import.meta.dirname, 'dist')}/`,
      },
    }),
  ],
  server: {
    fs: {
      strict: false,
    },
  },
})
