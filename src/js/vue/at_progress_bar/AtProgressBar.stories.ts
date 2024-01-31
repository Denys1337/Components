import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtProgressBar from './AtProgressBar.vue';
import { AtProgressBarProps, ProgressBarSize } from './types';

export default {
  title: 'Components/AtProgressBar',
  component: AtProgressBar,
  decorators: [DefaultDecorator],
  argTypes: {
    size: {
      control: {
        options: Object.values(ProgressBarSize),
        type: 'select',
      },
    },
    progress: { control: { type: 'number', min: 0, max: 100, step: 1 } },
  },
};

const AtProgressBarStory: Story<AtProgressBarProps> = (args: AtProgressBarProps) => ({
  name: 'AtProgressBarStory',
  components: { AtProgressBar },
  setup() {
    return { args };
  },
  template: `
      <div style="width: 50%;margin:0 auto; padding: 50px;">
        <AtProgressBar v-bind="args" />
      </div>`,
});
export const Default = AtProgressBarStory.bind({});

Default.args = {
  progress: 22,
  size: ProgressBarSize.Small,
};
