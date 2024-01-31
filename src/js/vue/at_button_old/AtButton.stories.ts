import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtButton from './AtButton.vue';

const props = () => ({
  text: { default: text('inner text', 'click me!') },
  disabled: { default: boolean('disabled', false) },
  type: {
    default: select(
      'class',
      {
        'no class (primary)': '',
        '.warning': 'warning',
        '.secondary': 'secondary',
        '.secondary.warning': 'secondary warning',
        '.tertiary': 'tertiary',
        '.tertiary.warning': 'tertiary warning',
        '.link': 'link',
        '.link.warning': 'link warning',
        '.popup': 'popup',
        '.popup.secondary': 'popup secondary',
      },
      ''
    ),
  },
});

storiesOf('Components/Old/AtButton (Old)', module)
  .addDecorator(DefaultDecorator)
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      components: { AtButton },
      props: props(),
      data: () => ({
        val: '',
      }),
      methods: {
        onClick: () => console.log('click'), // eslint-disable-line no-console
        mouseover: () => console.log('over'), // eslint-disable-line no-console
        mouseout: () => console.log('out'), // eslint-disable-line no-console
      },
      computed: {
        cls(this: { type: string }) {
          return this.type;
        },
      },
      template: `
      <div style="width: 100%; padding: 50px;">
        <at-button 
          :class="cls"
          :disabled="disabled"
          @click="onClick"
          @mouseover="mouseover"
          @mouseout="mouseout"
        >
          {{ text }}
        </at-button>
      </div>`,
    };
  });
