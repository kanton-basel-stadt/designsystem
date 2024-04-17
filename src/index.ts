/* We want to group them semantically. */
/* eslint-disable import/order */

/* We need to be able to use `require()` */
/* eslint-disable ts/no-var-requires */
/* eslint-disable ts/no-require-imports */

// System dependencies
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import merge from 'lodash.merge'

// unplugin dependencies
import type { UnpluginFactory, UnpluginInstance, UnpluginOptions } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { Options } from './types'

// PostCSS's dependencies
// @ts-expect-error Because this _has_ to be a mjs file.
import postcssConfig from './core/configs/postcss.config.mjs'
import tailwindConfig from './core/configs/tailwind.config'
import postcss from 'postcss'

// Different unplugins for icons, webfonts, etc. and general unplugin-icons dependencies
import unpluginIcons from 'unplugin-icons'
import type { Options as UnpluginIconsOptions } from 'unplugin-icons'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import fs from 'node:fs'

// CJS vs TS stuff
let dirname
try {
  dirname = __dirname
}
catch (_) {
  const filename = fileURLToPath(import.meta.url)
  dirname = path.dirname(filename)
}

// All kinds of constants
const MODULE_PATH = dirname
const MODULE_ALIAS = /(['"(])@kanton-basel-stadt\/designsystem/g

const ICON_PATH_ALIAS = /(['"(])@kanton-basel-stadt\/designsystem\/icons\/symbol/g
const ICON_PATH = '~icons/symbol'

const ASSETS_PATH = path.resolve(`${dirname}/assets/`)
const CONFIGS_PATH = path.resolve(`${dirname}/configs/`)

const unpluginIconsConfig: UnpluginIconsOptions = {
  customCollections: {
    symbol: FileSystemIconLoader(`${ASSETS_PATH}/symbols`),
  },
  compiler: 'web-components',
  webComponents: {
    autoDefine: true,
  },
}

let builtUnpluginIcons: UnpluginInstance<UnpluginIconsOptions | undefined, boolean> & { raw: { name: string } } = unpluginIcons
if ('default' in unpluginIcons)
  builtUnpluginIcons = unpluginIcons.default as UnpluginInstance<UnpluginIconsOptions | undefined, boolean> & { raw: { name: string } }

export const unpluginFactory: UnpluginFactory<Options> = (options, meta): Array<UnpluginOptions> => {
  if (options === undefined)
    options = {}

  function transform(code: string) {
    return code
      .replace(ICON_PATH_ALIAS, `$1${ICON_PATH}`)
      .replace(MODULE_ALIAS, `$1${MODULE_PATH}`)
      .replace(/dist\/dist/g, 'dist')
  }

  // If the selected icon compiler _isn't_ web-components, there's no need to specify config for it.
  const mergedUnpluginIconsConfig = merge(unpluginIconsConfig, options.iconOptions)
  if (mergedUnpluginIconsConfig.compiler !== 'web-components')
    delete mergedUnpluginIconsConfig.webComponents

  return [
    builtUnpluginIcons.raw(mergedUnpluginIconsConfig, meta) as UnpluginOptions,
    {
      name: '@kanton-basel-stadt/designsystem/transform-ids',
      enforce: 'pre',
      transform,
      esbuild: {
        onLoadFilter: /\.(?!woff|woff2$)[^.]+$/i,
      },
    },
    {
      name: '@kanton-basel-stadt/designsystem/postcss-tailwind',
      esbuild: {
        setup(build) {
          build.onLoad({ filter: /\.woff2?$/i }, () => {
            return { loader: 'copy' }
          })

          build.onLoad({ filter: /\.css$/i }, async (args) => {
            const contents = transform(fs.readFileSync(args.path, 'utf-8'))

            const postcssImport = require('postcss-import')
            const postcssMixins = require('postcss-mixins')
            const tailwindNesting = require('tailwindcss/nesting')
            const tailwindcss = require('tailwindcss')
            const postcssHexRgba = require('postcss-hexrgba')
            const cssnano = require('cssnano')

            const postcssInstance = postcss([
              postcssImport(),
              postcssMixins(),
              tailwindNesting(),
              tailwindcss({
                config: tailwindConfig,
              }),
              postcssHexRgba({
                colorFunctionNotation: 'modern',
                transformToBareValue: true,
              }),
              cssnano({
                preset: 'default',
              }),
            ])

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
        // Using `require` to avoid having the plugin as a hard dependency of this unplugin.
        const MiniCssExtractPlugin = require('mini-css-extract-plugin')

        // For webpack, we only need to register the appropriate loaders.
        if (compiler.options.mode === 'production') {
          new MiniCssExtractPlugin({
            filename: 'app.css',
          }).apply(compiler)
        }

        compiler.options.module.rules.unshift({
          test(value) {
            return value.endsWith('.css')
          },
          use: [
            compiler.options.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: postcssConfig,
              },
            },
          ],
        })
      },

      rollup: {
        async options(rollupOptions) {
          // Use dynamic import hre to avoid having the plugin as a hard dependency of this unplugin.
          const postcss = (await import('rollup-plugin-postcss')).default

          if (!rollupOptions.plugins)
            rollupOptions.plugins = []

          const postcssImport = require('postcss-import')
          const postcssMixins = require('postcss-mixins')
          const tailwindNesting = require('tailwindcss/nesting')
          const tailwindcss = require('tailwindcss')
          const postcssHexRgba = require('postcss-hexrgba')
          const cssnano = require('cssnano')
          const url = require('postcss-url')

          const plugins = [
            postcssImport(),
            postcssMixins(),
            tailwindNesting(),
            tailwindcss({
              config: tailwindConfig,
            }),
            postcssHexRgba({
              colorFunctionNotation: 'modern',
              transformToBareValue: true,
            }),
            cssnano({
              preset: 'default',
            }),
            url({
              url: 'copy',
              basePath: path.resolve(`${ASSETS_PATH}/../../../../`),
              assetsPath: options.tailwindOptions?.targetDir || 'dist',
              useHash: true,
              maxSize: Number.POSITIVE_INFINITY,
            }),
          ]

          if (Array.isArray(rollupOptions.plugins)) {
            rollupOptions.plugins.unshift(postcss({
              to: options.tailwindOptions?.targetDir || 'dist',
              plugins,
            }))
          }

          return rollupOptions
        },
      },

      vite: {
        config(config) {
          if (!config.css)
            config.css = {}

          config.css.postcss = CONFIGS_PATH
        },
      },
    },
  ]
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
