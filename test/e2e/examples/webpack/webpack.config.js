const path = require('node:path')

const kantonbs = require('@kanton-basel-stadt/designsystem/webpack').default({
  tailwindOptions: {
    targetDir: 'dist',
  },
})

module.exports = {
  // stats: 'verbose',
  mode: 'production',
  entry: [
    './src/main.js',
    './src/index.css',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    kantonbs,
  ],
}
