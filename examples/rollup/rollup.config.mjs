import KantonBSDesignsystemPlugin from '@kanton-basel-stadt/designsystem/dist/rollup.cjs';

export default {
  input: 'main.js',
  output: { format: 'es', file: 'dist/bundle.js' },
  plugins: [
    KantonBSDesignsystemPlugin.default({
      tailwindOptions: {
        targetDir: process.cwd() + '/dist'
      }
    }),
  ],
};
