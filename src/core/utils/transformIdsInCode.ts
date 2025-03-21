import path from 'node:path'
import MagicString from 'magic-string'
import { ICON_PATH, ICON_PATH_ALIAS } from './consts'
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

  s.replace(new RegExp(ICON_PATH_ALIAS, 'g'), ICON_PATH)
  s.replace(/(['"(])@kanton-basel-stadt\/designsystem(?!\/icons\/symbol)((?:\/[\w\-.]*)*)(['")])/g, (_, p1, p2, p3) => {
    // Catches both Windows and Linux/Unix path separators.
    if (p2.startsWith(path.sep) || p2.startsWith('/')) {
      p2 = p2.replace(/^[\\/]+/, '')
    }

    if (p2.startsWith('dist')) {
      p2 = p2.replace(/^dist[\\/]+/, '')
    }

    p2 = p2.replace(/\//g, path.sep)

    return `${p1}${dirname}${path.sep}dist${path.sep}${p2}${p3}`
  })

  // This is purely for the docs, otherwise Storybook has the actual file paths in the code examples, which we don't want.
  s.replace(/@@kanton-basel-stadt/g, '@kanton-basel-stadt')

  if (!s.hasChanged()) {
    return
  }

  return {
    code: s.toString(),
    map: s.generateMap({ source: id, includeContent: true, hires: true }),
  }
}
