import {
  webpack_default
} from "./chunk-NUAUVRUZ.js";
import {
  vite_default
} from "./chunk-JUGIRPBJ.js";
import "./chunk-PGC4Z7C4.js";

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
