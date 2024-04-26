# @kanton-basel-stadt/designsystem

## Purpose

This unplugin (based on unplugin-starter) installs both icons and CSS for the WebBS design system.

## Installation and setup

This package has several dependencies and peer dependencies.

### Package installation

```bash
npm i git+https://github.com/kanton-basel-stadt/designsystem.git
```

Also, you need to install all peer dependencies for your framework:

For Vite, install

 * `vite`

For Webpack, install

 * `webpack`
 * `css-loader`
 * `mini-css-extract-plugin`
 * `postcss-loader`
 * `style-loader`

For Nuxt, install

 * `@vue/compiler-sfc`
 * `@nuxt/kit`
 * `@nuxt/schema`

For Rollup, install

 * `rollup`
 * `rollup-plugin-postcss`

For ESBuild, install

 * `esbuild`

### Setup depending on your build tool of choice

<details>
<summary>Vite</summary><br>

```ts
import KantonBSDesignsystemPlugin from '@kanton-basel-stadt/designsystem/vite'

export default defineConfig({
  plugins: [
    KantonBSDesignsystemPlugin({ /* Options */ }),
  ],
})
```

Example: Can be found in `examples/vite-vanillla`.

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import KantonBSDesignsystemPlugin from '@kanton-basel-stadt/designsystem/dist/rollup.cjs'

export default {
  input: 'main.js',
  output: { format: 'es', file: 'dist/bundle.js' },
  plugins: [
    KantonBSDesignsystemPlugin.default({
      tailwindOptions: {
        targetDir: `${process.cwd()}/dist` // Necessary for the output of font files to work
      }
    }),
  ],
}
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
    require('@kanton-basel-stadt/designsystem/webpack').default({ /* Options */ })
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
      require('@kanton-basel-stadt/designsystem/webpack')({
        iconOptions: {
          compiler: 'vue3',
        },
      }),
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
import KantonBSDesignsystemPlugin from '@kanton-basel-stadt/designsystem/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [
    KantonBSDesignsystemPlugin({
      iconOptions: {
        compiler: 'astro',
      }
    })
  ],
})
```

Example: Can be found in `examples/astro`.

<br></details>

<details>
<summary>Vue3 + Vite</summary><br>

```ts
// vite.config.ts
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import KantonBSDesignsystemPlugin from '@kanton-basel-stadt/designsystem/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    KantonBSDesignsystemPlugin({
      iconOptions: {
        compiler: 'vue3',
      },
    }),
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

```

Example: Can be found in `examples/vue-vite`.

<br></details>

## How to use icons

This unplugin uses [unplugin-icons](https://www.npmjs.com/package/unplugin-icons) as a nested plugin. All options of
this plugin apply, but they are set to sensible defaults in order to work correctly with the supplied icon set.

**Please keep in mind: In the examples specified above, the correct icon compilers are already configured.**

Use the following code snippets to include the icon `pen`. All other icons can be found in `src/core/assets/symbols/`
of this repository.

> TODO #01: A full list of icons will be published in Storybook, so people don't have to dig into the source code of this repo.

The following examples are what is implemented in the current examples. Since unplugin-icons also offers support for
various frontend frameworks, the `compiler` option may need to be different from the default configuration. For that,
please consult the official [unplugin-icons](https://www.npmjs.com/package/unplugin-icons#configuration) documentation.

<details>
<summary>Astro</summary><br>

```astro
---
import IconSymbolPen from '@kanton-basel-stadt/designsystem/icons/symbol/pen'
---

