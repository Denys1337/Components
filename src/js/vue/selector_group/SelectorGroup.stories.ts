import { ref } from 'vue';

import { Story } from '@storybook/vue3';
import {
  AdjustmentsHorizontalIcon,
  CheckboxIcon,
  FileDescriptionIcon,
  HashIcon,
  HazeIcon,
  InfoCircleIcon,
  LetterTIcon,
  ToggleLeftIcon,
} from 'vue-tabler-icons';

import { DefaultDecorator } from '@stories/decorators';

import { SelectorMood, Size } from '../selector/types';
import SelectorGroup from './SelectorGroup.vue';
import { SelectorGroupProps, Orientation } from './types';

export default {
  title: 'Components/SelectorGroup',
  component: SelectorGroup,
  decorators: [DefaultDecorator],
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: Object.values(Size),
      },
    },
    orientation: {
      control: {
        type: 'select',
        options: Object.values(Orientation),
      },
    },
  },
};

const SelectorGroupStory: Story<SelectorGroupProps> = (args: SelectorGroupProps) => ({
  name: 'SelectorGroupStory',
  components: { SelectorGroup },
  setup() {
    const val = ref('');
    return { args, Orientation, Size, val };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
    <SelectorGroup v-model="val" name="SelectorGroup" v-bind="args" :options="args.options" />
  </div>`,
});

export const Default = SelectorGroupStory.bind({});

Default.args = {
  orientation: Orientation.Row,
  size: Size.Medium,
  options: [
    {
      text: 'Short answer',
      value: 'shortAnswer',
      icon: LetterTIcon,
      translate: false,
      disabled: true,
    },
    {
      text: 'Paragraph',
      value: 'paragraph',
      icon: FileDescriptionIcon,
      translate: false,
      mood: SelectorMood.Secondary,
    },
    {
      text: 'Yes/no',
      value: 'boolean',
      icon: ToggleLeftIcon,
      translate: false,
      mood: SelectorMood.Danger,
    },
    { text: 'Multi Choice', value: 'multipleChoice', icon: CheckboxIcon, translate: false },
    {
      text: 'Single Choice',
      value: 'singleChoice',
      icon: InfoCircleIcon,
      translate: false,
      mood: SelectorMood.Success,
      subLabel: 'sublabel',
    },
    { text: 'Numeric', value: 'numeric', icon: HashIcon, translate: false },
    { text: 'Slider', value: 'slider', icon: AdjustmentsHorizontalIcon, translate: false },
    { text: 'Range Slider', value: 'rangeSlider', icon: HazeIcon, translate: false },
  ],
  disabled: false,
  initialStateOn: false,
};
