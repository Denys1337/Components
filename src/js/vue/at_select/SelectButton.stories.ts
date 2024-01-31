import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import SelectButton from './SelectButton.vue';

export const options = [
  { value: '1', text: 'one' },
  { value: '2', text: 'two' },
  { value: '3', text: 'three' },
  { value: '4', text: 'four' },
  { value: '5', text: 'five' },
  { value: '6', text: 'six' },
  { value: '7', text: 'seven' },
  { value: '8', text: 'eight' },
  { value: '9', text: 'nine' },
  { value: '10', text: 'ten' },
];

const props = () => ({
  disabled: { default: boolean('disabled', false) },
});

storiesOf('Form/SelectButton', module)
  .addDecorator(DefaultDecorator)
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      components: { SelectButton },
      props: props(),
      template: `
        <div>
          <div class="my-5">
              <SelectButton 
                :options="options"
                @change="($event) => selection = $event" 
                :label="'Choose option'"
              />
          </div>
          <div>Selection: {{selection}}</div>
        </div>`,
      data: () => ({ options, selection: '' }),
    };
  });
