import { reactive } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import { AtQuestionType } from '../../../types';
import AtFormBuilderSelect from './AtFormBuilderSelect.vue';
import { AtFormBuilderSelectQuestionProps } from './types';

export default {
  title: 'Form Builder/AtFormBuilderSelect',
  component: AtFormBuilderSelect,
  decorators: [DefaultDecorator],
};

const AtFormBuilderSelectStory: Story<AtFormBuilderSelectQuestionProps> = (
  args: AtFormBuilderSelectQuestionProps
) => ({
  name: 'AtFormBuilderSelectStory',
  components: { AtFormBuilderSelect },
  setup() {
    const argsReactive = reactive(args);

    return { argsReactive };
  },
  template: `
      <div style="width: 100%; padding: 50px;">
        <AtFormBuilderSelect v-bind="argsReactive" v-model="argsReactive"/>
      <pre>{{argsReactive}}</pre>
      </div>`,
});

export const Default = AtFormBuilderSelectStory.bind({});
export const MultiSelect = AtFormBuilderSelectStory.bind({});

Default.args = {
  title: {
    en: 'Whats is the name of the farm?',
  },
  id: '1',
  fieldType: AtQuestionType.Select,
  settings: {
    required: false,
  },
};

MultiSelect.args = {
  title: {
    en: 'Whats is the name of the farm?',
  },
  id: '1',
  fieldType: AtQuestionType.MultiSelect,
  settings: {
    required: false,
  },
};
