export const formatObjectValues = <T>(
  unformattedObj: Record<string, T>,
  defaultValue: T | null = null,
): Record<string, Record<'value', T | null>> => {
  const newObj: Record<string, Record<'value', T | null>> = Object.create(null);

  for (const key in unformattedObj) {
    newObj[key] = {
      value: unformattedObj[key] ?? defaultValue,
    };
  }

  return newObj;
};
