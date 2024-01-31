import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtInputSelect from './AtInputSelect.vue';
import { InputSelectModelValue } from './types';

export default {
  title: 'Components/AtInputSelect',
  component: AtInputSelect,
  decorators: [DefaultDecorator],
};

const AtInputSelectStory: Story = (args) => ({
  name: 'AtInputSelectStory',
  components: { AtInputSelect },
  setup() {
    const modelValue = ref<InputSelectModelValue>({
      inputValue: '',
      selectValue: '',
    });

    return { args, modelValue };
  },
  template: `
      <div style="width: 100%; padding: 50px;">
        <AtInputSelect v-bind="args" v-model="modelValue" style="width: 167px"/>
      model:
        <pre>{{modelValue}}</pre>
      </div>`,
});

export const Default = AtInputSelectStory.bind({});

Default.args = {
  options: [
    { value: 'mm', text: 'mm' },
    { value: 'sm', text: 'acre-foot' },
  ],
  disabled: false,
};
