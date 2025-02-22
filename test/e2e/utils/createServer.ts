import express from 'express'

export function createServer(exampleName: string, port = 3000) {
  const app = express()
  app.use(express.static(`test/e2e/examples/${exampleName}/dist`))
  const server = app.listen(port, () => {})

  return server
}
