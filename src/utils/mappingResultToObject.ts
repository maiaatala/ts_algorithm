import {
  IterativeItem,
  DirectItem,
  AutofillMappingResult,
  MAPPING_TYPE,
} from '../types/autofill';

function auxItemBuilder(
  item: IterativeItem | DirectItem,
  prefix = '',
): Record<string, unknown> {
  if (item.type === MAPPING_TYPE.DIRECT) {
    return {
      [`${prefix}${item.targetField}`]: item.value,
    };
  }

  const groupObject = item.groups.reduce((acc, group, idx) => {
    const result = auxRecursiveGroupItemBuilder(
      group.items,
      `${prefix}${item.targetGroup}[${idx}].`,
    );
    return { ...acc, ...result };
  }, {});

  return groupObject;
}

function auxRecursiveGroupItemBuilder(
  items: (IterativeItem | DirectItem)[],
  prefix = '',
): Record<string, unknown> {
  const itemsAsObject = items.reduce((acc, item) => {
    const result = auxItemBuilder(item, prefix);
    return { ...acc, ...result };
  }, {});

  return itemsAsObject;
}

export function getMappingResultToObject(
  result: AutofillMappingResult[],
): Record<string, unknown> {
  const allItems = result.flatMap((mapping) => mapping.items);
  return auxRecursiveGroupItemBuilder(allItems);
}
