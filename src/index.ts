/* We want to group them semantically. */
/* eslint-disable import/order */

/* We need to be able to use `require()` */
/* eslint-disable ts/no-var-requires */
/* eslint-disable ts/no-require-imports */

// System dependencies
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import merge from 'lodash.merge'

// unplugin dependencies
import type { UnpluginFactory, UnpluginInstance, UnpluginOptions } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { Options } from './types'

// PostCSS's dependencies
import postcssrc from 'postcss-load-config'

// Unplugin-icons dependencies
import unpluginIcons from 'unplugin-icons'
import type { Options as UnpluginIconsOptions } from 'unplugin-icons'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

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

const postcssConfig = postcssrc({}, CONFIGS_PATH)

export const unpluginFactory: UnpluginFactory<Options> = (options, meta): Array<UnpluginOptions> => {
  if (options === undefined)
    options = {}

  function transform(code: string) {
    return code
      .replace(ICON_PATH_ALIAS, `$1${ICON_PATH}`)
      .replace(MODULE_ALIAS, `$1${MODULE_PATH}`)
      .replace(/dist\/dist/g, 'dist')
      // This is purely for the docs, otherwise Storybook has the actual file paths in the code examples, which we don't want.
      .replace(/@@kanton-basel-stadt/g, '@kanton-basel-stadt')
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
        async setup(build) {
          build.onLoad({ filter: /\.woff2?$/i }, () => {
            return { loader: 'copy' }
          })

          build.onLoad({ filter: /\.css$/i }, async (args) => {
            const contents = transform(fs.readFileSync(args.path, 'utf-8'))

            const postcss = require('postcss')
            const loadedPostcss = (await postcssConfig)
            const postcssInstance = postcss(loadedPostcss.plugins)

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
          // Using `require` to avoid having the plugin as a hard dependency of this unplugin.
          const MiniCssExtractPlugin = require('mini-css-extract-plugin')

          // For webpack, we only need to register the appropriate loaders.
          if (compiler.options.mode === 'production') {
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
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: postcssConfigLoaded.plugins
                  }
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

          if (!rollupOptions.plugins)
            rollupOptions.plugins = []

          const url = require('postcss-url')

          const plugins = [
            ...(await postcssConfig).plugins,
            url({
              targets: [
                { src: ASSETS_PATH, dest: options.tailwindOptions?.targetDir || 'dist' }
              ]
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
        config(config) {
          if (!config.css) {
            config.css = {}
          }

          config.css.postcss = CONFIGS_PATH
        },
      },
    },
  ]
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
