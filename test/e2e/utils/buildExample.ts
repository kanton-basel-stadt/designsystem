import { execSync } from 'node:child_process'
import { resolve, sep } from 'node:path'

export function buildExample(exampleName: string, command?: string) {
  const examplePath = resolve(`test${sep}e2e${sep}examples${sep}${exampleName}`)

  const commandParts = [
    `cd ${examplePath}`,
    'npm install',
    // eslint-disable-next-line node/prefer-global/process
    `${process.platform === 'win32' ? 'set NODE_ENV=production && ' : 'NODE_ENV=production '}npm run ${command || 'build'}`,
  ]

  return execSync(commandParts.join(' && '), { stdio: 'inherit' })
}
