import { computed, ref } from 'vue';

import { Story } from '@storybook/vue3';
import { ToggleLeftIcon } from 'vue-tabler-icons';

import { DefaultDecorator } from '@stories/decorators';

import Selector from './Selector.vue';
import { SelectorMood, SelectorProps, Size } from './types';

export default {
  title: 'Components/Selector',
  component: Selector,
  decorators: [DefaultDecorator],
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: Object.values(Size),
      },
    },
    mood: {
      control: {
        type: 'select',
        options: Object.values(SelectorMood),
      },
    },
  },
};

const SelectorStory: Story<SelectorProps> = (args: SelectorProps) => ({
  name: 'SelectorStory',
  components: { Selector, ToggleLeftIcon },
  setup() {
    const model = ref('');
    const selected = computed(() => (model.value === '' ? null : model.value === args.modelValue));

    return { args, model, Size, selected };
  },
  template: `  
  <div style="width: 100%; padding: 50px;">
    <Selector name="selector" :selected="selected"
              @change="model = $event" v-bind="args" >
      <ToggleLeftIcon :size="args.size === Size.Medium ? '16' : '24'"/>
    </Selector> 
  </div>`,
});

export const Default = SelectorStory.bind({});

Default.args = {
  modelValue: 1,
  label: 'Yes/No',
  subLabel: 'Coming',
  size: Size.Medium,
  mood: SelectorMood.Primary,
  disabled: false,
};
