import type { Config as TailwindConfig } from 'tailwindcss'
import loadOptions from 'postcss-load-config/src/options.js'
import loadPlugins from 'postcss-load-config/src/plugins.js'
import { applyTailwindUserConfig } from '../configs/applyTailwindUserConfig.ts'
import { createPostcssConfig } from '../configs/postcss.config'

export async function getPostcssConfig(
  configPath: string,
  tailwindConfig: Partial<TailwindConfig> | undefined,
  options?: { useTailwindVitePlugin?: boolean },
) {
  if (tailwindConfig) {
    applyTailwindUserConfig(tailwindConfig)
  }

  const postcssConfig = createPostcssConfig(options)
  const file = `${configPath}/postcss.config.ts`

  return {
    file,
    options: await loadOptions(postcssConfig, file),
    plugins: await loadPlugins(postcssConfig, file),
  }
}
