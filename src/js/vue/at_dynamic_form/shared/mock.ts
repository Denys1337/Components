import { UnitGroupOptionsModel } from '../at_form_builder/popups/at_form_builder_unit_popup/types';
import { AtFormBuilderSection, AtFormBuilderSectionType } from '../at_form_builder/types';
import { AtQuestionType } from '../types';

export const formBuilderSections: AtFormBuilderSection[] = [
  {
    id: 'farmSection',
    fields: [
      {
        id: 'feed_type',
        fieldType: AtQuestionType.LongText,
        title: {
          en: 'feed type',
        },
        settings: {
          required: false,
        },
      },
      {
        id: 'soil_texture_id',
        fieldType: AtQuestionType.Number,
        title: {
          en: 'soil_texture_id',
        },
        settings: {
          required: false,
        },
      },
    ],
    sectionType: AtFormBuilderSectionType.Normal,
    title: {
      en: 'Farm',
    },
    sections: [
      {
        id: 'farm',
        externalGroupId: '1',
        sectionType: AtFormBuilderSectionType.SUBSECTION,
        title: {
          en: 'Farm stack',
        },
        settings: {
          grouped: true,
          repeatable: false,
          minStack: 0,
          maxStack: null,
        },
        fields: [
          {
            id: 'country',
            fieldType: AtQuestionType.Select,
            options: [
              {
                value: 'United States of America',
                label: {
                  en: 'United States of America',
                },
              },
              {
                value: 'Bulgaria',
                label: {
                  en: 'Bulgaria',
                },
              },
            ],
            title: {
              en: 'Country',
            },
            settings: {
              required: false,
            },
          },
        ],
      },
    ],
  },
  {
    id: 'Chemicals',
    sections: [
      {
        id: 'pesticides',
        externalGroupId: '1',
        fields: [
          {
            id: 'type_id',
            fieldType: AtQuestionType.Select,
            options: [
              {
                value: '1',
                label: {
                  en: 'pesticide',
                },
              },
              {
                value: '2',
                label: {
                  en: 'fungicide',
                },
              },
              {
                value: '3',
                label: {
                  en: 'herbicide',
                },
              },
              {
                value: '4',
                label: {
                  en: 'insecticide',
                },
              },
            ],
            title: {
              en: 'type_id',
            },
            settings: {
              required: false,
            },
          },
          {
            id: 'category_id',
            fieldType: AtQuestionType.Select,
            options: [
              {
                value: '1',
                label: {
                  en: 'seed_treatment',
                },
              },
              {
                value: '2',
                label: {
                  en: 'soil_treatment',
                },
              },
              {
                value: '3',
                label: {
                  en: 'post_emergence',
                },
              },
            ],
            title: {
              en: 'category_id',
            },
            settings: {
              required: false,
            },
          },
          {
            id: 'percentage_rate',
            fieldType: AtQuestionType.Number,
            title: {
              en: 'percentage_rate',
            },
            settings: {
              required: false,
            },
          },
          {
            id: 'pesticide_application_rate',
            fieldType: AtQuestionType.UnitNumeric,
            options: [
              {
                value: 'KILOGRAM_PER_HECTARE',
                label: {
                  en: 'KILOGRAM_PER_HECTARE',
                },
              },
              {
                value: 'KILOGRAM_PER_SQUARE_METER',
                label: {
                  en: 'KILOGRAM_PER_SQUARE_METER',
                },
              },
            ],
            title: {
              en: 'pesticide_application_rate',
            },
            settings: {
              required: false,
            },
          },
        ],
        sectionType: AtFormBuilderSectionType.SUBSECTION,
        title: {
          en: 'pesticides',
        },
        settings: {
          grouped: true,
          repeatable: true,
          maxStack: null,
          minStack: 1,
        },
      },
      {
        id: 'fertilisers',
        externalGroupId: '1',
        fields: [
          {
            id: 'fertiliser_type',
            fieldType: AtQuestionType.Select,
            options: [
              {
                value: '44',
                label: {
                  en: 'Compose your own NPK',
                },
              },
              {
                value: '43',
                label: {
                  en: 'Ammonium chloride - 25% N',
                },
              },
            ],
            title: {
              en: 'fertiliser_type',
            },
            settings: {
              required: false,
            },
          },
          {
            id: 'production',
            fieldType: AtQuestionType.Select,
            options: [
              {
                value: '9',
                label: {
                  en: 'N America 2014',
                },
              },
              {
                value: '8',
                label: {
                  en: 'Europe 2014',
                },
              },
            ],
            title: {
              en: 'production',
            },
            settings: {
              required: false,
            },
          },
          {
            id: 'custom_n_total_percentage',
            fieldType: AtQuestionType.Number,
            title: {
              en: 'custom_n_total_percentage',
            },
            settings: {
              required: false,
            },
          },
        ],
        sectionType: AtFormBuilderSectionType.SUBSECTION,
        title: {
          en: 'fertilisers',
        },
        settings: {
          grouped: true,
          repeatable: true,
          minStack: 0,
          maxStack: null,
        },
      },
    ],
    fields: [],
    sectionType: AtFormBuilderSectionType.Normal,
    title: {
      en: 'Chemicals',
    },
  },
];
export const unitOptionGroupsMock: UnitGroupOptionsModel[] = [
  {
    groupTitle: 'first group',
    options: [
      {
        label: { en: 'first group 1' },
        value: '11',
      },
      {
        label: { en: 'first group 2' },
        value: '12',
      },
    ],
  },
  {
    groupTitle: 'second group',
    options: [
      {
        label: { en: 'second group 1' },
        value: '21',
      },
      {
        label: { en: 'second group 2' },
        value: '22',
      },
    ],
  },
];
