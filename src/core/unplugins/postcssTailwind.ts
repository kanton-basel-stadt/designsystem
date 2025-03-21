import type { UnpluginOptions } from 'unplugin'
import type { Options } from '../../types.ts'
import fs from 'node:fs'
import path from 'node:path'
import { getConfigsPath } from '../utils/getConfigsPath.ts'
import { getPostcssConfig } from '../utils/getPostcssConfig.ts'
import { transformIdsInCode } from '../utils/transformIdsInCode.ts'

export function getPostcssTailwindUnplugin(options: Options): UnpluginOptions {
  const postcssConfig = getPostcssConfig(getConfigsPath(), options.tailwindOptions?.config)

  return {
    name: '@kanton-basel-stadt/designsystem/postcss-tailwind',

    esbuild: {
      async setup(build) {
        build.onLoad({ filter: /\.woff2?$/i }, () => {
          return { loader: 'copy' }
        })

        const postcss = (await import('postcss')).default

        const loadedPostcss = (await postcssConfig)
        const postcssInstance = postcss(loadedPostcss.plugins)

        build.onLoad({ filter: /\.css$/i }, async (args) => {
          const code = fs.readFileSync(args.path, 'utf-8')
          const transformed = transformIdsInCode(code, args.path)

          const processed = await postcssInstance.process(transformed ? transformed.code : code, {
            from: args.path,
            to: options.tailwindOptions?.targetDir || 'dist',
            map: {
              absolute: true,
              from: args.path,
            },
          })

          return { contents: processed.content, loader: 'css' }
        })
      },
    },

    webpack(compiler) {
      compiler.hooks.beforeRun.tapPromise('@kanton-basel-stadt/designsystem', async (params) => {
        let initialLoader: string | { loader: string, options: object } = 'style-loader'

        // For webpack, we only need to register the appropriate loaders.
        if (params.options.mode === 'production') {
          // Using `require` to avoid having the plugin as a hard dependency of this unplugin.
          const MiniCssExtractPlugin = (await import('mini-css-extract-plugin')).default

          new MiniCssExtractPlugin({
            filename: 'app.css',
          }).apply(params)

          initialLoader = {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../', // adjust based on where fonts are output relative to your CSS
            },
          }
        }

        const postcssConfigLoaded = await postcssConfig

        const cssLoaders = [
          initialLoader,
          {
            loader: 'css-loader',
            options: {
              url: true,
              modules: false,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: postcssConfigLoaded.plugins,
                to: options.tailwindOptions?.targetDir || 'dist',
                modules: false,
              },
            },
          },
        ]

        params.options.module.rules.push({
          test: /\.css$/,
          use: cssLoaders,
        })

        params.options.module.rules.unshift({
          test: /\.(woff2?)$/i,
          type: 'asset/resource',
        })
      })
    },

    rollup: {
      async options(rollupOptions) {
        // Use dynamic import hre to avoid having the plugin as a hard dependency of this unplugin.
        const postcss = (await import('rollup-plugin-postcss')).default
        const urlCopy = (await import('postcss-url-copy')).default

        if (!rollupOptions.plugins) {
          rollupOptions.plugins = []
        }

        const fullTargetDir = path.resolve(options.tailwindOptions?.targetDir || 'dist')

        const plugins = [
          ...(await postcssConfig).plugins,
          urlCopy({
            destPath: fullTargetDir,
            assetsDestPath: `${fullTargetDir}${path.sep}assets`,
            transformUrlBeforeLoad(url: string) {
              return url.replace(/@kanton-basel-stadt\/designsystem\//g, `.${path.sep}node_modules${path.sep}@kanton-basel-stadt${path.sep}designsystem${path.sep}dist${path.sep}`)
            },
            transformUrlBeforeWrite(url: string) {
              return url.replace(fullTargetDir, '.')
            },
          }),
        ]

        if (Array.isArray(rollupOptions.plugins)) {
          rollupOptions.plugins.unshift(postcss({
            extract: true,
            modules: false,
            to: options.tailwindOptions?.targetDir || 'dist/',
            plugins,
          }))
        }

        return rollupOptions
      },
    },

    vite: {
      async config() {
        return {
          css: {
            postcss: await postcssConfig,
          },
        }
      },
    },
  }
}
