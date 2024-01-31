import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import { LanguageDirection } from '@agritask/js-utils/libs/types';

import { DefaultDecorator } from '@stories/decorators';

import { ButtonSize } from '../at_button/types';
import { FieldProps } from '../hooks/fieldUtilitiesTypes';
import AtInput from './AtInput.vue';

export default {
  title: 'Form/AtInput',
  component: AtInput,
  decorators: [DefaultDecorator],
  argTypes: {
    direction: {
      control: {
        type: 'select',
        options: Object.values(LanguageDirection),
      },
    },
    size: {
      control: {
        type: 'select',
        options: Object.values(ButtonSize),
      },
    },
  },
};

const AtInputStory: Story<FieldProps> = (args) => ({
  name: 'AtInputStory',
  components: { AtInput },
  setup() {
    const model = ref('');
    return { args, model };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
    <AtInput v-model="model" v-bind="args" />
    <div style="padding-top: 20px;">
      <div>output:</div>
      <input :value="model" />
    </div>
  </div>
  `,
});

export const Default = AtInputStory.bind({});

Default.args = {
  maxlength: 20,
  minlength: 0,
  title: 'Label',
  required: true,
  invalid: false,
  readonly: false,
  passiveRequired: false,
  direction: LanguageDirection.LTR,
  placeholder: '',
  size: ButtonSize.m,
  type: 'number',
  minNumber: 12,
};
