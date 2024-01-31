import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import DynamicField from './DynamicField.vue';
import { DynamicFieldProps, FieldType } from './types';

export default {
  title: 'Components/DynamicField',
  component: DynamicField,
  decorators: [DefaultDecorator],
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: Object.values(FieldType),
      },
    },
  },
};

const DynamicFieldStory: Story<DynamicFieldProps> = (args) => ({
  name: 'DynamicFieldStory',
  components: { DynamicField },
  setup() {
    const model = ref('');
    return { args, model };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
    <DynamicField v-bind="args" v-model="model" />
    <br>
    <hr>
    Model : {{model}}
  </div>`,
});

export const Default = DynamicFieldStory.bind({});

Default.args = {
  type: FieldType.TextField,
  fieldProps: {
    name: 'Dynamic',
    label: 'Dynamic field',
    errorMessage: 'Error',
  },
};
