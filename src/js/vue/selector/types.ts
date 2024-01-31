export type SelectedValueType = string | number | boolean;

export enum Size {
  Medium = 'medium',
  Large = 'large',
}

export enum SelectorMood {
  Primary = 'primary',
  Secondary = 'secondary',
  Danger = 'danger',
  Success = 'success',
}

export interface SelectorProps {
  modelValue: SelectedValueType;
  label: string;
  subLabel?: string;
  name: string;
  disabled: boolean;
  size: Size;
  selected: boolean;
  model: SelectedValueType;
  mood: SelectorMood;
}
