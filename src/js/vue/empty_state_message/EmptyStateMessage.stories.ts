import { Story } from '@storybook/vue3';
import { PlusIcon } from 'vue-tabler-icons';

import { DefaultDecorator } from '@stories/decorators';

import EmptyStateMessage from './EmptyStateMessage.vue';
import { IconPosition } from './types';

export default {
  title: 'Components/EmptyStateMessage',
  component: EmptyStateMessage,
  decorators: [DefaultDecorator],
};

const EmptyStateMessageStory: Story = (args) => ({
  name: 'EmptyStateMessageStory',
  components: { EmptyStateMessage },
  setup() {
    const imgPath = require('./images/search-logo.svg');
    return { args, imgPath };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
  <EmptyStateMessage v-bind="args" >
    <template #image-logo>
      <img :src="imgPath" />
    </template>
    </EmptyStateMessage>
  </div>`,
});

export const Default = EmptyStateMessageStory.bind({});

Default.args = {
  titleI18n: 'Empty State',
  descriptionI18n: 'This is an empty state description',
  showActionButton: true,
  actionTextI18n: 'Button',
  buttonIcon: PlusIcon,
  iconPosition: IconPosition.end,
  imgWidth: '140',
  centerWithAbsolute: false,
};
