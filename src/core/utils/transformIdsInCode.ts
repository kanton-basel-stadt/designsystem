import path from 'node:path'
import MagicString from 'magic-string'
import { getDirName } from './getDirName'

export function transformIdsInCode(code: string, id: string) {
  let dirname = getDirName()

  if (dirname.endsWith(path.sep)) {
    dirname = dirname.replace(/[\\/]+$/, '')
  }

  if (dirname.endsWith('dist')) {
    dirname = dirname.replace(/[\\/]+dist$/, '')
  }

  const s = new MagicString(code)

  s.replace(/(['"(]+)(@{1,2})kanton-basel-stadt\/designsystem\/(icons\/symbols\/(\w+)|([^"')]+))(['")]+)/g, (_, surroundingStart: string, ats: string, fullPathMatch, _2, iconMatch, surroundingEnd) => {
    // Purely for Storybook: `@@kanton-basel-stadt/...` gets translated to `@kanton-baselstadt/...`, so we have a way
    // to display the original ID in code examples. They would otehrwise be transformed as well, which is not what
    // we want in these cases.
    if (ats.length === 2) {
      return `${surroundingStart}@kanton-basel-stadt/designsystem/${fullPathMatch}${surroundingEnd}`
    }

    // Replace any starting `/` or backslashes that might've snug in
    if (fullPathMatch.startsWith(path.sep) || fullPathMatch.startsWith('/')) {
      fullPathMatch = fullPathMatch.replace(/^[\\/]+/, '')
    }

    // If we're dealing with an icon, return the path that's used by unplugin-icons
    if (fullPathMatch.startsWith('icons/symbol/')) {
      return `${surroundingStart}~${iconMatch}${surroundingEnd}`
    }

    // Remove any leading `dist/`
    if (fullPathMatch.startsWith('dist')) {
      fullPathMatch = fullPathMatch.replace(/^dist[\\/]+/, '')
    }

    // Fix path separators
    fullPathMatch = fullPathMatch.replace(/\//g, path.sep)

    // Return the full path for Node to pick up, including `dist/`
    return `${surroundingStart}${dirname}${path.sep}dist${path.sep}${fullPathMatch}${surroundingEnd}`
  })

  if (!s.hasChanged()) {
    return
  }

  return {
    code: s.toString(),
    map: s.generateMap({ source: id, includeContent: true, hires: true }),
  }
}
