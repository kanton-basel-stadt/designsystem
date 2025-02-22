import { expect, it } from 'vitest'
import toPascalCase from '../../../../src/core/utils/toPascalCase.ts'

it('should convert snake_case to PascalCase', () => {
  expect(toPascalCase('hello_world')).toBe('HelloWorld')
  expect(toPascalCase('this_is_a_test')).toBe('ThisIsATest')
})

it('should convert kebab-case to PascalCase', () => {
  expect(toPascalCase('hello-world')).toBe('HelloWorld')
  expect(toPascalCase('this-is-a-test')).toBe('ThisIsATest')
})

it('should convert mixed separators to PascalCase', () => {
  expect(toPascalCase('hello_world-test')).toBe('HelloWorldTest')
  expect(toPascalCase('this-is_a test')).toBe('ThisIsATest')
})

it('should handle spaces correctly', () => {
  expect(toPascalCase('hello world')).toBe('HelloWorld')
  expect(toPascalCase('  leading and trailing spaces  ')).toBe('LeadingAndTrailingSpaces')
})

it('should handle empty and whitespace-only strings', () => {
  expect(toPascalCase('')).toBe('')
  expect(toPascalCase('   ')).toBe('')
})

it('should handle single words', () => {
  expect(toPascalCase('hello')).toBe('Hello')
  expect(toPascalCase('WORLD')).toBe('World')
})

it('should handle already PascalCase input', () => {
  expect(toPascalCase('PascalCase')).toBe('PascalCase')
  expect(toPascalCase('AlreadyCorrect')).toBe('AlreadyCorrect')
})
