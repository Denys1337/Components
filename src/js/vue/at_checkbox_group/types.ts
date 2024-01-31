export interface AtCheckBoxGroupOption {
  value: number | string;
  text: string;
  disabled?: boolean;
  translate?: boolean;
}
export interface AtCheckBoxGroupProps {
  options: AtCheckBoxGroupOption[];
  direction: Direction;
  name: string;
  modelValue: string;
  disabled: boolean;
}

export enum Direction {
  Inline = 'inline',
  Column = 'column',
}
