import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import BadgeCell from './BadgeCell.vue';
import { BadgeCellProps } from './types';

export default {
  title: 'Table/Cells/BadgeCell',
  component: BadgeCell,
  decorators: [DefaultDecorator],
};

const BadgeCellStory: Story<BadgeCellProps> = (args) => ({
  name: 'BadgeCellStory',
  components: { BadgeCell },
  setup() {
    return { args };
  },
  template: `
  <div style="width: 100px; padding: 50px;">
    <BadgeCell v-bind="args" />
  </div>`,
});

export const Default = BadgeCellStory.bind({});

Default.args = {
  modelValue: {
    value: 'text',
    backgroundColor: 'red',
    color: 'white',
  },
};