<IconSymbolPen />
```

Example: Can be found in `examples/astro`.

<br></details>

<details>
<summary>Nuxt/Vue</summary><br>

```vue
<script lang="ts" setup>
  import IconSymbolPen from '@kanton-basel-stadt/designsystem/icons/symbol/pen'
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
import '@kanton-basel-stadt/designsystem/icons/symbol/pen'
```

And then, in your HTML file:

```html
<icon-symbol-pen />
```

Example: Can be found in `examples/nuxt`.

<br></details>

### List of compilers

To use icons with your framework of choice, you may need to specify a compiler. The unplugin defaults to web components, 
which work with most non-framework related build tools, such as standalone Webpack or standalone Vite. However, if 
you're using one of the following frameworks, you need to specify the compiler in the unplugin options with the following 
patterns:

<details>
<summary>Vue 3 / Vue 2.7+</summary><br>

Requires peer dependency `@vue/compiler-sfc`.

```js
KantonBSDesignsystemPlugin({
  iconOptions: {
    compiler: 'vue3',
  },
})
```
<br/></details>

<details>
<summary>Vue 2 (only versions <2.7)</summary><br>

Requires peer dependency `vue-template-compiler`.

```js
KantonBSDesignsystemPlugin({
  iconOptions: {
    compiler: 'vue2',
  },
})
```
<br/></details>

<details>
<summary>React</summary><br>

Requires peer dependencies `@svgr/core` and its plugin `@svgr/plugin-jsx`.

```js
KantonBSDesignsystemPlugin({
  iconOptions: {
    compiler: 'jsx',
    jsx: 'react',
  },
})
```
<br/></details>

<details>
<summary>Preact</summary><br>

Requires peer dependencies `@svgr/core` and its plugin `@svgr/plugin-jsx`.

```js
KantonBSDesignsystemPlugin({
  iconOptions: {
    compiler: 'jsx',
    jsx: 'preact',
  },
})
```
<br/></details>

<details>
<summary>Solid</summary><br>

```js
KantonBSDesignsystemPlugin({
  iconOptions: {
    compiler: 'solid'
  },
})
```
<br/></details>

<details>
<summary>Svelte</summary><br>

```js
KantonBSDesignsystemPlugin({
  iconOptions: {
    compiler: 'svelte'
  },
})
```
<br/></details>

<details>
<summary>Astro</summary><br>

```js
KantonBSDesignsystemPlugin({
  iconOptions: {
    compiler: 'astro'
  },
})
```
<br/></details>

<details>
<summary>qwik</summary><br>

```js
KantonBSDesignsystemPlugin({
  iconOptions: {
    compiler: 'qwik'
  },
})
```
<br/></details>

<details>
<summary>qwik + JSX</summary><br>

Requires peer dependencies `@svgr/core` and its plugin `@svgr/plugin-jsx`.

```js
KantonBSDesignsystemPlugin({
  iconOptions: {
    compiler: 'jsx',
    jsx: 'qwik',
  },
})
```
<br/></details>

**Please consult the [documentation of unplugin-icons](https://github.com/unplugin/unplugin-icons) for further 
information on types, etc.**

### I receive warnings that Vite cannot find a specific package. What should I do?

Since the library rewrites imported icon paths to work with unplugin-icons, you may ignore these warnings. This is a 
known issue, and we're working on a fix for that.

## How to use the CSS

This unplugin uses PostCSS and Tailwind, both preconfigured. So, any tree-shaking of any Tailwind classes will be handled.

To include the framework in your CSS, apply the top of your CSS:

```css
@import '@kanton-basel-stadt/designsystem/assets/css/tailwind.css'

/* Apply custom CSS here */
```

Please keep in mind that any additional CSS should be kept within `@layer components {  /* ... */ }`, so Tailwind knows
what to do with it.

If you want to simply use Tailwind as is with no additional CSS, you can do so by applying the desired classes to your
HTML elements. For that, please consult the official [Tailwind documentation](https://tailwindcss.com/docs/installation),
Storybook and the Tailwind config of this repository. Please keep in mind that Storybook is currently not up to date with 
the latest implementations, especially when it comes to icons. They may need some adjustment.



> TODO #02: A Tailwind config viewer will be implemented in Storybook, so people don't have to dig into the source code of this repo.

## Development

To create a new release (i.e. after you added changes) execute the following:

```
npm run build
git add .
git add dist/ -f
git commit -m "YOUR COMMIT MESSAGE HERE"
git push -u origin main
```

Adding the dist folder is currently necessary, since we don't yet have a 
strategy for either building and/or releasing to npmjs.org.

Now, please tell users to update the package.

Please feel free to also submit pull requests and/or issues.

> TODO #03: Add a sensible build/test suite to work with GitHub actions, and define release management.
> TODO #04: Add issue/PR templates.
> TODO #05: Add contributors wiki.
> TODO #06: Update Storybook to be up-to-date and exhaustive.

## Contributing

If you'd like to contribute, please open an issue on GitHub. The core team can then help you get started.
