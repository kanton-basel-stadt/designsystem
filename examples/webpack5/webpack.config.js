const path = require('path');

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
    require('@kanton-basel-stadt/designsystem/webpack').default({ /* options */ })
  ],
};
