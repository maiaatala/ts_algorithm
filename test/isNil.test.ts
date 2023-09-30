import { expect, describe, test } from 'bun:test';
import { isNil, objectIsEmpty } from '~utils/is-nil';

describe('testing utils library', () => {
  describe('isNil', () => {
    test('should return false to empty object', () => {
      expect(isNil({})).toBe(false);
    });
  });

  describe('objectIsEmpty', () => {
    test('should return true to empty object', () => {
      expect(objectIsEmpty({})).toBe(true);
    });
  });
});
