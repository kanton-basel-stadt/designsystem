import { execSync } from 'node:child_process'
import { resolve } from 'node:path'

export function buildExample(exampleName: string, command?: string) {
  const path = resolve(`test/e2e/examples/${exampleName}`)

  return execSync(`cd ${path} && npm install && NODE_ENV=production npm run ${command || 'build'}`)
}
