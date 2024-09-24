import {
  src_default
} from "./chunk-7DVFBKZF.js";

// src/astro.ts
var astro_default = (options) => ({
  name: "@kanton-basel-stadt/designsystem",
  hooks: {
    "astro:config:setup": async (astro) => {
      astro.config.vite.plugins ||= [];
      astro.config.vite.plugins.push(src_default.vite(options));
    }
  }
});
export {
  astro_default as default
};
