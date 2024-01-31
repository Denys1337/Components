import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtTriggerWithOverlayContext from './AtTriggerWithOverlayContext.vue';
import { AtTriggerWithOverlayContextProps } from './types';

export default {
  title: 'Components/AtTriggerWithOverlayContext',
  component: AtTriggerWithOverlayContext,
  decorators: [DefaultDecorator],
};

const AtTriggerWithOverlayContextStory: Story<AtTriggerWithOverlayContextProps> = (args) => ({
  name: 'AtTriggerWithOverlayContextStory',
  components: { AtTriggerWithOverlayContext },
  setup() {
    const isActionMenuVisible = ref(false);

    return { args, isActionMenuVisible };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
    <AtTriggerWithOverlayContext v-bind="args" v-model:showOverlay="isActionMenuVisible">
        <template #trigger> 
            <button @click="isActionMenuVisible= !isActionMenuVisible">Trigger</button>
        </template>
        <template #overlay>
            <h1>item</h1>
        </template>
    </AtTriggerWithOverlayContext>
  </div>`,
});

export const Default = AtTriggerWithOverlayContextStory.bind({});

Default.args = {
  maxOverlayWidth: '350px',
  minOverlayWidth: '150px',
};
