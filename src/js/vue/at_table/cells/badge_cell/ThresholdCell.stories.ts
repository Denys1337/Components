import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import { BadgeTypes } from '../../../at_badge/types';
import ThresholdCell from './ThresholdCell.vue';
import { ThresholdCellValue } from './types';

export default {
  title: 'Table/Cells/ThresholdCell',
  component: ThresholdCell,
  decorators: [DefaultDecorator],
};

const ThresholdCellStory: Story<{ modelValue: ThresholdCellValue }> = (args) => ({
  name: 'ThresholdCellStory',
  components: { ThresholdCell },
  setup() {
    return { args };
  },
  template: `
      <div style="width: 100%; padding: 50px;">
        <ThresholdCell v-bind="args" />
      </div>`,
});

export const Default = ThresholdCellStory.bind({});

Default.args = {
  modelValue: {
    threshold: {
      gradeData: 1,
      value: 'text',
      gradeColor: '#1313c1',
      gradeThreshold: BadgeTypes.Medium,
    },
    hint: 'hint example ',
  },
};
