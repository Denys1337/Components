import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import { AtToastCardProps, AtToastType } from '../../types';
import AtToastCard from './AtToastCard.vue';

export default {
  title: 'Plugins/AtToast',
  component: AtToastCard,
  decorators: [DefaultDecorator],
};

const AtToastCardStory: Story<AtToastCardProps> = (args) => ({
  name: 'AtToastCardStory',
  components: { AtToastCard },
  setup() {
    return { args };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
    <AtToastCard v-bind="args" />
  </div>`,
});

export const Info = AtToastCardStory.bind({});

Info.args = {
  isCloseDisabled: false,
  title: 'Info toast',
  type: AtToastType.Info,
};
export const Error = AtToastCardStory.bind({});

Error.args = {
  isCloseDisabled: false,
  title: 'Error Toast',
  type: AtToastType.Error,
};
export const Success = AtToastCardStory.bind({});

Success.args = {
  isCloseDisabled: false,
  title: 'Success toast',
  type: AtToastType.Success,
};
