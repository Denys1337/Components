import { Story } from '@storybook/vue3';
import { ChevronDownIcon } from 'vue-tabler-icons';

import { DefaultDecorator } from '@stories/decorators';

import AtAccordion from './AtAccordion.vue';

export default {
  title: 'Components/AtAccordion',
  component: AtAccordion,
  decorators: [DefaultDecorator],
};

const AtAccordionStory: Story = (args) => ({
  name: 'AtAccordionStory',
  components: { AtAccordion, ChevronDownIcon },
  setup() {
    return { args };
  },
  template: `
      <div style="width: 100%; padding: 50px;">
      <AtAccordion v-bind="args" >
        <template #header="{ opened }">
          title example
          <ChevronDownIcon size="16" :class="opened"/>
        </template>
        <template #body>
          <h2>Test</h2>
          <ul>
            <li>test</li>
            <li>test</li>
          </ul>
        </template>
      </AtAccordion>
      </div>`,
});

export const Default = AtAccordionStory.bind({});

Default.args = {
  isOpened: false,
  disabled: false,
  offsetHeight: 45,
};
