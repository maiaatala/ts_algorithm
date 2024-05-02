/**
 * @description Check if any two objects, array or primitive values are deeply equal
 * @param {unknown} obj1 - First object
 * @param {unknown} obj2 - Second object
 * @returns {boolean}
 *
 * @example
 * ```js
 * areDeeplyEqual(1, 1) // true
 * areDeeplyEqual(1, 2) // false
 * areDeeplyEqual({foo:'bar'}, {foo: {bar: 'baz'}}) // false
 *
 * ``
 */
export function areDeeplyEqual(obj1: unknown, obj2: unknown): boolean {
  if (obj1 === obj2) return true;

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;

    return obj1.every((elem, index) => {
      return areDeeplyEqual(elem, obj2[index]);
    });
  }

  if (
    typeof obj1 === 'object' &&
    typeof obj2 === 'object' &&
    obj1 !== null &&
    obj2 !== null
  ) {
    if (Array.isArray(obj1) || Array.isArray(obj2)) return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (!areDeeplyEqual(keys1, keys2)) return false;

    for (const key of keys1) {
      const isEqual = areDeeplyEqual(obj1[key], obj2[key]);
      if (!isEqual) {
        return false;
      }
    }

    return true;
  }

  return false;
}
