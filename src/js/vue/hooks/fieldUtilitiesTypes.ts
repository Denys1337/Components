import { LanguageDirection } from '@agritask/js-utils/libs/types';

import { ButtonSize } from '../at_button/types';

export interface FieldProps {
  id?: string;
  name?: string;
  modelValue: string;
  title?: string;
  required: boolean;
  passiveRequired?: boolean;
  invalid?: boolean;
  readonly?: boolean;
  lazy?: boolean;
  ignored?: boolean; // for useFormControl
  disabled?: boolean;
  maxlength: number;
  minlength: number;
  maxNumber?: number;
  minNumber?: number;
  type: string;
  direction: LanguageDirection;
  formatter?: (value: string) => string;
  placeholder: string;
  debounceTime?: number;
  maxLengthPosition?: string;
  size: ButtonSize;
}
