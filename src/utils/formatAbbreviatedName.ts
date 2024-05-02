/**
 * @description Format a long name to show the first and last name with middle names abbreviated
 * @param {string} fullName - Full name to be abbreviated
 * @param {string} defaultText - Default text to be returned if fullName is undefined
 * @param {number} maxAbbreviations - Maximum middle names to be abbreviated
 *
 * @returns {string} - Abbreviated name
 * @example
 * ```js
 * formatAbbreviatedName("ana carolina maia ATALA", "-", 1) // returns "Ana C. Atala"
 * ```
 */
export const formatAbbreviatedName = (
  fullName: string | undefined,
  defaultText = '-',
  maxAbbreviations = 3,
): string => {
  if (!fullName) return defaultText;
  const words = fullName.toLowerCase().split(' ').filter(Boolean);
  const wordsLength = words?.length;

  if (!wordsLength) return defaultText;

  if (wordsLength <= 2)
    return words
      .map((name) => name[0]?.toUpperCase() + (name?.substring(1) || ''))
      .join(' ');
  const lastIndex = wordsLength - 1;
  const abbreviationEndIndex = maxAbbreviations + 1;

  const firstName = words[0][0]?.toUpperCase() + (words[0]?.substring(1) || '');
  const lastName =
    words[lastIndex][0]?.toUpperCase() + (words[lastIndex]?.substring(1) || '');

  const middleNames = words.slice(
    1,
    lastIndex > abbreviationEndIndex ? abbreviationEndIndex : lastIndex,
  );
  const middleAbreviation = middleNames
    .map((name) => name[0]?.toUpperCase())
    .join('. ');

  return `${firstName} ${middleAbreviation}. ${lastName}`;
};
