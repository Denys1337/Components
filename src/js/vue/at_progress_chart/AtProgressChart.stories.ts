import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtProgressChart from './AtProgressChart.vue';
import { AtProgressChartProps, AtProgressChartMood } from './types';

export default {
  title: 'Components/AtProgressChart',
  component: AtProgressChart,
  decorators: [DefaultDecorator],
};

const AtProgressChartStory: Story<AtProgressChartProps> = (args) => ({
  name: 'AtProgressChartStory',
  components: { AtProgressChart },
  setup() {
    return { args };
  },
  template: `
      <div style="width: 100%; padding: 50px;">
        <AtProgressChart v-bind="args" />
      </div>`,
});

export const Default = AtProgressChartStory.bind({});

Default.args = {
  totalValue: 10,
  options: [
    {
      mood: AtProgressChartMood.Success,
      value: 7,
    },
    {
      mood: AtProgressChartMood.Danger,
      value: 1,
    },
    {
      mood: AtProgressChartMood.Idle,
      value: 2,
    },
  ],
};
