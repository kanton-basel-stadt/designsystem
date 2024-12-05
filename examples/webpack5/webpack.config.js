const path = require('node:path')

const kantonbs = require('@kanton-basel-stadt/designsystem/webpack').default({ /* options */ })

module.exports = {
  mode: 'production',
  entry: [
    './src/index.js',
    './src/index.css',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    kantonbs,
  ],
}
