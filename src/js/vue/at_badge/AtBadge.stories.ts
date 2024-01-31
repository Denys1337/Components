import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtBadge from './AtBadge.vue';
import { AtBadgeProps, BadgeTypes } from './types';

export default {
  title: 'Components/AtBadge',
  component: AtBadge,
  decorators: [DefaultDecorator],
  argTypes: {
    type: {
      control: {
        options: Object.values(BadgeTypes),
        type: 'select',
      },
    },
  },
};

const AtBadgeStory: Story<AtBadgeProps> = (args) => ({
  name: 'AtBadgeStory',
  components: { AtBadge },
  setup() {
    return { args };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
    <AtBadge v-bind="args" />
  </div>`,
});

export const Default = AtBadgeStory.bind({});
Default.args = {
  type: BadgeTypes.InProgress,
};

export const InProgress = AtBadgeStory.bind({});
InProgress.args = {
  type: BadgeTypes.InProgress,
};

export const Done = AtBadgeStory.bind({});
Done.args = {
  type: BadgeTypes.Done,
};
export const Attention = AtBadgeStory.bind({});
Attention.args = {
  type: BadgeTypes.Attention,
};
export const Pending = AtBadgeStory.bind({});
Pending.args = {
  type: BadgeTypes.Pending,
};
export const Warning = AtBadgeStory.bind({});
Warning.args = {
  type: BadgeTypes.Warning,
};
