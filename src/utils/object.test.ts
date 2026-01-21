import { it } from 'vitest';

import { isObjectEmpty, isEqualsByKeys } from './object';

describe('Object util tests', () => {
  describe('Is Object Empty', () => {
    it('should success check empty object', () => {
      const emptyObject = {};
      expect(isObjectEmpty(emptyObject)).toBe(true);
    });
    it('should return false for not empty object', () => {
      const nonEmptyObject = { key: 'value' };
      expect(isObjectEmpty(nonEmptyObject)).toBe(false);
    });
  });
  describe('Is Equals By Keys', () => {
    it('returns true for equal primitive values', () => {
      const obj1 = { a: 1, b: 'test' };
      const obj2 = { a: 1, b: 'test' };

      expect(isEqualsByKeys(obj1, obj2, [ 'a', 'b' ])).toBe(true);
    });
    it('returns false for different primitive values', () => {
      const obj1 = { a: 1 };
      const obj2 = { a: 2 };

      expect(isEqualsByKeys(obj1, obj2, [ 'a' ])).toBe(false);
    });
    it('ignores keys that are not passed', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, b: 999 };

      expect(isEqualsByKeys(obj1, obj2, [ 'a' ])).toBe(true);
    });
    it('compares arrays of objects by their keys', () => {
      const obj1 = {
        items: [ { id: 1, name: 'A' } ]
      };

      const obj2 = {
        items: [ { id: 1, name: 'A' } ]
      };

      expect(isEqualsByKeys(obj1, obj2, [ 'items' ])).toBe(true);
    });
  });
});
