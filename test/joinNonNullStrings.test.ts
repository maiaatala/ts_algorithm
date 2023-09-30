import { expect, describe, test } from 'bun:test';
import { joinNonNullStrings } from '~utils/joinNonNullStrings';

describe('testing utils library', () => {
  describe('joinNonNullStrings', () => {
    test('return a concat of all strings that arent null or empty', () => {
      expect(joinNonNullStrings('one', '', 'three', null, ' ', 'four')).toBe(
        'one three four',
      );
    });
  });
});
