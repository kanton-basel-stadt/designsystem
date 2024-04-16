import type { Options } from 'tsup'

export default <Options>{
  entry: [
    'src/*.ts',
  ],
  target: 'esnext',
  clean: true,
  format: ['esm', 'cjs'],
  publicDir: './src/core/',
  dts: true,
  onSuccess: 'npm run build:fix',
}
