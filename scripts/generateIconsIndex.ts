import fs from 'node:fs'
import path from 'node:path'

/**
 * This script generates a single .ts file that imports and exports all available icons to the config dir.
 * The index can be used by any script requesting access to all icons at once.
 */

const toPascalCase = (str: string) =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map((x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
    .join("")

const icons = fs.readdirSync(
  path.resolve(import.meta.dirname, '..', 'src', 'core', 'assets', 'symbols')
).map(i => i.replace(/\.svg/g, ''))

const tsCode = icons.map(i => `import IconSymbol${toPascalCase(i)} from '@kanton-basel-stadt/designsystem/icons/symbol/${i}'`).join('\n') + `

export default {
  ${icons.map(i => 'IconSymbol' + toPascalCase(i)).join(',\n  ')},
  iconNames: ${JSON.stringify(icons)}
}`

const filePath = path.resolve(import.meta.dirname, '..', 'src', 'core', 'configs', 'icons-index.ts')
try {
  fs.unlinkSync(filePath)
} catch(_) {
  // noop
}

fs.writeFileSync(filePath, tsCode)
