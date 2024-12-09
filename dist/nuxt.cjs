"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/nuxt.ts
var nuxt_exports = {};
__export(nuxt_exports, {
  default: () => nuxt_default
});
module.exports = __toCommonJS(nuxt_exports);
var import_kit = require("@nuxt/kit");

// src/vite.ts
var import_unplugin2 = require("unplugin");

// src/index.ts
var import_node_fs = __toESM(require("fs"), 1);
var import_node_path = __toESM(require("path"), 1);
var import_node_url = require("url");
var import_lodash = __toESM(require("lodash.merge"), 1);
var import_postcss_load_config = __toESM(require("postcss-load-config"), 1);
var import_unplugin = require("unplugin");
var import_unplugin_icons = __toESM(require("unplugin-icons"), 1);
var import_loaders = require("unplugin-icons/loaders");
var import_meta = {};
var dirname;
try {
  dirname = __dirname;
} catch (_) {
  const filename = (0, import_node_url.fileURLToPath)(import_meta.url);
  dirname = import_node_path.default.dirname(filename);
}
var ICON_PATH_ALIAS = "@kanton-basel-stadt/designsystem/icons/symbol";
var ICON_PATH = "~icons/symbol";
var ASSETS_PATH = import_node_path.default.resolve(`${dirname}/assets/`);
var CONFIGS_PATH = import_node_path.default.resolve(`${dirname}/configs/`);
var unpluginIconsConfig = {
  customCollections: {
    symbol: (0, import_loaders.FileSystemIconLoader)(`${ASSETS_PATH}/symbols`)
  },
  compiler: "web-components",
  webComponents: {
    autoDefine: true
  }
};
var builtUnpluginIcons = import_unplugin_icons.default;
if ("default" in import_unplugin_icons.default)
  builtUnpluginIcons = import_unplugin_icons.default.default;
var postcssConfig = (0, import_postcss_load_config.default)({}, CONFIGS_PATH);
var unpluginFactory = (options, meta) => {
  if (options === void 0)
    options = {};
  function transform(code) {
    return code.replace(new RegExp(ICON_PATH_ALIAS, "g"), ICON_PATH).replace(/(['"(])@kanton-basel-stadt\/designsystem(?!\/icons\/symbol)((?:\/[\w\-.]*)*)(['")])/g, `$1${dirname}$2$3`).replace(/dist\/dist/g, "dist").replace(/@@kanton-basel-stadt/g, "@kanton-basel-stadt");
  }
  function transformPotentialIconId(id) {
    return id.replace(ICON_PATH_ALIAS, ICON_PATH);
  }
  const mergedUnpluginIconsConfig = (0, import_lodash.default)(unpluginIconsConfig, options.iconOptions);
  if (mergedUnpluginIconsConfig.compiler !== "web-components") {
    delete mergedUnpluginIconsConfig.webComponents;
  }
  const usableUnpluginIcons = builtUnpluginIcons.raw(mergedUnpluginIconsConfig, meta);
  return [
    {
      name: "@kanton-basel-stadt/designsystem/transform-ids",
      enforce: "pre",
      transform,
      esbuild: {
        onLoadFilter: /\.(?!woff2?$)[^.]+$/i
      },
      vite: {
        config(config) {
          return {
            optimizeDeps: {
              exclude: ["@kanton-basel-stadt/designsystem/dist/configs/icons-index"]
            }
          };
        }
      }
    },
    {
      ...usableUnpluginIcons,
      resolveId(id) {
        return usableUnpluginIcons.resolveId(transformPotentialIconId(id));
      },
      loadInclude(id) {
        return usableUnpluginIcons.loadInclude(transformPotentialIconId(id));
      },
      // @ts-ignore
      async load(id) {
        return await usableUnpluginIcons.load(transformPotentialIconId(id));
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
            const contents = transform(import_node_fs.default.readFileSync(args.path, "utf-8"));
            const postcss = require("postcss");
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
          const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
          const url = require("postcss-url");
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
        config() {
          return {
            css: {
              postcss: CONFIGS_PATH
            }
          };
        }
      }
    }
  ];
};

// src/vite.ts
var vite_default = (0, import_unplugin2.createVitePlugin)(unpluginFactory);

// src/webpack.ts
var import_unplugin3 = require("unplugin");
var webpack_default = (0, import_unplugin3.createWebpackPlugin)(unpluginFactory);

// src/nuxt.ts
var import_schema = require("@nuxt/schema");
var nuxt_default = (0, import_kit.defineNuxtModule)({
  meta: {
    name: "@kanton-basel-stadt/designsystem",
    configKey: "kantonBsDesignSystem"
  },
  defaults: {
    // ...default options
  },
  setup(options, _nuxt) {
    (0, import_kit.addVitePlugin)(() => vite_default(options));
    (0, import_kit.addWebpackPlugin)(() => webpack_default(options));
  }
});
exports.default = module.exports;