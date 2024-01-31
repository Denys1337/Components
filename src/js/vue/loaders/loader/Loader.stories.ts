import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import Loader from './Loader.vue';

export default {
  title: 'Loaders/Loader',
  component: Loader,
  decorators: [DefaultDecorator],
};

const LoaderStory: Story = (args) => ({
  name: 'LoaderStory',
  components: { Loader },
  setup() {
    return { args };
  },
  template: `
  <div style="width: 500px;display: flex;justify-content: center">
    <Loader v-bind="args" />
  </div>`,
});

export const Default = LoaderStory.bind({});

Default.args = {
  spinnerSize: 8,
  color: '#ffffff',
};
