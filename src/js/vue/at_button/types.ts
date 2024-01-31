export enum ButtonSize {
  l = 'l',
  m = 'm',
  s = 's',
}

export enum ButtonVisual {
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
  link = 'link',
  text = 'text',
  brand100 = 'brand100',
  brand200 = 'brand200',
  brand300 = 'brand300',
  brand400 = 'brand400',
}

export enum Tag {
  a = 'a',
  button = 'button',
  RouterLink = 'RouterLink',
}

export enum ButtonMood {
  none = 'none',
  danger = 'danger',
}
export interface AtButtonProps {
  visual: ButtonVisual;
  size: ButtonSize;
  disabled: boolean;
  active: boolean;
  loading: boolean;
  type: string;
  tag: Tag;
  startIcon?: string;
  endIcon?: string;
  isSquare: boolean;
  mood: ButtonMood;
}

export const validateButtonSize = (value: ButtonSize) => Object.values(ButtonSize).includes(value);
