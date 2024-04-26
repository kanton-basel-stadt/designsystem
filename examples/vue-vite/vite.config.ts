import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import KantonBSDesignsystemPlugin from '@kanton-basel-stadt/designsystem/vite'

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
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
