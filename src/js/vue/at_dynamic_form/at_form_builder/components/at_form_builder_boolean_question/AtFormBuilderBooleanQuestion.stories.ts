import { reactive } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import { MenuItemTypes } from '../../../../at_menu/types';
import { AtQuestionType } from '../../../types';
import AtFormBuilderBooleanQuestion from './AtFormBuilderBooleanQuestion.vue';
import { AtFormBuilderBooleanQuestionProps } from './types';

export default {
  title: 'Form Builder/AtFormBuilderBooleanQuestion',
  component: AtFormBuilderBooleanQuestion,
  decorators: [DefaultDecorator],
};

const AtFormBuilderBooleanQuestionStory: Story<AtFormBuilderBooleanQuestionProps> = (
  args: AtFormBuilderBooleanQuestionProps
) => ({
  name: 'AtFormBuilderBooleanQuestionStory',
  components: { AtFormBuilderBooleanQuestion },
  setup() {
    const argsReactive = reactive(args);

    return { argsReactive };
  },
  template: `
      <div style="width: 100%; padding: 50px;">
        <AtFormBuilderBooleanQuestion v-bind="argsReactive" v-model="argsReactive"/>
        <pre>{{ argsReactive }}</pre>
      </div>`,
});

export const Default = AtFormBuilderBooleanQuestionStory.bind({});

Default.args = {
  title: {
    en: 'Is accommodation offered on site to workers and their families?',
  },
  id: '1',
  fieldType: AtQuestionType.Boolean,
  settings: {
    required: false,
  },
  questionMenuList: [
    {
      label: 'rename',
      name: 'edit',
      type: MenuItemTypes.Regular,
    },
    {
      label: 'delete',
      name: 'delete question',
      type: MenuItemTypes.Critical,
    },
  ],
};
