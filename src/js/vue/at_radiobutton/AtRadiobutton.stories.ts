import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtRadiobutton from './AtRadiobutton.vue';

const props = () => ({
  disabled: { default: boolean('disabled', false) },
  readonly: { default: boolean('readonly', false) },
});

storiesOf('Form/AtRadiobutton', module)
  .addDecorator(DefaultDecorator)
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      components: { AtRadiobutton },
      props: props(),
      data: () => ({
        model: '',
      }),
      template: `
      <div style="width: 100%; padding: 50px;">
      <!-- Implementation with v-model -->
        <AtRadiobutton
          :disabled="disabled"
          :model-value="1"
          name="whichNumber"
          v-model:model="model"
          label="1"
          @change="model = $event"
          :readonly="readonly"
          :size="'m'"
        />
        <br>
        <br>
      <!-- Implementation without v-model -->
        <AtRadiobutton 
          :disabled="disabled"
          :model-value="2"
          name="whichNumber"
          :selected="model === 2"
          @change="model = $event"
          label="2"
          :readonly="readonly"
          :size="'m'"
        />
        <div>
        Chosen value : {{ model }}
        </div>
      </div>`,
    };
  });
