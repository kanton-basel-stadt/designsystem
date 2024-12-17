import { expect, it } from 'vitest'
import { transformIdsInCode } from '../../../src/core/utils/transformIdsInCode.ts'

const toTransform = `
import {} from '@kanton-basel-stadt/designsystem/foo/bar';
import {} from '@kanton-basel-stadt/designsystem/foo/bar'
import {} from "@kanton-basel-stadt/designsystem/foo/bar"
("@kanton-basel-stadt/designsystem/foo/bar")
('@kanton-basel-stadt/designsystem/foo/bar')
(@kanton-basel-stadt/designsystem/foo/bar)

import {} from '@kanton-basel-stadt/designsystem/icons/symbol/foobar';
import {} from '@kanton-basel-stadt/designsystem/icons/symbol/foobar'
import {} from "@kanton-basel-stadt/designsystem/icons/symbol/foobar"
("@kanton-basel-stadt/designsystem/icons/symbol/foobar")
('@kanton-basel-stadt/designsystem/icons/symbol/foobar')
(@kanton-basel-stadt/designsystem/icons/symbol/foobar)
`

const dirname = __dirname.replace('test', 'src')

const transformed = `
import {} from '${dirname}/foo/bar';
import {} from '${dirname}/foo/bar'
import {} from "${dirname}/foo/bar"
("${dirname}/foo/bar")
('${dirname}/foo/bar')
(${dirname}/foo/bar)

import {} from '~icons/symbol/foobar';
import {} from '~icons/symbol/foobar'
import {} from "~icons/symbol/foobar"
("~icons/symbol/foobar")
('~icons/symbol/foobar')
(~icons/symbol/foobar)
`

it('replaces all IDs in given code', () => {
  expect(transformIdsInCode(toTransform)).toBe(transformed)
})
