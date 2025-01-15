import type { Config as TailwindConfig } from 'tailwindcss'
import merge from 'lodash.merge'
import loadOptions from 'postcss-load-config/src/options.js'
import loadPlugins from 'postcss-load-config/src/plugins.js'
import postcssConfig from '../configs/postcss.config'

export async function getPostcssConfig(configPath: string, tailwindConfig: Partial<TailwindConfig> | undefined) {
  if (tailwindConfig) {
    postcssConfig.plugins.tailwindcss.config = merge(postcssConfig.plugins.tailwindcss.config, tailwindConfig)
  }

  const file = `${configPath}/postcss.config.ts`

  return {
    file,
    options: await loadOptions(postcssConfig, file),
    plugins: await loadPlugins(postcssConfig, file),
  }
}
