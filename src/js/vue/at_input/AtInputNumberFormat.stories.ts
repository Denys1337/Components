import { withKnobs, boolean, text, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtInputNumberFormat from './AtInputNumberFormat.vue';

const props = () => ({
  isNumber: { default: boolean('isNumber', false) },
  title: { default: text('title', 'my input') },
  required: { default: boolean('required', false) },
  readonly: { default: boolean('readonly', false) },
  locale: { default: text('locale', 'en') },
  decimalLength: {
    // @ts-ignore
    default: number('decimalLength', undefined),
  },
});

storiesOf('Form/AtInputNumberFormat', module)
  .addDecorator(DefaultDecorator)
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      components: { AtInputNumberFormat },
      props: props(),
      data: () => ({
        val: '',
      }),
      template: `
      <div style="width: 100%; padding: 50px;">
        <AtInputNumberFormat v-model="val" v-bind="$props" />
        <div style="padding-top: 20px;">
          <div>output:</div>
          <input v-model="val" />
          <br>
          {{typeof val}}
        </div>
      </div>`,
    };
  });
