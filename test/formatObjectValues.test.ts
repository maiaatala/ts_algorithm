import { formatObjectValues } from '../src/utils/formatObjectValues';

import { expect, describe, test } from 'bun:test';

describe('format object values', () => {
  test('should return obejct with value attr', () => {
    expect(
      formatObjectValues({
        ticket_customer: '12313493',
        ticket_number: 1231,
        optional: '',
        optinal2: undefined,
        zero: 0,
      }),
    ).toEqual({
      ticket_customer: {
        value: '12313493',
      },
      ticket_number: {
        value: 1231,
      },
      optional: {
        value: '',
      },
      optinal2: {
        value: null,
      },
      zero: {
        value: 0,
      },
    });
  });
});
