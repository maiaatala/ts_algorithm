import { expect, describe, test } from 'bun:test';
import { fizzBuzz } from '../src/tdd/fizzBuzz';

describe('FizzBuzz test', () => {
  test('When given a number N, returns array from 1 to number N', () => {
    const N = 2;
    const expectedResult = [1, 2];

    const actual = fizzBuzz(N);

    expect(actual).toEqual(expectedResult);
  });

  test("If the number in the array is divisible by 3, replace the number with 'Fizz'", () => {
    const N = 4;
    const expectedResult = [1, 2, 'Fizz', 4];

    const actual = fizzBuzz(N);

    expect(actual).toEqual(expectedResult);
  });

  test("If the number in the array is divisible by 5, replace the number with 'Buzz'", () => {
    const N = 5;
    const expectedResult = [1, 2, 'Fizz', 4, 'Buzz'];

    const actual = fizzBuzz(N);

    expect(actual).toEqual(expectedResult);
  });

  test("If the number in the array is divisible by both 3 and 5, replace the number with 'FizzBuzz'", () => {
    const N = 15;
    const expectedResult = [
      1,
      2,
      'Fizz',
      4,
      'Buzz',
      'Fizz',
      7,
      8,
      'Fizz',
      'Buzz',
      11,
      'Fizz',
      13,
      14,
      'FizzBuzz',
    ];

    const actual = fizzBuzz(N);

    expect(actual).toEqual(expectedResult);
  });
});
