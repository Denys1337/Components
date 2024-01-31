import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import { tooltipProps } from '../tooltip/types';
import AtTruncateWithTooltip from './AtTruncateWithTooltip.vue';

export default {
  title: 'Components/AtTruncateWithTooltip',
  component: AtTruncateWithTooltip,
  decorators: [DefaultDecorator],
};

const longText =
  'A very very very very very very very very very very very very very very very very very very very long text';

const args = {
  position: 'bottom',
  triggerWithClick: false,
  offset: tooltipProps.offset.default,
  show: undefined,
  updateOnScroll: false,
  updateOnResize: false,
  closeOnLeave: true,
  observeContent: false,
  fullText: longText,
  length: 10,
  tag: undefined,
};

const TruncateWithTooltipStory: Story = (args) => ({
  name: 'TruncateWithTooltipStory',
  components: { AtTruncateWithTooltip },
  setup() {
    return { args };
  },
  template: `
  <div>
    <p>
      <AtTruncateWithTooltip v-bind="args" />
    </p>
  </div>
  `,
});

export const Default = TruncateWithTooltipStory.bind({});
Default.args = args;

const WithTagStory: Story = (args) => ({
  name: 'WithTagStory',
  components: { AtTruncateWithTooltip },
  setup() {
    return { args };
  },
  template: `
  <div>
    <AtTruncateWithTooltip v-bind="args" />
  </div>
  `,
});

export const WithTag = WithTagStory.bind({});
WithTag.args = {
  ...args,
  tag: 'p',
};
