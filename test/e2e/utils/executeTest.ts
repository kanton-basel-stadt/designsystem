import type { Server } from 'node:http'
import { Buffer } from 'node:buffer'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pixelmatch from 'pixelmatch'
import { PNG } from 'pngjs'
import puppeteer, { type Browser } from 'puppeteer'
import { afterAll, beforeAll, expect, it } from 'vitest'
import { buildExample } from './buildExample.ts'
import { createServer } from './createServer.ts'

export function executeTest(exampleName: string, port: number, buildCommand?: string) {
  const baseUrl = `http://localhost:${port}`

  let browser: Browser
  let server: Server

  beforeAll(async () => {
    buildExample(exampleName, buildCommand)
    server = createServer(exampleName, port)
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    })
  }, 150_000)

  afterAll(async () => {
    if (browser) {
      await browser.close()
    }

    if (server) {
      server.close()
    }
  })

  it(`should set up the ${exampleName} plugin correctly, process Tailwind and all icons, and match the baseline screenshot`, async () => {
    const page = await browser.newPage()
    page.setViewport({
      width: 1024,
      height: 768,
      deviceScaleFactor: 1,
    })

    await page.goto(baseUrl)

    const screenshotBuffer = await page.screenshot({ fullPage: true })
    const baselinePath = path.join(__dirname, '../_baseline.png') // baseline image path
    const baselineImage = PNG.sync.read(fs.readFileSync(baselinePath))
    const screenshotImage = PNG.sync.read(Buffer.from(screenshotBuffer))

    expect(screenshotImage.width).toBe(baselineImage.width)
    expect(screenshotImage.height).toBe(baselineImage.height)

    const diff = new PNG({ width: baselineImage.width, height: baselineImage.height })

    const numDiffPixels = pixelmatch(
      baselineImage.data,
      screenshotImage.data,
      diff.data,
      baselineImage.width,
      baselineImage.height,
      // Rather high value to account for OS differences in font and svg rendering. If the font or any Icon
      // doesn't load, the number will be high enough (in the thousands) to actually trigger a test failure.
      { threshold: 0.6 },
    )

    // eslint-disable-next-line node/prefer-global/process
    if (process.env.DUMP_DIFFS !== undefined) {
      // eslint-disable-next-line node/prefer-global/process
      const outputPath = path.resolve(path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', 'output', 'test', process.platform))

      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true })
      }

      // Used for debugging
      fs.writeFileSync(path.join(outputPath, `diff_${exampleName}.png`), PNG.sync.write(diff))
      fs.writeFileSync(path.join(outputPath, `data_${exampleName}.png`), PNG.sync.write(screenshotImage))
    }

    expect(numDiffPixels).toBe(0)
  })
}
