import path from 'node:path'
import { getDirName } from './getDirName.ts'

export function getConfigsPath() {
  const dirname = getDirName()

  return path.resolve(`${dirname}/configs/`)
}
