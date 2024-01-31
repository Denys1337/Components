import { reactive } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import { AtQuestionType } from '../../../types';
import AtFormBuilderNumericQuestion from './AtFormBuilderNumericQuestion.vue';
import { AtFormBuilderNumericQuestionProps } from './types';

export default {
  title: 'Form Builder/AtFormBuilderNumericQuestion',
  component: AtFormBuilderNumericQuestion,
  decorators: [DefaultDecorator],
};

const AtFormBuilderNumericQuestionStory: Story<AtFormBuilderNumericQuestionProps> = (
  args: AtFormBuilderNumericQuestionProps
) => ({
  name: 'AtFormBuilderNumericQuestionStory',
  components: { AtFormBuilderNumericQuestion },
  setup() {
    const argsReactive = reactive(args);

    return { argsReactive };
  },
  template: `
    <div style="width: 100%; padding: 50px;">
    <AtFormBuilderNumericQuestion v-bind="argsReactive" />
    <pre>{{argsReactive}}</pre>
    </div>`,
});

export const Default = AtFormBuilderNumericQuestionStory.bind({});

Default.args = {
  title: {
    en: 'Whats is the name of the farm?',
  },
  id: '1',
  fieldType: AtQuestionType.ShortText,
  settings: {
    required: false,
  },
};
