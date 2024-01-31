import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtCheckBoxGroup from './AtCheckBoxGroup.vue';
import { AtCheckBoxGroupProps, Direction } from './types';

export default {
  title: 'Form/AtCheckBoxGroup',
  component: AtCheckBoxGroup,
  decorators: [DefaultDecorator],
  argTypes: {
    direction: {
      control: {
        options: Object.values(Direction),
        type: 'select',
      },
    },
  },
};

const AtCheckBoxGroupStory: Story<AtCheckBoxGroupProps> = (args) => ({
  name: 'AtCheckBoxGroupStory',
  components: { AtCheckBoxGroup },
  setup() {
    const model = ref([]);

    return { args, model };
  },
  template: `
      <div style="width: 100%; padding: 50px;">
      model - {{model}}
        <AtCheckBoxGroup v-bind="args" v-model="model"/>
      </div>`,
});

export const Default = AtCheckBoxGroupStory.bind({});

Default.args = {
  options: [
    {
      value: '1',
      text: 'option 1',
    },
    {
      value: '2',
      text: 'option 2',
    },
    {
      value: '3',
      text: 'option 3',
    },
    {
      value: '4',
      text: 'option 4',
    },
  ],
  disabled: false,
  name: 'storybook',
  direction: Direction.Inline,
};
