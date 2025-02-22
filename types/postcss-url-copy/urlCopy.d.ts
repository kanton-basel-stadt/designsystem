declare module 'postcss-url-copy' {
  import type { PluginCreator } from 'postcss'

  export interface Options {
    destPath: string
    assetsDestPath: string
    transformUrlBeforeLoad?: (url: string) => string
    transformUrlBeforeWrite?: (url: string) => string
  }

  const plugin: PluginCreator<Options>
  export default plugin
}
