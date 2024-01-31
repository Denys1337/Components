import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import { AtFormBuilderSectionType } from '../../types';
import AtFormBuilderStack from './AtFormBuilderStack.vue';

export default {
  title: 'Form Builder/Components/AtFormBuilderStack',
  component: AtFormBuilderStack,
  decorators: [DefaultDecorator],
};

const AtFormBuilderStackStory: Story = (args) => ({
  name: 'AtFormBuilderStackStory',
  components: { AtFormBuilderStack },
  setup() {
    return { args };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
    <AtFormBuilderStack v-bind="args" />
  </div>`,
});

export const Default = AtFormBuilderStackStory.bind({});

Default.args = {
  title: { en: 'Stack name' },
  fields: [],
  questionTypeComponentMap: {},
  questionMenuList: [],
  id: '123',
  translationPath: '',
  modelValue: {
    id: 'id',
    title: { en: 'Title' },
    fields: [],
  },
  sectionType: AtFormBuilderSectionType.SUBSECTION,
  settings: {
    repeatable: true,
    grouped: true,
  },
};
