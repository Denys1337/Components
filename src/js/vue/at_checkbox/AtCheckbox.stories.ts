import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtCheckbox from './AtCheckbox.vue';

const props = () => ({
  text: { default: text('inner text', 'click me!') },
  label: { default: text('label', 'label text') },
  inputValue: { default: text('Input value (not required)', 'I am checkbox value') },
  disabled: { default: boolean('disabled', false) },
  invalid: { default: boolean('invalid', false) },
  required: { default: boolean('required', false) },
  readonly: { default: boolean('readonly', false) },
});

storiesOf('Form/AtCheckbox', module)
  .addDecorator(DefaultDecorator)
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      components: { AtCheckbox },
      props: props(),
      data: () => ({
        val: '',
      }),
      template: `
      <div style="width: 100%; padding: 50px;">
        <at-checkbox
          :disabled="disabled"
          v-model="val"
          :label="label"
          :invalid="invalid"
          :inputValue="inputValue"
          :required="required"
          :readonly="readonly"
        >
          {{ text }}
        </at-checkbox>
        <div>
          V-Model: 
            {{val}}
        </div>
      </div>`,
    };
  });
