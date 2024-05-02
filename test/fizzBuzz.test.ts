import { expect, describe, test } from 'bun:test';

describe('FizzBuzz test', () => {
  test('When given a number N, returns array from 1 to number N', () => {
    const N = 2;
    const expectedResult = [1, 2];

    const actual = fizzBuzz(N);

    expect(actual).toEqual(expectedResult);
  });
});
