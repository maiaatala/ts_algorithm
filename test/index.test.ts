import { someSum } from '~utils';
import { expect, describe, test } from 'bun:test';

describe('blah', () => {
  test('sum', () => {
    const result = someSum(2, 3);

    expect(result).toEqual(5);
  });
});
