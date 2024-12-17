import path from 'node:path'
import { fileURLToPath } from 'node:url'

export function getDirName() {
  // CJS vs TS stuff
  let dirname: string
  try {
    dirname = __dirname
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (_) {
    const filename = fileURLToPath(import.meta.url)
    dirname = path.dirname(filename)
  }

  return dirname
}
