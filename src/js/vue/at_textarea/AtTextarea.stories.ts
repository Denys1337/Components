import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import { LanguageDirection } from '@agritask/js-utils/libs/types';

import { DefaultDecorator } from '@stories/decorators';

import { FieldProps } from '../hooks/fieldUtilitiesTypes';
import AtTextarea from './AtTextarea.vue';
import { MaxlengthPosition } from './types';

export default {
  title: 'Form/AtTextarea',
  component: AtTextarea,
  decorators: [DefaultDecorator],
  argTypes: {
    direction: {
      control: {
        type: 'select',
        options: Object.values(LanguageDirection),
      },
    },
  },
};

const AtTextareaStory: Story<FieldProps> = (args) => ({
  name: 'AtTextareaStory',
  components: { AtTextarea },
  setup() {
    const model = ref('');
    return { args, model };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
    <AtTextarea v-model="model" v-bind="args" />
    <div style="padding-top: 20px;">
      <div>output:</div>
      <input :value="model" />
    </div>
  </div>
  `,
});

export const Default = AtTextareaStory.bind({});

Default.args = {
  maxlength: 99999,
  minlength: 0,
  title: 'Label',
  required: true,
  invalid: false,
  readonly: false,
  direction: LanguageDirection.LTR,
  lazy: false,
  placeholder: '',
  maxLengthPosition: MaxlengthPosition.Bottom,
};
