import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtButton from '../at_button/AtButton.vue';
import AtPopup from './AtPopup.vue';
import { Appearance, AtPopupProps, Size } from './types';

export default {
  title: 'Components/AtPopup',
  component: AtPopup,
  decorators: [DefaultDecorator],
  argTypes: {
    appearance: {
      control: {
        type: 'select',
        options: Object.values(Appearance),
      },
    },
    currentSize: {
      control: {
        type: 'select',
        options: Object.values(Size),
      },
    },
    buttonsDisabled: {
      control: {
        type: 'boolean',
        options: [true, false],
      },
    },
  },
};

const AtPopupStory: Story<AtPopupProps> = (args: AtPopupProps) => ({
  name: 'AtPopupStory',
  components: { AtPopup, AtButton },
  setup() {
    const show = ref(false);

    return { args, show };
  },
  template: `
    <div style="width: 100%; padding: 50px;">
    <AtButton @click="show = true">Click to show popup</AtButton>
    <AtPopup :show="show" @close="show=false" v-bind="args"/>
    </div>`,
});

export const Default = AtPopupStory.bind({});

Default.args = {
  appearance: Appearance.Regular,
  confirmText: 'Ok',
  cancelText: 'Cancel',
  disableClickAway: true,
  contentText: 'Content for test',
  titleText: 'Title for test',
  confirmDisabled: false,
  showCloseIcon: true,
  showConfirmationButtons: true,
  showDividerLine: false,
  buttonsDisabled: false,
};
