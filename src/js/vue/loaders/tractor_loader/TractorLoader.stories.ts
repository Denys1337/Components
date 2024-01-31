import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import TractorLoader from './TractorLoader.vue';

export default {
  title: 'Loaders/TractorLoader',
  component: TractorLoader,
  decorators: [DefaultDecorator],
};

const TractorLoaderStory: Story = (args) => ({
  name: 'TractorLoaderStory',
  components: { TractorLoader },
  setup() {
    return { args };
  },
  template: `
  <div style="width: 500px;height: 400px;position: relative;">
    <TractorLoader v-bind="args" />
  </div>`,
});

export const Default = TractorLoaderStory.bind({});

Default.args = {};
