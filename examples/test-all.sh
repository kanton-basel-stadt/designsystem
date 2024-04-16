#!/bin/bash

echo ":: TESTING ASTRO"
cd astro
npm run build

echo "---------------------------------------------------------------------"

echo ":: TESTING ESBUILD"
cd ../esbuild
npm run build

echo "---------------------------------------------------------------------"

echo ":: TESTING NUXT"
cd ../esbuild
npm run build

echo "---------------------------------------------------------------------"

echo ":: TESTING ROLLUP"
cd ../rollup
npm run build

echo "---------------------------------------------------------------------"

echo ":: TESTING VITE VANILLA"
cd ../vite-vanilla
npm run build

echo "---------------------------------------------------------------------"

echo ":: TESTING WEBPACK"
cd ../webpack5
npm run build

echo "If you saw no error, this means it's working for all supported build tools!"
