import type { Config as TailwindConfig } from 'tailwindcss'
import loadOptions from 'postcss-load-config/src/options.js'
import loadPlugins from 'postcss-load-config/src/plugins.js'
import { applyTailwindUserConfig } from '../configs/applyTailwindUserConfig.ts'
import postcssConfig from '../configs/postcss.config'

export async function getPostcssConfig(configPath: string, tailwindConfig: Partial<TailwindConfig> | undefined) {
  if (tailwindConfig) {
    applyTailwindUserConfig(tailwindConfig)
  }

  const file = `${configPath}/postcss.config.ts`

  return {
    file,
    options: await loadOptions(postcssConfig, file),
    plugins: await loadPlugins(postcssConfig, file),
  }
}
