# @kanton-basel-stadt/designsystem

## Purpose

This unplugin (based on unplugin-starter) installs both icons and CSS for the WebBS design system.

## Install

```bash
npm i git+https://github.com/kanton-basel-stadt/designsystem.git
```

Also, you need to install all peer dependencies for your framework:

Vite:

 * `vite`

Webpack:

 * `webpack`
 * `css-loader`
 * `mini-css-extract-plugin`
 * `postcss-loader`
 * `style-loader`

Nuxt:

 * `@vue/compiler-sfc`
 * `@nuxt/kit`
 * `@nuxt/schema`

Rollup:

 * `rollup`
 * `rollup-plugin-postcss`

ESBuild:

 * `esbuild`

<details>
<summary>Vite</summary><br>

```ts
import KantonBSDesignsystemPlugin from '@kanton-basel-stadt/designsystem/vite'

export default defineConfig({
  plugins: [
    KantonBSDesignsystemPlugin({ /* Options */  }),
  ],
})
```

Example: Can be found in `examples/vite-vanillla`.

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import KantonBSDesignsystemPlugin from '@kanton-basel-stadt/designsystem/dist/rollup.cjs';

export default {
  input: 'main.js',
  output: { format: 'es', file: 'dist/bundle.js' },
  plugins: [
    KantonBSDesignsystemPlugin.default({
      tailwindOptions: {
        targetDir: process.cwd() + '/dist' // Necessary for the output of font files to work
      }
    }),
  ],
};
```

Example: Can be found in `examples/rollup`.

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('@kanton-basel-stadt/designsystem/webpack').default({ /* options */ })
  ],
}
```

Example: Can be found in `examples/webpack5`.

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default defineNuxtConfig({
  modules: [
    ['@kanton-basel-stadt/designsystem/nuxt', {
      iconOptions: {
        compiler: 'vue3',
      }
    }],
  ],
})
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

Example: Can be found in `examples/nuxt`.

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('@kanton-basel-stadt/designsystem/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import Starter from '@kanton-basel-stadt/designsystem/esbuild'

build({
  plugins: [KantonBSDesignsystemPlugin()],
  loader: {
    // Necessary for the font files to work
    '.woff': 'file',
    '.woff2': 'file',
  }
})
```

Example: Can be found in `examples/esbuild`.

<br></details>

<details>
<summary>Astro</summary><br>

```ts
// astro.config.mjs
import KantonBSDesignsystemPlugin from '@kanton-basel-stadt/designsystem/astro';

// https://astro.build/config
export default defineConfig({
  integrations: [
    KantonBSDesignsystemPlugin({
      iconOptions: {
        compiler: 'astro',
      }
    })
  ],
});
```

Example: Can be found in `examples/astro`.

<br></details>

## How to use icons

This unplugin uses [unplugin-icons](https://www.npmjs.com/package/unplugin-icons) as a nested plugin. All options of 
this plugin apply, but they are set to sensible defaults in order to work correctly with the supplied icon set.

**Please keep in mind: In the examples specified above, the correct icon compilers are already configured.**

Use the following code snippets to include the icon `pen`. All other icons can be found in `src/core/assets/symbols/` 
of this repository.

<details>
<summary>Astro</summary><br>

```astro
---
import IconSymbolPen from '@kanton-basel-stadt/designsystem/icons/symbol/pen';
---

<IconSymbolPen />
```

Example: Can be found in `examples/astro`.

<br></details>

<details>
<summary>Nuxt/Vue</summary><br>

```vue
<script lang="ts" setup>
  import IconSymbolPen from '@kanton-basel-stadt/designsystem/icons/symbol/pen';
</script>

<template>
  <div>
    <IconSymbolPen />
  </div>
</template>
```

Example: Can be found in `examples/nuxt`.

<br></details>

<details>
<summary>ESBuild, Webpack, Vite, Rollup</summary><br>

In your bundle file:
```js
import '@kanton-basel-stadt/designsystem/icons/symbol/pen';
```

And then, in your HTML file:

```html
<icon-symbol-pen />
```

Example: Can be found in `examples/nuxt`.

<br></details>

## How to use the CSS

This unplugin uses PostCSS and Tailwind, both preconfigured. So, any tree-shaking of any Tailwind classes will be handled.

To include the framework in your CSS, apply the top of your CSS:

```css
@import '@kanton-basel-stadt/designsystem/assets/css/tailwind.css';

/* Apply custom CSS here */
```

Please keep in mind that any additional CSS should be kept within `@layer components {  /* ... */ }`, so Tailwind knows 
what to do with it.
