import { expect, describe, test } from 'bun:test';
import { getMappingResultToObject } from '../src/utils/mappingResultToFieldNames';
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
            targetField:
              'documentregisterrequest_userInputData_issuer.legalName',
            value: 'nome fantasia',
          },
        ],
      },
    ] as AutofillMappingResult[];

    const actual = getMappingResultToObject(mapping);

    expect(actual).toEqual({
      'documentregisterrequest_userInputData_issuer.legalName': 'nome fantasia',
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
                ],
              },
            ],
          },
        ],
      },
    ] as AutofillMappingResult[];

    const actual = getMappingResultToObject(mapping);

    expect(actual).toEqual({
      'debtors[0].legalName': 'legalName1',
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
      'debtors[0].legalName': 'legalName1',
      'debtors[0].information[0].experience': 'Primeira empresa',
      'debtors[0].information[0].tempo': 3,
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
      'debtors[0].legalName': 'legalName1',
      'debtors[0].information[0].experience': 'Primeira empresa',
      'debtors[0].information[0].tempo': 3,
      'debtors[0].information[1].experience': 'Segunda empresa',
      'debtors[0].information[1].tempo': 5,
      'debtors[1].legalName': 'Batata assada',
      'debtors[1].information[0].experience': 'McDonalds',
      'debtors[1].information[0].tempo': 1,
    });
  });

  test('should work for mock', () => {
    const actual = getMappingResultToObject(
      mockedMapping as AutofillMappingResult[],
    );

    expect(actual).toEqual({
      'guarantors[0].email': 'email1@example.com',
      'guarantors[0].zipCode': '78200000',
      'guarantors[0].type': 'type1',
      'guarantors[0].personType': 'fisica',
      'guarantors[1].email': 'email2@example.com',
      'guarantors[1].zipCode': '78200001',
      'guarantors[1].type': 'type2',
      'guarantors[1].personType': 'juridica',
      'debtors[0].legalName': 'legalName1',
      'debtors[1].legalName': 'legalName2',
    });
  });
});
