import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtToastStory from './AtToastStory.stories.vue';
import {
  AtToastOptions,
  AtToastType,
  DEFAULT_POSITION,
  DEFAULT_STAY_DURATION,
  DEFAULT_TOAST_TYPE,
  ToastPosition,
} from './types';

export default {
  title: 'Plugins/AtToast',
  component: AtToastStory,
  decorators: [DefaultDecorator],
  argTypes: {
    position: {
      control: { type: 'radio', options: Object.values(ToastPosition) },
    },
    type: {
      control: { type: 'radio', options: Object.values(AtToastType) },
    },
  },
};

const AtToastStoryStory: Story<AtToastOptions> = (args) => ({
  name: 'AtToastStoryStory',
  components: { AtToastStory },
  setup() {
    return { args };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
    <AtToastStory v-bind="args" />
  </div>`,
});

export const Plugin = AtToastStoryStory.bind({});
Plugin.args = {
  type: DEFAULT_TOAST_TYPE,
  duration: DEFAULT_STAY_DURATION,
  position: DEFAULT_POSITION,
  title: 'Toast plugin',
};
