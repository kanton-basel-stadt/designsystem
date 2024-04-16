#!/usr/bin/env node

"use strict";

const KantonBSDesignsystemPlugin = require('@kanton-basel-stadt/designsystem/dist/esbuild.cjs').default;
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: [
    'src/index.js',
    'src/styles.css',
  ],
  bundle: true,
  outdir: 'dist',
  plugins: [KantonBSDesignsystemPlugin()],
  loader: {
    // Necessary for the font files to work
    '.woff': 'file',
    '.woff2': 'file',
  }
});
