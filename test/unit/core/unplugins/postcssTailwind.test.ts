import type { Compiler } from 'webpack'
import path from 'node:path'
import urlCopy from 'postcss-url-copy'
import postcss from 'rollup-plugin-postcss'
import { beforeEach, expect, it, vi } from 'vitest'
import { getPostcssTailwindUnplugin } from '../../../../src/core/unplugins/postcssTailwind.ts'

const postcssInstance = {
  async process() {
    return {
      content: 'transformed mock',
    }
  },
}

const postcssConstructor = vi.fn(() => postcssInstance)

beforeEach(() => {
  vi.mock('../../../../src/core/utils/getDirName.ts', () => ({
    getDirName: () => '/foo/bar',
  }))

  vi.mock('../../../../src/core/utils/getPostcssConfig.ts', () => ({
    getPostcssConfig: vi.fn(() => ({
      plugins: ['a', 'b', 'c'],
    })),
  }))

  vi.mock('node:fs', () => ({
    default: {
      readFileSync: vi.fn(() => 'some mocked code'),
      existsSync: vi.fn(() => false),
    },
  }))

  vi.mock('rollup-plugin-postcss', {
    spy: true,
  })

  vi.mock('postcss-url-copy', {
    spy: true,
  })
})

it('sets up a correct unplugin with configs for all build tools and nothing more', () => {
  const postcssTailwindUnplugin = getPostcssTailwindUnplugin({})
  const keys = Object.keys(postcssTailwindUnplugin)

  expect(keys).toContain('name')
  expect(keys).toContain('vite')
  expect(keys).toContain('webpack')
  expect(keys).toContain('esbuild')
  expect(keys).toContain('rollup')

  expect(keys).not.toContain('resolveId')
  expect(keys).not.toContain('loadId')
  expect(keys).not.toContain('loadInclude')
  expect(keys).not.toContain('transform')
})

it('sets up the correct config for Vite', async () => {
  const postcssTailwindUnplugin = getPostcssTailwindUnplugin({})

  expect(postcssTailwindUnplugin.vite?.config).toBeDefined()

  // @ts-expect-error Previous assert guarantees that it's defined.
  const viteConfig = await postcssTailwindUnplugin.vite.config({})

  expect(viteConfig).toStrictEqual({
    css: {
      postcss: {
        plugins: ['a', 'b', 'c'],
      },
    },
  })
})

it('sets up the correct config for Webpack 5 for production mode', async () => {
  const postcssTailwindUnplugin = getPostcssTailwindUnplugin({})

  expect(postcssTailwindUnplugin.webpack).toBeDefined()

  let tapPromiseCallback: (params: Compiler) => Promise<void> = async () => {}

  const compiler = {
    hooks: {
      beforeRun: {
        tapPromise(_: any, cb: (params: Compiler) => Promise<void>) {
          tapPromiseCallback = cb
        },
      },
    },
    options: {
      mode: 'production',
      module: {
        rules: [],
      },
    },
  }

  const spy = vi.spyOn(compiler.hooks.beforeRun, 'tapPromise')

  // @ts-expect-error Previous assert guarantees that it's defined, and we're passing in everything the unplugin needs.
  postcssTailwindUnplugin.webpack(compiler)

  expect(spy).toHaveBeenCalledOnce()
  expect(spy).toHaveBeenCalledWith('@kanton-basel-stadt/designsystem', tapPromiseCallback)

  // @ts-expect-error Previous assert guarantees that it's defined, and we're passing in everything the unplugin needs.
  await tapPromiseCallback(compiler)

  expect(compiler.options.module.rules).toHaveLength(2)

  const rule = compiler.options.module.rules.at(1)

  expect(rule).toHaveProperty('test')

  // @ts-expect-error Rule is set and has the `test` method. If it doesn't it should fail before anyway.
  expect(rule.test).toEqual(/\.css$/)

  // @ts-expect-error Rule is set and has the `test` method. If it doesn't it should fail before anyway.
  expect(rule.use.at(0)).toEqual({
    loader: 'mocked-mini-css-extract-plugin',
    options: {
      publicPath: '../',
    },
  })

  // @ts-expect-error We do have three rules, we know that from before.
  expect(rule.use.at(1)).toStrictEqual({ loader: 'css-loader', options: { url: true, importLoaders: 1, modules: false } })

  // @ts-expect-error We do have three rules, we know that from before.
  expect(rule.use.at(2)).toStrictEqual({
    loader: 'postcss-loader',
    options: {
      postcssOptions: { plugins: ['a', 'b', 'c'], to: 'dist', modules: false },
    },
  },
  )
})

