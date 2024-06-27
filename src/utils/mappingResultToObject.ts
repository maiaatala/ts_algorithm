import { AutofillMappingResult, MAPPING_TYPE } from '../types/autofill';

type CheckValidFieldName = (name: string) => boolean;
const defaultCheck: CheckValidFieldName = () => true;

function checkIsNil(value: unknown): value is null | undefined {
  if (Array.isArray(value)) return value.length === 0;
  return value === null || value === undefined;
}

function attributeNestedValue({
  object = {},
  paths,
  value,
}: {
  object: Record<string, unknown> | undefined;
  paths: string[];
  value: unknown;
}): Record<string, unknown> {
  if (checkIsNil(value)) return object;
  if (paths.length === 0) {
    return object;
  }

  if (paths.length === 1) {
    return { ...object, [paths[0]]: value };
  }

  const [key, ...rest] = paths;
  const innerObject = object[key] ?? {};
  return {
    ...object,
    [key]: attributeNestedValue({
      object: innerObject as Record<string, unknown>,
      paths: rest,
      value,
    }),
  };
}

function auxItemBuilder(
  item: AutofillMappingResult['items'][number],
  checkValidFieldName?: CheckValidFieldName,
): [string[], unknown] {
  if (item.type === MAPPING_TYPE.DIRECT) {
    if (checkValidFieldName?.(item.targetField)) return [[], undefined];
    const paths = item.targetField.split('.').filter(Boolean);
    return [paths, item.value];
  }

  if (checkValidFieldName?.(item.targetGroup)) return [[], undefined];
  const groupObject = item.groups.map((group) => auxGroupBuilder(group.items));
  return [[item.targetGroup], groupObject];
}

function auxGroupBuilder(
  items: AutofillMappingResult['items'],
  checkValidFieldName?: CheckValidFieldName,
): Record<string, unknown> {
  const itemsAsObject = items.reduce((acc, item) => {
    const [paths, value] = auxItemBuilder(item, checkValidFieldName);

    return attributeNestedValue({ object: acc, paths, value });
  }, {});

  return itemsAsObject;
}

export function getMappingResultToObject(
  result: AutofillMappingResult[],
  checkValidFieldName: CheckValidFieldName = defaultCheck,
): Record<string, unknown> | undefined {
  const allItems = result.flatMap((mapping) => mapping.items);
  const resultAsObject = auxGroupBuilder(allItems, checkValidFieldName);
  return resultAsObject;
}
