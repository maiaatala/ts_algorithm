export type AutofillMappingResult = {
  id: string;
  items: (IterativeItem | DirectItem)[];
};

export enum MAPPING_TYPE {
  'DIRECT' = 'DIRECT',
  'ITERATIVE' = 'ITERATIVE',
}

export type IterativeItem = {
  type: MAPPING_TYPE.ITERATIVE;
  targetGroup: string;
  groups: {
    items: (IterativeItem | DirectItem)[];
  }[];
};

export type DirectItem = {
  type: MAPPING_TYPE.DIRECT;
  id: string;
  targetField: string;
  value: unknown;
};
