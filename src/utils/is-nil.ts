/**
 * @param val
 * @returns `true` if `val` is `null` or `undefined`
 */
export const isNil = (val: unknown): val is null | undefined =>
  val == undefined;

/**
 * @param val
 * @returns `true` if `val` is strictly equal to `null`
 */
export const isNull = (val: unknown): val is null => val === null;

/**
 * @param val
 * @returns `true` if `val` is strictly equal to `undefined`
 */
export const isUndef = (val: unknown): val is undefined =>
  typeof val === 'undefined';

/**
 * @param val
 * @returns `true` if `val` is not `null` or `undefined`
 */
export const exists = (
  val: unknown,
): val is Exclude<typeof val, null | undefined> => val != undefined;

/**
 * @param val
 * @returns `true` if `val` an empty object
 */
export const objectIsEmpty = (val: unknown): boolean => {
  if (typeof val === 'object' && val !== null) {
    if (Object.keys(val).length === 0) {
      return true;
    }
  }
  return false;
};
