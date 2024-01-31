import { reactive } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import { MenuItemTypes } from '../../../at_menu/types';
import { AtQuestionType } from '../../types';
import { AtFormBuilderProps, AtFormBuilderSectionType } from '../types';
import AtFormBuilder from './AtFormBuilder.vue';

export default {
  title: 'Form Builder/AtFormBuilder',
  component: AtFormBuilder,
  decorators: [DefaultDecorator],
};

const AtFormBuilderStory: Story<AtFormBuilderProps> = (args: AtFormBuilderProps) => ({
  name: 'AtFormBuilderStory',
  components: { AtFormBuilder },
  setup() {
    const argsReactive = reactive(args);

    return { argsReactive };
  },
  template: `
    <div style="width: 100%; padding: 50px;">
    <AtFormBuilder v-bind="argsReactive" v-model="argsReactive.selectedSection">
      <template #empty-state>
        <h2>empty state</h2>
      </template>
      
      <template #add-question>
        <h2>add question state</h2>
      </template>
    </AtFormBuilder>
    </div>`,
});

export const Default = AtFormBuilderStory.bind({});

Default.args = {
  questionMenuList: [
    { label: 'Edit', name: 'edit', type: MenuItemTypes.Regular },
    { label: 'Delete', name: 'delete', type: MenuItemTypes.Critical },
  ],
  sections: [
    {
      id: 's1',
      title: {
        en: 'section 1 title',
      },
      fields: [],
      sectionType: AtFormBuilderSectionType.Normal,
    },
    {
      id: 's3',
      title: {
        en: 'section 1 title',
      },
      fields: [],
      sectionType: AtFormBuilderSectionType.Normal,
      sections: [
        {
          id: 's4',
          title: {
            en: 'Stack 1 title',
          },
          fields: [],
          sectionType: AtFormBuilderSectionType.SUBSECTION,
          settings: {
            repeatable: true,
            grouped: true,
            minStack: 0,
            maxStack: null,
          },
          externalGroupId: '1',
        },
      ],
    },
    {
      id: 's3',
      sectionType: AtFormBuilderSectionType.Normal,
      title: {
        en: 'section 1 title',
      },
      fields: [],
      sections: [
        {
          id: 's4',
          title: {
            en: 'Stack 1 title',
          },
          fields: [],
          sectionType: AtFormBuilderSectionType.SUBSECTION,
          externalGroupId: '12',
          settings: {
            minStack: 0,
            maxStack: null,
            repeatable: true,
            grouped: true,
          },
        },
      ],
    },
  ],
  selectedSection: {
    id: 's2',
    title: {
      en: 'selected section title',
    },
    sectionType: AtFormBuilderSectionType.Normal,
    fields: [
      {
        id: 'q1',
        title: {
          en: 'question 1 title',
        },
        fieldType: AtQuestionType.Boolean,
        settings: {
          required: false,
        },
      },
      {
        id: 'q2',
        title: {
          en: 'question 2 title',
        },
        fieldType: AtQuestionType.ShortText,
        settings: {
          required: true,
        },
      },
      {
        id: 'q3',
        title: {
          en: 'question 3 title',
        },
        fieldType: AtQuestionType.LongText,
        settings: {
          required: true,
        },
      },
      {
        id: 'q4',
        title: {
          en: 'question 4 title',
        },
        fieldType: AtQuestionType.Select,
        settings: {
          required: true,
        },
      },
      {
        id: 'q5',
        title: {
          en: 'question 5 title',
        },
        fieldType: AtQuestionType.MultiSelect,
        settings: {
          required: true,
        },
      },
    ],
  },
};
