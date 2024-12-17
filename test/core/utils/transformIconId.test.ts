import { expect, it } from 'vitest'
import { transformIconId } from '../../../src/core/utils/transformIconId.ts'

it('correctly transforms an icon id', () => {
  const id = '@kanton-basel-stadt/designsystem/icons/symbol/baselstab'
  const expectedId = '~icons/symbol/baselstab'

  expect(transformIconId(id)).toBe(expectedId)
})

it('correctly transforms an arbitrary icon id', () => {
  const id = '@kanton-basel-stadt/designsystem/icons/symbol/foobar'
  const expectedId = '~icons/symbol/foobar'

  expect(transformIconId(id)).toBe(expectedId)
})

it('does not transform a non-icon id', () => {
  const id = '@kanton-basel-stadt/designsystem/assets/css/tailwind.css'
  const expectedId = '@kanton-basel-stadt/designsystem/assets/css/tailwind.css'

  expect(transformIconId(id)).toBe(expectedId)
})
