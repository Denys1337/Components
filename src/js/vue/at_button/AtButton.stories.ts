import { Parameters, Story } from '@storybook/vue3';
import { BellPlusIcon } from 'vue-tabler-icons';

import { DefaultDecorator } from '@stories/decorators';

import AtButton from './AtButton.vue';
import { AtButtonProps, ButtonMood, ButtonSize, ButtonVisual } from './types';

const mapStringToOption = (item: string) => ({ name: item, value: item });

const parameters: Parameters = {
  size: { values: Object.values(ButtonSize).map(mapStringToOption) },
  visual: { values: Object.values(ButtonVisual).map(mapStringToOption) },
  disabled: {
    values: [
      { name: 'false', value: false },
      { name: 'true', value: true },
    ],
  },
  text: { type: String },
};

const argTypes = {
  size: {
    control: {
      type: 'select',
      options: Object.values(ButtonSize),
    },
  },
  visual: {
    control: {
      type: 'select',
      options: Object.values(ButtonVisual),
    },
  },
  mood: {
    control: {
      type: 'select',
      options: Object.values(ButtonMood),
    },
  },
};

export default {
  title: 'Components/AtButton',
  component: AtButton,
  decorators: [DefaultDecorator],
  parameters,
  argTypes,
};

// AtButtonStory
const AtButtonStory: Story<AtButtonProps> = (args: AtButtonProps) => ({
  name: 'AtButtonStory',
  components: { AtButton },
  setup() {
    return { args };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
    <AtButton v-bind="args">
    {{ args.text }}
    </AtButton>
  </div>`,
});
export const Default = AtButtonStory.bind({});

// AtButtonSlotsStory
const AtButtonSlotsStory: Story<AtButtonProps> = (args: AtButtonProps) => ({
  name: 'AtButtonStory',
  components: { AtButton, BellPlusIcon },
  setup() {
    const onClick = () => {
      // eslint-disable-next-line no-console
      console.log('Clicked!');
    };

    return { args, onClick };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
    <AtButton v-bind="args" @click="onClick">
    <BellPlusIcon #start size="16" />
    Click me!
    <template #end >{{ args.text }}</template>
    </AtButton>
  </div>`,
});
export const WithSlots = AtButtonSlotsStory.bind({});

interface AtButtonPropsWithText extends AtButtonProps {
  text: string;
}

Default.args = {
  size: 'l',
  visual: 'primary',
  disabled: false,
  loading: false,
  startIcon: 'icon-general-chevron-left',
  endIcon: 'icon-general-chevron-right',
  text: 'Boink!',
  isSquare: false,
} as AtButtonPropsWithText;

WithSlots.args = {
  size: 'l',
  visual: 'primary',
  disabled: false,
} as AtButtonProps;

const AtIconButtonStory: Story<AtButtonProps> = (args: AtButtonProps) => ({
  name: 'AtIconButtonStory',
  components: { AtButton, BellPlusIcon },
  setup() {
    return { args };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
    <AtButton v-bind="args">
    <template #start>
    <BellPlusIcon size="22"/>
    </template>
    </AtButton>
  </div>`,
});

export const OnlyIcon = AtIconButtonStory.bind({});
OnlyIcon.args = {
  size: 'm',
  isSquare: true,
} as AtButtonProps;
