import { TablerIconComponent } from 'vue-tabler-icons';

import { AtQuestionType } from '../at_dynamic_form/types';
import { SelectorMood, Size } from '../selector/types';
import { SelectedValueType } from '../selector/types';

export enum Orientation {
  Row = 'row',
  Column = 'column',
}

export interface SelectorItem {
  text: string;
  value: SelectedValueType | AtQuestionType;
  icon?: TablerIconComponent;
  translate?: boolean;
  disabled?: boolean;
  mood?: SelectorMood;
  subLabel?: string;
}

export interface SelectorGroupProps {
  options: SelectorItem[];
  name: string;
  disabled: boolean;
  size: Size;
  orientation: Orientation;
  value?: string | number;
  initialStateOn: boolean;
}
