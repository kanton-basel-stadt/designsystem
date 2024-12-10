import {
  webpack_default
} from "./chunk-QFJJKNMZ.js";
import {
  vite_default
} from "./chunk-FVDCYYAJ.js";
import "./chunk-TXUGS6OD.js";
import "./chunk-3RG5ZIWI.js";

// src/nuxt.ts
import { addVitePlugin, addWebpackPlugin, defineNuxtModule } from "@nuxt/kit";
import "@nuxt/schema";
var nuxt_default = defineNuxtModule({
  meta: {
    name: "@kanton-basel-stadt/designsystem",
    configKey: "kantonBsDesignSystem"
  },
  defaults: {
    // ...default options
  },
  setup(options, _nuxt) {
    addVitePlugin(() => vite_default(options));
    addWebpackPlugin(() => webpack_default(options));
  }
});
export {
  nuxt_default as default
};
