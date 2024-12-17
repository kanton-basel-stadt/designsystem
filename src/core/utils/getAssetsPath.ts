import path from 'node:path'
import { getDirName } from './getDirName.ts'

export function getAssetsPath() {
  const dirname = getDirName()

  return path.resolve(`${dirname}/assets/`)
}
