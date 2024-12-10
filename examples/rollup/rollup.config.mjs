import path from 'node:path'
import KantonBSDesignsystemPlugin from '@kanton-basel-stadt/designsystem/dist/rollup.cjs'
import copy from 'rollup-plugin-copy'

export default {
  input: 'src/main.js',
  output: { format: 'es', file: 'dist/bundle.js' },
  plugins: [
    KantonBSDesignsystemPlugin.default({
      tailwindOptions: {
        targetDir: path.resolve(import.meta.dirname, 'dist'),
      },
    }),
    copy({
      targets: [
        { src: 'src/index.html', dest: 'dist' },
      ],
    }),
  ],
}
