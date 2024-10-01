#!/bin/bash

echo ":: TESTING ASTRO"
cd astro
npm ci
npm run build

echo "---------------------------------------------------------------------"

echo ":: TESTING ESBUILD"
cd ../esbuild
npm ci
npm run build

echo "---------------------------------------------------------------------"

echo ":: TESTING NUXT"
cd ../esbuild
npm ci
npm run build

echo "---------------------------------------------------------------------"

echo ":: TESTING ROLLUP"
cd ../rollup
npm ci
npm run build

echo "---------------------------------------------------------------------"

echo ":: TESTING VITE VANILLA"
cd ../vite-vanilla
npm ci
npm run build

echo "---------------------------------------------------------------------"

echo ":: TESTING WEBPACK"
cd ../webpack5
npm ci
npm run build

echo "If you saw no error, this means it's working for all supported build tools!"
