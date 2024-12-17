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

// src/esbuild.ts
var esbuild_exports = {};
__export(esbuild_exports, {
  default: () => esbuild_default
});
module.exports = __toCommonJS(esbuild_exports);
var import_unplugin2 = require("unplugin");

// src/index.ts
var import_unplugin = require("unplugin");

// src/core/unplugins/postcssTailwind.ts
var import_node_fs = __toESM(require("fs"), 1);
var import_postcss_load_config = __toESM(require("postcss-load-config"), 1);

// src/core/utils/getAssetsPath.ts
var import_node_path2 = __toESM(require("path"), 1);

// src/core/utils/getDirName.ts
var import_node_path = __toESM(require("path"), 1);
var import_node_url = require("url");
var import_meta = {};
function getDirName() {
  let dirname;
  try {
    dirname = __dirname;
  } catch (_) {
    const filename = (0, import_node_url.fileURLToPath)(import_meta.url);
    dirname = import_node_path.default.dirname(filename);
  }
  return dirname;
}

// src/core/utils/getAssetsPath.ts
function getAssetsPath() {
  const dirname = getDirName();
  return import_node_path2.default.resolve(`${dirname}/assets/`);
}

// src/core/utils/getConfigsPath.ts
var import_node_path3 = __toESM(require("path"), 1);
function getConfigsPath() {
  const dirname = getDirName();
  return import_node_path3.default.resolve(`${dirname}/configs/`);
}

// src/core/utils/consts.ts
var ICON_PATH_ALIAS = "@kanton-basel-stadt/designsystem/icons/symbol";
var ICON_PATH = "~icons/symbol";

// src/core/utils/transformIdsInCode.ts
function transformIdsInCode(code) {
  const dirname = getDirName();
  return code.replace(new RegExp(ICON_PATH_ALIAS, "g"), ICON_PATH).replace(/(['"(])@kanton-basel-stadt\/designsystem(?!\/icons\/symbol)((?:\/[\w\-.]*)*)(['")])/g, `$1${dirname}$2$3`).replace(/dist\/dist/g, "dist").replace(/@@kanton-basel-stadt/g, "@kanton-basel-stadt");
}

// src/core/unplugins/postcssTailwind.ts
function getPostcssTailwindUnplugin(options) {
  const postcssConfig = (0, import_postcss_load_config.default)({}, getConfigsPath());
  return {
    name: "@kanton-basel-stadt/designsystem/postcss-tailwind",
    esbuild: {
      async setup(build) {
        build.onLoad({ filter: /\.woff2?$/i }, () => {
          return { loader: "copy" };
        });
        const postcss = require("postcss");
        const loadedPostcss = await postcssConfig;
        const postcssInstance = postcss({
          plugins: loadedPostcss.plugins,
          to: options.tailwindOptions?.targetDir || "dist",
          extract: true,
          modules: false
        });
        build.onLoad({ filter: /\.css$/i }, async (args) => {
          const contents = transformIdsInCode(import_node_fs.default.readFileSync(args.path, "utf-8"));
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
        let MiniCssExtractPlugin;
        if (params.options.mode === "production") {
          MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
                  plugins: postcssConfigLoaded.plugins,
                  to: options.tailwindOptions?.targetDir || "dist",
                  extract: true,
                  modules: false
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
        const url = (await import("postcss-url")).default;
        if (!rollupOptions.plugins)
          rollupOptions.plugins = [];
        const plugins = [
          ...(await postcssConfig).plugins,
          url({
            url: "copy",
            basePath: getAssetsPath(),
            assetsPath: options.tailwindOptions?.targetDir || "dist"
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
            postcss: getConfigsPath()
          }
        };
      }
    }
  };
}

// src/core/unplugins/transformIds.ts
function getTransformIdsUnplugin() {
  return {
    name: "@kanton-basel-stadt/designsystem/transform-ids",
    enforce: "pre",
    transform: transformIdsInCode,
    esbuild: {
      onLoadFilter: /\.(?!woff2?$)[^.]+$/i
    },
    vite: {
      config() {
        return {
          optimizeDeps: {
            exclude: ["@kanton-basel-stadt/designsystem/dist/configs/icons-index"]
          }
        };
      }
    }
  };
}

// src/core/unplugins/unpluginIconsPatched.ts
var import_lodash = __toESM(require("lodash.merge"), 1);
var import_unplugin_icons = __toESM(require("unplugin-icons"), 1);
var import_loaders = require("unplugin-icons/loaders");

// src/core/utils/transformIconId.ts
function transformIconId(id) {
  return id.replace(ICON_PATH_ALIAS, ICON_PATH);
}

// src/core/unplugins/unpluginIconsPatched.ts
function getUnpluginIconsPatchedUnplugin(options, meta) {
  const unpluginIconsConfig = {
    customCollections: {
      symbol: (0, import_loaders.FileSystemIconLoader)(`${getAssetsPath()}/symbols`)
    },
    compiler: "web-components",
    webComponents: {
      autoDefine: true
    }
  };
  const mergedUnpluginIconsConfig = (0, import_lodash.default)(unpluginIconsConfig, options.iconOptions);
  if (mergedUnpluginIconsConfig.compiler !== "web-components") {
    delete mergedUnpluginIconsConfig.webComponents;
  }
  let builtUnpluginIcons = import_unplugin_icons.default;
  if ("default" in import_unplugin_icons.default)
    builtUnpluginIcons = import_unplugin_icons.default.default;
  const usableUnpluginIcons = builtUnpluginIcons.raw(mergedUnpluginIconsConfig, meta);
  return {
    ...usableUnpluginIcons,
    name: "unplugin-icons-patched",
    resolveId(id) {
      return usableUnpluginIcons.resolveId(transformIconId(id));
    },
    loadInclude(id) {
      return usableUnpluginIcons.loadInclude(transformIconId(id));
    },
    async load(id) {
      return await usableUnpluginIcons.load(transformIconId(id));
    }
  };
}

// src/index.ts
var unpluginFactory = (options, meta) => {
  if (options === void 0)
    options = {};
  return [
    getTransformIdsUnplugin(),
    getUnpluginIconsPatchedUnplugin(options, meta),
    getPostcssTailwindUnplugin(options)
  ];
};

// src/esbuild.ts
var esbuild_default = (0, import_unplugin2.createEsbuildPlugin)(unpluginFactory);
exports.default = module.exports;