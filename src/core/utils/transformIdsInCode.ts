import { ICON_PATH, ICON_PATH_ALIAS } from './consts'
import { getDirName } from './getDirName'

export function transformIdsInCode(code: string) {
  const dirname = getDirName()

  return code
    .replace(new RegExp(ICON_PATH_ALIAS, 'g'), ICON_PATH)
    .replace(/(['"(])@kanton-basel-stadt\/designsystem(?!\/icons\/symbol)((?:\/[\w\-.]*)*)(['")])/g, `$1${dirname}$2$3`)
    .replace(/dist\/dist/g, 'dist')
    // This is purely for the docs, otherwise Storybook has the actual file paths in the code examples, which we don't want.
    .replace(/@@kanton-basel-stadt/g, '@kanton-basel-stadt')
}
