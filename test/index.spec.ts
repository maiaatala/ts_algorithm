import { someSum } from '~utils';

describe('blah', () => {
  it('sum', () => {
    const result = someSum(2, 3);

    expect(result).toEqual(5);
  });
});
