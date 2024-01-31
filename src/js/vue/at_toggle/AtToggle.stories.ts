import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtToggle from './AtToggle.vue';

const props = () => ({
  disabled: { default: boolean('disabled', false) },
  readonly: { default: boolean('readonly', false) },
  label: { default: text('label', 'label text') },
  labelPosition: {
    default: select(
      'labelPosition',
      {
        'inline-start': 'inline-start',
        'inline-end': 'inline-end',
      },
      'inline-start'
    ),
  },
});

storiesOf('Form/AtToggle', module)
  .addDecorator(DefaultDecorator)
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      components: { AtToggle },
      props: props(),
      methods: {},
      data: () => ({
        model: false,
      }),
      template: `
          <div style="width: 100%; padding: 50px;">
          <at-toggle :disabled="disabled"
                     :readonly="readonly"
                     :label="label"
                     v-model="model"
                     :label-position="labelPosition">
          </at-toggle>
          <div>
            Is checked: {{ model }}
          </div>
          </div>`,
    };
  });
