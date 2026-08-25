import type { Config } from 'tailwindcss'

const USER_CONFIG_KEY = '__kantonBsDesignsystemTailwindUserConfig'

/**
 * Stores consumer `tailwindOptions.config` on `globalThis` so the JS config
 * loaded later via CSS `@config` (a separate module instance after bundling)
 * still sees the deep-merged overrides.
 */
export function applyTailwindUserConfig(userConfig: Partial<Config>) {
  Reflect.set(globalThis, USER_CONFIG_KEY, userConfig)
}

export function getTailwindUserConfig(): Partial<Config> {
  const value = Reflect.get(globalThis, USER_CONFIG_KEY)
  if (value && typeof value === 'object') {
    return value as Partial<Config>
  }
  return {}
}
