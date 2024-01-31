export interface AtCheckboxProps {
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  label?: string;
  inputValue: number | string | boolean;
  modelValue: number | string | boolean;
  readonly?: boolean;
  indeterminate?: boolean;
}