it('sets up the correct config for Webpack 5 for development mode', async () => {
  vi.mock('mini-css-extract-plugin', () => ({
    default: class MiniCssExtractPluginMock {
      constructor() {}

      apply() {}

      static loader = 'mocked-mini-css-extract-plugin'
    },
  }))

  const postcssTailwindUnplugin = getPostcssTailwindUnplugin({})

  expect(postcssTailwindUnplugin.webpack).toBeDefined()

  let tapPromiseCallback: (params: Compiler) => Promise<void> = async () => {
  }

  const compiler = {
    hooks: {
      beforeRun: {
        tapPromise(_: any, cb: (params: Compiler) => Promise<void>) {
          tapPromiseCallback = cb
        },
      },
    },
    options: {
      mode: 'development',
      module: {
        rules: [],
      },
    },
  }

  const spy = vi.spyOn(compiler.hooks.beforeRun, 'tapPromise')

  // @ts-expect-error Previous assert guarantees that it's defined, and we're passing in everything the unplugin needs.
  postcssTailwindUnplugin.webpack(compiler)

  expect(spy).toHaveBeenCalledOnce()
  expect(spy).toHaveBeenCalledWith('@kanton-basel-stadt/designsystem', tapPromiseCallback)

  // @ts-expect-error Previous assert guarantees that it's defined, and we're passing in everything the unplugin needs.
  await tapPromiseCallback(compiler)

  expect(compiler.options.module.rules).toHaveLength(2)

  const rule = compiler.options.module.rules.at(1)

  expect(rule).toHaveProperty('test')

  // @ts-expect-error Rule is set and has the `test` method. If it doesn't it should fail before anyway.
  expect(rule.test).toEqual(/\.css$/)

  // @ts-expect-error Rule is set and has the `test` method. If it doesn't it should fail before anyway.
  expect(rule.use.at(0)).toBe('style-loader')

  // @ts-expect-error We do have three rules, we know that from before.
  expect(rule.use.at(1)).toStrictEqual({ loader: 'css-loader', options: { url: true, importLoaders: 1, modules: false } })

  // @ts-expect-error We do have three rules, we know that from before.
  expect(rule.use.at(2)).toStrictEqual({
    loader: 'postcss-loader',
    options: {
      postcssOptions: { plugins: ['a', 'b', 'c'], to: 'dist', modules: false },
    },
  },
  )
})

it('sets up the correct config for ESBuild', async () => {
  vi.mock('postcss', () => ({
    default: postcssConstructor,
  }))

  const postcssTailwindUnplugin = getPostcssTailwindUnplugin({})

  expect(postcssTailwindUnplugin.esbuild).toBeDefined()

  const cbs: Callback[] = []

  type Callback = (args?: { path: string }) => Promise<void> | void

  const build = {
    onLoad(_: { filter: RegExp }, cb: Callback) {
      cbs.push(cb)
    },
  }

  const onLoadSpy = vi.spyOn(build, 'onLoad')
  const processSpy = vi.spyOn(postcssInstance, 'process')

  // @ts-expect-error The setup method exists, otherwise the plugin isn't functional at all.
  await postcssTailwindUnplugin.esbuild.setup(build)

  expect(onLoadSpy).toHaveBeenCalledTimes(2)

  expect(onLoadSpy).toHaveBeenNthCalledWith(1, { filter: /\.woff2?$/i }, cbs[0])
  expect(onLoadSpy).toHaveBeenNthCalledWith(2, { filter: /\.css$/i }, cbs[1])

  expect(cbs[0]()).toStrictEqual({ loader: 'copy' })

  expect(await cbs[1]({ path: '/foo' })).toStrictEqual({
    contents: 'transformed mock',
    loader: 'css',
  })

  expect(postcssConstructor).toHaveBeenCalledOnce()
  expect(postcssConstructor).toHaveBeenCalledWith(['a', 'b', 'c'])

  expect(processSpy).toHaveBeenCalledOnce()
  expect(processSpy).toHaveBeenCalledWith('some mocked code', {
    from: '/foo',
    to: 'dist',
    map: {
      absolute: true,
      from: '/foo',
    },
  })
})

it('sets up the correct config for rollup', async () => {
  const postcssTailwindUnplugin = getPostcssTailwindUnplugin({})

  expect(postcssTailwindUnplugin.rollup).toBeDefined()

  // @ts-expect-error We mocked this exact library.
  urlCopy.mockReturnValue('postcss-url-copy')

  // @ts-expect-error If the `options` function doesn't exist, the rollup plugin would be non-functional.
  await postcssTailwindUnplugin.rollup.options({})

  expect(urlCopy).toHaveBeenCalledWith({
    destPath: `${process.cwd() + path.sep}dist`,
    assetsDestPath: `${process.cwd() + path.sep}dist${path.sep}assets`,
    transformUrlBeforeLoad: expect.any(Function),
    transformUrlBeforeWrite: expect.any(Function),
  })

  expect(postcss).toHaveBeenCalledWith({
    extract: true,
    modules: false,
    plugins: [
      'a',
      'b',
      'c',
      'postcss-url-copy',
    ],
    to: 'dist/',
  })
})
