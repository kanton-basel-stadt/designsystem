import { defineConfig } from 'vitest/config'
import toPascalCase from './src/core/utils/toPascalCase.ts'

const ICON_MODULE = '@kanton-basel-stadt/designsystem/icons/symbol/'

export default defineConfig({
  test: {
    testTimeout: 150_000,
  },
  plugins: [
    {
      name: 'icon-modules',
      load(id: string) {
        if (id.startsWith(ICON_MODULE)) {
          const iconName = id.replace(ICON_MODULE, '')
          const pascalCasedIcon = toPascalCase(iconName)

          return `export default '${pascalCasedIcon}'`
        }
      },
    },
  ],
})
