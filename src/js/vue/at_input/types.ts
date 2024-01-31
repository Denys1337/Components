import { PropType } from 'vue';

import { AnySchema } from 'joi';

import { LanguageDirection } from '@agritask/js-utils/libs/types';

import { ButtonSize } from '../at_button/types';
import { FieldProps } from '../hooks/fieldUtilitiesTypes';

export type InputType = 'text' | 'email' | 'tel' | 'number';

export interface Props extends FieldProps {
  type: InputType;
  rules?: AnySchema[];
  useCustomErrorMessage?: boolean;
}

export const vueProps = {
  value: { type: String, default: '' },
  maxlength: { type: Number, required: false, default: 99999 },
  minlength: { type: Number, required: false, default: 0 },
  title: { type: String, required: false },
  required: { type: Boolean, default: false },
  passiveRequired: { type: Boolean, default: false },
  invalid: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  name: { type: String, required: false },
  id: { type: String, required: false },
  type: { type: String, default: 'text' },
  rules: { type: Array, required: false },
  errorPosition: { type: String, default: 'bottom' },
  ignored: { type: Boolean, default: false },
  direction: {
    type: String,
    default: 'inherit',
    validator: (value: any) => Object.values(LanguageDirection).includes(value),
  },
  lazy: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  formatter: { type: Function, required: false },
  placeholder: { type: String, default: '' },
  size: {
    type: String as PropType<ButtonSize>,
    default: ButtonSize.m,
    validator: (value: any) => Object.values(ButtonSize).includes(value),
  },
};

export interface AtInputRef {
  focusInput(): void;
}
