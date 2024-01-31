import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import { ButtonSize } from '../at_button/types';
import AtSelect from './AtSelect.vue';
import { AtSelectProps, AtSelectVisual, atSelectVueProps, valueType } from './types';

export default {
  title: 'Form/AtSelect',
  component: AtSelect,
  decorators: [DefaultDecorator],
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: Object.values(ButtonSize),
      },
    },
    visual: {
      control: {
        type: 'select',
        options: Object.values(AtSelectVisual),
      },
    },
  },
};

const AtSelectStory: Story<AtSelectProps> = (args) => ({
  name: 'AtSelectStory',
  components: { AtSelect },
  setup() {
    const { modelValue, ...otherArgs } = args;
    let initialModelValue: valueType = args.multiple ? [] : '';
    if (modelValue !== undefined) {
      initialModelValue = modelValue;
    }
    const model = ref(initialModelValue);

    return { otherArgs, model, AtSelectVisual, args };
  },
  template: `
  <div class="d-flex w-100" style="padding: 30px">
      <div class="flex-grow-1">
          <div style="margin-bottom: 60px">
              <AtSelect v-model="model" v-bind="otherArgs"/>
          </div>
          <div>Model: {{ model }} </div>
      </div>
  </div>
  `,
});

const options = [
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
  {
    value: '11',
    text: 'long label example long label example long label example long label example long label example',
  },
];

const args = {
  options,
  showLabelWithSelected: atSelectVueProps.showLabelWithSelected.default,
  label: 'Choose option',
  multiple: false,
  filter: true,
  required: false,
  passiveRequired: false,
  inputCols: 12,
  wideLayout: false,
  invertDropdownXAlignment: false,
  readonly: false,
  invalid: false,
  enableAddOptionWhenOptionsEmpty: false,
  showSelectionsAsPills: atSelectVueProps.showSelectionsAsPills.default,
  size: ButtonSize.l,
  disableDefaultFilter: true,
  searchButtonEnabled: true,
  maxLabelLength: undefined,
  useInlineLabel: atSelectVueProps.useInlineLabel.default,
  disabled: false,
  modelValue: undefined,
  searchInputPlaceholder: 'search placeholder',
};

export const NormalOptions = AtSelectStory.bind({});
NormalOptions.args = { ...args };

export const InlineSelect = (args: AtSelectProps) => ({
  name: 'AtSelectStory',
  components: { AtSelect },
  setup() {
    const { modelValue, ...otherArgs } = args;
    const model = ref(args.multiple ? [] : '');

    return { otherArgs, model, AtSelectVisual, args };
  },
  template: `
  <div class="d-flex w-100" style="padding: 30px;">
      <div class="flex-grow-1">
          <div :style="{'align-items':'center'}" class="d-flex" style="margin-bottom: 60px">
              Hello my name is <AtSelect v-model="model" v-bind="otherArgs"/> and I am done
          </div>
          <div>Model: {{ model }} </div>
      </div>
  </div>
  `,
});
InlineSelect.args = {
  ...args,
  visual: AtSelectVisual.Inline,
  showClearButton: false,
  options: [
    { value: 1, text: 'Alexander' },
    { value: 2, text: 'Yuval' },
    { value: 3, text: 'Noam' },
    { value: 4, text: 'Amit' },
    { value: 5, text: 'Volodymyr' },
    { value: 6, text: 'Timur' },
    { value: 7, text: 'Atanas' },
  ],
};

export const Multiple = AtSelectStory.bind({});
Multiple.args = { ...args, multiple: true };

export const NoLabel = AtSelectStory.bind({});
NoLabel.args = { ...args, label: '' };

export const InlineLabel = AtSelectStory.bind({});
InlineLabel.args = { ...args, useInlineLabel: true };

export const AdjustedSelectionText = AtSelectStory.bind({});
AdjustedSelectionText.args = {
  ...args,
  label: '',
  multiple: true,
};

const groupedOptions = [
  {
    title: 'group 1',
    options: [
      { value: '1', text: 'one' },
      { value: '2', text: 'two' },
      { value: '3', text: 'three' },
      { value: '4', text: 'four' },
      { value: '5', text: 'five' },
    ],
  },
  {
    title: 'group 2',
    options: [
      { value: '6', text: 'six' },
      { value: '7', text: 'seven' },
      { value: '8', text: 'eight' },
      { value: '9', text: 'nine' },
      { value: '10', text: 'ten' },
    ],
  },
];

export const GroupedOptions = AtSelectStory.bind({});

GroupedOptions.args = {
  ...args,
  options: groupedOptions,
};

export const GroupedOptionsMultipleSelect = AtSelectStory.bind({});

GroupedOptionsMultipleSelect.args = {
  ...args,
  options: groupedOptions,
  multiple: true,
};

export const PartiallyGroupedOptions = AtSelectStory.bind({});

const partiallyGroupedOptions = [
  {
    text: 'One',
    value: '1',
  },
  {
    title: 'group 1',
    options: [
      { value: '6', text: 'six' },
      { value: '7', text: 'seven' },
      { value: '8', text: 'eight' },
      { value: '9', text: 'nine' },
      { value: '10', text: 'ten' },
    ],
  },
  {
    text: 'Eleven',
    value: '11',
  },
];

PartiallyGroupedOptions.args = {
  ...args,
  options: partiallyGroupedOptions,
};

export const SelectedDisabled = AtSelectStory.bind({});
SelectedDisabled.args = {
  ...args,
  disabled: true,
  modelValue: '1',
};

export const labelLengthLimit = AtSelectStory.bind({});

labelLengthLimit.args = {
  ...args,
  maxLabelLength: 20,
  showLabelWithSelected: true,
  useInlineLabel: true,
};
