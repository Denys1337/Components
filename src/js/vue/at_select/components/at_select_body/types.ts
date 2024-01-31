import { PropType } from 'vue';

import { maxLabelLengthProp, Option } from '../../types';

export interface AtSelectBodyProps {
  selectedOptions: Option[];
  label: string;
  labelClasses: object;
  useInlineLabel: boolean;
  textField: string;
  required: boolean;
  passiveRequired: boolean;
  multiple: boolean;
  dropdownOpened: boolean;
  showClearButton: boolean;
  disabled: boolean;
}

export const atSelectBodyProps = {
  selectedOptions: {
    type: Array as PropType<Option[]>,
    required: false,
  },
  showClearButton: {
    type: Boolean,
    default: true,
  },
  label: { type: String, default: '' },
  labelClasses: { type: Object, required: false, default: () => ({}) },
  useInlineLabel: { type: Boolean, default: false },
  textField: { type: String, default: 'text' },
  required: { type: Boolean, default: false },
  passiveRequired: { type: Boolean, default: false },
  multiple: { type: Boolean, default: false },
  dropdownOpened: { type: Boolean, default: false },
  showLabelWithSelected: { type: Boolean, default: true },
  maxLabelLength: maxLabelLengthProp,
  disabled: { type: Boolean, default: false },
};
