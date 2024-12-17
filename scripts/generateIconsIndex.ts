import fs from 'node:fs'
import path from 'node:path'

/**
 * This script generates a single .ts file that imports and exports all available icons to the config dir.
 * The index can be used by any script requesting access to all icons at once.
 */

function toPascalCase(input: string) {
  return input
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

const icons = fs.readdirSync(
  path.resolve(import.meta.dirname, '..', 'src', 'core', 'assets', 'symbols'),
).map(i => i.replace(/\.svg/g, ''))

const tsCode = `${icons.sort().map(i => `import IconSymbol${toPascalCase(i)} from '@kanton-basel-stadt/designsystem/icons/symbol/${i}'`).join('\n')}

export default {
  ${icons.map(i => `IconSymbol${toPascalCase(i)}`).join(',\n  ')},
  iconNames: [${icons.map(i => `'${i}'`).join(', ')}],
}
`

const filePath = path.resolve(import.meta.dirname, '..', 'src', 'core', 'configs', 'icons-index.ts')
try {
  fs.unlinkSync(filePath)
}
catch (e) {
  console.warn(e)
}

fs.writeFileSync(filePath, tsCode)
