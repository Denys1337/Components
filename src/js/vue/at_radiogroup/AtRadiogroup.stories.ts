import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import { ButtonSize } from '../at_button/types';
import AtRadiogroup from './AtRadiogroup.vue';
import { Direction } from './types';

export default {
  title: 'Form/AtRadiogroup',
  component: AtRadiogroup,
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

const AtRadiogroupStory: Story = (args) => ({
  name: 'AtRadiogroupStory',
  components: { AtRadiogroup },
  setup() {
    const model = ref('1');
    return { args, model };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
    <AtRadiogroup v-model="model" v-bind="args" />
  </div>`,
});

export const Default = AtRadiogroupStory.bind({});

Default.args = {
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
