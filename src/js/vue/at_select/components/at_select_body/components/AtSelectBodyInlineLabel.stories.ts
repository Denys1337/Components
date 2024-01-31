import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtSelectBodyInlineLabel from './AtSelectBodyInlineLabel.vue';

export default {
  title: 'Form/AtSelect/components/AtSelectBodyInlineLabel',
  component: AtSelectBodyInlineLabel,
  decorators: [DefaultDecorator],
};

const AtSelectBodyInlineLabelStory: Story = (args) => ({
  name: 'AtSelectBodyInlineLabelStory',
  components: { AtSelectBodyInlineLabel },
  setup() {
    return { args };
  },
  template: `
    <div>
      <AtSelectBodyInlineLabel v-bind="args" />
    </div>
  `,
});
const longText =
  'A very very very very very very very very very very very very very very very very very very very long text';

export const LongLabelToTruncate = AtSelectBodyInlineLabelStory.bind({});
LongLabelToTruncate.args = {
  selectedOptions: [{ text: longText, value: 1 }],
  showClearButton: true,
  label: 'Choose option',
  labelClasses: {},
  useInlineLabel: true,
  textField: 'text',
  required: false,
  passiveRequired: false,
  multiple: false,
  dropdownOpened: false,
  showLabelWithSelected: true,
  maxLabelLength: 20,
};
