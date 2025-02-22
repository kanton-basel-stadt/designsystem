# @kanton-basel-stadt/designsystem

## Purpose and idea

This Unplugin aims to get developers started quickly with developing frontend components and installs both icons and
CSS for the WebBS design system.

Since the Unplugin only offers all the CSS, the markup needs to be built separately. **This is intentional.** Since
frameworks such as Vue, Svelte, React, Twig, or Blade differ wildly in terms of template syntax, providing a standardised
way of including components is next to impossible. We, therefore, settled on providing the CSS code and all assets
necessary to create components but not the components themselves. The markup for the components can be found in Storybook.

The Unplugin provides all the necessary code to create a website with the look and feel of www.bs.ch. It's based
on [Tailwind](https://tailwindcss.com). To get afull picture of the Digital Design System, please refer to the [Storybook
instance](https://kanton-basel-stadt.github.io/storybook).

## Installation and setup

This package has several dependencies and peer dependencies.

### Package installation

```bash
npm i @kanton-basel-stadt/designsystem
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

#### TypeScript support

To add proper type support for your framework of choice, you may also need to add TypeScript types to your tsconfig:

For example, to add types to React, you need to add the following to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": [
      "@kanton-basel-stadt/designsystem/types/react"
    ]
  }
}
```

There are types for Astro, Preact, Qwik, React, Svelte, Svelte3, Svelte4, Vue 2.7, Vue3+ and Web components.

#### Adding the plugin to your build tool

<details>
<summary>Vite</summary><br>

```ts
import KantonBSDesignsystemPlugin from '@kanton-basel-stadt/designsystem/vite'

export default defineConfig({
  plugins: [
    KantonBSDesignsystemPlugin({ /* Options */ }),
  ],
  server: {
    fs: {
      strict: false,
    }
  },
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
import Starter from '@kanton-basel-stadt/designsystem/esbuild'
// esbuild.config.js
import { build } from 'esbuild'

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

import KantonBSDesignsystemPlugin from '@kanton-basel-stadt/designsystem/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

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
  },
  server: {
    fs: {
      strict: false,
    }
  },
})
```

Example: Can be found in `examples/vue-vite`.

<br></details>

### Options

The options of the plugin are as follows:

```typescript
import type { Config as TailwindConfig } from 'tailwindcss'
import type { Options as UnpluginIconsOptions } from 'unplugin-icons'

export interface Options {
  iconOptions?: UnpluginIconsOptions
  tailwindOptions?: {
    targetDir?: string
    config?: Partial<TailwindConfig>
  }
}
```

With `iconOptions` being the options described in the [unplugin-icons docs](https://github.com/unplugin/unplugin-icons) and
`tailwindOptions` being used to configure some Tailwind behaviour. Please note that the `targetDir` option only works for
ESBuild, Webpack and Rollup.

### How to overwrite parts of the Tailwind config, such as `content` paths or theme

To overwrite parts of the Tailwind config, specify the keys in the plugin options.

For example, if your templates are located elsewhere than your build tool configuration, you may specify their path as follows:

```typescript
// ...
KantonBSDesignsystemPlugin({
  // ...
  tailwindOptions: {
    config: {
      content: [
        // Change path and file endings
        '/path/to/your/template/folder/**/*.{html,js}',
      ],
    }
  }
})
```

In the above example, Tailwind will look for any HTML and JS file in `/path/to/your/template/folder/` and its
subdirectories to find Tailwind classes to include in the built CSS.

You may also overwrite any other part of the config, such as the theme (to add things, such as additional colours, font
sizes, etc.), the safelist (to guarantee certain classes to be present in the built CSS), to add plugins, etc.

The entire config is deep-merged with the standard config.

**Please keep in mind, that any change to the theme should adhere to the design specifications. Use custom components
over theme changes, and, if the value is only used once or twice, use arbitrary value syntax (i.e. `bg-[#ff0000]`).**

## How to use icons

This unplugin uses [unplugin-icons](https://www.npmjs.com/package/unplugin-icons) as a nested plugin. All options of
this plugin apply, but they are set to sensible defaults in order to work correctly with the supplied icon set.

**Please keep in mind: In the examples specified above, the correct icon compilers are already configured.**

Use the following code snippets to include the icon `pen`. All other icons can be found in `src/core/assets/symbols/`
of this repository.

Please see [Storybook](https://kanton-basel-stadt.github.io/storybook/?path=/story/6-components-icons-icon--default) for a detailed list of all icons.

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

## How to use the CSS

This unplugin uses PostCSS and Tailwind, both preconfigured. So, any tree-shaking of any Tailwind classes will be handled.

To include the framework in your CSS, apply the top of your CSS:

```css
@import '@kanton-basel-stadt/designsystem/assets/css/tailwind.css';

/* Apply custom CSS here */
```

Please keep in mind that any additional CSS should be kept within `@layer components {  /* ... */ }`, so Tailwind knows
what to do with it.

If you want to simply use Tailwind as is with no additional CSS, you can do so by applying the desired classes to your
HTML elements. For that, please consult the official [Tailwind documentation](https://tailwindcss.com/docs/installation),
Storybook and the Tailwind config of this repository. Please keep in mind that Storybook is currently not up to date with
the latest implementations, especially when it comes to icons. They may need some adjustment.

## Development

To develop inside the DDS, it is recommended to use Node v20 and NPM.

To get started, install all dependencies. To test your changes manually, you can use various examples in the `examples/`
folder of the project that use the DDS. You need to install their dependencies as well. However, for your changes to
take effect, you need to build the DDS using `npm run build`. Since the examples install the DDS via symlink, all changes
built are available immediately without the need for a release or an additional run of `npm install`.

Before you do a release, make sure your changes...
 * Work as intended (by testing in `examples/`)
 * Pass all existing and additional tests (by executing `npm run test` it is recommended to add tests to newly added code)
 * Adhere to the coding standards (by executing `npm run lint` and `npm run lint:fix`)

### Releasing

To create a new release (i.e. after you added changes) follow these steps:

1. Make sure you have push rights to GitHub and access rights to the project on npmjs.
2. Make sure you're logged in on npmjs using `npm login`.
3. Execute the following:
```
git commit -a -m "YOUR COMMIT MESSAGE HERE"
git push -u origin main
npm run lint:fix
npm run build
npm run release
```

Now, please tell users to update the package.

Please feel free to also submit pull requests and/or issues.

### Testing

#### Unit tests

To execute unit tests, run the following command:

```
npm run test unit
```

#### End-to-end tests

The end-to-end tests set up actual build tools (Astro, esbuild, Nuxt, rollup, Vite and Webpack) with the unplugin,
build them, serve their output and compare the result to a baseline screenshot to ensure the correct loading of
icons, CSS, and font files.

To execute the tests, build the unplugin first:

```
npm run build
```

Then execute the following command:

```
npm run test e2e
```

**Note:** Please keep in mind that installation, building, starting the web server and the Chromium instance might take a while.

If any of the tests fail and want to see how the screenshot taken differs from the baseline, you can execute the tests with
a flag to dump the diffs:

```
DUMP_DIFFS=1 npm run test e2e
```

This will generate PNGs named after the build tools (for example, `diff_astro.png`) in the `test/e2e/` folder. These are
ignored by Git. When you open these files, every red and yellow pixel is a pixel difference. If there are no red and yellow pixels,
then the baseline image and the screenshot taken overlap perfectly.

#### Linting

To check if your code adheres to the coding standards, you can execute ESLint by running:

```
npm run lint
```

And to automatically fix any automatically fixable errors, run:

```
npm run lint:fix
```

#### Testing during development

In the `examples/` folder, you can find playgrounds for various different frameworks. They function much in the same way
the examples in the end-to-end tests do, with the exception that they may contain differing DOM and extra CSS.

To test the Unplugin's various parts and execute end-to-end tests for various build tools, you can execute the tests:

In order to run them, head to the desired example and install dependencies:

```
npm install
```

**Note:** Please keep in mind that the Unplugin is installed via symlink for ease of development, so each change you do,
once built with `npm run build` executed in the unplugin project root, is directly reflected in the installed package in
the example.

### Adding new icons

If you need to add new icons, you can place them in the folder `src/core/assets/symbols/`. Make sure any fill or stroke
attributes use `currentColor`. Nothing else is needed, the icon will be available as a component upon the next execution
of `npm run build`. The newly built `src/core/configs/icons-index.ts` needs to be part of the release, otherwise the new
icons will not be available to users.

To execute the icon building separately, you can run the following command:

```
npm run build:generate-icons-index
```

## Contributing

If you'd like to contribute, please open an issue or merge request on GitHub. The core team can then help you get started.
