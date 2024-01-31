import { reactive } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import { AtQuestionType } from '../../../types';
import { AtFormBuilderBooleanQuestionProps } from '../at_form_builder_boolean_question/types';
import AtFormBuilderLongText from './AtFormBuilderLongText.vue';

export default {
  title: 'Form Builder/AtFormBuilderLongText',
  component: AtFormBuilderLongText,
  decorators: [DefaultDecorator],
};

const AtFormBuilderLongTextStory: Story<AtFormBuilderBooleanQuestionProps> = (
  args: AtFormBuilderBooleanQuestionProps
) => ({
  name: 'AtFormBuilderLongTextStory',
  components: { AtFormBuilderLongText },
  setup() {
    const argsReactive = reactive(args);

    return { argsReactive };
  },
  template: `
      <div style="width: 100%; padding: 50px;">
        <AtFormBuilderLongText v-bind="argsReactive" />
      <pre>{{argsReactive}}</pre>
      </div>`,
});

export const Default = AtFormBuilderLongTextStory.bind({});

Default.args = {
  title: {
    en: 'Whats is the name of the farm?',
  },
  id: '1',
  fieldType: AtQuestionType.LongText,
  settings: {
    required: false,
  },
};
