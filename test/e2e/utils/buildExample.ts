import { execSync } from 'node:child_process'
import { resolve } from 'node:path'

export function buildExample(exampleName: string, command?: string) {
  const path = resolve(`test/e2e/examples/${exampleName}`)

  const commandParts = [
    `cd ${path}`,
    'npm install',
    // eslint-disable-next-line node/prefer-global/process
    `${process.platform === 'win32' ? 'set NODE_ENV=production && ' : 'NODE_ENV=production '}npm run ${command || 'build'}`,
  ]

  return execSync(commandParts.join(' && '))
}
