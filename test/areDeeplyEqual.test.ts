import { areDeeplyEqual } from '~utils/areDeeplyEqual';
import { expect, describe, test } from 'bun:test';

describe('deeply equal', () => {
  test('should work with primitive types', () => {
    expect(areDeeplyEqual(1, 1)).toBe(true);
    expect(areDeeplyEqual(1, 2)).toBe(false);
    expect(areDeeplyEqual('a', 'a')).toBe(true);
    expect(areDeeplyEqual('a', 'b')).toBe(false);
    expect(areDeeplyEqual('a', ' a')).toBe(false);
    expect(areDeeplyEqual(true, true)).toBe(true);
    expect(areDeeplyEqual(true, false)).toBe(false);
    expect(areDeeplyEqual(null, null)).toBe(true);
    expect(areDeeplyEqual(null, undefined)).toBe(false);
    expect(areDeeplyEqual(undefined, undefined)).toBe(true);
  });

  test('should work with arrays', () => {
    expect(areDeeplyEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(areDeeplyEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(areDeeplyEqual([1, 2, 3], [1, 2, 3, 4])).toBe(false);
    expect(areDeeplyEqual([1, 2, 3], [1, 3, 2])).toBe(false);
    expect(areDeeplyEqual(['hello', 2, true], ['hello', 2, true])).toBe(true);
  });

  test('should work with objects', () => {
    expect(areDeeplyEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(
      areDeeplyEqual(
        { a: 'hello', b: [1, 2], c: true, d: { hello: 'world' } },
        { a: 'hello', b: [1, 2], c: true, d: { hello: 'world' } },
      ),
    ).toBe(true);
    expect(
      areDeeplyEqual(
        { a: 'hello', b: [1, 2], c: true, d: { hello: 'world' } },
        { a: 'hello', b: [1, 3], c: true, d: { hello: 'world' } },
      ),
    ).toBe(false);
    expect(areDeeplyEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
  });

  test('should work with array of objects', () => {
    expect(areDeeplyEqual([{ a: 1, b: 2 }], [{ a: 1, b: 2 }])).toBe(true);
    expect(areDeeplyEqual([{ a: 1, b: 2 }], [{ a: 1, b: 3 }])).toBe(false);
    expect(
      areDeeplyEqual(
        [{ a: 'hello', b: [1, 2], c: true, d: { hello: 'world' } }],
        [{ a: 'hello', b: [1, 2], c: true, d: { hello: 'world' } }],
      ),
    ).toBe(true);
  });
});
