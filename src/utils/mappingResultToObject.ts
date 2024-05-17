import { AutofillMappingResult, MAPPING_TYPE } from '../types/autofill';

function attributeNestedValue({
  object = {},
  paths,
  value,
}: {
  object: Record<string, unknown> | undefined;
  paths: string[];
  value: unknown;
}): Record<string, unknown> {
  const [key, ...rest] = paths;

  if (rest.length === 0) {
    return { ...object, [key]: value };
  }

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
): [string[], unknown] {
  if (item.type === MAPPING_TYPE.DIRECT) {
    const paths = item.targetField.split('.').filter(Boolean);
    return [paths, item.value];
  }

  const groupObject = item.groups.map((group) => auxGroupBuilder(group.items));
  return [[item.targetGroup], groupObject];
}

function auxGroupBuilder(
  items: AutofillMappingResult['items'],
): Record<string, unknown> {
  const itemsAsObject = items.reduce((acc, item) => {
    const [paths, value] = auxItemBuilder(item);

    return attributeNestedValue({ object: acc, paths, value });
  }, {});

  return itemsAsObject;
}

export function getMappingResultToObject(
  result: AutofillMappingResult[],
): Record<string, unknown> {
  const allItems = result.flatMap((mapping) => mapping.items);
  const resultAsObject = auxGroupBuilder(allItems);
  return resultAsObject;
}
