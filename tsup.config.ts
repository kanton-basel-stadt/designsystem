import type { Options } from 'tsup'

export default <Options>{
  entry: {
    // We explicitly build the Tailwind config for .js and .cjs files.
    'configs/tailwind.config': 'src/core/configs/tailwind.config.ts',
    'configs/colors': 'src/core/configs/colors.ts',

    // Actual plugin files.
    'astro': 'src/astro.ts',
    'esbuild': 'src/esbuild.ts',
    'index': 'src/index.ts',
    'nuxt': 'src/nuxt.ts',
    'rollup': 'src/rollup.ts',
    'vite': 'src/vite.ts',
    'webpack': 'src/webpack.ts',
    'types': 'src/types.ts',
  },
  target: 'esnext',
  clean: true,
  format: ['esm', 'cjs'],
  publicDir: './src/core/',
  dts: true,
  onSuccess: 'npm run build:fix',
}
