import {
  webpack_default
} from "./chunk-IYABRSKA.js";
import {
  vite_default
} from "./chunk-UHDC67VR.js";
import "./chunk-5GSXQTHB.js";
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
