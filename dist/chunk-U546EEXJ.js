import {
  __require
} from "./chunk-3RG5ZIWI.js";

// src/index.ts
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import merge from "lodash.merge";
import { createUnplugin } from "unplugin";
import postcssrc from "postcss-load-config";
import unpluginIcons from "unplugin-icons";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
var dirname;
try {
  dirname = __dirname;
} catch (_) {
  const filename = fileURLToPath(import.meta.url);
  dirname = path.dirname(filename);
}
var MODULE_PATH = dirname;
var MODULE_ALIAS = /(['"(])@kanton-basel-stadt\/designsystem/g;
var ICON_PATH_ALIAS = /(['"(])@kanton-basel-stadt\/designsystem\/icons\/symbol/g;
var ICON_PATH = "~icons/symbol";
var ASSETS_PATH = path.resolve(`${dirname}/assets/`);
var CONFIGS_PATH = path.resolve(`${dirname}/configs/`);
var unpluginIconsConfig = {
  customCollections: {
    symbol: FileSystemIconLoader(`${ASSETS_PATH}/symbols`)
  },
  compiler: "web-components",
  webComponents: {
    autoDefine: true
  }
};
var builtUnpluginIcons = unpluginIcons;
if ("default" in unpluginIcons)
  builtUnpluginIcons = unpluginIcons.default;
var postcssConfig = postcssrc({}, CONFIGS_PATH);
var unpluginFactory = (options, meta) => {
  if (options === void 0)
    options = {};
  function transform(code) {
    return code.replace(ICON_PATH_ALIAS, `$1${ICON_PATH}`).replace(MODULE_ALIAS, `$1${MODULE_PATH}`).replace(/dist\/dist/g, "dist").replace(/@@kanton-basel-stadt/g, "@kanton-basel-stadt");
  }
  const mergedUnpluginIconsConfig = merge(unpluginIconsConfig, options.iconOptions);
  if (mergedUnpluginIconsConfig.compiler !== "web-components")
    delete mergedUnpluginIconsConfig.webComponents;
  return [
    builtUnpluginIcons.raw(mergedUnpluginIconsConfig, meta),
    {
      name: "@kanton-basel-stadt/designsystem/transform-ids",
      enforce: "pre",
      transform,
      esbuild: {
        onLoadFilter: /\.(?!woff|woff2$)[^.]+$/i
      }
    },
    {
      name: "@kanton-basel-stadt/designsystem/postcss-tailwind",
      esbuild: {
        async setup(build) {
          build.onLoad({ filter: /\.woff2?$/i }, () => {
            return { loader: "copy" };
          });
          build.onLoad({ filter: /\.css$/i }, async (args) => {
            const contents = transform(fs.readFileSync(args.path, "utf-8"));
            const postcss = __require("postcss");
            const loadedPostcss = await postcssConfig;
            const postcssInstance = postcss(loadedPostcss.plugins);
            const transformed = await postcssInstance.process(contents, {
              from: args.path,
              map: {
                absolute: true,
                from: args.path
              }
            });
            return { contents: transformed.content, loader: "css" };
          });
        }
      },
      webpack(compiler) {
        compiler.hooks.beforeRun.tapPromise("@kanton-basel-stadt/designsystem", async (params) => {
          const MiniCssExtractPlugin = __require("mini-css-extract-plugin");
          if (compiler.options.mode === "production") {
            new MiniCssExtractPlugin({
              filename: "app.css"
            }).apply(params);
          }
          const postcssConfigLoaded = await postcssConfig;
          params.options.module.rules.unshift({
            test(value) {
              return value.endsWith(".css");
            },
            use: [
              params.options.mode === "production" ? MiniCssExtractPlugin.loader : "style-loader",
              {
                loader: "css-loader",
                options: {
                  url: true
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: postcssConfigLoaded.plugins
                  }
                }
              }
            ]
          });
        });
      },
      rollup: {
        async options(rollupOptions) {
          const postcss = (await import("rollup-plugin-postcss")).default;
          if (!rollupOptions.plugins)
            rollupOptions.plugins = [];
          const url = __require("postcss-url");
          const plugins = [
            ...(await postcssConfig).plugins,
            url({
              targets: [
                { src: ASSETS_PATH, dest: options.tailwindOptions?.targetDir || "dist" }
              ]
            })
          ];
          if (Array.isArray(rollupOptions.plugins)) {
            rollupOptions.plugins.unshift(postcss({
              extract: true,
              modules: false,
              to: options.tailwindOptions?.targetDir || "dist",
              plugins
            }));
          }
          return rollupOptions;
        }
      },
      vite: {
        config(config) {
          if (!config.css) {
            config.css = {};
          }
          config.css.postcss = CONFIGS_PATH;
        }
      }
    }
  ];
};
var unplugin = /* @__PURE__ */ createUnplugin(unpluginFactory);
var src_default = unplugin;

export {
  unpluginFactory,
  unplugin,
  src_default
};
