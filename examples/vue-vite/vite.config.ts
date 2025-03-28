import { fileURLToPath, URL } from 'node:url'

import KantonBSDesignsystemPlugin from '@kanton-basel-stadt/designsystem/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    KantonBSDesignsystemPlugin({
      iconOptions: {
        compiler: 'vue3',
      },
    }),
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    fs: {
      strict: false,
    },
  },
})
