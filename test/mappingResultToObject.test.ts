import { expect, describe, test } from 'bun:test';
import { getMappingResultToObject } from '../src/utils/mappingResultToObject';
import { AutofillMappingResult, MAPPING_TYPE } from '../src/types/autofill';

import mockedMapping from '../src/mocks/mappingResult.json';

describe('get mapping result as object', () => {
  test('should work for direct mapping', () => {
    const mapping = [
      {
        id: 'b7a6915c-f3aa-41ec-bd34-08a5360bcad5',
        items: [
          {
            type: MAPPING_TYPE.DIRECT,
            id: 'c052ddd2-cde5-4aad-8ca8-bf94052c15ff',
            targetField: 'issuer.legalName',
            value: 'nome fantasia',
          },
        ],
      },
    ] as AutofillMappingResult[];

    const actual = getMappingResultToObject(mapping);

    expect(actual).toEqual({
      issuer: {
        legalName: 'nome fantasia',
      },
    });
  });

  test('should work for direct mapping', () => {
    const mapping = [
      {
        id: 'b7a6915c-f3aa-41ec-bd34-08a5360bcad5',
        items: [
          {
            type: MAPPING_TYPE.DIRECT,
            id: 'c052ddd2-cde5-4aad-8ca8-bf94052c15ff',
            targetField: 'issuer.legalName',
            value: 'nome fantasia',
          },
          {
            type: MAPPING_TYPE.DIRECT,
            id: 'c052ddd2-cde5-4aad-8ca8-bf94052c15ff',
            targetField: 'issuer.text',
            value: 'some text',
          },
          {
            type: MAPPING_TYPE.DIRECT,
            id: 'c052ddd2-cde5-4aad-8ca8-bf94052c15ff',
            targetField: 'issuer.number',
            value: 55,
          },
          {
            type: MAPPING_TYPE.DIRECT,
            id: 'c052ddd2-cde5-4aad-8ca8-bf94052c15ff',
            targetField: 'issuer.address',
            value: {
              street: 'rua',
              number: 5,
            },
          },
        ],
      },
    ] as AutofillMappingResult[];

    const actual = getMappingResultToObject(mapping);

    expect(actual).toEqual({
      issuer: {
        legalName: 'nome fantasia',
        text: 'some text',
        number: 55,
        address: {
          street: 'rua',
          number: 5,
        },
      },
    });
  });

  test('should work for indirect mapping', () => {
    const mapping = [
      {
        id: 'b7a6915c-f3aa-41ec-bd34-08a5360bcad5',
        items: [
          {
            type: 'ITERATIVE',
            targetGroup: 'debtors',
            groups: [
              {
                items: [
                  {
                    type: MAPPING_TYPE.DIRECT,
                    targetField: 'legalName',
                    value: 'legalName1',
                    id: '8ce1fcce-822d-4ada-8834-19051bdf7129',
                  },
                  {
                    type: MAPPING_TYPE.DIRECT,
                    id: 'c052ddd2-cde5-4aad-8ca8-bf94052c15ff',
                    targetField: 'issuer.number',
                    value: 55,
                  },
                  {
                    type: MAPPING_TYPE.DIRECT,
                    id: 'c052ddd2-cde5-4aad-8ca8-bf94052c15ff',
                    targetField: 'issuer.address',
                    value: {
                      street: 'rua',
                      number: 5,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ] as AutofillMappingResult[];

    const actual = getMappingResultToObject(mapping);

    expect(actual).toEqual({
      debtors: [
        {
          legalName: 'legalName1',
          issuer: {
            number: 55,
            address: {
              street: 'rua',
              number: 5,
            },
          },
        },
      ],
    });
  });

  test('should work for nested indirect mapping', () => {
    const mapping = [
      {
        id: 'b7a6915c-f3aa-41ec-bd34-08a5360bcad5',
        items: [
          {
            type: 'ITERATIVE',
            targetGroup: 'debtors',
            groups: [
              {
                items: [
                  {
                    type: MAPPING_TYPE.DIRECT,
                    targetField: 'legalName',
                    value: 'legalName1',
                    id: '8ce1fcce-822d-4ada-8834-19051bdf7129',
                  },
                  {
                    type: MAPPING_TYPE.ITERATIVE,
                    targetGroup: 'information',
                    groups: [
                      {
                        items: [
                          {
                            type: MAPPING_TYPE.DIRECT,
                            targetField: 'experience',
                            value: 'Primeira empresa',
                            id: '8ce1fcce-822d-4ada-8834-19051bdf7129',
                          },
                          {
                            type: MAPPING_TYPE.DIRECT,
                            targetField: 'tempo',
                            value: 3,
                            id: '8ce1fcce-822d-4ada-8834-19051bdf7129',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ] as AutofillMappingResult[];

    const actual = getMappingResultToObject(mapping);

    expect(actual).toEqual({
      debtors: [
        {
          legalName: 'legalName1',
          information: [
            {
              experience: 'Primeira empresa',
              tempo: 3,
            },
          ],
        },
      ],
    });
  });

  test('should work for really nested indirect mapping', () => {
    const mapping = [
      {
        id: 'b7a6915c-f3aa-41ec-bd34-08a5360bcad5',
        items: [
          {
            type: 'ITERATIVE',
            targetGroup: 'debtors',
            groups: [
              {
                items: [
                  {
                    type: MAPPING_TYPE.DIRECT,
                    targetField: 'legalName',
                    value: 'legalName1',
                    id: '8ce1fcce-822d-4ada-8834-19051bdf7129',
                  },
                  {
                    type: MAPPING_TYPE.ITERATIVE,
                    targetGroup: 'information',
                    groups: [
                      {
                        items: [
                          {
                            type: MAPPING_TYPE.DIRECT,
                            targetField: 'experience',
                            value: 'Primeira empresa',
                            id: '8ce1fcce-822d-4ada-8834-19051bdf7129',
                          },
                          {
                            type: MAPPING_TYPE.DIRECT,
                            targetField: 'tempo',
                            value: 3,
                            id: '8ce1fcce-822d-4ada-8834-19051bdf7129',
                          },
                        ],
                      },
                      {
                        items: [
                          {
                            type: MAPPING_TYPE.DIRECT,
                            targetField: 'experience',
                            value: 'Segunda empresa',
                            id: '8ce1fcce-822d-4ada-8834-19051bdf7129',
                          },
                          {
                            type: MAPPING_TYPE.DIRECT,
                            targetField: 'tempo',
                            value: 5,
                            id: '8ce1fcce-822d-4ada-8834-19051bdf7129',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                items: [
                  {
                    type: MAPPING_TYPE.DIRECT,
                    targetField: 'legalName',
                    value: 'Batata assada',
                    id: '8ce1fcce-822d-4ada-8834-19051bdf7129',
                  },
                  {
                    type: MAPPING_TYPE.ITERATIVE,
                    targetGroup: 'information',
                    groups: [
                      {
                        items: [
                          {
                            type: MAPPING_TYPE.DIRECT,
                            targetField: 'experience',
                            value: 'McDonalds',
                            id: '8ce1fcce-822d-4ada-8834-19051bdf7129',
                          },
                          {
                            type: MAPPING_TYPE.DIRECT,
                            targetField: 'tempo',
                            value: 1,
                            id: '8ce1fcce-822d-4ada-8834-19051bdf7129',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ] as AutofillMappingResult[];

    const actual = getMappingResultToObject(mapping);

    expect(actual).toEqual({
      debtors: [
        {
          legalName: 'legalName1',
          information: [
            {
              experience: 'Primeira empresa',
              tempo: 3,
            },
            {
              experience: 'Segunda empresa',
              tempo: 5,
            },
          ],
        },
        {
          legalName: 'Batata assada',
          information: [
            {
              experience: 'McDonalds',
              tempo: 1,
            },
          ],
        },
      ],
    });
  });

  test('should work for mock', () => {
    const actual = getMappingResultToObject(
      mockedMapping as AutofillMappingResult[],
    );

    expect(actual).toEqual({
      guarantors: [
        {
          email: 'email1@example.com',
          zipCode: '78200000',
          type: 'type1',
          personType: 'fisica',
        },
        {
          email: 'email2@example.com',
          zipCode: '78200001',
          type: 'type2',
          personType: 'juridica',
        },
      ],
      debtors: [
        {
          legalName: 'legalName1',
        },

        {
          legalName: 'legalName2',
        },
      ],
    });
  });

  test('should work for empty mappings', () => {
    const mapping = [
      {
        id: 'b7a6915c-f3aa-41ec-bd34-08a5360bcad5',
        items: [
          {
            type: 'ITERATIVE',
            targetGroup: 'guarantors',
            groups: [],
          },
          {
            type: 'ITERATIVE',
            targetGroup: 'debtors',
            groups: [],
          },
          {
            type: 'DIRECT',
            id: '7bb7eb4a-075c-40e5-bf24-6eb22b84ab91',
            targetField: 'issuer.legalName',
          },
          {
            type: 'DIRECT',
            id: '1735a5d0-53b5-4eda-80e0-85c62bda1e3a',
            targetField: 'issuer.personType',
          },
          {
            type: 'DIRECT',
            id: 'a53f0ebe-11c4-4299-bbd8-e16dbc9d5f36',
            targetField: 'issuer.legalStatus',
          },
        ],
      },
    ];

    const actual = getMappingResultToObject(mapping as AutofillMappingResult[]);

    expect(actual).toEqual({});
  });
});
