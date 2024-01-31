import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import { ButtonSize } from '../at_button/types';
import AtRadiogroupWithLabel from './AtRadiogroupWithLabel.vue';
import { Direction } from './types';

export default {
  title: 'Form/AtRadiogroupWithLabel',
  component: AtRadiogroupWithLabel,
  decorators: [DefaultDecorator],
  argTypes: {
    direction: {
      control: {
        type: 'select',
        options: Object.values(Direction),
      },
    },
    size: {
      control: {
        type: 'select',
        options: Object.values(ButtonSize),
      },
    },
  },
};

const AtRadiogroupWithLabelStory: Story = (args) => ({
  name: 'AtRadiogroupWithLabelStory',
  components: { AtRadiogroupWithLabel },
  setup() {
    const model = ref('1');
    return { args, model };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
    <AtRadiogroupWithLabel v-model="model" v-bind="args" />
  </div>`,
});

export const Default = AtRadiogroupWithLabelStory.bind({});

Default.args = {
  label: 'group label',
  disabled: false,
  required: false,
  options: [
    { text: 'One', value: '1' },
    { text: 'Two', value: '2' },
    { text: 'Three', value: '3' },
    { text: 'Four', value: '4' },
    { text: 'Five', value: '5', disabled: true },
  ],
  name: 'numbers',
  direction: Direction.Inline,
  readonly: false,
  size: 'm',
};
