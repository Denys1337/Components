import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import { AtQuestionType } from '../types';
import AtFormSection from './AtFormSection.vue';
import { AtFormElementType, AtFormSectionType, IAtFormSubSection } from './types';
import { getStackDefaultValues } from './utils';

export default {
  title: 'Dynamic Form/AtFormSection',
  component: AtFormSection,
  decorators: [DefaultDecorator],
};

const AtFormSectionStory: Story = (args) => ({
  name: 'AtFormSectionStory',
  components: { AtFormSection },
  setup() {
    const getDefaultRepeatableStackValue = (section: IAtFormSubSection) => {
      if (args.section.settings.minStack > 0) {
        return [getStackDefaultValues(section.fields)];
      } else {
        return [];
      }
    };

    const value = ref(
      args.section.settings.repeatable
        ? getDefaultRepeatableStackValue(args.section)
        : {
            sub_q1: '',
            sub_q2: '',
          }
    );
    return { args, value };
  },
  template: `
      <div style="width: 100%; padding: 50px;">
        <AtFormSection v-bind="args" v-model="value"/>
      </div>`,
});

export const Default = AtFormSectionStory.bind({});
export const Repeatable = AtFormSectionStory.bind({});
export const NotMandatory = AtFormSectionStory.bind({});

Default.args = {
  questionHierarchyText: '1.0',
  repeatableStackId: 1,
  section: {
    id: 'sub2',
    title: 'sub2',
    sectionType: AtFormSectionType.STACK,
    type: AtFormElementType.Section,
    settings: {
      repeatable: false,
      grouped: false,
    },
    fields: [
      {
        id: 'sub_q1',
        title: 'question1 in subsection',
        fieldType: AtQuestionType.Boolean,
        settings: {
          required: true,
        },
        value: '',
        options: [],
        notes: [],
      },
      {
        id: 'sub_q2',
        title: 'question2 in subsection',
        fieldType: AtQuestionType.Number,
        settings: {
          required: true,
        },
        value: '2',
        options: [],
        notes: [],
      },
    ],
  },
};
Repeatable.args = {
  questionHierarchyText: '1.0',
  section: {
    id: 'sub2',
    title: 'sub2',
    sectionType: AtFormSectionType.STACK,
    type: AtFormElementType.Section,
    settings: {
      repeatable: true,
      grouped: false,
      minStack: 1,
    },
    fields: [
      {
        id: 'sub_q1',
        title: 'question1 in subsection',
        fieldType: AtQuestionType.Boolean,
        settings: {
          required: true,
        },
        value: '',
        options: [],
        notes: [],
      },
      {
        id: 'sub_q2',
        title: 'question2 in subsection',
        fieldType: AtQuestionType.Number,
        settings: {
          required: true,
        },
        value: '2',
        options: [],
        notes: [],
      },
    ],
  },
};

NotMandatory.args = {
  questionHierarchyText: '1.0',
  section: {
    id: 'sub2',
    title: 'sub2',
    sectionType: AtFormSectionType.STACK,
    type: AtFormElementType.Section,
    settings: {
      repeatable: true,
      minStack: 0,
      grouped: false,
    },
    fields: [
      {
        id: 'sub_q1',
        title: 'question1 in subsection',
        fieldType: AtQuestionType.Boolean,
        settings: {
          required: true,
        },
        value: '',
        options: [],
        notes: [],
      },
      {
        id: 'sub_q2',
        title: 'question2 in subsection',
        fieldType: AtQuestionType.Number,
        settings: {
          required: true,
        },
        value: '2',
        options: [],
        notes: [],
      },
    ],
  },
};
