export interface Option {
  value: number | string;
  text: string;
  disabled?: boolean;
  translate?: boolean;
}

export enum Direction {
  Inline = 'inline',
  Column = 'column',
  TwoColumns = 'two-columns',
}

export interface AtRadiogroupProps {
  disabled: boolean;
  required: boolean;
  options: Option[];
  name: string;
  value?: string | number;
  direction: Direction;
  readonly: boolean;
  errorPosition: string;
}
