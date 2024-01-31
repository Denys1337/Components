import { reactive } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import { AtQuestionType } from '../../../types';
import AtFormBuilderShortText from './AtFormBuilderShortText.vue';
import { AtFormBuilderShortTextQuestionProps } from './types';

export default {
  title: 'Form Builder/AtFormBuilderShortText',
  component: AtFormBuilderShortText,
  decorators: [DefaultDecorator],
};

const AtFormBuilderShortTextStory: Story<AtFormBuilderShortTextQuestionProps> = (
  args: AtFormBuilderShortTextQuestionProps
) => ({
  name: 'AtFormBuilderShortTextStory',
  components: { AtFormBuilderShortText },
  setup() {
    const argsReactive = reactive(args);

    return { argsReactive };
  },
  template: `
      <div style="width: 100%; padding: 50px;">
        <AtFormBuilderShortText v-bind="argsReactive" />
      <pre>{{argsReactive}}</pre>
      </div>`,
});

export const Default = AtFormBuilderShortTextStory.bind({});

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
