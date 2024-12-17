import type { Compiler } from 'webpack'
import mock from 'mock-require'
import url from 'postcss-url'
import postcss from 'rollup-plugin-postcss'
import { beforeEach, expect, it, vi } from 'vitest'
import { getPostcssTailwindUnplugin } from '../../../src/core/unplugins/postcssTailwind.ts'

beforeEach(() => {
  vi.mock('../../../src/core/utils/getDirName.ts', () => ({
    getDirName: () => '/foo/bar',
  }))

  vi.mock('postcss-load-config', () => ({
    default: vi.fn(() => ({
      plugins: ['a', 'b', 'c'],
    })),
  }))

  vi.mock('node:fs', () => ({
    default: {
      readFileSync: vi.fn(() => 'some mocked code'),
    },
  }))

  vi.mock('rollup-plugin-postcss', {
    spy: true,
  })

  vi.mock('postcss-url', {
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

it('sets up the correct config for Vite', () => {
  const postcssTailwindUnplugin = getPostcssTailwindUnplugin({})

  expect(postcssTailwindUnplugin.vite?.config).toBeDefined()

  // @ts-expect-error Previous assert guarantees that it's defined.
  const viteConfig = postcssTailwindUnplugin.vite.config({})

  expect(viteConfig).toStrictEqual({
    css: {
      postcss: process.platform === 'win32' ? 'D:\\foo\\bar\\configs' : '/foo/bar/configs',
    },
  },
  )
})

it('sets up the correct config for Webpack 5 for production mode', async () => {
  mock('mini-css-extract-plugin', class MiniCssExtractPluginMock {
    constructor() {}

    apply() {}

    static loader = 'mocked-mini-css-extract-plugin'
  })

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

  expect(compiler.options.module.rules).toHaveLength(1)

  const rule = compiler.options.module.rules.at(0)

  expect(rule).toHaveProperty('test')

  // @ts-expect-error Rule is set and has the `test` method. If it doesn't it should fail before anyway.
  expect(rule.test('')).toBeFalsy()

  // @ts-expect-error Rule is set and has the `test` method. If it doesn't it should fail before anyway.
  expect(rule.test('foo.html')).toBeFalsy()

  // @ts-expect-error Rule is set and has the `test` method. If it doesn't it should fail before anyway.
  expect(rule.test('foo.scss')).toBeFalsy()

  // @ts-expect-error Rule is set and has the `test` method. If it doesn't it should fail before anyway.
  expect(rule.test('foo.vue')).toBeFalsy()

  // @ts-expect-error Rule is set and has the `test` method. If it doesn't it should fail before anyway.
  expect(rule.test('foo.css')).toBeTruthy()

  // @ts-expect-error Rule is set and has the `test` method. If it doesn't it should fail before anyway.
  expect(rule.use.at(0)).toBe('mocked-mini-css-extract-plugin')

  // @ts-expect-error We do have three rules, we know that from before.
  expect(rule.use.at(1)).toStrictEqual({ loader: 'css-loader', options: { url: true } })

  // @ts-expect-error We do have three rules, we know that from before.
  expect(rule.use.at(2)).toStrictEqual({
    loader: 'postcss-loader',
    options: {
      postcssOptions: { plugins: ['a', 'b', 'c'], to: 'dist', extract: true, modules: false },
    },
  },
  )
})

it('sets up the correct config for Webpack 5 for development mode', async () => {
  mock('mini-css-extract-plugin', class MiniCssExtractPluginMock {
    constructor() {}

    apply() {}

    static loader = 'mocked-mini-css-extract-plugin'
  })

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

  expect(compiler.options.module.rules).toHaveLength(1)

  const rule = compiler.options.module.rules.at(0)

  expect(rule).toHaveProperty('test')

  // @ts-expect-error Rule is set and has the `test` method. If it doesn't it should fail before anyway.
  expect(rule.test('')).toBeFalsy()

  // @ts-expect-error Rule is set and has the `test` method. If it doesn't it should fail before anyway.
  expect(rule.test('foo.html')).toBeFalsy()

  // @ts-expect-error Rule is set and has the `test` method. If it doesn't it should fail before anyway.
  expect(rule.test('foo.scss')).toBeFalsy()

  // @ts-expect-error Rule is set and has the `test` method. If it doesn't it should fail before anyway.
  expect(rule.test('foo.vue')).toBeFalsy()

  // @ts-expect-error Rule is set and has the `test` method. If it doesn't it should fail before anyway.
  expect(rule.test('foo.css')).toBeTruthy()

  // @ts-expect-error Rule is set and has the `test` method. If it doesn't it should fail before anyway.
  expect(rule.use.at(0)).toBe('style-loader')

  // @ts-expect-error We do have three rules, we know that from before.
  expect(rule.use.at(1)).toStrictEqual({ loader: 'css-loader', options: { url: true } })

  // @ts-expect-error We do have three rules, we know that from before.
  expect(rule.use.at(2)).toStrictEqual({
    loader: 'postcss-loader',
    options: {
      postcssOptions: { plugins: ['a', 'b', 'c'], to: 'dist', extract: true, modules: false },
    },
  },
  )
})

it('sets up the correct config for ESBuild', async () => {
  const postcssInstance = {
    async process() {
      return {
        content: 'transformed mock',
      }
    },
  }

  const postcssConstructor = vi.fn(() => postcssInstance)

  mock('postcss', postcssConstructor)

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
  expect(postcssConstructor).toHaveBeenCalledWith({
    plugins: ['a', 'b', 'c'],
    to: 'dist',
    extract: true,
    modules: false,
  })

  expect(processSpy).toHaveBeenCalledOnce()
  expect(processSpy).toHaveBeenCalledWith('some mocked code', {
    from: '/foo',
    map: {
      absolute: true,
      from: '/foo',
    },
  })
})

it('sets up the correct config for rollup', async () => {
  const postcssTailwindUnplugin = getPostcssTailwindUnplugin({})

  expect(postcssTailwindUnplugin.rollup).toBeDefined()

  // @ts-expect-error Even though TS thinks the mockTernValue method doesn't exist, since vitest mocks it, we know it does.
  url.mockReturnValue('postcss-url')

  // @ts-expect-error If the `options` function doesn't exist, the rollup plugin would be non-functional.
  await postcssTailwindUnplugin.rollup.options({})

  expect(url).toHaveBeenCalledWith({
    assetsPath: 'dist',
    basePath: process.platform === 'win32' ? 'D:\\foo\\bar\\assets' : '/foo/bar/assets',
    url: 'copy',
  })

  expect(postcss).toHaveBeenCalledWith({
    extract: true,
    modules: false,
    plugins: [
      'a',
      'b',
      'c',
      'postcss-url',
    ],
    to: 'dist',
  })
})
