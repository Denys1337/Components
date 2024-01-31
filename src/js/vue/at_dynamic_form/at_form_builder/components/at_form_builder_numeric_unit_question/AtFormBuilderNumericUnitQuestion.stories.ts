import { reactive } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import { AtQuestionType } from '../../../types';
import AtFormBuilderNumericUnitQuestion from './AtFormBuilderNumericUnitQuestion.vue';
import { AtFormBuilderNumericUnitQuestionProps } from './types';

export default {
  title: 'Form Builder/AtFormBuilderNumericUnitQuestion',
  component: AtFormBuilderNumericUnitQuestion,
  decorators: [DefaultDecorator],
};

const AtFormBuilderNumericUnitQuestionStory: Story<AtFormBuilderNumericUnitQuestionProps> = (
  args: AtFormBuilderNumericUnitQuestionProps
) => ({
  name: 'AtFormBuilderNumericUnitQuestionStory',
  components: { AtFormBuilderNumericUnitQuestion },
  setup() {
    const argsReactive = reactive(args);

    return { argsReactive };
  },
  template: `
    <div style="width: 100%; padding: 50px;">
    <AtFormBuilderNumericUnitQuestion v-bind="argsReactive" />
    <pre>{{argsReactive}}</pre>
    </div>`,
});

export const Default = AtFormBuilderNumericUnitQuestionStory.bind({});

Default.args = {
  title: {
    en: 'Whats is the name of the farm?',
  },
  id: '1',
  fieldType: AtQuestionType.ShortText,
  settings: {
    required: false,
  },
  unitOptionGroups: [
    {
      title: '1',
      options: [
        {
          text: '111',
          value: '111',
        },
        {
          text: '222',
          value: '222',
        },
        {
          text: '333',
          value: '333',
        },
      ],
    },
    {
      title: '2',
      options: [
        {
          text: '2111',
          value: '2111',
        },
        {
          text: '2222',
          value: '2222',
        },
        {
          text: '2333',
          value: '2333',
        },
      ],
    },
  ],
};
