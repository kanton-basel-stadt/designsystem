/* eslint-disable ts/no-require-imports */

import type { UnpluginOptions } from 'unplugin'
import type { Options } from '../../types.ts'
import fs from 'node:fs'
import postcssrc from 'postcss-load-config'
import { getAssetsPath } from '../utils/getAssetsPath.ts'
import { getConfigsPath } from '../utils/getConfigsPath.ts'
import { transformIdsInCode } from '../utils/transformIdsInCode.ts'

export function getPostcssTailwindUnplugin(options: Options): UnpluginOptions {
  const postcssConfig = postcssrc({}, getConfigsPath())

  return {
    name: '@kanton-basel-stadt/designsystem/postcss-tailwind',

    esbuild: {
      async setup(build) {
        build.onLoad({ filter: /\.woff2?$/i }, () => {
          return { loader: 'copy' }
        })

        const postcss = require('postcss')

        const loadedPostcss = (await postcssConfig)
        const postcssInstance = postcss({
          plugins: loadedPostcss.plugins,
          to: options.tailwindOptions?.targetDir || 'dist',
          extract: true,
          modules: false,
        })

        build.onLoad({ filter: /\.css$/i }, async (args) => {
          const contents = transformIdsInCode(fs.readFileSync(args.path, 'utf-8'))

          const transformed = await postcssInstance.process(contents, {
            from: args.path,
            map: {
              absolute: true,
              from: args.path,
            },
          })

          return { contents: transformed.content, loader: 'css' }
        })
      },
    },

    webpack(compiler) {
      compiler.hooks.beforeRun.tapPromise('@kanton-basel-stadt/designsystem', async (params) => {
        let MiniCssExtractPlugin

        // For webpack, we only need to register the appropriate loaders.
        if (params.options.mode === 'production') {
          // Using `require` to avoid having the plugin as a hard dependency of this unplugin.
          MiniCssExtractPlugin = require('mini-css-extract-plugin')

          new MiniCssExtractPlugin({
            filename: 'app.css',
          }).apply(params)
        }

        const postcssConfigLoaded = await postcssConfig

        params.options.module.rules.unshift({
          test(value) {
            return value.endsWith('.css')
          },
          use: [
            params.options.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                url: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: postcssConfigLoaded.plugins,
                  to: options.tailwindOptions?.targetDir || 'dist',
                  extract: true,
                  modules: false,
                },
              },
            },
          ],
        })
      })
    },

    rollup: {
      async options(rollupOptions) {
        // Use dynamic import hre to avoid having the plugin as a hard dependency of this unplugin.
        const postcss = (await import('rollup-plugin-postcss')).default
        const url = (await import('postcss-url')).default

        if (!rollupOptions.plugins)
          rollupOptions.plugins = []

        // const url = require('postcss-url')

        const plugins = [
          ...(await postcssConfig).plugins,
          url({
            url: 'copy',
            basePath: getAssetsPath(),
            assetsPath: options.tailwindOptions?.targetDir || 'dist',
          }),
        ]

        if (Array.isArray(rollupOptions.plugins)) {
          rollupOptions.plugins.unshift(postcss({
            extract: true,
            modules: false,
            to: options.tailwindOptions?.targetDir || 'dist',
            plugins,
          }))
        }

        return rollupOptions
      },
    },

    vite: {
      config() {
        return {
          css: {
            postcss: getConfigsPath(),
          },
        }
      },
    },
  }
}
