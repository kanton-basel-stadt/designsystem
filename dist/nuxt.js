import {
  vite_default
} from "./chunk-LGNMXCB4.js";
import {
  webpack_default
} from "./chunk-QR67U4CK.js";
import "./chunk-346IH3R3.js";

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
